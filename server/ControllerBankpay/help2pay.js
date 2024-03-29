let mysqlcon = require("../config/db_connection");
let crypto = require('crypto');
let helpers = require("../helper/defaultheler")
let moment = require('moment-timezone');
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+ time;   

module.exports.help2Pay = async (req, res) => {
    try{

        const timezone = 'Asia/Kolkata';
        moment.tz.setDefault(timezone);
        
        const startTime = moment();
        const convertedTime = startTime.add(2, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const dateString = startTime.format('YYYYMMDDHHmmss');

        let Merchant = 'INT0944';
        let Currency = 'IDR';
        let Customer = 'user1';
        let Reference = 'D' + startTime;
        let Amount = '200000.00';
        let Datetime = convertedTime;
        let FrontURI = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';
        let BackURI = 'https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php';
        let Bank = '';
        let Language = 'en-us'
        let ClientIP = '192.185.129.71';
        let SecurityCode = 'KnhAzqe3J6MitYzpCfsw'


        let string = Merchant + Reference + Customer + Amount + Currency + dateString + SecurityCode + ClientIP;
        let Key = crypto.createHash('md5').update(string).digest('hex');
        return res.send({
            Merchant,
            Currency,
            Customer,
            Reference,
            Amount,
            ClientIP,
            SecurityCode,
            Datetime,
            FrontURI,
            BackURI,
            Bank,
            Language,
            string,
            Key
        })
    }catch(error){
        return res.json(500,{
            message : 'error'
        })
    }
}

module.exports.callbackHelp = async(req,res)=>{
    let enc_data = req.body;
    let order_id = enc_data['Reference'];

    let json_array = {
        data: enc_data,
        curlresponse: -1,
        curltime: -1,
        created_on: dateTime
    }

    let bank_log = {
        order_id: order_id || '',
        pg_response_in_json: JSON.stringify(json_array),      
        created_on: new Date().toISOString(),
    };
   
    let sqlCreate = "INSERT INTO tbl_payment_gate_response_tale SET ? "
    await mysqlcon(sqlCreate,[bank_log])

    let payment_transaction = await helpers.getHelp2payPendingStatus(order_id)

    if(payment_transaction){
        let statusResponse = await helpers.help2PayStatus(payment_transaction.order_no,'TransferStatus')
        // console.log(statusResponse)
        let bank_log = {
            order_id: order_id || '',
            pg_response_in_json: JSON.stringify(json_array),
            created_on: dateTime,
        };
    
        let sqlCreate = "INSERT INTO tbl_payment_gate_response_tale SET ? "
        await mysqlcon(sqlCreate,[bank_log])

        if(statusResponse !== 0){
            let state = "PENDING";
            let state_code = "SUCC201";
            let message = "Transaction pending"; 

            let update_order_no = payment_transaction[0].order_no
    
            const uppercasedStatusCode = statusResponse.StatusCode && statusResponse.StatusCode.trim().toUpperCase();
            // console.log(uppercasedStatusCode)

                if (statusResponse && statusResponse.StatusCode && statusResponse.StatusCode.trim().toUpperCase() === '000') {
                    
                    let message = 'Transaction success.';
                    await helpers.setHelp2payTransactionStatus(1, payment_transaction.order_no, message);
                    let state = "SUCCESS";
                    let state_code = "SUCC200";
                }
                else if(uppercasedStatusCode === '001' || uppercasedStatusCode === '007' || uppercasedStatusCode === '008'){
                    let message = 'Transaction failed.';
                    await helpers.setHelp2payTransactionStatus(0, payment_transaction.order_no, message);
                    let state = "FAILED";
                    let state_code = "SUCC202";  
                }

            if(payment_transaction[0].new_trx === 1){
                 od_id = payment_transaction[0].txn_id;
            }else{
                 od_id = payment_transaction[0].txn_id;
            }


            let udetail = await helpers.getDetailBymer(payment_transaction.user_id);
            
            let checksumString = `${payment_transaction.user_id}|${payment_transaction.ammount}|${state}|${payment_transaction.created_on}|${od_id}|${udetail.secretkey}`;
            let data = {
                order_id: od_id,
                orderAmount: payment_transaction[0].ammount,
                requestedAmount: payment_transaction[0].txn_amount ? payment_transaction[0].txn_amount : payment_transaction[0].ammount,
                currency: payment_transaction[0].ammount_type,
                txStatus: state,
                txMsg: message,
                txTime: payment_transaction[0].created_on,
                txCode: state_code,
                checksum: require('crypto').createHash('md5').update(checksumString).digest('hex'),
            };
            
            let merchantResponse = data;

            console.log(payment_transaction[0].end_point_url)
            
            
            if (state.trim() === 'SUCCESS' || state.trim() === 'FAILED') {
                // console.log('Transaction State:', state.trim());

                await helpers.update_help2pay_merchant_db_response(update_order_no)
                

                // let end_point_response = await helpers.merchantPaymentStatusUpdateOnEndPoint(data,payment_transaction.end_point_url)
                let end_point_response = await helpers.merchantPaymentStatussUpdateOnEndPoint(data)

                let data1 = {
                    date_time: dateTime,
                    curltime: -1,
                    end_point_response: end_point_response,
                    merchant_response: 'YES-HELP2PAY',
                    order_no : od_id,
                    created_on :dateTime
                  }

                  let created_on = dateTime
                  let sql = "INSERT INTO tbl_cron_log SET data = ? ,created_on = ? ,order_no = ?"
                  let result = await mysqlcon(sql,[(JSON.stringify(data,data1)),created_on,od_id])
                  console.log(result)
            }

            merchantResponse['url'] = payment_transaction[0].end_point_url
            // console.log(JSON.stringify(merchantResponse));
            return res.send(merchantResponse)
            
        }
    }
}
                             