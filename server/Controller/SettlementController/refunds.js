const mysqlcon = require("../../config/db_connection");
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time; 

class Refunds{
  async default(req,res){
    try {
      const {from,to,date,searchItem}=req.body;

      let pagination = (total, page) => {
        let limit = 10;
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages,searchItem };
      };

      let CountFromToSql="Select count(*) AS Total From tbl_refund_in_settlement WHERE Date(created_on) >= ? AND DATE(created_on) <= ? ";
      
      let CountDateSql="Select count(*) AS Total From tbl_refund_in_settlement WHERE Date(created_on) = ? ";

      let CountdefaultDataSql="Select count(*) AS Total From tbl_refund_in_settlement ";

      let CountSearchSql = `Select count(*) AS Total From tbl_refund_in_settlement WHERE customer_name LIKE '%${searchItem}%' `;

      let CountResult=await mysqlcon(
        from && to 
        ? CountFromToSql
        : date
        ? CountDateSql
        : searchItem
        ? CountSearchSql
        : CountdefaultDataSql,
        from && to ? [from ,to] : date ? [date] : ""  
      )
    
      let total = CountResult[0].Total;
      let Page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let page = pagination(total, Page, limit);

      let DefaultSql="Select tbl_refund_in_settlement.*, DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date, payment_gateway.gateway_name AS bank_name, DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name ORDER BY created_on DESC LIMIT ?,?"


      let FromToSql="Select tbl_refund_in_settlement.*, DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date, payment_gateway.gateway_name AS bank_name, DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE Date(tbl_refund_in_settlement.created_on) >= ? AND DATE(tbl_refund_in_settlement.created_on) <= ? ORDER BY created_on DESC LIMIT ?,?"


      let DateSql="Select tbl_refund_in_settlement.*, DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date, payment_gateway.gateway_name AS bank_name, DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE DATE(tbl_refund_in_settlement.created_on)=? LIMIT ?,?"
      

      let SearchSql=`Select tbl_refund_in_settlement.*, DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date, payment_gateway.gateway_name AS bank_name, DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE customer_name LIKE '%${searchItem}%' LIMIT ?,?`

      let data=await mysqlcon(
        from && to 
        ? FromToSql
        : date
        ? DateSql
        : searchItem
        ? SearchSql
        : DefaultSql,
        from && to ? [from ,to,page.start,page.limit] : date ? [date,page.start,page.limit] : [page.start,page.limit]  
      )

      let startRange = page.start + 1;
      let endRange = page.start + data.length;
          
      
      res.status(200).json({
        message: data.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        numOfPages: page.numOfPages,
        pageLimit: page.limit,
        result: data
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  async newRefund(req, res){
      // try {
      //     const {id} = req.body
      //     if (Object.keys(req.body).length <= 0) {
      //       const { email } = req.user;
      //       let sqlForMerchant = "select id,name from tbl_user";
      //       let sqlForBank ="SELECT id,gateway_name FROM payment_gateway where type = 0 And status=1";
      //       let merchant = mysqlcon(sqlForMerchant);
      //       let bankName = mysqlcon(sqlForBank);
      //       const data = await Promise.all([merchant, bankName]);
      //       return res
      //         .status(200)
      //         .json({ merchant: data[0], bankName: data[1], authorizer: email });
      //     } else if(Object.keys(req.body).length >=6 && id===undefined) {
      //       let formData = {
      //         user_id: req.body.merchantId,
      //         mer_name: req.body.merchantName,
      //         recieved_date: req.body.recieved_date,
      //         currency: req.body.Currency,
      //         bank_name:req.body.bankName,
      //         trx_type:req.body.TransactionType,
      //         trx_id:req.body.transactionid,
      //         reason:req.body.reason,
      //         case_no:req.body.case_no,
      //         customer_name:req.body.customer_name,
      //         amount:req.body.amount,
      //         charges:req.body.charges,
      //         auth:req.body.authorizer,
      //         net_amount:(req.body.amount && req.body.charges) ? (req.body.amount - req.body.charges) : req.body.amount,
      //         created_on: req.body.recieved_date,
      //         updated_on: req.body.recieved_date
      //       };
      //         let sql = "INSERT INTO tbl_refund_in_settlement SET ?"
      //         let result = await mysqlcon(sql, [formData]);
      //         if(result.affectedRows){
      //           return res.status(200).json({ message: "Successfully" });
      //         }else{
      //           return res.status(403).json({ message: "Error While Insterting" });
      //         } 
      //     }else if(Object.keys(req.body).length >=6 && id){
      //       let formData = {
      //         user_id: req.body.merchantId,
      //         mer_name: req.body.merchantName,
      //         recieved_date: req.body.recieved_date,
      //         currency: req.body.Currency,
      //         bank_name:req.body.bankName,
      //         trx_type:req.body.TransactionType,
      //         trx_id:req.body.transactionid,
      //         ReasonForRefund:req.body.reason,
      //         case_no:req.body.case_no,
      //         customer_name:req.body.customer_name,
      //         amount:req.body.amount,
      //         charges:req.body.charges,
      //         auth:req.body.authorizer,
      //         net_amount:(req.body.amount && req.body.charges) ? (req.body.amount - req.body.charges) : req.body.amount,
      //         created_on: req.body.recieved_date,
      //         updated_on: req.body.recieved_date
      //       };
      //         let sql = "Update tbl_refund_in_settlement SET ? WHERE id = ?"
      //         let result = await mysqlcon(sql, [formData,id]);
      //         if(result.affectedRows){
      //           return res.status(200).json({ message: "Successfully Data Update" });
      //         }else{
      //           return res.status(403).json({ message: "Error While Insterting" });
      //         } 
      //     }
      //     } catch (error) {
      //         console.log(error)
      //     res
      //       .status(500)
      //       .json({ message: "Sonthing Went Wrong in Bank Deposite", error });
      // }
    
    try {
      let sqlName = "SELECT name FROM tbl_user WHERE id = ?"
      let resultName = await mysqlcon(sqlName, [req.body.merchantId]);
      let formData = {
        user_id: req.body.merchantId,
        mer_name: resultName[0].name,
        recieved_date: dateTime,
        currency: req.body.refundCurrency,
        bank_name:req.body.bank,
        trx_type:req.body.transactionType,
        trx_id: req.body.RefundId,
        customer_name:req.body.cusName,
        amount:req.body.refundAmount,
        charges:req.body.refundCharges,
        reason:req.body.reason,
        net_amount:(req.body.refundAmount && req.body.refundCharges) ? (req.body.refundAmount - req.body.refundCharges) : req.body.refundAmount,
        auth:req.user.email,
        created_on: dateTime,
        updated_on: dateTime
      }

      let sql = "INSERT INTO tbl_refund_in_settlement SET ?"
      let result = await mysqlcon(sql, [formData]);
      if(result.affectedRows){
        let msql = "UPDATE tbl_merchant_transaction SET status = 4 WHERE order_no = ?"
        let mres = await mysqlcon(msql, [req.body.orderid])
        return res.status(200).json({ message: "Successfully", mres });
      }else{
        return res.status(403).json({ message: "Error While Insterting" });
      } 
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: "Sonthing Went Wrong in Bank Deposite", error });
    }
  }

  async updateRefund(req, res){
    try {
      let {ID} = req.body
      let formData = {
        currency: req.body.currency,
        bank_name: req.body.bank,
        mode: req.body.type,
        reason: req.body.reason,
        case_no: req.body.caseNumber,
        updated_on: dateTime
      }
      let sql = "Update tbl_chargeback_disputes SET ? WHERE trx_id = ?"
      let result = await mysqlcon(sql, [formData,ID]);
      if(result.affectedRows){
        return res.status(200).json({ message: "Successfully Data Updated" });
      }else{
        return res.status(403).json({ message: "Error While Insterting" });
      }
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: "Sonthing Went Wrong", error });
    }
  }

  async updateRefund(req, res){
    try {
      let {ID} = req.body
      let formData = {
        currency: req.body.currency,
        bank_name: req.body.bank,
        trx_type: req.body.type,
        reason: req.body.reason,
        case_no: req.body.caseNumber,
        updated_on: dateTime
      }
      let sql = "Update tbl_refund_in_settlement SET ? WHERE trx_id = ?"
      let result = await mysqlcon(sql, [formData,ID]);
      if(result.affectedRows){
        return res.status(200).json({ message: "Successfully Data Updated" });
      }else{
        return res.status(403).json({ message: "Error While Insterting" });
      }
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: "Sonthing Went Wrong", error });
    }
  }

  async getRefundData(req, res){
    try {
      let {trx_id} = req.body;
      let sql = "SELECT tbl_refund_in_settlement.*, DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date FROM tbl_refund_in_settlement WHERE trx_id = ?"
      let result = await mysqlcon(sql, [trx_id]);
      res.status(200).json({
        result : result[0]
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  }

  // async refundCardData(req,res){
  //   try{
  //     const {date, from, to, searchItem} = req.body;

  //     let sqlDefault = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id";
  //     let sqlDate = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id WHERE DATE(tbl_refund_in_settlement.created_on) = ?";
  //     let sqlFromTo = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id WHERE DATE(tbl_refund_in_settlement.created_on)  >= ? AND DATE(tbl_refund_in_settlement.created_on) <= ? "
  //     let searchSql = `SELECT COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id WHERE customer_name LIKE '%${searchItem}%'`

  //     let result = await mysqlcon(
  //         from && to
  //       ? sqlFromTo
  //       : date
  //       ? sqlDate
  //       : searchItem
  //       ? searchSql
  //       : sqlDefault,
  //         from && to ? [from, to]:
  //         date ? [date]:
  //         searchItem ? [searchItem]
  //         : "");
  //         let RefundAmount;
  //         let RefundTransaction;
  //         let RefundCharges;
  //         let RefundExecuted
          
  //         if(result[0].TotalRefundTransation === null){
  //           RefundTransaction = 0
  //        } else{
  //         RefundTransaction = result[0].TotalRefundTransation
  //        }
    
  //        if(result[0].TotalRefundAmount === null){
  //         RefundAmount = 0
  //        } else{
  //         RefundAmount = result[0].TotalRefundAmount.toFixed(2)
  //        }
    
  //        if(result[0].ChargesFees === null){
  //         RefundCharges = 0
  //        } else{
  //         RefundCharges = result[0].ChargesFees.toFixed(2)
  //        }
    
  //       //  if(result[0].RefundExecuted === null){
  //       //   RefundExecuted = 0
  //       //  } else{
  //       //   RefundExecuted = result[0].RefundExecuted.toFixed(2)
  //       //  }
    
  //      if ((result[0].count) === 0) {
  //        return res.json(201, {
  //          data: [
  //            {
  //              name: "Total Refund Transaction",
  //              amount: 0,
  //            },
  //            {
  //              name: "Total Refund Amount",
  //              amount: 0,
  //            },
  //            {
  //              name: "Charges & Fees",
  //              amount: 0,
  //            },
  //           //  {
  //           //    name: "Total Refund Executed",
  //           //    amount: 0
  //           //  },
  //          ],
  //        });
  //      } else {
  //        return res.json(200, {
  //          data: [
  //            {
  //              name: "Total Refund Transaction",
  //              amount: RefundTransaction
  //            },
  //            {
  //              name: "Total Refund Amount",
  //              amount: RefundAmount,
  //            },
  //            {
  //              name: "Charges & Fees",
  //              amount: RefundCharges,
  //            },
  //           //  {
  //           //    name: "Total Refund Executed",
  //           //    amount: RefundExecuted
  //           //  },
  //          ],
  //        });
  //      }  

  //   }catch(error){
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Something went wrong ",
  //       error
  //     })
  //   }
  // }

  async refundCardData(req,res){
    try{
      const {date, from, to} = req.body;

      let sqlDefault = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement LEFT JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id";
      let sqlDate = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement LEFT JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id WHERE DATE(tbl_refund_in_settlement.created_on) = ?";
      let sqlFromTo = "select COUNT(tbl_refund_in_settlement.id) AS TotalRefundTransation, SUM(amount) AS TotalRefundAmount, SUM(charges) AS ChargesFees from tbl_refund_in_settlement LEFT JOIN payment_gateway ON tbl_refund_in_settlement.bank_name = payment_gateway.id WHERE DATE(tbl_refund_in_settlement.created_on)  >= ? AND DATE(tbl_refund_in_settlement.created_on) <= ? "

      let result = await mysqlcon(
          from && to
        ? sqlFromTo
        : date
        ? sqlDate
        : sqlDefault,
          from && to ? [from, to]:
          date ? [date]:
          "");
          let RefundAmount;
          let RefundTransaction;
          let RefundCharges;
          let RefundExecuted
          
          if(result[0].TotalRefundTransation === null){
            RefundTransaction = 0
          } else{
          RefundTransaction = result[0].TotalRefundTransation
          }
    
          if(result[0].TotalRefundAmount === null){
          RefundAmount = 0
          } else{
          RefundAmount = result[0].TotalRefundAmount.toFixed(2)
          }
    
          if(result[0].ChargesFees === null){
          RefundCharges = 0
          } else{
          RefundCharges = result[0].ChargesFees.toFixed(2)
          }
    
        //  if(result[0].RefundExecuted === null){
        //   RefundExecuted = 0
        //  } else{
        //   RefundExecuted = result[0].RefundExecuted.toFixed(2)
        //  }
    
        if ((result[0].count) === 0) {
          return res.json(201, {
            data: [
              {
                name: "Total Refund Transaction",
                amount: 0,
              },
              {
                name: "Total Refund Amount",
                amount: 0,
              },
              {
                name: "Charges & Fees",
                amount: 0,
              },
            //  {
            //    name: "Total Refund Executed",
            //    amount: 0
            //  },
            ],
          });
        } else {
          return res.json(200, {
            data: [
              {
                name: "Total Refund Transaction",
                amount: RefundTransaction
              },
              {
                name: "Total Refund Amount",
                amount: RefundAmount,
              },
              {
                name: "Charges & Fees",
                amount: RefundCharges,
              },
            //  {
            //    name: "Total Refund Executed",
            //    amount: RefundExecuted
            //  },
            ],
          });
        }  

    }catch(error){
      console.log(error);
      res.status(500).json({
        message: "Something went wrong ",
        error
      })
    }
  };

  async settlementRefundDownload(req, res){
    try {
      const {from,to,date,searchItem}=req.body;
    
      let DefaultSql="Select tbl_refund_in_settlement.user_id,tbl_refund_in_settlement.trx_id,tbl_refund_in_settlement.mer_name,DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date,tbl_refund_in_settlement.currency,tbl_refund_in_settlement.amount,tbl_refund_in_settlement.charges, payment_gateway.gateway_name AS bank_name,tbl_refund_in_settlement.customer_name,tbl_refund_in_settlement.reason,tbl_refund_in_settlement.trx_type,tbl_refund_in_settlement.auth,tbl_refund_in_settlement.net_amount,DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id AS trx_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.payment_type AS trx_type,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=4"


      let FromToSql="Select tbl_refund_in_settlement.user_id,tbl_refund_in_settlement.trx_id,tbl_refund_in_settlement.mer_name,DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date,tbl_refund_in_settlement.currency,tbl_refund_in_settlement.amount,tbl_refund_in_settlement.charges, payment_gateway.gateway_name AS bank_name,tbl_refund_in_settlement.customer_name,tbl_refund_in_settlement.reason,tbl_refund_in_settlement.trx_type,tbl_refund_in_settlement.auth,tbl_refund_in_settlement.net_amount,DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE Date(created_on) >= ? AND DATE(created_on) <= ? UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id AS trx_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS charges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.payment_type AS trx_type,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=4 AND Date(tbl_merchant_transaction.created_on)>= ? AND Date(tbl_merchant_transaction.created_on)<= ?"


      let DateSql="Select tbl_refund_in_settlement.user_id,tbl_refund_in_settlement.trx_id,tbl_refund_in_settlement.mer_name,DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date,tbl_refund_in_settlement.currency,tbl_refund_in_settlement.amount,tbl_refund_in_settlement.charges, payment_gateway.gateway_name AS bank_name, tbl_refund_in_settlement.customer_name,tbl_refund_in_settlement.reason,tbl_refund_in_settlement.trx_type,tbl_refund_in_settlement.auth,tbl_refund_in_settlement.net_amount,DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE created_on=? UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id AS trx_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.payment_type AS trx_type,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=4 AND Date(tbl_merchant_transaction.created_on) = ?"
      

      let SearchSql=`Select tbl_refund_in_settlement.user_id,tbl_refund_in_settlement.trx_id,tbl_refund_in_settlement.mer_name,DATE_FORMAT(tbl_refund_in_settlement.recieved_date,'%Y-%m-%d %H:%i:%s')AS received_date,tbl_refund_in_settlement.currency,tbl_refund_in_settlement.amount,tbl_refund_in_settlement.charges, payment_gateway.gateway_name AS bank_name,tbl_refund_in_settlement.customer_name,tbl_refund_in_settlement.reason,tbl_refund_in_settlement.trx_type,tbl_refund_in_settlement.auth,tbl_refund_in_settlement.net_amount,DATE_FORMAT(tbl_refund_in_settlement.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_refund_in_settlement.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_refund_in_settlement LEFT JOIN payment_gateway ON payment_gateway.id = tbl_refund_in_settlement.bank_name WHERE customer_name LIKE '%${searchItem}%'  UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id AS trx_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.payment_type AS trx_type,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=4 AND tbl_merchant_transaction.i_flname LIKE '%${searchItem}%'`

      let data=await mysqlcon(
        from && to 
        ? FromToSql
        : date
        ? DateSql
        : searchItem
        ? SearchSql
        : DefaultSql,
        from && to ? [from ,to,from,to] : date ? [date,date] : searchItem ? [searchItem]: []  
      )

      res.send(data)
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  async getRefundDetails(req, res){
    try{
      const {orderId} = req.body;
      let sqlCustomerDetails = "SELECT ammount AS Amount, payin_charges AS Charges, i_flname AS CustomerName FROM `tbl_merchant_transaction` WHERE order_no = ? ";
      let resultCustomerDetails = await mysqlcon(sqlCustomerDetails,[orderId]);
      res.send(resultCustomerDetails[0])
    }catch(error){
      console.log(error);
      res.status(500).json({
        message: " Something went wrong ",
        error
      })
    }
  };
}

module.exports = new Refunds