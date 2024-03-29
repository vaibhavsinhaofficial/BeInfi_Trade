const mysqlcon = require('../config/db_connection');
const payoutMethods = {
  filter: async (req, res) => {
    let user = req.user;
    let {id} = req.body
    var { uniqueid } = req.body;
    const { Date } = req.body;
    const { from, to } = req.body;
    let filterType = req.body.filterType ? Number(req.body.filterType) : 1;
    let page = req.body.page ? Number(req.body.page) : 1;

    let limit = 10;
    let start = page * limit - limit;

    let sql, sql1;
    let arr = [],
      arr1 = [];
      

    try {

      if(id) {
        const merchantIdArray = id.split(',');
        // console.log(filterType);
        if (filterType === 1) {
          // 1 Default Page
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id IN (?)";
          arr = [merchantIdArray];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE users_id IN (?) ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [merchantIdArray, start,limit];
        } else if (filterType === 2) {
          // 2 - search by OrderID
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id IN (?) AND uniqueid LIKE ?";
          arr = [merchantIdArray, uniqueid + "%"];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE users_id IN (?) AND uniqueid LIKE ?";
          arr1 = [merchantIdArray, uniqueid + "%"];
        } else if (filterType === 3) {
          // 3 - Today, Yesterday
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) IN (?) AND users_id = ?";
          arr = [Date, merchantIdArray];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id IN (?) ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [Date, merchantIdArray, start, limit];
        } else if (filterType === 4) {
          // 4 - Custom Date
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id IN (?)";
          arr = [from, to, merchantIdArray];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id IN (?) ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [from, to, merchantIdArray, start, limit];
        }
          let data = await mysqlcon(sql, arr);
          let total = data[0].Total;
          let numOfPages = Math.ceil(total / limit);

          let result = await mysqlcon(sql1, arr1);
          if (result.length === 0) {
            return res.status(201).json({
              message: "No record found.",
              data: [],
            });
          }

          let startRange = start + 1;
          let endRange = start + result.length;
          return res.status(200).json({
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            Status: "success",
            currPage: page,
            totalPage: numOfPages,
            data: result,
          });
      } else {
        // console.log(filterType);
        if (filterType === 1) {
          // 1 Default Page
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?";
          arr = [user.id];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [user.id, start,limit];
        } else if (filterType === 2) {
          // 2 - search by OrderID
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND uniqueid LIKE ?";
          arr = [user.id, uniqueid + "%"];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND uniqueid LIKE ?";
          arr1 = [user.id, uniqueid + "%"];
        } else if (filterType === 3) {
          // 3 - Today, Yesterday
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id = ?";
          arr = [Date, user.id];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id = ? ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [Date, user.id, start, limit];
        } else if (filterType === 4) {
          // 4 - Custom Date
          sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id = ?";
          arr = [from, to, user.id];
          sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id = ? ORDER BY created_on DESC LIMIT ?,?";
          arr1 = [from, to, user.id, start, limit];
        }
        let data = await mysqlcon(sql, arr);
        let total = data[0].Total;
        let numOfPages = Math.ceil(total / limit);

        let result = await mysqlcon(sql1, arr1);
        if (result.length === 0) {
          return res.status(201).json({
            message: "No record found.",
            data: [],
          });
        }

        let startRange = start + 1;
        let endRange = start + result.length;
        return res.status(200).json({
          message: `Showing ${startRange} to ${endRange} data from ${total}`,
          Status: "success",
          currPage: page,
          totalPage: numOfPages,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured" });
    } 
  },
  
  payoutheader: async (req, res) => {
    try {
      const { id, from, to, date, searchitem } = req.body;
      const user = req.user;

      let whereClause;
      const parameters = [];
      const conditions = [];

      if (id) {
        const merchantIdArray = id.split(',');
        whereClause = "users_id IN (?)";
        parameters.push(merchantIdArray);
      } else {
        whereClause = "users_id = ?";
        parameters.push(user.id);
      }

      const sql1 = `SELECT count(status) as count,SUM(amount) AS amount, SUM(akonto_charge) AS charge, DATE_FORMAT(created_on, '%Y-%m-%d') AS created_on FROM tbl_icici_payout_transaction_response_details WHERE status = ? AND ${whereClause}`;

      if (from && to) {
        conditions.push(`DATE(tbl_icici_payout_transaction_response_details.created_on) >= ? 
        AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? `);
        parameters.push(from, to);
      } else if (date) {
        conditions.push(`DATE(created_on) = ?`);
        parameters.push(date);
      } else if (searchitem) {
        conditions.push(`uniqueid LIKE ? OR creditacc LIKE ?`);
        parameters.push(`%${searchitem}%`, `%${searchitem}%`);
      }

      const sql = conditions.length > 0 ? `${sql1} AND (${conditions.join()})` : sql1;



      const successData = await mysqlcon(sql, ["SUCCESS", ...parameters]);
      const declinedData = await mysqlcon(sql, ["FAILURE", ...parameters]);
      const pendingData = await mysqlcon(sql, ["PENDING", ...parameters]);

      const success = successData[0].amount || 0;
      const failure = declinedData[0].amount || 0;
      const pending = pendingData[0].amount || 0;
      const total = success + failure + pending;

      const successPercentage = ((success / total) * 100).toFixed(2);
      const declinePercentage = ((failure / total) * 100).toFixed(2);
      const pendingPercentage = ((pending / total) * 100).toFixed(2);

      if (total == 0) {
        return res.json(201, {
          message: `User has no transaction`,
          data: [
            {
              name: "Success",
              percentage: 0,
              amount: 0,
            },
            {
              name: "Declined",
              percentage: 0,
              amount: 0,
            },
            {
              name: "Pending",
              percentage: 0,
              amount: 0,
            },
            {
              name: "Our Charges",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          message: `All Status Data`,
          data: [
            {
              name: "Success",
              percentage: successPercentage,
              amount: successData[0].amount !== null ? successData[0].amount : 0,
            },
            {
              name: "Declined",
              percentage: declinePercentage,
              amount: declinedData[0].amount !== null ? declinedData[0].amount : 0,
            },
            {
              name: "Pending",
              percentage: pendingPercentage,
              amount: pendingData[0].amount !== null ? pendingData[0].amount : 0,
            },
            {
              name: "Our Charges",
              amount: successData[0].charge !== null ? parseFloat(successData[0].charge.toFixed(2)) : 0,
            },
          ]
        });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Some error occurred" });
    }
  },

  viewDetails: async (req, res) => {
    let user = req.user;
    const { uniqueid } = req.body;
    let {id} = req.body;
    try {
      if(id){
        let sql =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE uniqueid = ? AND users_id = ?";
        let result = await mysqlcon(sql, [uniqueid, id]);
        return res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      } else {
        let sql =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE uniqueid = ? AND users_id = ?";
        let result = await mysqlcon(sql, [uniqueid, user.id]);
        return res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      }
    } catch (error) {
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    } 
  },

  downloadReport: async (req, res) => {
    let user = req.user;
    const { uniqueid, to, from, id, date } = req.body;
    try {
      if(id){
          if (uniqueid != undefined) {
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE uniqueid in (?) AND users_id = ?";
          let result = await mysqlcon(sql, [uniqueid, id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if(from && to){
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
          let result = await mysqlcon(sql, [id, from, to]);
          if (result.length === 0) {
            res.send(result);;
          } else {
            res.send(result);
          }
        } else if(date){
          // SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id = ?
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on) = ?";
          let result = await mysqlcon(sql, [id, date]);
          if (result.length === 0) {
            res.send(result);;
          } else {
            res.send(result);
          }
        } else {
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?";
          let result = await mysqlcon(sql, [id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        }
      } else {
          if (uniqueid != undefined) {
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE uniqueid in (?) AND users_id = ?";
          let result = await mysqlcon(sql, [uniqueid, user.id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if(from && to){
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
          let result = await mysqlcon(sql, [user.id, from, to]);
          if (result.length === 0) {
            res.send(result);;
          } else {
            res.send(result);
          }
        } else if(date){
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on) = ?";
          let result = await mysqlcon(sql, [user.id, date]);
          if (result.length === 0) {
            res.send(result);;
          } else {
            res.send(result);
          }
        } else {
          let sql =
            "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?";
          let result = await mysqlcon(sql, [user.id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    }
  },
};

module.exports = payoutMethods