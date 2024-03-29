const mysqlcon = require("../../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

module.exports.downloadSandboxDepositsapi=async(req,res)=> {
  var {merchantSelect,from,to,date,methodPayment,status,currency,searchItem}=req.body;
  
  try {
    if(merchantSelect) {
      let id= merchantSelect.split(',');
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
      const defaultSql="SELECT SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?)"
      const searchItemSql=`SELECT SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND DATE(created_on)=?"
      const methodPaymentSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?)"
      const statusSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?)"
      const currencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?)"
      const methodPaymentDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND DATE(created_on)=?"
      const currencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) "
      const methodPaymentStatusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to] : status && currency && from && to ? [id,status,currency,from,to] : methodPayment && status && date ? [id,methodPayment,status,date] : methodPayment && currency && date ? [id,methodPayment,currency,date] : status && currency && date ? [id,status,currency,date] : methodPayment && from && to ? [id,methodPayment,from,to] :  status && from && to ? [id,status,from,to] : currency && from && to ? [id,currency,from,to] : methodPayment && status && currency ? [id,methodPayment,status,currency] : status && currency ? [id,status,currency] : methodPayment && currency ? [id,methodPayment,currency] : methodPayment && status ? [id,methodPayment,status] : methodPayment && date ? [id,methodPayment,date] : status && date ? [id,status,date] : currency && date ? [id,currency,date] : from && to ? [id,from,to] : methodPayment ? [id,methodPayment] : status ? [id,status] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`]: [id] )
      res.send(result)
    } else  {
      const id=req.user.id;
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
    
      const defaultSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =?"
      const searchItemSql=`SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND DATE(created_on)=?"
      const methodPaymentSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?)"
      const statusSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?)"
      const currencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND ammount_type IN (?)"
      const methodPaymentDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?) AND DATE(created_on)=?"
      const currencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencySql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) "
      const methodPaymentStatusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction_sandbox where user_id =? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to] : status && currency && from && to ? [id,status,currency,from,to] : methodPayment && status && date ? [id,methodPayment,status,date] : methodPayment && currency && date ? [id,methodPayment,currency,date] : status && currency && date ? [id,status,currency,date] : methodPayment && from && to ? [id,methodPayment,from,to] :  status && from && to ? [id,status,from,to] : currency && from && to ? [id,currency,from,to] : methodPayment && status && currency ? [id,methodPayment,status,currency] : status && currency ? [id,status,currency] : methodPayment && currency ? [id,methodPayment,currency] : methodPayment && status ? [id,methodPayment,status] : methodPayment && date ? [id,methodPayment,date] : status && date ? [id,status,date] : currency && date ? [id,currency,date] : from && to ? [id,from,to] : methodPayment ? [id,methodPayment] : status ? [id,status] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`]: [id]
      )
      res.send(result)
    }
  } catch(error) {
    return res.status(201).json(
      { error : error }
    )
  }
}

module.exports.statusSandboxDepositsResult=async(req,res)=> {
  let user=req.user;
  let {merchantSelect} = req.body;
  
  try {
    let {from,to,date,methodPayment,currency,searchItem}=req.body;
    if(merchantSelect){
      const id=merchantSelect.split(',');

      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      currency= currency ? currency[0].split(',') : "";
      let totalDefaultSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) ";
      const totalSearchItemSql=
      `SELECT COUNT(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
      let totalFromToSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?";
      let totalDateSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?)  AND DATE(created_on)=?";
      let totalMethodPaymentSql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND payment_type IN (?)";
      let totalCurrencySql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND ammount_type IN (?)";
      let totalCurrencyMethodPaymentSql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND ammount_type IN (?) AND payment_type IN (?)";

      

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
    
        
      from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`]: methodPayment ? [id,methodPayment] : [id]
      );

    let totalCount = result[0].count;

    let defaultFailureSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0";
    let defaultSucessSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1";
    let defaultPendingWaitingSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3)";
    let defaultRefundChargebackSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5)";


    let fromToFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0 AND created_on>=? AND created_on<=?";

    let fromToSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1 AND created_on>=? AND created_on<=?";

    let fromToPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3) AND created_on>=? AND created_on<=?";

    let fromToRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5) AND created_on>=? AND created_on<=?";


    let dateFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0 AND created_on>=?";

    let dateSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1 AND created_on>=?";

    let datePendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3) AND created_on>=?";

    let dateRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5) AND created_on>=?";

    let methodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0 AND payment_type IN (?)";

    let methodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1 AND payment_type IN (?)";

    let methodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3) AND payment_type IN (?)";

    let methodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5) AND payment_type IN (?)";

    let currencyFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0 AND ammount_type IN (?)";

    let currencySuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1 AND ammount_type IN (?)";

    let currencyPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3) AND ammount_type IN (?)";

    let currencyRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5) AND ammount_type IN (?)";

    let currencyMethodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=0 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND status=1 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=2 OR status=3) AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN (?) AND (status=4 OR status=5) AND ammount_type IN (?) AND payment_type IN (?)";

    let searchItemFailureSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN ? AND status=0 AND (order_no LIKE ? OR i_flname LIKE ?) `

    let searchItemSucessSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN ? AND status=1 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemPendingWaitingSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN ? AND status=4 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemRefundChargebackSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id IN ? AND status=5 AND (order_no LIKE ? OR i_flname LIKE ?)`;


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

    from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
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
  
      from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
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
      ? searchItemPendingWaitingSql
      : defaultPendingWaitingSql,
  
      from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
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
      ? searchItemRefundChargebackSql
      : defaultRefundChargebackSql,
  
      from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
      );
    let declinedCount = statusResult0[0].count;
    let successCount = statusResult1[0].count;
    let refundCount = statusResult4[0].count;
    let chargebackCount = statusResult5[0].count;


      let percentageD = await Math.round((declinedCount / totalCount) * 100) ;
      let percentageS = await Math.round((successCount / totalCount) * 100);
      let percentageR = await Math.round((refundCount / totalCount) * 100);
      let percentageC = await Math.round((chargebackCount / totalCount) * 100);




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
    } else {
      // console.log(req.body)
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      currency= currency ? currency[0].split(',') : "";
      let totalDefaultSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=? ";
      const totalSearchItemSql=
      `SELECT COUNT(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=?  AND (order_no LIKE ? OR i_flname LIKE ?)`
      let totalFromToSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND DATE(created_on)>=? AND DATE(created_on)<=?";
      let totalDateSql =
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=?  AND DATE(created_on)=?";
      let totalMethodPaymentSql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND payment_type IN (?)";
      let totalCurrencySql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND ammount_type IN (?)";
      let totalCurrencyMethodPaymentSql = 
      "SELECT count(status) as count FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND ammount_type IN (?) AND payment_type IN (?)";

      

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
    
        
      from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`]: methodPayment ? [user.id,methodPayment] : [user.id]
      );

    let totalCount = result[0].count;

    let defaultFailureSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0";
    let defaultSucessSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1";
    let defaultPendingWaitingSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3)";
    let defaultRefundChargebackSql =
      "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5)";


    let fromToFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0 AND created_on>=? AND created_on<=?";

    let fromToSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1 AND created_on>=? AND created_on<=?";

    let fromToPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3) AND created_on>=? AND created_on<=?";

    let fromToRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5) AND created_on>=? AND created_on<=?";


    let dateFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0 AND created_on>=?";

    let dateSucessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1 AND created_on>=?";

    let datePendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3) AND created_on>=?";

    let dateRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5) AND created_on>=?";

    let methodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0 AND payment_type IN (?)";

    let methodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1 AND payment_type IN (?)";

    let methodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3) AND payment_type IN (?)";

    let methodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5) AND payment_type IN (?)";

    let currencyFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0 AND ammount_type IN (?)";

    let currencySuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1 AND ammount_type IN (?)";

    let currencyPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?)";

    let currencyRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?)";

    let currencyMethodPaymentFailureSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=0 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentSuccessSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND status=1 AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentPendingWaitingSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?) AND payment_type IN (?)";

    let currencyMethodPaymentRefundChargebackSql =
    "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?) AND payment_type IN (?)";

    let searchItemFailureSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id = ? AND status=0 AND (order_no LIKE ? OR i_flname LIKE ?) `

    let searchItemSucessSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id = ? AND status=1 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemPendingSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id = ? AND status=4 AND (order_no LIKE ? OR i_flname LIKE ?)`;

    let searchItemChargebackSql =
    `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM  tbl_merchant_transaction_sandbox WHERE user_id = ? AND status=5 AND (order_no LIKE ? OR i_flname LIKE ?)`;


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

    from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
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
  
      from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
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
  
      from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
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
  
      from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
      );
    let declinedCount = statusResult0[0].count;
    let successCount = statusResult1[0].count;
    let refundCount = statusResult4[0].count;
    let chargebackCount = statusResult5[0].count;


      let percentageD = await Math.round((declinedCount / totalCount) * 100) ;
      let percentageS = await Math.round((successCount / totalCount) * 100);
      let percentageR = await Math.round((refundCount / totalCount) * 100);
      let percentageC = await Math.round((chargebackCount / totalCount) * 100);




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
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occured",
      error: error,
    });
  }
};

module.exports.searchSandboxDepositsDateFilter=async(req,res)=> {
  var {merchantSelect,from,to,date,methodPayment,status,currency,searchItem}=req.body;
  try {
    if(merchantSelect){
      let id= merchantSelect.split(',');
      
    
        const defaultCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?)"
        const searchItemCountSql=`SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
        const fromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const dateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND DATE(created_on)=?"
        const methodPaymentCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?)"
        const statusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?)"
        const currencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?)"
        const methodPaymentDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)=?"
        const statusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND DATE(created_on)=?"
        const currencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
        const methodPaymentFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const statusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const currencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const methodPaymentStatusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?)"
        const methodPaymentCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?)"
        const statusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?)"
        const methodPaymentStatusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const methodPaymentCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const statusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
        const methodPaymentStatusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
        const methodPaymentCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
        const statusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
        const methodPaymentStatusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?)"
        const methodPaymentStatusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
        const methodPaymentStatusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to] : status && currency && from && to ? [id,status,currency,from,to] : methodPayment && status && date ? [id,methodPayment,status,date] : methodPayment && currency && date ? [id,methodPayment,currency,date] : status && currency && date ? [id,status,currency,date] : methodPayment && from && to ? [id,methodPayment,from,to] :  status && from && to ? [id,status,from,to] : currency && from && to ? [id,currency,from,to] : methodPayment && status && currency ? [id,methodPayment,status,currency]: status && currency ? [id,status,currency] : methodPayment && currency ? [id,methodPayment,currency] : methodPayment && status ? [id,methodPayment,status] : methodPayment && date ? [id,methodPayment,date] : status && date ? [id,status,date] : currency && date ? [id,currency,date] : from && to ? [id,from,to] : methodPayment ? [id,methodPayment] : status ? [id,status] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
      )
      const total=totalCountResult[0].Total;
      let Page = req.body.page ? Number(req.body.page) : 1;
      let page = pagination(total, Page);
      const defaultSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const searchItemSql=`SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?) ORDER BY created_on DESC LIMIT ?,?`
      const fromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const dateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const currencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id IN (?) AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
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
      ? methodPaymentStatusCurrencyCountSql
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to,page.start,page.limit] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date,page.start,page.limit] : methodPayment && status && from && to ? [id,methodPayment,status,from,to,page.start,page.limit] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to,page.start,page.limit] : status && currency && from && to ? [id,status,currency,from,to,page.start,page.limit] : methodPayment && status && date ? [id,methodPayment,status,date,page.start,page.limit] : methodPayment && currency && date ? [id,methodPayment,currency,date,page.start,page.limit] : status && currency && date ? [id,status,currency,date,page.start,page.limit] : methodPayment && from && to ? [id,methodPayment,from,to,page.start,page.limit] :  status && from && to ? [id,status,from,to,page.start,page.limit] : currency && from && to ? [id,currency,from,to,page.start,page.limit] : status && currency ? [id,status,currency,page.start,page.limit] : methodPayment && currency ? [id,methodPayment,currency,page.start,page.limit] : methodPayment && status ? [id,methodPayment,status,page.start,page.limit] : methodPayment && date ? [id,methodPayment,date,page.start,page.limit] : status && date ? [id,status,date,page.start,page.limit] : currency && date ? [id,currency,date,page.start,page.limit] : from && to ? [id,from,to,page.start,page.limit] : methodPayment ? [id,methodPayment,page.start,page.limit] : status ? [id,status,page.start,page.limit] : currency ? [id,currency,page.start,page.limit] : date ? [id,date,page.start,page.limit] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`,page.start,page.limit]: [id,page.start,page.limit]
      )
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

    } else {
      const id=req.user.id;
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
      
      const defaultCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=?"
      const searchItemCountSql=`SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND DATE(created_on)=?"
      const methodPaymentCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?)"
      const statusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?)"
      const currencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND ammount_type IN (?)"
      const methodPaymentDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?) AND DATE(created_on)=?"
      const currencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction_sandbox where user_id=? AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to] : status && currency && from && to ? [id,status,currency,from,to] : methodPayment && status && date ? [id,methodPayment,status,date] : methodPayment && currency && date ? [id,methodPayment,currency,date] : status && currency && date ? [id,status,currency,date] : methodPayment && from && to ? [id,methodPayment,from,to] :  status && from && to ? [id,status,from,to] : currency && from && to ? [id,currency,from,to] : methodPayment && status && currency ? [id,methodPayment,status,currency] : status && currency ? [id,status,currency] : methodPayment && currency ? [id,methodPayment,currency] : methodPayment && status ? [id,methodPayment,status] : methodPayment && date ? [id,methodPayment,date] : status && date ? [id,status,date] : currency && date ? [id,currency,date] : from && to ? [id,from,to] : methodPayment ? [id,methodPayment] : status ? [id,status] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
      )
      const total=totalCountResult[0].Total;
      let Page = req.body.page ? Number(req.body.page) : 1;
      let page = pagination(total, Page);
      const defaultSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? ORDER BY created_on DESC LIMIT ?,?"
      const searchItemSql=`SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND (order_no LIKE ? OR i_flname LIKE ?) ORDER BY created_on DESC LIMIT ?,?`
      const fromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const dateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const currencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?)  ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction_sandbox.* ,DATE_FORMAT(tbl_merchant_transaction_sandbox.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction_sandbox INNER JOIN tbl_user ON tbl_merchant_transaction_sandbox.user_id = tbl_user.id where tbl_merchant_transaction_sandbox.user_id =? AND tbl_merchant_transaction_sandbox.payment_type IN (?) AND tbl_merchant_transaction_sandbox.status IN (?) AND tbl_merchant_transaction_sandbox.ammount_type IN (?) AND DATE(tbl_merchant_transaction_sandbox.created_on)>=? AND DATE(tbl_merchant_transaction_sandbox.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to,page.start,page.limit] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date,page.start,page.limit] : methodPayment && status && from && to ? [id,methodPayment,status,from,to,page.start,page.limit] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to,page.start,page.limit] : status && currency && from && to ? [id,status,currency,from,to,page.start,page.limit] : methodPayment && status && date ? [id,methodPayment,status,date,page.start,page.limit] : methodPayment && currency && date ? [id,methodPayment,currency,date,page.start,page.limit] : status && currency && date ? [id,status,currency,date,page.start,page.limit] : methodPayment && from && to ? [id,methodPayment,from,to,page.start,page.limit] :  status && from && to ? [id,status,from,to,page.start,page.limit] : currency && from && to ? [id,currency,from,to,page.start,page.limit] : methodPayment && status && currency ? [id,methodPayment,status,currency,page.start,page.limit] : status && currency ? [id,status,currency,page.start,page.limit] : methodPayment && currency ? [id,methodPayment,currency,page.start,page.limit] : methodPayment && status ? [id,methodPayment,status,page.start,page.limit] : methodPayment && date ? [id,methodPayment,date,page.start,page.limit] : status && date ? [id,status,date,page.start,page.limit] : currency && date ? [id,currency,date,page.start,page.limit] : from && to ? [id,from,to,page.start,page.limit] : methodPayment ? [id,methodPayment,page.start,page.limit] : status ? [id,status,page.start,page.limit] : currency ? [id,currency,page.start,page.limit] : date ? [id,date,page.start,page.limit] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`,page.start,page.limit]: [id,page.start,page.limit]
      )
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
  }
} catch(error) {
    return res.status(201).json(
      { error : error }
    )
  }
}
