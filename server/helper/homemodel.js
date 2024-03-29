const mysqlcon = require('../config/db_connection');
const axios = require('axios');
const crypto = require('crypto');
const tokens = require("../ControllerBankpay/bigcatpay")
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;
let fetch;
(async () => {
  const { default: fetchDefault } = await import('node-fetch');
  fetch = fetchDefault;
})();

module.exports.merchantOrderDetails = async (order_id) => {
        const detailsSql = "SELECT * FROM tbl_merchant_transaction WHERE order_no = ?";
        const detailResult = await mysqlcon(detailsSql,[order_id])
        if (detailResult > 0) {
            return rows[0]; 
        }
};

module.exports.getDetailBymer = async(user_id) => {
        const detailsSql = "SELECT * FROM tbl_user where id = ?";
        const detailResult = await mysqlcon(detailsSql,[user_id])
        return detailResult
};

module.exports.getSettleCurrencyName = async(id) => {
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
        return '1'; // Handle other cases or return a default value as needed.
    }
}


  
module.exports.getMerchantDetail = async(usersId) => {
    if (!usersId) {
        const user_id = req.user_id;
        res.send(`User ID: ${user_id}`)
    }
      const sql = `SELECT * FROM tbl_user WHERE id = ${usersId}`;
  
      let merchantDetailResult = await mysqlcon(sql, [usersId])
  
        if (merchantDetailResult.length > 0) {
          return (merchantDetailResult[0]);
        } 
}

module.exports.getBigcatpayPendingStatus = async(res, order_id) => {
  if (order_id !== null ) {
    let sql = `SELECT * FROM tbl_merchant_transaction WHERE gatewayNumber = 1940 AND order_no =  ?`;
    let result = await mysqlcon(sql,[order_id])
    return result;;
  }
};

module.exports.setBigcatpayTransactionStatus = async(status, order_id, message) => {
  let sql = `SELECT * FROM tbl_merchant_transaction WHERE gatewayNumber = 1940 AND order_no =  ?`;
  let result = await mysqlcon(sql,[order_id])
  if (result !== null && result !== undefined && result !== '') {
    if (result && result.status === 3) {
      if (status === '1') {
        const data = {
          updated_on: dateTime, // Current timestamp in ISO format (equivalent to date('Y-m-d H:i:s') in PHP)
          status: 1,
          payment_status: message // Assuming 'message' is a variable containing a string value
        };
        let sql = "UPDATE tbl_merchant_transaction SET ? WHERE merchant_db_response = ? AND order_no = ? AND gatewayNumber = ?";
        let result = await mysqlcon(sql,[data, 0, order_id, 1940]);
      }else if (status === '0') {
        const data = {
          updated_on: dateTime, // Current timestamp in ISO format (equivalent to date('Y-m-d H:i:s') in PHP)
          status: 0,
          payment_status: message // Assuming 'message' is a variable containing a string value
        };
        let sql = "UPDATE tbl_merchant_transaction SET ? WHERE merchant_db_response = ? AND order_no = ? AND gatewayNumber = ?";
        let result = await mysqlcon(sql,[data, 0, order_id, 1940]);
      }
    }
  }
}

module.exports.update_bigcatpay_merchant_db_response = async(order_id) => {
  const sql = `UPDATE tbl_merchant_transaction SET merchant_db_response = 1 WHERE order_no = ? AND gatewayNumber = 1940`;
  const result = await mysqlcon(sql,[order_id]);

};

module.exports.merchantPaymentStatusUpdateOnEndPoint = async(fields,payment_static_url) => {
  

  // const fields = {
  //   // Your JSON data here
  // };
  
  const paymentStaticUrl = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php'; // Replace with your URL
  const jsonData = JSON.stringify(fields);
  
  fetch(paymentStaticUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  })
    .then(response => response.text())
    .then(data => {
      // Handle the response data here
      console.log('Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
}

module.exports.bigcatPayDepositeStatus = async(order_no) => {

  const secretIdentifier = 'iEJs5du';
  const hashCode = crypto.createHash('md5').update('transaction_status' + secretIdentifier).digest('hex');

  const data = {
    command: 'transaction_status',
    hashCode: hashCode,
    txid: order_no // Replace order_no with the actual transaction ID
  };
  console.log(data);
  const token = await tokens.bigcatToken(); // Function to get the token
  const apiUrl = 'https://api.uat.bigcatpay.com/api/callBack';
  function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data, getCircularReplacer())
  };

  fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      // Handle non-JSON response
      return response.text(); // or response.blob(), etc., based on the actual response type
    }
  })
  .then(data => {
    // Handle JSON data or non-JSON data differently
    console.log(data);
  })

}



