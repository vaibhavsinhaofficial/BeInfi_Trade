const mysqlcon = require('../../config/db_connection');

module.exports.teammerchantWalletLogs = async (req, res) => {

  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  const { to, from, date, orderid } = req.body;
  let user = req.user
  try {
 
      let sqlAllCount = "select count(*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id WHERE tbl_wallet_update_log.merchant_id = ?";

      let sqCountDate = "select count(*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id where tbl_wallet_update_log.merchant_id=? AND DATE(tbl_wallet_update_log.created_on) = ?";

      let sqlToFromCount = "select count(*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id Where tbl_wallet_update_log.merchant_id=? AND DATE(tbl_wallet_update_log.created_on)  >= ? AND DATE(tbl_wallet_update_log.created_on) <= ?";

      let searchorderidcount = "SELECT COUNT(*) AS Total FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id WHERE tbl_wallet_update_log.merchant_id IN (?) AND tbl_wallet_update_log.order_id= ?";

      let result = await mysqlcon(
        date
          ? sqCountDate
          : to && from
            ? sqlToFromCount
            : orderid ? searchorderidcount
              : sqlAllCount,
        date ? [user.parent_id, date] : to && from ? [user.parent_id, from, to] : orderid ? [user.parent_id, orderid] : [user.parent_id]
      );
      let total = result[0].Total;
      let page = req.body.page ? Number(req.body.page) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let { start, numOfPages } = pagination(total, page, limit);

      let sql = "SELECT tbl_user.name, tbl_login.firstname, tbl_login.lastname, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id LEFT JOIN tbl_login ON tbl_wallet_update_log.login_admin = tbl_login.user_id where tbl_wallet_update_log.merchant_id=? ORDER BY tbl_wallet_update_log.created_on DESC limit ?,?";

      let sqlDate = "SELECT tbl_user.name, tbl_login.firstname, tbl_login.lastname, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id LEFT JOIN tbl_login ON tbl_wallet_update_log.login_admin = tbl_login.user_id where tbl_wallet_update_log.merchant_id=? AND DATE(tbl_wallet_update_log.created_on) = ? LIMIT ?,?";

      let sqlToFrom = "SELECT tbl_user.name, tbl_login.firstname, tbl_login.lastname, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id LEFT JOIN tbl_login ON tbl_wallet_update_log.login_admin = tbl_login.user_id Where tbl_wallet_update_log.merchant_id=? AND DATE(tbl_wallet_update_log.created_on) >=? AND DATE(tbl_wallet_update_log.created_on) <=? LIMIT ?,?";

      let searchorderid = "SELECT tbl_user.name, tbl_login.firstname, tbl_login.lastname, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id LEFT JOIN tbl_login ON tbl_wallet_update_log.login_admin = tbl_login.user_id Where tbl_wallet_update_log.merchant_id=? AND tbl_wallet_update_log.order_id =? LIMIT ?,?";

      const data = await mysqlcon(
        date ? sqlDate : to && from ? sqlToFrom :orderid?searchorderid: sql,
        date
          ? [user.parent_id, date, start, limit]
          : to && from
            ? [user.parent_id, from, to, start, limit]
            :orderid?[user.parent_id,orderid, start, limit]
            : [user.parent_id, start, limit]
      );

      const startRange = data.length > 0 ? start + 1 : 0;
      const endRange = data.length > 0 ? Math.min(start + limit, total) : 0;

      res.status(200).json({
        message: data.length > 0
          ? `Showing ${startRange} to ${endRange} data from ${total} data`
          : "No data available",
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        result: data,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}
module.exports.teamwalletLogsDownload = async(req, res) => {
  try {
    const { to, from, date, orderid } = req.body;
    const user = req.user;

    let sql = "SELECT tbl_user.name AS Name, tbl_wallet_update_log.current_wallet AS Current_Wallet, tbl_wallet_update_log.update_wallet_tot AS Updated_Wallet, CASE WHEN tbl_wallet_update_log.current_action = 1 THEN 'ADD' WHEN tbl_wallet_update_log.current_action = 2 THEN 'SUB' ELSE 'unknown' END AS Action, tbl_wallet_update_log.effective_amt AS Effective_Amount, tbl_wallet_update_log.remark AS Remarks, CASE WHEN tbl_wallet_update_log.login_admin = 1 THEN 'Bankconnect Super Admin' WHEN tbl_wallet_update_log.current_action = 2 THEN 'By Settlement' ELSE 'unknown' END AS Authorizer, DATE_FORMAT(tbl_wallet_update_log.created_on, '%Y-%m-%d %H:%i:%s') AS Created_On FROM tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_wallet_update_log.merchant_id = tbl_user.id";

    let params = [user.parent_id];

    
      sql += " WHERE tbl_wallet_update_log.merchant_id = ?";
    

    if (date !== undefined) {
      sql += " AND DATE(tbl_wallet_update_log.created_on) = ?";
      params.push(date);
    }

    if (from&&to) {
      sql += " AND DATE(tbl_wallet_update_log.created_on) >= ? AND DATE(tbl_wallet_update_log.created_on) <= ?";
      params.push(from,to);
    }

    if (orderid) {
      sql += " AND tbl_wallet_update_log.order_id = ?";
      params.push(orderid);
    }

    sql += " ORDER BY tbl_wallet_update_log.created_on DESC";

    const result = await mysqlcon(sql, params);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}