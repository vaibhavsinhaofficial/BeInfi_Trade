const mysqlcon = require("../config/db_connection"); 
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

const Invoice = {
  allInvoice: async (req, res) => {
    try {
      const user = req.user;
      const merchant_id = user.id;
      const { from, to, date, paid, unpaid, pending, overdue } = req.body;
  
      // Calculate the date range filter
      let dateFilter = "";
      if (date) {
        dateFilter = ` AND DATE(send_date) = '${date}'`;
      } else if (from && to) {
        dateFilter = ` AND DATE(send_date) BETWEEN '${from}' AND '${to}'`;
      }
  
      // Construct the base query
      let baseQuery = `SELECT invoice_no, fname, lname, DATE_FORMAT(send_date,'%Y-%m-%d') AS send, DATE_FORMAT(due_date,'%Y-%m-%d') AS due, email, amount, tax_amount, pay_status, created_on FROM tbl_user_invoice WHERE merchant_id = ${merchant_id}`;
  
      // Apply the filters
      if (paid) {
        baseQuery += " AND pay_status = 1";
      } else if (unpaid) {
        baseQuery += " AND pay_status = 0";
      } else if (pending) {
        baseQuery += " AND pay_status NOT IN (1, 0) AND DATE(due_date) <= DATE(now())";
      } else if (overdue) {
        baseQuery += " AND pay_status NOT IN (1, 0) AND DATE(due_date) > DATE(now())";
      }
  
      // Apply the date filter
      baseQuery += dateFilter;
  
      // Calculate the total count query
      const totalCountQuery = `SELECT COUNT(*) AS Total FROM (${baseQuery}) AS subQuery`;
  
      // Execute the total count query
      const totalCountResult = await mysqlcon(totalCountQuery);
      const total = totalCountResult[0].Total;
      // const page = req.body.page ? Number(req.body.page) : 1;
      // const { limit1, start, numOfPages } = pagination(total, page);
  
      // Retrieve icon values based on conditions
      let iconQuery = `SELECT COUNT(*) as all_invoice,`;
      let cardData = [];

      // Check conditions and set cardData amounts accordingly
      if (paid) {
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 1) as paid_amount`;
        const paidTotalQuery = `SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 1`;
        const paidTotalResult = await mysqlcon(paidTotalQuery);
        const paidTotal = paidTotalResult[0].Total;
        cardData.push({ name: "All Invoice", amount: paidTotal, percentage: 32 });
        cardData.push({ name: "Paid Amount", amount: 0, percentage: 40 });
        cardData.push({ name: "Unpaid Amount", amount: 0, percentage: 60 });
        cardData.push({ name: "Due Amount", amount: 0, percentage: 20 });
      } else if (unpaid) {
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 0) as unpaid_amount`;
        const unpaidTotalQuery = `SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 0`;
        const unpaidTotalResult = await mysqlcon(unpaidTotalQuery);
        const unpaidTotal = unpaidTotalResult[0].Total;
        cardData.push({ name: "All Invoice", amount: unpaidTotal, percentage: 32 });
        cardData.push({ name: "Paid Amount", amount: 0, percentage: 40 });
        cardData.push({ name: "Unpaid Amount", amount: 0, percentage: 60 });
        cardData.push({ name: "Due Amount", amount: 0, percentage: 20 });
      } else if (pending) {
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status NOT IN (1, 0) AND DATE(due_date) <= DATE(now())) as due_amount`;
        const dueTotalQuery = `SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status NOT IN (1, 0) AND DATE(due_date) <= DATE(now())`;
        const dueTotalResult = await mysqlcon(dueTotalQuery);
        const dueTotal = dueTotalResult[0].Total;
        cardData.push({ name: "All Invoice", amount: dueTotal, percentage: 32 });
        cardData.push({ name: "Paid Amount", amount: 0, percentage: 40 });
        cardData.push({ name: "Unpaid Amount", amount: 0, percentage: 60 });
        cardData.push({ name: "Due Amount", amount: 0, percentage: 20 });
      } else if (overdue) {
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status NOT IN (1, 0) AND DATE(due_date) > DATE(now())) as overdue_amount`;
        const overdueTotalQuery = `SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status NOT IN (1, 0) AND DATE(due_date) > DATE(now())`;
        const overdueTotalResult = await mysqlcon(overdueTotalQuery);
        const overdueTotal = overdueTotalResult[0].Total;
        cardData.push({ name: "All Invoice", amount: overdueTotal, percentage: 32 });
        cardData.push({ name: "Paid Amount", amount: 0, percentage: 40 });
        cardData.push({ name: "Unpaid Amount", amount: 0, percentage: 60 });
        cardData.push({ name: "Due Amount", amount: 0, percentage: 20 });
      } else {
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 1) as paid_amount,`;
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status = 0) as unpaid_amount,`;
        iconQuery += `(SELECT SUM(amount) FROM tbl_user_invoice WHERE merchant_id = ${merchant_id} AND pay_status NOT IN (1, 0) AND DATE(due_date) <= DATE(now())) as due_amount`;
        const allTotalQuery = `SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ${merchant_id}`;
        const allTotalResult = await mysqlcon(allTotalQuery);
        const allTotal = allTotalResult[0].Total;
        cardData.push({ name: "All Invoice", amount: allTotal, percentage: 32 });
        cardData.push({ name: "Paid Amount", amount: 0, percentage: 40 });
        cardData.push({ name: "Unpaid Amount", amount: 0, percentage: 60 });
        cardData.push({ name: "Due Amount", amount: 0, percentage: 20 });
      }
      iconQuery += ` FROM tbl_user_invoice WHERE merchant_id = ${merchant_id}`;
  
      // Execute the icon query
      const iconResult = await mysqlcon(iconQuery);
      const icon = iconResult[0];
  
      // Apply pagination to the base query
      const paginatedQuery = `${baseQuery} ORDER BY send_date DESC`;
  
      // Execute the paginated query
      const data = await mysqlcon(paginatedQuery);
  
      // Update cardData based on conditions
      if (paid) {
        cardData[1].amount = icon.paid_amount;
      } else if (unpaid) {
        cardData[2].amount = icon.unpaid_amount;
      } else if (pending) {
        cardData[3].amount = icon.due_amount;
      } else if (overdue) {
        cardData[3].amount = icon.overdue_amount;
      } else {
        cardData[1].amount = icon.paid_amount;
        cardData[2].amount = icon.unpaid_amount;
        cardData[3].amount = icon.due_amount;
      }
  
      return res.json(200, {
        message: `Showing ${data.length} from ${total}`,
        card: cardData,
        data
      });
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "An error occurred",
        error
      });
    }
  },
    
  new_invoice: async (req, res) => {
    let user = req.user;
    let request = req.body;
    console.log(Date._now);
    let new_invoice;

    try {
      if (!request.taxable) {
        new_invoice = {
          merchant_id: user.id,
          invoice_no: request.invoice_no,
          send_date: formattedIST,
          due_date: request.due_date,
          fname: request.fname,
          lname: request.lname,
          email: request.email,
          amount: request.amount,
          currency: request.currency,
          description: request.description,
        };
      } else {
        new_invoice = {
          merchant_id: user.id,
          invoice_no: request.invoice_no,
          send_date: formattedIST,
          due_date: request.due_date,
          fname: request.fname,
          lname: request.lname,
          email: request.email,
          amount: request.amount,
          currency: request.currency,
          tax_amount: (request.amount * request.tax) / 100,
          description: request.description,
        };
      }

      let sql = "INSERT INTO tbl_user_invoice SET ?";

      let inserted = await mysqlcon(sql, [new_invoice]);

      return res.status(200).json({
        message: "Your invoice created and send successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occure",
        error,
      });
    } 
  },

 
  downloadInvoice: async (req, res)=>{
    
    let {status,from,to ,date}  = req.body
    // console.log(req.body);

    let {id} = req.user;
    
    try{
      
      if(from && to && status){
        let sql = "SELECT * FROM tbl_user_invoice WHERE merchant_id = ? AND Date(created_on) >= ? AND Date(created_on) <= ? AND pay_status = ?"
        let result = await mysqlcon(sql,[id,from,to,status])
        
        if(result === 0){
          return res.send(result)
        }else{
          return res.send(result)
        }

      }else if(status){
        let sql = "SELECT * FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = ?"
        let result = await mysqlcon(sql,[id,status])
        
        if(result === 0){
          return res.send(result)
        }else{
          return res.send(result)
        }
      }else if(from && to){
        let sql = "SELECT * FROM tbl_user_invoice WHERE merchant_id = ? AND Date(created_on) >= ? AND Date(created_on) <= ? "
        let result = await mysqlcon(sql,[id,from,to])

        if(result === 0){
          return res.send(result)
        }else{
          return res.send(result)
        }
      }else if(date){
        let sql = "SELECT * FROM tbl_user_invoice WHERE merchant_id = ? AND DATE(created_on) = ?"
        let result = await mysqlcon(sql,[id,date])

        if(result === 0){
          return res.send(result)
        }else{
          return res.send(result)
        }
      }else{
        let sql = "SELECT * FROM tbl_user_invoice WHERE merchant_id = ?"
        let result = await mysqlcon(sql,[id])

        if(result === 0){
          return res.send(result)
        }else{
          return res.send(result)
        }
      }
    }catch(error){
      console.log(error)
      return res.json(500,{
        message : 'error'
      })
    }
  },
};

module.exports = Invoice;
