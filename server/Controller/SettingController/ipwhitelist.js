const mysqlcon = require("../../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

module.exports.defaultIPWhitelist = async function (req, res) {
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };
  try {
    const { to, from, date } = req.body;
    let sqlCount = "select count(*) as Total from tbl_ip_whitelist";
    let sqlCountDate = "select count(*) as Total from tbl_ip_whitelist where DATE(created_on) = ?";
    let sqlToFromCount = "select count(*) as Total from tbl_ip_whitelist where DATE(created_on) >= ? AND DATE(created_on) <= ?";
    let result = await mysqlcon(date ? sqlCountDate : (to && from) ? sqlToFromCount : sqlCount, date ? [date] : (to && from) ? [from, to] : '');
    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, Page, limit);
    let sql = "SELECT tbl_user.name, tbl_ip_whitelist.*, DATE_FORMAT(tbl_ip_whitelist.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_ip_whitelist.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_ip_whitelist LEFT JOIN tbl_user ON tbl_ip_whitelist.user_id = tbl_user.id ORDER BY tbl_ip_whitelist.created_on DESC limit ?,?";
    let sqlDate = "SELECT tbl_user.name, tbl_ip_whitelist.*, DATE_FORMAT(tbl_ip_whitelist.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_ip_whitelist.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_ip_whitelist LEFT JOIN tbl_user ON tbl_ip_whitelist.user_id = tbl_user.id where Date(tbl_ip_whitelist.created_on) = ? ORDER BY tbl_ip_whitelist.created_on DESC limit ?,?";
    let sqlToFrom = "SELECT tbl_user.name, tbl_ip_whitelist.*, DATE_FORMAT(tbl_ip_whitelist.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_ip_whitelist.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_ip_whitelist LEFT JOIN tbl_user ON tbl_ip_whitelist.user_id = tbl_user.id where Date(tbl_ip_whitelist.created_on) >= ? AND Date(tbl_ip_whitelist.created_on) <= ? ORDER BY tbl_ip_whitelist.created_on DESC limit ?,?";
    let result1 = await mysqlcon(date ? sqlDate : (from && to) ? sqlToFrom : sql, date ? [date, start, limit] : (from && to) ? [from, to, start, limit] : [start, limit]);
    let startRange = start + 1;
    let endRange = start + result1.length;

    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing 0 from 0 data `,
        currentPage: Page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `Showing ${startRange} to ${endRange} data from ${total}`,
        currentPage: Page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "Error occurred",
      error: error,
    });
  }
};


// 👇 Create Api👇
module.exports.createIPWhitelist = async function (req, res) {
  try {
    let { user_id, ip } = req.body;

    let details = {
      user_id,
      ip,
      created_on:formattedIST,
      updated_on:formattedIST
    };

    let sql = "INSERT INTO tbl_ip_whitelist SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Data Inserted Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
      console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Gateway
module.exports.allGateway = async function (req, res) {
    try{
        const auth = req.user.email
        sql = "SELECT id, gateway_name from payment_gateway"
        let result = await mysqlcon(sql);
    
        res.status(200).json({
            Data:result,
            auth
        })
    
    }
    catch(err){
      console.log(err)
        res.status(500).json({
            message:"Server Error",
            err,
        })
    }
    
};

// Toggle Button
module.exports.toggleIP = async function (req, res) {
    try {
      let { status, id } = req.body;
  
      let sql = "UPDATE tbl_ip_whitelist SET status = ? WHERE id = ?";
      let result = await mysqlcon(sql, [status, id]);
      if (result.affectedRows > 0) {
        return res.json(200, {
          message: `Status ${
            status === "1" ? "Enabled" : "Disabled"
          } Successfully `,
          data: result,
          sql,
        });
      } else {
        return res.json(201, {
          message: "Error while Changing Status",
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

// 👇 Update Api 👇
module.exports.editIP = async function (req, res) {
  try {
    let { user_id, ip, id } = req.body;
 
    let details = {
      user_id,
      ip,
      updated_on:formattedIST
    };

    if (id) {
      let sql = "UPDATE tbl_ip_whitelist SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Data Updated ✅",
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else {
      return res.json(205, {
        message: "Kindly Provide Id",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Read One Api 👇
module.exports.readOneIP = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_ip_whitelist WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};