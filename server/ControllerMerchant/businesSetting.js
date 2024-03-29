const mysqlcon = require("../config/db_connection");
const md5 = require('md5');
const emailvalidator = require("email-validator");
const nodemailer = require("nodemailer");
const path = require("path");
const filepath = path.join(__dirname, "../../client/public/documents");

class BusinesSetting {
  async default(req, res) {
    try {
      const { id } = req.user;
      const { tab } = req.body;
      // const {token} = req.body;
      // console.log(token)
      switch (tab) {
        case "1": {
          const sql ="SELECT bname, trading_dba, blocation, busines_Code, busines_Country, fname, lname, main_contact_email FROM tbl_user WHERE id = ?";
          const sqlForCountry = "SELECT id,name, sortname FROM countries";
          const result = await mysqlcon(sql, [id]);
          const country = await mysqlcon(sqlForCountry);
          res.status(200).json({
            success: true,
            message: "Company Profile",
            result: result[0],
            country,
          });
          break;
        } case "2": {
          const sql ="SELECT  solution_apply_for_country, mode_of_solution FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Solution Apply for country",
            solution_apply_for_country:
              result[0].solution_apply_for_country.split(","),
            mode_of_solution: result[0].mode_of_solution.split(','),
          });
          break;
        } case "3": {
          const sql ="SELECT  director1_name, director1_dob, director1_nationality, director2_name, director2_dob, director2_nationality FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Director's Info",
            result:result[0]
          });
          break;
        } case "4": {
          const sql ="select shareholder1_name, shareholder1_dob, shareholder1_nationality, shareholder2_name, shareholder2_dob, shareholder2_nationality FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Shareholder Info",
            result: result[0],
          });
          break;
        } case "5": {
          const sql ="SELECT  website, job_title, company_estimated_monthly_volume, company_avarage_ticket_size FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Business Info",
            result: result[0],
          });
          break;
        } case "6": {
          const sql ="SELECT  settle_currency, wallet_url FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Settelment Info",
            result: result[0],
          });
          break;
        } case "7": {
          const sql = "SELECT  id, secretkey FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Keys",
            result: result[0],
          });
          break;
        } case "8": {
        const sql = "SELECT tbl_login_security.question, tbl_merchnat_answer.answer FROM tbl_login_security INNER JOIN tbl_merchnat_answer ON tbl_login_security.id = tbl_merchnat_answer.question where user_id = ?";
        const sql2 = 'select security_status from tbl_user where id = ?'
        const result = await mysqlcon(sql,[id]);
        const result2 = await mysqlcon(sql2,[id]);
          res.status(200).json({
            success: true,
            message: "Qus And Ans",
            result,
            toggle:{...result2[0]}
          });
          break;
        } case "9": {
          const sql = "SELECT merchant_id, upi_id, status, create_on, update_on FROM tbl_upi_block WHERE merchant_id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "BLock",
            result: result,
          });
          break;
        } case "10": {
          try{
            let {mode_of_solution} = req.user;
            let mode = mode_of_solution.split(',').map((item)=>item.split('.'))
            let sqlCountries = "SELECT id,name, sortname,support_payment_method FROM countries WHERE id in (?)";
            let sqlPayment_method= "SELECT id as mode,name,type FROM `payment_method` WHERE id in(?)";
            let countryResult = await mysqlcon(sqlCountries,[mode.map((item)=>item[0])]);
            let payment_methodResult = await mysqlcon(sqlPayment_method,[mode.map((item)=>item[1])]);
            let data = [] 
            countryResult.forEach((item)=>payment_methodResult.forEach((item2)=>{
              item.support_payment_method.split(',').forEach((item3)=>{
                   if( item3==item2.mode){
                    data.push({country:item.name,sortname:item.sortname,name:item2.name,type:item2.type}) 
                  }
              })
            }))
          res.status(200).json({data});
        }
        catch(error){
          console.log(error) 
            return res.json(500, {
                message: "error occurered",
                error: error,
              });
        }
          break;
        }
       
        default:
          res.status(400).json({
            success: false,
            message: "somthing went wrong",
          });
          break;
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        sussess: false,
        message: err,
      });
    }
  }
  async toggleQNA(req,res){
    try {
     const {id} = req.user

    const {toggle} = req.body
    // console.log(toggle);
    if(!toggle){
      return res.status(400).json({message:"Error in Toggle"})
    }
   const sqlToggle = "UPDATE tbl_user SET security_status = ? WHERE id = ?"
   const toggleResult = await mysqlcon(sqlToggle,[toggle,id]);
   res.status(200).json({
    success: true,
    result:"Authentication succesfully changed"
  });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "somthing went wrong",
        error
      });
    }    
  }
  async blockToggle(req,res){
    try {
    const {status,id} = req.body
    if(!status && !id){
      return res.status(400).json({message:"Error in Status change"})
    }
   const sqlToggle = "UPDATE tbl_upi_block SET status = ?, create_on = Now() WHERE upi_id = ?"
   const result = await mysqlcon(sqlToggle,[status,id]);
   res.status(200).json({
    success: true,
    result:result.changedRows==0?"No Change":"Successfuly Change"
  });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "somthing went wrong",
        error
      });
    }    
  }
  async download(req, res) {
    let user = req.user;
      try {
        let {mode_of_solution} = req.user;
        
        let mode = mode_of_solution.split(',').map((item)=>item.split('.'))
        
        let sqlCountries = "SELECT id,name, sortname,support_payment_method FROM countries WHERE id in (?)";
        let country_method = await mysqlcon(sqlCountries,[mode.map((item)=>item[0])]);

        let sqlPayment_method= "SELECT id,name,type FROM `payment_method` WHERE status =1";
        let payment_result = await mysqlcon(sqlPayment_method);
        for(var i = 0; i < country_method.length; i++){
          let loc_arr = [];
          let method_arr = (country_method[i].support_payment_method).split(',');
          for(var j = 0; j < payment_result.length; j++){
            if(method_arr.includes(payment_result[j].id+'')){
              loc_arr.push(payment_result[j]);
            }
          } 
          country_method[i]['methods'] = loc_arr;         
        }
        // res.send(country_method);
        // let payment_methodResult = await mysqlcon(sqlPayment_method,[mode.map((item)=>item[1])]);
        // let data = [] 
        // countryResult.forEach((item)=>payment_methodResult.forEach((item2)=>{
        //   item.support_payment_method.split(',').forEach((item3)=>{
        //        if( item3==item2.mode){
        //         data.push({country:item.name,sortname:item.sortname,name:item2.name,type:item2.type}) 
        //       }
        //   })
        // }))
        // res.send(data);
      let defaultSql = "SELECT name, email, complete_profile, id, secretkey, bname, trading_dba, blocation, busines_Code, fname, lname, main_contact_email, director1_name, director1_dob, director1_nationality, director2_name, director2_dob, director2_nationality, shareholder1_name, shareholder1_dob, shareholder1_nationality, shareholder2_name, shareholder2_dob, shareholder2_nationality, website, job_title, company_estimated_monthly_volume, company_avarage_ticket_size, settle_currency, wallet_url from tbl_user WHERE id = ?";
      let bcountrySql = "SELECT countries.name FROM countries INNER JOIN tbl_user ON countries.id = tbl_user.busines_Country WHERE tbl_user.id = ?";
      const defaultResult = await mysqlcon(defaultSql, [user.id]);
      const bcountryResult = await mysqlcon(bcountrySql, [user.id]);
      res.status(200).json({
        default: defaultResult,
        buisness_country:bcountryResult,
        countryResult: country_method
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Somthing went wrong in reports",
      });
    }
  }
  async blockCoustomer(req,res){
    try {
      let user = req.user;
      let { upi_id } = req.body;
      
      // Slicing the upi_id data
      let upi_no = upi_id.slice(0, 10); // Assuming you want to take the first 6 characters
      let currentDate = new Date();
      
      let details = {
        merchant_id: user.id,
        upi_id,
        upi_no,
        create_on: currentDate,
        update_on: currentDate
      };
    
      let sql = "INSERT INTO tbl_upi_block SET ?";
      const result = await mysqlcon(sql, [details]);
      console.log(result);
      if(result){
      let detail = {
        title : 'Customer UPI ID Blocked By Merchant',
        message : `${upi_id} blocked by ${user.name}`,
        type : 2,
        user_id : user.id,
        created_on : currentDate,
        updated_on : currentDate
      }
      let sqlN = "INSERT INTO tbl_notification SET ?"
      let resultN = await mysqlcon(sqlN,[detail])
      if(resultN){
        return res.json(201, {
          message: "data Inserted",
        });
      }else{
        return res.json(201, {
          message: "Error While insert",
        });
      }
    }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong in reports",
      });
    }
  }

  async uploadDocument(req, res){
    const {id} = req.body
    let filterType = req.body.filterType ? Number(req.body.filterType) : 1 ; req.body.filterType ? Number(req.body.filterType) : 2 ;req.body.filterType ? Number(req.body.filterType) : 3 ;req.body.filterType ? Number(req.body.filterType) : 4 ; req.body.filterType ? Number(req.body.filterType) : '';
    console.log(req.body.filterType)
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
      merchant_id : id,
      llp_business_identity : req.files.image[0].originalname,
      llp_business_existence : req.files.image1[0].originalname,
      llp_business_owners : req.files.image2[0].originalname,
      llp_business_working : req.files.image3[0].originalname,
    }
    
    let prtnr = {
      merchant_id : id,
      prtnr_business_identity : req.files.image[0].originalname,	
      prtnr_business_existence : req.files.image1[0].originalname,
      prtnr_business_working : req.files.image2[0].originalname,
      prtnr_business_owners : req.files.image3[0].originalname
    }
  
    let sole = {
      merchant_id : id,
      sole_business_identity_existence : req.files.image[0].originalname,	
      sole_business_working : req.files.image1[0].originalname,
      sole_business_owners : req.files.image2[0].originalname,
      sole_address_owner : req.files.image3[0].originalname
    }
  
    let ngo =  {
      merchant_id : id,
      ngo_business_identity : req.files.image[0].originalname ,
      ngo_business_existence : req.files.image1[0].originalname,	
      ngo_business_working : req.files.image2[0].originalname,
      ngo_business_owners : req.files.image3[0].originalname
    }
    try {
      let sql = "SELECT kyc_type from tbl_user WHERE id = ?";
      let result = await mysqlcon(sql,[id])
      let test = result[0].kyc_type
      if(test !== 0){
        if(test === "llp"){
          let sql = "UPDATE kyc_document SET ?, created_on = now(), modified_on = now() WHERE merchant_id = ?  "
          let result = await mysqlcon(sql,[llp, id])
        
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
      
        }else if(test === "prtnr"){
          let sql = "UPDATE kyc_document  SET ?, created_on = now(), modified_on = now() WHERE merchant_id = ?"
          let result = await mysqlcon(sql,[prtnr, id])
              
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
      
        }else if(test === "sole"){
          let sql = "UPDATE kyc_document  SET ?, created_on = now(), modified_on = now() WHERE merchant_id = ?"
          let result = await mysqlcon(sql,[sole, id])
              
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
          
        }else if(test === "ngo"){
          let sql = "UPDATE kyc_document  SET ?, created_on = now(), modified_on = now() WHERE merchant_id = ?"
          let result = await mysqlcon(sql,[ngo, id])
              
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
      } else {
        if(filterType === 1){
        let sql = "INSERT INTO kyc_document SET ?, created_on = now(), modified_on = now()"
        let userSql = "UPDATE tbl_user SET kyc_type = 'llp' WHERE id = ?"
        let result = await mysqlcon(sql,[llp])
        let result1 = await mysqlcon(userSql, [id])
      
        transporter.sendMail(mailOptions, function(error, info){
          if (error){
            console.log(error)
            res.status(200).json({
              message : "error",
            })
          } else {
            res.status(200).json({
              message : "Documents Uploaded",
              result1
            });
          }
        });

        }else if(filterType === 2){
        let sql = "INSERT INTO kyc_document  SET ?, created_on = now(), modified_on = now()";
        let userSql = "UPDATE tbl_user SET kyc_type = 'prtnr' WHERE id = ?"
        let result = await mysqlcon(sql,[prtnr])
        let result1 = await mysqlcon(userSql, [id])
            
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
        let sql = "INSERT INTO kyc_document  SET ?, created_on = now(), modified_on = now()";
        let userSql = "UPDATE tbl_user SET kyc_type = 'sole' WHERE id = ?"
        let result = await mysqlcon(sql,[sole])
        let result1 = await mysqlcon(userSql, [id])
            
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
          let userSql = "UPDATE tbl_user SET kyc_type = 'ngo' WHERE id = ?"
          let result = await mysqlcon(sql,[ngo])
          let result1 = await mysqlcon(userSql, [id])
              
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
      }
    } catch (error) {
      console.log(error)
      return res.json(500,{
        message : 'error'
      })
    }
  }
  async kycdetails(req, res){
    try {
      const id = req.user.id;
      let sql = "SELECT kyc_type from tbl_user WHERE id = ?";
      let result = await mysqlcon(sql,[id])
      let test = result[0].kyc_type;
      let sqlResult;
      let sql1;
      if(test === "llp"){
        sql1 = "SELECT id, merchant_id, llp_business_identity AS doc1,llp_business_existence AS doc2,llp_business_owners AS doc3,llp_business_working AS doc4, document_1, document_2, document_3, document_4 FROM kyc_document WHERE merchant_id = ?"
        sqlResult = await mysqlcon(sql1,[id])
    
      }else if(test === "prtnr"){
        sql1 = "SELECT id, merchant_id, prtnr_business_identity AS doc1,prtnr_business_existence AS doc2,prtnr_business_working AS doc3,prtnr_business_owners AS doc4, document_1, document_2, document_3, document_4 FROM kyc_document WHERE merchant_id = ?"
        sqlResult = await mysqlcon(sql1,[id])
    
      }else if(test === "sole"){
        sql1 = "SELECT id, merchant_id, sole_business_identity_existence AS doc1,sole_business_working AS doc2,sole_business_owners AS doc3,sole_address_owner AS doc4, document_1, document_2, document_3, document_4 FROM kyc_document WHERE merchant_id = ?"
        sqlResult = await mysqlcon(sql1,[id])
        
      }else if(test === "ngo"){
        sql1 = "SELECT id, merchant_id, ngo_business_identity AS doc1,ngo_business_existence AS doc2,ngo_business_working AS doc3,ngo_business_owners AS doc4, document_1, document_2, document_3, document_4 FROM kyc_document WHERE merchant_id = ?"
        sqlResult = await mysqlcon(sql1,[id])
      }
      res.status(200).json({
        category: test,
        finalResult: sqlResult
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  }

  async showHideKey(req, res){
    try {
      const { email, password } = req.body;
      // console.log(req.body);
        if (emailvalidator.validate(email)) {
            let sql = "SELECT id, secretkey FROM tbl_user WHERE email = ? and password = ?";
            let result = await mysqlcon(sql, [email, md5(password)]);
            // return res.send(result)
            if(!result){
                return res.status(202).json({
                  message:"error" 
                })
            }else if (Object.keys(result).length) {
                return res.status(200).json({
                    message: "True",
                    data: result
                });
            }else {
                return res.status(201).json({
                  message: "Invalid Email or Password",
                });
            }
        }else {
            return res.status(201).json({
            status: "error",
            message: "Invalid Email",
            });
        }
    } catch (error) {
        console.log(error)
        return res.json(500, {
          message: "error occurered",
        });
    }
  }
}

module.exports = new BusinesSetting();

 
