const mysqlcon = require("../../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

const teamSettlement = {

    // Local Settlement //

    teamLocalSettlement: async (req, res) => {
        let user = req.user;
        let { from, to, date, settlementId } = req.body;

        try {
            let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
            let result = await mysqlcon(sql1, user.parent_id);
            let sql2;
            let result2;
            if(settlementId){
            sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND settlementId LIKE ?";
            result2 = await mysqlcon(sql2,[user.parent_id,settlementId+"%"]);
            } else if(date){
            sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ?";
            result2 = await mysqlcon(sql2,[user.parent_id, date])
            } else if(to && from){
            sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
            result2 = await mysqlcon(sql2,[user.parent_id, from, to])
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
            data = await mysqlcon(sql, [user.parent_id, date,page.start, page.limit]);
            } else if (from && to){
            let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
            data = await mysqlcon(sql, [user.parent_id, from, to, page.start, page.limit]);
            } else if(settlementId){
            let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
            data = await mysqlcon(sql, [user.parent_id,settlementId+"%",page.start,page.limit]);
            }else{
            let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 ORDER BY created_on DESC LIMIT ?,?";
            data = await mysqlcon(sql, [user.parent_id, page.start, page.limit]);
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
        } catch (error) {
        console.log(error);
        return res.json(500, {
            message: "error occur",
            error,
        });
        }
    },

    localTeamRequestSettlement : async (req, res) => {
        try {
            let user = req.user;
            let { settlementId, toCurrency, accountNumber, bankName, branchName, requestedAmount } = req.body;
            let Sql_Avl_bal="SELECT wallet FROM tbl_user WHERE id = ?"
            let available_bal = await mysqlcon(Sql_Avl_bal,[user.parent_id])
            let available_balance = available_bal[0].wallet
            let Settlement = {
                user_id: user.parent_id,
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
            let walletResult = await mysqlcon(updateSQL, [remBalance, user.parent_id]);
            if(result.affectedRows > 0){
                return res.status(200).json({
                    message: "Request settlement transaston Successfully",
                    data: result,
                });
            } else {
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

    localTeamCardDetails: async (req, res) => {
        let user = req.user;
        let {from,to,date,searchItem} = req.body;
        try {
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
        
                to && from ? [user.parent_id,from,to] : date ? [user.parent_id,date] : searchItem ? [user.parent_id,"%"+searchItem+"%"] : [user.parent_id]
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
        } catch (error) {
            console.log(error);
            return res.json(500, {
                message: "error occured",
                error: error,
            });
        }
    },
    
    localTeamDownloadReportsc : async (req, res) => {
        let user = req.user;
        const {from,to, date} = req.body;
        try {
            if(from && to){
                let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? AND settlement_mode = 2";
                let result = await mysqlcon(sql, [ from ,to,user.parent_id ]);
                if (result.length === 0) {
                    res.send(result)
                } else {
                    res.send(result)
                }
            } else if(date) {
                let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) = ?";
                let result = await mysqlcon(sql, [user.parent_id, date]);
                if (result.length === 0) {
                    res.send(result)
                } else {
                    res.send(result)
                }
            } else {
                let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2";
                let result = await mysqlcon(sql, [user.parent_id]);
                if (result.length === 0) {
                    res.send(result)
                } else {
                    res.send(result)
                }
            }
        } catch (error) {
          console.log(error)
          return res.status(201).json({ status: false, message: "Some error occured"});
        } 
    },

    // Common API

    userTeamWallet: async(req, res) => {
        try {
            let user = req.user;
            let sql = "SELECT wallet FROM tbl_user where id = ?";
            let result = await mysqlcon(sql, [user.parent_id]);
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
        } catch (error) {
            console.log(error)
            return res.json(500,{
                message: "error occurered",
                error: error
            })
        }
    },


    // International Settlement //

    teamInternationalSettlement: async (req, res) => {
        let user = req.user;
        let { from, to,date,settlementId } = req.body;
    
        try {
            let sql1 ="SELECT Count(*) as count FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
            let result = await mysqlcon(sql1, user.parent_id);
            let sql2;
            let result2;
            if(settlementId){
              sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ?";
              result2 = await mysqlcon(sql2,[user.parent_id,settlementId+"%"]);
            } else if(date){
              sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ?";
              result2 = await mysqlcon(sql2,[user.parent_id, date])
            } else if(to && from){
              sql2 ="SELECT COUNT(*) as Total FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
              result2 = await mysqlcon(sql2,[user.parent_id, from, to])
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
              data = await mysqlcon(sql, [user.parent_id, date,page.start, page.limit]);
            } else if (from && to){
              let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on) >= ? AND DATE(created_on) <= ? ORDER BY created_on DESC LIMIT ?,?";
              data = await mysqlcon(sql, [user.parent_id, from, to, page.start, page.limit]);
            } else if(settlementId){
              let sql = "SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ? ORDER BY created_on DESC LIMIT ?,?";
              data = await mysqlcon(sql, [user.parent_id,settlementId+"%",page.start,page.limit]);
            }else{
              let sql ="SELECT *, DATE_FORMAT(requested_time, '%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 ORDER BY created_on DESC LIMIT ?,?";
              data = await mysqlcon(sql, [user.parent_id, page.start, page.limit]);
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
        } catch (error) {
          console.log(error);
          return res.json(500, {
            message: "error occur",
            error,
          });
        }
    },
    
    requestInternationalSettlement : async (req, res) => {
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
                user_id: user.parent_id,
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
                user_id: user.parent_id,
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
            let walletResult = await mysqlcon(updateSQL, [remBalance, user.parent_id]);
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

    teamInternationalCardDetails: async (req, res) => {
        const user = req.user;
        const { from, to, date, searchItem } = req.body;
      
        try {
          const getResults = async (sql, params) => {
            const result = await mysqlcon(sql, params);
            return result[0] || { count: 0 };
          };
      
          let sql, params;
      
          if (to && from) {
            sql =
              "SELECT COALESCE(SUM(requestedAmount),0) as request, COALESCE(SUM(charges),0) as charges, COALESCE(SUM(settlementAmount),0) as total_amount_received, COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on) BETWEEN ? AND ?";
            params = [user.parent_id, from, to];
          } else if (date) {
            sql =
              "SELECT COALESCE(SUM(requestedAmount),0) as request, COALESCE(SUM(charges),0) as charges, COALESCE(SUM(settlementAmount),0) as total_amount_received, COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on) = ?";
            params = [user.parent_id, date];
          } else if (searchItem) {
            sql =
              "SELECT COALESCE(SUM(requestedAmount),0) as request, COALESCE(SUM(charges),0) as charges, COALESCE(SUM(settlementAmount),0) as total_amount_received, COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ?";
            params = [user.parent_id, searchItem];
          } else {
            sql =
              "SELECT COALESCE(SUM(requestedAmount),0) as request, COALESCE(SUM(charges),0) as charges, COALESCE(SUM(settlementAmount),0) as total_amount_received, COALESCE(SUM(net_amount_for_settlement),0) AS total_amount_sent FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1";
            params = [user.parent_id];
          }
      
          const result = await getResults(sql, params);
      
          if (result.count === 0) {
            return res.json(201, {
              data: Array(4).fill({
                name: "Total Settlement Request",
                amount: 0,
              }),
            });
          } else {
            return res.json(200, {
              data: [
                { name: "Total Settlement Request", amount: result.request },
                { name: "Total Fees/Charges", amount: result.charges },
                { name: "Total Amount Sent", amount: result.total_amount_received },
                { name: "Total Amount Recieved", amount: result.total_amount_sent },
              ],
            });
          }
        } catch (error) {
          console.error(error);
          return res.json(500, {
            message: "Error occurred",
            error: error.message,
          });
        }
    },

    downloadReportsc : async (req, res) => {
        let user = req.user;
        const {from,to} = req.body;
        try {
            if(from && to){
            let sql = "SELECT user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE DATE(created_on)  >= ? AND DATE(created_on) <= ? AND user_id = ? ";
            let result = await mysqlcon(sql, [ from ,to,user.parent_id ]);
            if (result.length === 0) {
                res.send(result)
            } else {
                res.send(result)
            }
            } else {
            let sql = "SELECT  user_id,settlementId,settlementType,fromCurrency,toCurrency,created_on,walletAddress,accountNumber,bankName,branchName,city,country,swiftCode,requestedAmount,charges,exchangeRate,totalCharges,settlementAmount FROM tbl_settlement WHERE user_id = ?";
            let result = await mysqlcon(sql, [user.parent_id]);
            if (result.length === 0) {
                res.send(result)
            } else {
                res.send(result)
            }
        }
        } catch (error) {
            console.log(error)
            return res.status(201).json({ status: false, message: "Some error occured"});
        } 
    },

    teamDownloadReportsc: async (req, res) => {
      let user = req.user;
      const { from, to, searchItem, date } = req.body;
      console.log(req.body);
      try {
        if (to && from){  
         let sql1 =  "SELECT user_id, settlementId, settlementType, fromCurrency, toCurrency, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on, walletAddress, accountNumber, bankName, branchName, city, country, swiftCode, requestedAmount, charges, exchangeRate, totalCharges, settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on)  >= ? AND DATE(created_on) <= ?"
          let result = await mysqlcon(sql1, [user.parent_id, to, from]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        } else if (date){
            let sql = "SELECT user_id, settlementId, settlementType, fromCurrency, toCurrency, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on, walletAddress, accountNumber, bankName, branchName, city, country, swiftCode, requestedAmount, charges, exchangeRate, totalCharges, settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND DATE(created_on) = ?"
            let result = await mysqlcon(sql,[user.parent_id, date]);
            if (result.length === 0) {
              res.send(result)
            } else {
              res.send(result)
            }
        } else if(searchItem){
          let sql = "SELECT user_id, settlementId, settlementType, fromCurrency, toCurrency, created_on, walletAddress, accountNumber, bankName, branchName, city, country, swiftCode, requestedAmount, charges, exchangeRate, totalCharges, settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1 AND settlementId LIKE ?"
          let result = await mysqlcon(sql, [user.parent_id, searchItem]);
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        } else {
          let sql = "SELECT user_id, settlementId, settlementType, fromCurrency, toCurrency, DATE_FORMAT(created_on, '%Y-%m-%d %H:%i:%s') AS created_on, walletAddress, accountNumber, bankName, branchName, city, country, swiftCode, requestedAmount, charges, exchangeRate, totalCharges, settlementAmount FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 1; "
  
          let result = await mysqlcon(sql, [user.parent_id]);
  
          if (result.length === 0) {
            res.send(result)
          } else {
            res.send(result)
          }
        }
      } catch (error) {
        console.log(error)
        return res.json(500, {
          message: "error occurered",
          error: error
        })
      }
    },
}

module.exports = teamSettlement;