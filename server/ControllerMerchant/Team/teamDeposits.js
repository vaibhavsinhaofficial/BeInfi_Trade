const mysqlcon = require("../../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

module.exports.teamDownloadapi=async(req,res)=> {
  var {from,to,date,methodPayment,status,currency,searchItem}=req.body;
  const {parent_id}=req.user;
  try {
    
      const defaultSql="SELECT * FROM tbl_merchant_transaction where user_id =?"
      const searchItemSql=`SELECT * FROM tbl_merchant_transaction where user_id =? AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND DATE(created_on)=?"
      const methodPaymentSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?)"
      const statusSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?)"
      const currencySql="SELECT * FROM tbl_merchant_transaction where user_id =? AND ammount_type IN (?)"
      const methodPaymentDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?) AND DATE(created_on)=?"
      const currencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) "
      const methodPaymentStatusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      let result=await mysqlcon(
      methodPayment && status && currency && from && to 
      ? methodPaymentStatusCurrencyFromToSql
      : methodPayment && status && currency && date
      ? methodPaymentStatusCurrencyDateSql
      : methodPayment && status && from && to
      ? methodPaymentStatusFromToSql
      : methodPayment && currency && from && to
      ? methodPaymentCurrencyFromToSql
      : status && currency && from && to
      ? statusCurrencyFromToSql
      : methodPayment && status && date
      ? methodPaymentStatusDateSql
      : methodPayment && currency && date
      ? methodPaymentCurrencyDateSql
      : status && currency && date
      ? statusCurrencyDateSql
      : methodPayment && from && to
      ? methodPaymentFromToSql
      : status && from && to
      ? statusFromToSql
      : currency && from && to
      ? currencyFromToSql
      : methodPayment && status && currency
      ? methodPaymentStatusCurrencySql
      : status && currency
      ? statusCurrencySql
      : methodPayment && currency
      ? methodPaymentCurrencySql
      : methodPayment && status
      ? methodPaymentStatusSql
      : methodPayment && date
      ? methodPaymentDateSql
      : status && date
      ? statusDateSql
      : currency && date
      ? currencyDateSql
      : from && to
      ? fromToSql
      : methodPayment
      ? methodPaymentSql
      : status
      ? statusSql
      : currency
      ? currencySql
      : date
      ? dateSql
      : searchItem
      ? searchItemSql
      : defaultSql,
      methodPayment && status && currency && from && to ? [parent_id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [parent_id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [parent_id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [parent_id,methodPayment,currency,from,to] : status && currency && from && to ? [parent_id,status,currency,from,to] : methodPayment && status && date ? [parent_id,methodPayment,status,date] : methodPayment && currency && date ? [parent_id,methodPayment,currency,date] : status && currency && date ? [parent_id,status,currency,date] : methodPayment && from && to ? [parent_id,methodPayment,from,to] :  status && from && to ? [parent_id,status,from,to] : currency && from && to ? [parent_id,currency,from,to] : methodPayment && status && currency ? [parent_id,methodPayment,status,currency] : status && currency ? [parent_id,status,currency] : methodPayment && currency ? [parent_id,methodPayment,currency] : methodPayment && status ? [parent_id,methodPayment,status] : methodPayment && date ? [parent_id,methodPayment,date] : status && date ? [parent_id,status,date] : currency && date ? [parent_id,currency,date] : from && to ? [parent_id,from,to] : methodPayment ? [parent_id,methodPayment] : status ? [parent_id,status] : currency ? [parent_id,currency] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`]: [parent_id]
      )
      res.send(result)
  } catch(error) {
    return res.status(201).json(
      { error : error }
    )
  }
}

module.exports.teamStatusResult=async(req,res)=> {
  const {parent_id} = req.user;
  try {
    let {from,to,date,methodPayment,currency,searchItem}=req.body;
      let totalDefaultSql =
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? ";
      const totalSearchItemSql=
      `SELECT COUNT(status) as count FROM tbl_merchant_transaction WHERE user_id=?  AND (order_no LIKE ? OR i_flname LIKE ?)`
      let totalFromToSql =
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND DATE(created_on)>=? AND DATE(created_on)<=?";
      let totalDateSql =
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=?  AND DATE(created_on)=?";
      let totalMethodPaymentSql = 
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND payment_type IN (?)";
      let totalCurrencySql = 
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND ammount_type IN (?)";
      let totalCurrencyMethodPaymentSql = 
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND ammount_type IN (?) AND payment_type IN (?)";

      

    let result = await mysqlcon(
      from && to
      ? totalFromToSql
      : currency && methodPayment
      ? totalCurrencyMethodPaymentSql
      : currency
      ? totalCurrencySql
      : date
      ? totalDateSql
      : searchItem
      ? totalSearchItemSql
      : methodPayment
      ? totalMethodPaymentSql
      : totalDefaultSql,
    
        
      from && to ? [parent_id,from,to] : currency && methodPayment ? [parent_id,currency,methodPayment] : currency ? [parent_id,currency] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`]: methodPayment ? [parent_id,methodPayment] : [parent_id]
      );

    let totalCount = result[0].count;
    let defaultFailureSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0";
    let defaultSucessSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1";
    let defaultPendingWaitingSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3)";
    let defaultRefundChargebackSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5)";


    let fromToFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND created_on>=? AND created_on<=?";

    let fromToSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND created_on>=? AND created_on<=?";

    let fromToPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND created_on>=? AND created_on<=?";

    let fromToRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND created_on>=? AND created_on<=?";


    let dateFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND created_on>=?";

    let dateSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND created_on>=?";

    let datePendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND created_on>=?";

    let dateRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND created_on>=?";

    let methodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND payment_type IN (?)";

    let methodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND payment_type IN (?)";

    let methodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND payment_type IN (?)";

    let methodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND payment_type IN (?)";

    let currencyFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND ammount_type IN (?)";

    let currencySuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND ammount_type IN (?)";

    let currencyPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?)";

    let currencyRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?)";

    let currencyMethodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?) AND payment_type IN (?)";

    let searchItemFailureSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=0 AND (order_no LIKE ? OR i_flname LIKE ?) `

    let searchItemSucessSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=1 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemPendingSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=4 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemChargebackSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=5 AND (order_no LIKE ? OR i_flname LIKE ?)`;


    let statusResult0 = await mysqlcon(
      from && to
    ? fromToFailureSql
    : currency && methodPayment
    ? currencyMethodPaymentFailureSql
    : currency
    ? currencyFailureSql
    : methodPayment
    ? methodPaymentFailureSql
    : date 
    ? dateFailureSql
    : searchItem
    ? searchItemFailureSql
    : defaultFailureSql,

    from && to ? [parent_id,from,to] : currency && methodPayment ? [parent_id,currency,methodPayment] : currency ? [parent_id,currency] : methodPayment ? [parent_id,methodPayment] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`] : [parent_id]
    );
    let statusResult1 = await mysqlcon(
      from && to
      ? fromToSucessSql
      : currency && methodPayment
      ? currencyMethodPaymentSuccessSql
      : currency
      ? currencySuccessSql
      : methodPayment
      ? methodPaymentSuccessSql
      : date 
      ? dateSucessSql
      : searchItem
      ? searchItemSucessSql
      : defaultSucessSql,
  
      from && to ? [parent_id,from,to] : currency && methodPayment ? [parent_id,currency,methodPayment] : currency ? [parent_id,currency] : methodPayment ? [parent_id,methodPayment] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`] : [parent_id]
    );
    let statusResult4 = await mysqlcon(      
      from && to
      ? fromToPendingWaitingSql
      : currency && methodPayment
      ? currencyMethodPaymentPendingWaitingSql
      : currency
      ? currencyPendingWaitingSql
      : methodPayment
      ? methodPaymentPendingWaitingSql
      : date 
      ? datePendingWaitingSql
      : searchItem
      ? searchItemPendingSql
      : defaultPendingWaitingSql,
  
      from && to ? [parent_id,from,to] : currency && methodPayment ? [parent_id,currency,methodPayment] : currency ? [parent_id,currency] : methodPayment ? [parent_id,methodPayment] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`] : [parent_id]
      );
    let statusResult5 = await mysqlcon(      
      from && to
      ? fromToRefundChargebackSql
      : currency && methodPayment
      ? currencyMethodPaymentRefundChargebackSql
      : currency
      ? currencyRefundChargebackSql
      : methodPayment
      ? methodPaymentRefundChargebackSql
      : date 
      ? dateRefundChargebackSql
      : searchItem
      ? searchItemChargebackSql
      : defaultRefundChargebackSql,
  
      from && to ? [parent_id,from,to] : currency && methodPayment ? [parent_id,currency,methodPayment] : currency ? [parent_id,currency] : methodPayment ? [parent_id,methodPayment] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`] : [parent_id]
      );

    let declinedCount = statusResult0[0].count;
    let successCount = statusResult1[0].count;
    let refundCount = statusResult4[0].count;
    let chargebackCount = statusResult5[0].count;

      let percentageD = ((declinedCount / totalCount) * 100).toFixed(2) ;
      let percentageS = ((successCount / totalCount) * 100).toFixed(2);
      let percentageR = ((refundCount / totalCount) * 100).toFixed(2);
      let percentageC = ((chargebackCount / totalCount) * 100).toFixed(2);




    if (totalCount === 0) {
      return res.json(201, {
        message: `User has no transaction`,
        data: [
          {
            name: "Declined",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Success",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Refund",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Chargeback",
            percentage: 0,
            amount: 0,
          },
        ],
      });
    } else {
      return res.json(200, {
        message: `All Status Data`,
        data: [
          {
            name: "Declined",
            percentage: percentageD,
            amount: statusResult0[0].ammount,
          },
          {
            name: "Success",
            percentage: percentageS,
            amount: statusResult1[0].ammount,
          },
          {
            name: "Pending/Waiting",
            percentage: percentageR,
            amount: statusResult4[0].ammount,
          },
          {
            name: "Refund/Chargeback",
            percentage: percentageC,
            amount: statusResult5[0].ammount,
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
};

module.exports.teamSearchDateFilter=async(req,res)=>{
  var {from,to,date,methodPayment,status,currency,searchItem}=req.body;
  try {
      const {parent_id}=req.user;
      const defaultCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=?"
      const searchItemCountSql=`SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND DATE(created_on)=?"
      const methodPaymentCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?)"
      const statusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND status IN (?)"
      const currencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND ammount_type IN (?)"
      const methodPaymentDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND status IN (?) AND DATE(created_on)=?"
      const currencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      let totalCountResult=await mysqlcon(
      methodPayment && status && currency && from && to 
      ? methodPaymentStatusCurrencyFromToCountSql
      : methodPayment && status && currency && date
      ? methodPaymentStatusCurrencyDateCountSql
      : methodPayment && status && from && to
      ? methodPaymentStatusFromToCountSql
      : methodPayment && currency && from && to
      ? methodPaymentCurrencyFromToCountSql
      : status && currency && from && to
      ? statusCurrencyFromToCountSql
      : methodPayment && status && date
      ? methodPaymentStatusDateCountSql
      : methodPayment && currency && date
      ? methodPaymentCurrencyDateCountSql
      : status && currency && date
      ? statusCurrencyDateCountSql
      : methodPayment && from && to
      ? methodPaymentFromToCountSql
      : status && from && to
      ? statusFromToCountSql
      : currency && from && to
      ? currencyFromToCountSql
      : methodPayment && status && currency
      ? methodPaymentStatusCurrencyCountSql
      : status && currency
      ? statusCurrencyCountSql
      : methodPayment && currency
      ? methodPaymentCurrencyCountSql
      : methodPayment && status
      ? methodPaymentStatusCountSql
      : methodPayment && date
      ? methodPaymentDateCountSql
      : status && date
      ? statusDateCountSql
      : currency && date
      ? currencyDateCountSql
      : from && to
      ? fromToCountSql
      : methodPayment
      ? methodPaymentCountSql
      : status
      ? statusCountSql
      : currency
      ? currencyCountSql
      : date
      ? dateCountSql
      : searchItem
      ? searchItemCountSql
      : defaultCountSql,
      methodPayment && status && currency && from && to ? [parent_id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [parent_id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [parent_id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [parent_id,methodPayment,currency,from,to] : status && currency && from && to ? [parent_id,status,currency,from,to] : methodPayment && status && date ? [parent_id,methodPayment,status,date] : methodPayment && currency && date ? [parent_id,methodPayment,currency,date] : status && currency && date ? [parent_id,status,currency,date] : methodPayment && from && to ? [parent_id,methodPayment,from,to] :  status && from && to ? [parent_id,status,from,to] : currency && from && to ? [parent_id,currency,from,to] : methodPayment && status && currency ? [parent_id,methodPayment,status,currency] : status && currency ? [parent_id,status,currency] : methodPayment && currency ? [parent_id,methodPayment,currency] : methodPayment && status ? [parent_id,methodPayment,status] : methodPayment && date ? [parent_id,methodPayment,date] : status && date ? [parent_id,status,date] : currency && date ? [parent_id,currency,date] : from && to ? [parent_id,from,to] : methodPayment ? [parent_id,methodPayment] : status ? [parent_id,status] : currency ? [parent_id,currency] : date ? [parent_id,date] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`] : [parent_id]
      )
      const total=totalCountResult[0].Total;
      let Page = req.body.page ? Number(req.body.page) : 1;
      let page = pagination(total, Page);
      const defaultSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? ORDER BY created_on DESC LIMIT ?,?"
      const searchItemSql=`SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND (order_no LIKE ? OR i_flname LIKE ?) ORDER BY created_on DESC LIMIT ?,?`
      const fromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const dateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const currencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?)  ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id =? AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      let totalResult=await mysqlcon(
      methodPayment && status && currency && from && to 
      ? methodPaymentStatusCurrencyFromToSql
      : methodPayment && status && currency && date
      ? methodPaymentStatusCurrencyDateSql
      : methodPayment && status && from && to
      ? methodPaymentStatusFromToSql
      : methodPayment && currency && from && to
      ? methodPaymentCurrencyFromToSql
      : status && currency && from && to
      ? statusCurrencyFromToSql
      : methodPayment && status && date
      ? methodPaymentStatusDateSql
      : methodPayment && currency && date
      ? methodPaymentCurrencyDateSql
      : status && currency && date
      ? statusCurrencyDateSql
      : methodPayment && from && to
      ? methodPaymentFromToSql
      : status && from && to
      ? statusFromToSql
      : currency && from && to
      ? currencyFromToSql
      : methodPayment && status && currency
      ? methodPaymentStatusCurrencySql
      : status && currency
      ? statusCurrencySql
      : methodPayment && currency
      ? methodPaymentCurrencySql
      : methodPayment && status
      ? methodPaymentStatusSql
      : methodPayment && date
      ? methodPaymentDateSql
      : status && date
      ? statusDateSql
      : currency && date
      ? currencyDateSql
      : from && to
      ? fromToSql
      : methodPayment
      ? methodPaymentSql
      : status
      ? statusSql
      : currency
      ? currencySql
      : date
      ? dateSql
      : searchItem
      ? searchItemSql
      : defaultSql,
      methodPayment && status && currency && from && to ? [parent_id,methodPayment,status,currency,from,to,page.start,page.limit] : methodPayment && status && currency && date ? [parent_id,methodPayment,status,currency,date,page.start,page.limit] : methodPayment && status && from && to ? [parent_id,methodPayment,status,from,to,page.start,page.limit] : methodPayment && currency && from && to ? [parent_id,methodPayment,currency,from,to,page.start,page.limit] : status && currency && from && to ? [parent_id,status,currency,from,to,page.start,page.limit] : methodPayment && status && date ? [parent_id,methodPayment,status,date,page.start,page.limit] : methodPayment && currency && date ? [parent_id,methodPayment,currency,date,page.start,page.limit] : status && currency && date ? [parent_id,status,currency,date,page.start,page.limit] : methodPayment && from && to ? [parent_id,methodPayment,from,to,page.start,page.limit] :  status && from && to ? [parent_id,status,from,to,page.start,page.limit] : currency && from && to ? [parent_id,currency,from,to,page.start,page.limit] : methodPayment && status && currency ? [parent_id,methodPayment,status,currency,page.start,page.limit] : status && currency ? [parent_id,status,currency,page.start,page.limit] : methodPayment && currency ? [parent_id,methodPayment,currency,page.start,page.limit] : methodPayment && status ? [parent_id,methodPayment,status,page.start,page.limit] : methodPayment && date ? [parent_id,methodPayment,date,page.start,page.limit] : status && date ? [parent_id,status,date,page.start,page.limit] : currency && date ? [parent_id,currency,date,page.start,page.limit] : from && to ? [parent_id,from,to,page.start,page.limit] : methodPayment ? [parent_id,methodPayment,page.start,page.limit] : status ? [parent_id,status,page.start,page.limit] : currency ? [parent_id,currency,page.start,page.limit] : date ? [parent_id,date,page.start,page.limit] : searchItem ? [parent_id,`%${searchItem}%`,`%${searchItem}%`,page.start,page.limit]: [parent_id,page.start,page.limit])
      let startRange = page.start + 1;
      let endRange = page.start + totalResult.length;
      return res.json(200, {
        data: {
          message: totalResult.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
          currentPage: Page,
          totalPages: page.numOfPages > 0 ? page.numOfPages : 1,
          deposits: totalResult,
        },
      
      });
  } catch(error) {
    console.log(error);
    return res.status(201).json(
      {
        error : error
      }
    )
  }
}

module.exports.teamMerchantChoosedCurrency = async function(req, res) {
  try {
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [req.user.parent_id]);
    const curr = [];

    if (testResult.length > 0) {
      const countryList = testResult[0].solution_apply_for_country.split(',');
      for (const country of countryList) {
          const test1 = "SELECT sortname FROM countries WHERE id = ? ORDER BY name";
          const test1Result = await mysqlcon(test1, [country]);
          curr.push(test1Result[0].sortname);
      }
    }
    return res.json(200, {
      data: curr
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}