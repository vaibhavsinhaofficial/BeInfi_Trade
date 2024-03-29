const mysqlcon = require("../config/db_connection");
const Pagination = require("../services/pagination");

const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

module.exports.paymentGateway = async function (req, res) {
  try {
    const { to, from, date, searchVal } = req.body;
    let sqlAllCount =
      "select count (*) as Total from payment_gateway";
    let sqCountDate =
      "select count (*) as Total from payment_gateway where DATE(created_on) = ?";
    let sqlToFromCount =
      "select count (*) as Total from payment_gateway where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
    let sqlSearchCount = "SELECT COUNT(*) as Total FROM payment_gateway WHERE ((gateway_name LIKE '%" + searchVal + "%') OR (merNo LIKE '%" + searchVal + "%'))";
  
    let result = await mysqlcon(
        date
      ? sqCountDate
      : to && from
      ? sqlToFromCount
      : searchVal
      ? sqlSearchCount
      : sqlAllCount,
      date ? [date] : to && from ? [from, to] : ""
    );
    let total = result[0].Total;
    let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = Pagination.pagination(
      result[0].Total,
      page,
      limit
    );
  
    let sql =
      "select payment_gateway.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from payment_gateway ORDER BY created_on DESC limit ?,?";
    let sqlDate =
      "select payment_gateway.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from payment_gateway where DATE(created_on) = ? ORDER BY created_on DESC limit ?,?";
    let sqlToFrom =
      "select payment_gateway.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from payment_gateway where DATE(created_on)  >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC limit ?,?";
    let sqlSearch = "select payment_gateway.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from payment_gateway where ((gateway_name LIKE '%" + searchVal + "%') OR (merNo LIKE '%" + searchVal + "%')) ORDER BY created_on DESC limit ?,?";
  
    const data = await mysqlcon(
      date ? sqlDate : to && from ? sqlToFrom : searchVal ? sqlSearch : sql,
      date
        ? [date, start, limit]
        : to && from
        ? [from, to, start, limit]
        : [start, limit]
    );
    let startRange = start + 1;
    let endRange = start + data.length;
    res.status(200).json({
      message: data.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
      numOfPages,
      result: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports.getId = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "SELECT * FROM payment_gateway WHERE id = ?";

    let result = await mysqlcon(sql, [id]);

    if (result.length > 0) {
      return res.json(200, {
        message: `Take data for id = ${id}`,
        data: result[0],
      });
    } else {
      return res.json(201, {
        message: "No Record Found",
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

module.exports.edit = async function (req, res) {
  try {
    let { type, gateway_name, merchantN, gatewayN, key, id } = req.body;

    let details = {
      type: type,
      gateway_name: gateway_name,
      merNo: merchantN,
      gateway_number: gatewayN,
      key: key,
      updated_on: formattedIST
    };

    let sql = "UPDATE payment_gateway SET ? WHERE id = ?";

    let result = await mysqlcon(sql, [details, id]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Gateway Updated",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error while updating",
        data: result,
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

module.exports.delete = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM payment_gateway WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Gateway Deleted",
        data: result,
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

module.exports.create = async function (req, res) {
  try {
    let { type, gateway_name, merchantN, gatewayN, key } = req.body;

    let details = {
      type: type,
      gateway_name: gateway_name,
      merNo: merchantN,
      gateway_number: gatewayN,
      key: key,
      created_on: formattedIST,
      updated_on: formattedIST
    };

    let sql = "INSERT INTO payment_gateway SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result.affectedRows > 0) {
      return res.json(200, {
        message: type === "0" ? "Payin Gateway Created": "Payout Gateway Created",
        data: result,
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
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

module.exports.togglePayment = async function (req, res) {
  try {
    let { status, id } = req.body;
    // status = Number(status);

    let sql = "UPDATE payment_gateway SET status = ? WHERE id = ?";
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
