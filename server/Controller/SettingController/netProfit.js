const mysqlcon = require("../../config/db_connection");

// Default Api 👇

module.exports.defaultProfit = async (req, res) => {
    try {
        const test = "SELECT sortname FROM countries WHERE status = 1";
        const testResult = await mysqlcon(test);
        const Currencies = [];
        for (const obj of testResult) {
            const { sortname } = obj;
            Currencies.push(sortname);
        }
        let {date,to ,from } = req.body
        if(to && from){
            let sqlPayout = "SELECT SUM(amount) AS PayoutCharge, currency AS PayoutCurrency , SUM(gst_amount+akonto_charge) AS charge2, 'Payout' AS TransactionType FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <=? AND status = 'SUCCESS' GROUP BY currency"
            let sqlSettle = "SELECT SUM(requestedAmount) AS SettleCharge, fromCurrency AS SettleCurrency, SUM(charges) AS charge3 , 'Settlement' AS TransactionType FROM tbl_settlement WHERE created_on >= ? AND DATE(created_on) <= ? AND status = 1 GROUP BY fromCurrency"
            let sqlDeposit = "SELECT SUM(ammount) AS DepositCharge, ammount_type AS DepositCurrency, 'Deposit' AS TransactionType FROM tbl_merchant_transaction WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND status = 1 GROUP BY ammount_type"
            let sqlChargeback = "SELECT SUM(ammount) AS ChargebackCharge, ammount_type AS ChargebackCurrency, 'Chargeback' AS TransactionType FROM tbl_merchant_transaction WHERE  DATE(created_on) >= ? AND DATE(created_on) <= ? AND status = 5 GROUP BY ammount_type"
            let sqlRefund = "SELECT SUM(ammount) AS RefundCharge, ammount_type AS RefundCurrency, 'Refund' AS TransactionType FROM tbl_merchant_transaction WHERE  DATE(created_on) >= ? AND DATE(created_on) <= ? AND status = 4 GROUP BY ammount_type"
            let sqlCharges = "SELECT SUM(payin_charges+gst_charges) AS charge1 ,ammount_type AS Currency FROM tbl_merchant_transaction WHERE  DATE(created_on) >= ? AND DATE(created_on) <= ? AND status IN(1,5,4) GROUP BY ammount_type "
            let resultPayout = await mysqlcon(sqlPayout,[from,to])
            let resultSettlement = await mysqlcon(sqlSettle,[from,to])
            let resultDeposit = await mysqlcon(sqlDeposit,[from,to])
            let resultChargeback  = await mysqlcon(sqlChargeback,[from,to])
            let resultRefund = await mysqlcon(sqlRefund,[from,to])
            let resultCharges = await mysqlcon(sqlCharges,[from,to])
            let Total = Currencies.map(x=>({
                Currency : x,
                Payout : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.PayoutCharge).toFixed(2)}, 0),
                Settle : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.SettleCharge).toFixed(2)}, 0),
                Deposite : resultDeposit.filter(item=> item.DepositCurrency === x).reduce((a, b) => { return (b.DepositCharge).toFixed(2)}, 0),
                Chargeback : resultChargeback.filter(item=> item.ChargebackCurrency === x).reduce((a, b) => { return (b.ChargebackCharge).toFixed(2)}, 0),
                Refund : resultRefund.filter(item=> item.RefundCurrency === x).reduce((a, b) => { return (b.RefundCharge).toFixed(2)}, 0),
                DepositCharge : resultCharges.filter(item=> item.Currency === x).reduce((a, b) => { return (b.charge1).toFixed(2)}, 0),
                PayCharge : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.charge2).toFixed(2)}, 0),
                SettleCharge : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.charge3).toFixed(2)}, 0),
            }))
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].Deposite) -  (parseFloat(Total[i].Payout) + parseFloat(Total[i].Settle)))
                Total[i].AvailableBalance=res.toFixed(2);
            }
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].DepositCharge) + parseFloat(Total[i].SettleCharge) + parseFloat(Total[i].PayCharge))
                Total[i].Charges=res.toFixed(2);
            }
            if(Total){
                return res.json(200,{
                   Currencieswise : Total,
                })
            }else{
                return res.json(201,{
                    message : "error"
                })
            }
        }else if(date){
            let sqlPayout = "SELECT SUM(amount) AS PayoutCharge, currency AS PayoutCurrency , SUM(gst_amount+akonto_charge) AS charge2, 'Payout' AS TransactionType FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND status = 'SUCCESS' GROUP BY currency"
            let sqlSettle = "SELECT SUM(requestedAmount) AS SettleCharge, fromCurrency AS SettleCurrency, SUM(charges) AS charge3 , 'Settlement' AS TransactionType FROM tbl_settlement WHERE DATE(created_on) = ? AND status = 1 GROUP BY fromCurrency"
            let sqlDeposit = "SELECT SUM(ammount) AS DepositCharge, ammount_type AS DepositCurrency, 'Deposit' AS TransactionType FROM tbl_merchant_transaction WHERE DATE(created_on) = ? AND status = 1 GROUP BY ammount_type"
            let sqlChargeback = "SELECT SUM(ammount) AS ChargebackCharge, ammount_type AS ChargebackCurrency, 'Chargeback' AS TransactionType FROM tbl_merchant_transaction WHERE DATE(created_on) = ? AND status = 5 GROUP BY ammount_type"
            let sqlRefund = "SELECT SUM(ammount) AS RefundCharge, ammount_type AS RefundCurrency, 'Refund' AS TransactionType FROM tbl_merchant_transaction WHERE DATE(created_on) = ? AND status = 4 GROUP BY ammount_type"
            let sqlCharges = "SELECT SUM(payin_charges+gst_charges) AS charge1 ,ammount_type AS Currency FROM tbl_merchant_transaction WHERE DATE(created_on) = ? AND  status IN(1,5,4) GROUP BY ammount_type "
            let resultPayout = await mysqlcon(sqlPayout,[date])
            let resultSettlement = await mysqlcon(sqlSettle,[date])
            let resultDeposit = await mysqlcon(sqlDeposit,[date])
            let resultChargeback  = await mysqlcon(sqlChargeback,[date])
            let resultRefund = await mysqlcon(sqlRefund,[date])
            let resultCharges = await mysqlcon(sqlCharges,[date])
            let Total = Currencies.map(x=>({
                Currency : x,
                Payout : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.PayoutCharge).toFixed(2)}, 0),
                Settle : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.SettleCharge).toFixed(2)}, 0),
                Deposite : resultDeposit.filter(item=> item.DepositCurrency === x).reduce((a, b) => { return (b.DepositCharge).toFixed(2)}, 0),
                Chargeback : resultChargeback.filter(item=> item.ChargebackCurrency === x).reduce((a, b) => { return (b.ChargebackCharge).toFixed(2)}, 0),
                Refund : resultRefund.filter(item=> item.RefundCurrency === x).reduce((a, b) => { return (b.RefundCharge).toFixed(2)}, 0),
                DepositCharge : resultCharges.filter(item=> item.Currency === x).reduce((a, b) => { return (b.charge1).toFixed(2)}, 0),
                PayCharge : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.charge2).toFixed(2)}, 0),
                SettleCharge : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.charge3).toFixed(2)}, 0),
            }))
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].Deposite) -  (parseFloat(Total[i].Payout) + parseFloat(Total[i].Settle)))
                Total[i].AvailableBalance=res.toFixed(2);
            }
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].DepositCharge) + parseFloat(Total[i].SettleCharge) + parseFloat(Total[i].PayCharge))
                Total[i].Charges=res.toFixed(2);
            }
            if(Total){
                return res.json(200,{
                   Currencieswise : Total,
                })
            }else{
                return res.json(201,{
                    message : "error"
                })
            }
        }else{
            let sqlPayout = "SELECT SUM(amount) AS PayoutCharge, currency AS PayoutCurrency , SUM(gst_amount+akonto_charge) AS charge2, 'Payout' AS TransactionType FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' GROUP BY currency"
            let sqlSettle = "SELECT SUM(requestedAmount) AS SettleCharge, fromCurrency AS SettleCurrency, SUM(charges) AS charge3 , 'Settlement' AS TransactionType FROM tbl_settlement WHERE status = 1 GROUP BY fromCurrency"
            let sqlDeposit = "SELECT SUM(ammount) AS DepositCharge, ammount_type AS DepositCurrency, 'Deposit' AS TransactionType FROM tbl_merchant_transaction WHERE status = 1 GROUP BY ammount_type"
            let sqlChargeback = "SELECT SUM(ammount) AS ChargebackCharge, ammount_type AS ChargebackCurrency, 'Chargeback' AS TransactionType FROM tbl_merchant_transaction WHERE status = 5 GROUP BY ammount_type"
            let sqlRefund = "SELECT SUM(ammount) AS RefundCharge, ammount_type AS RefundCurrency, 'Refund' AS TransactionType FROM tbl_merchant_transaction WHERE status = 4 GROUP BY ammount_type"
            let sqlCharges = "SELECT SUM(payin_charges+gst_charges) AS charge1 ,ammount_type AS Currency FROM tbl_merchant_transaction WHERE  status IN(1,5,4) GROUP BY ammount_type "
            let resultPayout = await mysqlcon(sqlPayout)
            let resultSettlement = await mysqlcon(sqlSettle)
            let resultDeposit = await mysqlcon(sqlDeposit)
            let resultChargeback  = await mysqlcon(sqlChargeback)
            let resultRefund = await mysqlcon(sqlRefund)
            let resultCharges = await mysqlcon(sqlCharges)
            let Total = Currencies.map(x=>({
                Currency : x,
                Payout : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.PayoutCharge).toFixed(2)}, 0),
                Settle : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.SettleCharge).toFixed(2)}, 0),
                Deposite : resultDeposit.filter(item=> item.DepositCurrency === x).reduce((a, b) => { return (b.DepositCharge).toFixed(2)}, 0),
                Chargeback : resultChargeback.filter(item=> item.ChargebackCurrency === x).reduce((a, b) => { return (b.ChargebackCharge).toFixed(2)}, 0),
                Refund : resultRefund.filter(item=> item.RefundCurrency === x).reduce((a, b) => { return (b.RefundCharge).toFixed(2)}, 0),
                DepositCharge : resultCharges.filter(item=> item.Currency === x).reduce((a, b) => { return (b.charge1).toFixed(2)}, 0),
                PayCharge : resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.charge2).toFixed(2)}, 0),
                SettleCharge : resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.charge3).toFixed(2)}, 0),
            }))
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].Deposite) -  (parseFloat(Total[i].Payout) + parseFloat(Total[i].Settle)))
                Total[i].AvailableBalance=res.toFixed(2);
            }
            for(let i=0 ;i<Total.length;i++){
                let res = (parseFloat(Total[i].DepositCharge) + parseFloat(Total[i].SettleCharge) + parseFloat(Total[i].PayCharge))
                Total[i].Charges=res.toFixed(2);
            }
            if(Total){
                return res.json(200,{
                   Currencieswise : Total,
                })
            }else{
                return res.json(201,{
                    message : "error"
                })
            }
        }
    }catch (error) {
        console.log(error)
        return res.json(500, {
        message: "error occurered",
        });
    }
}