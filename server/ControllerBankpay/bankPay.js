const mysqlcon = require("../config/db_connection");

const crypto = require("crypto");
const helpers = require("../helper/defaultheler")
const md5 = require('md5');

// module.exports.bankconnectPaymentSubmit = async(req, res)=>{
//     try{
//     const {mid} = req.body
//     let sqlExists = "SELECT * FROM tbl_user WHERE id = ? "
//     let resultExist = await mysqlcon(sqlExists,[mid])
    
//     // if (!resultExist.mid) {
//     //   res.redirect('/');
//     //   return;
//     // }
   
  
//     // Continue with the rest of the function logic...
//     // app.post('/your-route', [
//     //   // Sanitize the req.body object using the "sanitize" function
//     //   body('yourField').trim().escape().notEmpty(),
//     // ],(req, res) => {
//     //     const errors = validationResult(req);
//     //     if (!errors.isEmpty()) {
//     //         return res.status(400).json({ errors: errors.array() });
//     //     }
//     // });
  
//     post = xss(req.body);
//     if (post && Object.keys(post).length !== 0) {
//       req.body.order_id,
//       req.body.merchantno,
//       req.body.currency,
//       req.body.amount,
//       req.body.pay_by,
//       req.body.fname,
//       req.body.lname,
//       req.body.email,
//       req.body.mobile_no,
//       req.body.country,
//       req.body.state,
//       req.body.city,
//       req.body.address,
//       req.body.pincode,
//       req.body.callback_url,
//       req.body.return_url,
//       req.body.description,
//       req.body.checksum
//       if (req.body.pay_by === 1) {
//         req.body.card_number,
//         // .notEmpty().withMessage('You must provide a card_number.').escape(),
//         req.body.expiration_month,
//         // .notEmpty().withMessage('You must provide an expiration month.').isLength({ min: 2, max: 2 }).withMessage('Expiration month must be 2 characters long.').escape(),
//         req.body.expiration_year.notEmpty().withMessage('You must provide an expiration year.').isLength({ min: 4, max: 4 }).withMessage('Expiration year must be 4 characters long.').escape(),
//         req.body.security_code.notEmpty().withMessage('You must provide a security code.').isLength({ min: 3, max: 3 }).withMessage('Security code must be 3 characters long.').escape()
//         post.paymentCode = '';
//         post.upi_id = '';
//       }else if(req.body.pay_by === 2){
//         req.body.upi_id.notEmpty().withMessage('You must provide a UPI Id.').escape()
//         post.card_number = '';
//         post.expiration_month = '';
//         post.expiration_year = '';
//         post.security_code = '';           
//         post.paymentCode = '';
//       }else if(req.body.pay_by === 3 || req.body.pay_by === 4 || req.body.pay_by === 6){
//         req.body.paymentCode.notEmpty().withMessage('You must provide a Payment Code.').escape()
//         post.card_number = '';
//         post.expiration_month = '';
//         post.expiration_year = '';
//         post.security_code = '';           
//         post.upi_id = '';
//       }else if(req.body.pay_by === 5){
//         req.body.paymentCode.notEmpty().withMessage('You must provide a Payment Code.').escape()
//         post.card_number = '';
//         post.expiration_month = '';
//         post.expiration_year = '';          
//         post.security_code = '';           
//         post.upi_id = '';
//       }
      
//       if(req.body === false){
//         body_error()
//       }else{
//             // this.mva = 0
//         let mva = 0
//         if (req.body.paymentCode == 'IDRMDRVA') {
//           mva = 1;
//         }
//         if (typeof post.order_token !== 'undefined' && post.order_token !== '' && post.order_id !== '') {
//           let {order_id,order_token} = req.body
//           let sql = 'UPDATE tbl_order_request_pre_book SET status = 1 WHERE order_id = ? AND order_token = ? AND user_id = ?'
//           let result = mysqlcon(sql,[order_id,order_token,post.mid])
//           return res.json(200,{data : result})
  
//         }
//       }
      
//       if (post.emp_id && post.emp_id.trim() !== '') {
//         post.merchant_emp = post.emp_id.split('#')[1];
//       } else {
//         post.merchant_emp = 0;
//       }
      
//       post.amount_come = req.body.amount;
//       post.expiration_date = post.expiration_month; // We are using expiration_month to expiration_date from here
//       post.zip = post.pincode;
      
//       post.user_txn_id = post.order_id; 
//       const our_gen_order = post.merchantno + crypto.randomBytes(8).toString("hex").toUpperCase() + 'D';
      
//       post.order_id = our_gen_order; 
//       post.orderNo = our_gen_order; 
//       // check
//      //   req.session.session_order_id = our_gen_order; 
//       //
//       let sqldetail = 'SELECT * FROM tbl_user WHERE id = 6'
//       let resultdetail = await mysqlcon(sqldetail,[mid])
//       console.log(resultdetail[0].id);
//       return res.send(resultdetail)
//       const paymentCode = req.body.paymentCode;
//       const validate_bank_code = helpers.validate_bank_payment_code(resultdetail.gatewayNo, paymentCode);
      
//       if(resultdetail.gatewayNo === '1859'){
//         const {currency,amount} = req.body;
//         let merchant_c_limit =  helpers.get_merchant_currency_min_max_amount(mid, resultdetail.gatewayNo, currency);
        
//         if(merchant_c_limit !== 0){
//           let u_min = merchant_c_limit.min;
//           let u_max = merchant_c_limit.max;
          
//           if(amount < u_min || amount > u_max){
//             const message = `Your amount must be ${currency} ${u_min} and max amount must be ${currency} ${u_max}.`;
//             return res.redirect(message);
//           }                  
//         }
        
//         const amt_array = [{
//           // 'THB': {
//           //   'min': 250,
//           //   'max': 100000
//           // },
//           'IDR': {
//             'min': 50000,
//             'max': 1000000000                    
//           }
//         }]
//         if(amt_array[currency] !== 0){
//           const min = amt_array[currency].min;
//           const max = amt_array[currency].max;
          
//           if(amount < min || amount > max){
//             const message = `Min amount must be ${currency} ${min} and max amount must be ${currency} ${max} for assign gateway.`;
//             redirect(message);
//             return
//           }
//         }
//       }
//       const payment_block_array = [{
//         1: resultdetail.allow_card_payment,
//         2: resultdetail.allow_upi_payment,
//         3: resultdetail.allow_netbanking_payment,
//         4: resultdetail.allow_wallet_payment,
//         5: resultdetail.allow_qr_payment,
//         6: resultdetail.allow_offline_payment
//       }]
//       const { redirect_url, end_point_url, merchantno, email } = req.body;
//       req.session.back_url = redirect_url;
//       req.session.static_end_point_url = end_point_url;
//       req.session.merchantno = merchantno;
//       req.session.cumemail = email;
//       const sessionData = {
//         back_url: req.session.back_url,        
//         static_end_point_url: req.session.static_end_point_url,
//         merchantno: req.session.merchantno,
//         cumemail: req.session.cumemail,
//       }
//       post['ip'] = helpers.get_client_ip(); 
      
//       if (resultdetail.id === req.body.merchantno){
//         if (resultdetail.allow_webpayment === 1){
//           if (payment_block_array[req.body.pay_by] === 1){
//             const {order_id,user_txn_id} = post
//             let sqlcheckOrderAlreadyExist = 'SELECT * FROM tbl_merchant_transaction WHERE order_id = ? '
//             let resultcheckOrderAlreadyExist = mysqlcon(sqlcheckOrderAlreadyExist,[order_id])
//             let sqlcheckOrderAlreadyExistInNewOrderTable = 'SELECT * FROM tbl_order_check WHERE order_id = ?'
//             let resultcheckOrderAlreadyExistInNewOrderTable = mysqlcon(sqlcheckOrderAlreadyExistInNewOrderTable,[order_id])
            
//             if(resultcheckOrderAlreadyExistInNewOrderTable[0].order_id){
//               return res.json(201,{data : resultcheckOrderAlreadyExistInNewOrderTable})
//             }else {
//               let sql = "INSERT INTO tbl_order_check SET order_id = ?,created_on = now()"
//               let result = mysqlcon(sql,[order_id])
//               res.send(result)
//             }
            
//             let sqlcheckUserOrderAlreadyExistWithAccount = 'SELECT * FROM tbl_merchant_transaction WHERE user_txn_id = ? AND '
//             let resultcheckUserOrderAlreadyExistWithAccount = mysqlcon(sqlcheckUserOrderAlreadyExistWithAccount,[user_txn_id])
//             if (
//               !resultcheckOrderAlreadyExist.order_id && !resultcheckOrderAlreadyExistInNewOrderTable.order_id &&!resultcheckUserOrderAlreadyExistWithAccount.user_txn_id
//             ){
  
//               let assigngatewayid = resultdetail.gateway_id
              
//               if (assigngatewayid === '0' || assigngatewayid === '') {
//                 assigngatewayid === '3';
//               } else {
//                 assigngatewayid = assigngatewayid;
//               }
  
//               let tax_amt = req.body.tax_amount
//               post.amount = (req.body.amount + tax_amt )
                  
//                     // /rolling reverse/
//               post.rolling_reverse_amount = (post.amount * resultdetail.rolling_reverse) / 100;
//                     // let rolling_reverse_on = date("Y-m-d H:i:s", strtotime("+" . resultdetail.rolling_reverse_months . " month"));
//               post.rolling_reverse_on = moment().add(resultdetail.rolling_reverse_months, 'months').format('YYYY-MM-DD HH:mm:ss')
              
//               if (req.body.pay_by === 1){
//                 let assigngatewayid = resultdetail.gateway_id
//                 let search_string = helpers.getCardVerifyCode(req.body.card_number)
//                 let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, search_string, 0);
                
//                 if (((search_string == "debit card visa" && post.amount > 2000) || (search_string == "debit card maestro" && post.amount > 2000)) && assigngatewayid == 14) {
//                   bank_per_charge = 0.4;
//                 }
//               }else if (req.body.pay_by === 2) {
//                 const assigngatewayid = resultdetail.gatewayNo; // Replace with the actual value of detail.gatewayNo
//                 const bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, 'UPI', 0);
//                       // start
//                 const tmp_upi_id = req.body.upi_id;
//                 if (tmp_upi_id !==0) {
//                   const upi_id = tmp_upi_id.split('@')[0].toLowerCase()
//                   if (upi_id, mid) {
//                     return res.json(500,{
//                       message : 'Your upi id blocked by admin'
//                     })
//                   }
//                 }
//               }else if (req.body.pay_by === 3){
//                 const assigngatewayid = resultdetail.gatewayNo;
                
//                 if (req.body.paymentCode === 3044) {
//                   assigngatewayid === '1856';
//                 }
                
//                 post.our_payment_code = req.body.paymentCode
  
//                 post.paymentCode = helpers.getBankCode(assigngatewayid,our_payment_code).code                    
//                 let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid,our_payment_code,1)  
  
//                 if (assigngatewayid === 1866) {
//                   post.paymentCode = 'TLPAY';
//                 } else if (assigngatewayid === 1868) {
//                   post.paymentCode = 'DRAGONPAY';
//                 } else if (assigngatewayid === 1872) {
//                   post.paymentCode = 'PAYUSPLIT';
//                 } else if (assigngatewayid === 1873) {
//                   post.paymentCode = 'VASU';
//                 } else if (assigngatewayid === 1876) {
//                   post.paymentCode = 'OFFLINE';
//                 } else if (assigngatewayid === 1877) {
//                   post.paymentCode = 'ZOFTPAY';
//                 }else if (assigngatewayid === 1914) {
//                   post.paymentCode = 'MONETIX';
//                 }
//               }else if(req.body.pay_by === 4){
//                 let assigngatewayid = resultdetail.gatewayNo;
//                 post.our_payment_code = post.paymentCode;
          
//                 post.paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
//                 let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
  
//               }else if(req.body.pay_by === 5){
//                 let assigngatewayid = resultdetail.gatewayNo;
//                 post.our_payment_code = post.paymentCode;
          
//                 post.paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
//                 let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
  
//               }else if(req.body.pay_by === 6){
//                 let assigngatewayid = resultdetail.gatewayNo;
//                 post.our_payment_code = post.paymentCode;
               
//                 post.paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
//                 let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
//               }
  
             
//               let user_id = post.merchantno
//               let currency_code = post.currency
             
  
//               let charges = helpers.getMerchantPayinCharges(user_id, currency_code)
  
//               // print_r($charges);
//               // exit();
              
//               post.our_bank_charge = (post.amount * bank_per_charge) / 100;
//               post.our_bank_charge_gst = ((post.our_bank_charge) * 18) / 100;
//               post.our_bank_total_charge_with_gst = post.our_bank_charge + post.our_bank_charge_gst
              
//              //   /charges by the bank/
  
//               if (charges!==0) {
//                 post.payinCharges = (post.amount * charges.payin_amount) / 100;
//                 post.overAllGstCharges = (post.payinCharges * charges.gst_amount) / 100;
//                 post.gstCharges = ((post.payinCharges - post.our_bank_charge) * charges.gst_amount) / 100;
//                 post.settleAmount = post.amount - (post.payinCharges + post.overAllGstCharges + post.rolling_reverse_amount);
//               } else {
//                 post.payinCharges = (post.amount * 3) / 100;
//                 post.overAllGstCharges =(post.payin_charges * 0) / 100;
//                 post.gstCharges = ((post.payinCharges - post.our_bank_charge) * 0) / 100;
//                 post.settleAmount = post.amount - (post.payinCharges + post.overAllGstCharges + post.rolling_reverse_amount);
//               }    
         
//               let sqlGate = 'SELECT * FROM payment_gateway WHERE gateway_number = ?'
//               let resultGate = mysqlcon(sqlGate,[assigngatewayid])
  
//               let gateway_number = resultGate.gateway_number;
//               const data = [{
//                 detail: resultdetail,
//                 title: 'Merchant Payment',
//               }]
  
//               const orderNo = req.body.orderNo; 
  
//               const od_amt = Math.round(req.body.amount + 0, 2);
//               const our_checksum = md5(resultdetail.id + '#@#' + post.amount_come + '@#@' + post.user_txn_id + '#@#' + req.bodpo.mobile_no + '@#@' + req.body.return_url + '#@#' + resultdetail.secretkey
//               );
  
//               if(our_checksum){
//                 assigngatewayid = '1928';
//                 console.log('0')
  
//                 // if(assigngatewayid = '1859'){
  
//                 // }else if(assigngatewayid = '1876'){
  
//                 // }else if(assigngatewayid = '1877'){
  
//                 // }else if(assigngatewayid = '1872'){
  
//                 // }else if(assigngatewayid = '1868'){
  
//                 // }else if(assigngatewayid = '1875'){
                  
//                 // }else if(assigngatewayid = '8088'){
  
//                 // }else if(assigngatewayid = '8089'){
  
//                 // }else if(assigngatewayid = '8099'){
                  
//                 // }else if(assigngatewayid = '4099'){
                  
//                 // }else if(assigngatewayid = '1915'){
                  
//                 // }else if(assigngatewayid = '1923'){
                  
//                 // }else if(assigngatewayid = '1873'){
                  
//                 // }
  
//               }else{
                
             
//               const our_checksum = md5(resultdetail.id + '#@#' + post.amount_come + '@#@' + post.user_txn_id + '#@#' + req.body.mobile_no + '@#@' + req.body.return_url + '#@#' + resultdetail.secretkey);
//               post.our_checksum = our_checksum
//               const createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');
//               const {post_request_log} = JSON.stringify(post)
  
//               let sql = `INSERT INTO tbl_checksum_mismatch SET merchant_id = ${mid} , pots_request_log = ?,created_on = ?`
//               let result = mysqlcon(sql,[mid,post_request_log,createdOn])
  
//               return res.json(200,{message : "Checksum match failed. Please check.",data : result })
  
//               }
//             }else{
//               return res.json(200,{message : "Order id is already exist."})
//             }
//           }else{
//             return res.json(200,{message : 'This mode of payment has been blocked , please contact the acquirer.'})
//           }
//         }else{
//           return res.json(200,{message : 'Your Web Payment is not enable. Contact with' . SITE_NAME})
//         }
//       }else{
//         return res.json(200,{message : "Merchant no and secret key does'nt match."})
//       }
//     }
//   }catch(error){
//     console.log(error)
//     return res.json(500,{
//       message : 'error'
//     })
//   }
//   }

module.exports.bankconnectPaymentSubmit = async(req, res) =>{
    try
    {
        const {mid} = req.body
        
        
        const mer_id = 62;
        const sec_key = 'fPFBKsaC';

        // const random_number = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
        // const order_id = mer_id + random_number; // Concatenate mer_id and the random number

        // Get the current date and time as a timestamp
const currentTimestamp = new Date().getTime();

// Generate a random number between 0 and 999
const random_number = Math.floor(Math.random() * 1000);

// Concatenate mer_id, current date timestamp, and the random number
const order_id = mer_id+random_number;
console.log(order_id);

        let od_amt = 100000; 
        let currency = '';

        if (typeof amt !== 'undefined') {
        od_amt = amt;
        }

        if (typeof curr !== 'undefined') {
        currency = curr;
        }

        const mobile_no = 1234567891;
        const email = 'manjeet@gmail.com';
        const pay_by = 3;

        let sqlExits = "SELECT * FROM tbl_user WHERE id = ?"
        let resultExist = await mysqlcon(sqlExits,[mid])

        req.body.order_id,
        req.body.merchantno,
        req.body.currency,
        req.body.amount,
        req.body.pay_by,
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.mobile_no,
        req.body.country,
        req.body.state,
        req.body.city,
        req.body.address,
        req.body.pincode,
        req.body.callback_url,
        req.body.return_url,
        req.body.description,
        req.body.checksum
        console.log(req.body);
    //     const {
    //         order_no,
    //         mer_no,
    //         ammount_type,
    //         ammount,
    //         payment_type,
    //         i_fname,
    //         i_lname,
    //         i_email,
    //         i_number,
    //         i_country,
    //         i_state,
    //         i_city,
    //         bill_address,
    //         i_zip,
    //         redirection_url,
    //         end_point_url,
    //         discription,
    // } = req.body
    // let detail = {
    //     order_no,
    //     mer_no,
    //     ammount_type,
    //     ammount,
    //     payment_type,
    //     i_fname,
    //     i_lname,
    //     i_email,
    //     i_number,
    //     i_country,
    //     i_state,
    //     i_city,
    //     bill_address,
    //     i_zip,
    //     redirection_url,
    //     end_point_url,
    //     discription,
    //     // checksum,
    //     payment_type : req.body.payment_type
    // }
        
       
    //     let sql = "INSERT INTO tbl_merchant_transaction SET ?"
    //     let result = await mysqlcon(sql,[detail])
    //     if (result){
    //         return res.json({
    //             message : 'data added'
    //         })
    //     }
        if(req.body.pay_by === 1){
           req.body.card_number, 
           req.body.expiration_month,
           req.body.expiration_year,
           req.body.security_code,
           paymentCode = '';
           upi_id = '';
        }else if(req.body.pay_by === 2){
            req.body.upi_id
            card_number = '';
            expiration_month = '';
            expiration_year = '';
            security_code = '';           
            paymentCode = '';  
        }else if(req.body.pay_by === 3 || req.body.pay_by === 4 || req.body.pay_by === 6){
            req.body.paymentCode
            card_number = '';
            expiration_month = '';
            expiration_year = '';
            security_code = '';           
            upi_id = '';
        }else if(req.body.pay_by === 5){
            req.body.paymentCode
            card_number = '';
            expiration_month = '';
            expiration_year = '';          
            security_code = '';           
            upi_id = '';
        }

        if(req.body === false){
            body_error()
        }else{
            //mva = 0
            let mva = 0
            if(req.body.paymentCode === 'IDRMDRVA'){
                mav = 1;
            }
            if(typeof order_token !== 'undefined' && order_token !== '' && order_id !== ''){
                let {order_id, order_token} = req.body
                let sql = 'UPDATE tbl_order_request_pre_book SET status = 1 WHERE order_id = ? AND order_token = ? AND user_id = ?'
                let result = await mysqlcon(sql,[order_id,order_token,post.mid])
                return res.json(200,{data : result})
            }
            
        }
        let emp_id = req.body.emp_id;
        if(emp_id && emp_id.trim() !== ''){
            merchant_emp = emp_id.split('#')[1];
        }else{
            merchant_emp = 0;
        
        let amountValue = req.body.amount;
        let Amount = parseInt(amountValue);
        let expiration_date = req.body.expiration_month
        let zip = req.body.pincode
        let user_txn_id = req.body.order_id
        const our_gen_order = req.body.merchantno + crypto.randomBytes(8).toString("hex").toUpperCase() + 'D';

        user_txn_id = our_gen_order
        let orderNo = our_gen_order

        // let sqldetail = 'SELECT * FROM tbl_user WHERE id = ?'
        // let resultdetail = await mysqlcon(sqldetail,[mer_id]);
    
        // console.log(resultdetail.gateway_id);

        // const paymentCode = req.body.paymentCode;
        // let sqlValidate = `SELECT * FROM tbl_code WHERE akontocode = ${resultdetail.gateway_id} AND  payment_gate = ${paymentCode}`
        // const validate_bank_code = helpers.validate_bank_payment_code(resultdetail.gateway_id, paymentCode)
        let sqldetail = 'SELECT * FROM tbl_user WHERE id = ?';
let resultdetail = await mysqlcon(sqldetail, [mer_id]);
if (resultdetail.length === 0) {
  // Handle the case where no results were found in the first query
  // You can return an error or take appropriate action here
} else {
  const paymentCode = req.body.paymentCode;
  let sqlValidate = 'SELECT * FROM tbl_code WHERE akontocode = ? AND payment_gate = ?';

  // Include data from the first query result in the second query
  console.log(resultdetail[0].gateway_id);
  let queryParams = [resultdetail[0].gateway_id, paymentCode];

  let resultValidate = await mysqlcon(sqlValidate, queryParams);

  // Now, resultValidate contains data from the second query, including data from the first query
}
     
        if(resultdetail.gateway_id === '1859'){
            const {currency,amount} = req.body;
            let merchant_c_limit =  helpers.get_merchant_currency_min_max_amount(mid, resultdetail[0].gatewayNo, currency);
            if(merchant_c_limit !== 0){
                let u_min = merchant_c_limit.min
                let u_max = merchant_c_limit.max

                if(amount < u_min || amount > u_max){
                    const message = `Your amount must be ${currency} ${u_min} and max amount must be ${currency} ${u_max}.`;
                    return res.redirect(message);
                  }  

                  const amt_array = [{
                    // 'THB': {
                    //   'min': 250,
                    //   'max': 100000
                    // },
                    'IDR': {
                      'min': 50000,
                      'max': 1000000000                    
                    }
                 }]

                 if(amt_array[currency] !== 0){
                    const min = amt_array[currency].min;
                    const max = amt_array[currency].max;
                    
                    if(amount < min || amount > max){
                      const message = `Min amount must be ${currency} ${min} and max amount must be ${currency} ${max} for assign gateway.`;
                      redirect(message);
                      return
                    }
                  }
                }
            }
            const payment_block_array = [{
                1: resultdetail.allow_card_payment,
                2: resultdetail.allow_upi_payment,
                3: resultdetail.allow_netbanking_payment,
                4: resultdetail.allow_wallet_payment,
                5: resultdetail.allow_qr_payment,
                6: resultdetail.allow_offline_payment
              }]
              // const { redirect_url, end_point_url, merchantno, email} = req.body;
              // req.session.back_url = redirect_url;
              // req.session.static_end_point_url = end_point_url;
              // req.session.merchantno = merchantno;
              // req.session.comeEmail = email;
              // const sessionData = {
              //   back_url: req.session.back_url,
              //   static_end_point_url: req.session.static_end_point_url,
              //   merchantno: req.session.merchantno,
              //   comeEmail: req.session.comeEmail
              // }
               req.body['ip'] = helpers.get_client_ip();
               
              if(resultdetail.id === req.body.merchantno){
                if(resultdetail.allow_webpayment === 1){
                    console.log(resultdetail.allow_webpayment);
                    if(payment_block_array[req.body.pay_by] === 1){
                        const {order_id, user_txn_id} = req.body
                        let sqlcheckOrderAlreadyExist = 'SELECT * FROM tbl_merchant_transaction WHERE order_no = ? ';
                        let resultcheckOrderAlreadyExist = await mysqlcon(sqlcheckOrderAlreadyExist,[order_id]);
                        let sqlcheckOrderAlreadyExistInNewOrderTable = 'SELECT * FROM tbl_order_check WHERE order_id = ?';
                        let resultcheckOrderAlreadyExistInNewOrderTable = await mysqlcon(sqlcheckOrderAlreadyExistInNewOrderTable,[order_id]);

                        if(resultcheckOrderAlreadyExistInNewOrderTable[0].order_id){
                            return res.json(201,{
                                data : resultcheckOrderAlreadyExistInNewOrderTable
                            })
                            
                        }else {
                            let sql = "INSERT INTO tbl_order_check SET order_id = ?,created_on = now()";
                            let result = await mysqlcon(sql,[order_id]);
                            res.send(result);
                        }

                        let sqlcheckUserOrderAlreadyExistWithAccount = 'SELECT * FROM tbl_merchant_transaction WHERE user_txn_id = ?';
                        let resultcheckUserOrderAlreadyExistWithAccount = await mysqlcon(sqlcheckUserOrderAlreadyExistWithAccount,[user_txn_id]);
                        if(!resultcheckOrderAlreadyExist[0].order_id && !resultcheckOrderAlreadyExistInNewOrderTable[0].order_id && !resultcheckUserOrderAlreadyExistWithAccount[0].user_txn_id)
                        {

                            let assigngatewayid = resultdetail[0].gateway_id;

                            if(assigngatewayid === '0' || assigngatewayid === '') {
                                assigngatewayid === '3';
                            } else {
                                assigngatewayid = assigngatewayid;
                            }
                            let tax_amt = req.body.tax_amt;
                            let amount = (req.body.amount + tax_amt);

                            //  Rolling Reverse
                            let rolling_reverse_amount = (amount * resultdetail[0].rolling_reverse) / 100;

                            // let rolling_reverse_on = date("Y-m-d H:i:s", strtotime("+" . resultdetail[0].rolling_reverse_months . month));

                            let rolling_reverse_on = moment().add(resultdetail[0].rolling_reverse_months, 'months').format('YYYY-MM-DD HH:mm:ss');

                            if (req.body.pay_by === 1){
                                let assigngatewayid = resultdetail[0].gateway_id;
                                let search_string = helpers.getCardVerifyCode(req.body.card_number);
                                let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, search_string, 0);

                                if (((search_string == "Debit Card Visa" && amount > 2000) || (search_string == "Debit Card Maestro" && amount > 2000)) && assigngatewayid == 14) {
                                    bank_per_charge = 0.4;
                                }
                            }else if (req.body.pay_by === 2) {
                                const assigngatewayid = resultdetail[0].gatewayNo; // Replace with the actual value of detail.gatewayNo
                                const bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, 'UPI', 0);
                                // Start
                                const tmp_upi_id = req.body.upi_id;
                                if(tmp_upi_id !== 0){
                                    const upi_id = tmp_upi_id.split('@')[0].toLowerCase()
                                    if(upi_id, mid) {
                                        return res.json(500,{
                                            message : 'Your UPI ID blocked by Admin'
                                        })
                                    }
                                }
                            }else if(req.body.pay_by === 3){
                                const assigngatewayid = resultdetail.gatewayNo;

                                if(req.body.paymentCode === 3044) {
                                    assigngatewayid === '1856';
                                }

                                let our_payment_code = req.body.paymentCode;

                                let paymentCode = helpers.getBankCode(assigngatewayid, our_payment_code).code;
                                let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, our_payment_code,1);

                                if (assigngatewayid === 1866) {
                                    let paymentCode = 'TLPAY';
                                  } else if (assigngatewayid === 1868) {
                                    let paymentCode = 'DRAGONPAY';
                                  } else if (assigngatewayid === 1872) {
                                    let paymentCode = 'PAYUSPLIT';
                                  } else if (assigngatewayid === 1873) {
                                    let paymentCode = 'VASU';
                                  } else if (assigngatewayid === 1876) {
                                    let paymentCode = 'OFFLINE';
                                  } else if (assigngatewayid === 1877) {
                                    let paymentCode = 'ZOFTPAY';
                                  }else if (assigngatewayid === 1914) {
                                    let paymentCode = 'MONETIX';
                                }

                            }else if(req.body.pay_by === 4){
                                let assigngatewayid = resultdetail[0].gatewayNo;
                                let our_payment_code = paymentCode

                                let paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
                                let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
                            
                            }else if(req.body.pay_by === 5){
                                let assigngatewayid = resultdetail.gatewayNo;
                                let our_payment_code = paymentCode;

                                let paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
                                let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
                            
                            }else if(req.body.pay_by === 6){
                                let assigngatewayid = resultdetail[0].gatewayNo;
                                let our_payment_code = paymentCode;
                               
                                let paymentCode = helpers.getBankCode(assigngatewayid, req.body.paymentCode).code;
                                let bank_per_charge = helpers.getBankChargesByCode(assigngatewayid, req.body.paymentCode, 1);
                            }

                            let user_id = merchantno;
                            let currency_code = currency;

                            let charges = helpers.getMerchantPayingCharges(user_id, currency_code);

                            let our_bank_charge = (amount * bank_per_charge) / 100;
                            let our_bank_charge_gst = ((our_bank_charge) * 18) / 100;
                            let our_bank_total_charge_with_gst = our_bank_charge + our_bank_charge_gst;

                            // Charge By the Bank
                            if(charges!== 0){
                                let payinCharges = (amount * charges.payin_amount) / 100;
                                let overAllGstCharges = (payinCharges * charges.gst_amount) / 100;
                                let gstCharges = ((payinCharges - our_bank_charge) * charges.gst_amount) / 100;
                                let settleAmount = amount - (payinCharges + overAllGstCharges + rolling_reverse_amount);
                            }else{
                                let payinCharges = (amount * 3) / 100;
                                overAllGstCharges = (payin_charges * 0) / 100;
                                gstCharges = ((payinCharges - our_bank_charge) * 0) / 100;
                                let settleAmount = amount - (payinCharges + overAllGstCharges + rolling_reverse_amount);
                            }

                            let sqlGate = 'SELECT * FROM payment_gateway WHERE gateway_number = ?';
                            let resultGate = await mysqlcon(sqlGate,[assigngatewayid]);

                             gateway_number = resultGate[0].gateway_number;

                            var data = [{
                                detail: resultdetail,
                                title: 'Merchant Payment',
                            }]

                            const orderNo = req.body.orderNo;

                            const od_amt = Math.round(req.body.amount + 0, 2);
                            console.log(resultdetail[0].secretkey);
                            const our_checksum = md5(resultdetail[0].id + '#@#' + Amount + '@#@' + user_txn_id + '#@#' + req.body.mobile_no + '@#@' + req.body.return_url + '#@#' + resultdetail[0].secretkey);
                            
                            if(our_checksum){
                                assigngatewayid = '1928';
                                console.log('0');
                            
                            }else{

                                const our_checksum = md5(resultdetail[0].id + '#@#' + Amount + '@#@' + user_txn_id + '#@#' + req.body.mobile_no + '@#@' + req.body.return_url + '#@#' + resultdetail[0].secretkey);
                                post.our_checksum = our_checksum
                                const created_on = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                const {post_request_log} = JSON.stringify(post);

                                let sql = `INSERT INTO tbl_checksum_mismatch SET merchant_id = ${mid} , pots_request_log = ?,created_on = ?`;
                                let result = await mysqlcon(sql,[mid,post_request_log, created_on]);

                                return res.json(200,{
                                    message : "CheckSum Match Failed. Please Check.",data : result ,
                                    // data : result
                                })
                            }
                        }else{
                            return res.json(200,{
                                message : "Order id is Already exist."
                            })
                        }

                    }else{
                        return res.json(200,{
                            message : 'This mode of payment has been blocked , Please contact the Acquirer.'
                        })
                    }
                    
                }else{
                    return res.json(200,{message : 'Your Web Payment is not enable. Contact with' })
                }
            }else{
                console.log(resultdetail.id);
                console.log(resultdetail.secretkey);
                return res.json(200,{message : "Merchant no and secret key does'nt match."})
            }

        }
    }catch(error){
        console.log(error);
        return res.json(500,{
            message : 'error'
        })
    }
}
