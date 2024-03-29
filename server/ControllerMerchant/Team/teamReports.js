const mysqlcon = require("../../config/db_connection");

module.exports.accountTeamSummary = async function (req, res) {
    const {parent_id}=req.user;
    const { from, to } = req.body;
    let value = Number(req.body.value);
    try {
    let sql1 = "SELECT * FROM tbl_merchant_transaction WHERE user_id=?"
    let sql2 = "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE users_id=?"
    let sql3 = "SELECT * FROM tbl_settlement WHERE user_id=?"
    if (from) {
        sql1 += " AND DATE(created_on) >= '" + from + "'"
        sql2 += " AND DATE(created_on) >= '" + from + "'"
        sql3 += " AND DATE(created_on) >= '" + from + "'"
        if (to) {
            sql1 += " AND DATE(created_on) <= '" + to + "'"
            sql2 += " AND DATE(created_on) <= '" + to + "'"
            sql3 += " AND DATE(created_on) <= '" + to + "'"
        }
    }

    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id=?";
    const testResult = await mysqlcon(test, [parent_id]);
    const currencies = [];
    if (testResult.length > 0) {
        const countryList = testResult[0].solution_apply_for_country.split(',');
        for (const country of countryList) {
            const test1 = "SELECT id, sortname,name FROM countries WHERE id = ? ORDER BY name";
            const test1Result = await mysqlcon(test1, [country]);
            currencies.push({ countries: test1Result[0].name, text: test1Result[0].sortname });
        }
    }
    
    function ord_num(item) {
        if (item.new_trx === 1) {
            return item.txn_id
        }
        else {
            return item.order_no
        }
    }
   
        // Account Summary
        switch (value) {
            case 1: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let result2 = await mysqlcon(sql2,[parent_id]);
                let result3 = await mysqlcon(sql3,[parent_id]);

                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created_on': item.created_on,
                    'Updated_On': item.updated_on
                }))
                depositSummary.push(
                    {
                        
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Currency',
                        'Order Number': 'Total Transection',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': 'Refund Amount',
                        'Payin Charge': 'Total Chargeback',
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    }
                )
                for (x in currencies) {
                    depositSummary.push({
                        'Sr': currencies[x].text,
                        'Order Number': result1.filter((item) => item.ammount_type === currencies[x].text).length,
                        'Transaction ID': result1.filter((item) => item.ammount_type === currencies[x].text).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': result1.filter((item) => item.ammount_type === currencies[x].text).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'Amount': result1.filter((item) => item.ammount_type === currencies[x].text).reduce((total, current) => { if (current.status === 4) { return total += Number(current.ammount) } else return total }, 0),
                        'Payin Charge': result1.filter((item) => item.ammount_type === currencies[x].text).reduce((total, current) => { if (current.status === 5) { return total += Number(current.ammount) } else return total }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    })
                   
                }
                depositSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': 'Payout Summary',
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Sr',
                        'Order Number': 'Transaction Number',
                        'Transaction ID': 'UTR Number',
                        'Card Number': 'Trx_type',
                        'Amount': 'Amount',
                        'Payin Charge': 'Payout Charge',
                        'GST': 'GST',
                        'Currency': 'Currency',
                        'Country': 'Country',
                        'Created_on': 'Created On',
                        'Updated_on': 'Updated On '
                    },
                )
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    
                    'Country': item.country,
                    'Created_on': item.created_on,
                    'Updated_on':item.updated_on
                }))
                payoutSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Currency',
                        'Order Number': 'Total Transaction',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                )
                for (x in currencies) {
                    payoutSummary.push({
                        'Sr': currencies[x].text,
                        'Order Number': result2.filter((item) => item.currency === currencies[x].text).length,
                        'Transaction ID': result2.filter((item) => item.currency === currencies[x].text).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Card Number': result2.filter((item) => item.currency === currencies[x].text).reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // //'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    })
                }
                payoutSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': 'Settlement Summary',
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Sr',
                        'Order Number': 'Settlement ID',
                        'Transaction ID': 'From Currency',
                        'Card Number': 'Settlement Request',
                        'Amount': 'Charge',
                        'Payin Charge': 'To Currency',
                        'GST': 'Amount Recieved',
                        'Currency': 'Settlement Type',
                        'Created_on': 'Created On',
                        'Updated_on': 'Updated On'
                    }
                )
                let settlementSummary = result3.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.settlementId,
                    'Transaction ID': item.fromCurrency,
                    'Card Number': item.requestedAmount,
                    'Amount': item.charges,
                    'Payin Charge': item.toCurrency,
                    'GST': item.settlementAmount,
                    'Currency': item.settlementType,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                settlementSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Settlement Type',
                        'Order Number': 'Total Transaction',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Total Fiat',
                        'Order Number': result3.filter((item) => item.settlementType === 'FIAT').length,
                        'Transaction ID': result3.filter((item) => item.settlementType === 'FIAT').reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                        'Card Number': result3.filter((item) => item.settlementType === 'FIAT').reduce((total, current) => { return total += Number(current.charges) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': 'Total Crypto',
                        'Order Number': result3.filter((item) => item.settlementType === 'CRYPTO').length,
                        'Transaction ID': result3.filter((item) => item.settlementType === 'CRYPTO').reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                        'Card Number': result3.filter((item) => item.settlementType === 'CRYPTO').reduce((total, current) => { return total += Number(current.charges) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                )
                const data = [...depositSummary, ...payoutSummary, ...settlementSummary]


                return res.status(200).json({
                    status: true,
                    message: "Account Summary Data - ",
                    data: data
                });
            }
            // Payment Type Summary
            case 2: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                data.push({
                    'Sr': ' ',
                    'Order Number': ' ',
                    'Transaction ID': ' ',
                    'Card Number': ' ',
                    'Amount': ' ',
                    'Payin Charge': ' ',
                    'GST': ' ',
                    // 'Currency': ' ',
                    // 'Method': ' ',
                    // 'Country': ' ',
                    // 'Created_on': ' ',
                    // 'Updated_on': ' '
                },
                    {
                        'Sr': ' ',
                        'Order Number': 'Total UPI',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'UPI').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': ' ',
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'UPI').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': ' ',
                        // 'Currency': ' ',
                        // 'Method': ' ',
                        // 'Country': ' ',
                        // 'Created On': ' ',
                        // 'Updated On': ' '
                    },
                    {
                        'Sr': ' ',
                        'Order Number': 'Total NetBanking',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'NETBANKING').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': ' ',
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'NETBANKING').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': ' ',
                        // 'Currency': ' ',
                        // 'Method': ' ',
                        // 'Country': ' ',
                        // 'Created On': ' ',
                        // 'Updated On': ' '
                    },
                    {
                        'Sr': ' ',
                        'Order Number': 'Total Wallet',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'Wallet').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': ' ',
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'Wallet').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': ' ',
                        // 'Currency': ' ',
                        // 'Method': ' ',
                        // 'Country': ' ',
                        // 'Created On': ' ',
                        // 'Updated On': ' '
                    },
                    {
                        'Sr': ' ',
                        'Order Number': 'Total Debit Card',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'DEBIT CARD').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': ' ',
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'DEBIT CARD').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': ' ',
                        // 'Currency': ' ',
                        // 'Method': ' ',
                        // 'Country': ' ',
                        // 'Created On': ' ',
                        // 'Updated On': ' '
                    },
                    {
                        'Sr': ' ',
                        'Order Number': 'Total Credit Card',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'CREDIT CARD').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': ' ',
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'CREDIT CARD').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': ' ',
                        // 'Currency': ' ',
                        // 'Method': ' ',
                        // 'Country': ' ',
                        // 'Created On': ' ',
                        // 'Updated On': ' '
                    },
                );

//                 const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('My Sheet');

//   // Add the column headings to the worksheet
//   worksheet.columns = [
//     { header: 'SR', key: 'index + 1', width: 10 },
//     { header: 'Order Number', key: 'ord_num(item)', width: 32 },
//     { header: 'Transaction ID', key: 'item.transaction_id', width: 40 },
//     { header: 'Card Number', key: 'item.card_4_4', width: 10 },
//     { header: 'Amount', key: 'item.ammount', width: 32 },
//     { header: 'Payin Charge', key: 'item.payin_charges', width: 40 },
//     { header: 'GST', key: 'item.gst_charges', width: 10 },
//     { header: 'Currency', key: 'item.ammount_type', width: 32 },
//     { header: 'Method', key: 'item.payment_type', width: 40 },
//     { header: 'Country', key: 'item.i_country', width: 10 },
//     { header: 'Created On', key: 'item.created_on', width: 32 },
//     { header: 'Updated On', key: 'item.updated_on', width: 40 }
//   ];
//    let counter = 1;
//   // Add the records to the worksheet
//   result1.forEach((sql1) => {
//  sql1.SR = counter
//     worksheet.addRow(sql1);
//     counter++;
//   });

//                 res.setHeader(
//                     // status: true,
//                     "content-Type",
//                     "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
//                 );
//                 res.setHeader("Content-Disposition",`attachment; filename=report.xlsx`)
//                 return workbook.xlsx.write(res).then(() => {
//                     res.status(200);
//                     message:"hello";

//                 })
            }
            // Payout Type Summary
            case 3: {

                let result2 = await mysqlcon(sql2,[parent_id]);

                let data = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Merchant ID': item.uniqueid,
                    'UTR No/Ref ID': item.utrnumber,
                    'Account Number': item.creditacc,
                    'Bank Name': item.bank_name,
                    'Amount': item.amount,
                    'Payout Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    'Method': item.trx_type,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                data.push(
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': null,
                        'Bank Name': null,
                        'Amount': null,
                        'Payout Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total IMPS',
                        'Bank Name': result2.filter((item) => item.trx_type === 'IMPS').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'IMPS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        // 'GST': null,
                        // 'Currency': null,
                        // 'Method': null,
                        // 'Created_on': null,
                        // 'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total NEFT',
                        'Bank Name': result2.filter((item) => item.trx_type === 'NEFT').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'NEFT').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        // 'GST': null,
                        // 'Currency': null,
                        // 'Method': null,
                        // 'Created_on': null,
                        // 'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total RTGS',
                        'Bank Name': result2.filter((item) => item.trx_type === 'RTGS').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'RTGS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        // 'GST': null,
                        // 'Currency': null,
                        // 'Method': null,
                        // 'Created_on': null,
                        // 'Updated_on': null
                    }
                )

                return res.status(200).json({
                    status: true,
                    message: "Payout Type Summary Data",
                    data: data
                });

            }
            // Currency & Geolocation Summary
            case 4: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let result2 = await mysqlcon(sql2,[parent_id]);
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_currency,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                depositSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Country',
                        'Transaction ID': 'Total Count',
                        'Card Number': 'Total Amount',
                        'Amount': 'Commission',
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    }
                )
                for (x in currencies) {
                    depositSummary.push({
                        'Sr': null,
                        'Order Number': currencies[x].countries,
                        'Transaction ID': result1.filter((item) => item.i_country === currencies[x].countries).length,
                        'Card Number': result1.filter((item) => item.i_country === currencies[x].countries).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Amount': result1.filter((item) => item.i_country === currencies[x].countries).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        // 'Payin Charge': null,
                        // 'GST': null,
                        // 'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        // 'Created_on': null,
                        // 'Updated_on': null
                    })
                }
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    // 'Card Number': null,
                    'Amount': null,
                    // 'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    // 'Card Number': null,
                    'Amount': null,
                    'Payin Charge': "Payout Summary",
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    // 'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Trx_type',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    // 'Method': 'Method',
                    'Country': 'Country',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on'
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    // 'Method': ,
                    'Country': item.country,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    // 'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    // 'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': 'Commission',
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                })
                for (x in currencies) {
                    payoutSummary.push({
                        'Sr': null,
                        'Order Number': currencies[x].countries,
                        'Transaction ID': result2.filter((item) => item.country === currencies[x].countries).length,
                        'Card Number': result2.filter((item) => item.country === currencies[x].countries).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Amount': result2.filter((item) => item.country === currencies[x].countries).reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'Payin Charge': null,
                        // 'GST': null,
                        // 'Currency': null,
                        // 'Method': null,
                        // 'Country': null,
                        // 'Created On': null,
                        // 'Updated On': null
                    })
                }
                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Currency & Geolocation Summary",
                    data: data
                });
            }
            // Transactions
            case 5: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let result2 = await mysqlcon(sql2,[parent_id]);
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                })
                for (x in currencies) {
                    depositSummary.push({
                        'Sr': null,
                        'Order Number': currencies[x].countries,
                        'Transaction ID': result1.filter((item) => item.currency === currencies[x].countries).length,
                        'Card Number': result1.filter((item) => item.currency === currencies[x].countries).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created_on': null,
                        'Updated_on': null
                    })
                }
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': 'Payout Summary',
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Trx_type',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    // 'Method': 'Method',
                    'Country': 'Country',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on'
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    // 'Method': ,
                    'Country': item.country,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                })
                for (x in currencies) {
                    payoutSummary.push({
                        'Sr': null,
                        'Order Number': currencies[x].countries,
                        'Transaction ID': result1.filter((item) => item.currency === currencies[x].countries).length,
                        'Card Number': result1.filter((item) => item.currency === currencies[x].countries).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Amount': null,
                        // 'Payin Charge': null,
                        // 'GST': null,
                        // 'Currency': null,
                        // //  
                        // 'Country': null,
                        // 'Created_on': null,
                        // 'Updated_on': null
                    })
                }
                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Transactions Summary",
                    data: data
                });
            }
            // Dispute Reports
            case 6: {
                sql1 += " AND status = 5"
                let result1 = await mysqlcon(sql1,[parent_id]);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Merchant No': item.mer_no,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Merchant No': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Merchant No': null,
                    'Card Number': 'Total chargeback Amount',
                    'Amount': result1.reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Country': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Dispute Summary Data",
                    data: data
                });
            }
            // Transaction Status Summary
            case 7: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let result2 = await mysqlcon(sql2,[parent_id]);
                function sta_tus(item) {
                    if (item.status === 0) { return 'Failed' }
                    else if (item.status === 1) { return 'Success' }
                    else if (item.status === 2) { return 'Waiting' }
                    else if (item.status === 3) { return 'Pending' }
                    else if (item.status === 4) { return 'Refund' }
                    else if (item.status === 5) { return 'Chargeback' }
                }
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Status': sta_tus(item),
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Status',
                    'Card Number': "Total Count",
                    'Amount': 'Total Amount',
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Success',
                    'Card Number': result1.filter((item) => item.status === 1).length,
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Failed',
                    'Card Number': result1.filter((item) => item.status === 0).length,
                    'Amount': result1.filter((item) => item.status === 0).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Pending',
                    'Card Number': result1.filter((item) => item.status === 3).length,
                    'Amount': result1.filter((item) => item.status === 3).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Refund',
                    'Card Number': result1.filter((item) => item.status === 4).length,
                    'Amount': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Chargeback',
                    'Card Number': result1.filter((item) => item.status === 5).length,
                    'Amount': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Waiting',
                    'Card Number': result1.filter((item) => item.status === 2).length,
                    'Amount': result1.filter((item) => item.status === 2).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': 'Payout Summary',
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Trx_type',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    // 'Method': ,
                    'Status': 'Status',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on'
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    // 'Method': 
                    'Status': item.status,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created On': null,
                    // 'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Status',
                    'Card Number': "Total Count",
                    'Amount': 'Total Amount',
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created On': null,
                    // 'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Success',
                    'Card Number': result2.filter((item) => item.status === 'SUCCESS').length,
                    'Amount': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created On': null,
                    // 'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Failed',
                    'Card Number': result2.filter((item) => item.status === 'FAILED').length,
                    'Amount': result2.filter((item) => item.status === 'FAILED').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created On': null,
                    // 'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Pending',
                    'Card Number': result2.filter((item) => item.status === 'PENDING').length,
                    'Amount': result2.filter((item) => item.status === 'PENDING').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created On': null,
                    // 'Updated On': null
                })

                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Transaction Status Summary",
                    data: data
                });
            }
            // Refund Transactions
            case 8: {
                sql1 += " AND status = 4 ";
                let result1 = await mysqlcon(sql1,[parent_id]);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Status': 'Refund',
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Total Count',
                    'Card Number': result1.length,
                    'Amount': 'Total Refund',
                    'Payin Charge': result1.reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Status': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Refund Transactions Data",
                    data: data
                });
            }
            // Card Brand Summary
            case 9: {
                sql1 += " AND payment_type!= 'CASH' AND payment_type!= 'Wallet' AND payment_type!= 'UPI' AND payment_type!= 'NetBanking' "
                let result1 = await mysqlcon(sql1,[parent_id]);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Created_on': null,
                    'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': 'Total Debit Card',
                    'Amount': result1.filter((item) => item.payment_type === 'DEBIT CARD').length,
                    'Payin Charge': null,
                    'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': 'Total Credit Card',
                    'Amount': result1.filter((item) => item.payment_type === 'CREDIT CARD').length,
                    // 'Payin Charge': null,
                    // 'GST': null,
                    // 'Currency': null,
                    // 'Method': null,
                    // 'Created_on': null,
                    // 'Updated_on': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data",
                    data: data
                });

            }
            // Commission & Charges
            case 10: {
                let result1 = await mysqlcon(sql1,[parent_id]);
                let result2 = await mysqlcon(sql2,[parent_id]);
                let result3 = await mysqlcon(sql3,[parent_id]);
                let depositSummary = result1.filter((item) => item.status === 1).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Total Deposit',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created_on': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Refund',
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payin Charge',
                    'GST': 'GST',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on',
                })
                let refundSummary = result1.filter((item) => item.status === 4).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                refundSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Total Refund',
                    'Amount': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created_on': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Chargeback',
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payin Charge',
                    'GST': 'GST',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on',
                })
                let chargebackSummary = result1.filter((item) => item.status === 5).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                chargebackSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Total Chargeback',
                    'Amount': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created_on': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Payout',
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on',
                })
                let payoutSummary = result2.filter((item) => item.status === 'SUCCESS').map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Total Payout',
                    'Amount': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created_on': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Settlement',
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Requested Amount',
                    'Payin Charge': 'Commission',
                    'GST': 'Settled Amount',
                    'Created_on': 'Created_on',
                    'Updated_on': 'Updated_on',
                })
                let settlementSummary = result3.filter((item) => item.status === 1).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.requestedAmount,
                    'Payin Charge': item.charges,
                    'GST': item.settlementAmount,
                    'Created_on': item.created_on,
                    'Updated_on': item.updated_on
                }))
                settlementSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': 'Total Settlement',
                    'Amount': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created_on': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Total Amount & Charges',
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created_on': null,
                    'Updated_on': null,
                }, {
                    'Sr': null,
                    'Amount': 'Deposit',
                    'Payin Charge': 'Payout',
                    'GST': 'Settlement',
                    'Created_on': 'Refund',
                    'Updated_on': 'Chargeback',
                    '': 'Total Amount'
                }, {
                    'Sr': 'Amount',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'GST': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                    'Created_on': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Updated_on': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    '': result1.filter((item) => item.status === 1 || item.status === 4 || item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0) + result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0) + result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0)
                }, {
                    'Sr': 'Commission',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Payin Charge': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                    'GST': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                    'Created_on': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated_on': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    '': result1.filter((item) => item.status === 1 || item.status === 4 || item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0) + result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0) + result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                })
                const data = [...depositSummary, ...refundSummary, ...chargebackSummary, ...payoutSummary, ...settlementSummary]

                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data",
                    data: data
                });
            }
            default: {
                res.status(400).json({ status: false, message: 'Provide a value .', data: [] });
            }
        }
    
    }
    catch (Error) {
        console.log(Error)
        res.status(500).json({ status: false, message: 'Error to complete task.', Error });
    }
    finally {
        console.log("Execution completed.");
    }
}

