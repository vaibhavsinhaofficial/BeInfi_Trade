const mysqlcon = require('../config/db_connection');
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports.statement = async function(req,res){

    let user = req.user;
    let {id} = req.body;
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [user.id]);
    const curr = [];

    if (testResult.length > 0) {
        const countryList = testResult[0].solution_apply_for_country.split(',');
        for (const country of countryList) {
            const test1 = "SELECT sortname FROM countries WHERE id = ? ORDER BY name";
            const test1Result = await mysqlcon(test1, [country]);
            curr.push(test1Result[0].sortname);
        }
    }


    // let sqlCurrency = "SELECT sortname AS currency FROM `countries` WHERE id IN(?) AND status = 1";
    // let resultCurrency = await mysqlcon(sqlCurrency, [usersCountry]);

    // let curr = resultCurrency.map(item => item.currency);

    let sqlCurrencyRate = "SELECT rate AS Rate, deposit_currency AS depositCurrency FROM `tbl_settled_currency` WHERE deposit_currency IN (?)";
    let resultCurrencyRate = await mysqlcon(sqlCurrencyRate, [curr]);

    let rate = [];

    for (let i = 0; i < curr.length; i++) {
        for (let j = 0; j < resultCurrencyRate.length; j++) {
            if (resultCurrencyRate[j].depositCurrency === curr[i]) {
                rate.push(resultCurrencyRate[j].Rate);
                break;
            }
        }
    }

    // return res.send(rate)

    let dbc = [];
    let rbc = [];
    let cbc = [];
    let pbc = [];
    let sbc = [];
    let ccc = [];
    
    try {
       
        let {month,year} = req.body;
        let months;
        month = parseInt(month);
        year = parseInt(year);
        if(month === 1){
            months = "January";
        }
        if(month === 2){
            months = "February";
        }
        if(month === 3){
            months = "March";
        }
        if(month === 4){
            months = "April";
        }
        if(month === 5){
            months = "May";
        }
        if(month === 6){
            months = "June";
        }
        if(month === 7){
            months = "July";
        }
        if(month === 8){
            months = "August";
        }
        if(month === 9){
            months = "September";
        }
        if(month === 10){
            months = "October";
        }
        if(month === 11){
            months = "November";
        }
        if(month === 12){
            months = "December";
        }
 
        if(id){   
            // for deposits
            let sql1 = "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositSum, (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundsAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundFees, (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackFees, 0 as accountFees, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0)+ COALESCE(SUM(our_bank_charge_gst),0) FROM tbl_merchant_transaction WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositCommissions, 0 as anyotherCharges";

            // for payout
            let sql2 = "SELECT (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payouts,(SELECT COALESCE(SUM(gst_amount),0)+ COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payoutCommissions, (SELECT COALESCE(SUM(akonto_charge),0)+ COALESCE(SUM(bank_charges),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as bankaccountCharges";

            //for settlement
            let sql3 = "SELECT (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlements, (SELECT COALESCE(SUM(totalCharges),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlementCharges, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as netSettlement,0 as anyotherCharges";

            // for commision and charges 

            let sql4 = "SELECT x.depositCharge+x.chargebackFee+x.refundFee+x.payoutCharge+x.settlementCharge as commissions ,x.ubankconnectDepositsCharges,x.ubankconnectRefundCharges,x.ubankconnectChargebackCharges,x.ubankconnectPayoutCharges,x.ubankconnectOtherCharges,x.bankCharges,x.tax FROM (SELECT (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositCharge, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackFee,(SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundFee,(SELECT COALESCE(SUM(bank_charges),0)+COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payoutCharge,(SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlementCharge,(SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectDepositsCharges, (SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectRefundCharges, (SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectChargebackCharges, (SELECT COALESCE(SUM(bank_charges),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectPayoutCharges, 0 as ubankconnectOtherCharges, 0 as bankCharges, 0 as tax) as x";

            let result1 = await mysqlcon(sql1,[id,month,year,id,month,year,id,month,year,id,month,year,id,month,year,id,month,year]);
            let result2 = await mysqlcon(sql2,[id,month,year,id,month,year,id,month,year]);
            let result3 = await mysqlcon(sql3,[id,month,year,id,month,year,id,month,year]);
            let result4 = await mysqlcon(sql4,[id,month,year,id,month,year,id,month,year,id,month,year,id,month,year,id,month,year,id,month,year,id,month,year,id,month,year]); 

            for(let i=0; i<curr.length; i++){
                console.log(rate[i])

                    // for deposit by currency table
                let sql5 = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, (x.Amount - x.charges)/(SELECT ? as rate) AS Settlement_Amount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for refund by currency table
                let sql6 =  "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, (x.Amount - x.charges)/(SELECT ? as rate) AS Settlement_Amount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? and status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                
                // for chargeback by currency table
                let sql7 = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, (x.Amount - x.charges)/(SELECT ? as rate) AS Settlement_Amount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? and status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for payout by currency table
                let sql8 = "SELECT ? as currency,x.Amount, x.charges,x.Amount-x.charges as NetAmount, (x.Amount - x.charges)/(SELECT ? as rate) AS Settlement_Amount FROM (SELECT (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(bank_charges),0)+ COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges) as x";

                // for settlement by currency table
                let sql9  = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, (x.Amount - x.charges)/(SELECT ? as rate) AS Settlement_Amount FROM (SELECT (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount, (SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for Commission and Charges by Currency
                let sql10 = "SELECT ? as currency,x.DepositAmount,x.DepositCharges,x.PayoutAmount,x.PayoutCharges,x.SettlementCharges,x.OtherCharges, ((x.DepositAmount-x.DepositCharges)-(x.PayoutAmount-x.PayoutCharges)-(x.SettlementAmount-x.SettlementCharges))/(SELECT ? as rate) AS TotalAmount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as DepositAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as DepositCharges, (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as PayoutAmount, (SELECT COALESCE(SUM(bank_charges),0)+COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as PayoutCharges, (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount, (SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementCharges, 0 as OtherCharges) as x";

                let result5 = await mysqlcon(sql5,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year]);
                let result6 = await mysqlcon(sql6,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year]);
                let result7 = await mysqlcon(sql7,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year]);
                let result8 = await mysqlcon(sql8,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year]);
                let result9 = await mysqlcon(sql9,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year]);
                let result10 = await mysqlcon(sql10,[curr[i],rate[i],id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year,id,curr[i],month,year]);

                dbc.push(result5[0]);
                rbc.push(result6[0]);
                cbc.push(result7[0]);
                pbc.push(result8[0]);
                sbc.push(result9[0]);
                ccc.push(result10[0]);


            }
                return res.json(200,{
                data:{
                    message:`Finnacial Statement for ${months} - ${(year)}`,
                    deposits:result1,
                    payouts:result2,
                    settlements:result3,
                    cac:result4,
                    dbc,
                    rbc,
                    cbc,
                    pbc,
                    sbc,
                    ccc
                }
            })

        } else {
            // for deposits
            let sql1 = "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositSum, (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundsAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundFees, (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackFees, 0 as accountFees, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0)+ COALESCE(SUM(our_bank_charge_gst),0) FROM tbl_merchant_transaction WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositCommissions, 0 as anyotherCharges";

            // for payout
            let sql2 = "SELECT (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payouts,(SELECT COALESCE(SUM(gst_amount),0)+ COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payoutCommissions, (SELECT COALESCE(SUM(akonto_charge),0)+ COALESCE(SUM(bank_charges),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as bankaccountCharges";

            //for settlement
            let sql3 = "SELECT (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlements, (SELECT COALESCE(SUM(totalCharges),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlementCharges, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as netSettlement,0 as anyotherCharges";

            // for commision and charges 
            let sql4 = "SELECT x.depositCharge+x.chargebackFee+x.refundFee+x.payoutCharge+x.settlementCharge as commissions ,x.ubankconnectDepositsCharges,x.ubankconnectRefundCharges,x.ubankconnectChargebackCharges,x.ubankconnectPayoutCharges,x.ubankconnectOtherCharges,x.bankCharges,x.tax FROM (SELECT (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as depositCharge, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as chargebackFee,(SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as refundFee,(SELECT COALESCE(SUM(bank_charges),0)+COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as payoutCharge,(SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as settlementCharge,(SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ?  AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectDepositsCharges, (SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectRefundCharges, (SELECT COALESCE(SUM(our_bank_charge),0) FROM tbl_merchant_transaction WHERE user_id = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectChargebackCharges, (SELECT COALESCE(SUM(bank_charges),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as ubankconnectPayoutCharges, 0 as ubankconnectOtherCharges, 0 as bankCharges, 0 as tax) as x";


            let result1 = await mysqlcon(sql1,[user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year]);
            let result2 = await mysqlcon(sql2,[user.id,month,year,user.id,month,year,user.id,month,year]);
            let result3 = await mysqlcon(sql3,[user.id,month,year,user.id,month,year,user.id,month,year]);
            let result4 = await mysqlcon(sql4,[user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year,user.id,month,year]);

            for(let i=0; i<curr.length; i++){

                // for deposit by currency table
                let sql5 = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, x.SettlementAmount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for refund by currency table
                let sql6 =  "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, x.SettlementAmount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? and status = 4 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for chargeback by currency table
                let sql7 = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, x.SettlementAmount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(tax_amt),0)+ COALESCE(SUM(payin_charges),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settle_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? and status = 5 AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for payout by currency table
                let sql8 = "SELECT ? as currency,x.Amount, x.charges,x.Amount-x.charges as NetAmount, (x.Amount-x.charges)/80 as SettlementAmount FROM (SELECT (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount,(SELECT COALESCE(SUM(bank_charges),0)+ COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges) as x";

                // for settlement by currency table
                let sql9  = "SELECT ? as currency,x.Amount,x.charges,x.Amount-x.charges as NetAmount, x.SettlementAmount FROM (SELECT (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as Amount, (SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as charges, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount) as x";

                // for Commission and Charges by Currency
                let sql10 = "SELECT ? as currency,x.DepositAmount,x.DepositCharges,x.PayoutAmount,x.PayoutCharges,x.SettlementAmount,x.SettlementCharges,x.OtherCharges, (x.DepositAmount-x.DepositCharges+x.PayoutAmount-x.PayoutCharges+x.SettlementAmount-x.SettlementCharges)/70 as TotalAmount FROM (SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as DepositAmount, (SELECT COALESCE(SUM(tax_amt),0)+COALESCE(SUM(payin_charges),0)+COALESCE(SUM(our_bank_charge),0)+ COALESCE(SUM(rolling_reverse_amount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as DepositCharges, (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as PayoutAmount, (SELECT COALESCE(SUM(bank_charges),0)+COALESCE(SUM(akonto_charge),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as PayoutCharges, (SELECT COALESCE(SUM(requestedAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementAmount, (SELECT COALESCE(SUM(charges),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND MONTH(created_on) = ? AND YEAR(created_on) = ?) as SettlementCharges, 0 as OtherCharges) as x";

                let result5 = await mysqlcon(sql5,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year]);
                let result6 = await mysqlcon(sql6,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year]);
                let result7 = await mysqlcon(sql7,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year]);
                let result8 = await mysqlcon(sql8,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year]);
                let result9 = await mysqlcon(sql9,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year]);
                let result10 = await mysqlcon(sql10,[curr[i],user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year,user.id,curr[i],month,year]);

                

                // dbc = [];
                // let rbc = [];
                // let cbc = [];
                // let pbc = [];
                // let sbc = [];
                // let ccc = [];


                dbc.push(result5[0]);
                rbc.push(result6[0]);
                cbc.push(result7[0]);
                pbc.push(result8[0]);
                sbc.push(result9[0]);
                ccc.push(result10[0]);


            }
            return res.json(200,{
                data:{
                message:`Finnacial Statement for ${months} - ${(year)}`,
                
                    deposits:result1,
                    payouts:result2,
                    settlements:result3,
                    cac:result4,
                    dbc,
                    rbc,
                    cbc,
                    pbc,
                    sbc,
                    ccc
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message: "error occurered",
            error: error
        })    
    }

}