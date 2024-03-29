const config = require("../config/config");
const path = require("path");
const emailvalidator = require("email-validator");
const otpGenerator = require("otp-generator");
var dateTime = require("node-datetime");
var md5 = require("md5");

const nodemailer = require("nodemailer");
const send_mail = require('../helper/send-mail');

// const user_send_email = require("../helper/send-mail");
var dt = dateTime.create();
var formatted_date = dt.format("Y-m-d H:M:S");
// console.log(formatted_date);

const filepath = path.join(__dirname, "../../client/public/document");
const jwt = require("jsonwebtoken");
const mysqlcon = require("../config/db_connection");

const loginCont = {
  register: async function (req, res) {
    var bconnect = {};
    try {
      var request = req.body;
      // console.log(request);

      console.log(request);
      if (request) {
        if (request.email && emailvalidator.validate(request.email)) {
          var password = request.password;
          if (password) {
            if (request.email != request.confirm_email) {
              res.status(201).json({
                status: false,
                message: "Email and confirm email not match",
                data: [],
              });
              return true;
            }
            if (request.password != request.confirm_password) {
              res.status(201).json({
                status: false,
                message: "Password and confirm password not match",
                data: [],
              });
              return true;
            }
            var em = { email: request.email };
            var user_id = request.user_id;
            var sql = "select id, email from tbl_user where ? ";
            if (user_id) {
              sql =
                "select id, email from tbl_user where email = ? AND id != ?";
              var em = [request.email, request.user_id];
            }
            var dbquery = await mysqlcon(sql, em);
            
            if (!dbquery[0]) {
              if (user_id) {
                var user_data = {
                  email: request.email,
                  password: md5(request.password),
                  updated_on: formatted_date,
                };
                sql = "UPDATE tbl_user SET ? WHERE id = ? ";
                var dbquery = await mysqlcon(sql, [user_data, user_id]);
                if (!dbquery) {
                  res.status(201).json({
                    status: false,
                    message: "Error to create profile",
                    data: [],
                  });
                } else {
                  res.status(200).json({
                    status: true,
                    message: "Profile saved successfully",
                    data: dbquery.insertId,
                  }); 
                }
              } else {
              
                var secret_key = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });
                var test_secret_key = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });
                var token = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });

                
                var user_data = {
                  parent_id: 0,
                  account_type: 1,
                  email: request.email,
                  password: md5(request.password),
                  status: 0,
                  secretkey: secret_key,
                  test_secretkey: test_secret_key,
                  created_on: formatted_date,
                  updated_on: formatted_date,
                  verification_token: token,
                };

                let result = await mysqlcon(
                  "INSERT INTO tbl_user SET ?",
                  user_data
                );
                if (!result) {
                  res.status(201).json({
                    status: false,
                    message: "Error to create profile",
                    data: [],
                  });
                } else {
                  jwt.sign(
                    { id: result.insertId },
                    config.JWT_SECRET,
                    { expiresIn: config.JWT_EXPIRY },
                    (err, token) => {
                      if (err) throw new Error(err);
                      var reg = {
                        id: result.insertId,
                        user_id: result.insertId,
                        token: token,
                      };
                      var page_path = path.join(__dirname, '../views/signup.ejs');
                      console.log(page_path);
                      send_mail.mail({email:request.email,password:request.password,subject:"Verification Email"}, 'signup');
                      res.status(200).json({
                        status: false,
                        message: "Profile created successfully",
                        data: reg,
                      });
                    }
                  );
                }
              }
            } else {
              res.status(202).json({
                status: false,
                message: "Email id already exists",
                data: [],
              });
            }
          } else {
            res.status(201).json({
              status: false,
              message: "Enter a valid password",
              data: [],
            });
          }
        } else {
          res.status(201).json({
            status: false,
            message: "Enter a valid email id",
            data: [],
          });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Enter a valid email id and password",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  company_profile: async function (req, res) {
    let user = req.user;
    // res.send(users);
    var bconnect = {};
    try {
      var request = req.body;
      
      if (request) {
        var validate_req = [
          "company_name",
          "trading_dba",
          "registered_address",
          "company_registration_no",
          "country_of_incorporation",
          "main_contact_person",
          "main_contact_email",
        ];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
          
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }

        var user_id = user.id;
        var company_data = {
          bname: request.company_name,
          trading_dba: request.trading_dba,
          blocation: request.registered_address,
          busines_Code: request.company_registration_no,
          busines_Country: request.country_of_incorporation,
          name: request.main_contact_person,
          main_contact_email: request.main_contact_email,
          fname: request.main_contact_person,
          lname: request.main_contact_person,
          updated_on: formatted_date,
        };

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        let dbquery = await mysqlcon(sql, [company_data, user_id]);
        
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "All company profile data are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  save_country_solution_apply: async function (req, res) {
    let user = req.user;
    // res.send(users);
    var bconnect = {};

    try {
      var request = req.body;
      
      if (request) {
        var validate_req = ["solution_apply_for_country", "mode_of_solution"];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {

          if (!request[validate_req[key]]) {
            req_str += "" + validate_req[key] + " is required ";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
          
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }
        

        var user_id = user.id;
        var company_data = {
          solution_apply_for_country: request.solution_apply_for_country,
          mode_of_solution: request.mode_of_solution,
        };

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        var dbquery = mysqlcon(sql, [company_data, user_id]);
       
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Company and apply solution data are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  save_director_info: async function (req, res) {
    let user = req.user;
  
    var bconnect = {};
    try {
      var request = req.body;
      console.log(request);
      if (request) {
        var validate_req = [
          "director1_name",
          "director1_dob",
          "director1_nationality",
        ];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
         
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }
        

        var user_id = user.id;

        var director_info = {
          director1_name: request.director1_name,
          director1_dob: request.director1_dob,
          director1_nationality: request.director1_nationality,
          director2_name: request.director2_name,
          director2_dob: request.director2_dob,
          director2_nationality: request.director2_nationality,
          main_contact_email: request.main_contact_email,
          updated_on: formatted_date,
        };

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        var dbquery = await mysqlcon(sql, [director_info, user_id]);
       
        if (dbquery) {
          res.status(200).json({
            status: true,
            message: "Saved successfully",
            data: dbquery,
          });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Director informations are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  save_shareholder_info: async function (req, res) {
    let user = req.user;
   
    var bconnect = {};
    try {
      var request = req.body;
      console.log(request);
      if (request) {
        var validate_req = [
          "shareholder1_name",
          "shareholder1_dob",
          "shareholder1_nationality",
        ];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
          
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }
        

        var user_id = user.id;

        var shareholder_info = {
          shareholder1_name: request.shareholder1_name,
          shareholder1_dob: request.shareholder1_dob,
          shareholder1_nationality: request.shareholder1_nationality,
          shareholder2_name: request.shareholder2_name,
          shareholder2_dob: request.shareholder2_dob,
          shareholder2_nationality: request.shareholder2_nationality,
          main_contact_email: request.main_contact_email,
          updated_on: formatted_date,
        };

        console.log(shareholder_info);

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        var dbquery = mysqlcon(sql, [shareholder_info, user_id]);
       
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Shareholder informations are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  save_business_info: async function (req, res) {
    let user = req.user;
    
    var bconnect = {};
    try {
      var request = req.body;
      console.log(request);
      if (request) {
        var validate_req = [
          "company_website_processing_url",
          "company_nature_of_business",
          "company_estimated_monthly_volume",
          "company_avarage_ticket_size",
        ];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
         
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }
       

        var user_id = user.id;

        var business_info = {
          website: request.company_website_processing_url,
          job_title: request.company_nature_of_business,
          company_estimated_monthly_volume:
            request.company_estimated_monthly_volume,
          company_avarage_ticket_size: request.company_avarage_ticket_size,
          updated_on: formatted_date,
        };

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        var dbquery = mysqlcon(sql, [business_info, user_id]);
        
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Business informations are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  save_settelment_info: async function (req, res) {
    let user = req.user;
    // res.send(users);
    var bconnect = {};
    try {
      var request = req.body;
      console.log(request);
      if (request) {
        var validate_req = ["international_settelment_currency"];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
          
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }

        var user_id = user.id;

        var settelment_info = {
          settle_currency: request.international_settelment_currency,
          wallet_url: request.usdt_wallet_address,
          complete_profile: 1,
          updated_on: formatted_date,
        };

        sql = "UPDATE tbl_user SET ? WHERE id = ? ";
        var dbquery = mysqlcon(sql, [settelment_info, user_id]);
        
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Settelment informations are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  login: async function (req, res) {
    const request = req.body;
    if (request) {
      try {
        if (request.email && emailvalidator.validate(request.email)) {
          var password = request.password;
          if (password) {
            sql = "SELECT * FROM tbl_user where email = ? AND password = ?";
            var dbquery = await mysqlcon(sql, [
              request.email,
              md5(request.password),
            ]);
            // console.log(dbquery[0].account_type);

            if (dbquery[0]) {
              if (dbquery[0].complete_profile == 1) {
                if (dbquery[0].status == 1) {
                  let sqlCheck =
                    "SELECT * FROM tbl_merchnat_answer WHERE user_id = ?";
                  let resultCheck = await mysqlcon(sqlCheck, [dbquery[0].id]);

                  let questionAnswer = [];

                  if (resultCheck.length !== 0) {
                    for (let i = 0; i < resultCheck.length; i++) {
                      let sqlExtract =
                        "SELECT * FROM tbl_login_security WHERE id = ?";
                      let resultExtract = await mysqlcon(sqlExtract, [
                        resultCheck[i].question,
                      ]);

                      questionAnswer.push({
                        id: resultCheck[i].question,
                        question: resultExtract[0].question,
                        answer: resultCheck[i].answer,
                      });
                    }
                  }

                //  CREATING JWT TOKEN
                const token = jwt.sign(
                  { id: dbquery[0].id },
                  config.JWT_SECRET,
                  { expiresIn: config.JWT_EXPIRY }
                );
                  console.log(token);
                  dbquery[0]["token"] = token;
                  res
                    .status(200)
                    .json({
                      status: false,
                      is_complete:1,
                      message: "Login successfully",
                      questionAnswer,
                      data: dbquery[0],
                      account_Type: dbquery[0].account_type,
                    });
                } else {
                  res
                    .status(201)
                    .json({
                      status: false,
                      message:
                        "Your profile is active now, It is in under-review wait 24 hours.",
                      data: [],
                    });
                }
              } else {
                let token = await jwt.sign(
                  { id: dbquery[0].id },
                  config.JWT_SECRET,
                  { expiresIn: config.JWT_EXPIRY }
                );
                dbquery[0]["token"] = token;
                res
                  .status(201)
                  .json({
                    status: false,
                    is_complete:2,
                    message: "Your profile is not complete.",
                    data: dbquery[0],
                  });
              }
            } else {
              res
                .status(201)
                .json({
                  status: false,
                  message: "You entered a wrong credentials.",
                  data: [],
                });
            }
          } else {
            res
              .status(201)
              .json({
                status: false,
                message: "Enter a valid password",
                data: [],
              });
          }
        } else {
          res
            .status(201)
            .json({
              status: false,
              message: "Enter a valid email id",
              data: [],
            });
        }
      } catch (e) {
        console.log(e);
        res
          .status(500)
          .json({
            status: false,
            message: "Error to complete task.",
            data: [],
          });
      } 
    } else {
      res
        .status(201)
        .json({
          status: false,
          message: "Enter valid email and password",
          data: [],
        });
    }
  },

  get_countries: async function (req, res) {
    // console.log('solution : ', req.user);
    try {
      let users = req.user;
      if (users) {
        sql = "SELECT * FROM countries WHERE 1 ORDER BY name ASC";
        var dbquery = await mysqlcon(sql);
        if (dbquery) {
          res.status(200).json({
            status: false,
            message: "Country list get successfully",
            data: dbquery,
          });
        }
      } else {
        res
          .status(201)
          .json({ status: false, message: "Authentication Failed.", data: [] });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  get_solution_apply: async function (req, res) {
    // console.log('solution : ', req.user);
    try {
      let users = req.user;
      if (users) {
        sql = "SELECT  * FROM countries where status = 1";
        var dbquery = await mysqlcon(sql, function (err, results) {
          if (err) {
            // console.log('Query : ', dbquery.sql);
            res.status(201).json({
              status: false,
              message: "Solution apply countries not found",
              data: [],
            });
          }
          if (results) {
            sql = "SELECT  * FROM payment_method where status = 1";
            var dbquery = mysqlcon(sql, function (err, payment_method) {
              if (err) {
                // console.log('Query : ', dbquery.sql);
                res.status(201).json({
                  status: false,
                  message: "Solution apply countries not found",
                  data: [],
                });
              }
              if (payment_method) {
                // console.log(payment_method);
                for (const result in results) {
                  // console.log(result);
                  // console.log(results[result].support_payment_method);
                  var local = [];
                  var pay_method =
                    results[result].support_payment_method.split(",");
                  for (const pmethod in payment_method) {
                    // console.log(payment_method[pmethod].id, pay_method);
                    if (pay_method.includes(payment_method[pmethod].id + "")) {
                      // console.log('innnnnn');
                      // console.log(payment_method[pmethod]);
                      local.push(payment_method[pmethod]);
                    }
                  }
                  results[result].support_method = local;
                }
                res.status(200).json({
                  status: false,
                  message:
                    "Solution Countries and solution apply are get successfully",
                  data: results,
                });
              }
            });
          }
        });
      } else {
        res
          .status(201)
          .json({ status: false, message: "Authentication Failed.", data: [] });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
  },

  qusAns: async function (req, res) {
    try {
      let { id } = req.user;
      let {
        question_id1,
        answer1,
        question_id2,
        answer2,
        question_id3,
        answer3,
      } = req.body;
      if (
        question_id1 ||
        answer1 ||
        question_id2 ||
        answer2 ||
        question_id3 ||
        answer3
      ) {
        if (
          question_id1 &&
          answer1 &&
          question_id2 &&
          answer2 &&
          question_id3 &&
          answer3
        ) {
          sqlForAns =
            "INSERT INTO tbl_merchnat_answer  (user_id,question,answer) VALUES ?";
          let values = [
            [id, question_id1, answer1],
            [id, question_id2, answer2],
            [id, question_id3, answer3],
          ];
          let result = await mysqlcon(sqlForAns, [values]);
          if (result) {
            res.status(200).json({
              status: true,
              database: true,
              message: "Answer added successfully",
            });
          } else {
            res.status(201).json({
              status: false,
              message: "Answer not added",
            });
          }
        } else {
          res.status(201).json({
            status: false,
            message: "Please answer all questions",
          });
        }
      } else {
        let sqlForQus = "SELECT id,question  From tbl_login_security";
        let result = await mysqlcon(sqlForQus);
        if (result) {
          res.status(200).json({
            status: true,
            message: "Question get successfully",
            data: result,
          });
        } else {
          res.status(201).json({
            status: false,
            message: "Question not found",
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error ❌",
        error: err,
      });
    }
  },

  tokenMail: async function(req,res){
    const { email } = req.body;
    console.log(req.body)
    const sql = "SELECT verification_token FROM tbl_user WHERE email = ?";
    try {
      const result = await mysqlcon(sql, [email]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Email Not found.' });
      }
      const verificationToken = result[0].verification_token;
  
      var page_path = path.join(__dirname, '../views/forgetpassword.ejs');
      console.log(page_path);
      send_mail.mail({email:email,token:verificationToken, subject:'Password Reset'}, 'forgetpassword')
      return res.status(200).json({ message: 'Email sent successfully.' });
  
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error.' });
    }
  },

  forgotPassword: async function(req, res){
    try {
      const { newpassword, confirmPassword, userVerificationToken } = req.body;
      console.log(req.body)
      if (!newpassword || !confirmPassword || !userVerificationToken) {
        return res.status(400).json({ message: 'Please provide password, confirmPassword, and userVerificationToken.' });
      } else if (newpassword !== confirmPassword) {
        return res.status(400).json({ message: 'Password and confirmPassword do not match.' });
      } else {
        let sql = "SELECT verification_token FROM `tbl_user` WHERE verification_token = ?;";
        const dbResult = await mysqlcon(sql, [userVerificationToken]);
        if (dbResult.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
        }
        const dbVerificationToken = dbResult[0].verification_token;
        if (userVerificationToken === dbVerificationToken) {
          let details = {
            password: md5(newpassword),
          };
          let sql2 = "UPDATE tbl_user SET ? WHERE verification_token = ?"
          let result = await mysqlcon(sql2, [details, userVerificationToken]);
          if (result.length === 0) {
            return res.status(200).json({ message: 'Password changed not successfully.' });
          } else {
            return res.status(200).json({ message: 'Password changed successfully.' });
          }
        } else {
          return res.status(400).json({ message: 'Verification tokens do not match.' });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: 'An error occurred.',
        error: error,
      });
    }
  }
};

module.exports = loginCont;

module.exports.Kyc = async(req,res) =>{

  console.log(req.body.filterType)

  let filterType = req.body.filterType ? Number(req.body.filterType) : 1 ; req.body.filterType ? Number(req.body.filterType) : 2 ;req.body.filterType ? Number(req.body.filterType) : 3 ;req.body.filterType ? Number(req.body.filterType) : 4 ; req.body.filterType ? Number(req.body.filterType) : '';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "kr.manjeet319@gmail.com",
      pass: "mfvadlyccsgukabu",
    }
  });

  const mailOptions = {
    from: "kr.manjeet319@gmail.com",
    to: 'anisha16rawat@gmail.com',
    subject: 'Send Attachament',
    html: '<h1>Hello, This is Attachanment !!</h1><p>This is test mail..!</p>',
    attachments: [
      {
        filename: req.files.image[0].originalname, 
        path : filepath+"/"+ req.files.image[0].originalname
      },
      {
        filename: req.files.image1[0].originalname, 
        path : filepath+"/"+ req.files.image1[0].originalname
      },
      {
        filename: req.files.image2[0].originalname, 
        path :  filepath +"/"+ req.files.image2[0].originalname
      },
      {
        filename: req.files.image3[0].originalname, 
        path :  filepath +"/"+ req.files.image3[0].originalname
      }
    ]
  }
  
  var llp = {
    llp_business_identity : req.files.image[0].originalname,
    llp_business_existence : req.files.image1[0].originalname,
    llp_business_owners : req.files.image2[0].originalname,
    llp_business_working : req.files.image3[0].originalname,
  }
  
  let prtnr = {
    prtnr_business_identity : req.files.image[0].originalname,	
    prtnr_business_existence : req.files.image1[0].originalname,
    prtnr_business_working : req.files.image2[0].originalname,
    prtnr_business_owners : req.files.image3[0].originalname
  }

  let sole = {
    sole_business_identity_existence : req.files.image[0].originalname,	
    sole_business_working : req.files.image1[0].originalname,
    sole_business_owners : req.files.image2[0].originalname,
    sole_address_owner : req.files.image3[0].originalname
  }

  let ngo =  {
    ngo_business_identity : req.files.image[0].originalname ,
    ngo_business_existence : req.files.image1[0].originalname,	
    ngo_business_working : req.files.image2[0].originalname,
    ngo_business_owners : req.files.image3[0].originalname
  }

try{

  if(filterType === 1){
    
    let sql = "INSERT INTO kyc_document SET ?, created_on = now(), modified_on = now()  "
    let result = await mysqlcon(sql,[llp])

    console.log(filepath)
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
        res.status(200).json({
          message : "error",
        })
      } else {
        res.status(200).json({
          message : "Documents Uploaded",
        });
      }
    });

  }else if(filterType === 2){
    let sql = "INSERT INTO kyc_document  SET ?, created_on = now(), modified_on = now()"
    let result = await mysqlcon(sql,[prtnr])
        
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
        res.status(200).json({
          message : "error",
        })
      } else {
        res.status(200).json({
          message : "Documents Uploaded",
        });
      }
    });

  }else if(filterType === 3){
    let sql = "INSERT INTO kyc_document  SET ?, created_on = now(), modified_on = now()"
    let result = await mysqlcon(sql,[sole])
        
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
        res.status(200).json({
          message : "error",
        })
      } else {
        res.status(200).json({
          message : "Documents Uploaded",
        });
      }
    });
    
  }else if(filterType === 4){
    let sql = "INSERT INTO kyc_document  SET ?, created_on = now(), modified_on = now()"
    let result = await mysqlcon(sql,[ngo])
        
      transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
        res.status(200).json({
          message : "error",
        })
      } else {
        res.status(200).json({
          message : "Documents Uploaded",
        });
      }
    });
  }
}catch(error){
  console.log(error)
  return res.json(500,{
    message : 'error'
  })
}
}
