const mysqlcon = require("../../config/db_connection");
const emailvalidator = require("email-validator");
const send_mail = require("../../helper/send-mail");
const path = require("path");
const md5 = require("md5");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace("T", " ");

let pagination = (total, page) => {
  let limit = 10;

  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;

  return { limit, start, numOfPages };
};

module.exports.teamDefault = async function (req, res) {
    try {
        let { parent_id } = req.user;

        let sql = "SELECT COUNT(*) as Total FROM tbl_user WHERE parent_id = ? And account_type = 3";

        let result = await mysqlcon(sql, [parent_id]);

        let total = result[0].Total;

        let Page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;

        let { start, numOfPages } = pagination(total, Page, limit);

        let sql1 =
        "SELECT tbl_user.*, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on, '%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_user WHERE parent_id = ? AND account_type = 3 ORDER BY created_on DESC limit ?,?";

        let result1 = await mysqlcon(sql1, [parent_id, start, limit]);
        let startRange = start + 1;
        let endRange = start + result1.length;

        return res.json(200, {
        message:
            result1.length > 0
            ? `Showing ${startRange} to ${endRange} data from ${total}`
            : "NO DATA",
        currentPage: Page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
        });
    } catch (error) {
        console.log(error);
        return res.json(500, {
        message: "error occurered",
        error: error,
        });
    }
};

module.exports.teamCreateEmployee = async function (req, res) {
  try {
    let { parent_id } = req.user;

    let { email, mobile_no, fname, lname, usercode } = req.body;

    if (!emailvalidator.validate(email)) {
    }
    let sql =
      "SELECT email FROM tbl_user WHERE parent_id = ? && email = ? && account_type = 3";
    // checking if email exist or not
    let result = await mysqlcon(sql, [parent_id, email]);
    if (result.length === 0) {
      let sql1 =
        "SELECT mobile_no FROM tbl_user WHERE parent_id = ? && mobile_no = ? && account_type = 3";
      // checking if mobile number exist or not
      let result1 = await mysqlcon(sql1, [parent_id, mobile_no]);
      // if email and mobile number both not exist than create row in the database
      if (result1.length === 0) {
        if (email && emailvalidator.validate(email)) {
          const defaultPassword = Math.random().toString(36).slice();
          const Password = md5(defaultPassword);
          let details = {
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname,
            mobile_no: req.body.mobile_no,
            name: `${fname} ${lname}`,
            created_on: formattedIST,
            updated_on: formattedIST,
            parent_id: user.id,
            usercode: usercode,
            status: 0,
            password: Password,
            account_type: 3,
          };
          let sql2 = "INSERT INTO tbl_user SET ?";
          let result2 = mysqlcon(sql2, details);
          if (!result2) {
            return res.status(201).json({
              message: "Error in Adding Employee",
            });
          } else {
            if (usercode === "1") {
              usercode = "Adminstrator";
            }
            if (usercode === "2") {
              usercode = "Manager";
            }
            if (usercode === "3") {
              usercode = "Cashier";
            }
            if (usercode === "4") {
              usercode = "Reporter";
            }
            var page_path = path.join(__dirname, "../views/employee.ejs");
            console.log(page_path);
            let name = `${fname} ${lname}`;
            send_mail.mail(
              {
                email: email,
                mobile_no: mobile_no,
                name: name,
                usercode: usercode,
                Password: defaultPassword,
                subject: "Team Create",
              },
              "employee"
            );
            return res.status(200).json({
              message: "Employee Added",
            });
          }
        } else {
          return res.status(201).json({
            message: "Email Not Valid/Correct",
          });
        }
      } else {
        return res.json(200, {
          message: "Employee Email Already Exist",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.getTeam = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      result: result[0],
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.teamEdit = async function (req, res) {
  try {
    let { fname, lname, email, mobile_no, usercode, id } = req.body;
    console.log(req.body);

    let details = {
      fname,
      lname,
      email,
      mobile_no,
      usercode,
      updated_on: formattedIST,
      name: `${fname} ${lname}`,
    };

    let sql = "UPDATE tbl_user SET ? WHERE id = ?";

    let result = await mysqlcon(sql, [details, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Team Details Updated",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error while updating",
        data: result,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.teamDeleteTeam = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "DELETE FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    if (result) {
      return res.json(200, {
        message: "Team Member Deleted Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error while Deleting",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.teamVerifyTeam = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "UPDATE tbl_user SET status = 1 WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    if (result) {
      return res.json(200, {
        message: `Team Member Verified Successfully`,
      });
    } else {
      return res.json(201, {
        message: "Error while Changing email",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurred",
      error: error,
    });
  }
};
