const mysqlcon = require("../../config/db_connection");
const Pagination = require('../../services/pagination')
class InternationalSettlement{
    async default(req,res){
      try {
          const { to,from,date,pageNumber,searchItem} = req.body
          let {group_id} = req.user;
          let sqlAllCount = "select count (*) as Total from tbl_settlement WHERE settlement_mode = 1";
          let sqCountDate = "select count (*) as Total from tbl_settlement where DATE(created_on) = ? AND settlement_mode = 1";
          let sqlToFromCount = "select count (*) as Total from tbl_settlement where DATE(created_on)  >= ? AND DATE(created_on) <= ? AND settlement_mode = 1"
          let sqlSearchCount = `select count (*) as Total from tbl_settlement where settlementId LIKE '%${searchItem}%' AND settlement_mode = 1`

          let result = await mysqlcon(date?sqCountDate:(to&&from)?sqlToFromCount:searchItem?sqlSearchCount:sqlAllCount,date?[date]:(to&&from)?[from,to]: '')
          let total = result[0].Total;
          let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
          let limit = req.body.limit ? Number(req.body.limit) : 10;
          let { start, numOfPages } = Pagination.pagination(result[0].Total, page, limit);
          
          let sql=`select tbl_settlement.*, DATE_FORMAT(requested_time,'%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on, DATE_FORMAT(settlement_time,'%Y-%m-%d %H:%i:%s') AS settlement_time from tbl_settlement WHERE settlement_mode = 1 ORDER BY created_on DESC limit ?,?`
          let sqlDate = `select tbl_settlement.*, DATE_FORMAT(requested_time,'%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on, DATE_FORMAT(settlement_time,'%Y-%m-%d %H:%i:%s') AS settlement_time from tbl_settlement where DATE(created_on) = ? AND settlement_mode = 1 ORDER BY created_on DESC limit ?,?`
          let sqlToFrom = `select tbl_settlement.*, DATE_FORMAT(requested_time,'%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on, DATE_FORMAT(settlement_time,'%Y-%m-%d %H:%i:%s') AS settlement_time from tbl_settlement where DATE(created_on)  >= ? AND DATE(created_on) <= ? AND settlement_mode = 1 ORDER BY created_on DESC limit ?,?`
          let sqlSearch = `select tbl_settlement.*, DATE_FORMAT(requested_time,'%Y-%m-%d %H:%i:%s') AS requested_time, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on, DATE_FORMAT(settlement_time,'%Y-%m-%d %H:%i:%s') AS settlement_time from tbl_settlement where settlementId LIKE '%${searchItem}%'AND settlement_mode = 1 ORDER BY created_on DESC limit ?,?`

          const data = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:searchItem?sqlSearch:sql,date?[date,start,limit]:(to&&from)?[from,to,start,limit]:[start,limit]);
          let startRange = start + 1;
          let endRange = start + data.length;

          res.status(200).json({
            groupId : group_id,
            message: data.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
            result:data,
            numOfPages: numOfPages ? numOfPages : 1,
          })
        
      } catch (error) {
          console.log(error)
          res.status(500).json({message:"Something went wrong",
      error})
      }
      
    }

    async requestInternational(req, res) {
      try {
        console.log(req.body)
        let group_id = req.user.group_id;
        let role = req.user.role;
        let { 
          settlementId,
          user_id,
          settlementType,
          currency,
          toCurrency,
          walletAdd,
          wallet_type,
          accountN,
          account_name,
          availableBalance,
          requestedAmount,
          fees,
          net_amount_for_settlement,
          exchangeRate,
          bankName,
          branchName,
          city,
          zipcode,
          country,
          swift,
          authorizer,
          remBalance
        } = req.body;

        let source;

        if(group_id === 1){
          source = "By SuperAdmin";
        } else {
          if (role === 1){
            source = "By Admin"
          } else {
            source = "By Settlement"
          }
        }

      let nameSql = "SELECT name FROM tbl_user WHERE id = ?";
      let nameResult = await mysqlcon(nameSql, [req.body.user_id]);
      let merchant_name = nameResult[0].name;

      let Settlement = {
        settlementId: settlementId,
        user_id: user_id,
        settlementType: settlementType,
        fromCurrency: currency,
        toCurrency: toCurrency,
        walletAddress: walletAdd,
        wallet_type : wallet_type,
        accountNumber: accountN,
        account_name: account_name,
        available_balance: availableBalance,
        requestedAmount: requestedAmount,
        charges: fees,
        net_amount_for_settlement: net_amount_for_settlement,
        exchangeRate: exchangeRate,
        bankName: bankName,
        branchName: branchName,
        city: city,
        zip_code: zipcode,
        country: country,
        swiftCode: swift,
        authorizer : authorizer,
        settlementAmount: (requestedAmount && !fees && !exchangeRate ? requestedAmount : (requestedAmount && fees && !exchangeRate) ? (requestedAmount - fees) : (requestedAmount && fees && exchangeRate) ? ((requestedAmount - fees)/exchangeRate) : 0),
        source: source,
        settlement_mode: 1,
        status: 2,
        merchant_name
      };

      let wallet = remBalance;
      let sql2 = "INSERT INTO tbl_settlement SET ?, requested_time = NOW(), created_on = NOW(), updated_on = NOW()";
      let result = await mysqlcon(sql2, Settlement);
      let updateSQL  = "UPDATE tbl_user SET wallet = ? where id = ?";
      let walletResult = await mysqlcon(updateSQL, [wallet, user_id]);
  
      if(result.affectedRows > 0){
        return res.status(200).json({
          message: "Request settlement transaston Successfully",
          data:result
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
    }

    async editInternational(req, res) {
      try {
      let Settlement = {
        settlementId: req.body.settlementId,
        user_id: req.body.user_id,
        settlementType: req.body.settlementType,
        fromCurrency: req.body.currency,
        toCurrency: req.body.toCurrency,
        walletAddress: req.body.walletAdd,
        wallet_type : req.body.settlementType,
        accountNumber: req.body.accountN,
        account_name: req.body.account_name,
        available_balance: req.body.availableBalance,
        requestedAmount: req.body.requestedAmount,
        charges: req.body.fees,
        net_amount_for_settlement: req.body.requestedAmount && req.body.fees ? req.body.requestedAmount - req.body.fees : req.body.requestedAmount,
        exchangeRate: req.body.exchangeRate,
        bankName: req.body.bankName,
        branchName: req.body.branchName,
        city: req.body.city,
        zip_code: req.body.zipcode,
        country: req.body.country,
        swiftCode: req.body.swift,
        authorizer : req.body.authorizer,
        settlementAmount: (req.body.requestedAmount && !req.body.fees && !req.body.exchangeRate ? req.body.requestedAmount : (req.body.requestedAmount && req.body.fees && !req.body.exchangeRate) ? (req.body.requestedAmount - req.body.fees) : (req.body.requestedAmount && req.body.fees && req.body.exchangeRate) ? ((req.body.requestedAmount - req.body.fees)/req.body.exchangeRate) : 0),
      };
      let sql2 = "UPDATE tbl_settlement SET ?, requested_time = NOW(), updated_on = NOW() WHERE id = ?";
      let result = await mysqlcon(sql2, [Settlement, req.body.id]);
  
      if(result.affectedRows > 0){
        return res.status(200).json({
          message: "Request settlement transaston Updated Successfully",
          data:result
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
    }

    async defaultInternationalDownload(req, res) {
      try {
        const {to, from, date, searchItem } = req.body;
        console.log(req.body);
  
        let sql='select * from tbl_settlement WHERE settlement_mode = 1 ORDER BY created_on'
        let sqlDate = 'select * from tbl_settlement where DATE(created_on) = ? AND settlement_mode = 1 ORDER BY created_on'
        let sqlToFrom = 'select * from tbl_settlement where DATE(created_on)  >= ? AND DATE(created_on) <= ? AND settlement_mode = 1 ORDER BY created_on'
        let sqlSearch = `select * from tbl_settlement where settlementId LIKE '%${searchItem}%'AND settlement_mode = 1 ORDER BY created_on`
      
        const result = await mysqlcon(date?sqlDate:(to&&from)?sqlToFrom:searchItem?sqlSearch:sql,date?[date]:(to&&from)?[from,to]:[]);
    
        res.send(result)
    
      } catch(err){
        console.log(err)
        res.status(500).json({
          message:"Server Error",
          err,
        })
      }
    }

    async toggleInternationalStatus(req, res){
      try{
        const {group_id} = req.user
        const {settlementId ,val} = req.body
        console.log(req.body)
        // groupid => 1 - superadmin|| 2 - subadmin   AND  role => 1 - admin || 2 - settlement
        if(val === 1){
          if(group_id === 1){
            let sql = "UPDATE tbl_settlement SET status = 1 WHERE settlementId = ?"
            let result = await mysqlcon(sql, [settlementId])
            if(result){
              return res.json(200,{
                message: `Status Approved Successfully By Superadmin`,
              })
            }else{
              return res.json(201,{
                message : 'Error While Updating'
              })
            }
          }else{
            if(group_id === 2){
                let sql = "UPDATE tbl_settlement SET status = 3 WHERE settlementId = ?"
                let result = await mysqlcon(sql, [settlementId]);
                if(result){
                  return res.json(200,{
                    message :`Approval Request Sent To SuperAdmin`
                  })
                }else{
                  return res.json(201,{
                    message : 'Error While Updating'
                  })
                }
            }
          }
        } else {
          if(group_id === 1){
            let sql = "UPDATE tbl_settlement SET status = 0 WHERE settlementId = ?"
            let result = await mysqlcon(sql, [settlementId])
            if(result){
              return res.json(200,{
                message: `Status Failed Successfully By Superadmin`,
              })
            }else{
              return res.json(201,{
                message : 'Error While Updating'
              })
            }
          }else{
            if(group_id === 2){
                let sql = "UPDATE tbl_settlement SET status = 0 WHERE settlementId = ?"
                let result = await mysqlcon(sql, [settlementId]);
                if(result){
                  return res.json(200,{
                    message :`Status Failed Successfully By Subadmin`
                  })
                }else{
                  return res.json(201,{
                    message : 'Error While Updating'
                  })
                }
            }
          }
        }
      }catch(err){
        console.log(err)
        return res.json(500,{
          message : "error"
        })
      }
    }

    async internationalCards(req, res) {
      try {
        const {to, from, date, searchItem } = req.body;
        let cardSql = "SELECT count(*) as count, SUM(requestedAmount) as amount, SUM(charges) as charges, SUM(net_amount_for_settlement) as net_amount_for_settlement, SUM(settlementAmount) as settlementAmount FROM tbl_settlement WHERE settlement_mode = 1";
  
        let sqlToFrom = "SELECT count(*) as count, SUM(requestedAmount) as amount, SUM(charges) as charges, SUM(net_amount_for_settlement) as net_amount_for_settlement, SUM(settlementAmount) as settlementAmount FROM tbl_settlement WHERE settlement_mode = 1 AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
  
        let sqlDate = "SELECT count(*) as count, SUM(requestedAmount) as amount, SUM(charges) as charges, SUM(net_amount_for_settlement) as net_amount_for_settlement, SUM(settlementAmount) as settlementAmount FROM tbl_settlement WHERE settlement_mode = 1 AND DATE(created_on) = ?";
  
        let sqlSearch = `SELECT count(*) as count, SUM(requestedAmount) as amount, SUM(charges) as charges, SUM(net_amount_for_settlement) as net_amount_for_settlement, SUM(settlementAmount) as settlementAmount FROM tbl_settlement WHERE settlement_mode = 1 AND settlementId LIKE '%${searchItem}%'`;
  
        let result = await mysqlcon(to && from ? sqlToFrom : date ? sqlDate : searchItem ? sqlSearch : cardSql, to && from ? [from, to] : date ? [date] : searchItem ? [searchItem] : "");
  
        let requestedAmount;
        let charges;
        let netAmountForSettlement;
        let totalAmount;
  
        if(result[0].amount === null){
          requestedAmount = 0
        } else{
          requestedAmount = result[0].amount.toFixed(2)
        }
  
        if(result[0].charges === null){
          charges = 0
        } else{
          charges = result[0].charges.toFixed(2)
        }
  
        if(result[0].net_amount_for_settlement === null){
          netAmountForSettlement = 0
        } else{
          netAmountForSettlement = result[0].net_amount_for_settlement.toFixed(2)
        }
  
        if(result[0].settlementAmount === null){
          totalAmount = 0
        } else{
          totalAmount = result[0].settlementAmount.toFixed(2)
        }
  
        if (result[0].count === 0) {
          return res.json(201, {
            message: `User has no transaction`,
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
                name: "Total Amount Received",
                amount: 0,
              },
            ],
          });
        } else {
          return res.json(200, {
            message: `All Status Data`,
            data: [
              {
                name: "Total Settlement Request",
                amount: requestedAmount,
              },
              {
                name: "Total Fees/Charges",
                amount: charges,
              },
              {
                name: "Total Amount Sent",
                amount: netAmountForSettlement,
              },
              {
                name: "Total Amount Received",
                amount: totalAmount,
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
    }
}

module.exports = new InternationalSettlement