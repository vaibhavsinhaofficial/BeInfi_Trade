const mysqlcon = require("../../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// Default Api 👇

module.exports.defaultSetLimitmodule = async function (req, res) {
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };
  try {
    const { to,from,date } = req.body;
    
    let sqlcount = "select count (*) as Total from tbl_set_limit";
    let sqCountDate = "select count (*) as Total from tbl_set_limit where DATE(created_on) = ?";
    let sqlToFromCount = "select count (*) as Total from tbl_set_limit where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
    
    let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:sqlcount,date?[date]:(to&&from)?[from,to]: '');

    let total = result[0].Total;
    let Page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, Page, limit);

    let sql= "SELECT payment_gateway.gateway_name, tbl_user.name, tbl_set_limit.currency, tbl_set_limit.*, DATE_FORMAT(tbl_set_limit.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_set_limit.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_set_limit LEFT JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id LEFT JOIN payment_gateway ON tbl_set_limit.gateway=payment_gateway.id ORDER BY tbl_set_limit.created_on DESC limit ?,?";
    let sqlDate = "SELECT payment_gateway.gateway_name, tbl_user.name, tbl_set_limit.currency, tbl_set_limit.*, DATE_FORMAT(tbl_set_limit.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_set_limit.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_set_limit LEFT JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id LEFT JOIN payment_gateway ON tbl_set_limit.gateway = payment_gateway.id where Date(tbl_set_limit.created_on) = ? ORDER BY tbl_set_limit.created_on DESC limit ?,?";
    let sqlToFrom = "SELECT payment_gateway.gateway_name, tbl_user.name, tbl_set_limit.currency, tbl_set_limit.*, DATE_FORMAT(tbl_set_limit.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_set_limit.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_set_limit LEFT JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id LEFT JOIN payment_gateway ON tbl_set_limit.gateway = payment_gateway.id where Date(tbl_set_limit.created_on) >= ? AND Date(tbl_set_limit.created_on) <= ? ORDER BY tbl_set_limit.created_on DESC limit ?,?";
  
    let result1 = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:sql,date?[date,start,limit]:(to&&from)?[from,to,start,limit]:[start,limit]);

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
  }
  catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

// Toggle Button
module.exports.toggleLimit = async function (req, res) {
    try {
      let { status, id } = req.body;
  
      let sql = "UPDATE tbl_set_limit SET status = ? WHERE id = ?";
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

// 👇 Create Api👇
module.exports.createLimit = async function (req, res) {
  try {
    let { user_id, gateway, currency, max, min } = req.body;

    let details = {
      user_id,
      gateway,
      currency, 
      max, 
      min,
      created_on:formattedIST,
      updated_on:formattedIST
    };

    let sql = "INSERT INTO tbl_set_limit SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Limit Set Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Setting Limit",
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

// All currency
module.exports.allCurrency = async function (req, res) {
  try{
      
      sql = "SELECT sortname FROM countries WHERE status = 1"
      let result = await mysqlcon(sql);
  
      res.status(200).json({
          Data:result
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

// 👇 Update Api 👇
module.exports.editLimit = async function (req, res) {
  try {
    console.log(req.body);
 
    let details = {
      user_id: req.body.user_id,
      gateway: req.body.gateway,
      currency: req.body.currency, 
      max: req.body.max, 
      min: req.body.min,
      updated_on:formattedIST
    };

    if (req.body.id) {
      let sql = "UPDATE tbl_set_limit SET ? where id = ?";
      let result = await mysqlcon(sql, [details, req.body.id]);
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
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Read One Api 👇
module.exports.readOneLimit = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT payment_gateway.gateway_name, tbl_user.name, tbl_set_limit.currency, tbl_set_limit.*, DATE_FORMAT(tbl_set_limit.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_set_limit.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_set_limit LEFT JOIN tbl_user ON tbl_set_limit.user_id = tbl_user.id LEFT JOIN payment_gateway ON tbl_set_limit.gateway=payment_gateway.id WHERE tbl_set_limit.id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};