const mysqlcon = require("../../config/db_connection");

class LocalPayouts{
  async default(req,res){
    try {
      let pagination = (total, page, limit) => {
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages };
      };
      const {to, from, date, merchantSelect, currency, status, searchItem } = req.body;
      let sqlAllCount =
        "select count (*) as Total from tbl_icici_payout_transaction_response_details";
      let sqCountDate =
        "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on) = ?";
      let sqlToFromCount =
        "select count (*) as Total from tbl_icici_payout_transaction_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
      let sqlSearchCount = `select count (*) as Total from tbl_icici_payout_transaction_response_details where uniqueid LIKE '%${searchItem}%' OR payee_name LIKE '%${searchItem}%'`
      let sqlMerchant = 
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where users_id = ?";
      let sqlCurrency = 
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where currency = ?";
      let sqlStatus = 
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where status = ?";
      let sqlmercur =
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where users_id = ? AND currency = ?";
      let sqlDateMerchantCurrency = 
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where users_id = ? AND currency = ? AND DATE(created_on) = ?"
      let sqlToFromMerchantCurrency = 
      "select count (*) as Total from tbl_icici_payout_transaction_response_details where users_id = ? AND currency = ? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?"
    
      let result = await mysqlcon(
          to && from && merchantSelect && currency
          ? sqlToFromMerchantCurrency
          : merchantSelect && currency && date
          ? sqlDateMerchantCurrency
          : to && from
          ? sqlToFromCount
          : merchantSelect && currency
          ? sqlmercur
          : date
          ? sqCountDate
          : merchantSelect
          ? sqlMerchant
          : currency
          ? sqlCurrency
          : status
          ? sqlStatus
          : searchItem
          ? sqlSearchCount
          : sqlAllCount,
          to && from && merchantSelect && currency ? [to, from, merchantSelect, currency]: merchantSelect && currency && date ? [merchantSelect, currency, date] : to && from ? [from, to] : merchantSelect && currency ? [merchantSelect, currency] : date ? [date] : merchantSelect ? [merchantSelect] : currency ? [currency] :  status ? [status] : ""
      );
      let total = result[0].Total;
      let Page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
  
      let page = pagination(total, Page, limit);
    
      let sql =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?";
    
      let sqlDate =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on) = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?";
    
      let sqlToFrom =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?";

      let sqlSearch = `select * from tbl_icici_payout_transaction_response_details where uniqueid LIKE '%${searchItem}%' OR payee_name LIKE '%${searchItem}%' ORDER BY created_on DESC limit ?,?`

      let merchantSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?"

      let currencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.currency = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?"

      let statusSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.status = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?"

      let merCurSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?";

      let toFromMerchantCurrencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?";

      let dateMerchantCurrencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on DESC limit ?,?"
    
      const data = await mysqlcon(
          to && from && merchantSelect && currency ? toFromMerchantCurrencySql : date && merchantSelect && currency ? dateMerchantCurrencySql : to && from ? sqlToFrom : merchantSelect && currency ? merCurSql : date ? sqlDate : merchantSelect ? merchantSql : currency ? currencySql : status ? statusSql : searchItem ? sqlSearch : sql,
          to && from && merchantSelect && currency
          ? [from, to, merchantSelect, currency, page.start, page.limit]
          : merchantSelect && currency && date
          ? [merchantSelect, currency, date, page.start, page.limit]
          : to && from
          ? [from, to, page.start, page.limit]
          : merchantSelect && currency
          ? [merchantSelect, currency, page.start, page.limit]
          : date
          ? [date, page.start, page.limit]
          : merchantSelect
          ? [merchantSelect, page.start, page.limit]
          : currency
          ? [currency, page.start, page.limit]
          : status
          ? [status, page.start, page.limit]
          : [page.start, page.limit]
      );

      let startRange = page.start + 1;
      let endRange = page.start + data.length;
      
      res.status(200).json({
        message: data.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        totalPages: page.numOfPages ? page.numOfPages : 1,
        pageLimit: page.limit,
        result: data,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
  }
    
  }

  async localPayoutsCards (req, res) {
    try {
      let {to, from, status, merchantSelect, currency, searchItem} = req.body;
  
      let sql = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id"
  
      let sqlCurrency ="SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.currency = ?";
  
      let sqlToFrom = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id where DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ?";

      let sqlSearch = `select COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id where tbl_icici_payout_transaction_response_details.uniqueid LIKE '%${searchItem}%' OR payee_name LIKE '%${searchItem}%'`
  
      let sqlMerchant = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.users_id = ?"
  
      let sqlStatus = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.status = ?"
  
      let sqlMerchantStatus = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.status = ?"
  
      let sqlToFromMerchant = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ?"
  
      let sqlToFromMerchantStatus = "SELECT COUNT(*) AS count, SUM(tbl_icici_payout_transaction_response_details.amount) AS amount, SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS charges, SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS gst from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_user.id = tbl_icici_payout_transaction_response_details.users_id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.status = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ?"
  
      let result = await mysqlcon(
        merchantSelect && status && to && from
        ? sqlToFromMerchantStatus
        : merchantSelect && to && from
        ? sqlToFromMerchant
        : to && from
        ? sqlToFrom
        : merchantSelect && status
        ? sqlMerchantStatus
        : merchantSelect
        ? sqlMerchant
        : status
        ? sqlStatus
        : currency
        ? sqlCurrency
        : searchItem
        ? sqlSearch
        : sql,
        merchantSelect && status && to && from
        ? [merchantSelect, status, from, to]
        : merchantSelect && to && from
        ? [merchantSelect, from, to]
        : to && from
        ? [from, to]
        : merchantSelect && status
        ? [merchantSelect, status]
        : merchantSelect
        ? [merchantSelect]
        : status
        ? [status]
        : currency
        ? [currency]
        : []
        );
  
        let transaction;
        let payoutAmount;
        let payoutCharges;
        let payoutGST
  
        if(result[0].count === null){
          transaction = 0
        } else{
          transaction = result[0].count
        }
  
        if(result[0].amount === null){
          payoutAmount = 0
        } else{
          payoutAmount = result[0].amount.toFixed(2)
        }
  
        if(result[0].charges === null){
          payoutCharges = 0
        } else{
          payoutCharges = result[0].charges.toFixed(2)
        }
  
        if(result[0].gst === null){
          payoutGST = 0
        } else{
          payoutGST = result[0].gst.toFixed(2)
        }
  
      if ((result[0].count) === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total No. Of Transaction",
              amount: 0,
            },
            {
              name: "Total Payout Transaction",
              amount: 0,
            },
            {
              name: "Total Payout Charges",
              amount: 0,
            },
            {
              name: "Total GST Amount",
              amount: 0
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total No. Of Transaction",
              amount: transaction
            },
            {
              name: "Total Payout Transaction",
              amount: payoutAmount,
            },
            {
              name: "Total Payout Charges",
              amount: payoutCharges,
            },
            {
              name: "Total GST Amount",
              amount: payoutGST
            },
          ],
        });
      }
  
    } catch(err){
      console.log(err)
      res.status(500).json({
        message:"Server Error",
        err,
      })
    }
  }

  async downloadLocalPayouts (req, res) {
    try {
      const {to, from, date, merchantSelect, currency, status, searchItem } = req.body;
  
      let sql =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id ORDER BY tbl_icici_payout_transaction_response_details.created_on";
    
      let sqlDate =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on) = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on";
    
      let sqlToFrom =
        "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? ORDER BY tbl_icici_payout_transaction_response_details.created_on";
        
      let sqlSearch = `select * from tbl_icici_payout_transaction_response_details where uniqueid LIKE '%${searchItem}%' OR payee_name LIKE '%${searchItem}%' ORDER BY created_on`

      let merchantSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on"

      let currencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.currency = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on"

      let statusSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.status = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on"

      let merCurSql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on";

      let toFromMerchantCurrencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) <= ? ORDER BY tbl_icici_payout_transaction_response_details.created_on";

      let dateMerchantCurrencySql = "select tbl_user.name, tbl_icici_payout_transaction_response_details.* from tbl_icici_payout_transaction_response_details LEFT JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.users_id = ? AND tbl_icici_payout_transaction_response_details.currency = ? AND DATE(tbl_icici_payout_transaction_response_details.created_on) = ? ORDER BY tbl_icici_payout_transaction_response_details.created_on"
    
      const result = await mysqlcon(
        to && from && merchantSelect && currency ? toFromMerchantCurrencySql : date && merchantSelect && currency ? dateMerchantCurrencySql : to && from ? sqlToFrom : merchantSelect && currency ? merCurSql : date ? sqlDate : merchantSelect ? merchantSql : currency ? currencySql : status ? statusSql : searchItem ? sqlSearch : sql,
        to && from && merchantSelect && currency
        ? [from, to, merchantSelect, currency]
        : merchantSelect && currency && date
        ? [merchantSelect, currency, date]
        : to && from
        ? [from, to]
        : merchantSelect && currency
        ? [merchantSelect, currency]
        : date
        ? [date]
        : merchantSelect
        ? [merchantSelect]
        : currency
        ? [currency]
        : status
        ? [status]
        : []
      );
  
      res.send(result)
  
    } catch(err){
      console.log(err)
      res.status(500).json({
        message:"Server Error",
        err,
      })
    }
  }
}

module.exports = new LocalPayouts