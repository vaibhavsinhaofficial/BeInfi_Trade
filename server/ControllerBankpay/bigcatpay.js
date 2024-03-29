const { CHAR_0 } = require("picomatch/lib/constants");
const mysqlcon = require("../config/db_connection");
const homesupport = require("../helper/homemodel")
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;
const crypto = require('crypto'); // Import the crypto module
const CryptoJS = require('crypto-js');
const btoa = require('btoa');
const atob = require('atob');
const axios = require('axios');

module.exports.bigcatChekout = async (req, res) =>{
  try{
let data = {
    txid: '12345124',
    currency: 'INR',
    amount: '300',
    token: 'USDT',
    callback_url: 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php',
    customer_uid: 'csmr',
    customer_email: 'vishwakarshanroop@gmail.com',
    customer_reference_id: '7S9CKd'
  };
  
  let jdata = JSON.stringify(data);
  console.log(jdata);

  let encryption = JSON.stringify({
    txid: '12345124',
    currency: 'INR',
    amount: '300',
    token: 'TRC20-USDT',
    callback_url: 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php',
    customer_uid: 'csmr',
    customer_email: 'vishwakarshanroop@gmail.com',
    customer_reference_id: '7S9CKd'
  });
  const algo = 'aes-128-cbc';
const secret = 'NTrfFyo';
const passphrase = secret.padEnd(16, '0').slice(0, 16);
const iv = Buffer.from(passphrase, 'utf8');
const cipher = crypto.createCipheriv(algo, Buffer.from(passphrase), iv);

let encrypted = cipher.update(encryption, 'utf8', 'base64');
encrypted += cipher.final('base64');


  const url = 'YOUR_POST_ENDPOINT_URL';

  const postData = {
    encryptiondata: encrypted,
    platform: 'ubankconnect'
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  res.render('checkOut', { data: encrypted });
  
 
}
catch(error){
  console.log(error);
  res.status(500).json({ status: false, message: 'Error to complete task.', error });
}
}


// Status API
module.exports.bigcatStatus = async (req, res) => {
  try{
    const crypto = require('crypto');

    const secretIdentifier = 'iEJs5du';
    const inputString = 'transaction_status' + secretIdentifier;
    const hashCode = crypto.createHash('md5').update(inputString).digest('hex');

    const data = {
      command: 'transaction_status',
      hashCode: hashCode, // Assuming you have previously calculated the MD5 hash as shown in the previous response.
      txid: 'TEST1698040913'
    };

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwNmM0Y2UyODM1Nzg1NzhlOTY0MjYzOTJlMTk1MDczODM5NGQwNTRjMmVjNGI3ODE0ZjgxNjE4N2FkZDYyODMzNTM0MGRhMGZiOTkxOTkzIn0.eyJhdWQiOiIxIiwianRpIjoiNzA2YzRjZTI4MzU3ODU3OGU5NjQyNjM5MmUxOTUwNzM4Mzk0ZDA1NGMyZWM0Yjc4MTRmODE2MTg3YWRkNjI4MzM1MzQwZGEwZmI5OTE5OTMiLCJpYXQiOjE2OTg5MjExNDcsIm5iZiI6MTY5ODkyMTE0NywiZXhwIjoxNzMwNTQzNTQ3LCJzdWIiOiIxOTIiLCJzY29wZXMiOltdfQ.YJPBgqi9WzJFOvyQLJVdUoJnBVYOwQpeZNkIjTMFDO0fiYmfNa4csUigZ7rX-k9MxCHSG8xivMMG_vCMA_gwxVpWP5A7HPHIeVnlTedjeevABo3GIToDx-StPjakbLkfyYSTSX8GDMlDQ0YOKd85R41F4tcvcfVSb4_oe_-ftMwaskUbiVOH3WrNij7hg0EQ7cImeRt6gDI-yMhcNg1LfMdD6BslufBHS1ResTXjPz3vPnkkhpG-KnzpLewHm3mzuidCxupuxTBgkEXImAkuh0TZ-rkIyAx8kNk4_jOmIatdFotUkOvv76frcXYMV0hBdQ36oCB4XWNi9eZ1SBMjzWhKogjIfkd6hCZC-BujEAPlG-lgJekFPwZclLoZGmG0AxGSnNtFEDUMda1I8LjrXNIXRQE0dIeu5oE5Xo4-VuEd5LSnnwWHYBlkN4tr5z5J9g-mbKpWthltLJsNc1SijvdnsJ0TvreupvjbfIJDKL6zZyiEeQKuEgwhQJ8WOdgKazzjyZlhaR271HCkZPgeJQHX2AKSyzi4uVYSrmcrs74v3x-askIuapJj7-Aqy3chzW2SLLM7KpD3qD-ZAZUifdOxJpbdY8_7z8jKk4imWZ9BVFCb95LrMv6iUYOOw0BtERFhhyOl7_Mhm_vB9uJvVN3JKW0E4V_7mczyUDcNxXc";

    // console.log(data);

    const url = 'https://api.uat.bigcatpay.com/api/callBack';

    axios.post(url, data, {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log('Status Code:', response.status);

      // You can also access and log the response data here
      console.log('Response Data:');
      console.log(response.data);
      
    })
   

  }catch(error){
    console.log(error);
    res.status(500).json({ status: false, message: 'Error to complete task.', error });
  }
}


module.exports.bigcatToken = async(req, res) => {
  try{
    const data = {
      email: 'ubankconnect@bcpay.io',
      password: 'QMe4x9I5JT'
    };

    const url = 'https://api.bigcatpay.com/api/login';
    axios.post(url, data)
  .then((response) => {
    console.log('Response:');
    console.log(response.data);
     return response.data
  })

  }catch(error){
    console.log(error);
    res.status(500).json({status:false, message: 'Error to complete task.',error});
  }
}

// Call Back

module.exports.bigcatResponse = async(req, res)  => {
  try{
    
    let enc_data = req.body;
    let order_id = '';
    let resData = {};
    if (enc_data !== undefined && enc_data !== null && enc_data !== '') {
      console.log(typeof enc_data);
      resData = enc_data;
      order_id = resData.txid || '';

    }

    let json_array = {
      data: enc_data,
      curlresponse: -1,
      curltime: -1,
      created_on: dateTime // Equivalent to date('Y-m-d H:i:s') in PHP
    };

    const bank_log = {
      order_id: order_id ? order_id : '',
      pg_response_in_json: JSON.stringify(json_array),
      created_on: dateTime // Current timestamp in ISO format
    };
    let sql = "INSERT INTO tbl_payment_gate_response_tale SET ?";
     await mysqlcon(sql,[bank_log]);

    let payment_transaction = await homesupport.getBigcatpayPendingStatus(order_id);
    if (payment_transaction !== null ) {
      let bankResponse = await homesupport.bigcatPayDepositeStatus(payment_transaction.order_no);
      const statusResponse = JSON.parse(bankResponse);
      console.log(statusResponse);
      const bank_logs = {
        order_id: payment_transaction.order_no,
        pg_response_in_json: JSON.stringify(statusResponse),
        created_on: dateTime // Current timestamp in ISO format
      };
      console.log(bank_logs);
      let sql = "INSERT INTO tbl_payment_gate_response_table SET ?";
      await mysqlcon(sql,[bank_logs]);
      if (statusResponse && Object.keys(statusResponse).length > 0) {
        let state = "PENDING";
        let state_code = "SUCC201";
        let message = "Transaction pending";
        let update_order_no = payment_transaction.order_no; // Assuming payment_transaction is defined
        
        if (statusResponse.status.toLowerCase().trim() === 'completed') {
          let message = 'Transaction SUCCESS.';
          // Assuming setBigcatpayTransactionStatus is an asynchronous function
          await homesupport.setBigcatpayTransactionStatus(1, payment_transaction.order_no, message);
          let state = "SUCCESS";
          let state_code = "SUCC200";
        }else if (
          statusResponse.status.toLowerCase().trim() === 'expired' ||
          statusResponse.status.toLowerCase().trim() === 'too_little' ||
          statusResponse.status.toLowerCase().trim() === 'too_much'
        ) {
          let message = 'Transaction FAILED.';
          // Assuming setBigcatpayTransactionStatus is an asynchronous function
          await homesupport.setBigcatpayTransactionStatus(0, payment_transaction.order_no, message);
          let state = "FAILED";
          const state_code = "SUCC202";
        }

        let od_id = (payment_transaction.new_trx === 1) ? payment_transaction.txn_id : payment_transaction.order_no;
        let udetail = await homesupport.getDetailBymer(payment_transaction.user_id);
        const data = {
          order_id: order_id,
          orderAmount: payment_transaction.ammount,
          requestedAmount: (payment_transaction.txn_amount !== null && payment_transaction.txn_amount !== undefined && payment_transaction.txn_amount !== '') 
          ? payment_transaction.txn_amount 
          : payment_transaction.ammount,
          currency: payment_transaction.ammount_type,
          txStatus: state,
          txMsg: message,
          txTime: payment_transaction.created_on,
          txCode: state_code,
          checksum: md5(`${payment_transaction.user_id }|${orderAmount}|${txStatus}|${order_id}|${res.secretkey}`),
          
        };
        console.log(data);
        let merchantResponse = data;
        if (state.trim() === "SUCCESS" || state.trim() === "FAILED") {
          await homesupport.update_bigcatpay_merchant_db_response(update_order_no);
          let end_point_response = await homesupport.merchantPaymentStatusUpdateOnEndPoint(data, payment_transaction.end_point_url);

          const data = {
          date_time : dateTime, // Current timestamp in ISO format (equivalent to date('Y-m-d H:i:s') in PHP)
          curltime :  -1,
          end_point_response : end_point_response,
          merchant_response : 'YES-BIGCATPAY'
          }
          let data_log ={
            order_no: order_no,
            data: JSON.stringify(data),
            created_on: dateTime
          }
          let sql = "INSERT INTO tbl_cron_log SET ?";
          let result = await mysqlcon(sql,[data_log])
        }
        
      }
    }
  }catch(error){
    console.log(error);
    res.status(500).json({ 
      status: false, 
      message: 'Error to complete task.', 
      error : error
    });
  }
}