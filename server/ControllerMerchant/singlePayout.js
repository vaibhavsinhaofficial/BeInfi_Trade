const mysqlcon = require("../config/db_connection");
var dateTime = require("node-datetime");
var md5 = require("md5");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

module.exports.singlePayoutCurrency = async function(req, res) {
  try {
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [req.user.id]);
    const options = [];

    if (testResult.length > 0) {
      const countryList = testResult[0].solution_apply_for_country.split(',');
      for (const country of countryList) {
          const test1 = "SELECT id, sortname FROM countries WHERE id = ? ORDER BY name";
          const test1Result = await mysqlcon(test1, [country]);
          options.push({ value: test1Result[0].id, text: test1Result[0].sortname });
      }
    }
    function generateRandomString(length) {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       result += characters[randomIndex];
      }
      return result;
     }

    const user_id=req.user.id;
    const id=user_id.toString()
    const dt=dateTime.create();
    var formatted_time=dt.format("H:M:S")
    var transactionId = id +generateRandomString(1) + md5(formatted_time);

    return res.json(200, {
      data: options,
      transactionId,
      wallet_amount: req.user.wallet
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}

module.exports.singlePayoutBankcodes = async function(req, res) {
    try {
        const test = "SELECT payment_gateway.gateway_name, gatewayNo FROM `payout_gateway_detail` INNER JOIN payment_gateway ON payment_gateway.id = payout_gateway_detail.gatewayNo WHERE payout_gateway_detail.merNo = ? AND payout_gateway_detail.currency = ?";
        const testResult = await mysqlcon(test, [req.user.id, req.body.currency]);

        return res.json(200, {
            data: testResult
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
}

module.exports.singlePayoutCreate=async(req,res)=> {
  let {uniqueid,currency,amount,customer_name,creditacc,bank_name,email,contact,address,state,city,remark,branch,trx_type, ifsc} = req.body;
  
  try{
    const payout_charge = "SELECT payout_amount, gst_amount FROM `tbl_merchant_charges` WHERE user_id = ? AND currency_code = ?"
    const payout_result = await mysqlcon(payout_charge,[req.user.id, currency])
    const modifiedValue = uniqueid.substring(2);
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
        users_id: req.user.id,
        uniqueid : modifiedValue,
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
        users_id: req.user.id,
        uniqueid : modifiedValue,
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
      const updateWalletResult = await mysqlcon(updateWallet,[updated_wallet, req.user.id])
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
  