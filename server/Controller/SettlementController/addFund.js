const mysqlcon = require("../../config/db_connection");
const Pagination = require("../../services/pagination");
class AddFund {
  async default(req, res) {
    try {
      const { to, from, date, pageNumber, searchItem } = req.body;
      let sqlAllCount =
        "select count (*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id";
      let sqCountDate =
        "select count (*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where DATE(tbl_wallet_update_log.created_on) = ?";
      let sqlToFromCount =
        "select count (*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where DATE(tbl_wallet_update_log.created_on)  >= ? AND DATE(tbl_wallet_update_log.created_on) <= ?";
      let sqlSearchCount = `select count (*) as Total from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where tbl_wallet_update_log.merchant_id LIKE '%${searchItem}%'`;

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
        "select tbl_user.name as merchant_name, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id ORDER BY tbl_wallet_update_log.created_on DESC limit ?,?";
      let sqlDate =
        "select tbl_user.name as merchant_name, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where DATE(tbl_wallet_update_log.created_on) = ? ORDER BY tbl_wallet_update_log.created_on DESC limit ?,?";
      let sqlToFrom =
        "select tbl_user.name as merchant_name, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where DATE(tbl_wallet_update_log.created_on)  >= ? AND DATE(tbl_wallet_update_log.created_on) <= ? ORDER BY tbl_wallet_update_log.created_on DESC limit ?,?";
      let sqlSearch = `select tbl_user.name as merchant_name, tbl_wallet_update_log.*, DATE_FORMAT(tbl_wallet_update_log.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from tbl_wallet_update_log LEFT JOIN tbl_user ON tbl_user.id = tbl_wallet_update_log.merchant_id where tbl_wallet_update_log.merchant_id LIKE '%${searchItem}%'`;

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
      console.log(error)
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  async curMer(req, res) {
    try {
      const sqlMer = "select name as label, id from tbl_user";
      const sqlCurr = "select id, sortname as label from countries WHERE status = 1";
      const merchant = await mysqlcon(sqlMer);
      const currency = await mysqlcon(sqlCurr);
      res.status(200).json({ merchant, currency });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async murAndCurSelect(req, res) {
    try {
      const { merId } = req.body;
      // console.log(merId)
      // const { merId, currency } = req.body;
      // if (!merId || !currency) {
      //   return res
      //     .status(400)
      //     .json({ message: "Kidly provid Id and Currency" });
      // }
      // const sql =
      //   "select SUM(amount) as total from tbl_icici_payout_transaction_response_details where users_id = ? AND currency = ? ";
      // const sql2 =
      //   "select SUM(ammount) as total from tbl_merchant_transaction where user_id = ? AND ammount_type = ? ";
      // const result1 = await mysqlcon(sql, [merId, currency]);
      // const result2 = await mysqlcon(sql2, [merId, currency]);
      // res
      //   .status(200)
      //   .json({ preBal: Number(result2[0].total) - Number(result1[0].total) });
      let sql = "SELECT wallet FROM tbl_user WHERE id = ?"
      const result = await mysqlcon(sql, [merId])
      res
        .status(200)
        .json({ preBal: result });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // async addFund(req, res) {
  //   try {
  //     const date = new Date();
  //     const {
  //       selectMer,
  //       merchant_name,
  //       current_amount,
  //       currency,
  //       addBal,
  //       option,
  //       available_balance,
  //       wallet_current_amount,
  //     } = req.body;
  //     if (
  //       selectMer===undefined ||
  //       merchant_name ===undefined||
  //       current_amount ===undefined||
  //       currency ===undefined||
  //       addBal ===undefined||
  //       option ===undefined||
  //       available_balance ===undefined||
  //       wallet_current_amount===undefined
  //     ) {
  //       return res.status(400).json({ message: "All Field Required" });
  //     }
  //     let { firstname,lastname } = req.user;
  //     const insertData = {
  //       merchant_id: selectMer,
  //       merchant_name,
  //       current_amount,
  //       currency,
  //       wallet_current_amount,
  //       add_amount: addBal,
  //       available_balance,
  //       funds_added_by: `${firstname} ${lastname}`,
  //       created_on : date,
  //       updated_on : date
  //       // type: option,
  //     };
  //     const sqlSettCurr =
  //       "Select settle_currency,wallet from tbl_user where id=? ";
  //     const sqlSettRate =
  //       "Select rate from tbl_user_settled_currency where deposit_currency=? AND settled_currency= ? ";
  //     const result = await mysqlcon(sqlSettCurr, [selectMer]);
  //     const result2 = await mysqlcon(sqlSettRate, [
  //       currency,
  //       result[0].settle_currency,
  //     ]);
  //     let FinalDataForWallet = 0;
  //     if(Number(option) === 1){
  //       FinalDataForWallet = result[0].wallet + (Number(addBal) / result2[0]?.rate ? Number(addBal) / result2[0]?.rate : 1)
  //     } else {
  //       FinalDataForWallet = result[0].wallet - (Number(addBal) / result2[0]?.rate ? Number(addBal) / result2[0]?.rate : 1)
  //     }
  //     // const FinalDataForWallet =
  //     //   Number(option) === 1
  //     //     ? result[0].wallet +
  //     //       (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1)
  //     //     : result[0].wallet -
  //     //       (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1);
  //     const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
  //     await mysqlcon(sqlForWall, [FinalDataForWallet, selectMer]);
  //     const sqlForAddFund = "INSERT INTO tbl_add_settlement_fund SET ?";
  //     await mysqlcon(sqlForAddFund, [insertData]);
  //     res.status(200).json({ message: "Fund Added Successfully✅" });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

  async addFund(req, res) {
    try {
      const date = new Date();
      // console.log(req.body);
      if (
        req.body.merchant_id===undefined ||
        req.body.objective ===undefined||
        req.body.currency ===undefined||
        req.body.effective_amt===undefined||
        req.body.remarks===undefined
      ) {
        return res.status(400).json({ message: "All Field Required" });
      }
      const sqlSettCurr = "Select settle_currency,wallet from tbl_user where id = ? ";
      const result = await mysqlcon(sqlSettCurr, [req.body.merchant_id]);
      let FinalAddForWallet = result[0].wallet + (Number(req.body.effective_amt))
      let FinalSubForWallet = result[0].wallet - (Number(req.body.effective_amt))
      // let role = req.user.role;
      let loginDetails;
      if(req.user.group_id === 1) {
        loginDetails = -1
      } else if(req.user.group_id === 2){
        if(req.user.role === 1){
          loginDetails = 1
        } else if(req.user.role === 2){
          loginDetails= 2
        }
      }
      let filtertype = req.body.filtertype ? Number(req.body.filtertype) : 1; req.body.filtertype ? Number(req.body.filtertype) : 2;
      const insertAddData = {
        merchant_id: req.body.merchant_id,
        objective: req.body.objective,
        currency: req.body.currency,
        current_wallet : result[0].wallet,
        update_wallet_tot : FinalAddForWallet,
        effective_amt: req.body.effective_amt ,
        current_action : req.body.filtertype,
        remark: req.body.remarks,
        created_on : date,
        login_admin: loginDetails
      };
      const insertSubData = {
        merchant_id: req.body.merchant_id,
        objective: req.body.objective,
        currency: req.body.currency,
        current_wallet : result[0].wallet,
        update_wallet_tot :FinalSubForWallet,
        effective_amt: req.body.effective_amt ,
        current_action : req.body.filtertype,
        remark: req.body.remarks,
        created_on : date,
        login_admin: loginDetails
      };
      if(filtertype === 1){
        const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
        await mysqlcon(sqlForWall, [FinalAddForWallet, req.body.merchant_id]);
        const sqlForAddFund = "INSERT INTO tbl_wallet_update_log SET ?";
        await mysqlcon(sqlForAddFund, [insertAddData]);
        res.status(200).json({ message: "Fund Added Successfully ✅" });
      }else if(filtertype === 2){
        const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
        await mysqlcon(sqlForWall, [FinalSubForWallet, req.body.merchant_id]);
        const sqlForAddFund = "INSERT INTO tbl_wallet_update_log SET ?";
        await mysqlcon(sqlForAddFund, [insertSubData]);
        res.status(200).json({ message: "Fund Added Successfully ✅" });
      }
    } catch(error){
      console.log(error)
      return res.json(500,{
        message : 'error'
      });
    }
  }
  async updateFund(req, res) {
    try {
      const date = new Date();
      const {
        id,
        selectMer,
        merchant_name,
        current_amount,
        currency,
        addBal,
        option,
        available_balance,
        wallet_current_amount,
      } = req.body;
      console.log(req.body);
      if (
        selectMer===undefined ||
        merchant_name ===undefined||
        current_amount ===undefined||
        currency ===undefined||
        addBal ===undefined||
        option ===undefined||
        available_balance ===undefined||
        wallet_current_amount===undefined||
        id===undefined
      ) {
        return res.status(400).json({ message: "All Field Required" });
      }
      let { firstname,lastname } = req.user;
      const insertData = {
        merchant_id: selectMer,
        merchant_name,
        current_amount,
        currency,
        wallet_current_amount,
        add_amount: addBal,
        available_balance,
        funds_added_by: `${firstname} ${lastname}` ,
        type: option,
        updated_on: date
      };
     
      const sqlSettCurr =
        "Select settle_currency,wallet from tbl_user where id=? ";
      const sqlSettRate =
        "Select rate from tbl_user_settled_currency where deposit_currency=? AND settled_currency= ? ";
      const result = await mysqlcon(sqlSettCurr, [15]);
      const result2 = await mysqlcon(sqlSettRate, [
        currency,
        result[0].settle_currency,
      ]);
      const FinalDataForWallet =
        Number(option) === 1
          ? result[0].wallet +
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1)
          : result[0].wallet -
            (Number(addBal) / result2[0]?.rate ? result2[0].rate : 1);
      const sqlForWall = "Update tbl_user SET wallet = ? WHERE id = ?";
      await mysqlcon(sqlForWall, [FinalDataForWallet, selectMer]);
      const sqlForAddFund = "Update tbl_add_settlement_fund SET ? where id = ?";
      await mysqlcon(sqlForAddFund, [insertData,id]);
      res.status(200).json({ message: "Fund Update Successfully✅" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new AddFund();
