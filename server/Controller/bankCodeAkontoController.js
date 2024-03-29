const mysqlcon = require("../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// 👇Read Api 👇
module.exports.readBankCodeAkonto = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let {searchVal, date, to, from} = req.body;
    let sql = "select count (*) as Total from tbl_akonto_banks_code";
    let sqlCount =
      "select count (*) as Total FROM tbl_akonto_banks_code WHERE title  LIKE '%" +
      searchVal +
      "%' OR  code  LIKE '%" +
      searchVal +
      "%'";
    let sqlDate = "SELECT count (*) AS Total FROM tbl_akonto_banks_code WHERE Date(created_on) = ?" ;
    let sqlToFrom = "SELECT count (*) AS Total FROM tbl_akonto_banks_code WHERE Date(created_on) >= ? AND Date(created_on) <= ?"

    let result = await mysqlcon(searchVal ? sqlCount: date ? sqlDate: to && from ? sqlToFrom  : sql,  date ? [date] : to && from ? [from, to] :"");
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);
    

    let sql1 = "SELECT tbl_akonto_banks_code.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_akonto_banks_code ORDER BY created_on DESC LIMIT ?,?";
    let sql2 =
      "SELECT tbl_akonto_banks_code.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_akonto_banks_code WHERE title  LIKE '%" +
      searchVal +
      "%' OR  code  LIKE '%" +
      searchVal +
      "%'  LIMIT ?,?";
    let sql_Date = "SELECT tbl_akonto_banks_code.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_akonto_banks_code WHERE Date(created_on) = ? ORDER BY created_on DESC limit ?,?";
    let sql_tofrom = "SELECT tbl_akonto_banks_code.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_akonto_banks_code WHERE Date(created_on) >= ? AND Date(created_on) <= ? ORDER BY created_on DESC limit ?,?"

    let result1 = await mysqlcon(searchVal ? sql2: date? sql_Date: to && from? sql_tofrom : sql1, date? [date, start, limit] : to && from ? [from, to, start, limit]: [start, limit]);

    let startRange = start + 1;
    let endRange = start + result1.length;

    return res.json(200, {
      message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
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
// 👇 Update Api 👇
module.exports.updateBankCodeAkonto = async function (req, res) {
  try {
    let { type, title, code, id, currencies } = req.body;

    let currenciesString = Array.isArray(currencies) ? currencies.join(',') : currencies;
    
    let details = {
      type,
      title,
      code,
      currencies: currenciesString,
      updated_on: formattedIST
    };

    if (id) {
      let sql = "UPDATE tbl_akonto_banks_code SET ? where id = ?";
      let result = await mysqlcon(sql, [details, id]);
      if (result) {
        return res.json(200, {
          message: "Bankcode Updated ✅",
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
// Read Update Api 👇
module.exports.readUpdateBankCodeAkonto = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_akonto_banks_code WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      message: "Data Fetched Successfully✅",
      data: result[0],
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇Delete Api 👇
module.exports.deleteBankCodeAkonto = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_akonto_banks_code WHERE id = ?";
    let result = await mysqlcon(sql, [id]);


    if (result) {
      return res.json(200, {
        message: "Delete Successfully✅",
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
// 👇 Create Api👇
module.exports.createBankCodeAkonto = async function (req, res) {
  try {
    let { type, title, code, currencies } = req.body;
    

    let currenciesString = currencies.join(',');

    let details = {
      type,
      title,
      code,
      currencies: currenciesString,
      created_on: formattedIST,
      updated_on: formattedIST
    };

    let sql = "INSERT INTO tbl_akonto_banks_code SET ?";

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
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇 TOGGLE Api👇
module.exports.toggleBankCodeAkonto = async function (req, res) {
  try {
    let { id, status } = req.body;
    let sql = "UPDATE tbl_akonto_banks_code SET status = ? WHERE id = ?";

    let result = await mysqlcon(sql, [status, id]);

    if (result) {
      return res.json(200, {
        message: status === "0" ? "Bankcode Disabled Successfully✅" : "Bankcode Enabled Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Updating",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.currencySelect = async function (req, res) {
  try {
    let sql = "SELECT sortname as value, sortname as label from countries WHERE status = 1"
    let result = await mysqlcon(sql)
    return res.json(200, {
      result
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}


// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
