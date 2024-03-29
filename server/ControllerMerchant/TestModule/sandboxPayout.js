const mysqlcon = require("../../config/db_connection");

const payoutMethods = {
    
    sandboxPayoutsDefault: async (req, res) => {
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
            const innerJoin = 'INNER JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_sandbox_response_details.users_id';
            if(id) {
              const merchantIdArray = id.split(',');
            // console.log(filterType);
            if (filterType === 1) {
              // 1 Default Page
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?)`;
              arr = [merchantIdArray];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?) ORDER BY created_on DESC LIMIT ?,?`;
              arr1 = [merchantIdArray, start, limit];
            } else if (filterType === 2) {
                // 2 - search by OrderID
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?) AND tbl_icici_payout_transaction_sandbox_response_details.uniqueid LIKE ?`;
              arr = [merchantIdArray, uniqueid + "%"];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?) AND tbl_icici_payout_transaction_sandbox_response_details.uniqueid LIKE ?`;
              arr1 = [merchantIdArray, uniqueid + "%"];
            } else if (filterType === 3) {
                // 3 - Today, Yesterday
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) = ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?)`;
              arr = [Date, merchantIdArray];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) = ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?) ORDER BY created_on DESC LIMIT ?,?`;
              arr1 = [Date, merchantIdArray, start, limit];
            } else if (filterType === 4) {
                // 4 - Custom Date
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?)`;
              arr = [from, to, merchantIdArray];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id IN (?) ORDER BY created_on DESC LIMIT ?,?`;
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
                } else {
                    let startRange = start + 1;
                    let endRange = start + result.length;
                    return res.status(200).json({
                        Status: "success",
                        currPage: page,
                        message: `Showing ${startRange} to ${endRange} data from ${total}`,
                        totalPage: numOfPages,
                        data: result,
                    });
                }
          } else {
            // console.log(filterType);
            if (filterType === 1) {
              // 1 Default Page
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id = ?`;
              arr = [user.id];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id = ? ORDER BY created_on DESC LIMIT ?,?`;
              arr1 = [user.id, start, limit];
            } else if (filterType === 2) {
                // 2 - search by OrderID
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id = ? AND tbl_icici_payout_transaction_sandbox_response_details.uniqueid LIKE ?`;
              arr = [user.id, uniqueid + "%"];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE tbl_icici_payout_transaction_sandbox_response_details.users_id = ? AND tbl_icici_payout_transaction_sandbox_response_details.uniqueid LIKE ?`;
              arr1 = [user.id, uniqueid + "%"];
            } else if (filterType === 3) {
                // 3 - Today, Yesterday
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) = ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id = ?`;
              arr = [Date, user.id];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) = ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id = ? ORDER BY created_on DESC LIMIT ?,?`;
              arr1 = [Date, user.id, start, limit];
            } else if (filterType === 4) {
                // 4 - Custom Date
              sql = `SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id = ?`;
              arr = [from, to, user.id];
              sql1 = `SELECT tbl_icici_payout_transaction_sandbox_response_details.*, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_icici_payout_transaction_sandbox_response_details.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_sandbox_response_details ${innerJoin} WHERE DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? AND tbl_icici_payout_transaction_sandbox_response_details.users_id = ? ORDER BY created_on DESC LIMIT ?,?`;
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
            }   else {
                let startRange = start + 1;
                let endRange = start + result.length;
                return res.status(200).json({
                    Status: "success",
                    currPage: page,
                    message: `Showing ${startRange} to ${endRange} data from ${total}`,
                    totalPage: numOfPages,
                    data: result,
                });
            }
          }
        } catch (error) {
          console.log(error);
          return res
            .status(201)
            .json({ status: false, message: "Some error occured" });
        } 
    },

    sandboxPayoutheader: async (req, res) => {
        let {id} = req.body;
        let user = req.user;
        try {
        if(id) {
            let sql ="SELECT SUM(amount) AS amount FROM tbl_icici_payout_transaction_sandbox_response_details WHERE  users_id = ? AND status = ?";
            let successData = await mysqlcon(sql, [id, "SUCCESS"]); // Success
            var success = successData[0].amount;
            let declinedData = await mysqlcon(sql, [id, "FAILURE"]); // Declined
            var failure = declinedData[0].amount;
            let pendingData = await mysqlcon(sql, [id, "PENDING"]); // Pending
            var pending = pendingData[0].amount;
            var successJSON = { name: "Success", amount: success };
            var declinedJSON = { name: "Declined", amount: failure };
            var pendingJSON = { name: "Pending", amount: pending };
            var totalJSON = { name: "Total Payout", amount: user.wallet };
            return res.status(200).json({
            message: "All Payout header Data",
            data: [successJSON, declinedJSON, pendingJSON, totalJSON],
            });
        } else {
            let sql ="SELECT SUM(amount) AS amount FROM tbl_icici_payout_transaction_sandbox_response_details WHERE  users_id = ? AND status = ?";
            let successData = await mysqlcon(sql, [user.id, "SUCCESS"]); // Success
            var success = successData[0].amount;
            let declinedData = await mysqlcon(sql, [user.id, "FAILURE"]); // Declined
            var failure = declinedData[0].amount;
            let pendingData = await mysqlcon(sql, [user.id, "PENDING"]); // Pending
            var pending = pendingData[0].amount;
            var successJSON = { name: "Success", amount: success };
            var declinedJSON = { name: "Declined", amount: failure };
            var pendingJSON = { name: "Pending", amount: pending };
            var totalJSON = { name: "Total Payout", amount: user.wallet };
            return res.status(200).json({
            message: "All Payout header Data",
            data: [successJSON, declinedJSON, pendingJSON, totalJSON],
            });
        }
        } catch (error) {
        console.log(error);
        return res
            .status(201)
            .json({ status: false, message: "Some error occured" });
        } 
    },

    downloadSandboxPayoutReport: async (req, res) => {
        let user = req.user;
        const { uniqueid, to, from, id } = req.body;
        console.log(from, to);
        try {
        if(id){
            if (uniqueid != undefined) {
            let sql =
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE uniqueid in (?) AND users_id = ?";
            let result = await mysqlcon(sql, [uniqueid, id]);
            if (result.length === 0) {
                res.send(result);
            } else {
                res.send(result);
            }
            }  else if(from && to){
            let sql =
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE users_id = ? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
            let result = await mysqlcon(sql, [id, from, to]);
            if (result.length === 0) {
                res.send(result);;
            } else {
                res.send(result);
            }
            }
            else {
            let sql =
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE users_id = ?";
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
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE uniqueid in (?) AND users_id = ?";
            let result = await mysqlcon(sql, [uniqueid, user.id]);
            if (result.length === 0) {
                res.send(result);
            } else {
                res.send(result);
            }
            }  else if(from && to){
            let sql =
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE users_id = ? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
            let result = await mysqlcon(sql, [user.id, from, to]);
            if (result.length === 0) {
                res.send(result);;
            } else {
                res.send(result);
            }
            }
            else {
            let sql =
                "SELECT * FROM tbl_icici_payout_transaction_sandbox_response_details WHERE users_id = ?";
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