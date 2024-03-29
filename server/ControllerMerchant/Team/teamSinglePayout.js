const mysqlcon = require("../../config/db_connection");
var dateTime = require("node-datetime");
var md5 = require("md5");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

function getRandomAlphabet() {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet.charAt(randomIndex);
}

module.exports.teamSinglePayoutCurrency = async function(req, res) {
    try {
      const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
      const testResult = await mysqlcon(test, [req.user.parent_id]);
      const options = [];

      let wallet = "SELECT wallet FROM tbl_user WHERE id = ?";
      let walletResult = await mysqlcon(wallet, [req.user.parent_id])
      
  
      if (testResult.length > 0) {
        const countryList = testResult[0].solution_apply_for_country.split(',');
        for (const country of countryList) {
            const test1 = "SELECT id, sortname FROM countries WHERE id = ? ORDER BY name";
            const test1Result = await mysqlcon(test1, [country]);
            options.push({ value: test1Result[0].id, text: test1Result[0].sortname });
        }
      }

      const user_id=req.user.parent_id;
      const id=user_id.toString()
      var transactionId = id + getRandomAlphabet() + md5(new Date().getTime().toString());

      return res.json(200, {
        data: options,
        transactionId,
        wallet_amount: walletResult[0].wallet
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
}

module.exports.teamSinglePayoutBankcodes = async function(req, res) {
    try {
        const test = "SELECT payment_gateway.gateway_name, gatewayNo FROM `payout_gateway_detail` INNER JOIN payment_gateway ON payment_gateway.id = payout_gateway_detail.gatewayNo WHERE payout_gateway_detail.merNo = ? AND payout_gateway_detail.currency = ?";
        const testResult = await mysqlcon(test, [req.user.parent_id, req.body.currency]);

        return res.json(200, {
            data: testResult
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
}

module.exports.teamSinglePayoutCreate=async(req,res)=> {
  let {uniqueid,currency,amount,customer_name,creditacc,bank_name,email,contact,address,state,city,remark,branch,trx_type, ifsc} = req.body;
  
  try{
    const payout_charge = "SELECT payout_amount, gst_amount FROM `tbl_merchant_charges` WHERE user_id = ? AND currency_code = ?"
    const payout_result = await mysqlcon(payout_charge,[req.user.parent_id, currency])
    // const modifiedValue = uniqueid.substring(2);
    let charge;
    let gst_amount;
    if (payout_result.length > 0) {
      charge = payout_result[0].payout_amount;
      gst_amount = payout_result[0].gst_amount;
    } 
    let charges = (parseInt(amount) * charge)/100
    let PayoutAmount;
    if(currency === 'INR'){
      PayoutAmount = parseInt(amount) + charges + gst_amount
    } else {
      PayoutAmount = parseInt(amount) + charges
    }
    let details;
    if(currency=='INR') {
      details={
        users_id: req.user.parent_id,
        uniqueid : uniqueid,
        currency : currency,
        amount   : parseInt(amount) + charges + gst_amount,
        customer_name : customer_name,
        creditacc : creditacc,
        bank_name : bank_name,
        email : email,
        contact : contact,
        address : address,
        state : state,
        city : city,
        remark : remark,
        branch : branch,
        trx_type: trx_type,
        ifsc: ifsc,
        created_on: formattedIST,
        updated_on: formattedIST,
        status: 'PENDING',
        akonto_charge: charge,
        gst_amount: gst_amount
      }
    } else {
      details={
        users_id: req.user.parent_id,
        uniqueid : uniqueid,
        currency : currency,
        amount   : parseInt(amount) + charges,
        customer_name : customer_name,
        creditacc : creditacc,
        bank_name : bank_name,
        email : email,
        contact : contact,
        address : address,
        state : state,
        city : city,
        remark : remark,
        branch : branch,
        created_on: formattedIST,
        updated_on: formattedIST,
        status: 'PENDING',
        akonto_charge: charge,
      }
    }
    let updated_wallet = req.user.wallet - PayoutAmount;
    const sql = "INSERT INTO tbl_icici_payout_transaction_response_details SET ?"
    const result = await mysqlcon(sql,[details])
    if(result.affectedRows>0) {
      const updateWallet = "UPDATE tbl_user SET wallet = ? WHERE id = ?";
      const updateWalletResult = await mysqlcon(updateWallet,[updated_wallet, req.user.parent_id])
      return res.status(200).json({
        updateWalletResult,
        message: "Payout Done!! Page Will Automatically Refresh"
      })
    }    
  } catch(error) {
    console.log(error);
    return res.json(500, {
      message: "error occur",
      error,
    });
  }
}
  