const mysqlcon = require("../../config/db_connection");

const dashboardCount = {

  team_card_data: async function (req, res) {
    let user = req.user;
    try {
      let sql = "SELECT IF(status,1,1) AS tbl, status, ammount_type AS currency, SUM(ammount) AS amount, SUM(gst_charges) + SUM(payin_charges) AS commission, SUM(rolling_reverse_amount) AS rr FROM tbl_merchant_transaction WHERE user_id = ? AND status in (1,4,5) AND ammount_type IS NOT NULL GROUP BY status, ammount_type UNION SELECT IF(status,2,2) AS tbl, status, currency, SUM(amount) AS amount, SUM(akonto_charge) + SUM(gst_amount) AS commission,IF(status,0,0) AS rr FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND status = 'SUCCESS' AND currency IS NOT NULL GROUP BY currency UNION SELECT IF(status,3,3) as tbl, status,fromCurrency as currency, SUM(requestedAmount) AS amount, SUM(charges) as commission, SUM(net_amount_for_settlement) AS rr FROM tbl_settlement WHERE user_id = ? AND settlement_mode = 2 AND status = 1 GROUP BY status, fromCurrency";
      let sqlinternational = "SELECT IF(status,3,3) as tbl, status, fromCurrency as currency, SUM(requestedAmount) AS amount, SUM(charges) as commission, SUM(net_amount_for_settlement) AS rr FROM tbl_settlement WHERE settlement_mode = 1 AND user_id = ? AND status = 1 GROUP BY status, fromCurrency"
      let sql1 = "SELECT * FROM tbl_user_settled_currency WHERE settled_currency = ?";
      let sql2 = "SELECT symbol FROM countries WHERE sortname = ?";
      let name = "SELECT name, wallet from tbl_user where id = ?"

      let result = await mysqlcon(sql, [user.parent_id, user.parent_id, user.parent_id]);
      let result3 = await mysqlcon(sqlinternational, [user.parent_id])
      let result1 = await mysqlcon(sql1, [user.settle_currency]);
      let result2 = await mysqlcon(sql2, [user.settle_currency == 'USDT' ? 'USD' :user.settle_currency]);
      let nameresult = await mysqlcon(name, [user.parent_id])
      // return res.send()

      let data = {
        id: user.parent_id,
        name: nameresult[0].name,
        available_balance: result2[0].symbol + " " + nameresult[0].wallet.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        deposit: result2[0].symbol + " " + (result.filter((item) => item.tbl === 1 && item.status == 1 && item.currency != null).reduce((total, curr) => { return total += ((Number(curr.amount) + Number(curr.commission)) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        commission: result2[0].symbol + " " + (result.filter((item) => item.currency != null).reduce((total, curr) => { return total += (curr.commission) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        rolling_reverse: result2[0].symbol + " " +  result.filter((item) => item.tbl === 1 && item.currency != null && (item.status == 1 || item.status == 4 || item.status == 5)).reduce((total, curr) => {
          const rate = (result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1;
          const rr = Number(curr.rr);
          return isNaN(rr) ? total : total + (rr / rate);
        }, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        refund_nd_chargeback: result2[0].symbol + " " + (result.filter((item) => item.tbl === 1 && item.currency != null && (item.status == 4 || item.status == 5)).reduce((total, curr) => { return total += ((Number(curr.amount) - Number(curr.commission)) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        local_settlement: result2[0].symbol + " " + (result.filter((item) => item.tbl === 3 && item.status == 1  && item.currency != null).reduce((total, curr) => { return total += ((Number(curr.amount) - Number(curr.commission)) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        international_settlement: result2[0].symbol + " " + (result3.filter((item) => item.tbl === 3 && item.status == 1 && item.currency != null).reduce((total, curr) => { return total += ((Number(curr.amount) - Number(curr.commission)) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

        payout: result2[0].symbol + " " + (result.filter((item) => item.status === "SUCCESS" && item.currency != null).reduce((total, curr) => { return total += (Number(curr.amount) + Number(curr.commission)) / ((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1) }, 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      }
      return res.status(200).json({
        status: true,
        message: "User card data - ",
        data: data
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Error to complete task.', error });
    }
  },

  team_success_rate: async function (req, res) {
    let user = req.user;                    
    try {
      sql = "select status from  tbl_merchant_transaction where user_id = ?"; //WHERE user_id = ? user_id
      let result = await mysqlcon(sql,[user.parent_id]);
      let total = result.length;
      if(total<1){
        return res.status(200).json({
          status: true,
          message: "data sent successfully",
          data: 0,
        });
      }

      let successCount = 0;
      for (let i = 0; i < total; i++) {
        if (result[i].status === 1) {
          successCount += 1;
        }
      }
      successPercent = Math.round((successCount / total) * 100);
      res.status(200).json({
        status: true,
        message: "data sent successfully",
        data: successPercent,
      });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
     
    }
  },
 
  team_top_transaction_today: async function (req, res) {
    let user = req.user;

    try {
        let { val } = req.body;
        let sql;
        if(val === "month"){
          sql = "SELECT invoice_id as id, user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, IF(order_no, order_no, txn_id) as order_no, ammount as amount, IF(invoice_id, '1', '1') as transaction_type, ammount_type as currency, status, payment_type as payment_method, i_flname as customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction WHERE user_id = ? AND created_on >= DATE(NOW()) - INTERVAL 30 DAY UNION  SELECT id, uniqueid as order_no, users_id as user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, amount, IF(id, '2', '2') as transaction_type, currency, status, trx_type as payment_method, customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND created_on >= DATE(NOW()) - INTERVAL 30 DAY ORDER BY created_on DESC LIMIT 0, 10 "
        } else if (val === "week") {
          sql = "SELECT invoice_id as id, user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, IF(order_no, order_no, txn_id) as order_no, ammount as amount, IF(invoice_id, '1', '1') as transaction_type, ammount_type as currency, status, payment_type as payment_method, i_flname as customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction WHERE user_id = ? AND created_on >= DATE(NOW()) - INTERVAL 6 DAY  UNION SELECT id, uniqueid as order_no, users_id as user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, amount, IF(id, '2', '2') as transaction_type, currency, status, trx_type as payment_method, customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND created_on >= DATE(NOW()) - INTERVAL 6 DAY ORDER BY created_on DESC LIMIT 0, 10 "
        } else {
          sql = "SELECT invoice_id as id, user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, IF(order_no, order_no, txn_id) as order_no, ammount as amount, IF(invoice_id, '1', '1') as transaction_type, ammount_type as currency, status, payment_type as payment_method, i_flname as customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_merchant_transaction WHERE user_id = ? AND created_on >= DATE(NOW()) - INTERVAL 0 DAY UNION SELECT id, uniqueid as order_no, users_id as user_id, DATE(NOW()) - INTERVAL 0 DAY as txn_date, amount, IF(id, '2', '2') as transaction_type, currency, status, trx_type as payment_method, customer_name, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND created_on >= DATE(NOW()) - INTERVAL 0 DAY ORDER BY created_on DESC LIMIT 0, 10 "
         }
  
         let  result = await mysqlcon(sql, [user.parent_id, user.parent_id]);
        res.status(200).json({data:result})
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },

  team_payout_icon: async (req, res) => {
    let user = req.user;
    try{
        let sql = "SELECT IF(ammount, 1, 1) as tbl, COUNT(ammount) as count,SUM(ammount) as amount, ammount_type as currency, (CASE WHEN hour(created_on) < 4 then '00-04' WHEN hour(created_on) >= 4 and hour(created_on) < 8 then '04-08' WHEN hour(created_on) >= 8 and hour(created_on) < 12 then '08-12' WHEN hour(created_on) >= 12 and hour(created_on) < 16 then '12-16' WHEN hour(created_on) >= 16 and hour(created_on) < 20 then '16-20' ELSE '20-24' END) AS hr FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND DATE(created_on) = DATE(NOW()) GROUP BY currency, hr, ammount UNION SELECT IF(amount, 2, 2) tbl, COUNT(amount), SUM(amount), currency,(CASE WHEN hour(created_on) < 4 then '00-04' WHEN hour(created_on) >= 4 and hour(created_on) < 8 then '04-08' WHEN hour(created_on) >= 8 and hour(created_on) < 12 then '08-12' WHEN hour(created_on) >= 12 and hour(created_on) < 16 then '12-16' WHEN hour(created_on) >= 16 and hour(created_on) < 20 then '16-20' ELSE '20-24' END) AS hr FROM `tbl_icici_payout_transaction_response_details` WHERE DATE(created_on) = DATE(NOW()) AND users_id = ? and status = 'SUCCESS' GROUP BY currency, hr, amount";
        let sql1 = "SELECT * FROM tbl_user_settled_currency WHERE settled_currency = ?";
        let sql2 = "SELECT symbol FROM countries WHERE sortname = ?";
        let result = await mysqlcon(sql, [user.parent_id, user.parent_id]);
        let result1 = await mysqlcon(sql1, [user.settle_currency]);
        let result2 = await mysqlcon(sql2, [user.settle_currency == 'USDT' ? 'USD' :user.settle_currency]);
        let deposit_data = []
        let payout_data = []
        deposit_data[0] = result.filter((item) => item.hr === '00-04' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        deposit_data[1] = result.filter((item) => item.hr === '04-08' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        deposit_data[2] = result.filter((item) => item.hr === '08-12' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        deposit_data[3] = result.filter((item) => item.hr === '12-16' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        deposit_data[4] = result.filter((item) => item.hr === '16-20' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        deposit_data[5] = result.filter((item) => item.hr === '20-24' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        let dep_count = deposit_data.map((item, index) => (item.count));
        let dep_total = result2[0].symbol +" " + deposit_data.reduce((total, curr) => { return total += curr.amount }, 0).toFixed(2);
    
        payout_data[0] = result.filter((item) => item.hr === '00-04' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        payout_data[1] = result.filter((item) => item.hr === '04-08' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        payout_data[2] = result.filter((item) => item.hr === '08-12' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        payout_data[3] = result.filter((item) => item.hr === '12-16' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        payout_data[4] = result.filter((item) => item.hr === '16-20' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        payout_data[5] = result.filter((item) => item.hr === '20-24' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
        let pay_count = payout_data.map((item, index) => (item.count));
        let pay_total = result2[0].symbol + " " + payout_data.reduce((total, curr) => { return total += curr.amount }, 0).toFixed(2);
    
        return res.status(200).json({
            status: true,
            message: "Deposit & Payout icon data - ",
            data: {
              dep_total: dep_total,
              dep_count: dep_count,
              pay_total: pay_total,
              pay_count: pay_count
            }
        });    
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Error to complete task.', error });
    }
  },

  team_daily_sale_count_icon: async (req, res) => {
  let user = req.user;
  try {
      let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
      let sql = "SELECT DATE_FORMAT(created_on, '%d-%m') AS day, SUM(ammount) AS total, ammount_type AS currency FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND DATE(created_on) >= DATE(NOW()) - INTERVAL 6 DAY GROUP BY DATE_FORMAT(created_on, '%d-%m'), currency, ammount_type ORDER BY MIN(created_on) ASC";
      let sql1 = "SELECT deposit_currency, rate FROM tbl_user_settled_currency WHERE settled_currency = ?";
   
      let result = await mysqlcon(sql, [user.parent_id]);
      let result1 = await mysqlcon(sql1, [user.settle_currency]);
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return (("0" + (d.getDate())).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + " " + day[d.getDay()]);
      })
      let data = {}
      dates.forEach(item => {
        data[item] = 0
        let data_per_day = (result.filter((item1) => item1.day === item.split(' ')[0]))
        for (x of data_per_day) {
          let exchange_rate = result1.filter((item) => item.deposit_currency == x.currency).reduce((total, current) => { return current.rate }, 1)
          data[item] += Number((x.total/exchange_rate).toFixed(2))
        }
      });
      return res.status(200).json({
        status: true,
        message: "Daily Sales count - ",
        data: data
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Error to complete task.', error });
    }
  },
  
  team_monthly_transaction: async (req, res) => {
  let user = req.user;
  try {
      let sql = "SELECT IF(created_on, 1, 1) as tbl, MONTH(created_on) as month, SUM(ammount) as amount from tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND YEAR(created_on) = YEAR(NOW()) AND MONTH(created_on) >= 1  GROUP BY tbl, MONTH(created_on) UNION SELECT IF(created_on, 2, 2) as tbl, MONTH(created_on) as month, SUM(amount) as amount from tbl_icici_payout_transaction_response_details WHERE users_id = ? AND status= 'SUCCESS' AND YEAR(created_on) = YEAR(NOW()) AND MONTH(created_on) >= 1  GROUP BY tbl, MONTH(created_on);";
    
      let result = (await mysqlcon(sql, [user.parent_id, user.parent_id]));
      let deposit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let payout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (x in result) {
        if (result[x].tbl === 1) {
          deposit[(result[x].month) - 1] = Number(result[x].amount);
        }
        else {
          payout[(result[x].month) - 1] = Number(result[x].amount);
        }
      }
      return res.status(200).json({
        status: true,
        message: "Last 12 month Transections of deposit & payout ",
        data: {
          deposit: deposit,
          payout: payout
        }
      });
  }
  catch (Error) {
      console.log(Error)
      res.status(500).json({ status: false, message: 'Error to complete task.', Error });
  }
    finally {
      console.log("Execution completed.");
    }
  },

  team_weekly_transaction: async (req, res) => {
    let user = req.user;
    try {
      let sql = "SELECT IF(created_on, 1, 1) as tbl, WEEKDAY(created_on) as day, SUM(ammount) as amount FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND created_on >= NOW() - INTERVAL WEEKDAY(NOW()) DAY GROUP BY tbl, WEEKDAY(created_on) UNION SELECT IF(created_on, 2, 2) as tbl, WEEKDAY(created_on) as day, SUM(amount) as amount FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND status = 'SUCCESS' AND created_on >= NOW() - INTERVAL WEEKDAY(NOW()) DAY GROUP BY tbl, WEEKDAY(created_on)";
    
      let result = (await mysqlcon(sql, [user.parent_id, user.parent_id]));
      let deposit = [0, 0, 0, 0, 0, 0, 0];
      let payout = [0, 0, 0, 0, 0, 0, 0];
      for (x in result){
        if (result[x].tbl === 1) {
          deposit[result[x].day] = Number(result[x].amount);
        }
        else {
          payout[result[x].day] = Number(result[x].amount);
        }
      }
      return res.status(200).json({
        status: true,
        message: "Last week Transections of deposit & payout ",
        data: {
          deposit: deposit,
          payout: payout
        }
      });    
      
    }
    catch (Error) {
      console.log(Error)
      res.status(500).json({ status: false, message: 'Error to complete task.', Error });
    }
    finally {
      console.log("Execution completed.");
    }
  },

  team_payment_type: async function (req, res) {
    let user = req.user;
    try {        
        let sql = "select payment_type,ammount from tbl_merchant_transaction where user_id = ?";
        let result = await mysqlcon(sql,[user.parent_id]);
        upi_amt = 0;
        wallet_amt = 0;
        card_amt = 0;
        netbanking_amt = 0;
        upi_count = 0;
        wallet_count = 0;
        card_count = 0;
        netbanking_count = 0;
        total_count = result.length;

        for (i of result) {
            if (
            i.payment_type === "CREDIT CARD" ||
            i.payment_type === "DEBIT CARD"
            ) {
            card_count += 1;
            card_amt += parseInt(i.ammount);
            } else if (i.payment_type === "UPI") {
            upi_count += 1;
            upi_amt += parseInt(i.ammount);
            } else if (i.payment_type === "NetBanking") {
            netbanking_count += 1;
            netbanking_amt += parseInt(i.ammount);
            } else {
            wallet_count += 1;
            wallet_amt += parseInt(i.ammount);
            }
        }
        upi_percent = Math.round((upi_count / total_count) * 100);
        wallet_percent = Math.round((wallet_count / total_count) * 100);
        card_percent = Math.round((card_count / total_count) * 100);
        netbanking_percent = Math.round((netbanking_count / total_count) * 100);

        let data = {
            upi: { total: upi_amt, percent: upi_percent },
            card: { total: card_amt, percent: card_percent },
            wallet: { total: wallet_amt, percent: wallet_percent },
            netbanking: { total: netbanking_amt, percent: netbanking_percent },
        };

        res.status(200).json({ status: true, message: "data sent successfully", data: data });
        
    } catch (Error) {
    res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },

  team_dbycurrency: async function (req, res) {
    let user = req.user;
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [user.parent_id]);
    const results = [];

    if (testResult.length > 0) {
      const countryList = testResult[0].solution_apply_for_country.split(',');
      for (const country of countryList) {
        const test1 = "SELECT sortname FROM countries WHERE id = ? ORDER BY name";
        const test1Result = await mysqlcon(test1, [country]);
        results.push(test1Result[0].sortname);
      }
    }

    try {
      
      let { today, week, month } = req.body;
      let sql;
      let output = [];
        if (today) {
          for (let i = 0; i < results.length; i++) {
            sql =
              "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE status = 1 AND user_id = ? AND ammount_type = ? AND DATE(created_on) = DATE(NOW())) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' AND users_id = ? AND currency = ? AND DATE(created_on) = DATE(NOW())) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE status = 1 AND user_id = ? AND fromCurrency = ? AND DATE(created_on) = DATE(NOW())) as settlementSum";
  
            let result = await mysqlcon(sql, [
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
            ]);
  
            if (result.length !== 0) {
              output.push({
                currency: results[i],
                depositSum: result[0].depositSum.toFixed(2),
                payoutSum: result[0].payoutSum.toFixed(2),
                settlementSum: result[0].settlementSum.toFixed(2),
                net:
                  (result[0].depositSum +
                  result[0].settlementSum -
                  result[0].payoutSum).toFixed(2),
              });
            }
          }
  
          return res.json(200, {
            message: "Today data",
            data: output,
          });
        }
  
        if (week) {
          for (let i = 0; i < results.length; i++) {
            sql =
              "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE status = 1 AND user_id = ? AND ammount_type = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' AND users_id = ? AND currency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE status = 1 AND user_id = ? AND fromCurrency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as settlementSum";
  
            let result = await mysqlcon(sql, [
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
            ]);
  
            if (result.length !== 0) {
              output.push({
                currency: results[i],
                depositSum: result[0].depositSum.toFixed(2),
                payoutSum: result[0].payoutSum.toFixed(2),
                settlementSum: result[0].settlementSum.toFixed(2),
                net:
                  (result[0].depositSum +
                  result[0].settlementSum -
                  result[0].payoutSum).toFixed(2),
              });
            }
          }
  
          return res.json(200, {
            message: "Weekly data",
            data: output,
          });
        }
  
        if (month) {
          for (let i = 0; i < results.length; i++) {
            sql =
              "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE status = 1 AND user_id = ? AND ammount_type = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' AND users_id = ? AND currency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE status = 1 AND user_id = ? AND fromCurrency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as settlementSum";
  
            let result = await mysqlcon(sql, [
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
              user.parent_id,
              results[i],
            ]);
  
            if (result.length !== 0) {
              output.push({
                currency: results[i],
                depositSum: result[0].depositSum.toFixed(2),
                payoutSum: result[0].payoutSum.toFixed(2),
                settlementSum: result[0].settlementSum.toFixed(2),
                net:
                  (result[0].depositSum +
                  result[0].settlementSum -
                  result[0].payoutSum).toFixed(2),
              });
            }
          }
  
          return res.json(200, {
            message: "Monthly data",
            data: output,
          });
      }
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },
};

module.exports = dashboardCount;
