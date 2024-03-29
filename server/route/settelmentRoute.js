// 🤓 HELPERS  FUNCTIONS🤓
const helper = require("../helper/jwt");
const settelmentRoute = require('express').Router()
// 🤓 HELPERS FUNCTIONS END🤓
const BankDeposit = require("../Controller/SettlementController/bankDeposit");
const LocalPayouts = require("../Controller/SettlementController/localPayouts");
const AddFund = require("../Controller/SettlementController/addFund");
const LocalSettlement = require("../Controller/SettlementController/localSettlement");
const InternationalSettlement = require("../Controller/SettlementController/internationalSettlement");
const disputesChargeback = require("../Controller/SettlementController/disputesChargeback");
const Refunds = require("../Controller/SettlementController/refunds");
const Commissions = require("../Controller/SettlementController/commissions");

// ABHHINEET START
const amountreqController = require("../Controller/SettlementController/Dashboard/amountreqController");
const localSettlementController = require("../Controller/SettlementController/Dashboard/localSettlementController");
const InternationalSettlementController = require("../Controller/SettlementController/Dashboard/InternationalSettlementController");
const commissionController = require("../Controller/SettlementController/Dashboard/commissionController");
const dashboardTableController = require("../Controller/SettlementController/Dashboard/dahsboardTable");
// ABHHINEET END

const settelmentReport = require("../Controller/SettlementController/reportsettlement");

// CREATING ROUTERS 🤓

//1-> READ API--->
settelmentRoute.post('/api/settelment/bankDeposit', helper.verify, BankDeposit.default)
settelmentRoute.post('/bankDepositsCards',helper.verify,BankDeposit.bankDepositsCards)
settelmentRoute.post('/api/settelment/localPayouts', helper.verify, LocalPayouts.default)
settelmentRoute.post('/localPayoutsCards', helper.verify, LocalPayouts.localPayoutsCards)
settelmentRoute.post('/downloadLocalPayouts', helper.verify, LocalPayouts.downloadLocalPayouts)
settelmentRoute.post('/api/settelment/addFundRead', helper.verify, AddFund.default)
settelmentRoute.post('/api/settelment/localSettlement',helper.verify,LocalSettlement.default)
settelmentRoute.post('/api/settelment/settlementCards',helper.verify,LocalSettlement.settlementCards)
settelmentRoute.post('/api/settelment/internationalSettlement',helper.verify,InternationalSettlement.default)
settelmentRoute.post('/requestInternational',helper.verify,InternationalSettlement.requestInternational)
settelmentRoute.post('/editInternational',helper.verify,InternationalSettlement.editInternational)
settelmentRoute.post('/toggleInternationalStatus',helper.verify,InternationalSettlement.toggleInternationalStatus)
settelmentRoute.post('/api/settelment/internationalCards',helper.verify,InternationalSettlement.internationalCards)
settelmentRoute.post('/api/settelment/disputesChargeback',helper.verify,disputesChargeback.default)
settelmentRoute.post('/DisputesChargebackCardData',helper.verify,disputesChargeback.DisputesChargebackCardData)
settelmentRoute.post('/createDisputes',helper.verify,disputesChargeback.createDisputes)
settelmentRoute.post('/updateDisputes',helper.verify,disputesChargeback.updateDisputes)
settelmentRoute.post('/downloadDisputeChargeback',helper.verify,disputesChargeback.downloadDisputeChargeback)
settelmentRoute.post('/getDisputeDetails',helper.verify,disputesChargeback.getDisputeDetails)
settelmentRoute.post('/getTrxData',helper.verify,disputesChargeback.getTrxData)
settelmentRoute.post('/api/settelment/refunds',helper.verify,Refunds.default)
settelmentRoute.post('/refundCardData',helper.verify,Refunds.refundCardData)
settelmentRoute.post('/newRefund',helper.verify,Refunds.newRefund)
settelmentRoute.post('/updateRefund',helper.verify,Refunds.updateRefund)
settelmentRoute.post('/settlementRefundDownload',helper.verify,Refunds.settlementRefundDownload)
settelmentRoute.post('/getRefundDetails',helper.verify,Refunds.getRefundDetails)
settelmentRoute.post('/getRefundData',helper.verify,Refunds.getRefundData)
settelmentRoute.post('/api/settelment/commissions',helper.verify,Commissions.default)

// 2-> CREATE AND UPDATE API --->
settelmentRoute.post('/api/settelment/bankDeposit/createAndUpdate',helper.verify,BankDeposit.createAndUpdate)
settelmentRoute.post('/api/settelment/addFunds/merAndCurr',helper.verify,AddFund.curMer)
settelmentRoute.post('/api/settelment/addFunds/preBal',helper.verify,AddFund.murAndCurSelect)
settelmentRoute.post('/api/settelment/addFunds/addFund',helper.verify,AddFund.addFund)
settelmentRoute.post('/api/settelment/addFunds/updateFund',helper.verify,AddFund.updateFund)







// ABHHINEET START
settelmentRoute.post('/yesterday', helper.verify, amountreqController.yesterday);
settelmentRoute.post('/weekly', helper.verify, amountreqController.weekly);
settelmentRoute.post('/monthly', helper.verify, amountreqController.monthly);
settelmentRoute.post('/yearly', helper.verify, amountreqController.yearly);

settelmentRoute.post('/yesterdaySettlement', helper.verify, localSettlementController.yesterdaySettlement);
settelmentRoute.post('/weeklySettlement', helper.verify, localSettlementController.weeklySettlement);
settelmentRoute.post('/monthlySettlement', helper.verify, localSettlementController.monthlySettlement);
settelmentRoute.post('/yearlySettlement', helper.verify, localSettlementController.yearlySettlement);

settelmentRoute.post('/yesterdayInternational', helper.verify, InternationalSettlementController.yesterdayInternational);
settelmentRoute.post('/weeklyInternational', helper.verify, InternationalSettlementController.weeklyInternational);
settelmentRoute.post('/monthlyInternational', helper.verify, InternationalSettlementController.monthlyInternational);
settelmentRoute.post('/yearlyInternational', helper.verify, InternationalSettlementController.yearlyInternational);

settelmentRoute.post('/yesterdayCommissions', helper.verify, commissionController.yesterdayCommissions);
settelmentRoute.post('/weeklyCommissions', helper.verify, commissionController.weeklyCommissions);
settelmentRoute.post('/monthlyCommissions', helper.verify, commissionController.monthlyCommissions);
settelmentRoute.post('/yearlyCommissions', helper.verify, commissionController.yearlyCommissions);

settelmentRoute.post('/dashboardTable', helper.verify, dashboardTableController.dashboardTable);
// ABHHINEET END

settelmentRoute.post('/reportSettlement',helper.verify,settelmentReport.reportSettlement)


// Hemant
settelmentRoute.post('/userSettlementWallet',helper.verify,LocalSettlement.userSettlementWallet)
settelmentRoute.post('/userExchangeRate',helper.verify,LocalSettlement.userExchangeRate)
settelmentRoute.post('/defaultDownload', helper.verify, LocalSettlement.defaultDownload);
settelmentRoute.post('/requestLocalSettlement', helper.verify, LocalSettlement.requestLocalSettlement);
settelmentRoute.post('/editLocalSettlement', helper.verify, LocalSettlement.editLocalSettlement);
settelmentRoute.post('/toggleSettlementStatus', helper.verify, LocalSettlement.toggleSettlementStatus);
settelmentRoute.post('/getLocalData', helper.verify, LocalSettlement.getLocalData);

module.exports = settelmentRoute