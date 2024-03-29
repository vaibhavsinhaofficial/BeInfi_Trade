const bankpayRoute = require('express').Router()

const bpay = require("../ControllerBankpay/bankPay")
const Test = require("../ControllerBankpay/test");
const bankpay = require("../ControllerBankpay/newBankPay")
const bigcatCheckout = require("../ControllerBankpay/bigcatpay")
const help = require("../helper/homemodel")
const help2payController = require("../ControllerBankpay/help2pay")

const inrBankPay = require("../ControllerBankpay/inrBankPay")

const hemantTestController = require("../ControllerBankpay/hemantTest")

bankpayRoute.get('/form',(req,res)=>{
    res.render("form")
})
bankpayRoute.get('/checkOut', (req, res) => {
    res.render("checkOut")
})

bankpayRoute.post("/bankconnectPaymentSubmit",bpay.bankconnectPaymentSubmit);
bankpayRoute.post("/newBankPayment",bankpay.newBankPayment);
bankpayRoute.post("/getMerchantGate",bankpay.getMerchantGate);


bankpayRoute.post("/hemantTest",hemantTestController.hemantTest);
bankpayRoute.post("/hemantTest1",hemantTestController.hemantTest1);
bankpayRoute.post("/payment",hemantTestController.payment);


// INR BankPay
bankpayRoute.post("/BankPaymentInr",inrBankPay.BankPaymentInr);
bankpayRoute.post("/currency",inrBankPay.currency);
bankpayRoute.post("/state",inrBankPay.state);
bankpayRoute.post("/getMerchantGateeeeee",inrBankPay.getMerchantGateeeeee);
bankpayRoute.post("/crickpayTransRes",inrBankPay.crickpayTransRes);

// Pay Planet
bankpayRoute.post("/payPlanetCreate",inrBankPay.payPlanetCreate);


// BigCat PAy
bankpayRoute.post("/bigcatChekout", bigcatCheckout.bigcatChekout);
bankpayRoute.post("/bigcatStatus", bigcatCheckout.bigcatStatus);
bankpayRoute.post("/bigcatToken", bigcatCheckout.bigcatToken);
bankpayRoute.post("/bigcatResponse", bigcatCheckout.bigcatResponse)

bankpayRoute.post("/bigcatPayDepositeStatus", help.bigcatPayDepositeStatus)

bankpayRoute.post("/help2Pay", help2payController.help2Pay)
bankpayRoute.post("/callbackHelp", help2payController.callbackHelp)


// bankpayRoute.post("/key2payDeposites",Test.key2payDeposites)
bankpayRoute.post("/getMerchantPayinCharges",Test.getMerchantPayinCharges)
module.exports = bankpayRoute