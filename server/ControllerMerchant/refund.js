const mysqlcon = require("../config/db_connection");

module.exports.merchantRefund = async function (req, res) {
  try {
    let pagination = (total, page, limit) => {
      let numOfPages = Math.ceil(total / limit);
      let start = page * limit - limit;
      return { limit, start, numOfPages };
    };
    let { pages, id } = req.body;
    if(id){
      const merchantIdArray = id.split(',');
      let sql = "SELECT COUNT(*) AS Total FROM user_request WHERE merchant_id IN (?)";
      let result = await mysqlcon(sql, [merchantIdArray]);
      let total = result[0].Total;

      let page = pages ? Number(pages) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;

      let { start, numOfPages } = pagination(total, page, limit);

      let sql1 =
        "SELECT invoice_Id, request_id, amount, status, refund_status, created_on, message FROM user_request WHERE merchant_id IN (?) ORDER BY created_on DESC LIMIT ?, ?";
      let result1 = await mysqlcon(sql1, [merchantIdArray, start, limit]);

      let startRange = start + 1;
      let endRange = start + result1.length;

      if (result1.length === 0) {
        return res.json(201, {
          message: `Showing 0 data`,
          currentPage: page,
          totalPages: numOfPages,
          pageLimit: limit,
          data: result1,
        });
      } else {
        return res.json(200, {
          message: `Showing ${startRange} to ${endRange} data from ${total}`,
          currentPage: page,
          totalPages: numOfPages,
          pageLimit: limit,
          data: result1,
        });
      }
    } else {
      let sql = "SELECT COUNT(*) AS Total FROM user_request WHERE merchant_id = ?";
      let result = await mysqlcon(sql, [req.user.id]);
      let total = result[0].Total;

      let page = pages ? Number(pages) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;

      let { start, numOfPages } = pagination(total, page, limit);

      let sql1 =
        "SELECT invoice_Id, request_id, amount, status, refund_status, created_on, message FROM user_request WHERE merchant_id = ? ORDER BY created_on DESC LIMIT ?, ?";
      let result1 = await mysqlcon(sql1, [req.user.id, start, limit]);

      let startRange = start + 1;
      let endRange = start + result1.length;

      if (result1.length === 0) {
        return res.json(201, {
          message: `Showing 0 data`,
          currentPage: page,
          totalPages: numOfPages,
          pageLimit: limit,
          data: result1,
        });
      } else {
        return res.json(200, {
          message: `Showing ${startRange} to ${endRange} data from ${total}`,
          currentPage: page,
          totalPages: numOfPages,
          pageLimit: limit,
          data: result1,
        });
      }
    }
    
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error",
    });
  }
};

