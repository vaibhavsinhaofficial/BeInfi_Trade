const mysqlcon = require("../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// Default Api 👇

module.exports.defaultSubmerchant = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_merchant_child";
    let sqlCount =
      "select count (*) as Total FROM tbl_merchant_child WHERE page_title  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT *, DATE_FORMAT(tbl_merchant_child.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_child.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_child ORDER BY created_on DESC LIMIT ?,?";
    let sql2 =
      "SELECT *, DATE_FORMAT(tbl_merchant_child.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_child.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_child WHERE page_title  LIKE '%" +
      searchItem +
      "%' ORDER BY created_on LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    let startRange = start + 1;
    let endRange = start + result1.length;

    return res.json(200, {
      message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "Showing 0 data from 0",
      currentPage: page,
      totalPages: numOfPages,
      pageLimit: limit,
      data: result1,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 Create Api👇
module.exports.createSubmerchant = async function (req, res) {
  try {
    let { name, sec_key, salt, percentage, mid, merchant_ids } = req.body;

    let details = {
      name,
      sec_key,
      salt,
      percentage,
      mid,
      merchant_ids,
      created_on : formattedIST,
      updated_on: formattedIST
    };

    let sql = "INSERT INTO tbl_merchant_child SET ? , created_on = NOW() , updated_on = NOW()";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Sub Merchant Created Successfully ✅",
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

// Read One Api 👇
module.exports.readOneSubmerchant = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_merchant_child WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    res.json(result[0]);
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 Update Api 👇
module.exports.editSubmerchant = async function (req, res) {
  try {
    let { id, name, sec_key, salt, percentage, mid, merchant_ids } = req.body;
 
    let details = {
      name,
      sec_key,
      salt,
      percentage,
      mid,
      merchant_ids,
      updated_on: formattedIST
    };

    if (id) {
      let sql = "UPDATE tbl_merchant_child SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Sub Merchant Edited Successfully ✅",
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
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
