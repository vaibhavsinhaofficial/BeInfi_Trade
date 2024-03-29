const mysqlcon = require("../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};
const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});
const settlement = {

  // International Settlement
  
  settlemetnt_Trans: async (req, res) => {
    let user = req.user;
    let {id} = req.body;
    let { from, to,date,settlementId } = req.body;

    try {
      if(id){
        const merchantIdArray = id.split(',');
        let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 1";
        let result = await mysqlcon(sql1, merchantIdArray);
        let sql2;
        let result2;
        if(settlementId){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 1 AND settlementId LIKE ?";
          result2 = await mysqlcon(sql2,[merchantIdArray,settlementId+"%"]);
        } else if(date){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ?";
          result2 = await mysqlcon(sql2,[merchantIdArray, date])
        } else if(to && from){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
          result2 = await mysqlcon(sql2,[merchantIdArray, from, to])
        }

        let total;
        if(settlementId){
          total = result2[0].Total;
        }else if(date){
          total = result2[0].Total;
        } else if(to && from){
          total = result2[0].Total;
        } else {
          total = result[0].count;
        }
        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);

        let data;
        if (date) {
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?)  AND settlement_mode = 1 AND DATE(created_on) = ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, date,page.start, page.limit]);
        } else if (from && to){
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 1 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, from, to, page.start, page.limit]);
        } else if(settlementId){
          let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 1 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray,settlementId+"%",page.start,page.limit]);
        }else{
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 1 ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, page.start, page.limit]);
        }

        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
          if(date){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else if (from && to){

          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else if (settlementId){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages,
              data: data,
            });
          }
        }
      } else {
        let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
        let result = await mysqlcon(sql1, user.id);
        let sql2;
        let result2;
        if(settlementId){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ?";
          result2 = await mysqlcon(sql2,[user.id,settlementId+"%"]);
        } else if(date){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ?";
          result2 = await mysqlcon(sql2,[user.id, date])
        } else if(to && from){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
          result2 = await mysqlcon(sql2,[user.id, from, to])
        }

        let total;
        if(settlementId){
          total = result2[0].Total;
        }else if(date){
          total = result2[0].Total;
        } else if(to && from){
          total = result2[0].Total;
        } else {
          total = result[0].count;
        }

        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);

        let data;
        if (date) {
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ?  AND settlement_mode = 1 AND DATE(created_on) = ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, date,page.start, page.limit]);
        } else if (from && to){
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, from, to, page.start, page.limit]);
        } else if(settlementId){
          let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id,settlementId+"%",page.start,page.limit]);
        }else{
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, page.start, page.limit]);
        }

        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
          if(date){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else if (from && to){

          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else if (settlementId){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
              data: data,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occur",
        error,
      });
    }
  },

  requestSettlement : async (req, res) => {
    try {
      let user = req.user;
        let { 
          settlementId,
          settlementType,
          fromCurrency,
          toCurrency,
          walletAddress,
          accountNumber,
          bankName,
          branchName,
          city,
          zip_code,
          country,
          swiftCode,
          available_balance,
          requestedAmount,
          net_amount_for_settlement,
          exchangeRate
        } = req.body;

        let Settlement;
        if(settlementType === "CRYPTO"){
          Settlement = {
            user_id: user.id,
            settlementId: settlementId,
            settlement_mode: 1,
            settlementType: settlementType,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            walletAddress: walletAddress,
            accountNumber: accountNumber,
            bankName: bankName,
            branchName:branchName,
            city:city,
            zip_code:zip_code,
            country: country,
            swiftCode: swiftCode,
            available_balance: available_balance,
            requestedAmount: requestedAmount,
            net_amount_for_settlement: net_amount_for_settlement,
            exchangeRate: exchangeRate,
            settlementAmount: requestedAmount,
            source: "By Merchant",
            status: 2,
            merchant_name: req.user.name
          };
        } else {
          Settlement = {
            user_id: user.id,
            settlementId: settlementId,
            settlement_mode: 1,
            settlementType: settlementType,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            accountNumber: accountNumber,
            bankName: bankName,
            branchName:branchName,
            city:city,
            zip_code:zip_code,
            country: country,
            swiftCode: swiftCode,
            available_balance: available_balance,
            requestedAmount: requestedAmount,
            net_amount_for_settlement: net_amount_for_settlement,
            exchangeRate: exchangeRate,
            settlementAmount: requestedAmount,
            source: "By Merchant",
            status: 2,
            merchant_name: req.user.name
          };
        }
      let remBalance = (requestedAmount ? (available_balance - requestedAmount) : available_balance);
      let sql2 = "INSERT INTO tbl_settlement SET ?, requested_time = NOW(), created_on= NOW()";
      let result = await mysqlcon(sql2, Settlement);
      let updateSQL  = "UPDATE tbl_user SET wallet = ? where id = ?";
      let walletResult = await mysqlcon(updateSQL, [remBalance, user.id]);
      if(result.affectedRows > 0){
        return res.status(200).json({
            message: "Request settlement transaston Successfully",
            data: result,
          });
      }else{
        return res.json(201,{
            message: "Error While Creating",
            data: result
        })
    }
      
  } catch (error) {
    console.log(error)
    return res.json(500,{
      message: "error occurered",
      error: error
    }) 
  }
  },

  cardDetails: async (req, res) => {
    let user = req.user;
    let {id} = req.body;
    // let user_id = user.id;
    try {
      if(id){
        let sql = "SELECT count(*) as count FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
  
      let result = await mysqlcon(sql, [id]);
  
      let totalCount = result[0].count;
  
      let sql0 = "SELECT SUM(requestedAmount) as request FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
      let sql1 = "SELECT SUM(charges) as charges FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
      let sql4 = "SELECT SUM(settlementAmount) as amount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
      let sql5 = "SELECT SUM(settlementAmount) as amount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";

      let statusResult0 = await mysqlcon(sql0, [id]);
      let statusResult1 = await mysqlcon(sql1, [id]);
      let statusResult4 = await mysqlcon(sql4, [id]);
      let statusResult5 = await mysqlcon(sql5, [id]);

  
      if (totalCount === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total Settlement Request",
              amount: 0,
            },
            {
              name: "Total Fees/Charges",
              amount: 0,
            },
            {
              name: "Total Amount Sent",
              amount: 0,
            },
            {
              name: "Total Amount Recieved",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total Settlement Request",
              amount: statusResult0[0].request,
            },
            {
              name: "Total Fees/Charges",
              amount: statusResult1[0].charges,
            },
            {
              name: "Total Amount Sent",
              amount: statusResult4[0].amount,
            },
            {
              name: "Total Amount Recieved",
              amount: statusResult5[0].amount,
            },
          ],
        });
      }
      }
      else{
      let sql =
      "SELECT count(*) as count FROM tbl_settlement WHERE user_id = ?";
  
      let result = await mysqlcon(sql, [user.id]);
  
      let totalCount = result[0].count;
  
      let sql0 = "SELECT SUM(requestedAmount) as request FROM tbl_settlement WHERE user_id = ?";
      let sql1 = "SELECT SUM(charges) as charges FROM tbl_settlement WHERE user_id = ?";
      let sql4 = "SELECT SUM(settlementAmount) as amount FROM tbl_settlement WHERE user_id = ?";
      let sql5 = "SELECT SUM(settlementAmount) as amount FROM tbl_settlement WHERE user_id = ?";

      let statusResult0 = await mysqlcon(sql0, [user.id]);
      let statusResult1 = await mysqlcon(sql1, [user.id]);
      let statusResult4 = await mysqlcon(sql4, [user.id]);
      let statusResult5 = await mysqlcon(sql5, [user.id]);

  
      if (totalCount === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total Settlement Request",
              amount: 0,
            },
            {
              name: "Total Fees/Charges",
              amount: 0,
            },
            {
              name: "Total Amount Sent",
              amount: 0,
            },
            {
              name: "Total Amount Recieved",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total Settlement Request",
              amount: statusResult0[0].request,
            },
            {
              name: "Total Fees/Charges",
              amount: statusResult1[0].charges,
            },
            {
              name: "Total Amount Sent",
              amount: statusResult4[0].amount,
            },
            {
              name: "Total Amount Recieved",
              amount: statusResult5[0].amount,
            },
          ],
        });
      }
    }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occured",
        error: error,
      });
    }
  },

  downloadReportsc : async (req, res) => {
    let user = req.user;
    const {from,to, id, date} = req.body;
    try {
      if(id)
      {
        if(from && to){
          let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? AND settlement_mode = 1 ";
          let result = await mysqlcon(sql, [ from ,to,id ]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        } else if(date) {
          let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on) = ? AND user_id = ? AND settlement_mode = 1 ";
          let result = await mysqlcon(sql, [ date,id ]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        } else {
          let sql = "SELECT  user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
          let result = await mysqlcon(sql, [id]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
       }
      }
      else
      {
       if(from && to){
        let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? AND settlement_mode = 1";
        let result = await mysqlcon(sql, [ from ,to,user.id ]);
        if (result.length === 0) {
          res.send(result)
        } else {
          res.send(result)
        }
      } else if(date) {
        let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on) = ? AND user_id = ? AND settlement_mode = 1";
        let result = await mysqlcon(sql, [ date,id ]);
        if (result.length === 0) {
          res.send(result)
        } else {
          res.send(result)
        }
      } else {
        let sql = "SELECT  user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
        let result = await mysqlcon(sql, [user.id]);
        if (result.length === 0) {
          res.send(result)
        } else {
          res.send(result)
        }
      }
    }
    } catch (error) {
      console.log(error)
      return res.status(201).json({ status: false, message: "Some error occured"});
    } 
  },

  // Local Settlement

  localsettlemetnt_Trans: async (req, res) => {
    let user = req.user;
    let {id} = req.body;
    let { from, to, date, settlementId } = req.body;

    try {
      if(id){
        const merchantIdArray = id.split(',');
        let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2";
        let result = await mysqlcon(sql1, merchantIdArray);
        let sql2;
        let result2;
        if(settlementId){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND settlementId LIKE ?";
          result2 = await mysqlcon(sql2,[merchantIdArray,settlementId+"%"]);
        } else if(date){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ?";
          result2 = await mysqlcon(sql2,[merchantIdArray, date])
        } else if(to && from){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
          result2 = await mysqlcon(sql2,[merchantIdArray, from, to])
        }

        let total;
        if(settlementId){
          total = result2[0].Total;
        }else if(date){
          total = result2[0].Total;
        } else if(to && from){
          total = result2[0].Total;
        } else {
          total = result[0].count;
        }

        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);

        let data;
        if (date) {
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) = ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, date,page.start, page.limit]);
        } else if (from && to){
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, from, to, page.start, page.limit]);
        } else if(settlementId){
          let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray,settlementId+"%",page.start,page.limit]);
        }else{
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [merchantIdArray, page.start, page.limit]);
        }

        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
          if(date){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else if (from && to){

          return res.json(200, {
            message: `Showing ${data.length } from ${data.length} `,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else if (settlementId){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
              data: data,
            });
          }
        }
      } else {
        let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
        let result = await mysqlcon(sql1, user.id);
        let sql2;
        let result2;
        if(settlementId){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND settlementId LIKE ?";
          result2 = await mysqlcon(sql2,[user.id,settlementId+"%"]);
        } else if(date){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ?";
          result2 = await mysqlcon(sql2,[user.id, date])
        } else if(to && from){
          sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
          result2 = await mysqlcon(sql2,[user.id, from, to])
        }

        let total;
        if(settlementId){
          total = result2[0].Total;
        }else if(date){
          total = result2[0].Total;
        } else if(to && from){
          total = result2[0].Total;
        } else {
          total = result[0].count;
        }

        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);

        let data;
        if (date) {
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) = ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, date,page.start, page.limit]);
        } else if (from && to){
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, from, to, page.start, page.limit]);
        } else if(settlementId){
          let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id,settlementId+"%",page.start,page.limit]);
        }else{
          let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 ORDER BY created_on DESC LIMIT ?,?";
          data = await mysqlcon(sql, [user.id, page.start, page.limit]);
        }

        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else {
          if(date){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else if (from && to){

          return res.json(200, {
            message: `Showing ${data.length } from ${data.length} `,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else if (settlementId){
          return res.json(200, {
            message: `Showing ${startRange} to ${endRange} data from ${total}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages,
              data: data,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occur",
        error,
      });
    }
  },
  
  localrequestSettlement : async (req, res) => {
    try {
    let user = req.user;
    let { settlementId, toCurrency, accountNumber, bankName, branchName, requestedAmount } = req.body;
    let Sql_Avl_bal="SELECT wallet FROM tbl_user WHERE id = ?"
    let available_bal = await mysqlcon(Sql_Avl_bal,[user.id])
    let available_balance = available_bal[0].wallet
    let Settlement = {
      user_id: user.id,
      settlementId: settlementId,
      settlement_mode : 2,
      toCurrency: toCurrency,
      accountNumber: accountNumber,
      bankName: bankName,
      branchName:branchName,
      available_balance : available_balance,
      requestedAmount: requestedAmount ,
      settlementAmount : requestedAmount,
      status: 2,
      source: "By Merchant",
    };
    let remBalance = available_balance - requestedAmount;
    let sql2 = "INSERT INTO tbl_settlement SET ?, requested_time = NOW(), created_on= NOW()";
    let result = await mysqlcon(sql2, Settlement);
    let updateSQL  = "UPDATE tbl_user SET wallet = ? where id = ?";
    let walletResult = await mysqlcon(updateSQL, [remBalance, user.id]);
    if(result.affectedRows > 0){
      return res.status(200).json({
          message: "Request settlement transaston Successfully",
          data: result,
        });
    }else{
      return res.json(201,{
          message: "Error While Creating",
          data:result
      })
  }
  
  
  
    } catch (error) {
    console.log(error)
    return res.json(500,{
      message: "error occurered",
      error: error
    })
  
  }
  
  
  },
  
  localcardDetails: async (req, res) => {
    let user = req.user;
    let {id,from,to,date,searchItem} = req.body;
    try {
      if(id){
        id=id.split(",");
        let defaultSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2";
        let toFromSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
        let dateSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id (?) AND settlement_mode = 2 AND DATE(created_on)=?";
        let searchItemSql = `SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id IN (?) AND settlement_mode = 2 AND 	settlementId LIKE ?`;
        let result1 = await mysqlcon(
          to && from
          ? toFromSql
          : date
          ? dateSql
          : searchItem
          ? searchItemSql
          : defaultSql,
  
          to && from ? [id,from,to] : date ? [id,date] : searchItem ? [id,"%"+searchItem+"%"] : [id]
        );
        if (result1.length === 0) {
          return res.json(201, {
            data: [
              {
                name: "Total Settlement Request",
                amount: 0,
              },
              {
                name: "Total Fees/Charges",
                amount: 0,
              },
              {
                name: "Total Amount Sent",
                amount: 0,
              },
              {
                name: "Total Amount Recieved",
                amount: 0,
              },
            ],
          });
        } else {
          return res.json(200, {
            data: [
              {
                name: "Total Settlement Request",
                amount: result1[0].request.toFixed(2),
              },
              {
                name: "Total Fees/Charges",
                amount: result1[0].charges.toFixed(2),
              },
              {
                name: "Total Amount Sent",
                amount: result1[0].total_amount_sent.toFixed(2),
              },
              {
                name: "Total Amount Recieved",
                amount: result1[0].total_amount_received.toFixed(2),
              },
            ],
          });
        }
      } else {
      let defaultSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
      let toFromSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
      let dateSql = "SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on)=?";
      let searchItemSql = `SELECT COALESCE(SUM(requestedAmount),0) as request,COALESCE(SUM(charges),0) as charges,COALESCE(SUM(settlementAmount),0) as total_amount_received,COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND 	settlementId LIKE ?`;
      let result1 = await mysqlcon(
        to && from
        ? toFromSql
        : date
        ? dateSql
        : searchItem
        ? searchItemSql
        : defaultSql,
  
        to && from ? [user.id,from,to] : date ? [user.id,date] : searchItem ? [user.id,"%"+searchItem+"%"] : [user.id]
      );
      if (result1.length === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total Settlement Request",
              amount: 0,
            },
            {
              name: "Total Fees/Charges",
              amount: 0,
            },
            {
              name: "Total Amount Sent",
              amount: 0,
            },
            {
              name: "Total Amount Recieved",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total Settlement Request",
              amount: result1[0].request.toFixed(2),
            },
            {
              name: "Total Fees/Charges",
              amount: result1[0].charges.toFixed(2),
            },
            {
              name: "Total Amount Sent",
              amount: result1[0].total_amount_sent.toFixed(2),
            },
            {
              name: "Total Amount Recieved",
              amount: result1[0].total_amount_received.toFixed(2),
            },
          ],
        });
      }
      }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occured",
        error: error,
      });
    }
  },
  
  localdownloadReportsc : async (req, res) => {
      let user = req.user;
      const {from,to, id, date} = req.body;
      try {
        if(id)
        {
          if(from && to){
            let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE  DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? AND settlement_mode = 2  ";
            let result = await mysqlcon(sql, [ from ,to,id ]);
            if (result.length === 0) {
              res.send(result)
            } else {
              res.send(result)
            }
          } else if(date) {
            let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on) = ? AND user_id = ? AND settlement_mode = 2 ";
            let result = await mysqlcon(sql, [ date,id ]);
            if (result.length === 0) {
              res.send(result)
            } else {
              res.send(result)
            }
          } else {
            let sql = "SELECT  user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
            let result = await mysqlcon(sql, [id]);
            if (result.length === 0) {
              res.send(result)
            } else {
              res.send(result)
            }
         }
        }
        else
        {
         if(from && to){
          let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? AND settlement_mode = 2";
          let result = await mysqlcon(sql, [ from ,to,user.id ]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        }else if(date) {
          let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on) = ? AND user_id = ? AND settlement_mode = 2 ";
          let result = await mysqlcon(sql, [ date,id ]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        } else {
          let sql = "SELECT  user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
          let result = await mysqlcon(sql, [user.id]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        }
      }
      } catch (error) {
        console.log(error)
        return res.status(201).json({ status: false, message: "Some error occured"});
      } 
  },

  // Common API
  exchangeRate: async (req, res) => {
    try {
      let {currency, toCurrency} = req.body;
      let sql="SELECT rate FROM tbl_user_settled_currency WHERE deposit_currency = ? AND settled_currency = ?";
      let result = await mysqlcon(sql,[currency, toCurrency]);
      if(result.length !== 0){
        return res.json(200,{
          message: `Data`,
          data: result
        })
      } else {
        return res.json(201,{
          message: "Not data Found",
          data:result
        })
      }
    } catch (error) {
      console.log(error)
      return res.json(500,{
        message: "error occurered",
        error: error
      })
    }
  },

  userWallet: async(req, res) => {
    try {
      let user = req.user;
      let {id} = req.body;
      if(id)
      {
        let sql = "SELECT wallet FROM tbl_user where id = ?";
        let result = await mysqlcon(sql, [id]);
        let currencySql = "SELECT sortname FROM countries WHERE status = 1"
        let currencyResult = await mysqlcon(currencySql)
        let data= result;
        if(result.length !== 0){
          return res.json(200,{
            message: `Data`,
            data:data,
            currencyResult
          })
        } else {
          return res.json(201,{
            message: "Not data Found",
            data:result
          })
        }
      }
      else
      {
        let sql = "SELECT wallet FROM tbl_user where id = ?";
        let result = await mysqlcon(sql, [user.id]);
        let currencySql = "SELECT sortname FROM countries WHERE status = 1"
        let currencyResult = await mysqlcon(currencySql)
        let data= result;
        if(result.length !== 0)
        {
          return res.json(200,{
          message: `Data`,
          data:data,
          currencyResult
        })
        }else 
        {
          return res.json(201,{
          message: "Not data Found",
          data:result
          })
        }
      }
      
    } catch (error) {
      console.log(error)
      return res.json(500,{
        message: "error occurered",
        error: error
      })
    }
  },
  
};

module.exports = settlement;