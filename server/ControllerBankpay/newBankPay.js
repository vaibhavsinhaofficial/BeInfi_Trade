const mysqlcon = require("../config/db_connection");
const crypto = require("crypto");
const helpers = require("../helper/defaultheler");
const axios = require('axios');
const md5 = require("md5");
currentDate = new Date();
let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + " " + time;

const txTime = new Date().toISOString().replace(/[^0-9]/g, ""); // Remove non-numeric characters
const homesupport = require("../helper/homemodel")
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

module.exports.newBankPayment = async (req, res) =>{
  try{
    
    let{ 
      order_id,
      merchantno,
      amount,
      fname,
      lname,
      email,
      mobile_no,
      country,
      state,
      city,
      address,
      pincode,
      callback_url,
      return_url,
      description,
      checksum,
      orderAmount,
      txStatus,
      pay_by,
      pg_id,
      upi_id,
      ammount_type,
      orderNo,
      paymentCode,
      cvv,
      card_number,
      month,
      year,
      holder
    } = req.body
    
    let bodyDataArray = Object.values(req.body);
    var request = bodyDataArray;
    function validation() {
      merchantno = merchantno === "" ? "" : parseInt(merchantno);
      mobile_no = mobile_no === "" ? "" : parseInt(mobile_no);
      pincode = pincode === "" ? "" : parseInt(pincode);
      amount = amount === "" ? "" : parseInt(amount);
       
      let detail1 = {merchantno,amount,mobile_no,pincode}
      let detail2 = {fname,lname,address,city,state,email}
      
      for (let key in detail1) { 
        if(detail1[key]===""){
          return res.send(`please provided a some data in field ${key}`)
        }
        if ((typeof(detail1[key]) === "string" || isNaN(detail1[key]) )) {
          return res.send(`you must provided a numeric value in ${key}`);
        }
        if (key === "mobile_no" && (detail1[key].toString().length !== 10)) {
          return res.send(`Please enter correct mobile Number`);
        }     
      }
      for(let key in detail2) {
        if(detail2[key]==="")
        {
        return res.send(`please provided a some data in field ${key}`)
        }
        if(typeof(detail2[key]) === "number" ||  /^\d+$/.test(detail2[key]) ){
          return res.send(`you must provided a string value in field ${key}`)
        }   
      }
   }
   validation();


      let sqlExits = "SELECT * FROM tbl_user WHERE id = ?"
      let resultExist = await mysqlcon(sqlExits,[merchantno])

      
      if (!resultExist || resultExist.length === 0 || resultExist[0].id === 0) {
        res.send('Please fill in the details') // Prompt the user to fill in the details
       }
      
      if (Object.keys(req.body).length > 0){
          if(req.body.pay_by === 1){
              req.body.card_number,
              req.body.expiration_month,
              req.body.expiration_year,
              req.body.security_code,
              paymentCode = '',
              upi_id = ''
          }else if(req.body.pay_by == 2){
              req.body.upi_id = '',
              card_number = '',
              expiration_month = '',
              expiration_year = '',
              security_code = '',
              paymentCode = ''
          
          }else if(req.body.pay_by === 3 || req.body.pay_by ===   4 || req.body.pay_by === 6){
              req.body.paymentCode,
              card_number = '',
              expiration_month = '',
              expiration_year = '',
              security_code = '',           
              upi_id = ''
          }
          else if(req.body.pay_by === 5){
              req.body.paymentCode,
              card_number = '',
              expiration_month = '',
              expiration_year = '',
              security_code = '',           
              upi_id = ''
          }

          if(req.body === false){
              body_error()
          }
          else
          {
              
               // Simulated block_user array
                  const blockUser = ['trphan@naver.com', '821039007477'];
                  // console.log(blockUser);

                  const return_url = req.body.return_url || '';  // Here we can pass return url link
                 
                  var amount_come = req.body.amount;
                  const currency = req.body.currency;
                  if (blockUser.includes(email) || blockUser.includes(mobile_no)) {
                      var data = {
                          order_id: order_id,
                          orderAmount: amount_come,
                          requestedAmount: amount_come,
                          currency: currency,
                          txStatus: 'FAILED',
                          txMsg: "Unable to complete your deposit transaction. Please connect to admin",
                          txTime: new Date().toISOString(),
                          txCode: 'SUCC202',
                          checksum: md5(`${order_id}|${amount_come}|FAILED|${new Date().toISOString()}|${res.secretkey}`),
                          url: return_url
                      };
              
                      if (data !== null) {
                          return res.status(200,
                              {data});
                      }
                  }

                  // mva = wpMandiri
                  let wpMandiri = 0;
                  if(req.body.paymentCode === 'IDRMDRVA'){
                      wpMandiri = 1;
                  }
              
                  let emp_id = req.body.emp_id;
                  if(emp_id && emp_id.trim() !== ''){
                      merchant_emp = emp_id.split('#')[1];
                  }else{
                      merchant_emp = 0;
                  }
                  let amountValue = req.body.amount;
                  let Amount = parseInt(amountValue);
                  let expiration_date = req.body.expiration_month; // We are using expiration_month to expiration_date from here
                  let zip = req.body.pincode;

                  let sqldetail = "SELECT tbl_user.*,gateway_detail.gatewayNO FROM tbl_user INNER JOIN gateway_detail ON tbl_user.id = gateway_detail.merNo WHERE gateway_detail.merNo = ? AND gateway_detail.type = ? AND gateway_detail.currency = ?";
                  let resultdetail = await mysqlcon(sqldetail,[merchantno, pay_by, currency]);
                
                  

                  if (resultdetail == '') {
                      var data = {
                          order_id: order_id,
                          orderAmount: amount_come,
                          requestedAmount: amount_come,
                          currency: req.body.currency,
                          txStatus: 'FAILED',
                          txMsg: 'No gateway assigned for your current payment method. Contact with admin.',
                          txTime: new Date().toISOString(),
                          txCode: 'SUCC202',
                          checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                          url: return_url,
                      };
                      res.send( data);
                  
                  } 
                  
                  let paymentCode = 'AKEY2DEP' // HERE WE CAN GIVE PAYMENTCODE OF GATEWAY
                  if(pay_by != 2){
                  let sqlgetswapgateway = "SELECT * FROM merchant_bank_swap WHERE merchant_id = ? AND bankcode = ? AND primary_gateway = ? AND status = 1";
                  let resultgetswapgateway = await mysqlcon(sqlgetswapgateway,[ merchantno, paymentCode, resultdetail[0].gatewayNO])
            // return res.send(resultdetail)
                  if(!resultgetswapgateway){
                      resultdetail[0].gatewayNO = resultgetswapgateway.switch_gateway;
                  }
                }
                  if (pay_by != 2) {    
                  
                  let sqlValidate = "SELECT * FROM tbl_code WHERE akontocode = ? AND payment_gate = ?";
                  // Include data from the first query result in the second query
                  let validate_bank_code = await mysqlcon(sqlValidate,[paymentCode, resultdetail[0].gatewayNO,]);
                  if (!validate_bank_code) {
                      var data = {
                          order_id: order_id,
                          orderAmount: amount_come,
                          requestedAmount: amount_come,
                          currency: currency,
                          txStatus: 'FAILED',
                          txMsg: 'This Bankcode is not found on the assigned gateway.',
                          txTime: new Date().toISOString(),
                          txCode: 'SUCC202',
                          checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                          url: return_url
                      }
                      
                      
                  }
                  if(data != null){
                    return res.send(200,
                        {data});
                  };
                  }
                  
                  let sqlAmount = "SELECT * FROM tbl_set_limit  WHERE user_id = ? AND gateway = ? AND currency = ?"
                  let merchant_c_limit = await mysqlcon(sqlAmount,[merchantno, resultdetail[0].gatewayNO, currency]);
                  
                  if(!merchant_c_limit == 0){
                   
                   let u_min = merchant_c_limit[0].min
                   let u_max = merchant_c_limit[0].max
                   let Dcurrency = merchant_c_limit[0].currency
                   
                   if(resultdetail[0].gatewayNO == 1979){  //gateway number  
                          if(Dcurrency !== 0){
                            if(amount < u_min || amount > u_max){
                              var data = {
                                  order_id: order_id,
                                  orderAmount: amount_come,
                                  requestedAmount: amount_come,
                                  currency: currency,
                                  txStatus: 'FAILED',
                                  txMsg: `Your amount must be ${Dcurrency} ${u_min} and max amount must be ${Dcurrency} ${u_max}.`,
                                  txTime: dateTime,
                                  txCode: 'SUCC202',
                                  checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                  url: return_url
                              }
                          }
                            }
                            //  res.send(data)
                          
                      }
                      else if(resultdetail[0].gatewayNO == 1959){  //gateway number  
                        if(Dcurrency !== 0){
                          if(amount < u_min || amount > u_max){
                            var data = {
                                order_id: order_id,
                                orderAmount: amount_come,
                                requestedAmount: amount_come,
                                currency: currency,
                                txStatus: 'FAILED',
                                txMsg: `Your amount must be ${Dcurrency} ${u_min} and max amount must be ${Dcurrency} ${u_max}.`,
                                txTime: dateTime,
                                txCode: 'SUCC202',
                                checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                url: return_url
                            }
                        }
                          }
                          //  res.send(data)
                        
                    }
                  }
                  var payment_block_array = [{
                      1 : resultdetail[0].allow_card_payment,
                      2 : resultdetail[0].allow_upi_payment,
                      3 : resultdetail[0].allow_netbanking_payment,
                      4 : resultdetail[0].allow_wallet_payment,
                      5 : resultdetail[0].allow_qr_payment,
                      // 6 : resultdetail[0].allow_offline_payment
                  }]
                  
                  req.body['ip'] = helpers.get_client_ip();
              
                if(resultdetail[0].id == merchantno){
                  if(resultdetail[0].allow_webpayment === 1){
                      if(payment_block_array[0][req.body.pay_by] == 1){
                          let sqlcheckOrderAlreadyExist = "SELECT * FROM tbl_merchant_transaction WHERE order_no = ? ";
                          let resultcheckOrderAlreadyExist = await mysqlcon(sqlcheckOrderAlreadyExist,[order_id]);
                          let sqlcheckOrderAlreadyExistInNewOrderTable = 'SELECT * FROM tbl_order_check WHERE order_id = ?';
                          let resultcheckOrderAlreadyExistInNewOrderTable = await mysqlcon(sqlcheckOrderAlreadyExistInNewOrderTable,[order_id]);
                          let sqlcheckUserOrderAlreadyExistWithAccount = 'SELECT * FROM tbl_merchant_transaction WHERE txn_id = ?';
                          let resultcheckUserOrderAlreadyExistWithAccount = await mysqlcon(sqlcheckUserOrderAlreadyExistWithAccount,[order_id]);
                          if(!resultcheckOrderAlreadyExist.order_id && !resultcheckOrderAlreadyExistInNewOrderTable.order_id && !resultcheckUserOrderAlreadyExistWithAccount.order_id)
                          {
                              let assigngatewayid = resultdetail[0].gatewayNO;
              
                              if(assigngatewayid === '0' || assigngatewayid === '13') {
                                  assigngatewayid === '3';
                              } else {
                                  assigngatewayid = assigngatewayid;
                              }
                              var tax_amt = req.body.tax_amount;
                              req.body.amount = tax_amt ? parseFloat(req.body.amount) + parseFloat(tax_amt) : req.body.amount;
                              req.body.requested_amount = tax_amt ? parseFloat(req.body.amount) + parseFloat(tax_amt) : req.body.amount;
                          
                              var c_currency = req.body.currency;
                              var tmp_amount = req.body.amount;

                              req.body.amount = tax_amt ? parseFloat(req.body.amount) + tax_amt : req.body.amount;
                              
                              req.body.requested_amount = parseFloat(tmp_amount);
                              /*  Rolling Reverse */
                              req.body.rolling_reverse_amount = (amount * resultdetail[0].rolling_reverse) / 100;
                              

                              // Calculate the date after rolling_reverse_months using Date objects
                              var rolling_reverse_months = parseInt(resultdetail[0].rolling_reverse_months);
                              const currentDate = new Date();
                              var rolling_reverse_on = new Date(currentDate.setMonth(currentDate.getMonth() + rolling_reverse_months));

                              // Format rolling_reverse_on as "Y-m-d H:i:s"
                              req.body.rolling_reverse_on = rolling_reverse_on.toISOString().slice(0, 19).replace('T', ' ');  

                              //  Rolling Reverse
                              if (req.body.pay_by == 1){
                                  let assigngatewayid = resultdetail[0].gatewayNO;
                                  var search_string = await helpers.getCardVerifyCode(card_number);
                                  var bank_per_charge = await helpers.getCardVerifyCode(assigngatewayid, search_string, 0);

                                //   if (((search_string == "Debit Card Visa" && amount > 2000) || (search_string == "Debit Card Maestro" && amount > 1000)) && assigngatewayid == 14) {
                                //       bank_per_charge = 0.4;
                                //   }
                              }else if (req.body.pay_by == 2) {
                                   // Replace with the actual value of detail.gatewayNo
                                  var bank_per_charge = await helpers.getBankChargesByCode(resultdetail[0].gatewayNO, 0, 'UPI');
                                  // Start
                                  var tmp_upi_id = req.body.upi_id;
                                  if(tmp_upi_id){
                                      var upiID = tmp_upi_id.split('@')[0].toLowerCase( )
                                  }
                              } //End
                              else if(pay_by == 3){
                                  const assigngatewayid = resultdetail[0].gatewayNO;

                                  if(paymentCode === 3044) {
                                      assigngatewayid === '1856';
                                  }

                                  //  *akonto code line* 
                                  req.body.our_payment_code = paymentCode;
                                  var bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                                //   if (bank_per_charge.length > 0) {
                                //   return bank_per_charge[0].bank_services_charge
                                //   } else {
                                //   return 0;
                                //   }

                              }
                              
                              else if(req.body.pay_by == 4){
                                  const assigngatewayid = resultdetail[0].gatewayNO; 
                                  req.body.our_payment_code = req.body.paymentCode;

                                  /*akonto code line*/
                                  let getBankCode = await helpers.getBankChargesByCode([assigngatewayid, paymentCode]); 
                                  if (getBankCode.length > 0) {
                                      // console.log(getBankCode[0].title);
                                      return res.send (getBankCode[0].title)
                                  } 
                                  else {
                                      res.send(getBankCode);
                                  }
                                  let bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                                  if (bank_per_charge.length > 0) {
                                      return bank_per_charge[0].bank_services_charge
                                      } else {
                                      return 0;
                                  }
                                  
                              } 
                              else if(req.body.pay_by === 5){
                                  const assigngatewayid = resultdetail[0].gatewayNO; 
                                  req.body.our_payment_code = req.body.paymentCode;

                                  /*akonto code line*/
                                  let getBankCode = await helpers.getBankChargesByCode([assigngatewayid, paymentCode]); 
                                  if (getBankCode.length > 0) {
                                      return getBankCode[0].title
                                  } 
                                  else {
                                      res.send(0);
                                  }
                                  let bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                                  if (bank_per_charge.length > 0) {
                                      return bank_per_charge[0].bank_services_charge
                                  } 
                                  else {
                                      res.send(0);
                                  }
                                  
                              } 

                              const user_id = merchantno;
                              const currency_code = currency;
                              
                               
                              let charges = await helpers.getMerchantPayinCharges(pay_by,currency_code,user_id);
                              
                              req.body.our_bank_charge = (amount_come * bank_per_charge) / 100;
                              req.body.our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                              let our_bank_total_charge_with_gst = req.body.our_bank_charge + req.body.our_bank_charge_gst;
                              // Charge By the Bank
                              if(charges != 0){
                                  req.body.payinCharges = (amount_come * charges.payin_amount) / 100;
                                  var overAllGstCharges = (req.body.payinCharges * charges.gst) / 100;
                                  req.body.gstCharges = ((req.body.payinCharges - req.body.our_bank_charge) * charges.gst) / 100;
                                  req.body.settleAmount = amount_come - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount);
                              }else{
                                  req.body.payinCharges = (amount_come * 3) / 100;
                                  var overAllGstCharges = (req.body.payinCharges * 0) / 100;
                                  req.body.gstCharges = ((req.body.payinCharges - req.body.our_bank_charge) * 0) / 100;
                                  req.body.settleAmount = amount_come - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount);
                              }
                              
                              let getwaySql = "SELECT * FROM payment_gateway WHERE gateway_number = ?";
                              let getway = await mysqlcon(getwaySql,[resultdetail[0].gatewayNO])
                              
                          
                              let inputString = `${resultdetail[0].id}#@#${amount_come}@#@${order_id}#@#${mobile_no}#@#${return_url}#@#${resultdetail[0].secretkey}`;
                              
                              let ourChecksum = crypto.createHash('md5').update(inputString).digest('hex');

                              if (pay_by === 1) { 
                                  // Card Data
                                  ourChecksum = (inputString)
                              }else if (pay_by == 2){
                                ourChecksum = (inputString)
                                  
                              }
                             
                              else if (pay_by == 3  || pay_by == 4 ){
                              ourChecksum = (inputString)
                              }
                              else if (pay_by === 5){

                              ourChecksum = (inputString)
                              }

                              // Redipay start
                              let responseData = null;
                              
                              if (assigngatewayid == '1959') {
                                const tokenResponse = await axios.post('https://pay.redipay.app/oauth/token', {
                                  grant_type: 'client_credentials',
                                  client_id: '60131808',
                                  client_secret: 'mREXkk4nau06P6DlBuXz2N1xuoxZC8YFVwxj6Wpr'
                                }, {
                                  headers: {
                                    // 'Authorization': 'Basic Zjk0MjdiOWMtNGFiMi00ZGFiLWE4OGMtMWYzYjBkODliMDJkOmRVcW5tZUhRdXZJMFk1TG4vY2x1eHV0cGJXVExQMldCTXZSUnA0Yis0MkVYeXhyTEltNXNwR2J1T2MzYmpCTkhjQ0VKbnJteGdWUmhWUExxTjg5MDRnPT0=',
                                    'Content-Type': 'application/json'
                                  }
                                });
                            
                                let accessToken = tokenResponse.data.access_token;
                                let postArray = [
                                  amount = amount ,
                                  reference_no = order_id ,
                                  item = description ,
                                  callback_url =  callback_url ,
                                  email = email ,
                                  name =  fname 
                                
                                ];
                                // return res.send(postArray)
                                    // let postjson = JSON.stringify(postArray)
                                    const tokenResponses = await axios.post('https://pay.redipay.app/api/payments/payment',  {
                                      amount : amount ,
                                      reference_no : order_id ,
                                      item : description ,
                                      callback_url :  callback_url ,
                                      email : email ,
                                      name :  fname },{
                                      headers: {
                                        'Authorization': `Bearer ${accessToken}`,

                                      }
                                    });
                                    
                                    let bankResponse = tokenResponses.data;
                                    
                                
                                      if (pay_by == 2) {
                                          postArray.paymentMethodId = '1000';
                                          // postArray.customer.personalId = '963.510.669-64';
                                      }
                                      
                                      var row = await helpers.redipaySetOrder(req, order_id, 1959);
                                      await helpers.userOrderWatingStatusUpdate(order_id);
                                      await helpers.userOrderPendingStatusUpdate(order_id, 1);
                                      var data1912 ={
                                          user_id: merchantno,
                                          post_data: JSON.stringify(request),
                                          akonto_request: JSON.stringify(postArray),
                                          order_id: req.body.order_id,
                                          created_on: dateTime,
                                      }
                                      
                                      let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                      await mysqlcon(sqlInsert,[data1912]);

                                      // var bankResponse = await helpers.key2payDeposite(postjson);
                                      // return res.send(ad)
                                      // let bankResponseParsed;
                                      // if (bankResponse) {
                                      //     bankResponseParsed = JSON.parse(bankResponse);
                                      // } 
                                    //   let bankResponseParsed = JSON.parse(bankResponse);
                                      let bankLog = {
                                      order_id: order_id,
                                      pg_response_in_json: JSON.stringify(bankResponse),
                                      created_on: dateTime,
                                      };
                                      
                                      let sqlInsertpaymentGet = "INSERT INTO tbl_payment_gate_response_tale SET ? "
                                     await mysqlcon(sqlInsertpaymentGet,[bankLog]);
                                      
      
                                      return res.send(bankResponse)
                                      

                                      if (bankResponse == 0) {
                                          var data = {
                                              order_id: order_id,
                                              orderAmount: amount,
                                              requestedAmount: amount,
                                              currency: currency,
                                              txStatus: 'FAILED',
                                              txMsg: 'This Bankcode is not found on the assigned gateway.',
                                              txTime: dateTime,
                                              txCode: 'SUCC202',
                                              checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                              url: return_url
                                          };
                                  
                                      }
                                      if (data !== null) {
                                          return res.status(200,
                                              {data});
                                      }
                                      return res.send(bankResponse)
                              }          
                              else if(assigngatewayid == '1979'){   //payplaneet
                                  
                                let secretKey = 'a189c37a-00ae-4f5c-93c6-380c671df0fa';
                                let endpoint = 'ba14367b-efc5-4ca0-b79e-04eb6afac721';
                      
                                let currency = 978;
                                let clientId = 'ANISHA' + Date.now();
                                let successUrl = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';
                                let failUrl = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';
                                let notifyUrl = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';
                                let buyerIp = '192.185.129.71';
                        
                                let data = {
                                    endpoint,
                                    amount,
                                    currency,
                                    description,
                                    client_id : order_id,
                                    success_url : successUrl,
                                    fail_url : failUrl,
                                    notify_url : notifyUrl,
                                    buyer: {
                                        ip: buyerIp,
                                    },
                                };

                                // return res.send(data)
                        
                                let jsonData = JSON.stringify(data);
                                let secdata = secretKey + jsonData;
                                let sign = crypto.createHash('sha256').update(secdata).digest('hex');
                        
                                let txValue = await helpers.payplanetcreateresponse(jsonData, sign);
                                let txcreatevalue = txValue.info.tx;
                        
                                let expire = month +''+ year
                                
                                let paymentdata = {
                                    endpoint: endpoint,
                                    tx: txcreatevalue,
                                    pan: card_number,
                                    cvv: cvv,
                                    expire: expire,
                                    holder: holder,
                                }
                        
                                let jsonpaymentvalue = JSON.stringify(paymentdata);
                                let secdataprocess = secretKey + jsonpaymentvalue;
                                let signprocess = crypto.createHash('sha256').update(secdataprocess).digest('hex');
                        
                                let processresponse = await helpers.payplanetprocessresponse(jsonpaymentvalue, signprocess);
                                let processtx = processresponse.info.tx;
                        
                                let infodata = {
                                    endpoint: endpoint,
                                    tx: processtx,
                                };
                        
                                let jsoninfo = JSON.stringify(infodata);
                                let secdatainfo = secretKey + jsoninfo;
                                let signinfo = crypto.createHash('sha256').update(secdatainfo).digest('hex');
                                var row = await helpers.payplanetcreate(req, order_id, 1979,processtx);
              
                                await helpers.userOrderWatingStatusUpdate(order_id);
                                await helpers.userOrderPendingStatusUpdate(order_id, 1);
                                
                                var data1979 ={
                                    user_id: merchantno,
                                    post_data: JSON.stringify(request),
                                    akonto_request: JSON.stringify(paymentdata),
                                    order_id: req.body.order_id,
                                    created_on: dateTime,
                                }
                               
                                let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                await mysqlcon(sqlInsert,[data1979]);
                                let responseinfo = await helpers.payplanetinforesponse(jsoninfo,signinfo)

                                let bankLog = {
                                    order_id: order_id,
                                    pg_response_in_json: JSON.stringify(responseinfo),
                                    created_on: dateTime,
                                    };
                                    
                                    let sqlInsertpaymentGet = "INSERT INTO tbl_payment_gate_response_tale SET ? "
                                    await mysqlcon(sqlInsertpaymentGet,[bankLog]);

                                    return res.send(responseinfo);
                            } 
                          }
                      }
                  }else{  
                      
                      var data = {
                          order_id: order_id, // Assuming you have access to the request body
                          orderAmount: amount_come, // Assuming you have access to the request body
                          requestedAmount: amount_come, // Assuming you have access to the request body
                          currency: currency, // Assuming you have access to the request body
                          txStatus: 'FAILED',
                          txMsg: 'Your Web Payment is not enabled. Contact Bankconnect',
                          txTime: dateTime, // Get the current date and time in ISO format
                          txCode: 'SUCC202',                       
                          checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`), // Calculate checksum function call
                          url: return_url
                        }
                        return res.send({data});
                    //   if (data !== null) {
                    //     return res.status(200,
                    //         {data});
                    //     }
                  }

                 }else{
                      const data = {
                          order_id: order_id,
                          orderAmount: amount_come,
                          requestedAmount: amount_come,
                          currency: currency,
                          txStatus: 'FAILED',
                          txMsg: 'No gateway assigned for your current payment method. Contact with admin.',
                          txTime: dateTime,
                          txCode: 'SUCC202',
                          checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                          url: return_url,
                      };
                      return res.send( {data});
                  } 
              
          }
      }
  }catch(error){
    console.log(error);
    return res.json(500,{
      message: 'Internal Server Error',
      error: error.message // Return t
  })
  }
};

module.exports.newBankPayment1 = async (req, res) =>{
  try {
    let{
      order_id,
      merchantno,
      amount,
      fname,
      lname,
      email,
      mobile_no,
      country,
      state,
      city,
      address,
      pincode,
      callback_url,
      return_url,
      description,
      checksum,
      orderAmount,
      txStatus,
      pay_by,
      pg_id,
      upi_id,
      ammount_type,
      orderNo
    } = req.body
    let bodyDataArray = Object.values(req.body);
    // console.log(req.body);

    let sql = "SELECT id from tbl_user WHERE id = ?"
    let result = await mysqlcon(sql, [merchantno])
    // return res.send(result[0])
    if(result && result.length > 0){
      if(bodyDataArray && bodyDataArray.length > 0){
        if(req.body.pay_by === 1){
          req.body.card_number,
          req.body.expiration_month,
          req.body.expiration_year,
          req.body.security_code,
          paymentCode = '',
          upi_id = ''
        } else if(req.body.pay_by == 2){
          req.body.upi_id = '',
          card_number = '',
          expiration_month = '',
          expiration_year = '',
          security_code = '',
          paymentCode = ''
        } else if(req.body.pay_by === 3 || req.body.pay_by ===   4 || req.body.pay_by === 6){
          req.body.paymentCode,
          card_number = '',
          expiration_month = '',
          expiration_year = '',
          security_code = '',           
          upi_id = ''
        } else if(req.body.pay_by === 5){
          req.body.paymentCode,
          card_number = '',
          expiration_month = '',
          expiration_year = '',
          security_code = '',           
          upi_id = ''
        }
      }

      const blockUser = ['trphan@naver.com', '821039007477'];
      const return_url = req.body.return_url || '';
      var paymentCode = 'AKEY2DEP'
      if (blockUser.includes(email) || blockUser.includes(mobile_no)) {
        var data = {
          order_id: order_id,
          orderAmount: req.body.amount,
          requestedAmount: req.body.amount,
          currency: req.body.currency,
          txStatus: 'FAILED',
          txMsg: "Unable to complete your deposit transaction. Please connect to admin",
          txTime: new Date().toISOString(),
          txCode: 'SUCC202',
          checksum: md5(`${order_id}|${req.body.amount}|FAILED|${new Date().toISOString()}|${res.secretkey}`),
          url: return_url
        };
        res.status(200).json(data);
      } else {
        let sqldetail = "SELECT tbl_user.*,gateway_detail.gatewayNO FROM tbl_user INNER JOIN gateway_detail ON tbl_user.id = gateway_detail.merNo WHERE gateway_detail.merNo = ? AND gateway_detail.type = ? AND gateway_detail.currency = ?  ";
        var resultdetail = await mysqlcon(sqldetail,[merchantno, pay_by, req.body.currency]);
        let sqlgetswapgateway = "SELECT * FROM merchant_bank_swap WHERE merchant_id = ? AND bankcode = ? AND primary_gateway = ? AND status = 1";
        let resultgetswapgateway = await mysqlcon(sqlgetswapgateway,[ merchantno, paymentCode, resultdetail[0].gatewayNO])
        // return res.send(resultdetail)

        if (resultdetail == '') {
          var data = {
            order_id: order_id,
            orderAmount: req.body.amount,
            requestedAmount: req.body.amount,
            currency: req.body.currency,
            txStatus: 'FAILED',
            txMsg: 'No gateway assigned for your current payment method. Contact with admin.',
            txTime: new Date().toISOString(),
            txCode: 'SUCC202',
            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
            url: return_url,
          };
          res.status(200).json(data);
        } else {
          // let pay_by = req.body.pay_by.toString();
          console.log("type", typeof pay_by)
          // return ;
          if (pay_by === 2) {    
            let sqlValidate = "SELECT * FROM tbl_code WHERE akontocode = ? AND payment_gate = ?";
            // Include data from the first query result in the second query
            let validate_bank_code = await mysqlcon(sqlValidate,[paymentCode, resultdetail[0].gatewayNO,]);
            if (validate_bank_code.length === 0) {
              var data = {
                order_id: order_id,
                orderAmount: req.body.amount,
                requestedAmount: req.body.amount,
                currency: req.body.currency,
                txStatus: 'FAILED',
                txMsg: 'This Bankcode is not found on the assigned gateway.',
                txTime: new Date().toISOString(),
                txCode: 'SUCC202',
                checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                url: return_url
              }
              res.status(200).json(data);
            } else {
              let sqlAmount = "SELECT * FROM tbl_set_limit  WHERE user_id = ? AND gateway = ? AND currency = ?"
              let merchant_c_limit = await mysqlcon(sqlAmount,[merchantno, resultdetail[0].gatewayNO, req.body.currency])
              const u_min = merchant_c_limit[0].min
              const u_max = merchant_c_limit[0].max

              if(resultdetail[0].gatewayNO == 1959){
                if(amount < u_min || amount > u_max){
                  var data = {
                    order_id: order_id,
                    orderAmount: req.body.amount,
                    requestedAmount: req.body.amount,
                    currency: req.body.currency,
                    txStatus: 'FAILED',
                    txMsg: `Your amount must be ${req.body.currency} ${u_min} and max amount must be ${req.body.currency} ${u_max}.`,
                    txTime: dateTime,
                    txCode: 'SUCC202',
                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                    url: return_url
                  }
                  res.status(200).json(data);
                } else{
                  var payment_block_array = [{
                    1 : resultdetail[0].allow_card_payment,
                    2 : resultdetail[0].allow_upi_payment,
                    3 : resultdetail[0].allow_netbanking_payment,
                    4 : resultdetail[0].allow_wallet_payment,
                    5 : resultdetail[0].allow_qr_payment,
                    // 6 : resultdetail[0].allow_offline_payment
                  }]
                  req.body['ip'] = helpers.get_client_ip();
                  if(resultdetail[0].id == merchantno){
                    if(resultdetail[0].allow_webpayment === 1){
                      if(payment_block_array[0][req.body.pay_by] == 1){
                        let sqlcheckOrderAlreadyExist = "SELECT * FROM tbl_merchant_transaction WHERE order_no = ? ";
                        let resultcheckOrderAlreadyExist = await mysqlcon(sqlcheckOrderAlreadyExist,[order_id]);
                        // let sqlcheckOrderAlreadyExistInNewOrderTable = 'SELECT * FROM tbl_order_check WHERE order_id = ?';
                        // let resultcheckOrderAlreadyExistInNewOrderTable = await mysqlcon(sqlcheckOrderAlreadyExistInNewOrderTable,[order_id]);
                        // let sqlcheckUserOrderAlreadyExistWithAccount = 'SELECT * FROM tbl_merchant_transaction WHERE txn_id = ?';
                        // let resultcheckUserOrderAlreadyExistWithAccount = await mysqlcon(sqlcheckUserOrderAlreadyExistWithAccount,[order_id]);
                        // return res.send(resultcheckOrderAlreadyExist[0].order_no)
                        // return res.send(resultcheckOrderAlreadyExist[0])
                        // return res.send(resultcheckOrderAlreadyExist.length)
                        if(!resultcheckOrderAlreadyExist.length){
                          var rolling_reverse_on = formattedIST;
                          if (pay_by == 1){
                            var search_string = await helpers.getCardVerifyCode(req.body.card_number);
                            var bank_per_charge = await helpers.getCardVerifyCode([resultdetail[0].gateway_id, search_string, 0]);
                            if (((search_string == "Debit Card Visa" && amount > 2000) || (search_string == "Debit Card Maestro" && amount > 2000)) && assigngatewayid == 14) {
                              bank_per_charge = 0.4;
                            }
                          } else if(pay_by == 2){
                            var bank_per_charge = await helpers.getBankChargesByCode(resultdetail[0].gatewayNO, 0, 'UPI');
                          } else if(pay_by == 3){
                            let assigngatewayid = resultdetail[0].gatewayNO;
                            if(paymentCode === 3044) {
                              assigngatewayid === '1856';
                            }
                            let our_payment_code = req.body.paymentCode;
                            let bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                            if (bank_per_charge.length > 0) {
                              return bank_per_charge[0].bank_services_charge
                            } else {
                              return 0;
                            }
                          } else if(pay_by == 4){
                            let assigngatewayid = resultdetail[0].gatewayNO; 
                            let our_payment_code = req.body.paymentCode;
                            let getBankCode = await helpers.getBankChargesByCode([assigngatewayid, paymentCode]); 
                            if (getBankCode.length > 0) {
                              res.status(200).json(getBankCode[0].title)
                            } else {
                              res.status(200).json(getBankCode);
                            }
                            let bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                            if (bank_per_charge.length > 0) {
                              return bank_per_charge[0].bank_services_charge
                            } else {
                              return 0;
                            }
                          } else if(pay_by == 5){
                            let assigngatewayid = resultdetail[0].gatewayNO; 
                            let our_payment_code = req.body.paymentCode;
                            let getBankCode = await helpers.getBankChargesByCode([assigngatewayid, paymentCode]); 
                            if (getBankCode.length > 0) {
                              return getBankCode[0].title
                            } else {
                              res.send(0);
                            }
                            let bank_per_charge = await helpers.getBankChargesByCode([assigngatewayid, paymentCode, 1]);
                            if (bank_per_charge.length > 0) {
                              return bank_per_charge[0].bank_services_charge
                            } else {
                              res.send(0);
                            }
                          }

                          let charges = await helpers.getMerchantPayinCharges(req.body.currency,merchantno, pay_by);
                          // return res.send(charges.payin_amount)
                          var our_bank_charge = (req.body.amount * bank_per_charge) / 100;
                          var our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                          var rolling_reverse_amount = (req.body.amount * resultdetail[0].rolling_reverse) / 100;
                          let gstCharges;
                          let settleAmount;
                          let payinCharegs
                          if(charges !== 0){
                            payinCharges = (req.body.amount * charges.payin_amount) / 100;
                            var overAllGstCharges = (payinCharges * charges.gst) / 100;
                            gstCharges = ((payinCharges - our_bank_charge) * charges.gst) / 100;
                            settleAmount = req.body.amount - (payinCharges + overAllGstCharges +  rolling_reverse_amount);
                          } else {
                            payinCharges = (req.body.amount * 3) / 100;
                            var overAllGstCharges = (payinCharges * 0) / 100;
                            gstCharges = ((payinCharges - our_bank_charge) * 0) / 100;
                            settleAmount = req.body.amount - (payinCharges + overAllGstCharges +  rolling_reverse_amount);
                          }
                          let inputString = `${resultdetail[0].id}#@#${req.body.amount}@#@${order_id}#@#${mobile_no}#@#${return_url}#@#${resultdetail[0].secretkey}`;
                          let ourChecksum = crypto.createHash('md5').update(inputString).digest('hex');
                          // console.log("old",ourChecksum)
                          if (pay_by === 1) { 
                            ourChecksum = (inputString)
                          }else if (pay_by == 2){
                            ourChecksum = (inputString)
                          } else if (pay_by == 3  || pay_by == 4 ){
                            ourChecksum = (inputString)
                          } else if (pay_by === 5){
                            ourChecksum = (inputString)
                          }
                          // console.log("new",resultdetail[0].gatewayNO)
                          if (resultdetail[0].gatewayNO === '1959') {
                            const tokenResponse = await axios.post('https://pay.redipay.app/oauth/token', {
                              grant_type: 'client_credentials',
                              client_id: '60131808',
                              client_secret: 'mREXkk4nau06P6DlBuXz2N1xuoxZC8YFVwxj6Wpr'
                            }, {
                              headers: {
                                // 'Authorization': 'Basic Zjk0MjdiOWMtNGFiMi00ZGFiLWE4OGMtMWYzYjBkODliMDJkOmRVcW5tZUhRdXZJMFk1TG4vY2x1eHV0cGJXVExQMldCTXZSUnA0Yis0MkVYeXhyTEltNXNwR2J1T2MzYmpCTkhjQ0VKbnJteGdWUmhWUExxTjg5MDRnPT0=',
                                'Content-Type': 'application/json'
                              }
                            });
                        
                            let accessToken = tokenResponse.data.access_token;
                            let postArray = [
                              amount = req.body.amount ,
                              reference_no = req.body.order_id ,
                              item = description ,
                              callback_url = req.body.callback_url ,
                              email = req.body.email ,
                              name =  req.body.fname 
                            ];
                            // return res.send(postArray)
                                // let postjson = JSON.stringify(postArray)
                            const tokenResponses = await axios.post('https://pay.redipay.app/api/payments/payment',  {
                            amount : req.body.amount,
                            reference_no : req.body.order_id ,
                            item : req.body.description ,
                            callback_url :  req.body.callback_url ,
                            email : req.body.email ,
                            name :  req.body.fname },{
                              headers: {
                                'Authorization': `Bearer ${accessToken}`,
                              }
                            });
                            let bankResponse = tokenResponses.data;
                            if (pay_by == 2) {
                              postArray.paymentMethodId = '1000';
                              // postArray.customer.personalId = '963.510.669-64';
                            }
                            // return res.send(bankResponse)
                            // var row = await helpers.keye2paySetOrder(req, order_id, 1959);
                            var txnData = {
                              /* bank charge */
                              our_bank_charge: our_bank_charge,
                              our_bank_charge_gst: '',
                              /* bank charge */
                              /* rolling reverse */
                              rolling_reverse_amount: rolling_reverse_amount,
                              rolling_reverse_on: rolling_reverse_on,
                              /* rolling reverse */
                              // Code for new order_id send condition
                              txn_id: order_id,
                              new_trx: 1,
                              // Code for new order_id send condition
                              merchant_emp: merchantno,
                              sales_from: 2,
                              user_id: merchantno,
                              payin_charges: payinCharges,
                              gst_charges: gstCharges,
                              settle_amount: settleAmount,
                              end_point_url: req.body.callback_url,
                              redirection_url: req.body.return_url,
                              order_no: order_id,
                              mer_no: merchantno,
                              transaction_id: '',
                              card_4_4: upi_id,
                              ammount: req.body.amount,
                              // txn_amount:req.body.requested_amount,
                              // fiat_fee_amount: req.body.fiat_fee,
                              tax_amt: req.body.tax_amt,
                              settle_currency_current_price: await currentCurrency(
                              req.body.currency,homesupport.getSettleCurrencyName(homesupport.getMerchantDetail(req.body.merchantno).settle_currency)),
                              payment_status: 'Payment initiate',
                              status: 2,
                              payment_type: 'UPI',
                              ammount_type: req.body.currency,
                              bill_address: req.body.address,
                              sign_info: '',
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
                              gatewayNumber: resultdetail[0].gatewayNO,
                              created_on: formattedIST,
                              settlement_on: formattedIST,
                              updated_on: formattedIST,
                            };
                            let sqlTxnData = "INSERT INTO tbl_merchant_transaction SET ? "
                            let txnDataResult = await mysqlcon(sqlTxnData,[txnData]);
                            await helpers.userOrderWatingStatusUpdate(order_id);
                            await helpers.userOrderPendingStatusUpdate(order_id, 1);
                            // return res.send(bodyDataArray)
                            var data1912 ={
                              user_id: merchantno,
                              post_data: JSON.stringify(bodyDataArray),
                              akonto_request: JSON.stringify(postArray),
                              order_id: req.body.order_id,
                              created_on: formattedIST,
                            }
                            let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                            await mysqlcon(sqlInsert,[data1912]);
                            let bankLog = {
                              order_id: order_id,
                              pg_response_in_json: JSON.stringify(bankResponse),
                              created_on: formattedIST,
                            };
                            let sqlInsertpaymentGet = "INSERT INTO tbl_payment_gate_response_tale SET ? "
                            await mysqlcon(sqlInsertpaymentGet,[bankLog]);
                            res.send(200,{bankResponse})
                            if (bankResponse == 0) {
                              var data = {
                                order_id: order_id,
                                orderAmount: req.body.amount,
                                requestedAmount: req.body.amount,
                                currency: req.body.currency,
                                txStatus: 'FAILED',
                                txMsg: 'This Bankcode is not found on the assigned gateway.',
                                txTime: formattedIST,
                                txCode: 'SUCC202',
                                checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                url: return_url
                              };
                            }
                            if (data !== null) {
                              return res.status(200,{data});
                            }
                            // return res.send(bankResponse)
                          }
                        } else {
                          var data = {
                            order_id: order_id, // Assuming you have access to the request body
                            orderAmount: req.body.amount, // Assuming you have access to the request body
                            requestedAmount: req.body.amount, // Assuming you have access to the request body
                            currency: req.body.currency, // Assuming you have access to the request body
                            txStatus: 'FAILED',
                            txMsg: 'Transaction Id Already Existed. Please make a New Transaction',
                            txTime: formattedIST, // Get the current date and time in ISO format
                            txCode: 'SUCC202',                       
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`), // Calculate checksum function call
                            url: return_url
                          }
                          res.status(200).json(data);
                        }
                      }
                    } else {
                      var data = {
                        order_id: order_id, // Assuming you have access to the request body
                        orderAmount: req.body.amount, // Assuming you have access to the request body
                        requestedAmount: req.body.amount, // Assuming you have access to the request body
                        currency: req.body.currency, // Assuming you have access to the request body
                        txStatus: 'FAILED',
                        txMsg: 'Your Web Payment is not enabled. Contact Bankconnect',
                        txTime: formattedIST, // Get the current date and time in ISO format
                        txCode: 'SUCC202',                       
                        checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`), // Calculate checksum function call
                        url: return_url
                      }
                      res.status(200).json(data);
                    }
                  } else {
                    const data = {
                    order_id: order_id,
                    orderAmount: req.body.amount,
                    requestedAmount: req.body.amount,
                    currency: req.body.currency,
                    txStatus: 'FAILED',
                    txMsg: 'No gateway assigned for your current payment method. Contact with admin.',
                    txTime: formattedIST,
                    txCode: 'SUCC202',
                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                    url: return_url,
                  };
                    res.status(200).json(data);
                  }
                }
              }
            }
            // return res.send(data)
            res.send(data);
          } else {
            console.log("Hello");
          }
        }
      }
    } else {
      res.send("merchant doesnt exists");
    }
  } catch (error) {
    console.log(error);
    return res.status(500, {
      message: "error",
      data: error,
    });
  }
}


module.exports.getMerchantGate = async(req, res) =>{
  try{
  let currency = req.body.currency;
  let mer_id = req.body.merchantno;
  let type = req.body.pay_by
  console.log(req.body);

  let sqlDetails = "SELECT * FROM tbl_user WHERE id = ?";
  let reslutDetail = await mysqlcon(sqlDetails,[mer_id])
  
  if (reslutDetail.length > 0) {
      let b2 = 0; // Assuming 'b2' is initialized to 0
      let bank_ids = reslutDetail[0].bankid; // Replace this with your actual comma-separated string

      // Splitting the string by comma and creating an array
      let bankIdsArray = bank_ids.split(',');

      // Joining the array elements with quotes and commas to create a quoted comma-separated string
      // let formattedBankIds = "'" + bankIdsArray.join("','") + "'";
      let formattedBankIds = bankIdsArray.join("','");


      let sql = `SELECT tbl_code.*, tbl_akonto_banks_code.currencies FROM tbl_code INNER JOIN tbl_akonto_banks_code ON tbl_code.akontocode = tbl_akonto_banks_code.code WHERE tbl_code.payment_gate = ( SELECT gatewayNo FROM gateway_detail WHERE gateway_detail.type = '${type}' AND gateway_detail.currency = '${currency}' AND merNo = ${mer_id} LIMIT 1 ) AND tbl_code.akontocode IN ('${formattedBankIds}') AND tbl_code.status = 1 AND FIND_IN_SET('${currency}', tbl_akonto_banks_code.currencies) AND tbl_code.type = '${type}' GROUP BY tbl_code.akontocode`

      let all_code = await mysqlcon(sql);
      return res.send(all_code);


  } 

  }catch(error){
      console.log(error);
      return res.status(500,{
          message: "error",
          data : error
      })
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