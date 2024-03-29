const mysqlcon = require("../../config/db_connection");
const Pagination = require("../../services/pagination");
class BankDeposit {
  async default(req, res) {
    try {
      const { to, from, date, pageNumber, searchItem } = req.body;
      let sqlAllCount =
        "select count (*) as Total from tbl_bank_deposites_receive";
      let sqCountDate =
        "select count (*) as Total from tbl_bank_deposites_receive where DATE(created_on) = ?";
      let sqlToFromCount =
        "select count (*) as Total from tbl_bank_deposites_receive where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
      let sqlSearchCount = `select count (*) as Total from tbl_bank_deposites_receive where trx_id LIKE '%${searchItem}%'`;

      let result = await mysqlcon(
        date
          ? sqCountDate
          : to && from
          ? sqlToFromCount
          : searchItem
          ? sqlSearchCount
          : sqlAllCount,
        date ? [date] : to && from ? [from, to] : ""
      );
      let total = result[0].Total;
      let page = req.body.pageNumber ? Number(req.body.pageNumber) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let { start, numOfPages } = Pagination.pagination(
        result[0].Total,
        page,
        limit
      );

      let sql =
        "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive LEFT JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id ORDER BY created_on DESC limit ?,?";
      let sqlDate =
        "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive LEFT JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on) = ? ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?";
      let sqlToFrom =
        "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive LEFT JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on)  >= ? AND DATE(tbl_bank_deposites_receive.created_on) <= ? ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?";
      let sqlSearch = `select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where trx_id LIKE '%${searchItem}%' ORDER BY tbl_bank_deposites_receive.created_on DESC limit ?,?`;

      const data = await mysqlcon(
        date ? sqlDate : to && from ? sqlToFrom : searchItem ? sqlSearch : sql,
        date
          ? [date, start, limit]
          : to && from
          ? [from, to, start, limit]
          : [start, limit]
      );

      let startRange = start + 1;
      let endRange = start + data.length;

      res.status(200).json({
        message: data.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        result: data,
        numOfPages: numOfPages ? numOfPages : 1,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  
  async createAndUpdate(req, res) {
    try {
      const {id} = req.body
      if (Object.keys(req.body).length <= 0) {
        const { email } = req.user;
        let sqlForMerchant = "select id,name from tbl_user";
        let sqlForBank ="SELECT id,gateway_name FROM payment_gateway where type = 0 And status=1";
        let merchant = mysqlcon(sqlForMerchant);
        let bankName = mysqlcon(sqlForBank);
        const data = await Promise.all([merchant, bankName]);
        return res
          .status(200)
          .json({ merchant: data[0], bankName: data[1], authorizer: email });
      } else if(Object.keys(req.body).length >=6 && id===undefined) {
        let formData = {
          user_id: req.body.merchantId,
          mer_name: req.body.merchantName,
          recieved_date: req.body.receivedDate,
          currency: req.body.Currency,
          bank_name:req.body.bankName,
          trx_type:req.body.TransactionType,
          trx_id:req.body.transactionid,
          deposit_recieved:req.body.depositsReceived,
          bank_charge:req.body.BankCharges,
          tax:req.body.Tax,
          total_charges:req.body.TotalCharges,
          amount:(req.body.depositsReceived && req.body.TotalCharges) ? (req.body.depositsReceived - req.body.TotalCharges) : req.body.depositsReceived,
          auth:req.body.authorizer,
          created_on: req.body.receivedDate,
          updated_on: req.body.receivedDate
        };
          let sql = "INSERT INTO tbl_bank_deposites_receive SET ?"
          let result = await mysqlcon(sql, [formData]);
          if(result.affectedRows){
            return res.status(200).json({ message: "Successfully" });
          }else{
            return res.status(403).json({ message: "Error While Insterting" });
          } 
      }else if(Object.keys(req.body).length >=6 && id){
        let formData = {
          user_id: req.body.merchantId,
          mer_name: req.body.merchantName,
          recieved_date: req.body.receivedDate,
          currency: req.body.Currency,
          bank_name:req.body.bankName,
          trx_type:req.body.TransactionType,
          trx_id:req.body.transactionid,
          deposit_recieved:req.body.depositsReceived,
          bank_charge:req.body.BankCharges,
          tax:req.body.Tax,
          total_charges:req.body.TotalCharges,
          amount:(req.body.depositsReceived && req.body.TotalCharges) ? (req.body.depositsReceived - req.body.TotalCharges) : req.body.depositsReceived,
          auth:req.body.authorizer,
          created_on: req.body.receivedDate,
          updated_on: req.body.receivedDate
        };
          let sql = "Update tbl_bank_deposites_receive SET ? WHERE id = ?"
          let result = await mysqlcon(sql, [formData,id]);
          if(result.affectedRows){
            return res.status(200).json({ message: "Successfully Data Update" });
          }else{
            return res.status(403).json({ message: "Error While Insterting" });
          } 
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Sonthing Went Wrong in Bank Deposite", error });
    }
  }

  async bankDepositDownload(req, res) {
    try {
      let {to, from, date} = req.body
      console.log(req.body)

      let sql = "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id ORDER BY created_on"
      
      let sqlDate = "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on) = ? ORDER BY tbl_bank_deposites_receive.created_on";

      let sqlToFrom = "select tbl_bank_deposites_receive.*, tbl_akonto_banks_code.title from tbl_bank_deposites_receive JOIN tbl_akonto_banks_code ON tbl_bank_deposites_receive.bank_name = tbl_akonto_banks_code.id where DATE(tbl_bank_deposites_receive.created_on)  >= ? AND DATE(tbl_bank_deposites_receive.created_on) <= ? ORDER BY tbl_bank_deposites_receive.created_on";

      const data = await mysqlcon(
        date ? sqlDate : to && from ? sqlToFrom : sql,
        date
          ? [date]
          : to && from
          ? [from, to,]
          : [""]
      );
      res.send(data)
    } catch (error) {
      
    }
  }

  async bankDepositsCards(req, res) {
    try {
      let {to, from, searchItem, date} = req.body;
      let sql = "select COUNT(*) AS count, SUM(bank_charge) as bank_charges, SUM(total_charges) as total_charges, SUM(amount) as amount FROM tbl_bank_deposites_receive";

      let sqlToFrom = "SELECT COUNT(*) AS count, SUM(bank_charge) as bank_charges, SUM(total_charges) as total_charges, SUM(amount) as amount FROM tbl_bank_deposites_receive where DATE(created_on)  >= ? AND DATE(created_on) <= ?";

      let sqlDate = "SELECT COUNT(*) AS count, SUM(bank_charge) as bank_charges, SUM(total_charges) as total_charges, SUM(amount) as amount FROM tbl_bank_deposites_receive where DATE(created_on) = ?";

      let sqlSearch = `select COUNT(*) AS count, SUM(bank_charge) as bank_charges, SUM(total_charges) as total_charges, SUM(amount) as amount from tbl_bank_deposites_receive where trx_id LIKE '%${searchItem}%'`;

      let result = await mysqlcon(
        to && from
        ? sqlToFrom
        : date
        ? sqlDate
        : searchItem
        ? sqlSearch
        : sql,
        to && from
        ? [from, to]
        : date
        ? [date]
        : searchItem
        ? [searchItem]
        : []
      );


      let transaction;
      let bankFees;
      let totalCharges;
      let totalAmount;

      if(result[0].count === null){
        transaction = 0
      } else{
        transaction = result[0].count
      }

      if(result[0].bank_charges === null){
        bankFees = 0
      } else{
        bankFees = result[0].bank_charges.toFixed(2)
      }

      if(result[0].total_charges === null){
        totalCharges = 0
      } else{
        totalCharges = result[0].total_charges.toFixed(2)
      }

      if(result[0].amount === null){
        totalAmount = 0
      } else{
        totalAmount = result[0].amount.toFixed(2)
      }

      if ((result[0].count) === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total Settlement Received",
              amount: 0,
            },
            {
              name: "Total Bank Fees/Charges",
              amount: 0,
            },
            {
              name: "Total Commission/Charges",
              amount: 0,
            },
            {
              name: "Net Settlement",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total Transactions",
              amount: transaction,
            },
            {
              name: "Total Bank Fees/Charges",
              amount: bankFees,
            },
            {
              name: "Total Commission/Charges",
              amount: totalCharges,
            },
            {
              name: "Total Amount",
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

module.exports = new BankDeposit();
