const mysqlcon = require("../config/db_connection");
const crypto = require("crypto");
const helpers = require("../helper/defaultheler");
const homemodel = require("../helper/homemodel")
const md5 = require('md5'); 
const { log } = require("console");
const randomBytes = require('crypto').randomBytes;
currentDate = new Date()
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;
const axios = require('axios');

let randomBytesBuffer = randomBytes(20);
// let hexString = randomBytesBuffer.toString('hex');
const txTime = new Date().toISOString().replace(/[^0-9]/g, ''); // Remove non-numeric characters


module.exports.BankPaymentInr = async (req, res) =>{
    try{
       let {order_id,
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
        pay_by ,
        pg_id,
        upi_id,
        ammount_type,
        orderNo} = req.body
        console.log(req.body.currency);
        let bodyDataArray = Object.values(req.body);
        var request= bodyDataArray;
        let paymentCode = 'cricpaydemo'

        function validation() {
            merchantno = merchantno === "" ? "" : parseInt(merchantno);
            mobile_no = mobile_no === "" ? "" : parseInt(mobile_no);
            pincode = pincode === "" ? "" : parseInt(pincode);
            amount = amount === "" ? "" : parseInt(amount);
            // currency = req.body.currency;
           
           let detail1 = {merchantno,amount,mobile_no,pincode}
           let detail2 = {fname,lname,address,city,state,email}
            
            for (let key in detail1) { 
               console.log(detail1[key])
               if(detail1[key]==="")
               {
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
                   console.log(detail2[key])
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
            
            }else if(req.body.pay_by == 3 || req.body.pay_by ==   4 || req.body.pay_by == 6){
                req.body.paymentCode,
                req.bodycard_number = '',
                req.bodyexpiration_month = '',
                req.bodyexpiration_year = '',
                req.bodysecurity_code = '',           
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

            const return_url = req.body.return_url || '';  // Here we can pass return url link
                   
            let amount_come = req.body.amount;
            let currency = req.body.currency;


            
                    let blockUser = ['trphan@naver.com', '821039007477'];
                    // console.log(blockUser);
         
                    if (blockUser.includes(email) || blockUser.includes(mobile_no)) {
                        const data = {
                            order_id: order_id,
                            orderAmount: amount_come,
                            requestedAmount: amount_come,
                            currency: currency,
                            txStatus: 'FAILED',
                            txMsg: "Unable to complete your deposit transaction. Please connect to admin",
                            txTime: dateTime,
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
                    if(req.body.paymentCode == 'IDRMDRVA'){
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

                    let sqldetail = "SELECT tbl_user.*,gateway_detail.gatewayNO FROM tbl_user INNER JOIN gateway_detail ON tbl_user.id = gateway_detail.merNo WHERE gateway_detail.merNo = ? AND gateway_detail.type = ? AND gateway_detail.currency = ? ";
                    let resultdetail = await mysqlcon(sqldetail,[merchantno, pay_by, currency]);
                  
                    if (resultdetail == '') {
                        const data = {
                            order_id: order_id,
                            orderAmount: amount_come,
                            requestedAmount: amount_come,
                            currency: req.body.currency,
                            txStatus: 'FAILED',
                            txMsg: 'No gateway assigned for your current payment method. Contact with admin.',
                            txTime: dateTime,
                            txCode: 'SUCC202',
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                            url: return_url,
                        };
                        res.send(data);
                    
                    } 
                    
                    let sqlgetswapgateway = "SELECT * FROM merchant_bank_swap WHERE merchant_id = ? AND bankcode = ? AND primary_gateway = ? AND status = 1";
                    let resultgetswapgateway = await mysqlcon(sqlgetswapgateway,[ merchantno, paymentCode, resultdetail[0].gatewayNO])
                    
                    if(!resultgetswapgateway){
                        resultdetail[0].gatewayNO = resultgetswapgateway.switch_gateway;
                    }
                    
                    if (pay_by !== 3) {    

                    let sqlValidate = "SELECT * FROM tbl_code WHERE akontocode = ? AND payment_gate = ?";
                    let validate_bank_code = await mysqlcon(sqlValidate,[paymentCode, resultdetail[0].gatewayNO,]);
                   
                    
                    if (validate_bank_code == '') {
                        var data = {
                            order_id: order_id,
                            orderAmount: amount_come,
                            requestedAmount: amount_come,
                            currency: currency,
                            txStatus: 'FAILED',
                            txMsg: 'This Bankcode is not found on the assigned gateway.',
                            txTime: dateTime,
                            txCode: 'SUCC202',
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                            url: return_url
                        }     
                    }
                    if (data != null) {
                        return res.status(200,
                            {data});
                    }
                    }
                    if(resultdetail[0].gatewayNO = 1920){  //gateway number  
                            // here Provide Array of currency & min and max amount
                            
                    
                            var amt_array = [{
                                'INR':{
                                    'min':'100',
                                    'max': '6000'
                                },
                                'BRL':{
                                    'min':'100',
                                    'max': '1000'
                                }
                            }]
                            if(!amt_array[currency]){
                                var min = amt_array[0][currency].min;
                                var max = amt_array[0][currency].max;
                                if(amount < min || amount > max){
                                    let data = {
                                        order_id: order_id,
                                        orderAmount: amount_come,
                                        requestedAmount: amount_come,
                                        currency: currency,
                                        txStatus: 'FAILED',
                                        txMsg: `Your amount must be ${currency} ${min} and max amount must be ${currency} ${max}.`,
                                        txTime: dateTime,
                                        txCode: 'SUCC202',
                                        checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                        url: return_url
                                    }
                                    console.log(data);
                                    if (data != null) {
                                            return res.status(200,
                                                {data});
                                           } 
                                }
                            }
                        };
                  
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
                              
                                let assigngatewayid = resultdetail[0].gateway_id;
                                if(assigngatewayid == '0' || assigngatewayid == '13') {
                                    assigngatewayid == '3';
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
                                let rolling_reverse_months = parseInt(resultdetail[0].rolling_reverse_months);
                                let currentDate = new Date();
                                let rolling_reverse_on = new Date(currentDate.setMonth(currentDate.getMonth() + rolling_reverse_months));

                                // Format rolling_reverse_on as "Y-m-d H:i:s"
                                req.body.rolling_reverse_on = rolling_reverse_on.toISOString().slice(0, 19).replace('T', ' ');  
                                
                            
                                if(pay_by == 3){
                                    
                                    let assigngatewayid = resultdetail[0].gatewayNO;
                                     
                                    if(paymentCode == 'cricpaydemo') {
                                        assigngatewayid == '1920';
                                    }
                                    
                                    //  *akonto code line* 
                                    // req.body.our_payment_code = paymentCode;
                                    req.body.paymentCode = req.body.paymentCode;
                                    // req.body.paymentCode = getBankCode(assigngatewayid, paymentCode).code;

                                    // Equivalent of $bank_per_charge = getBankChargesByCode($assigngatewayid, $this->input->post('paymentCode'), 1);
                                    var bank_per_charge = await helpers.getBankChargesByCode(assigngatewayid, paymentCode, 1);
                                    
                                }
                
                                let user_id = merchantno;
                                let currency_code = currency;
                                let charges = await helpers.getMerchantPayinCharges(pay_by,currency_code,user_id);
        
                                req.body.our_bank_charge = ((amount * bank_per_charge) / 100);
                                req.body.our_bank_charge_gst = (((req.body.our_bank_charge) * 18) / 100);
                                let our_bank_total_charge_with_gst = (req.body.our_bank_charge + req.body.our_bank_charge_gst);
                                req.body.fiatFee = resultdetail[0].fiat_fee_amount;
                                

                                
                                // Charge By the Bank
                                if(charges !== 0){
                                    req.body.payinCharges = ((amount_come * charges.payin_amount) / 100);
                                    let overAllGstCharges = ((req.body.payinCharges * charges.gst) / 100);
                                    req.body.gstCharges = (((req.body.payinCharges - req.body.our_bank_charge) * charges.gst) / 100);
                                    req.body.settleAmount = (amount_come - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount + req.body.fiatFee));
                                  
                                }else{
                                    req.body.payinCharges = ((amount_come * 3) / 100);
                                    let overAllGstCharges = ((req.body.payinCharges * 0) / 100);
                                    req.body.gstCharges = (((req.body.payinCharges - req.body.our_bank_charge) * 0) / 100);
                                    req.body.settleAmount = (amount_come - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount + req.body.fiatFee));
                                    
                                    
                                }
                                
                                let getwaySql = "SELECT * FROM payment_gateway WHERE gateway_number = ?";
                                let getway = await mysqlcon(getwaySql,[resultdetail[0].gatewayNO])
                            
                                if (getway.length > 0) {
                                    res.send(getway[0].gateway_number);
                                } else {
                                      'Gateway number not found'
                                }

                                // const data = {
                                //     detail: detail,
                                //     title: 'Merchant Payment'
                                // };

                                // const odAmt = parseFloat((amount + 0).toFixed(2));
                                let inputString = `${resultdetail[0].id}#@#${amount_come}@#@${order_id}#@#${mobile_no}#@#${return_url}#@#${resultdetail[0].secretkey}`;
                                var ourChecksum = crypto.createHash('md5').update(inputString).digest('hex');

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
                                
                                
                                if(assigngatewayid == '1920')  { //// cricpayz
                                    let postedCricpayzData = {
                                        amount: req.body.amount,
                                        userId: req.body.email,
                                        merchantCode: 'CP42489090879020612',
                                        transaction_code: req.body.order_id,
                                        // paymentMethod: 'P002',
                                        // upi: '8400137432701@paytm',
                                    };
                                    var row = await helpers.cricPaySetOrder(req, order_id, '1920');
                                    await helpers.userOrderWatingStatusUpdate(order_id);
                                    await helpers.userOrderPendingStatusUpdate(order_id, 1);
                                    let cricpayzData ={
                                        user_id: merchantno,
                                        post_data: JSON.stringify(request),
                                        akonto_request:JSON.stringify(postedCricpayzData),
                                        order_id: req.body.order_id,
                                        created_on: new Date(),
                                    }
                                    let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                    await mysqlcon(sqlInsert,[cricpayzData]);
                                        let response = await axios.post('https://boapi.cricpayz.io:14442/api/appuser/generateOrder', postedCricpayzData, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    let mayank2 = '';
                                    var mayank = response.data;
                                    var adarsh = mayank.orderId
                                    console.log(mayank);
                                   let bankcurl = ''
                                    if (adarsh) {
                                        let orderId = adarsh;
                                        let getOrderDetailsUrl = `https://boapi.cricpayz.io:14442/api/appuser/getOrderDetails?orderId=${orderId}`;
                                        let getOrderDetailsResponse = await axios.get(getOrderDetailsUrl);
                                        let bankResponse = await getOrderDetailsResponse.data;
                                          bankcurl = bankResponse
                                        let vijay = `https://boapi.cricpayz.io/`
                                        let vishwa = bankResponse.data.UpiDetails.QRDetails
                                        // let hemant = vijay+vishwa
                                        // let nishtha = bankResponse.data.trn_id
                                        // let nishtha1 = bankResponse.data.uid
                                        // let nishtha2 = bankResponse.data.UpiDetails.upi
                                        // let Vishwa_data = {
                                        //     uid: nishtha1,
                                        //     trn_id: nishtha,
                                        //     paid_to: nishtha2,
                                        //     utr: '879756845569593',
                                        //     bankType: '1'
                                        // };
                                        // return res.send(Vishwa_data);
                                        // let responses = await axios.post('https://boapi.cricpayz.io:14442/api/appuser/doDeposit', Vishwa_data, {
                                        // headers: {
                                        //     'Content-Type': 'application/json'
                                        // }
                                        // })
                                        // mayank2 = responses.data;
                                        // return res.send(mayank2);
                                    }
                                    let bankInfo = {
                                        amount: bankcurl.data.amount,
                                        trn_id: bankcurl.data.trn_id,
                                        uid: bankcurl.data.uid,
                                        order_no: order_id
                                      };
                                    if(pay_by == 3){
                                        let bdetail = 'BankDetails';
                                        if (amount > 500000) {
                                          bdetail = 'RTGSDetails';
                                        } else if (amount > 200000) {
                                          bdetail = 'NEFTDetails';
                                        }
                                        bankInfo.account_holder = bankcurl.data[bdetail].account_holder;
                                        bankInfo.account_number = bankcurl.data[bdetail].account_number;
                                        bankInfo.bank_name = bankcurl.data[bdetail].bank_name;
                                        bankInfo.ifsc_code = bankcurl.data[bdetail].ifsc_code;
                                        bankInfo.paid_to = `${bankInfo.account_holder}_${bankInfo.account_number}`;
                                        bankInfo.bank_type = bankcurl.data[bdetail].bankType;
                                        bankInfo.qr = 0;
                                        const requestData = {
                                            data: bankInfo
                                        };
                                        const saveInfo = {
                                            bank_res: bankcurl.status,
                                            account_info: requestData.data
                                        };
                                        const bank_log = {
                                            order_id: orderNo,
                                            pg_response_in_json: JSON.stringify(saveInfo),
                                            created_on: new Date().toISOString()
                                        };
                                        // Assuming you have a MySQL connection pool, and 'pool' is your pool instance
                                        const sqlInsert = 'INSERT INTO tbl_payment_gate_response_tale SET ?';
                                        await mysqlcon(sqlInsert,[bank_log]);
                                        console.log("hello");
                                        return res.send(saveInfo)
                                    }
                                }
                                else if(assigngatewayid == '1942')  { // Payport
                                    amountpayport = parseFloat(amount)
                                    let payport = {
                                        amount: amountpayport,
                                        currency: currency,
                                        exact_currency: 1, // static 0 or 1
                                        locale: 'en',
                                        customer_id: order_id,
                                        // client_name: `${req.body.fname} ${req.body.lname}`,
                                        // client_email: email
                                      };
                                      
                                      var row = await helpers.payportSetOrder(req, order_id, 1942);
                                      await helpers.userOrderWatingStatusUpdate(order_id);   
                                      await helpers.userOrderPendingStatusUpdate(req, order_id, 1);
                                    
                                      let bankResponse = await helpers.payport_deposite(payport);
                                      
                                      let payportData ={
                                        user_id: merchantno,
                                        post_data: JSON.stringify(request),
                                        akonto_request: (payport),
                                        order_id: req.body.order_id,
                                        created_on: new Date(),
                                    }
                                    let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                    await mysqlcon(sqlInsert,[payportData]);

                                    let bankLog = {
                                        order_id: order_id,
                                        pg_response_in_json: JSON.stringify(bankResponse),
                                        created_on: dateTime,
                                        };
                                        console.log(bankLog);
                                        
                                    let sqlInsertpaymentGet = "INSERT INTO tbl_payment_gate_response_tale SET ? "
                                    await mysqlcon(sqlInsertpaymentGet,[bankLog]);

                                    let invoice_id = '';
                                    
                                    if (bankResponse.invoice_ids && bankResponse.invoice_ids.trim() !== '') 
                                    {
                                        invoice_id = bankResponse.invoice_ids;
                                        let sql = `UPDATE tbl_merchant_transaction SET transaction_id = ? WHERE order_no = ?`;
                                        await mysqlcon(sql,[invoice_id, order_id])
                                      
                                    }  
                                    
                                    if (bankResponse.approved.status == 1 && bankResponse.impData) 
                                    {
                                        
                                        let account_info = {
                                          bc_order: order_id,
                                          invoice_id: invoice_id,
                                          info: bankResponse.impData,
                                          order_id: req.body.user_txn_id,
                                          orderAmount: amount,
                                          requestedAmount: amount,
                                          currency: currency,
                                          txStatus: 'PENDING',
                                          txMsg: 'Transaction pending',
                                          txTime: new Date(),
                                          txCode: 'SUCC201',
                                          checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                        //   checksum: md5(mid + '|' + account_info.orderAmount + '|' + account_info.txStatus + '|' + account_info.txTime + '|' + account_info.order_id + '|' + resultdetail[0].secretkey),
                                          url: return_url,
                                        };
                                      
                                        return res.send(account_info);
                                    }
                                       
                                }

                            }
                        }
                    }else{
                        
                        let data = {
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
                        };
                        return res.status(200).json({ data });
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
                        return res.status(200).json({ data });
                    }
                
            
        }
    }catch(error){
        console.log(error);
        return res.status(500).json(500,{
            message: 'Internal Server Error',
            error: error.message // Return t
        })
    }
};

module.exports.payPlanetCreate = async (req, res) => {  // 1979
    try {
        let {pan,cvv,month,year,holder} = req.body
        let secretKey = 'a189c37a-00ae-4f5c-93c6-380c671df0fa';
        let endpoint = 'ba14367b-efc5-4ca0-b79e-04eb6afac721';

        let amount = 1000;
        let currency = 978;
        let description = 'desc';
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
            client_id: clientId,
            success_url: successUrl,
            fail_url: failUrl,
            notify_url: notifyUrl,
            buyer: {
                ip: buyerIp,
            },
        };

        let jsonData = JSON.stringify(data);
        let secdata = secretKey + jsonData;
        let sign = crypto.createHash('sha256').update(secdata).digest('hex');

        let txValue = await helpers.payplanetcreateresponse(jsonData, sign);
        let txcreatevalue = txValue.info.tx;

        // let month = 10
        // let year = 27
        let expire = month +''+ year

        let paymentdata = {
            endpoint: endpoint,
            tx: txcreatevalue,
            pan: pan,
            cvv: cvv,
            expire: expire,
            // holder: holder,
        };

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

        let responseinfo = await helpers.payplanetinforesponse(jsoninfo,signinfo)

        return res.send(responseinfo);

    } catch (error) {
        return res.status(error.response ? error.response.status : 500).json({
            message: error.response ? error.response.data : 'Internal Server Error',
        });
    }
};


module.exports.currency = async function (req, res) {
    try {
      let sql = "SELECT sortname as currency from countries WHERE status = 1"
      let result = await mysqlcon(sql)
      return res.status(200).json( {
        result
      });
    } catch (error) {
      return res.status(500).json( {
        message: "error occurered",
        error: error,
      });
    }
}

module.exports.state = async function (req, res) {
    try {
       
      let sql = "SELECT name AS state from states where country_id=101"
      let result = await mysqlcon(sql)
      res.send(result)
    } catch (error) {
      return res.status(500).json( {
        message: "error occurered",
        error: error,
      });
    }
}

module.exports.crickpayTransRes = async(req, res) =>{
    let {uid, trn_id, paid_to, utr, bankType} = req.body
    let Vishwa_data = {
        uid: uid,
        trn_id: trn_id,
        paid_to: paid_to,
        utr: utr,
        bankType: bankType
    };
    console.log(req.body);
    // return res.send(Vishwa_data);
    let responses = await axios.post('https://boapi.cricpayz.io:14442/api/appuser/doDeposit', Vishwa_data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let responseMessage = responses.data;
    return res.send(responseMessage);
}



module.exports.getMerchantGateeeeee = async(req, res) =>{
    try{
    let currency = req.body.currency;
    let mer_id = req.body.merchantno;
    let type = req.body.pay_by
    console.log(req.body);

    let sqlDetails = "SELECT * FROM tbl_user WHERE id = ?";
    let reslutDetail = await mysqlcon(sqlDetails,[mer_id])
    
    if (reslutDetail.length > 0) {
        let bank_ids = reslutDetail[0].bankid; // Replace this with your actual comma-separated string

        // Splitting the string by comma and creating an array
        let bankIdsArray = bank_ids.split(',');

        // Joining the array elements with quotes and commas to create a quoted comma-separated string
        // let formattedBankIds = "'" + bankIdsArray.join("','") + "'";
        let formattedBankIds = bankIdsArray.join("','");


        let sql = `SELECT tbl_code.*, tbl_akonto_banks_code.currencies FROM tbl_code INNER JOIN tbl_akonto_banks_code ON tbl_code.akontocode = tbl_akonto_banks_code.code WHERE tbl_code.payment_gate = (SELECT gatewayNo FROM gateway_detail WHERE gateway_detail.currency = '${currency}' AND gateway_detail.type = '${type}' AND merNo = ${mer_id})AND tbl_code.akontocode IN('${formattedBankIds}') AND tbl_code.status = 1 AND FIND_IN_SET('${currency}', tbl_akonto_banks_code.currencies) AND tbl_code.type = '${type}'  GROUP BY tbl_code.akontocode`

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




module.exports.akontoAppnitPaymentResponse = async(req, res) =>{
    try{

        if (req.body && Object.keys(req.body).length !== 0) {
            const responseparams = 'param1=value1|param2=value2';

           // Splitting the string using '|' as the separator
            const val = responseparams.split('|');

            // Extracting values from the split array
            const val2 = val[1].split('=');
            const val3 = val[0].split('=');
            const responseparam = 'someValue|binNumber=12345';

            // Replace '|binNumber=' with an empty string and concatenate with additional string
            const has = responseparam.replace('|binNumber=', '') + '|ldDo3Z/ylfl+IWo+0JzssFRwZMxi19gFS+Bff8yNhFg=';

            if (val2[1] == 1301) {
                const hashval = crypto.createHash('sha256').update(has).digest('hex');
                // console.log('SHA-256 Hash:', hashval);
                if (responseCodeFromPost === val2[1] && val3[1].toUpperCase() === messageFromPost.toUpperCase()) 
                {
                    if (hashval === hashFromPost && val2[1] !== '1301') {
                        let status = 0; // Variable for status
                        if (val2[1] === '01') {
                            messages = "Thank you Transaction is Succeeded.";
                            pay_status = 'SUCCESS';
                            status = 1;
                            msg = messageFromPost;
                        }else if(val2[1] === '0001'){
                            messages = "Transaction is Failure.";
                            pay_status = 'FAILED';
                            status = 0;
                            msg = messageFromPost;
                        }else if(val2[1] === '1303'){
                            messages = "Transaction is Failure.";
                            pay_status = 'FAILED';
                            status = 0;
                            msg = messageFromPost;
                        }else if(val2[1] === '0001'){
                            messages = "Transaction is Failure.";
                            pay_status = 'FAILED';
                            status = 0;
                            msg = messageFromPost;
                        }else if(val2[1] == '1301'){
                            messages = "Transaction is Failure.";
                            pay_status = 'FAILED';
                            status = 0; 
                            msg = (msg_response[24] !== undefined && msg_response[24] !== "NA") ? msg_response[24] : 'Transaction failed from bank end.';
                        }else{
                            pay_status = 'FAILED';
                            status = 0;
                            msg = messageFromPost; 
                        }

                        var our_order_id = req.body.appTransId;
                        var trx_id = req.body.bankTxnId;
                    }else{
                        pay_status = 'FAILED';
                        our_order_id = req.body.appTransId;
                        trx_id = req.body.bankTxnId;
                        status = 0;
                        msg = req.body.message;
                    }
                }else{
                    pay_status = 'FAILED';
                    our_order_id = req.body.appTransId;
                    trx_id = req.body.bankTxnId;
                    status = 0;
                    msg = req.body.message;
                }
            }else{
                pay_status = 'FAILED';
                our_order_id = req.body.appTransId;
                trx_id = req.body.bankTxnId;
                status = 0;
                msg = req.body.message;
            }

            const data = {
                order_id: our_order_id, // Replace 'our_order_id' with your variable holding the order ID
                pg_response_in_json: JSON.stringify(req.body), // Assuming req.body holds the POST data
                created_on: new Date().toISOString() // Current timestamp in ISO format
            };

            let sqlInsert = "INSERT INTO tbl_payment_gate_response_tale SET ? ";
            await mysqlcon(sqlInsert,[data]);

            let AppnitResponce = checkPaymentStatusWithAppnit(our_order_id); // Replace our_order_id with your order ID

            // Split the response using '|'
            AppnitResponce = AppnitResponce.split('|');

            // Further split the obtained part using '='
            AppnitResponce = AppnitResponce[0].split('=');

            // Access the value after the '='
            AppnitResponce = AppnitResponce[1];

            let status = 0;
            if (AppnitResponce.toUpperCase() === 'SUCCESS') {
                status = 1; // Set status to 1 if 'SUCCESS'
                const row = updateOrderStatus(1856, our_order_id, trx_id, status, msg);   
            }
            if (AppnitResponce.toUpperCase() === 'Pending') {
                status = 3;
                const row = updateOrderStatus(1856, our_order_id, trx_id, status, msg);
            }
            if (AppnitResponce.toUpperCase() === 'ABANDONED'.toUpperCase()) {
                status = 0; // Set status to 0 if 'Abandoned' (case insensitive)
                const row = updateOrderStatus(1856, our_order_id, trx_id, status, msg);
            }

            var current_transaction = await homemodel.merchantOrderDetails(our_order_id);
            // Check if the 'status' property is equal to 1
            if (current_transaction.status === 1) {
                state = "SUCCESS";
                state_code = "SUCC200";
            }
            if (current_transaction.status === 0) {
                state = "FAILED";
                state_code = "SUCC202";
            }
            if (current_transaction.status === 2) {
                state = "WAITING";
                state_code = "WAIT200";
            }else{
                state = "PENDING";
                state_code = "SUCC201";
            }

            /* Code for new order_id send condition */
            if (current_transaction.new_trx === 1) {
                od_id = current_transaction.txn_id;
            } else {
                od_id = current_transaction.order_no;
            }

            var udetail = await homemodel.getDetailBymer(current_transaction.user_id);
            const jdata = {
                order_id: order_id,
                orderAmount: current_transaction.ammount,
                requestedAmount: current_transaction.txn_amount ? current_transaction.txn_amount : current_transaction.ammount,
                currency: current_transaction.ammount_type,
                txStatus: status,
                txMsg: current_transaction.payment_status,
                txTime: current_transaction.created_on,
                txCode: state_code,
                checksum: md5(`${current_transaction.user_id}|${current_transaction.ammount}|${txStatus}|${current_transaction.created_on}|${order_id}|${udetail.secretkey}`),
                url: return_url
            }
            
            // Check if $_SESSION['static_end_point_url'] or $current_transaction->end_point_url is not empty
            if ((typeof $_SESSION !== 'undefined' && $_SESSION['static_end_point_url']) || (typeof current_transaction !== 'undefined' && current_transaction.end_point_url)) {
                if(current_transaction.status == 1 || current_transaction.status == 0){  
                    var end_point_response = helpers.merchantPaymentStatusUpdateOnEndPoint(jdata, current_transaction.end_point_url);
                    const data = {
                        end_point_response : end_point_response
                    }
                    await helpers.merchantPaymentDbStatus(current_transaction.order_no);  
                    const insertData = {
                        order_no: order_id,
                        data: JSON.stringify(data),
                        created_on: new Date().toISOString()
                    };
                    let sql = "INSERT INTO tbl_cron_log SET ? ";
                    await mysqlcon(sql,[insertData])
                }
            }
            url = current_transaction.redirection_url;
            res.render('cash_free_success_form', {jdata});

        }


    }catch(error){
        console.log(error);
        return res.status(500,{
            message : 'error',
            data : error
        })
    }
};