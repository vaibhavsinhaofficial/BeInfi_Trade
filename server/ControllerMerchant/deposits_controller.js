const mysqlcon = require("../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

module.exports.downloadapi=async(req,res)=> {
  var {merchantSelect,from,to,date,methodPayment,status,currency,searchItem}=req.body;

  try {
    if(merchantSelect) {
      let id= merchantSelect.split(',');
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
      const defaultSql="SELECT SELECT * FROM tbl_merchant_transaction where user_id IN (?)"
      const searchItemSql=`SELECT SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND DATE(created_on)=?"
      const methodPaymentSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?)"
      const statusSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?)"
      const currencySql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?)"
      const methodPaymentDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND DATE(created_on)=?"
      const currencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencySql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) "
      const methodPaymentStatusCurrencyDateSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToSql="SELECT * FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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

// module.exports.statusResult = async function (req, res) {
//   let user = req.user;
//   let { id } = req.body;
//   console.log(req.body.orderNumber)

//   try {
    
//     let whereClause = "user_id = ?";
//     let params = [user.id];

//     if (id) {
//       whereClause = "user_id IN (?)";
//       params = [id];
//     } else if(req.body.methodPayment && req.body.currency){
//       const curArray = req.body.currency.split(',');
//       const methArray = req.body.methodPayment.split(',');
//       whereClause += " AND payment_type IN (?) AND ammount_type IN(?)";
//       params.push(methArray,curArray);
//     } else if (req.body.currency) {
//       const currencyArray = req.body.currency.split(',');
//       whereClause += " AND ammount_type IN (?)";
//       params.push(currencyArray);
//     } else if (req.body.methodPayment) {
//       const methodArray = req.body.methodPayment.split(',');
//       whereClause += " AND payment_type IN (?)";
//       params.push(methodArray);
//     } else if (req.body.orderNumber) {
//       // const methodArray = req.body.methodPayment.split(',');
//       whereClause += " AND order_no LIKE ?";
//       params.push(req.body.orderNumber);
//     } else {
//       whereClause = "user_id = ?";
//       params = [user.id];
//     }

//     let sql = "SELECT count(status) as count FROM tbl_merchant_transaction WHERE " + whereClause;

//     let result = await mysqlcon(sql, params);

//     let totalCount = result[0].count;

//     let sql0 = "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE " + whereClause + " AND status=0";
//     let sql1 = "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE " + whereClause + " AND status=1";
//     let sql4 = "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE " + whereClause + " AND (status = 4 OR status = 5)";
//     let sql5 = "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE " + whereClause + " AND (status = 2 OR status = 3)";

//     let statusResult0 = await mysqlcon(sql0, params);
//     let statusResult1 = await mysqlcon(sql1, params);
//     let statusResult4 = await mysqlcon(sql4, params);
//     let statusResult5 = await mysqlcon(sql5, params);

//     let declinedCount = statusResult0[0].count;
//     let successCount = statusResult1[0].count;
//     let refundChargebackCount = statusResult4[0].count;
//     let waitingPendingCount = statusResult5[0].count;

//     let percentageD = ((declinedCount / totalCount) * 100).toFixed(2);
//     let percentageS = ((successCount / totalCount) * 100).toFixed(2);
//     let percentageR = ((refundChargebackCount / totalCount) * 100).toFixed(2);
//     let percentageC = ((waitingPendingCount / totalCount) * 100).toFixed(2);

//     if (totalCount === 0) {
//       return res.json(201, {
//         message: `User has no transaction`,
//         data: [
//           {
//             name: "Declined",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Success",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Refund/Chargeback",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Pending/Waiting",
//             percentage: 0,
//             amount: 0,
//           },
//         ],
//       });
//     } else {
//       return res.json(200, {
//         message: `All Status Data`,
//         data: [
//           {
//             name: "Declined",
//             percentage: percentageD,
//             amount: statusResult0[0].ammount !== null ? statusResult0[0].ammount : 0,
//           },
//           {
//             name: "Success",
//             percentage: percentageS,
//             amount: statusResult1[0].ammount !== null ? statusResult1[0].ammount : 0,
//           },
//           {
//             name: "Refund/Chargeback",
//             percentage: percentageR,
//             amount: statusResult4[0].ammount !== null ? statusResult4[0].ammount : 0,
//           },
//           {
//             name: "Pending/Waiting",
//             percentage: percentageC,
//             amount: statusResult5[0].ammount !== null ? statusResult5[0].ammount : 0,
//           },
//         ],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json(500, {
//       message: "error occurred",
//       error: error,
//     });
//   }
// };


// module.exports.statusResult=async(req,res)=> {
//   let user=req.user;
//   let {merchantSelect} = req.body;
  
//   try {
//     let {from,to,date,methodPayment,currency,searchItem}=req.body;
//     if(merchantSelect){
//       const id=merchantSelect.split(',');

//       methodPayment=methodPayment ? methodPayment[0].split(','): "";
//       currency= currency ? currency[0].split(',') : "";
//       let totalDefaultSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) ";
//       const totalSearchItemSql=
//       `SELECT COUNT(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
//       let totalFromToSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?";
//       let totalDateSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?)  AND DATE(created_on)=?";
//       let totalMethodPaymentSql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) AND payment_type IN (?)";
//       let totalCurrencySql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) AND ammount_type IN (?)";
//       let totalCurrencyMethodPaymentSql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id IN (?) AND ammount_type IN (?) AND payment_type IN (?)";

      

//     let result = await mysqlcon(
//       from && to
//       ? totalFromToSql
//       : currency && methodPayment
//       ? totalCurrencyMethodPaymentSql
//       : currency
//       ? totalCurrencySql
//       : date
//       ? totalDateSql
//       : searchItem
//       ? totalSearchItemSql
//       : methodPayment
//       ? totalMethodPaymentSql
//       : totalDefaultSql,
    
        
//       from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`]: methodPayment ? [id,methodPayment] : [id]
//       );

//     let totalCount = result[0].count;

//     let defaultFailureSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0";
//     let defaultSucessSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1";
//     let defaultPendingWaitingSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3)";
//     let defaultRefundChargebackSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5)";


//     let fromToFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND created_on>=? AND created_on<=?";

//     let fromToSucessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND created_on>=? AND created_on<=?";

//     let fromToPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3) AND created_on>=? AND created_on<=?";

//     let fromToRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5) AND created_on>=? AND created_on<=?";


//     let dateFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND created_on>=?";

//     let dateSucessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND created_on>=?";

//     let datePendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3) AND created_on>=?";

//     let dateRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5) AND created_on>=?";

//     let methodPaymentFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND payment_type IN (?)";

//     let methodPaymentSuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND payment_type IN (?)";

//     let methodPaymentPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3) AND payment_type IN (?)";

//     let methodPaymentRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5) AND payment_type IN (?)";

//     let currencyFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND ammount_type IN (?)";

//     let currencySuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND ammount_type IN (?)";

//     let currencyPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3) AND ammount_type IN (?)";

//     let currencyRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5) AND ammount_type IN (?)";

//     let currencyMethodPaymentFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentSuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=2 OR status=3) AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND (status=4 OR status=5) AND ammount_type IN (?) AND payment_type IN (?)";

//     let searchItemFailureSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=0 AND (order_no LIKE ? OR i_flname LIKE ?) `

//     let searchItemSucessSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=1 AND (order_no LIKE ? OR i_flname LIKE ?)`;

//     let searchItemPendingWaitingSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?) AND status=4 AND (order_no LIKE ? OR i_flname LIKE ?)`;

//     let searchItemRefundChargebackSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=5 AND (order_no LIKE ? OR i_flname LIKE ?)`;


//     let statusResult0 = await mysqlcon(
//       from && to
//     ? fromToFailureSql
//     : currency && methodPayment
//     ? currencyMethodPaymentFailureSql
//     : currency
//     ? currencyFailureSql
//     : methodPayment
//     ? methodPaymentFailureSql
//     : date 
//     ? dateFailureSql
//     : searchItem
//     ? searchItemFailureSql
//     : defaultFailureSql,

//     from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
//     );
//     let statusResult1 = await mysqlcon(
//       from && to
//       ? fromToSucessSql
//       : currency && methodPayment
//       ? currencyMethodPaymentSuccessSql
//       : currency
//       ? currencySuccessSql
//       : methodPayment
//       ? methodPaymentSuccessSql
//       : date 
//       ? dateSucessSql
//       : searchItem
//       ? searchItemSucessSql
//       : defaultSucessSql,
  
//       from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
//     );
//     let statusResult4 = await mysqlcon(      
//       from && to
//       ? fromToPendingWaitingSql
//       : currency && methodPayment
//       ? currencyMethodPaymentPendingWaitingSql
//       : currency
//       ? currencyPendingWaitingSql
//       : methodPayment
//       ? methodPaymentPendingWaitingSql
//       : date 
//       ? datePendingWaitingSql
//       : searchItem
//       ? searchItemPendingWaitingSql
//       : defaultPendingWaitingSql,
  
//       from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
//       );
//     let statusResult5 = await mysqlcon(      
//       from && to
//       ? fromToRefundChargebackSql
//       : currency && methodPayment
//       ? currencyMethodPaymentRefundChargebackSql
//       : currency
//       ? currencyRefundChargebackSql
//       : methodPayment
//       ? methodPaymentRefundChargebackSql
//       : date 
//       ? dateRefundChargebackSql
//       : searchItem
//       ? searchItemRefundChargebackSql
//       : defaultRefundChargebackSql,
  
//       from && to ? [id,from,to] : currency && methodPayment ? [id,currency,methodPayment] : currency ? [id,currency] : methodPayment ? [id,methodPayment] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
//       );
//     let declinedCount = statusResult0[0].count;
//     let successCount = statusResult1[0].count;
//     let refundCount = statusResult4[0].count;
//     let chargebackCount = statusResult5[0].count;


//       let percentageD = ((declinedCount / totalCount) * 100).toFixed(2) ;
//       let percentageS = ((successCount / totalCount) * 100).toFixed(2);
//       let percentageR = ((refundCount / totalCount) * 100).toFixed(2);
//       let percentageC = ((chargebackCount / totalCount) * 100).toFixed(2);




//     if (totalCount === 0) {
//       return res.json(201, {
//         message: `User has no transaction`,
//         data: [
//           {
//             name: "Declined",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Success",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Refund",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Chargeback",
//             percentage: 0,
//             amount: 0,
//           },
//         ],
//       });
//     } else {
//       return res.json(200, {
//         message: `All Status Data`,
//         data: [
//           {
//             name: "Declined",
//             percentage: percentageD,
//             amount: statusResult0[0].ammount,
//           },
//           {
//             name: "Success",
//             percentage: percentageS,
//             amount: statusResult1[0].ammount,
//           },
//           {
//             name: "Pending/Waiting",
//             percentage: percentageR,
//             amount: statusResult4[0].ammount,
//           },
//           {
//             name: "Refund/Chargeback",
//             percentage: percentageC,
//             amount: statusResult5[0].ammount,
//           },
//         ],
//       });
//     }
//     } else {
//       methodPayment=methodPayment ? methodPayment[0].split(','): "";
//       currency= currency ? currency[0].split(',') : "";
//       let totalDefaultSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? ";
//       const totalSearchItemSql=
//       `SELECT COUNT(status) as count FROM tbl_merchant_transaction WHERE user_id=?  AND (order_no LIKE ? OR i_flname LIKE ?)`
//       let totalFromToSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND DATE(created_on)>=? AND DATE(created_on)<=?";
//       let totalDateSql =
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=?  AND DATE(created_on)=?";
//       let totalMethodPaymentSql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND payment_type IN (?)";
//       let totalCurrencySql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND ammount_type IN (?)";
//       let totalCurrencyMethodPaymentSql = 
//       "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id=? AND ammount_type IN (?) AND payment_type IN (?)";

      

//     let result = await mysqlcon(
//       from && to
//       ? totalFromToSql
//       : currency && methodPayment
//       ? totalCurrencyMethodPaymentSql
//       : currency
//       ? totalCurrencySql
//       : date
//       ? totalDateSql
//       : searchItem
//       ? totalSearchItemSql
//       : methodPayment
//       ? totalMethodPaymentSql
//       : totalDefaultSql,
    
        
//       from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`]: methodPayment ? [user.id,methodPayment] : [user.id]
//       );

//     let totalCount = result[0].count;
//     let defaultFailureSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0";
//     let defaultSucessSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1";
//     let defaultPendingWaitingSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3)";
//     let defaultRefundChargebackSql =
//       "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5)";


//     let fromToFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND created_on>=? AND created_on<=?";

//     let fromToSucessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND created_on>=? AND created_on<=?";

//     let fromToPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND created_on>=? AND created_on<=?";

//     let fromToRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND created_on>=? AND created_on<=?";


//     let dateFailureSql= "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND created_on>=?";

//     let dateSucessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND created_on>=?";

//     let datePendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND created_on>=?";

//     let dateRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND created_on>=?";

//     let methodPaymentFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND payment_type IN (?)";

//     let methodPaymentSuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND payment_type IN (?)";

//     let methodPaymentPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND payment_type IN (?)";

//     let methodPaymentRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND payment_type IN (?)";

//     let currencyFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND ammount_type IN (?)";

//     let currencySuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND ammount_type IN (?)";

//     let currencyPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?)";

//     let currencyRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?)";

//     let currencyMethodPaymentFailureSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=0 AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentSuccessSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND status=1 AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentPendingWaitingSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=2 OR status=3) AND ammount_type IN (?) AND payment_type IN (?)";

//     let currencyMethodPaymentRefundChargebackSql =
//     "SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id=? AND (status=4 OR status=5) AND ammount_type IN (?) AND payment_type IN (?)";

//     let searchItemFailureSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=0 AND (order_no LIKE ? OR i_flname LIKE ?) `

//     let searchItemSucessSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=1 AND (order_no LIKE ? OR i_flname LIKE ?)`;

//     let searchItemPendingSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=4 AND (order_no LIKE ? OR i_flname LIKE ?)`;

//     let searchItemChargebackSql =
//     `SELECT COUNT(status) as count,COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=5 AND (order_no LIKE ? OR i_flname LIKE ?)`;


//     let statusResult0 = await mysqlcon(
//       from && to
//     ? fromToFailureSql
//     : currency && methodPayment
//     ? currencyMethodPaymentFailureSql
//     : currency
//     ? currencyFailureSql
//     : methodPayment
//     ? methodPaymentFailureSql
//     : date 
//     ? dateFailureSql
//     : searchItem
//     ? searchItemFailureSql
//     : defaultFailureSql,

//     from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
//     );
//     let statusResult1 = await mysqlcon(
//       from && to
//       ? fromToSucessSql
//       : currency && methodPayment
//       ? currencyMethodPaymentSuccessSql
//       : currency
//       ? currencySuccessSql
//       : methodPayment
//       ? methodPaymentSuccessSql
//       : date 
//       ? dateSucessSql
//       : searchItem
//       ? searchItemSucessSql
//       : defaultSucessSql,
  
//       from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
//     );
//     let statusResult4 = await mysqlcon(      
//       from && to
//       ? fromToPendingWaitingSql
//       : currency && methodPayment
//       ? currencyMethodPaymentPendingWaitingSql
//       : currency
//       ? currencyPendingWaitingSql
//       : methodPayment
//       ? methodPaymentPendingWaitingSql
//       : date 
//       ? datePendingWaitingSql
//       : searchItem
//       ? searchItemPendingSql
//       : defaultPendingWaitingSql,
  
//       from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
//       );
//     let statusResult5 = await mysqlcon(      
//       from && to
//       ? fromToRefundChargebackSql
//       : currency && methodPayment
//       ? currencyMethodPaymentRefundChargebackSql
//       : currency
//       ? currencyRefundChargebackSql
//       : methodPayment
//       ? methodPaymentRefundChargebackSql
//       : date 
//       ? dateRefundChargebackSql
//       : searchItem
//       ? searchItemChargebackSql
//       : defaultRefundChargebackSql,
  
//       from && to ? [user.id,from,to] : currency && methodPayment ? [user.id,currency,methodPayment] : currency ? [user.id,currency] : methodPayment ? [user.id,methodPayment] : date ? [user.id,date] : searchItem ? [user.id,`%${searchItem}%`,`%${searchItem}%`] : [user.id]
//       );

//     let declinedCount = statusResult0[0].count;
//     let successCount = statusResult1[0].count;
//     let refundCount = statusResult4[0].count;
//     let chargebackCount = statusResult5[0].count;

//       let percentageD = ((declinedCount / totalCount) * 100).toFixed(2) ;
//       let percentageS = ((successCount / totalCount) * 100).toFixed(2);
//       let percentageR = ((refundCount / totalCount) * 100).toFixed(2);
//       let percentageC = ((chargebackCount / totalCount) * 100).toFixed(2);




//     if (totalCount === 0) {
//       return res.json(201, {
//         message: `User has no transaction`,
//         data: [
//           {
//             name: "Declined",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Success",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Refund",
//             percentage: 0,
//             amount: 0,
//           },
//           {
//             name: "Chargeback",
//             percentage: 0,
//             amount: 0,
//           },
//         ],
//       });
//     } else {
//       return res.json(200, {
//         message: `All Status Data`,
//         data: [
//           {
//             name: "Declined",
//             percentage: percentageD,
//             amount: statusResult0[0].ammount,
//           },
//           {
//             name: "Success",
//             percentage: percentageS,
//             amount: statusResult1[0].ammount,
//           },
//           {
//             name: "Pending/Waiting",
//             percentage: percentageR,
//             amount: statusResult4[0].ammount,
//           },
//           {
//             name: "Refund/Chargeback",
//             percentage: percentageC,
//             amount: statusResult5[0].ammount,
//           },
//         ],
//       });
//     }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json(500, {
//       message: "error occured",
//       error: error,
//     });
//   }
// };

module.exports.statusResult = async (req, res) => {
  let user = req.user;
  // console.log(user)
  let { merchantSelect } = req.body;
  // console.log(merchantSelect)

  try {
    let { from, to, date, methodPayment, currency, searchItem } = req.body;
    const id = merchantSelect ? merchantSelect.split(',') : [user.id];
    methodPayment = methodPayment ? methodPayment[0].split(',') : [];
    currency = currency ? currency[0].split(',') : [];

    const baseQuery = "SELECT COUNT(status) as count, COALESCE(SUM(ammount),0) as ammount FROM tbl_merchant_transaction WHERE user_id IN (?)";
    const conditions = [];
    const queryParams = [id];

    if (from && to) {
      conditions.push("DATE(created_on) >= ? AND DATE(created_on) <= ?");
      queryParams.push(from, to);
    }
    if (date) {
      conditions.push("DATE(created_on) = ?");
      queryParams.push(date);
    }
    if (methodPayment.length > 0) {
      conditions.push("payment_type IN (?)");
      queryParams.push(methodPayment);
    }
    if (currency.length > 0) {
      conditions.push("ammount_type IN (?)");
      queryParams.push(currency);
    }
    if (searchItem) {
      conditions.push("(order_no LIKE ? OR i_flname LIKE ?)");
      queryParams.push(`%${searchItem}%`, `%${searchItem}%`);
    }

    const whereClause = conditions.length > 0 ? ` AND ${conditions.join(' AND ')}` : '';

    const totalDefaultSql = baseQuery + whereClause;
    const totalFailureSql = baseQuery + " AND status = 0" + whereClause;
    const totalSuccessSql = baseQuery + " AND status = 1" + whereClause;
    const totalPendingWaitingSql = baseQuery + " AND (status = 2 OR status = 3)" + whereClause;
    const totalRefundChargebackSql = baseQuery + " AND (status = 4 OR status = 5)" + whereClause;

    const [totalCountResult, failureResult, successResult, pendingWaitingResult, refundChargebackResult] = await Promise.all([
      mysqlcon(totalDefaultSql, queryParams),
      mysqlcon(totalFailureSql, queryParams),
      mysqlcon(totalSuccessSql, queryParams),
      mysqlcon(totalPendingWaitingSql, queryParams),
      mysqlcon(totalRefundChargebackSql, queryParams)
    ]);

    const totalCount = totalCountResult[0].count;
    const declinedCount = failureResult[0].count;
    const successCount = successResult[0].count;
    const refundCount = pendingWaitingResult[0].count;
    const chargebackCount = refundChargebackResult[0].count;

    const percentageD = totalCount === 0 ? 0 : ((declinedCount / totalCount) * 100).toFixed(2);
    const percentageS = totalCount === 0 ? 0 : ((successCount / totalCount) * 100).toFixed(2);
    const percentageR = totalCount === 0 ? 0 : ((refundCount / totalCount) * 100).toFixed(2);
    const percentageC = totalCount === 0 ? 0 : ((chargebackCount / totalCount) * 100).toFixed(2);

    const responseData = {
      message: totalCount === 0 ? `User has no transactions` : `All Status Data`,
      data: [
        { name: "Declined", percentage: percentageD, amount: failureResult[0].ammount },
        { name: "Success", percentage: percentageS, amount: successResult[0].ammount },
        { name: "Pending/Waiting", percentage: percentageR, amount: pendingWaitingResult[0].ammount },
        { name: "Refund/Chargeback", percentage: percentageC, amount: refundChargebackResult[0].ammount }
      ]
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error: error });
  }
};

module.exports.searchDateFilter=async(req,res)=>{
  var {merchantSelect,from,to,date,methodPayment,status,currency,searchItem}=req.body;
  try {
    if(merchantSelect) {
      let id= merchantSelect.split(',');

      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
      // console.log(methodPayment,status,currency);
      const defaultCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?)"
      const searchItemCountSql=`SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?)`
      const fromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const dateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND DATE(created_on)=?"
      const methodPaymentCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?)"
      const statusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?)"
      const currencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?)"
      const methodPaymentDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)=?"
      const statusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND DATE(created_on)=?"
      const currencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const currencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?)"
      const methodPaymentCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?)"
      const statusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const statusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
      const methodPaymentStatusDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND DATE(created_on)=?"
      const methodPaymentCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const statusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?)"
      const methodPaymentStatusCurrencyDateCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)=?"
      const methodPaymentStatusCurrencyFromToCountSql="SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) AND payment_type IN (?) AND status IN (?) AND ammount_type IN (?) AND DATE(created_on)>=? AND DATE(created_on)<=?"
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
      const defaultSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const searchItemSql=`SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND (order_no LIKE ? OR i_flname LIKE ?) ORDER BY created_on DESC LIMIT ?,?`
      const fromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const dateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const currencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const currencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const statusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencySql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?)  ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyDateSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)=? ORDER BY created_on DESC LIMIT ?,?"
      const methodPaymentStatusCurrencyFromToSql="SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) AND tbl_merchant_transaction.payment_type IN (?) AND tbl_merchant_transaction.status IN (?) AND tbl_merchant_transaction.ammount_type IN (?) AND DATE(tbl_merchant_transaction.created_on)>=? AND DATE(tbl_merchant_transaction.created_on)<=? ORDER BY created_on DESC LIMIT ?,?"
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to,page.start,page.limit] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date,page.start,page.limit] : methodPayment && status && from && to ? [id,methodPayment,status,from,to,page.start,page.limit] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to,page.start,page.limit] : status && currency && from && to ? [id,status,currency,from,to,page.start,page.limit] : methodPayment && status && date ? [id,methodPayment,status,date,page.start,page.limit] : methodPayment && currency && date ? [id,methodPayment,currency,date,page.start,page.limit] : status && currency && date ? [id,status,currency,date,page.start,page.limit] : methodPayment && from && to ? [id,methodPayment,from,to,page.start,page.limit] :  status && from && to ? [id,status,from,to,page.start,page.limit] : currency && from && to ? [id,currency,from,to,page.start,page.limit] : methodPayment && status && currency ? [id,methodPayment,status,currency,page.start,page.limit] : status && currency ? [id,status,currency,page.start,page.limit] : methodPayment && currency ? [id,methodPayment,currency,page.start,page.limit] : methodPayment && status ? [id,methodPayment,status,page.start,page.limit] : methodPayment && date ? [id,methodPayment,date,page.start,page.limit] : status && date ? [id,status,date,page.start,page.limit] : currency && date ? [id,currency,date,page.start,page.limit] : from && to ? [id,from,to,page.start,page.limit] : methodPayment ? [id,methodPayment,page.start,page.limit] : status ? [id,status,page.start,page.limit] : currency ? [id,currency,page.start,page.limit] : date ? [id,date,page.start,page.limit] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`,page.start,page.limit]: [id,page.start,page.limit] )
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
  //   if (merchantSelect) {
  //     let id = merchantSelect.split(',');
  
  //     // Functions to construct SQL queries
  //     const getCountQuery = (conditions) => {
  //         return `SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id IN (?) ${conditions}`;
  //     };
  
  //     const getSelectQuery = (conditions) => {
  //         return `SELECT tbl_user.name, tbl_merchant_transaction.* ,DATE_FORMAT(tbl_merchant_transaction.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction INNER JOIN tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id where tbl_merchant_transaction.user_id IN (?) ${conditions} ORDER BY created_on DESC LIMIT ?,?`;
  //     };
  
  //     // Function to execute SQL query
  //     const executeQuery = async (sql, params) => {
  //         return await mysqlcon(sql, params);
  //     };
  
  //     // Extracted conditions
  //     const conditions = {
  //         methodPayment: methodPayment ? "AND payment_type IN (?)" : "",
  //         status: status ? "AND status IN (?)" : "",
  //         currency: currency ? "AND ammount_type IN (?)" : "",
  //         date: date ? "AND DATE(created_on) = ?" : "",
  //         fromTo: from && to ? "AND DATE(created_on) >= ? AND DATE(created_on) <= ?" : "",
  //         searchItem: searchItem ? "AND (order_no LIKE ? OR i_flname LIKE ?)" : "",
  //     };
  
  //     // Extracted parameters
  //     const queryParams = [
  //         id,
  //         ...(methodPayment ? [methodPayment] : []),
  //         ...(status ? [status] : []),
  //         ...(currency ? [currency] : []),
  //         ...(date ? [date] : []),
  //         ...(from && to ? [from, to] : []),
  //         ...(searchItem ? [`%${searchItem}%`, `%${searchItem}%`] : []),
  //     ];
  
  //     // Build and execute count query
  //     const countQuery = getCountQuery(Object.values(conditions).join(" "));
  //     const totalCountResult = await executeQuery(countQuery, queryParams);
  //     const total = totalCountResult[0].Total;
  
  //     // Pagination
  //     let Page = req.body.page ? Number(req.body.page) : 1;
  //     let page = pagination(total, Page);
  
  //     // Build and execute select query
  //     const selectQuery = getSelectQuery(Object.values(conditions).join(" "));
  //     const selectParams = [...queryParams, page.start, page.limit];
  //     const totalResult = await executeQuery(selectQuery, selectParams);
  
  //     // Prepare response
  //     let startRange = page.start + 1;
  //     let endRange = page.start + totalResult.length;
  //     return res.json(200, {
  //         data: {
  //             message: totalResult.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
  //             currentPage: Page,
  //             totalPages: page.numOfPages > 0 ? page.numOfPages : 1,
  //             deposits: totalResult,
  //         },
  //     });
  // }  
    else 
    {
      const id=req.user.id;
      // console.log(id)
      methodPayment=methodPayment ? methodPayment[0].split(','): "";
      status= status ? status[0].split(',') : "";
      currency= currency ? currency[0].split(',') : "";
      console.log(methodPayment,status,currency);
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date] : methodPayment && status && from && to ? [id,methodPayment,status,from,to] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to] : status && currency && from && to ? [id,status,currency,from,to] : methodPayment && status && date ? [id,methodPayment,status,date] : methodPayment && currency && date ? [id,methodPayment,currency,date] : status && currency && date ? [id,status,currency,date] : methodPayment && from && to ? [id,methodPayment,from,to] :  status && from && to ? [id,status,from,to] : currency && from && to ? [id,currency,from,to] : methodPayment && status && currency ? [id,methodPayment,status,currency] : status && currency ? [id,status,currency] : methodPayment && currency ? [id,methodPayment,currency] : methodPayment && status ? [id,methodPayment,status] : methodPayment && date ? [id,methodPayment,date] : status && date ? [id,status,date] : currency && date ? [id,currency,date] : from && to ? [id,from,to] : methodPayment ? [id,methodPayment] : status ? [id,status] : currency ? [id,currency] : date ? [id,date] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`] : [id]
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
      methodPayment && status && currency && from && to ? [id,methodPayment,status,currency,from,to,page.start,page.limit] : methodPayment && status && currency && date ? [id,methodPayment,status,currency,date,page.start,page.limit] : methodPayment && status && from && to ? [id,methodPayment,status,from,to,page.start,page.limit] : methodPayment && currency && from && to ? [id,methodPayment,currency,from,to,page.start,page.limit] : status && currency && from && to ? [id,status,currency,from,to,page.start,page.limit] : methodPayment && status && date ? [id,methodPayment,status,date,page.start,page.limit] : methodPayment && currency && date ? [id,methodPayment,currency,date,page.start,page.limit] : status && currency && date ? [id,status,currency,date,page.start,page.limit] : methodPayment && from && to ? [id,methodPayment,from,to,page.start,page.limit] :  status && from && to ? [id,status,from,to,page.start,page.limit] : currency && from && to ? [id,currency,from,to,page.start,page.limit] : methodPayment && status && currency ? [id,methodPayment,status,currency,page.start,page.limit] : status && currency ? [id,status,currency,page.start,page.limit] : methodPayment && currency ? [id,methodPayment,currency,page.start,page.limit] : methodPayment && status ? [id,methodPayment,status,page.start,page.limit] : methodPayment && date ? [id,methodPayment,date,page.start,page.limit] : status && date ? [id,status,date,page.start,page.limit] : currency && date ? [id,currency,date,page.start,page.limit] : from && to ? [id,from,to,page.start,page.limit] : methodPayment ? [id,methodPayment,page.start,page.limit] : status ? [id,status,page.start,page.limit] : currency ? [id,currency,page.start,page.limit] : date ? [id,date,page.start,page.limit] : searchItem ? [id,`%${searchItem}%`,`%${searchItem}%`,page.start,page.limit]: [id,page.start,page.limit])
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

// {
//       // Define an object to map conditions to SQL queries
// const conditionsMap = {
//   'methodPayment && status && currency && from && to': methodPaymentStatusCurrencyFromToSql,
//   'methodPayment && status && currency && date': methodPaymentStatusCurrencyDateSql,
//   'methodPayment && status && from && to': methodPaymentStatusFromToSql,
//   'methodPayment && currency && from && to': methodPaymentCurrencyFromToSql,
//   'status && currency && from && to': statusCurrencyFromToSql,
//   'methodPayment && status && date': methodPaymentStatusDateSql,
//   'methodPayment && currency && date': methodPaymentCurrencyDateSql,
//   'status && currency && date': statusCurrencyDateSql,
//   'methodPayment && from && to': methodPaymentFromToSql,
//   'status && from && to': statusFromToSql,
//   'currency && from && to': currencyFromToSql,
//   'methodPayment && status && currency': methodPaymentStatusCurrencySql,
//   'status && currency': statusCurrencySql,
//   'methodPayment && currency': methodPaymentCurrencySql,
//   'methodPayment && status': methodPaymentStatusSql,
//   'methodPayment && date': methodPaymentDateSql,
//   'status && date': statusDateSql,
//   'currency && date': currencyDateSql,
//   'from && to': fromToSql,
//   'methodPayment': methodPaymentSql,
//   'status': statusSql,
//   'currency': currencySql,
//   'date': dateSql,
//   'searchItem': searchItemSql,
//   'default': defaultSql
// };

// // Find the matching condition and get the corresponding SQL query
// const condition = Object.keys(conditionsMap).find(key => eval(key));
// const sqlQuery = conditionsMap[condition] || conditionsMap['default'];

// // Define parameters for the SQL query
// const queryParams = [
//   id, 
//   ...(methodPayment ? [methodPayment] : []), 
//   ...(status ? [status] : []), 
//   ...(currency ? [currency] : []), 
//   ...(from ? [from] : []), 
//   ...(to ? [to] : []), 
//   ...(date ? [date] : []), 
//   ...(searchItem ? [`%${searchItem}%`, `%${searchItem}%`] : []), 
//   page.start, 
//   page.limit
// ];

// // Execute the SQL query
// const totalResult = await mysqlcon(sqlQuery, queryParams);

// // Calculate start and end range for pagination
// const startRange = page.start + 1;
// const endRange = page.start + totalResult.length;

// // Send response
// return res.status(200).json({
//   data: {
//     message: totalResult.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
//     currentPage: Page,
//     totalPages: page.numOfPages > 0 ? page.numOfPages : 1,
//     deposits: totalResult,
//   },
// });

//     }
  } catch(error) {
    return res.status(201).json(
      {
        error : error
      }
    )
  }
}

module.exports.merchantChoosedCurrency = async function(req, res) {
  try {
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [req.user.id]);
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