const mysqlcon = require("../../config/db_connection");
const payoutMethods = {
    teamFilter: async (req, res) => {
        const { parent_id } = req.user;
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
        let whereClause = "users_id=?";
        let params = [parent_id];

        if (filterType === 1) {
            sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause;
            arr = [parent_id];

            sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " ORDER BY created_on DESC LIMIT ?,?";
            arr1 = [...params, start, limit];
        } else if (filterType === 2) {
            sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND uniqueid LIKE ?";
            arr = [...params, uniqueid + "%"];

            sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND uniqueid LIKE ? ORDER BY created_on DESC LIMIT ?,?";
            arr1 = [...params, uniqueid + "%", start, limit];
        } else if (filterType === 3) {
            sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND DATE(created_on) = ?";
            arr = [...params, Date];

            sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND DATE(created_on) = ? ORDER BY created_on DESC LIMIT ?,?";
            arr1 = [...params, Date, start, limit];
        } else if (filterType === 4) {
            sql =
            "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
            arr = [...params, from, to];

            sql1 =
            "SELECT tbl_icici_payout_transaction_response_details.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
            arr1 = [...params, from, to, start, limit];
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
        } catch (error) {
        console.log(error);
        return res.status(201).json({ status: false, message: "Some error occurred" });
        }
    },

    teamPayoutCard: async (req, res) => {
        const { parent_id } = req.user;
        try {
        let whereClause = "users_id=?";
        let parameters = [parent_id];
        const conditions = [];

        const {from, to, date, uniqueid } = req.body;
        const sql1 = `SELECT count(status) as count,SUM(amount) AS amount, SUM(akonto_charge) AS charge, DATE_FORMAT(created_on, '%Y-%m-%d') AS created_on
            FROM tbl_icici_payout_transaction_response_details
            WHERE status = ? AND ${whereClause}`;

        if (from && to) {
            conditions.push(`DATE(tbl_icici_payout_transaction_response_details.created_on) >= ? 
            AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? `);
            parameters.push(from, to);
        } else if (date) {
            conditions.push(`DATE(created_on) = ?`);
            parameters.push(date);
        } else if (uniqueid) {
            conditions.push(`uniqueid LIKE ? OR creditacc LIKE ?`);
            parameters.push(`%${uniqueid}%`, `%${uniqueid}%`);
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

    teamDownloadReport: async (req, res) => {
        const { parent_id } = req.user;
        const { uniqueid, to, from, date } = req.body;
    
        try {
    
          let whereClause = "users_id=?";
          let params = [parent_id];
    
          if (uniqueid != undefined) {
            let sql =
              "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND uniqueid = ? ";
            let result = await mysqlcon(sql, [...params, uniqueid]);
            if (result.length === 0) {
              res.send(result);
            } else {
              res.send(result);
            }
          } else if (from && to) {
            let sql =
              "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE" + whereClause + "AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
            let result = await mysqlcon(sql, [...params, from, to]);
            if (result.length === 0) {
              res.send(result);;
            } else {
              res.send(result);
            }
          }
    
          else if (date) {
            let sql =
              "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause + " AND DATE(created_on) = ?";
    
            let result = await mysqlcon(sql, [...params, date]);
            if (result.length === 0) {
              res.send(result);;
            } else {
              res.send(result);
            }
          }
          else {
            let sql =
              "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE " + whereClause;
            let result = await mysqlcon(sql, [params]);
            if (result.length === 0) {
              res.send(result);
            } else {
              res.send(result);
            }
          }
        }
        catch (error) {
          console.log(error);
          return res
            .status(201)
            .json({ status: false, message: "Some error occured", data: [] });
        }
      },
};

module.exports = payoutMethods