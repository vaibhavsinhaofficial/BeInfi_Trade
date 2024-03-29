const mysqlcon = require("../../config/db_connection");
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time; 

class DisputesChargeback{
  async default(req,res){
    try {
      const {from,to,date,searchItem}=req.body;

      let pagination = (total, page) => {
        let limit = 10;
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages,searchItem };
      };

      let CountFromToSql="Select count(*) AS Total From tbl_chargeback_disputes WHERE Date(created_on) >= ? AND DATE(created_on) <= ? "
      
      let CountDateSql="Select count(*) AS Total From tbl_chargeback_disputes WHERE Date(created_on) = ? "

      let CountdefaultDataSql="Select count(*) AS Total From tbl_chargeback_disputes "

      let CountSearchSql = `Select count(*) AS Total From tbl_chargeback_disputes WHERE customer_name LIKE '%${searchItem}%' `

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

      let DefaultSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name ORDER BY created_on DESC LIMIT ?,?"


      let FromToSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE Date(tbl_chargeback_disputes.created_on) >= ? AND DATE(tbl_chargeback_disputes.created_on) <= ? ORDER BY created_on DESC LIMIT ?,?"


      let DateSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE DATE(tbl_chargeback_disputes.created_on)=? ORDER BY created_on DESC"
      

      let SearchSql=`Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE customer_name LIKE '%${searchItem}%' LIMIT ?,?`

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
  }

  async createDisputes(req, res) {
      // try {
      //   const {id} = req.body
      //   if (Object.keys(req.body).length <= 0) {
      //     const { email } = req.user;
      //     let sqlForMerchant = "select id,name from tbl_user";
      //     let sqlForBank ="SELECT id,gateway_name FROM payment_gateway where type = 0 And status=1";
      //     let merchant = mysqlcon(sqlForMerchant);
      //     let bankName = mysqlcon(sqlForBank);
      //     const data = await Promise.all([merchant, bankName]);
      //     return res
      //       .status(200)
      //       .json({ merchant: data[0], bankName: data[1], authorizer: email });
      //   } else if(Object.keys(req.body).length >=6 && id===undefined) {
      //     let formData = {
      //       user_id: req.body.merchantId,
      //       mer_name: req.body.merchantName,
      //       recieved_date: req.body.receivedDate,
      //       currency: req.body.Currency,
      //       bank_name:req.body.bankName,
      //       mode:req.body.TransactionType,
      //       transaction_id:req.body.transactionid,
      //       customer_name:req.body.customer_name,
      //       amount:req.body.Amount,
      //       charges:req.body.Charges,
      //       reason:req.body.Reason,
      //       net_amount:(req.body.Amount && req.body.Charges) ? (req.body.Amount - req.body.Charges) : req.body.Amount,
      //       auth:req.body.authorizer,
      //       status: 5,
      //       created_on: req.body.receivedDate,
      //       updated_on: req.body.receivedDate
      //     };
      //       let sql = "INSERT INTO tbl_chargeback_disputes SET ?"
      //       let result = await mysqlcon(sql, [formData]);
      //       if(result.affectedRows){
      //         return res.status(200).json({ message: "Successfully" });
      //       }else{
      //         return res.status(403).json({ message: "Error While Insterting" });
      //       } 
      //   }else if(Object.keys(req.body).length >=6 && id){
      //     let formData = {
      //       user_id: req.body.merchantId,
      //       mer_name: req.body.merchantName,
      //       recieved_date: req.body.receivedDate,
      //       currency: req.body.Currency,
      //       bank_name:req.body.bankName,
      //       trx_type:req.body.TransactionType,
      //       trx_id:req.body.transactionid,
      //       customer_name:req.body.customer_name,
      //       amount:req.body.Amount,
      //       charges:req.body.Charges,
      //       reason:req.body.Reason,
      //       net_amount:req.body.NetAmount,
      //       auth:req.body.authorizer,
      //       status: 5,
      //       created_on: req.body.receivedDate,
      //       updated_on: req.body.receivedDate
      //     };
      //       let sql = "Update tbl_chargeback_disputes SET ? WHERE id = ?"
      //       let result = await mysqlcon(sql, [formData,id]);
      //       if(result.affectedRows){
      //         return res.status(200).json({ message: "Successfully Data Update" });
      //       }else{
      //         return res.status(403).json({ message: "Error While Insterting" });
      //       } 
      //   }
      // } catch (error) {
      //   console.log(error)
      //   res
      //     .status(500)
      //     .json({ message: "Sonthing Went Wrong in Bank Deposite", error });
      // }
    
      try {
        let sqlName = "SELECT name FROM tbl_user WHERE id = ?"
        let resultName = await mysqlcon(sqlName, [req.body.merchantId]);
        let formData = {
          user_id: req.body.merchantId,
          mer_name: resultName[0].name,
          recieved_date: dateTime,
          currency: req.body.disputeCurrency,
          bank_name:req.body.bank,
          mode:req.body.transactionType,
          transaction_id: req.body.disputeId,
          customer_name:req.body.cusName,
          amount:req.body.disputeAmount,
          charges:req.body.disputeCharges,
          reason:req.body.reason,
          net_amount:(req.body.disputeAmount && req.body.disputeCharges) ? (req.body.disputeAmount - req.body.disputeCharges) : req.body.disputeAmount,
          auth:req.user.email,
          status: 5,
          created_on: dateTime,
          updated_on: dateTime
        }

        let sql = "INSERT INTO tbl_chargeback_disputes SET ?"
        let result = await mysqlcon(sql, [formData]);
        if(result.affectedRows){
          let msql = "UPDATE tbl_merchant_transaction SET status = 5 WHERE order_no = ?"
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

  async updateDisputes(req, res){
    try {
      let {ID} = req.body
      let formData = {
        currency: req.body.currency,
        bank_name:req.body.bank,
        mode:req.body.type,
        reason:req.body.reason,
        updated_on: dateTime
      }
      let sql = "Update tbl_chargeback_disputes SET ? WHERE transaction_id = ?"
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

  // async DisputesChargebackCardData(req,res){
  //   try{
  //     const {date, from, to, searchItem} = req.body;

  //     let sqlDefault = "select SUM(tbl_chargeback_disputes.amount) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, SUM(tbl_chargeback_disputes.charges) AS DisputesChargebacksCharges from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id";
  //     let sqlDate = "select SUM(tbl_chargeback_disputes.amount) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, SUM(tbl_chargeback_disputes.charges) AS DisputesChargebacksCharges from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id WHERE DATE(tbl_chargeback_disputes.created_on) = ?";
  //     let sqlFromTo = "select SUM(tbl_chargeback_disputes.amount) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, SUM(tbl_chargeback_disputes.charges) AS DisputesChargebacksCharges from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id WHERE DATE(tbl_chargeback_disputes.created_on)  >= ? AND DATE(tbl_chargeback_disputes.created_on) <= ? "

  //     let searchSql = `SELECT SUM(tbl_chargeback_disputes.amount) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, SUM(tbl_chargeback_disputes.charges) AS DisputesChargebacksCharges from tbl_chargeback_disputes JOIN payment_gateway ON tbl_chargeback_disputes.bank_name = payment_gateway.id WHERE customer_name LIKE '%${searchItem}%'`

  //     let result = await mysqlcon(
  //         from && to
  //       ? sqlFromTo
  //       : date
  //       ? sqlDate
  //       : searchItem
  //       ? searchSql
  //       : sqlDefault,
  //       from && to ? [from, to]:
  //       date ? [date]
  //       : searchItem ? [searchItem]
  //       : "");
  //         let disputesChargebackAmount;
  //         let disputesChargebackTransaction;
  //         let disputesChargebackCharges;
  //         let disputesChargebacksResolved;
          
  //         if(result[0].DisputesChargebacksAmount === null){
  //           disputesChargebackAmount = 0
  //        } else{
  //         disputesChargebackAmount = result[0].DisputesChargebacksAmount.toFixed(2)
  //        }
    
  //        if(result[0].DisputesChargebacksTransaction === null){
  //         disputesChargebackTransaction = 0
  //        } else{
  //         disputesChargebackTransaction = result[0].DisputesChargebacksTransaction
  //        }
    
  //        if(result[0].DisputesChargebacksCharges === null){
  //         disputesChargebackCharges = 0
  //        } else{
  //         disputesChargebackCharges = result[0].DisputesChargebacksCharges.toFixed(2)
  //        }
    
  //       //  if(result[0].DisputesChargebacksResolved === null){
  //       //   disputesChargebacksResolved = 0
  //       //  } else{
  //       //   disputesChargebacksResolved = result[0].DisputesChargebacksResolved.toFixed(2)
  //       //  }
    
  //      if ((result[0].count) === 0) {
  //        return res.json(201, {
  //          data: [
  //            {
  //              name: "Disputes/Chargebacks Amount",
  //              amount: 0,
  //            },
  //            {
  //              name: "Disputes/Chargebacks Transaction Received",
  //              amount: 0,
  //            },
  //            {
  //              name: "Charges & Fees",
  //              amount: 0,
  //            },
  //           //  {
  //           //    name: "Total Disputes/Chargebacks Resolved",
  //           //    amount: 0
  //           //  },
  //          ],
  //        });
  //      } else {
  //        return res.json(200, {
  //          data: [
  //            {
  //              name: "Total Refund Transaction",
  //              amount: disputesChargebackTransaction
  //            },
  //            {
  //              name: "Total Refund Amount",
  //              amount: disputesChargebackAmount,
  //            },
  //            {
  //              name: "Charges & Fees",
  //              amount: disputesChargebackCharges,
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

  async getTrxData(req, res){
    try {
      let {transaction_id} = req.body;
      let sql = "SELECT tbl_chargeback_disputes.*, DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date FROM tbl_chargeback_disputes WHERE transaction_id = ?"
      let result = await mysqlcon(sql, [transaction_id]);
      res.status(200).json({
        result : result[0]
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  }

  async DisputesChargebackCardData(req,res){
    try{
      const {date, from, to,searchItem } = req.body;

      let sqlDefault = "select COALESCE(SUM(tbl_chargeback_disputes.amount),0) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, COALESCE(SUM(tbl_chargeback_disputes.charges),0) AS DisputesChargebacksCharges from tbl_chargeback_disputes ";
      
      let sqlDate = "select COALESCE(SUM(tbl_chargeback_disputes.amount),0) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, COALESCE(SUM(tbl_chargeback_disputes.charges),0) AS DisputesChargebacksCharges from tbl_chargeback_disputes WHERE DATE(tbl_chargeback_disputes.created_on) = ? ";

      let sqlFromTo = "select COALESCE(SUM(tbl_chargeback_disputes.amount),0) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, COALESCE(SUM(tbl_chargeback_disputes.charges),0) AS DisputesChargebacksCharges from tbl_chargeback_disputes WHERE DATE(tbl_chargeback_disputes.created_on)  >= ? AND DATE(tbl_chargeback_disputes.created_on) <= ?";
      
      let sqlSearch = `select COALESCE(SUM(tbl_chargeback_disputes.amount),0) AS DisputesChargebacksAmount, COUNT(tbl_chargeback_disputes.id) AS DisputesChargebacksTransaction, COALESCE(SUM(tbl_chargeback_disputes.charges),0) AS DisputesChargebacksCharges from tbl_chargeback_disputes WHERE tbl_chargeback_disputes.customer_name LIKE '%${searchItem}%' `;

      let result = await mysqlcon(
          from && to 
        ? sqlFromTo
        : date 
        ? sqlDate
        : searchItem
        ? sqlSearch
        : sqlDefault,
          from && to ? [from, to] :
          date && date ? [date] :
          searchItem ? [searchItem] :
          "");

          let disputesChargebackAmount = (result[0].DisputesChargebacksAmount) ;
          let disputesChargebackTransaction = (result[0].DisputesChargebacksTransaction) ;
          let disputesChargebackCharges = (result[0].DisputesChargebacksCharges) ;
          let disputesChargebacksResolved;
          
          if(result[0].DisputesChargebacksAmount === null){
            disputesChargebackAmount = 0
         } else{
          disputesChargebackAmount = disputesChargebackAmount.toFixed(2)
         }
   
         if(result[0].DisputesChargebacksTransaction === null){
          disputesChargebackTransaction = 0
         } else{
          disputesChargebackTransaction = disputesChargebackTransaction
         }
   
         if(result[0].DisputesChargebacksCharges === null){
          disputesChargebackCharges = 0
         } else{
          disputesChargebackCharges = disputesChargebackCharges.toFixed(2)
         }
   
        //  if(result[0].DisputesChargebacksResolved === null){
        //   disputesChargebacksResolved = 0
        //  } else{
        //   disputesChargebacksResolved = result[0].DisputesChargebacksResolved.toFixed(2)
        //  }
   
       if ((result[0].count) === 0) {
         return res.json(201, {
           data: [
             {
               name: "Total Transaction",
               amount: 0,
             },
             {
               name: "Total Amount",
               amount: 0,
             },
             {
               name: "Charges & Fees",
               amount: 0,
             },
            //  {
            //    name: "Total Disputes/Chargebacks Resolved",
            //    amount: 0
            //  },
           ],
         });
       } else {
         return res.json(200, {
           data: [
             {
               name: "Total Transaction",
               amount: disputesChargebackTransaction,
             },
             {
               name: "Total Amount",
               amount: disputesChargebackAmount
             },
             {
               name: "Charges & Fees",
               amount: disputesChargebackCharges,
             },
            //  {
            //    name: "Total Disputes/Chargebacks Resolved",
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
  
  async downloadDisputeChargeback(req,res) {
    try{
      const { from, to, date,searchItem } = req.body;

      let DefaultSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.status,tbl_merchant_transaction.payment_type AS mode,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=5"


      let FromToSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE Date(created_on) >= ? AND DATE(created_on) <= ? UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.status,tbl_merchant_transaction.payment_type AS mode,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=5 AND Date(tbl_merchant_transaction.created_on)>= ? AND Date(tbl_merchant_transaction.created_on)<= ?"


      let DateSql="Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE created_on=? UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.status,tbl_merchant_transaction.payment_type AS mode,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=5 AND Date(tbl_merchant_transaction.created_on) = ?"
      

      let SearchSql=`Select tbl_chargeback_disputes.user_id,tbl_chargeback_disputes.transaction_id,tbl_chargeback_disputes.mer_name,DATE_FORMAT(tbl_chargeback_disputes.recieved_date,'%Y-%m-%d %H:%i:%s') AS recieved_date,tbl_chargeback_disputes.currency,tbl_chargeback_disputes.amount,tbl_chargeback_disputes.charges, payment_gateway.gateway_name AS bank_name,tbl_chargeback_disputes.customer_name,tbl_chargeback_disputes.reason,tbl_chargeback_disputes.status,tbl_chargeback_disputes.mode,tbl_chargeback_disputes.auth,tbl_chargeback_disputes.net_amount,DATE_FORMAT(tbl_chargeback_disputes.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_chargeback_disputes.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on From tbl_chargeback_disputes LEFT JOIN payment_gateway ON payment_gateway.id = tbl_chargeback_disputes.bank_name WHERE customer_name LIKE '%${searchItem}%'  UNION ALL Select tbl_merchant_transaction.user_id,tbl_merchant_transaction.transaction_id,tbl_user.name AS mer_name,tbl_merchant_transaction.created_on AS received_date,tbl_merchant_transaction.ammount_type AS currency,tbl_merchant_transaction.ammount AS amount,tbl_merchant_transaction.payin_charges AS chatges,payment_gateway.gateway_name AS bank_name,tbl_merchant_transaction.i_flname AS customer_name,tbl_merchant_transaction.discription AS reason,tbl_merchant_transaction.status,tbl_merchant_transaction.payment_type AS mode,tbl_user.email AS auth,(tbl_merchant_transaction.ammount-tbl_merchant_transaction.payin_charges) AS net_amount,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on,DATE_FORMAT(tbl_merchant_transaction.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on from tbl_merchant_transaction LEFT JOIN payment_gateway ON payment_gateway.id=tbl_merchant_transaction.gatewayNumber LEFT JOIN tbl_user ON tbl_user.id=tbl_merchant_transaction.user_id Where tbl_merchant_transaction.status=5 AND tbl_merchant_transaction.i_flname LIKE '%${searchItem}%'`
  
      let result = await mysqlcon(
        (from && to) ? FromToSql :
          (date) ? DateSql :
          (searchItem)?SearchSql:
          DefaultSql,
        (from && to) ? [from,to,from,to] : (date) ? [date,date] :(searchItem)?[searchItem]: ''
      );

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("NO DATA");
      }
    }catch(error) {
      console.log(error)
      res.status(500).json(error);
    }  
  }

  async getDisputeDetails(req, res){
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

module.exports = new DisputesChargeback