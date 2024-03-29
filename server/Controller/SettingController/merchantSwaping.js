const mysqlcon = require("../../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');
let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
};

module.exports.defaultSwap = async (req, res) => {
    try {
        let sql1 = "select count(*) AS Total from merchant_bank_swap ";
        let result1 = await mysqlcon(sql1);
        let total = result1[0].Total;
        let page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;
        let { start, numOfPages } = pagination(total, page, limit);

        let sql = "SELECT tbl_user.name, tbl_akonto_banks_code.title, primary_gateway.gateway_name AS primaryGateway, switch_gateway.gateway_name AS switchGateway, merchant_bank_swap.*, DATE_FORMAT(merchant_bank_swap.creation_date, '%Y-%m-%d %H:%i:%s') AS creation_date, DATE_FORMAT(merchant_bank_swap.modification_date, '%Y-%m-%d %H:%i:%s') AS modification_date FROM merchant_bank_swap LEFT JOIN payment_gateway AS primary_gateway ON primary_gateway.id = merchant_bank_swap.primary_gateway LEFT JOIN payment_gateway AS switch_gateway ON switch_gateway.id = merchant_bank_swap.switch_gateway LEFT JOIN tbl_akonto_banks_code ON tbl_akonto_banks_code.code = merchant_bank_swap.bankcode LEFT JOIN tbl_user ON tbl_user.id = merchant_bank_swap.merchant_id";
        
        let result = await mysqlcon(sql,[start, limit])
        let startRange = start + 1;
        let endRange = start + result.length;
        
        return res.json(200, {
            message: result.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
            currentPage: page,
            totalPages: numOfPages,
            pageLimit: limit,
            data: result, 
        });
    }
    catch (err) {
        res.send(err);
    }
}

module.exports.toggleSwap = async (req, res) => {
    try {
        let { id, status } = req.body
        console.log(status)
        let sql = "UPDATE merchant_bank_swap SET status=? where id=? "
        let result = await mysqlcon(sql, [status, id]);
        res.status(200).json({
            result: status === "0" ? "Gateway Blocked Successfully" : "Gateway Unblocked Successfully"
        });
    } catch (err) {
        res.send(err)
    }
}

module.exports.deleteSwap = async (req, res) => {
    try {
      let { id } = req.body;
  
      let sql = "DELETE FROM merchant_bank_swap WHERE id = ?";
      let result = await mysqlcon(sql, [id]);
  
  
      if (result) {
        return res.json(200, {
          message: "Delete Successfully✅",
        });
      } else {
        return res.json(201, {
          message: "Error while Deleting",
        });
      }
    } catch (error) {
      return res.json(500, {
        message: "error occurered",
        error: error,
        });
    }
};

module.exports.selectBankCode = async (req, res) => {
    try {
        let sqlDefault=`SELECT CONCAT(code, '-', title) AS selectValue, code FROM tbl_akonto_banks_code;` 
        let result1=await mysqlcon(sqlDefault)
        return res.status(200).json({
            result : result1
        }
    )
  } catch(error) {
        return res.status(201).json({
            message: "error occurered",
            error: error,
        }
    )}
}

module.exports.getSwapDetails = async (req, res) =>{
    try {
        let {id}= req.body
        let sql = "SELECT primary_gateway.gateway_name AS primaryGateway, switch_gateway.gateway_name AS switchGateway, merchant_bank_swap.*, DATE_FORMAT(merchant_bank_swap.creation_date, '%Y-%m-%d %H:%i:%s') AS creation_date, DATE_FORMAT(merchant_bank_swap.modification_date, '%Y-%m-%d %H:%i:%s') AS modification_date FROM merchant_bank_swap LEFT JOIN payment_gateway AS primary_gateway ON primary_gateway.id = merchant_bank_swap.primary_gateway LEFT JOIN payment_gateway AS switch_gateway ON switch_gateway.id = merchant_bank_swap.switch_gateway WHERE merchant_bank_swap.id = ?"
        let result = await mysqlcon(sql, [id])
        return res.status(200).json({
            result : result
        })
    } catch(error) {
        return res.status(201).json({
            message: "error occurered",
            error: error,
        }
    )} 
}

module.exports.updateMerchantSwapGateway = async function (req, res) {
    try{
        let { id, merchant_id, bankcode, primary_gateway, switch_gateway } = req.body;
        let details = {
            merchant_id,
            bankcode ,
            primary_gateway,
            switch_gateway,
            modification_date : formattedIST
          };
        if(id){
            let sql = "UPDATE merchant_bank_swap SET ? where id=?";
            let result = await mysqlcon(sql, [details, id]);
            if(result){
                return res.json(200,{
                    Message : "Swap Gateway Updated ✅"
                })
            } else {
                return res.json(201, {
                message: "Error while updating",
                });
            }
        } else {
            return res.json(205, {
              message: "Kindly Provide Id",
            });    
        }
    } catch (error) {
        return res.json(500, {
          message: "error occurered",
          error: error,
        });
    }
};

module.exports.createMerchantSwap = async (req, res) => {
    try {
        const { merchant_id, bankcode, primary_gateway, switch_gateway } = req.body;

        let details={
            merchant_id,
            bankcode,
            primary_gateway,
            switch_gateway,
            status: 0,
            creation_date: formattedIST,
            modification_date: formattedIST
        }
        const sqlDefault = `INSERT INTO merchant_bank_swap SET ?`;

        let result=await mysqlcon(sqlDefault,[details])
    
        return res.status(200).json({
            message:"Data Send sucessfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: 'An error occurred ',
        });
    }
};