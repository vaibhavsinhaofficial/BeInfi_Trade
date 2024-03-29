const mysqlcon = require("../config/db_connection");
const axios = require('axios');
 
// module.exports.testCase = async (req, res) => {
//     try{

//         let {id, currency} = req.body
//         const sqldetail = "SELECT tbl_user.bankid, title, code, currencies, type FROM tbl_akonto_banks_code INNER JOIN tbl_user ON tbl_akonto_banks_code.id = tbl_user.id WHERE tbl_akonto_banks_code.status = 1 AND tbl_user.id = ?";
//         const resultdetail = await mysqlcon(sqldetail,[id]);
        
//         res.send(resultdetail);
//         // if (resultdetail) {
//         //   console.log(resultdetail);
//         //   let sql2 = "SELECT tbl_code.akontocode, gateway_detail.merNo,gateway_detail.type,gateway_detail.currency FROM gateway_detail INNER JOIN tbl_code On gateway_detail.gatewayNo = tbl_code.payment_gate"; 
//         //   let resultdetail2 = await mysqlcon(sql2);
//         //   return res.send(resultdetail2 );
//         // } 
       
//         // else {
//         //   const paymentCode = req.body.paymentCode;
//         //   let sqlValidate = 'SELECT * FROM tbl_code WHERE akontocode = ? AND payment_gate = ?';
//         // console.log(resultdetail[0].gateway_id);
//         //   // Include data from the first query result in the second query
//         //   let queryParams = [resultdetail[0].gateway_id, paymentCode];
        
//         //   let resultValidate = await mysqlcon(sqlValidate, queryParams);
        
//         //   // Now, resultValidate contains data from the second query, including data from the first query
//         //     
//         // }
//     }catch(error){
//         console.log(error);
//         return res.json(500,{
//             message : 'error'
//         })
//     }

// }

// module.exports.key2payDeposites = async (res, request) => {
// try{
//     // Step 1: Obtain an access token
//     const tokenResponse = await axios.post('https://api.key2pay.online/v1/auth/token', null, {
//       headers: {
//         Authorization: 'Basic Zjk0MjdiOWMtNGFiMi00ZGFiLWE4OGMtMWYzYjBkODliMDJkOmRVcW5tZUhRdXZJMFk1TG4vY2x1eHV0cGJXVExQMldCTXZSUnA0Yis0MkVYeXhyTEltNXNwR2J1T2MzYmpCTkhjQ0VKbnJteXJ4TEltNXNwR2J1T2MzYmow'
//       }
//     });

//     var accessToken = tokenResponse.data.accessToken;
//     console.log(accessToken);
//     // Step 2: Make the payment request using the access token
//     const paymentResponse = await axios.post('https://api.key2pay.online/v1/payments', request, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     return paymentResponse;

//     // Step 1: Obtain the access token
//     // try{
//     // const getToken = async () => {
//     //   let tokenUrl = 'https://api.key2pay.online/v1/auth/token';
//     //   let tokenOptions = {
//     //     method: 'POST',
//     //     body: 'grant_type=client_credentials',
//     //     headers: {
//     //       'Authorization': 'Basic Zjk0MjdiOWMtNGFiMi00ZGFiLWE4OGMtMWYzYjBkODliMDJkOmRVcW5tZUhRdXZJMFk1TG4vY2x1eHV0cGJXVExQMldCTXZSUnA0Yis0MkVYeXhyTEltNXNwR2J1T2MzYmpCTkhjQ0VKbnJteg==',
//     //       'Content-Type': 'application/x-www-form-urlencoded',
//     //     },
//     //   };
    
//     //   let tokenResponse = await fetch(tokenUrl, tokenOptions);
//     //   let tokenData = await tokenResponse.json();
    
//     //   if (tokenData && tokenData.accessToken) {
//     //     return tokenData.accessToken;
//     //   }
    
//     //   return null;
//     // };
    
//     // // Step 2: Use the obtained token to make a request
//     // let makePaymentRequest = async (accessToken, request) => {
//     //   if (!accessToken) {
//     //     return null;
//     //   }
    
//     //   var paymentsUrl = 'https://api.key2pay.online/v1/payments';
//     //   var paymentOptions = {
//     //     method: 'POST',
//     //     body: JSON.stringify(request),
//     //     headers: {
//     //       'Authorization': 'Bearer ' + accessToken,
//     //       'Content-Type': 'application/json',
//     //     },
//     //   };
    
//     //   const paymentResponse = await fetch(paymentsUrl, paymentOptions);
//     //   return await paymentResponse.text();
//     // };
    
//     // // Usage
//     // (async () => {
//     //   var accessToken = await getToken();
//     //   console.log(accessToken);
//     //   if (accessToken) {
//     //     var request = {request};
//     //     var response = await makePaymentRequest( request);
        
//     //   }
//     //   return res.send(response);
//     // });
// }catch(error){
//     console.log(error);
//     return(500,{
//         message : 'error'
//     })
// }
    
//   }



  
// // paymentCode,
        
// // Generate a random number between 0 and 999
// const random_number = Math.floor(Math.random() * 1000);

// // Generate a random string of uppercase letters
// const random_letters = generateRandomLetters(8); // Adjust the length as needed

// // Concatenate mer_id, random letters, and the random number
// // order_id = merchantno + random_letters + random_number;
// // console.log(order_id);
//  // const email = toLowerCase().trim();
// // const phone = req.body.mobile_no.toLowerCase().trim();
//  // const email = toLowerCase().trim();
// // const phone = req.body.mobile_no.toLowerCase().trim();
//   // Code for new order id send condition 
// // Set user_txn_id to order_id
// // const user_txn_id = req.body.order_id;

// // Generate our_gen_order
// // const merchantNo = req.body.merchantno;

// // // const our_gen_order = `${merchantNo}${md5(merchantno + hexString + currentDateTime).substring(0, 15)}D`;

// // Set order_id and orderNo

// /*const order_id = our_gen_order;
// const orderNo = our_gen_order;*/
// // let queryParam = [ resultdetail.gatewayNo, currency];

//                     //  if(amount < u_min || amount > u_max){
//                     //     const data = {
//                     //         order_id: req.body.user_txn_id,
//                     //         orderAmount: req.body.amount_come,
//                     //         requestedAmount: req.body.amount_come,
//                     //         currency: req.body.currency,
//                     //         txStatus: 'FAILED',
//                     //         txMsg: `Your amount must be ${currency} ${u_min} and max amount must be ${currency} ${u_max}.`,
//                     //         txTime: new Date().toISOString(),
//                     //         txCode: 'SUCC202',
//                     //         checksum: md5(`${merchantno}|${orderAmount}|${txStatus}|${txTime}|${order_id}|${res.secretkey}`),
//                     //         url: return_url
//                     //     }
//                     //     res.send('cash_free_success_form', data);
//                     //  }
                   
//  // const backUrl = req.session.back_url;
//                     // const endPointUrl = req.session.static_end_point_url;
//                     // const merchantno = req.session.merchantno;
//                     // const cumEmail = req.session.cumemail;
//                     // if (c_currency.toUpperCase().trim() === 'INR' && ![1859, 1920].includes(resultdetail[0].gateway_id)) {
//                                 //     const randomDecimal = Math.floor(Math.random() * 4 + 1) + Math.random().toFixed(2);
//                                 //     req.body.amount = Math.floor(tmp_amount - randomDecimal);
//                                 // }
//                     // if (c_currency.toUpperCase().trim() === 'INR' && ![1859, 1920].includes(resultdetail[0].gateway_id)) {
//                                 //     const randomDecimal = Math.floor(Math.random() * 4 + 1) + Math.random().toFixed(2);
//                                 //     req.body.amount = Math.floor(tmp_amount - randomDecimal);
//                                 // }


//                                 // /*charges by the bank*/
//                                 // // const our_bank_charge = (amount * 34) / 100;
//                                 // // const our_bank_charge_gst = (our_bank_charge * gst_percentage) / 100;
//                                 // // const our_bank_total_charge_with_gst = our_bank_charge + our_bank_charge_gst;
//                                 // // if(!charges){
//                                 // //     const payin_charges = (amount * payin_amount) / 100;
//                                 // //     const over_all_gst_charges = (payin_charges * gst_amount) / 100;
//                                 // // }
//                                 // // //     const gst_charges = ((payin_charges - our_bank_charge) * gst_amount) / 100;
//                                 // // //     const settle_amount = amount - (payin_charges + over_all_gst_charges + rolling_reverse_amount + fiat_fee);
//                                 // // // }else{
//                                 // // //     const payin_charges = (amount * 3) / 100;
//                                 // // //     const over_all_gst_charges = (payin_charges * 0) / 100;
//                                 // // //     const gst_charges = ((payin_charges - our_bank_charge) * 0) / 100;
//                                 // // //     const settle_amount = amount - (payin_charges + over_all_gst_charges + rolling_reverse_amount + fiat_fee);
//                                 // // // }


// module.exports.getBankChargesByCode = async (req, res) =>
// {
//   let {pg_id, search, search_column_type} = req.body
//   try{

//   let queryColumn = search_column_type === 1 ? 'code' : 'title';
//   let query = `SELECT bank_services_charge AS bank_services_charge FROM tbl_code WHERE payment_gate = ? AND ?? = ?`;
//   let result = await mysqlcon(query,[pg_id, queryColumn, search])
//   if (result.length > 0) {
//     return res.json({ bank_services_charge: result[0].bank_services_charge });
//   } else {
//     return res.json({ bank_services_charge: 0 });
//   }
 
// }catch(error){
//     console.log(error);
//     return res.json(500,{
//                     message : 'error'
//                 })
// }
// }

module.exports.getMerchantPayinCharges = async (req, res) =>
{
  try{
    let {currency_code, user_id, pay_charge} = req.body
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
    let sql = `SELECT ${str}, gst_amount as gst_amount FROM tbl_merchant_charges WHERE currency_id = ? AND user_id = ?`
    let result = await mysqlcon(sql,[currency_code, user_id]);
     res.send (result)
}catch(error){
    console.log(error);
    return res.json(500,{
                    message : 'error'
                }) 
}

};
