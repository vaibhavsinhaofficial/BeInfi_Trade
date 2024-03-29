const mysqlcon = require("../config/db_connection");
const crypto = require("crypto");
const helpers = require("../helper/defaultheler");
const axios = require('axios');
const md5 = require("md5");
currentDate = new Date();
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + " " + time;

const txTime = new Date().toISOString().replace(/[^0-9]/g, ""); // Remove non-numeric characters
const homesupport = require("../helper/homemodel")
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');


module.exports.hemantTest = async (req, res) =>{
    try {
        let { 
            order_id,
            merchantno,
            amount,
            fname,
            lname,
            email,
            currency,
            mobile_no,
            pay_by,
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
            pg_id,
            upi_id,
            ammount_type,
            orderNo ,
            cvv,
            card_number,
            month,
            year,
        } = req.body

        function validation() {
            merchantno = merchantno === "" ? "" : parseInt(merchantno);
            mobile_no = mobile_no === "" ? "" : parseInt(mobile_no);
            pincode = pincode === "" ? "" : parseInt(pincode);
            amount = amount === "" ? "" : parseInt(amount);
            
            let detail1 = {merchantno,amount,mobile_no,pincode}
            let detail2 = {fname,lname,address,city,state,email}
            
            for (let key in detail1) { 
            //    console.log(detail1[key])
                if(detail1[key]==="") {
                    return res.send(`Please provided a some data in field ${key}`)
                }
                if ((typeof(detail1[key]) === "string" || isNaN(detail1[key]) )) {
                    return res.send(`You must provided a numeric value in ${key}`);
                }
                if (key === "mobile_no" && (detail1[key].toString().length !== 10)) {
                   return res.send(`Please enter correct mobile Number`);
                }
            }
            for(let key in detail2) {
                // console.log(detail2[key])
                if(detail2[key]==="") {
                    return res.send(`Please provided a some data in field ${key}`)
                }
                if(typeof(detail2[key]) === "number" ||  /^\d+$/.test(detail2[key]) ){
                    return res.send(`You must provided a string value in field ${key}`)
                }   
            }
        }
        validation();

        let sqlExits = "SELECT * FROM tbl_user WHERE id = ?"
        let resultExist = await mysqlcon(sqlExits,[merchantno])
        // return res.send(resultExist[0])

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
            }else if(req.body.pay_by === 2){
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
            }else if(req.body.pay_by === 5){
                req.body.paymentCode,
                card_number = '',
                expiration_month = '',
                expiration_year = '',
                security_code = '',           
                upi_id = ''
            }
            
            // Simulated block_user array
            const blockUser = ['trphan@naver.com', '8210390074'];
            const return_url = req.body.return_url || '';  // Here we can pass return url link

            // console.log(blockUser.includes(req.body.mobile_no));
            if (blockUser.includes(req.body.email) || blockUser.includes(req.body.mobile_no)) {
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
                return res.send(data)
            }

            let sqldetail = "SELECT tbl_user.*,gateway_detail.gatewayNO FROM tbl_user INNER JOIN gateway_detail ON tbl_user.id = gateway_detail.merNo WHERE gateway_detail.merNo = ? AND gateway_detail.type = ? AND gateway_detail.currency = ?";
            let resultdetail = await mysqlcon(sqldetail,[merchantno, pay_by, currency]);

            if(resultdetail.length === 0){
                const data = {
                    order_id: order_id,
                    orderAmount: req.body.amount,
                    requestedAmount: req.body.amount,
                    currency: currency,
                    txStatus: 'FAILED',
                    txMsg: `No gateway assigned for ${resultExist[0].name} (${merchantno}). Please Contact with admin.`,
                    txTime: dateTime,
                    txCode: 'SUCC202',
                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                    url: return_url,
                };
                return res.send( {data});
            } else {
                let payment_codeSql = "SELECT akontocode FROM tbl_code WHERE payment_gate = ?"
                let payment_codeResult = await mysqlcon(payment_codeSql,[resultdetail[0].gatewayNO]);
                let sqlAmount = "SELECT * FROM tbl_set_limit  WHERE user_id = ? AND gateway = ? AND currency = ?"
                let merchant_c_limit = await mysqlcon(sqlAmount,[merchantno, resultdetail[0].gatewayNO, currency]);

                // ----------- CHECK LIMIT ------------ //
                if(resultdetail[0].gatewayNO == 1959){  //Redipay Gateway
                    if(req.body.amount < merchant_c_limit[0].min || req.body.amount > merchant_c_limit[0].max){
                        var data = {
                            order_id: order_id,
                            orderAmount: req.body.amount,
                            requestedAmount: req.body.amount,
                            currency: req.body.currency,
                            txStatus: 'FAILED',
                            txMsg: `Your min amount must be ${currency} ${merchant_c_limit[0].min} and max amount must be ${req.body.currency} ${merchant_c_limit[0].max}.`,
                            txTime: dateTime,
                            txCode: 'SUCC202',
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                            url: return_url
                        }
                        return res.send(data)
                    }   
                } else if(resultdetail[0].gatewayNO == 1979){   //payplanet
                    if(req.body.amount < merchant_c_limit[0].min || req.body.amount > merchant_c_limit[0].max){
                        var data = {
                            order_id: order_id,
                            orderAmount: req.body.amount,
                            requestedAmount: req.body.amount,
                            currency: req.body.currency,
                            txStatus: 'FAILED',
                            txMsg: `Your min amount must be ${currency} ${merchant_c_limit[0].min} and max amount must be ${req.body.currency} ${merchant_c_limit[0].max}.`,
                            txTime: dateTime,
                            txCode: 'SUCC202',
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                            url: return_url
                        }
                        return res.send(data)
                    }
                
                }

                const payment_block_array = [{
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
                        if(payment_block_array[0][req.body.pay_by] = 2){
                            let sqlcheckOrderAlreadyExist = "SELECT * FROM tbl_merchant_transaction WHERE order_no LIKE '%" + order_id + "%' OR txn_id LIKE '%" + order_id + "%'";
                            let order_idExist = await mysqlcon(sqlcheckOrderAlreadyExist);
                            if(order_idExist.length > 0 && order_idExist[0] && order_idExist[0].order_no !== undefined){
                                var data = {
                                    order_id: order_id,
                                    orderAmount: req.body.amount,
                                    requestedAmount: req.body.amount,
                                    currency: req.body.currency,
                                    txStatus: 'FAILED',
                                    txMsg: `Order NO Already Exists`,
                                    txTime: dateTime,
                                    txCode: 'SUCC202',
                                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                    url: return_url
                                }
                                res.status(200).json({ data });
                            } else {
                                let assigngatewayid = resultdetail[0].gatewayNO;
                                console.log("gate", assigngatewayid);
                                if (req.body.pay_by == 1){
                                    let assigngatewayid = resultdetail[0].gatewayNO;
                                    var search_string = await helpers.getCardVerifyCode(card_number);
                                    var bank_per_charge = await helpers.getCardVerifyCode(assigngatewayid, search_string, 0);
                                    req.body.our_payment_code = payment_codeResult[0].akontocode;
                                    var bank_per_charge = await helpers.getBankChargesByCode(assigngatewayid, payment_codeResult[0].akontocode, 1);
                                    req.body.our_bank_charge = (req.body.amount * bank_per_charge) / 100;
                                    req.body.our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                                    let our_bank_total_charge_with_gst = req.body.our_bank_charge + req.body.our_bank_charge_gst;
                                } else if (req.body.pay_by == 2) {
                                    var bank_per_charge = await helpers.getBankChargesByCode(resultdetail[0].gatewayNO, 0, 'UPI');
                                    const tmp_upi_id = req.body.upi_id;
                                    if(tmp_upi_id){
                                        var upiID = tmp_upi_id.split('@')[0].toLowerCase( )
                                    }
                                } else if(pay_by == 3){
                                    let assigngatewayid = resultdetail[0].gatewayNO;
                                    req.body.our_payment_code = payment_codeResult[0].akontocode;
                                    var bank_per_charge = await helpers.getBankChargesByCode(assigngatewayid, payment_codeResult[0].akontocode, 1);
                                    req.body.our_bank_charge = (req.body.amount * bank_per_charge) / 100;
                                    req.body.our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                                    let our_bank_total_charge_with_gst = req.body.our_bank_charge + req.body.our_bank_charge_gst;
                                        
                                } else if(req.body.pay_by == 4){
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
                                    
                                } else if(req.body.pay_by === 5){
                                    const assigngatewayid = resultdetail[0].gatewayNO; 
                                    req.body.our_payment_code = req.body.paymentCode;
                                    
                                    /*akonto code line*/
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

                                let charges = await helpers.getMerchantPayinCharges(pay_by, currency, merchantno);
                                if(charges!== 0){
                                    req.body.payinCharges = (req.body.amount * charges.payin_amount) / 100;
                                    var overAllGstCharges = (req.body.payinCharges * charges.gst) / 100;
                                    req.body.gstCharges = ((req.body.payinCharges - req.body.our_bank_charge) * charges.gst) / 100;
                                    req.body.rolling_reverse_amount = (amount * resultdetail[0].rolling_reverse) / 100;
                                    req.body.settleAmount = req.body.amount - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount);
                                }
                                
                                let inputString = `${resultdetail[0].id}#@#${req.body.amount}@#@${order_id}#@#${mobile_no}#@#${return_url}#@#${resultdetail[0].secretkey}`;
                                let ourChecksum = crypto.createHash('md5').update(inputString).digest('hex');
                                
                                if (pay_by === 1) { 
                                    // Card Data
                                    ourChecksum = (inputString)
                                } else if (pay_by == 2){
                                    // UPI
                                    ourChecksum = (inputString)
                                } else if (pay_by == 3  || pay_by == 4 ){
                                    // Net Banking and Wallet
                                    ourChecksum = (inputString)
                                } else if (pay_by === 5){
                                    // QR
                                    ourChecksum = (inputString)
                                }

                                // ---------- GATEWAY CODE ----------- //
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
                                        amount = req.body.amount ,
                                        reference_no = req.body.order_id ,
                                        item = req.body.description ,
                                        callback_url =  req.body.callback_url ,
                                        email = req.body.email ,
                                        phone = req.body.mobile_no,
                                        name =  req.body.fname 
                                        
                                    ];
                                    const tokenResponses = await axios.post('https://pay.redipay.app/api/payments/payment',  {
                                        amount : req.body.amount ,
                                        reference_no : order_id ,
                                        item : req.body.description ,
                                        callback_url :  req.body.callback_url ,
                                        email : req.body.email ,
                                        phone : mobile_no,
                                        name :  req.body.fname },{
                                        headers: {
                                            'Authorization': `Bearer ${accessToken}`,

                                        }
                                    });
                                    let bankResponse = tokenResponses.data;
                                    // res.status(200).json({ req });
                                    await helpers.keye2paySetOrder(req, order_id, 1959);
                                    await helpers.userOrderWatingStatusUpdate(order_id);
                                    await helpers.userOrderPendingStatusUpdate(order_id, 1);
                                    
                                    var data1959 ={
                                        user_id: merchantno,
                                        post_data: JSON.stringify(req.body),
                                        akonto_request: JSON.stringify(postArray),
                                        order_id: req.body.order_id,
                                        created_on: dateTime,
                                    }

                                    let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                    await mysqlcon(sqlInsert,[data1959]);

                                    let bankLog = {
                                        order_id: order_id,
                                        pg_response_in_json: JSON.stringify(bankResponse),
                                        created_on: dateTime,
                                    };

                                    let sqlInsertpaymentGet = "INSERT INTO tbl_payment_gate_response_tale SET ? "
                                    await mysqlcon(sqlInsertpaymentGet,[bankLog]);

                                    let replaceUrl = bankResponse.payment_url.split("link/");
                                    replaceUrl = replaceUrl[0].split("link/");
                                    console.log("hgey", replaceUrl);

                                    let mainurl = '';

                                    if (replaceUrl[0] === 'https://paya.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://paya.redipay.app/pay/link/", "https://secure-rdp-a.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payb.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payb.redipay.app/pay/link/", "https://secure-rdp-b.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payc.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payc.redipay.app/pay/link/", "https://secure-rdp-c.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payd.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payd.redipay.app/pay/link/", "https://secure-rdp-d.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://paye.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://paye.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payf.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payf.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payg.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payg.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payh.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payh.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payi.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payi.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payj.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payj.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payk.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payk.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payl.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payl.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://paym.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://paym.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payn.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payn.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payo.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payo.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payp.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payp.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payq.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payq.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payr.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payr.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://pays.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://pays.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payt.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payt.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payu.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payu.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payv.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payv.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payw.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payw.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payx.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payx.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payy.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payy.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    } else if (replaceUrl[0] === 'https://payz.redipay.app/pay/') {
                                    mainurl = bankResponse.payment_url.replace("https://payz.redipay.app/pay/link/", "https://secure-rdp-e.bankconnect.tech/pay/link/");
                                    }
                                    const main_payment_url = mainurl + '?' + "payment_channel=" + payment_codeResult[0].akontocode;
                                    // return res.status(200).json({ main_payment_url });
                                    return res.json(200, {
                                        main_payment_url,
                                        bankResponse
                                    });
                                } else if(assigngatewayid == '1979'){
                                    let secretKey = 'a189c37a-00ae-4f5c-93c6-380c671df0fa';
                                    let endpoint = 'ba14367b-efc5-4ca0-b79e-04eb6afac721';
                                    
                                    let currency = 978;
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
                            
                                    let jsonData = JSON.stringify(data);
                                    let secdata = secretKey + jsonData;
                                    let sign = crypto.createHash('sha256').update(secdata).digest('hex');
                                    let txValue = await helpers.payplanetcreateresponse(jsonData, sign);
                                    let txcreatevalue = txValue.info.tx;
                                    
                                    let expire = month +''+ year
                                    // console.log("im call");
                                    
                                    let paymentdata = {
                                        endpoint: endpoint,
                                        tx: txcreatevalue,
                                        pan: card_number,
                                        cvv: cvv,
                                        expire: expire,
                                    }
                            
                                    let jsonpaymentvalue = JSON.stringify(paymentdata);
                                    let secdataprocess = secretKey + jsonpaymentvalue;
                                    let signprocess = crypto.createHash('sha256').update(secdataprocess).digest('hex');
                                    // return res.send(signprocess)
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
                                        post_data: JSON.stringify(req.body),
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
                    } else{  
                        const data = {
                            order_id: order_id, // Assuming you have access to the request body
                            orderAmount: req.body.amount, // Assuming you have access to the request body
                            requestedAmount: req.body.amount, // Assuming you have access to the request body
                            currency: currency, // Assuming you have access to the request body
                            txStatus: 'FAILED',
                            txMsg: 'Your Web Payment is not enabled. Contact Bankconnect',
                            txTime: dateTime, // Get the current date and time in ISO format
                            txCode: 'SUCC202',                       
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`), // Calculate checksum function call
                            url: return_url
                        };
                        return res.send({data});
                    }
                } else{
                    const data = {
                        order_id: order_id,
                        orderAmount: req.body.amount,
                        requestedAmount: req.body.amount,
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

    } catch (error) {
        console.log(error);
        return res.status(500,{
            message : 'error',
            data : error
        })
    }
};

module.exports.hemantTest1 = async (req, res) =>{
    try {
        let {
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
            pay_by ,
            pg_id,
            upi_id,
            ammount_type,
            orderNo
        } = req.body

        console.log("type", typeof pay_by);

        function validation() {
            merchantno = merchantno === "" ? "" : parseInt(merchantno);
            mobile_no = mobile_no === "" ? "" : parseInt(mobile_no);
            pincode = pincode === "" ? "" : parseInt(pincode);
            amount = amount === "" ? "" : parseInt(amount);
            // currency = req.body.currency;
           
           let detail1 = {merchantno,amount,mobile_no,pincode}
           let detail2 = {fname,lname,address,city,state,email}
            
            for (let key in detail1) { 
               if(detail1[key]==="") {
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
                if(detail2[key]==="") {
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
        // return res.send(resultExist[0])

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
            }else if(req.body.pay_by === 2){
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
            }else if(req.body.pay_by === 5){
                req.body.paymentCode,
                card_number = '',
                expiration_month = '',
                expiration_year = '',
                security_code = '',           
                upi_id = ''
            }
            
            // Simulated block_user array
            const blockUser = ['trphan@naver.com', '8210390074'];
            const return_url = req.body.return_url || '';  // Here we can pass return url link

            // console.log(blockUser.includes(req.body.mobile_no));
            if (blockUser.includes(req.body.email) || blockUser.includes(req.body.mobile_no)) {
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
                return res.send(data)
            }

            let sqldetail = "SELECT gateway_detail.gatewayNO, tbl_user.* FROM tbl_user INNER JOIN gateway_detail ON tbl_user.id = gateway_detail.merNo WHERE gateway_detail.merNo = ? AND gateway_detail.type = ? AND gateway_detail.currency = ?";
            let resultdetail = await mysqlcon(sqldetail,[merchantno, pay_by, req.body.currency]);

            if(resultdetail.length === 0){
                const data = {
                    order_id: order_id,
                    orderAmount: req.body.amount,
                    requestedAmount: req.body.amount,
                    currency: currency,
                    txStatus: 'FAILED',
                    txMsg: `No gateway assigned for ${resultExist[0].name} (${merchantno}). Please Contact with admin.`,
                    txTime: dateTime,
                    txCode: 'SUCC202',
                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                    url: return_url,
                };
                return res.send( {data});
            } else {
                let payment_codeSql = "SELECT akontocode FROM tbl_code WHERE payment_gate = ?"
                let payment_codeResult = await mysqlcon(payment_codeSql,[resultdetail[0].gatewayNO]);
                let sqlAmount = "SELECT * FROM tbl_set_limit  WHERE user_id = ? AND gateway = ? AND currency = ?"
                let merchant_c_limit = await mysqlcon(sqlAmount,[merchantno, resultdetail[0].gatewayNO, req.body.currency]);
                // return res.send(merchant_c_limit)
                // ----------- CHECK LIMIT ------------ //
                if(resultdetail[0].gatewayNO == 1920){  //Cricpays Gateway
                    if(req.body.amount < merchant_c_limit[0].min || req.body.amount > merchant_c_limit[0].max){
                        var data = {
                            order_id: order_id,
                            orderAmount: req.body.amount,
                            requestedAmount: req.body.amount,
                            currency: req.body.currency,
                            txStatus: 'FAILED',
                            txMsg: `Your min amount must be ${currency} ${merchant_c_limit[0].min} and max amount must be ${req.body.currency} ${merchant_c_limit[0].max}.`,
                            txTime: dateTime,
                            txCode: 'SUCC202',
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                            url: return_url
                        }
                        return res.send(data)
                    }   
                }

                const payment_block_array = [{
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
                        if(payment_block_array[0][req.body.pay_by] = 2){
                            let sqlcheckOrderAlreadyExist = "SELECT * FROM tbl_merchant_transaction WHERE order_no LIKE '%" + order_id + "%' OR txn_id LIKE '%" + order_id + "%'";
                            let order_idExist = await mysqlcon(sqlcheckOrderAlreadyExist);
                            if(order_idExist.length > 0 && order_idExist[0] && order_idExist[0].order_no !== undefined){
                                var data = {
                                    order_id: order_id,
                                    orderAmount: req.body.amount,
                                    requestedAmount: req.body.amount,
                                    currency: req.body.currency,
                                    txStatus: 'FAILED',
                                    txMsg: `Order NO Already Exists`,
                                    txTime: dateTime,
                                    txCode: 'SUCC202',
                                    checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
                                    url: return_url
                                }
                                res.status(200).json({ data });
                            } else {
                                let assigngatewayid = resultdetail[0].gatewayNO;
                                console.log("gate", assigngatewayid);
                                if (req.body.pay_by == 1){
                                    let assigngatewayid = resultdetail[0].gatewayNO;
                                    var search_string = await helpers.getCardVerifyCode(card_number);
                                    var bank_per_charge = await helpers.getCardVerifyCode(assigngatewayid, search_string, 0);
                                    req.body.our_payment_code = payment_codeResult[0].akontocode;
                                    var bank_per_charge = await helpers.getBankChargesByCode(assigngatewayid, payment_codeResult[0].akontocode, 1);
                                    req.body.our_bank_charge = (req.body.amount * bank_per_charge) / 100;
                                    req.body.our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                                    let our_bank_total_charge_with_gst = req.body.our_bank_charge + req.body.our_bank_charge_gst;
                                } else if (req.body.pay_by == 2) {
                                    var bank_per_charge = await helpers.getBankChargesByCode(resultdetail[0].gatewayNO, 0, 'UPI');
                                    const tmp_upi_id = req.body.upi_id;
                                    if(tmp_upi_id){
                                        var upiID = tmp_upi_id.split('@')[0].toLowerCase( )
                                    }
                                } else if(pay_by == 3){
                                    let assigngatewayid = resultdetail[0].gatewayNO;
                                    req.body.our_payment_code = payment_codeResult[0].akontocode;
                                    var bank_per_charge = await helpers.getBankChargesByCode(assigngatewayid, payment_codeResult[0].akontocode, 1);
                                    req.body.our_bank_charge = (req.body.amount * bank_per_charge) / 100;
                                    req.body.our_bank_charge_gst = ((req.body.our_bank_charge) * 18) / 100;
                                    let our_bank_total_charge_with_gst = req.body.our_bank_charge + req.body.our_bank_charge_gst;
                                        
                                } else if(req.body.pay_by == 4){
                                    const assigngatewayid = resultdetail[0].gatewayNO; 
                                    req.body.our_payment_code = req.body.paymentCode;
                                
                                    let getBankCode = await helpers.getBankChargesByCode([assigngatewayid, paymentCode]); 
                                    if (getBankCode.length > 0) {
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
                                    
                                } else if(req.body.pay_by === 5){
                                    const assigngatewayid = resultdetail[0].gatewayNO; 
                                    req.body.our_payment_code = req.body.paymentCode;
                                    
                                    /*akonto code line*/
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

                                let charges = await helpers.getMerchantPayinCharges(pay_by, req.body.currency, merchantno);
                                if(charges!== 0){
                                    req.body.payinCharges = (req.body.amount * charges.payin_amount) / 100;
                                    var overAllGstCharges = (req.body.payinCharges * charges.gst) / 100;
                                    req.body.gstCharges = ((req.body.payinCharges - req.body.our_bank_charge) * charges.gst) / 100;
                                    req.body.rolling_reverse_amount = (amount * resultdetail[0].rolling_reverse) / 100;
                                    req.body.settleAmount = req.body.amount - (req.body.payinCharges + overAllGstCharges +  req.body.rolling_reverse_amount);
                                }

                                let inputString = `${resultdetail[0].id}#@#${req.body.amount}@#@${order_id}#@#${mobile_no}#@#${return_url}#@#${resultdetail[0].secretkey}`;
                                let ourChecksum = crypto.createHash('md5').update(inputString).digest('hex');
                                
                                if (pay_by === 1) { 
                                    // Card Data
                                    ourChecksum = (inputString)
                                } else if (pay_by == 2){
                                    // UPI
                                    ourChecksum = (inputString)
                                } else if (pay_by == 3  || pay_by == 4 ){
                                    // Net Banking and Wallet
                                    ourChecksum = (inputString)
                                } else if (pay_by === 5){
                                    // QR
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
                                        post_data: JSON.stringify(req.body),
                                        akonto_request:JSON.stringify(postedCricpayzData),
                                        order_id: req.body.order_id,
                                        created_on: new Date(),
                                    }
                                    let sqlInsert = "INSERT INTO tbl_payin_request SET ? ";
                                    console.log("hello im there");
                                    await mysqlcon(sqlInsert,[cricpayzData]);
                                        let response = await axios.post('https://boapi.cricpayz.io:14442/api/appuser/generateOrder', postedCricpayzData, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    let mayank2 = '';
                                    console.log("hello im console");
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
                                    }
                                    let bankInfo = {
                                        amount: bankcurl.data.amount,
                                        trn_id: bankcurl.data.trn_id,
                                        uid: bankcurl.data.uid,
                                        order_no: order_id
                                      };
                                      console.log("console me");
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
                            }
                        }
                    } else{  
                        const data = {
                            order_id: order_id, // Assuming you have access to the request body
                            orderAmount: req.body.amount, // Assuming you have access to the request body
                            requestedAmount: req.body.amount, // Assuming you have access to the request body
                            currency: currency, // Assuming you have access to the request body
                            txStatus: 'FAILED',
                            txMsg: 'Your Web Payment is not enabled. Contact Bankconnect',
                            txTime: dateTime, // Get the current date and time in ISO format
                            txCode: 'SUCC202',                       
                            checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`), // Calculate checksum function call
                            url: return_url
                        };
                        return res.send({data});
                    }
                } else{
                    const data = {
                        order_id: order_id,
                        orderAmount: req.body.amount,
                        requestedAmount: req.body.amount,
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
    } catch (error) {
        console.log(error);
        return res.status(500).json(500,{
            message: 'Internal Server Error',
            error: error.message // Return t
        })
    }
}


module.exports.payment = async (req, res) => {
    try {
        let merchant_name = "HARIOX UNIT MANAGEMENT PRIVATE LIMITED";
        let merchant_VPA = "dotonei.pay@timecosmos";
        let merchant_id = "DOTON8583";
        let terminal_id = "DOTON-8583";
        let submerchant_id = "DOTON-8583";
        let checksum_key = "2f171ece41a62e6bde344abda0b8baf0";
        let encryption_key = "0d48c14fa0df74e7b5e0fef375076ea5";
        let header_key = "e342feaf82f355f2767fabf7d945132a"; //cid
        let mcc_code = "5262";
        let VPA1 = "dotonei.chandrikatraders@timecosmos";
        let submerchant_id1 = "CHAND-1489"; // sid and tid

        const tidSid = submerchant_id1;

        const amount = parseFloat(req.body.amount) || 0;
        const formattedAmount = amount.toFixed(2);

        const firstName = req.body.fname || "";
        const lastName = req.body.lname || "";
        const name = `${firstName} ${lastName}`;

        req.body.terminalId = tidSid;

        if (req.body.pay_by == 2) {
            let postObject = {
                source: merchant_id,
                channel: "api",
                extTransactionId: "DOTONEI" + "timepayNode123",
                upiId: req.body.upi_id || "", // Assuming upi_id is in the request body
                terminalId: tidSid,
                amount: formattedAmount, // Assuming amount is in the request body
                customerName: name,
                statusKYC: "N",
                remark: req.body.description || "", // Assuming description is in the request body
                requestTime: new Date().toISOString(),
                sid: tidSid,
            };

            let checksumString = "";
            for (const val of Object.values(postObject)) {
                checksumString += val;
            }
            checksumString += checksum_key;
            postObject.checksum = crypto.createHash("sha256").update(checksumString).digest("hex");

            const encryptionKey = crypto.createHash("sha256").update(encryption_key).digest();
            const encryptionKeyBuffer = Buffer.from(encryptionKey, "hex");
            // return res.send(encryptionKeyBuffer.toString('hex'))
            const cipher = "aes-256-ecb";
            const cipherObj = crypto.createCipheriv(cipher, encryptionKeyBuffer, "");
            
            let encrypted_string = cipherObj.update(JSON.stringify(postObject), "utf-8", "base64");
            encrypted_string += cipherObj.final("base64");
            
            let viewData = {};
            viewData["encrypted_string"] = encrypted_string;
            viewData["cid"] = header_key;
            const FormData = require("form-data")
            const data = new FormData();
            data.append("encrypted_string", viewData["encrypted_string"]);
            data.append("cid", viewData["cid"]);
            // return res.send(data)

            // return res.send(data)
            // const formDataValues = {};
            // for (let [key, value] of data.entries()) {
            //     formDataValues[key] = value;
            // }


            // const simplifiedFormData = {
            //     encrypted_string: formDataValues.encrypted_string,
            //     cid: formDataValues.cid,
            // };
            // return res.send(simplifiedFormData.getHeaders());
            
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://limezo.in/webpayment/deposit/payment",
                headers: {...data.getHeaders()}, // No need to spread the headers
                data: data,
            };
            
            const response = await axios.request(config);
            
            let responseData = JSON.stringify(response.data);
            
            let resdata = {
                encrypted: responseData.encrypted, // Update with the correct property name
                error: responseData.error,
            };
            // return res.send(resdata)

            if (responseData !== 0) {
                try {
                    const decipher = crypto.createDecipheriv(cipher, encryptionKeyBuffer, "");
                    // return res.send(decipher)
                    let decryptedString = decipher.update(responseData, "base64", "utf-8");
                    decryptedString += decipher.final("utf-8");
                    const decryptedData = JSON.parse(decryptedString);
                    // resdata.decrypted = decryptedData;
                    // resdata.error = "No Error";
                    return res.send(decryptedData);
                } catch (error) {
                    resdata.error = "Error parsing decrypted JSON";
                }
            }

            let terminalId = tidSid; // Update with the correct property name
            let ter = terminalId;
            const userTxnId = postObject.extTransactionId;
            const tsNo = ter;
            const redirectURL = `https://limezo.in/webpayment/deposit/merchant_payment/${userTxnId}/${tsNo}`;
            return res.send(redirectURL);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
};
