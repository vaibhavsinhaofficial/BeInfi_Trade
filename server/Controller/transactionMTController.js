var dateTime = require("node-datetime");
const mysqlcon = require("../config/db_connection");
var dt = dateTime.create();
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// module.exports.defaultMT = async function (req, res) {
//   let pagination = (total, page, limit) => {
//     let numOfPages = Math.ceil(total / limit);
//     let start = page * limit - limit;
//     return { limit, start, numOfPages };
//   }; 
//   try {
//     let {searchText, searchDate, to, from, date, status, merchantName} = req.body;
    
//     let sql = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id";
//     let sqlCount ="select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.order_no LIKE '%" +
//       searchText +
//       "%' OR  tbl_merchant_transaction.txn_id  LIKE '%" +
//       searchText +
//       "%'";
//     // let sqlCount ="select count (*) as Total FROM tbl_user INNER JOIN tbl_merchant_transaction ON tbl_user.id = tbl_merchant_transaction.user_id WHERE  DATE(tbl_merchant_transaction.created_on)=? AND tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND  tbl_merchant_transaction.order_no LIKE '%" +
//     //   searchText +
//     //   "%' OR  tbl_merchant_transaction.txn_id  LIKE '%" +
//     //   searchText +
//     //   "%'";

//     let sqlToFromidStatus = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?";

//     let sqlToFromid1 = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?";
    
//     let sqlToFromstatus = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.status = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?";
    
//     let sqlmidStatus = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ?";  

//     let sqCountDate ="select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where DATE(created_on) = ?";
//     let sqlToFromCount ="select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where DATE(created_on) >= ? AND DATE(created_on) <= ? ";
//     let sqlStatus = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE status = ?"
//     let sqlMerchant = "select count (*) as Total from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE user_id = ?"

//     let result = await mysqlcon(
//       searchText
//       ? sqlCount
//       : merchantName && status && to && from ? sqlToFromidStatus : merchantName && to && from ? sqlToFromid1 : status && to && from ? sqlToFromstatus :merchantName && status ? sqlmidStatus
//       : date
//       ? sqCountDate
//       : to && from
//       ? sqlToFromCount
//       : status
//       ? sqlStatus
//       : merchantName
//       ? sqlMerchant
//       : sql,
//       merchantName && status && to && from ? [merchantName,status ,from, to]:merchantName && to && from ? [merchantName ,from, to]:status && to && from ? [status ,from, to]:merchantName && status ? [merchantName, status]
//       :searchDate ? [searchDate] :
//       date ? [date] :
//       to && from ? [from, to] :
//       status ? [status] :
//       merchantName ? [merchantName]
//       :""
//       );

//     let total = result[0].Total;
//     let page = req.body.page ? Number(req.body.page) : 1;
//     let limit = req.body.limit ? Number(req.body.limit) : 10;
//     let { start, numOfPages } = pagination(total, page, limit);

//     let sql1 = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id ORDER BY tbl_merchant_transaction.created_on DESC LIMIT ?,?";
//     let sql2 =
//     "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.order_no LIKE '%" +
//     searchText +
//     "%' OR  tbl_merchant_transaction.txn_id  LIKE '%" +
//     searchText +
//     "%' LIMIT ?,?";
//     // let sql2 =
//     // "select tbl_user.name,tbl_merchant_transaction.* FROM tbl_user INNER JOIN tbl_merchant_transaction ON tbl_user.id = tbl_merchant_transaction.user_id WHERE  tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND DATE(tbl_merchant_transaction.created_on) = ? AND  tbl_merchant_transaction.order_no LIKE '%" +
//     // searchText +
//     // "%' OR  tbl_merchant_transaction.txn_id  LIKE '%" +
//     // searchText +
//     // "%' LIMIT ?,?";


//     let sqlToFromidstatus = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?  LIMIT ?,?" ;

//     let sqlToFromid = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?  LIMIT ?,?" ;
    
//     let sqlToFromStatus = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.status = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?  LIMIT ?,?" ;
    
//     let sqlidStatus = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ?   LIMIT ?,?" ;

//     let sqlDate ="SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND DATE(tbl_merchant_transaction.created_on) = ? ORDER BY created_on DESC limit ?,?";
//     let sqlToFrom ="SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ? ORDER BY tbl_merchant_transaction.created_on DESC limit ?,?";
//     let sqlStatus2 = "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.status = ? LIMIT ?,?";
//     let merchant= "SELECT tbl_user.name, tbl_merchant_transaction.*, DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.user_id = ? LIMIT ?,?"


//     let result1 = await mysqlcon(searchText ? sql2 :merchantName&& status&& to && from ? sqlToFromidstatus: merchantName&& to && from ? sqlToFromid : status&& to && from ? sqlToFromStatus :merchantName && status? sqlidStatus:  date ? sqlDate : to && from ? sqlToFrom : status? sqlStatus2 : merchantName ? merchant : sql1, 
//       merchantName && status&& to && from ? [merchantName,status,from, to, start, limit] : merchantName && to && from ? [merchantName,from, to, start, limit] :status && to && from ? [status,from, to, start, limit] : merchantName && status ? [merchantName, status, start, limit]
//       :searchDate ? [searchDate, start, limit]:
//       date
//       ? [date, start, limit]
//       : to && from
//       ? [from, to, start, limit]
//       : status
//       ?[status, start, limit] 
//       : merchantName
//       ? [merchantName, start, limit] :
//       [start,limit]);

//     let startRange = start + 1;
//     let endRange = start + result1.length;
 
//     return res.json(200, {
//       message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
//       currentPage: page,
//       totalPages: numOfPages,
//       pageLimit: limit,
//       data: result1,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json(500, {
//       message: "error occurered",
//       error: error,
//     });
//   }
// };

module.exports.defaultMT = async function (req, res) {
  try {
    const { searchText, to, from, status, merchantName, currency, gatewayNumber } = req.body;

    const formatted_date = ["DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on"];
    const formatted_dateStr = formatted_date.join(", ");

    const pagination = (total, page, limit) => {
      const numOfPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      return { limit, start, numOfPages };
    };

    const sqlDefault = `SELECT tbl_user.name, tbl_merchant_transaction.*, ${formatted_dateStr} FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id`;

    const sqlConditions = [];
    const sqlValues = [];

    if (merchantName) {
      sqlConditions.push("tbl_merchant_transaction.user_id = ?");
      sqlValues.push(merchantName);
    }

    if (status) {
      sqlConditions.push("tbl_merchant_transaction.status = ?");
      sqlValues.push(status);
    }

    if (to && from) {
      sqlConditions.push("DATE(tbl_merchant_transaction.created_on) >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?");
      sqlValues.push(from, to);
    }

    if (currency) {
      sqlConditions.push("tbl_merchant_transaction.ammount_type = ?");
      sqlValues.push(currency);
    }

    if (gatewayNumber) {
      sqlConditions.push("tbl_merchant_transaction.gatewayNumber = ?");
      sqlValues.push(gatewayNumber);
    }

    if (searchText) {
      sqlConditions.push("(tbl_merchant_transaction.order_no LIKE ? OR tbl_merchant_transaction.txn_id LIKE ?)");
      sqlValues.push(`%${searchText}%`, `%${searchText}%`);
    }

    const conditionsStr = sqlConditions.length > 0 ? `WHERE ${sqlConditions.join(" AND ")}` : "";

    const sqlCount = `SELECT COUNT(*) AS Total FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id ${conditionsStr} AND tbl_user.status = 1 AND tbl_user.complete_profile = 1`;

    let result = await mysqlcon(sqlCount, sqlValues);

    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    const sqlData = `${sqlDefault} ${conditionsStr} ORDER BY tbl_merchant_transaction.created_on DESC LIMIT ?,?`;

    let result1 = await mysqlcon(sqlData, [...sqlValues, start, limit]);

    let startRange = start + 1;
    let endRange = Math.min(start + limit, total);

    return res.json({
      message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
      currentPage: page,
      totalPages: numOfPages,
      pageLimit: limit,
      data: result1,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

module.exports.getIdMT = async function (req, res) {
  try {
    let { id } = req.body;
    console.log(id)
    let sql = "SELECT * FROM tbl_merchant_transaction WHERE invoice_id = ?";
    let result = await mysqlcon(sql, [id]);
    if (result.length !== 0) {
      return res.json(200, {
        message: `Records for id =  ${id}`,
        data: result
      });
    } else {
      return res.json(201, {
        message: `No Record Found`,
        data: result[0],
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

// module.exports.cronMerchantLogs = async function(req, res) {
//   try {
//     const { id } = req.body;
//     const sql = `
//       SELECT
//         t.*,
//         pr.*,
//         pg.*,
//         cl.*
//       FROM
//         tbl_merchant_transaction t
//         LEFT JOIN tbl_payin_request pr ON t.order_no = pr.order_id
//         LEFT JOIN tbl_payment_gate_response_tale pg ON t.order_no = pg.order_id
//         LEFT JOIN tbl_cron_log cl ON cl.data LIKE CONCAT('{"order_id":"', t.txn_id, '%')
//       WHERE
//         t.invoice_id = ?
//     `;
//     const result = await mysqlcon(sql, [id]);

//     if (result.length === 0) {
//       return res.status(201).json({
//         message: `No Record Found`,
//         data: result[0],
//       });
//     }

//     return res.status(200).json({
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "An error occurred",
//       error,
//     });
//   }
// }

module.exports.cronMerchantLogs = async function(req, res) {
  try {
    const { id } = req.body;
        const sql = `
      SELECT
      tbl_merchant_transaction.*,
      tbl_payin_request.*,
      tbl_payment_gate_response_tale.*,
      tbl_cron_log.*
      FROM
        tbl_merchant_transaction 
        LEFT JOIN tbl_payin_request  ON tbl_merchant_transaction.order_no = tbl_payin_request.order_id
        LEFT JOIN tbl_payment_gate_response_tale  ON tbl_merchant_transaction.order_no = tbl_payment_gate_response_tale.order_id
        LEFT JOIN tbl_cron_log  ON  tbl_merchant_transaction.order_no = tbl_cron_log.order_no
      WHERE
      tbl_merchant_transaction.invoice_id = ?
    `;
    const result = await mysqlcon(sql, [id]);

    if (result[0].length === 0) {
      return res.status(201).json({
        message: `No Record Found`,
        data: result[0],
      });
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
}

module.exports.statusApi = async function(req, res) {
  try {
    let {order_no} = req.body
    console.log(req.body)
    let sql = "SELECT * FROM tbl_order_status WHERE order_no = ?";
    let result = await mysqlcon(sql, [order_no])
    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
}

module.exports.toggleStatusMT = async function (req, res) {
  try {
    let { status, id } = req.body;
    console.log(status, id);

    if (status > 5 || status < 0) {
      return res.json(201, {
        message: `Status Not Updated`,
      });
    }

    let sql =
      "UPDATE tbl_merchant_transaction SET status = ? WHERE invoice_id = ?";
    let result = await mysqlcon(sql, [status, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Status ${
          status === "0"
            ? "Failed"
            : status === "1"
            ? "Success"
            : status === "2"
            ? "Waiting"
            : status === "3"
            ? "Pending"
            : status === "4"
            ? "Refund"
            : status === "5"
            ? "ChargeBack"
            : ""
        } `,
        data: result,
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

module.exports.createMT = async function (req, res) {
  try {
    let { merchantId, currency_id, trx_type, transaction_id, name, amount } = req.body;
    let sqlF = "SELECT * FROM tbl_merchant_charges WHERE currency_id = ?";
    let resultF = await mysqlcon(sqlF, [currency_id]);
    let charge = 0;
    if (resultF.length === 0) {
      let sqlU = "SELECT * FROM tbl_user WHERE user_id = ?";
      let resultU = await mysqlcon(sqlU, [merchantId]);
      if (resultU.length !== 0) {
        if (trx_type === "CASH") {
          charge = resultU[0].payin_card_credit;
        } else {
          charge = resultU[0].payin_card_credit;
        }
      }
    } else {
      charge = resultF[0].payin_amount;
    }
    let akonto_charge = (amount * charge) / 100;
    let gst_amount = 0;
    if (currency_id === "53") {
      gst_amount = (amount * 18) / 100;
    }
    let settle_amount = amount - (akonto_charge + gst_amount);
    let details = {
      ammount: amount,
      user_id: merchantId,
      i_flname: name,
      transaction_id: transaction_id,
      payment_type: trx_type,
      payment_status: `Success by ${trx_type}`,
      status: 1,
      payin_charges: akonto_charge,
      merchant_db_response: 1,
      sales_from: 1,
      pending_hit_response_by: 2,
      gst_charges: gst_amount,
      trx_live_test: 1,
      settle_amount: settle_amount,
      created_on: formattedIST,
      updated_on: formattedIST,
      settlement_on: formattedIST,
    };
    if (
      merchantId !== undefined &&
      trx_type !== undefined &&
      transaction_id !== undefined &&
      name !== undefined &&
      amount !== undefined
    ) {
      let sql = "INSERT INTO tbl_merchant_transaction SET ?";
      let result = await mysqlcon(sql, [details]);
      if (result.affectedRows > 0) {
        return res.json(200, {
          message: "Row Created",
          data: result,
        });
      } else {
        return res.json(201, {
          message: "Error While Creating",
          data: result,
        });
      }
    } else {
      return res.json(201, {
        message: "Error While Creating! Enter All 5 Parameter",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.getCurrencyMT = async function (req, res) {
  try {
    let { id } = req.body;
    let sql = "SELECT * FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    let currencyId = "";
    if (result.length !== 0) {
      currencyId += result[0].solution_apply_for_country;
    }
    let currA = currencyId.split(",");
    let sql1 = "SELECT id as currencyID,sortname FROM countries WHERE id IN (";
    for (let i = 0; i < currA.length; i++) {
      sql1 += "'";
      sql1 += currA[i];
      sql1 += "',";
    }
    sql1 = sql1.slice(0, -1);
    sql1 += ")";
    let result1 = await mysqlcon(sql1);
    if (result1.length !== 0) {
      return res.json(200, {
        message: `Currency for merchant id = ${id} are ${currA.length}`,
        data: result1,
      });
    } else {
      return res.json(201, {
        message: `No Record Found`,
        data: result1,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.allMerchant = async function (req, res) {
  try{
    const {adminfilter} = req.body
    
    let sqlM ="SELECT id, name, wallet from tbl_user WHERE status = 1 AND complete_profile = 1";
    let sqlAdmin = "select user_id as id , CONCAT(firstname, lastname) as name from tbl_login"
    let resultM = await mysqlcon(adminfilter?sqlAdmin:sqlM);
  
    res.status(200).json({
      Data:resultM
    })

  } catch(err){
    res.status(500).json({
      message:"Server Error",
      err,
    })
  }
  
};

module.exports.exportMT = async function (req, res) {
  try {
    let {searchText, to, from, status, merchantName,currency,gatewayNumber} = req.body;
    console.log(req.body)

    const sqlDefault = `SELECT tbl_user.name, tbl_merchant_transaction.*, tbl_merchant_transaction.created_on
    FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id`;
    const sqlConditions = [];
    const sqlValues = [];
    if (merchantName) {
      sqlConditions.push("tbl_merchant_transaction.user_id = ?");
      sqlValues.push(merchantName);
    }

    if (status) {
      sqlConditions.push("tbl_merchant_transaction.status = ?");
      sqlValues.push(status);
    }

    if (to && from) {
      sqlConditions.push("DATE(tbl_merchant_transaction.created_on) >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?");
      sqlValues.push(from, to);
    }

    if (currency) {
      sqlConditions.push("tbl_merchant_transaction.ammount_type = ?");
      sqlValues.push(currency);
    }

    if (gatewayNumber) {
      sqlConditions.push("tbl_merchant_transaction.gatewayNumber = ?");
      sqlValues.push(gatewayNumber);
    }

    if (searchText) {
      sqlConditions.push("(tbl_merchant_transaction.order_no LIKE ? OR tbl_merchant_transaction.txn_id LIKE ?)");
      sqlValues.push(`%${searchText}%`, `%${searchText}%`);
    }

    const conditionsStr = sqlConditions.length > 0 ? `WHERE ${sqlConditions.join(" AND ")}` : "";
    const sqlData = `${sqlDefault} ${conditionsStr} ORDER BY tbl_merchant_transaction.created_on DESC`;
    let result1 = await mysqlcon(sqlData, [...sqlValues]);
    res.send(result1)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.depositsCards = async function(req, res) {
  try {
    let {to, from, status, merchantName, searchText} = req.body;

    let sql = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1"

    let sqlSearch ="SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction WHERE order_no LIKE '%" +
    searchText +
    "%' OR txn_id LIKE '%" +
    searchText +
    "%'";

    let cbRefundSql = "SELECT SUM(ammount) AS amount from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.status IN(4,5)"

    let sqlToFrom = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?";

    let sqlMerchant = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.user_id = ?"

    let sqlStatus = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.status = ?"

    let sqlMerchantStatus = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ?"

    let sqlToFromMerchant = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.user_id = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?"

    let sqlToFromMerchantStatus = "SELECT COUNT(*) AS count, SUM(ammount) AS amount, SUM(payin_charges) AS charges from tbl_merchant_transaction INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_transaction.user_id WHERE tbl_user.status = 1 AND tbl_user.complete_profile = 1 AND tbl_merchant_transaction.user_id = ? AND tbl_merchant_transaction.status = ? AND DATE(tbl_merchant_transaction.created_on)  >= ? AND DATE(tbl_merchant_transaction.created_on) <= ?"

    let result = await mysqlcon(
      merchantName && status && to && from
      ? sqlToFromMerchantStatus
      : merchantName && to && from
      ? sqlToFromMerchant
      : to && from
      ? sqlToFrom
      : merchantName && status
      ? sqlMerchantStatus
      : merchantName
      ? sqlMerchant
      : status
      ? sqlStatus
      : searchText
      ? sqlSearch
      : sql,
      merchantName && status && to && from
      ? [merchantName, status, from, to]
      : merchantName && to && from
      ? [merchantName, from, to]
      : to && from
      ? [from, to]
      : merchantName && status
      ? [merchantName, status]
      : merchantName
      ? [merchantName]
      : status
      ? [status]
      : searchText
      ? [searchText]
      : []
      );

    // let result = await mysqlcon(sql)
    let cbRefundResult = await mysqlcon(cbRefundSql)

    if ((result[0].count) === 0) {
      return res.json(201, {
        data: [
          {
            name: "Total No. Of Transaction",
            amount: 0,
          },
          {
            name: "Total Amount Recieved",
            amount: 0,
          },
          {
            name: "Total Charges Recieved",
            amount: 0,
          },
          {
            name: "Total Refund & Chargeback",
            amount: cbRefundResult[0].amount.toFixed(2)
          },
        ],
      });
    } else {
      return res.json(200, {
        data: [
          {
            name: "Total No. Of Transaction",
            amount: result[0].count,
          },
          {
            name: "Total Amount Recieved",
            amount: result[0].amount.toFixed(2),
          },
          {
            name: "Total Charges Recieved",
            amount: result[0].charges.toFixed(2),
          },
          {
            name: "Total Refund & Chargeback",
            amount: cbRefundResult[0].amount.toFixed(2)
          },
        ],
      });
    }

  } catch(err){
    console.log(err)
    res.status(500).json({
      message:"Server Error",
      err,
    })
  }
}

