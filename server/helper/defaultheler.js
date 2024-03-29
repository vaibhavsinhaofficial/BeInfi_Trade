const mysqlcon = require('../config/db_connection');
const homesupport = require("./homemodel")
const axios = require('axios');
const https = require('https');
currentDate = new Date();
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + " " + time;
const fetch = require('node-fetch');
const querystring = require('querystring');
const md5 = require("md5");
const { promisify } = require('util');
const xml2js = require('xml2js');


function getSettleCurrencyName(id){
  switch (id) {
    case 1:
      return 'USD';
    case 2:
      return 'GBP';
    case 3:
      return 'INR';
    case 4:
      return 'CNY';
    default:
      return ''; // Return an empty string or handle other cases as needed
  }
}
async function currentCurrency(paymentCurrency, convertCurrency) {
  try {
    const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${paymentCurrency}`);
    
    if (response.data.rates && response.data.rates[convertCurrency]) {
      return response.data.rates[convertCurrency];
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error in currentCurrency:', error);
    return 0;
  }
};

class Default {

 

  async getMerchantDetail(usersId = null){
      const ci = getInstanceOfYourDatabaseLibrary(); // Replace with your actual database library instance creation
    
      if (usersId === null) {
        usersId = ci.session.userData('user_id');
      }
    
      const sql = "SELECT * FROM tbl_user WHERE id = ?";
      const query = await ci.db.query(sql, [usersId]);
    
      if (query && query.rowCount > 0) {
        return query.rows[0];
      } else {
        throw new Error("User not found"); // Handle this error as per your application's needs
      }
  }

  async merchantOrderDetails(order_id) {
      const detailsSql = "SELECT * FROM tbl_merchant_transaction WHERE order_no = ?";
      const detailResult = await mysqlcon(detailsSql,[order_id])
      if (detailResult > 0) {
          return rows[0]; 
      }
  }
    
  
 get_client_ip()
 {

  let ipaddress = '';
    if (process.env.HTTP_CLIENT_IP){
      ipaddress = process.env.HTTP_CLIENT_IP
    }
    else if (process.env.HTTP_CLIENT_IP){
      ipaddress = process.env.HTTP_CLIENT_IP
    }
    else if (process.env.HTTP_CLIENT_IP){
      ipaddress = process.env.HTTP_CLIENT_IP
    }
    else if (process.env.HTTP_CLIENT_IP){
        ipaddress = process.env.HTTP_CLIENT_IP
    }
    else if (process.env.HTTP_CLIENT_IP){
        ipaddress = process.env.HTTP_CLIENT_IP
    }
    else if (process.env.HTTP_CLIENT_IP){
        ipaddress = process.env.HTTP_CLIENT_IP
    }
    else{
        ipaddress = 'UNKNOWN'
    }
    return ipaddress;
  }
 
 getCardVerifyCode(card_no) 
 {
    const card_verify = {
    credit_card_amex: [34, 37],
    credit_card_cup: [5610, 560221, 560222, 560223, 560224, 560225],
    credit_card_diners: [36],
    credit_card_master: [51, 52, 53, 54, 55, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2229,
      // ... (Add all the values)
    ],
    credit_card_visa: [4],
    debit_card_rupay: [60, 6521, 6522],
    debit_card_visa: [4026, 417500, 4508, 4844, 4913, 4917],
    debit_card_maestro: [
      5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763, 6759, 676770, 676774,
      // ... (Add all the values)
    ],
  };
  
    const card = card_no.split('');
    const card1 = card[0];
    const card2 = card[0] + card[1];
    const card4 = card[0] + card[1] + card[2] + card[3];
    const card6 = card[0] + card[1] + card[2] + card[3] + card[4] + card[5];
  
    let search_string = '';
  
    if (card_verify.credit_card_amex.includes(parseInt(card2))) {
      search_string = 'credit card amex';
    } else if (
      card_verify.credit_card_cup.includes(parseInt(card4)) ||
      card_verify.credit_card_cup.includes(parseInt(card6))
    ) {
      search_string = 'credit card cup';
    } else if (card_verify.credit_card_diners.includes(parseInt(card2))) {
      search_string = 'credit card diners';
    } else if (
      card_verify.debit_card_rupay.includes(parseInt(card4)) ||
      card_verify.debit_card_rupay.includes(parseInt(card2))
    ) {
      search_string = 'debit card rupay';
    } else if (
      card_verify.debit_card_visa.includes(parseInt(card4)) ||
      card_verify.debit_card_visa.includes(parseInt(card6))
    ) {
      search_string = 'debit card visa';
    } else if (
      card_verify.debit_card_maestro.includes(parseInt(card4)) ||
      card_verify.debit_card_maestro.includes(parseInt(card6))
    ) {
      search_string = 'debit card maestro';
    } else if (
      card_verify.credit_card_master.includes(parseInt(card4)) ||
      card_verify.credit_card_master.includes(parseInt(card2))
    ) {
      search_string = 'credit card master';
    } else if (card_verify.credit_card_visa.includes(parseInt(card1))) {
      search_string = 'credit card visa';
    }
  
    return search_string;
  }
   
  async getBankChargesByCode(pg_id, search, search_column_type)
  {
    let queryColumn = search_column_type == 1 ? 'code' : 'title';
    let query = `SELECT bank_services_charge FROM tbl_code WHERE payment_gate = ? AND ?? = ? LIMIT 1`;
    let result = await mysqlcon(query,[pg_id, queryColumn, search]);
    if (result.length > 0) {
      let bankCharge = result[0].bank_services_charge;
        
        // Convert bankCharge to integer (assuming it's a numeric value)
        return parseInt(bankCharge);
    } else {
      return  0 ;
    }
  };
 
  async  getMerchantPayinCharges(pay_charge,currency_code,user_id) {
    let str = "";
if (pay_charge == 1) {
    str = "payin_card as payin_amount ";
} else if (pay_charge == 2) {
    str = "payin_upi as payin_amount ";
} else if (pay_charge == 3) {
    str = "payin_netbanking as payin_amount ";
} else if (pay_charge == 4) {
    str = "payin_wallet as payin_amount ";
} else if (pay_charge == 5) {
    str = "payin_qr as payin_amount ";
} else if (pay_charge == 6) {
    str = "vaoffline as payin_amount ";
} else {
    str = "payin_amount as payin_amount ";
}
  
    let sql = `SELECT ${str}, gst_amount as gst_amount FROM tbl_merchant_charges WHERE currency_code = ? AND user_id = ?`;
    let result = await mysqlcon(sql, [currency_code, user_id]);
    if (result && result.length > 0) {
      let payin_amount = result[0].payin_amount;
      let gst = result[0].gst_amount;
      return {
          payin_amount,
          gst
      };
    }

  };


  
  async getBankCodeTitle(code,req,res){

    let query = `SELECT title FROM tbl_code WHERE code = ${code}`
    let results = await mysqlcon(query,[code])

    if (results.length > 0) {
      return results[0].title
    } else {
      return 0;
    }
  }

  async getBankCode(pg_id, search,req,res)
{
  let query = `SELECT title FROM tbl_code WHERE payment_gate = ${pg_id} AND akontocode = ${search}`
  let results = await mysqlcon(query,[pg_id, search])

  if (results.length > 0) {
    return results
  } else {
    return 0;
  } 
}

// async getMerchantPayinCharges(currency_code, user_id, pay_charge)
// {
//   let str = "";
// if (pay_charge == 1) {
//     str = "payin_card as payin_amount ";
// } else if (pay_charge == 2) {
//     str = "payin_upi as payin_amount ";
// } else if (pay_charge == 3) {
//     str = "payin_netbanking as payin_amount ";
// } else if (pay_charge == 4) {
//     str = "payin_wallet as payin_amount ";
// } else if (pay_charge == 5) {
//     str = "payin_qr as payin_amount ";
// } else if (pay_charge == 6) {
//     str = "vaoffline as payin_amount ";
// } else {
//     str = "payin_amount as payin_amount ";
// }
//     let sql = `SELECT * FROM tbl_merchant_charges WHERE currency_id = ? AND user_id = ?`
//     let result = await mysqlcon(sql,[currency_code, user_id ]);
//     return result
// };

//  start Key2pay

async keye2paySetOrder(req, order_id, gateway_id){
  // try{
  var paymentType = req.body.pay_by;

  if(paymentType == 1){
    var mode = 'Card';
  } else if (paymentType == 2) {
    var mode = 'UPI';
    var carda = req.body.upi_id;
  } else if(paymentType == 3){
    var mode = 'Net Banking';
  } else if(paymentType == 4){
    var mode = 'Wallet';
  } else if(paymentType == 5){
    var mode = 'QR';
  }

  // const orderNo =  orderNo;
  let merNo =  req.body.merchantno;
  let transactionId = ''  //req.body.order_no;
  let paymentStatus = 'Payment initiate';
  let status =  '2';
  let ammountType = req.body.currency;
  let signInfo = '';
  let endPoint = req.body.callback_url;
  let redirect = req.body.return_url;
  let payinCharges = req.body.payinCharges;
  let gstCharges = req.body.gstCharges;
  let settleAmount =  req.body.settleAmount;
  let userId = req.body.merchantno;
  let empId = 0;

  if (req.body.merchant_emp && !isEmpty(req.body.merchant_emp)) {
    empId = parseInt(req.body.merchant_emp);
  } else {
    empId = 0;
  }
  
  var merchantdata = {
    /* bank charge */
    our_bank_charge : 0,
    our_bank_charge_gst: 0,
    /* bank charge */
    /* rolling reverse */
    rolling_reverse_amount: req.body.rolling_reverse_amount,
    rolling_reverse_on: req.body.rolling_reverse_on,
    // /* rolling reverse */
    // // Code for new order_id send condition
    txn_id: req.body.user_txn_id,
    new_trx: 1,
    // // Code for new order_id send condition
    merchant_emp: empId,
    sales_from: 2,
    user_id: merNo,
    payin_charges: payinCharges,
    gst_charges:0,
    settle_amount: settleAmount,
    end_point_url: endPoint,
    redirection_url: redirect,
    order_no: order_id,
    mer_no: merNo,
    transaction_id: transactionId,
    card_4_4: carda,
    ammount: req.body.amount,
    // // txn_amount:req.body.requested_amount,
    // // fiat_fee_amount: req.body.fiat_fee,
    tax_amt: req.body.tax_amt,
    settle_currency_current_price: await currentCurrency(
    ammountType,await homesupport.getSettleCurrencyName(await homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
    payment_status: paymentStatus,
    status: status,
    payment_type: mode,
    ammount_type: ammountType,
    bill_address: req.body.address,
    sign_info: signInfo,
    i_country: req.body.country,
    i_state: req.body.states,
    i_city: req.body.city,
    i_zip: req.body.pincode,
    i_ip: req.body.ip,
    i_flname: `${req.body.fname} ${req.body.lname}`, 
    i_fname: req.body.fname,
    i_lname: req.body.lname,
    i_email: req.body.email,
    i_number: req.body.mobile_no,
    discription: req.body.description,
    baggage: req.body.baggage,
    reference: req.body.reference,
    gatewayNumber: gateway_id,
    created_on: dateTime,
    settlement_on: dateTime,
    updated_on: dateTime,
  };
 
  if (req.body.payment_mode == 'LIVE') {
    merchantdata.trx_live_test = 1;
  }
  // return res.send(merchantData)
  let sqldatamer = "INSERT INTO tbl_merchant_transaction SET ? ";
  return await mysqlcon(sqldatamer,[merchantdata]);
// }
// catch(error){
//   console.log(error);
//   return res.json(500,{
//     message: ' Server Error',
//     error: error.message // Return t
// })
// }
  
};

async key2payDeposite(postjson) {

       // Request for Access Token
       const tokenResponse = await axios.post('https://api.key2pay.online/v1/auth/token', {
        grant_type: 'client_credentials'
      }, {
        headers: {
          'Authorization': 'Basic Zjk0MjdiOWMtNGFiMi00ZGFiLWE4OGMtMWYzYjBkODliMDJkOmRVcW5tZUhRdXZJMFk1TG4vY2x1eHV0cGJXVExQMldCTXZSUnA0Yis0MkVYeXhyTEltNXNwR2J1T2MzYmpCTkhjQ0VKbnJteGdWUmhWUExxTjg5MDRnPT0=',
          'Content-Type': 'application/json'
        }
      });
  
      let accessToken = tokenResponse.data.accessToken;
      
  
      // Request for Payment

      let paymentResponse = await axios.post(
        'https://api.key2pay.online/v1/payments',
        postjson, // Assuming postjson is the data you want to send
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      return paymentResponse.data;

    
  }

async userOrderPendingStatusUpdate(order_id, pending_by){
  let data = {
    status: 3,
    pending_hit_response_by: pending_by,
  };

  let sqlPendingStatus = `UPDATE tbl_merchant_transaction SET ? WHERE merchant_db_response = 0 AND order_no = ?`;
  let resultPendingStatus = await mysqlcon(sqlPendingStatus,[data, order_id]);
  if (resultPendingStatus > 0) {
    return resultPendingStatus 
  }
}



async merchantPaymentStatusUpdateOnEndPoint(fields, paymentStaticUrl) {
    const json_data = JSON.stringify(fields);

    const response = await fetch(paymentStaticUrl, {
      method: 'POST',
      body: json_data,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 0, // No timeout (equivalent to CURLOPT_CONNECTTIMEOUT)
      agent: new https.Agent({ rejectUnauthorized: false }), // Equivalent to CURLOPT_SSL_VERIFYPEER
    });

    if (!response.ok) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    const fileContents = await response.text();

    return fileContents;
};

async userOrderWatingStatusUpdate(order_id){

  let detailsSql = `SELECT * FROM tbl_merchant_transaction WHERE order_no = '${order_id}'`
  let detailResult = await mysqlcon(detailsSql)

  let state = 'PENDING';
  let stateCode = 'SUCC201';
  let message = 'Transaction pending';

  if (detailResult.status == 1) {
    
    state = 'SUCCESS';
    stateCode = 'SUCC200';
    message = 'Transaction success';
  }
  if (detailResult.status == 0) {
    
    state = 'FAILED';
    stateCode = 'SUCC202';
    message = 'Transaction success';
  }
  if (detailResult.status == 2) {
 
    state = 'WAITING';
    stateCode = 'WAIT200';
    message = 'Payment initiate';
  }


  /* Code for new order_id send condition */
  let od_id;

  if (detailResult.new_trx == 1) {
    od_id = detailResult.txn_id;
  } else {
    od_id = detailResult.order_no;
  }
  let udetail = await homesupport.getDetailBymer(detailResult[0].user_id);
  console.log(udetail);
  
  let data = {
    order_id: order_id,
    orderAmount: detailResult[0].ammount,
    requestedAmount: detailResult[0].txn_amount || detailResult[0].ammount,
    currency: detailResult[0].ammount_type,
    txStatus: state,
    txMsg: message,
    txTime: detailResult[0].created_on,
    txCode: stateCode,
    checksum: md5(`${detailResult[0].user_id}|${detailResult[0].ammount}|${state}|${detailResult[0].created_on}|${od_id}|${udetail[0].secretkey}`),
  };
  let end_point_response = await homesupport.merchantPaymentStatusUpdateOnEndPoint(data, detailResult[0].end_point_url)
  
  data.end_point_response = end_point_response;
  
  let data1 = {
    order_no: order_id,
    data: JSON.stringify(data),
    created_on: new Date()
  }
  let sqlInsert = "INSERT INTO tbl_cron_log SET ? "
   await mysqlcon(sqlInsert,[data1]);

  return 1;
}

async redipaySetOrder(req, order_id, gateway_id){
  // try{
  var paymentType = req.body.pay_by;
  if(paymentType == 1){
    var mode = 'Card';
  } else if (paymentType == 2) {
    var mode = 'UPI';
    var carda = req.body.upi_id;
  } else if(paymentType == 3){
    var mode = 'Net Banking';
  } else if(paymentType == 4){
    var mode = 'Wallet';
  } else if(paymentType == 5){
    var mode = 'QR';
  }
  // const orderNo =  orderNo;
  let merNo =  req.body.merchantno;
  let transactionId = ''  //req.body.order_no;
  let paymentStatus = 'Payment initiate';
  let status =  '2';
  let ammountType = req.body.currency;
  let signInfo = '';
  let endPoint = req.body.callback_url;
  let redirect = req.body.return_url;
  let payinCharges = req.body.payinCharges;
  let gstCharges = req.body.gstCharges;
  let settleAmount =  req.body.settleAmount;
  let userId = req.body.merchantno;
  let empId = 0;
  if (req.body.merchant_emp && !isEmpty(req.body.merchant_emp)) {
    empId = parseInt(req.body.merchant_emp);
  } else {
    empId = 0;
  }
  var merchantdata = {
    /* bank charge */
    our_bank_charge : req.body.our_bank_charge,
    our_bank_charge_gst: req.body.our_bank_charge_gst,
    /* bank charge */
    /* rolling reverse */
    rolling_reverse_amount: req.body.rolling_reverse_amount,
    rolling_reverse_on: req.body.rolling_reverse_on,
    // /* rolling reverse */
    // // Code for new order_id send condition
    txn_id: req.body.user_txn_id,
    new_trx: 1,
    // // Code for new order_id send condition
    merchant_emp: empId,
    sales_from: 2,
    user_id: merNo,
    payin_charges: payinCharges,
    gst_charges:0,
    settle_amount: settleAmount,
    end_point_url: endPoint,
    redirection_url: redirect,
    order_no: order_id,
    mer_no: merNo,
    transaction_id: transactionId,
    card_4_4: carda,
    ammount: req.body.amount,
    // // txn_amount:req.body.requested_amount,
    // // fiat_fee_amount: req.body.fiat_fee,
    tax_amt: req.body.tax_amt,
    settle_currency_current_price: await currentCurrency(
    ammountType,await homesupport.getSettleCurrencyName(await homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
    payment_status: paymentStatus,
    status: status,
    payment_type: mode,
    ammount_type: ammountType,
    bill_address: req.body.address,
    sign_info: signInfo,
    i_country: req.body.country,
    i_state: req.body.states,
    i_city: req.body.city,
    i_zip: req.body.pincode,
    i_ip: req.body.ip,
    i_flname: `${req.body.fname} ${req.body.lname}`,
    i_fname: req.body.fname,
    i_lname: req.body.lname,
    i_email: req.body.email,
    i_number: req.body.mobile_no,
    discription: req.body.description,
    baggage: req.body.baggage,
    reference: req.body.reference,
    gatewayNumber: gateway_id,
    created_on: dateTime,
    settlement_on: dateTime,
    updated_on: dateTime,
  };
  if (req.body.payment_mode == 'LIVE') {
    merchantdata.trx_live_test = 1;
  }
  // return res.send(merchantData)
  let sqldatamer = "INSERT INTO tbl_merchant_transaction SET ? ";
  return await mysqlcon(sqldatamer,[merchantdata]);
// }
// catch(error){
//   console.log(error);
//   return res.json(500,{
//     message: ' Server Error',
//     error: error.message // Return t
// })
// }
};

  // help2pay  ANISHA

  async getHelp2payPendingStatus(orderId) {

    if (orderId) {
        let sql = `SELECT * FROM tbl_merchant_transaction WHERE gatewayNumber = '1941' AND order_no = ?`;
        let result = await mysqlcon(sql,[orderId])
        return result
    }

  }

  async setHelp2payTransactionStatus(status, order_id, message){
    const sql = `SELECT * FROM tbl_merchant_transaction WHERE gatewayNumber = ? AND order_no = ?`;
    const result = await mysqlcon(sql,['1941', order_id])
    
    if(result){
      if(result[0].status === 3){

        let  data = {
          updated_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: status,
          payment_status: message,
        }

        let sqlUpdate = `UPDATE tbl_merchant_transaction SET ? WHERE merchant_db_response = '0' AND order_no = '${order_id}' AND gatewayNumber = '1941'`
        let resultUpdate = await mysqlcon(sqlUpdate,[data])

        return resultUpdate
      }
    }
    return result
  }


  async getDetailBymer(merchnat){
    let sql = "SELECT * FROM tbl_user WHERE id = ? "
    let result = await mysqlcon(sql,[merchnat])
    return result 
  }


  async update_help2pay_merchant_db_response(order)
  {
      let sql = `UPDATE tbl_merchant_transaction SET merchant_db_response = 1 WHERE order_no = ? AND gatewayNumber = ?`
      let result = await mysqlcon(sql,[order,'1941'])
      return result
  }

  async  help2PayStatus(order_no, route) {
    try {
      
      const request = {
        MerchantCode: 'INT0944',
        RefID: order_no,
      };
  
      const url = `https://query.testingzone88.com/Services/Merchants/INT0944/${route}/${order_no}`;
  
      const response = await axios.post(url, request);
      const xml = response.data;
      const parseStringPromise = promisify(xml2js.parseString);

      const result = await parseStringPromise(xml, { explicitArray: false });
  
      return result
      
    } catch (error) {
      return  error; 
    }
  }

  async  merchantPaymentStatussUpdateOnEndPoint(fields) {
    const paymentStaticUrl = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';

    try {
        const response = await axios.post(paymentStaticUrl, fields, {
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({  
                rejectUnauthorized: false, 
            }),
        });

        return response.data;
    } catch (error) {
        return error
    }
}
// help2pay END anisha

async cricPaySetOrder (req, order_id, gateway_id) {

  let paymentType = req.body.pay_by;
  if (paymentType == 3) {
    var mode = 'NetBanking';
    var carda = req.body.paymentCode;
  }

  let order_no  = order_id; 
  let mer_no = req.body.merchantno; 
  let transaction_id = req.body.order_id; 
  let ammount_type = req.body.currency; 
  let end_point = req.body.callback_url; 
  let redirect = req.body.return_url; 
  let payin_charges = req.body.payinCharges; 
  let gst_charges = req.body.gstCharges; 
  let settle_amount = req.body.settleAmount; 
  let payment_status = 'Payment initiate';
  let status = '2';
  let sign_info = '';
  
  let user_id = req.body.merchantno; // Extract 'merchantno' value from the request body

  let emp_id = 0;
  if (req.body.merchant_emp !== undefined && req.body.merchant_emp !== '') {
    emp_id = req.body.merchant_emp;
  }
  

  let cricpayData = {
    /* bank charge */
    our_bank_charge: req.body.our_bank_charge,
    our_bank_charge_gst: req.body.our_bank_charge_gst,
    /* bank charge */
    /* rolling reverse */
    rolling_reverse_amount: req.body.rolling_reverse_amount,
    rolling_reverse_on: req.body.rolling_reverse_on,
    /* rolling reverse */
    // Code for new order_id send condition
    txn_id: req.body.user_txn_id,
    new_trx: 1,
    // Code for new order_id send condition
    merchant_emp: emp_id,
    sales_from: 2,
    user_id: user_id,
    payin_charges: payin_charges,
    gst_charges: gst_charges,
    settle_amount: settle_amount,
    end_point_url: end_point,
    redirection_url: redirect,
    order_no: order_no,
    mer_no: mer_no,
    transaction_id: transaction_id,
    card_4_4: carda,
    ammount: req.body.amount,
    // txn_amount:req.body.requested_amount,
    fiat_fee_amount: req.body.fiatFee,
    // tax_amt: req.body.tax_amt,
    settle_currency_current_price: await currentCurrency(
    ammount_type,homesupport.getSettleCurrencyName(homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
    payment_status: payment_status,
    status: status,
    payment_type: mode,
    ammount_type: ammount_type,
    bill_address: req.body.address,
    sign_info: sign_info,
    i_country: req.body.country,
    i_state: req.body.state,
    i_city: req.body.city,
    i_zip: req.body.pincode,
    i_ip: req.body.ip,
    i_flname: `${req.body.fname} ${req.body.lname}`,
    i_fname: req.body.fname,
    i_lname: req.body.lname,
    i_email: req.body.email,
    i_number: req.body.mobile_no,
    discription: req.body.description,
    baggage: req.body.baggage,
    reference: req.body.reference,
    gatewayNumber: gateway_id,
    created_on: new Date(),
    settlement_on: new Date(Date.now() + 48 * 60 * 60 * 1000),
    updated_on: new Date(),
  };
  
  if (req.body.payment_mode == 'LIVE') {
    cricpayData.trx_live_test = 1;
  }
 
  let sqlInsert = "INSERT INTO tbl_merchant_transaction SET ? "
  return await mysqlcon(sqlInsert,[cricpayData]);  

};

async cricPayzDeposite(orderRequest){
 return('hgdhvhjvjhvgvhj')
  // let postRequest = {
  //   "amount": "1100",
  //   "userId": "vishwakarshanroop@gmail.com",
  //   "merchantCode": "CP42489090879020612",
  //   "transaction_code": "VNODE121234451"
  // }
   //querystring.stringify(orderRequest);
  
  axios.post('https://boapi.cricpayz.io:14442/api/appuser/generateOrder', orderRequest, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
  let adarsh = response.data;
  let mayank = adarsh.accessURL;
  let vishwa = mayank;
 
  // Check if orderId exists
  if (adarsh.orderId) {
      let orderId = adarsh.orderId;
      let getOrderDetailsUrl = `https://prodapi.cricpayz.io:14495/api/appuser/getOrderDetails/?orderId=${encodeURIComponent(orderId)}`;
      
      // Use async/await within an async function
      async function fetchOrderDetails() {
          try {
              let getOrderDetailsResponse = await fetch(getOrderDetailsUrl);
              let bankResponse = await getOrderDetailsResponse.text();
              return bankResponse;
          } catch (error) {
              console.error('Error fetching order details:', error.message);
              throw error; // Propagate the error if needed
          }
      }

      // Call the async function
      return vishwa;
  } else {
      throw new Error('No orderId found in the response');
  }
})
.then(bankResponse => {
  // Handle the bankResponse here
  return bankResponse; // Return the bankResponse to the next .then() or store it in a variable
})
.catch(error => {
  console.error('Error:', error.message);
  // Handle the error appropriately if needed
  // You can either throw the error to propagate or return a default value/error message
});


};

async payportSetOrder (req, order_id, gateway_id) {

  let paymentType = req.body.pay_by;
  if (paymentType == 3) {
    var mode = 'NetBanking';
    var carda = req.body.paymentCode;
  }

  let order_no  = order_id; 
  let mer_no = req.body.merchantno; 
  let transaction_id = req.body.order_id; 
  let ammount_type = req.body.currency; 
  let end_point = req.body.callback_url; 
  let redirect = req.body.return_url; 
  let payin_charges = req.body.payinCharges; 
  let gst_charges = req.body.gstCharges; 
  let settle_amount = req.body.settleAmount; 
  let payment_status = 'Payment initiate';
  let status = '2';
  let sign_info = '';
  
  let user_id = req.body.merchantno; // Extract 'merchantno' value from the request body

  let emp_id = 0;
  if (req.body.merchant_emp !== undefined && req.body.merchant_emp !== '') {
    emp_id = req.body.merchant_emp;
  }
  

  let payPortData = {
    /* bank charge */
    our_bank_charge: req.body.our_bank_charge,
    our_bank_charge_gst: req.body.our_bank_charge_gst,
    /* bank charge */
    /* rolling reverse */
    rolling_reverse_amount: req.body.rolling_reverse_amount,
    rolling_reverse_on: req.body.rolling_reverse_on,
    /* rolling reverse */
    // Code for new order_id send condition
    txn_id: req.body.user_txn_id,
    new_trx: 1,
    // Code for new order_id send condition
    merchant_emp: emp_id,
    sales_from: 2,
    user_id: user_id,
    payin_charges: payin_charges,
    gst_charges: gst_charges,
    settle_amount: settle_amount,
    end_point_url: end_point,
    redirection_url: redirect,
    order_no: order_no,
    mer_no: mer_no,
    transaction_id: transaction_id,
    card_4_4: carda,
    ammount: req.body.amount,
    // txn_amount:req.body.requested_amount,
    fiat_fee_amount: req.body.fiatFee,
    // tax_amt: req.body.tax_amt,
    settle_currency_current_price: await currentCurrency(
    ammount_type,homesupport.getSettleCurrencyName(homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
    payment_status: payment_status,
    status: status,
    payment_type: mode,
    ammount_type: ammount_type,
    bill_address: req.body.address,
    sign_info: sign_info,
    i_country: req.body.country,
    i_state: req.body.state,
    i_city: req.body.city,
    i_zip: req.body.pincode,
    i_ip: req.body.ip,
    i_flname: `${req.body.fname} ${req.body.lname}`,
    i_fname: req.body.fname,
    i_lname: req.body.lname,
    i_email: req.body.email,
    i_number: req.body.mobile_no,
    discription: req.body.description,
    baggage: req.body.baggage,
    reference: req.body.reference,
    gatewayNumber: gateway_id,
    created_on: new Date(),
    settlement_on: new Date(Date.now() + 48 * 60 * 60 * 1000),
    updated_on: new Date(),
  };
  if (req.body.payment_mode == 'LIVE') {
    payPortData.trx_live_test = 1;
  }
 
  let sqlInsert = "INSERT INTO tbl_merchant_transaction SET ? "
  return await mysqlcon(sqlInsert,[payPortData]);  

 };

 async payport_deposite(payport) {
  let endpoint = 'https://sandbox.paymarket.live/api/v3/payment/request';
  let  accessToken = '593I1hOJCQnzcfsKhuiL26IlgdxE7Ybxwbh1iYgxNmaLhHf7ka6ZXT0UmROcSYVtfxJ7PMTSv7ECKx9QSFoOwl1BLAorYwshrTxqjUIaV9iJVGIJxLwxQOL4XkEOUJtd'; // 
  
  let headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  };
  let ad_id
  await axios.post(endpoint, payport, { headers: headers })
    .then(response => {
       ad_id = response.data?.data[0]?.ad_id || '';
       if (payport.currency == 'INR') {
        response.data.data.forEach(data => {
            if (data.bank_name == 'IMPS*') {
                ad_id = data.ad_id;
            }
        });
    }
      
      // return response.data;
    })
    // return (ad_id);


    let endpoint_url = 'https://sandbox.paymarket.live/api/v3/payment/create';
    let vkr = ad_id
    let request2 = {
      ad_id: vkr,
      amount: payport.amount,
      currency: payport.currency,
      server_url: 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php', // Replace with the appropriate URL
      locale: payport.locale,
      customer_id: payport.customer_id,
      payment_attributes: {
          client_name: payport.client_name,
          client_email: payport.client_email
      }
  };
  
    let header = {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    };
  
    let invoice_id;
    await axios.post(endpoint_url, request2, { headers: header })
    .then(response => {
      if (response && response.data && response.data.data && response.data.data.invoice_id) {
        invoice_id = response.data.data.invoice_id;
      }
    })

 let invoice_ids = { invoice_id };
//  return (invoice_ids)
let return_response = {}; // Define return_response outside the if block

if (invoice_ids.invoice_id) {
  let approvedEndpoint = 'https://sandbox.paymarket.live/api/v3/payment/confirm';

  let data3 = {
    invoice_id: invoice_ids.invoice_id,
    locale: 'en'
  };

  let headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  };

  return axios.post(approvedEndpoint, data3, { headers: headers })
    .then(response => {
      let return_response = {
        approved: response.data,
      };
      return return_response;
    })
} else {
  return { error: 'No invoice_id provided' }; // Return an error if invoice_id is not available
}

}

async payplanetcreateresponse(jsonData,sign) {
  let responsecreate = await axios.post(
    'https://api.pay-planet.com/api/v1/paymentgate/payment/simple/',
    jsonData,
    {
      headers: {
          'Api-Sign': sign,
          'Content-Type': 'application/json',
      },
    }
  )
  return responsecreate.data
}

async payplanetprocessresponse(jsonpaymentvalue,signprocess){

  let responseprocess = await axios.post(
    'https://api.pay-planet.com/api/v1/paymentgate/payment/process/',
    jsonpaymentvalue,
    {
      headers: {
          'Api-Sign': signprocess,
          'Content-Type': 'application/json',
      },
    }
  )
  return responseprocess.data
}

async payplanetinforesponse(jsoninfo,signinfo){
  let responseinfo = await axios.get(
    'https://api.pay-planet.com/api/v1/paymentgate/payment/info/',
    {
      data: jsoninfo,
      headers: {
          'Api-Sign': signinfo,
          'Content-Type': 'application/json',
      },
    }
);
  return responseinfo.data
}

async payplanetcreate(req, order_id, gateway_id,processtx){
  const paymentType = req.body.pay_by;
  if (paymentType == 1) {
    var mode = 'Card';
    var card = req.body.card_number;
  }


  // const orderNo =  orderNo;
  const merNo =  req.body.merchantno;
  const transactionId = processtx;
  const paymentStatus = 'Payment initiate';
  const status =  '2';
  const ammountType = req.body.currency;
  const signInfo = '';
  const endPoint = req.body.callback_url;
  const redirect = req.body.return_url;
  const payinCharges = req.body.payinCharges;
  const gstCharges = req.body.gstCharges;
  const settleAmount =  req.body.settleAmount;
  var userId = req.body.merchantno;
  let empId = 0;

  if (req.body.merchant_emp && !isEmpty(req.body.merchant_emp)) {
    empId = parseInt(req.body.merchant_emp);
  } else {
    empId = 0;
  }

  var data = {
    our_bank_charge: req.body.our_bank_charge,
    our_bank_charge_gst: req.body.our_bank_charge_gst,
    rolling_reverse_amount: req.body.rolling_reverse_amount,
    rolling_reverse_on: req.body.rolling_reverse_on,
    txn_id: req.body.user_txn_id,
    new_trx: 1,
    merchant_emp: empId,
    sales_from: 2,
    user_id: merNo,
    payin_charges: payinCharges,
    gst_charges: gstCharges,
    settle_amount: settleAmount,
    end_point_url: endPoint,
    redirection_url: redirect,
    order_no: order_id,
    mer_no: merNo,
    transaction_id: transactionId,
    card_4_4: card,
    ammount: req.body.amount,
    tax_amt: req.body.tax_amt,
    settle_currency_current_price: await currentCurrency(
    ammountType,homesupport.getSettleCurrencyName(homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
    payment_status: paymentStatus,
    status: status,
    payment_type: mode,
    ammount_type: ammountType,
    bill_address: req.body.address,
    sign_info: signInfo,
    i_country: req.body.country,
    i_state: req.body.state,
    i_city: req.body.city,
    i_zip: req.body.pincode,
    i_ip: req.body.ip,
    i_flname: `${req.body.fname} ${req.body.lname}`,
    i_fname: req.body.fname,
    i_lname: req.body.lname,
    i_email: req.body.email,
    i_number: req.body.mobile_no,
    discription: req.body.description,
    baggage: req.body.baggage,
    reference: req.body.reference,
    gatewayNumber: gateway_id,
    created_on: new Date(),
    settlement_on: new Date(Date.now() + 48 * 60 * 60 * 1000),
    updated_on: new Date(),
  };
  

  if (req.body.payment_mode == 'LIVE') {
    data.trx_live_test = 1;
  }
  let sqlInsert = "INSERT INTO tbl_merchant_transaction SET ? "
  return await mysqlcon(sqlInsert,[data]);
  
};

}

module.exports = new Default;
