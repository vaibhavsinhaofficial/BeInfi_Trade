const subAdminController = require("../Controller/subAdminController");
const midController = require("../Controller/midController");
const loginController = require("../Controller/loginController");
const bankCodeAkontoController = require("../Controller/bankCodeAkontoController");
const bankCodeController = require("../Controller/bankCodeController");
const contactController = require("../Controller/contactController");
const siteSettingController = require("../Controller/settingController/siteSettingController");
const currencyController = require("../Controller/settingController/currencyController");
const exchangeController = require("../Controller/settingController/exchangeController");
const allUpiController = require("../Controller/SettingController/allUpiController");
const merchantAdminController = require("../Controller/merchantAdminController");
const changePasswordController = require("../Controller/changePassController");
const bannerController = require("../Controller/SettingController/banner");
const cmsController = require("../Controller/SettingController/cms");
const metaController = require("../Controller/SettingController/meta");
const ipwhitelistController = require("../Controller/SettingController/ipwhitelist");
const limitController = require("../Controller/SettingController/limit");
const cronController = require("../Controller/SettingController/cron");
const newCurrencyController = require("../Controller/SettingController/currency");
const countriesController = require("../Controller/SettingController/countries");
const netProfitController = require("../Controller/SettingController/netProfit");
const merchantSwapController = require("../Controller/SettingController/merchantSwaping")
// SATBIR CODE 
const paymentGatewayController = require("../Controller/paymentController");
const chineseController = require("../Controller/chineseController");
const transactionMTController = require("../Controller/transactionMTController");
const transactionMRController = require("../Controller/transactionMRController");
const transactionMEODController = require("../Controller/transactionMEODController");
const transactionPMController = require("../Controller/transactionPMController");
const settlementController = require("../Controller/settlementController");
// END SATBIR CODE


//Dashboard Controller
const dashboard_cardDataController=require("../Controller/dashboardController")
const pieGraph_cardDataController=require("../Controller/dashboardController")
const currency_DataController=require("../Controller/dashboardController")
const vendorsController=require("../Controller/dashboardController")
const typeController=require("../Controller/dashboardController")

//End Dashboard controller

const sandboxDepositsController = require("../Controller/sandboxDepositsController");
const sandboxPayoutController = require("../Controller/sandboxPayoutController");

const submerchantController = require("../Controller/submerchantController");


const route = require("express").Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    let imgname = new Date().toString();
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.extname(file.originalname);
    let image = `${imgname}${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });
const helper = require("../helper/jwt");
const activityLogs = require("../Controller/activityLogs");
// Login Controller
route.post("/login", uploads.none(),loginController.login);
route.post("/modulePesmission", uploads.none(),loginController.modulePesmission);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌

//Dashborad Route
route.post('/dasboard_cardData',helper.verify,dashboard_cardDataController.dashboard_cardData)
route.post('/currency_data',helper.verify,currency_DataController.currency_data)
route.post('/piegraph_data',helper.verify,pieGraph_cardDataController.piegraph_data)
route.post('/top_vendors',helper.verify,vendorsController.vendorsData)
route.post('/getType',helper.verify,typeController.getTypeDetails)

//Mid Controller 
route.post("/readMid", uploads.none(), helper.verify, midController.readMid);
route.post("/updateMid", uploads.none(), helper.verify, midController.updateMid);
route.post("/deleteMid", uploads.none(), helper.verify, midController.deleteMid);
route.post("/createMid", uploads.none(), helper.verify, midController.createMid);
route.post("/readUpdateMid", uploads.none(), helper.verify, midController.readUpdateMid);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//BankCode Akonto Controller 
route.post("/readBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.readBankCodeAkonto);
route.post("/updateBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.updateBankCodeAkonto);
route.post("/deleteBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.deleteBankCodeAkonto);
route.post("/createBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.createBankCodeAkonto);
route.post("/readUpdateBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.readUpdateBankCodeAkonto);
route.post("/toggleBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.toggleBankCodeAkonto);
route.post("/currencySelect", uploads.none(), helper.verify, bankCodeAkontoController.currencySelect);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//BankCode  Controller 
route.post("/readBankCode", uploads.none(), helper.verify, bankCodeController.readBankCode);
route.post("/updateBankCode", uploads.none(), helper.verify, bankCodeController.updateBankCode);
route.post("/deleteBankCode", uploads.none(), helper.verify, bankCodeController.deleteBankCode);
route.post("/createBankCode", uploads.none(), helper.verify, bankCodeController.createBankCode);
route.post("/readUpdateBankCode", uploads.none(), helper.verify, bankCodeController.readUpdateBankCode);
route.post("/toggleBankCode", uploads.none(), helper.verify, bankCodeController.toggleBankCode);
route.post("/readType1BankCode", uploads.none(), helper.verify, bankCodeController.readType1BankCode);
route.post("/readType2BankCode", uploads.none(), helper.verify, bankCodeController.readType2BankCode);
route.post("/merchantSelect", uploads.none(), helper.verify, bankCodeController.merchantSelect);
route.post("/merchantData", uploads.none(), helper.verify, bankCodeController.merchantData);
route.post("/toggleMerchantBankCodes", uploads.none(), helper.verify, bankCodeController.toggleMerchantBankCodes);
// route.post("/deleteMerchantBankCode", uploads.none(), helper.verify, bankCodeController.deleteMerchantBankCode);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Contact Controller
route.post("/contact", uploads.none(), helper.verify, contactController.Contact);
route.post("/deleteContact", uploads.none(), helper.verify, contactController.deleteContact);
route.post("/readContact", uploads.none(), helper.verify, contactController.readContact);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Merchant Admin Controller
route.post("/merchantAdmin", uploads.none(), helper.verify, merchantAdminController.merchantAdmin);
route.post("/updateSelectKey", uploads.none(), helper.verify, merchantAdminController.updateSelectKey);
route.post("/deleteMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.deleteMerchantAdmin);
route.post("/readOneMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.readOneMerchantAdmin);
route.post("/updateWallet", uploads.none(), helper.verify, merchantAdminController.updateWallet);
route.post("/updateSandboxWallet", uploads.none(), helper.verify, merchantAdminController.updateSandboxWallet);
route.post("/createMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.createMerchantAdmin);
route.post("/verifyProfile", uploads.none(), helper.verify, merchantAdminController.verifyProfile);
route.post("/completeProfile", uploads.none(), helper.verify, merchantAdminController.completeProfile);
route.post("/sendMail", uploads.none(), helper.verify, merchantAdminController.sendMail);
route.post("/assignPayinGateway", uploads.none(), helper.verify, merchantAdminController.assignPayinGateway);
route.post("/assignPayoutGateway", uploads.none(), helper.verify, merchantAdminController.assignPayoutGateway);
route.post("/payinGateway", uploads.none(), helper.verify, merchantAdminController.payinGateway);
route.post("/payoutGateway", uploads.none(), helper.verify, merchantAdminController.payoutGateway);
route.post("/setPaymentMethod", uploads.none(), helper.verify, merchantAdminController.setPaymentMethod);
route.post("/updateMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.updateMerchantAdmin);
route.post("/updateMerchantCharges", uploads.none(), helper.verify, merchantAdminController.updateMerchantCharges);
route.post("/addBanks", uploads.none(), helper.verify, merchantAdminController.addBanks);
route.post("/merchantCurrency", uploads.none(), helper.verify, merchantAdminController.merchantCurrency);
// route.post("/payoutdefault", uploads.none(), helper.verify, merchantAdminController.payoutdefault);

// INR Switching
route.post("/default_inr", uploads.none(), helper.verify, merchantAdminController.default_inr);
route.post("/default_inr_netbankingEwallet", uploads.none(), helper.verify, merchantAdminController.default_inr_netbankingEwallet);
route.post("/update_inrInsert_inr", uploads.none(), helper.verify, merchantAdminController.update_inrInsert_inr);
route.post("/default_bankUbankconnect", uploads.none(), helper.verify, merchantAdminController.default_bankUbankconnect);
route.post("/updateInsert_bankUbank_inr", uploads.none(), helper.verify, merchantAdminController.updateInsert_bankUbank_inr);

route.post("/defautlSwitchingData", uploads.none(), helper.verify, merchantAdminController.defautlSwitchingData);

// NON INR Switching
route.post("/NonINR", uploads.none(), helper.verify, merchantAdminController.NonINR);
route.post("/NonINRUpdate", uploads.none(), helper.verify, merchantAdminController.NonINRUpdate);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌


// Sandbox Deposits
route.post("/defaultSandboxDeposits", uploads.none(), helper.verify, sandboxDepositsController.defaultSandboxDeposits);
route.post("/downloadSandboxDeposits", uploads.none(), helper.verify, sandboxDepositsController.downloadSandboxDeposits);
route.post("/depositsSandboxCards", uploads.none(), helper.verify, sandboxDepositsController.depositsSandboxCards);
route.post("/changeSandboxDepositStatus", uploads.none(), helper.verify, sandboxDepositsController.changeSandboxDepositStatus);
// Sandbox Deposits

// Sandbox Payout
route.post("/defaultSandboxPayout", uploads.none(), helper.verify, sandboxPayoutController.defaultSandboxPayout);
route.post("/toggleSandboxPayout", uploads.none(), helper.verify, sandboxPayoutController.toggleSandboxPayout);
route.post("/downloadSandboxPayout", uploads.none(), helper.verify, sandboxPayoutController.downloadSandboxPayout);
route.post("/sandboxPayoutCards", uploads.none(), helper.verify, sandboxPayoutController.sandboxPayoutCards);
// Sandbox Payout

// SubMerchant
route.post("/defaultSubmerchant", uploads.none(), helper.verify, submerchantController.defaultSubmerchant);
route.post("/createSubmerchant", uploads.none(), helper.verify, submerchantController.createSubmerchant);
route.post("/readOneSubmerchant", uploads.none(), helper.verify, submerchantController.readOneSubmerchant);
route.post("/editSubmerchant", uploads.none(), helper.verify, submerchantController.editSubmerchant);
// SubMerchant


//Site Setting Controller
route.post("/siteSetting", uploads.none(), helper.verify, siteSettingController.siteSetting);
route.post("/updateSiteSetting", uploads.none(), helper.verify, siteSettingController.updateSiteSetting);
// Currency Setting  
route.post("/defaultCurrency", uploads.none(), helper.verify, currencyController.defaultCurrency);
route.post("/deleteCurrency", uploads.none(), helper.verify, currencyController.deleteCurrency);
route.post("/createCurrency", uploads.none(), helper.verify, currencyController.createCurrency);
route.post("/readOneCurrency", uploads.none(), helper.verify, currencyController.readOneCurrency);
route.post("/updateCurrency", uploads.none(), helper.verify, currencyController.updateCurrency);
// Exchange Setting Controller
route.post("/defaultExchange", uploads.none(), helper.verify, exchangeController.defaultExchange);
route.post("/deleteExchange", uploads.none(), helper.verify, exchangeController.deleteExchange);
route.post("/createExchange", uploads.none(), helper.verify, exchangeController.createExchange);
route.post("/readOneExchange", uploads.none(), helper.verify, exchangeController.readOneExchange);
route.post("/updateExchange", uploads.none(), helper.verify, exchangeController.updateExchange);
// AllUpi Setting Controller
route.post("/defaultAllUpi", uploads.none(), helper.verify, allUpiController.defaultAllUpi);
route.post("/createAllUpi", uploads.none(), helper.verify, allUpiController.createAllUpi);
route.post("/toggleUpi", uploads.none(), helper.verify, allUpiController.toggleUpi);
route.post("/readUpi", uploads.none(), helper.verify, allUpiController.readUpi);
route.post("/update_upi", uploads.none(), helper.verify, allUpiController.update_upi);
route.post("/delete_upi", uploads.none(), helper.verify, allUpiController.delete_upi);

// Banner Setting Controller
route.post("/defaultBanner", uploads.none(), helper.verify, bannerController.defaultBanner);
route.post("/createBanner", uploads.none(), helper.verify, bannerController.createBanner);

// CMS Setting Controller
route.post("/defaultCMS", uploads.none(), helper.verify, cmsController.defaultCMS);
route.post("/viewCMS", uploads.none(), helper.verify, cmsController.viewCMS);
route.post("/readOneCMS", uploads.none(), helper.verify, cmsController.readOneCMS);
route.post("/updateCMS", uploads.none(), helper.verify, cmsController.updateCMS);

// Meta Controller
route.post("/defaultMeta", uploads.none(), helper.verify, metaController.defaultMeta);
route.post("/updateMeta", uploads.none(), helper.verify, metaController.updateMeta);
route.post("/readOneMeta", uploads.none(), helper.verify, metaController.readOneMeta);

// IP Whitelist Controller
route.post("/defaultIPWhitelist", uploads.none(), helper.verify, ipwhitelistController.defaultIPWhitelist);
route.post("/allGateway", uploads.none(), helper.verify, ipwhitelistController.allGateway);
route.post("/createIPWhitelist", uploads.none(), helper.verify, ipwhitelistController.createIPWhitelist);
route.post("/toggleIP", uploads.none(), helper.verify, ipwhitelistController.toggleIP);
route.post("/readOneIP", uploads.none(), helper.verify, ipwhitelistController.readOneIP);
route.post("/editIP", uploads.none(), helper.verify, ipwhitelistController.editIP);
// route.post("/defaultWhitelistIPmodule", uploads.none(), helper.verify, ipwhitelistController.defaultWhitelistIPmodule);

// Set Limit Module
// route.post("/defaultLimit", uploads.none(), helper.verify, limitController.defaultLimit);
route.post("/defaultSetLimitmodule", uploads.none(), helper.verify, limitController.defaultSetLimitmodule);
route.post("/toggleLimit", uploads.none(), helper.verify, limitController.toggleLimit);
route.post("/createLimit", uploads.none(), helper.verify, limitController.createLimit);
route.post("/readOneLimit", uploads.none(), helper.verify, limitController.readOneLimit);
route.post("/editLimit", uploads.none(), helper.verify, limitController.editLimit);

route.post("/allCurrency", uploads.none(), helper.verify, limitController.allCurrency);

// Cron Setup
route.post("/defaultCron", uploads.none(), helper.verify, cronController.defaultCron);
route.post("/toggleCron", uploads.none(), helper.verify, cronController.toggleCron);
route.post("/toggleSwitch", uploads.none(), helper.verify, cronController.toggleSwitch);
route.post("/toggleON", uploads.none(), helper.verify, cronController.toggleON);
route.post("/updateAdditional", uploads.none(), helper.verify, cronController.updateAdditional);
route.post("/readOneCron", uploads.none(), helper.verify, cronController.readOneCron);

route.post("/SetLimit_SetLimitmodule", uploads.none(), helper.verify, cronController.SetLimit_SetLimitmodule);

// Currency Module
route.post("/defaultNewCurrency", uploads.none(), helper.verify, newCurrencyController.defaultNewCurrency);
route.post("/toggleCurrency", uploads.none(), helper.verify, newCurrencyController.toggleCurrency);
route.post("/addCurrency", uploads.none(), helper.verify, newCurrencyController.addCurrency);
route.post("/deleteNewCurrency", uploads.none(), helper.verify, newCurrencyController.deleteNewCurrency);

// Countries Module
route.post("/defaultCountries", uploads.none(), helper.verify, countriesController.defaultCountries);
route.post("/deleteCountry", uploads.none(), helper.verify, countriesController.deleteCountry);
route.post("/addCountry", uploads.none(), helper.verify, countriesController.addCountry);

// Net Profit
route.post("/defaultProfit", uploads.none(), helper.verify, netProfitController.defaultProfit);

// Merchant Swap
route.post("/defaultSwap", uploads.none(), helper.verify, merchantSwapController.defaultSwap);
route.post("/deleteSwap", uploads.none(), helper.verify, merchantSwapController.deleteSwap);
route.post("/toggleSwap", uploads.none(), helper.verify, merchantSwapController.toggleSwap);
route.post("/selectBankCode", uploads.none(), helper.verify, merchantSwapController.selectBankCode);
route.post("/getSwapDetails", uploads.none(), helper.verify, merchantSwapController.getSwapDetails);
route.post("/updateMerchantSwapGateway", uploads.none(), helper.verify, merchantSwapController.updateMerchantSwapGateway);
route.post("/createMerchantSwap", uploads.none(), helper.verify, merchantSwapController.createMerchantSwap);

//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
// Change Password Controller
route.post("/changePassword", uploads.none(), helper.verify, changePasswordController.changePassword);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
route.post("/AdminLogs", uploads.none(), helper.verify, activityLogs.adminLogs);
route.post("/merchantLogs", uploads.none(), helper.verify, activityLogs.merchantLogs);
route.post("/walletLogs", uploads.none(), helper.verify, activityLogs.walletLogs);
route.post("/walletexport", uploads.none(), helper.verify, activityLogs.walletexport);
route.post("/currencyRateLogs", uploads.none(), helper.verify, activityLogs.currencyRateLogs);
route.post("/allowPaymentsLogs", uploads.none(), helper.verify, activityLogs.allowPaymentsLogs);
route.post("/filterAdmin", uploads.none(), helper.verify, activityLogs.filterAdmin);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌


// 😎😎😎😎😎😎😎😎😎😎😎😎SATBIR API START😎😎😎😎😎😎😎😎😎😎😎😎😎
// SubAdmin Module
route.post('/subAdmin',uploads.none(),subAdminController.subAdmin);
route.post('/toggleSubAdmin',uploads.none(),subAdminController.toggleSubAdmin);
route.post('/deleteSubAdmin',uploads.none(),subAdminController.deleteSubAdmin);
route.post('/permissionSubAdmin',uploads.none(),subAdminController.permissionSubAdmin);
route.post('/createSubAdmin',uploads.none(),subAdminController.createSubAdmin);
route.post('/getRole',uploads.none(),subAdminController.getRole);
route.post('/getPermissionDetails',uploads.none(),subAdminController.getPermissionDetails);
route.post('/getViewSubAdmin',uploads.none(),subAdminController.getViewSubAdmin);
route.post('/updateSubAdmin',uploads.none(),subAdminController.updateSubAdmin);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
//Payment Gateway
route.post('/paymentGateway',uploads.none(),paymentGatewayController.paymentGateway);
route.post('/getId',uploads.none(),paymentGatewayController.getId);
route.post('/edit',uploads.none(),paymentGatewayController.edit);
route.post('/create',uploads.none(),paymentGatewayController.create);
route.post('/delete',uploads.none(),paymentGatewayController.delete);
route.post('/togglePayment',uploads.none(),paymentGatewayController.togglePayment);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚

// Chinese Controller
route.post('/defaultChinese',uploads.none(),chineseController.defaultChinese);
route.post('/getIdChinese',uploads.none(),chineseController.getIdChinese);
route.post('/editChinese',uploads.none(),chineseController.editChinese);
route.post('/deleteChinese',uploads.none(),chineseController.deleteChinese);
route.post('/createChinese',uploads.none(),chineseController.createChinese);
route.post('/toggleChinese',uploads.none(),chineseController.toggleChinese);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
//Transaction Controller😎

// Merchant Transaction----1
route.post('/defaultMT',uploads.none(),transactionMTController.defaultMT);
route.post('/getIdMT',uploads.none(),transactionMTController.getIdMT);
route.post('/toggleStatusMT',uploads.none(),transactionMTController.toggleStatusMT);
route.post('/createMT',uploads.none(),transactionMTController.createMT);
route.post('/getCurrencyMT',uploads.none(),transactionMTController.getCurrencyMT);
route.post('/exportMT',uploads.none(),transactionMTController.exportMT);
route.post('/depositsCards',uploads.none(),transactionMTController.depositsCards);
route.post('/cronMerchantLogs',uploads.none(),transactionMTController.cronMerchantLogs);
route.post('/statusApi',uploads.none(),transactionMTController.statusApi);

// End Of Day------2
route.post('/defaultMEOD',uploads.none(),transactionMEODController.defaultMEOD);
route.post('/toggleStatusMEOD',uploads.none(),transactionMEODController.toggleStatusMEOD);
// Merchant Refund---3
route.post('/defaultMR',uploads.none(),transactionMRController.defaultMR);
route.post('/downloadAdminRefund',uploads.none(),transactionMRController.downloadAdminRefund);
// Payout Merchant---4
route.post('/defaultPM',uploads.none(),transactionPMController.defaultPM);
route.post('/toggleStatusPM',uploads.none(),transactionPMController.toggleStatusPM);
route.post('/createPM',uploads.none(),transactionPMController.createPM);
route.post('/getCurrency',uploads.none(),transactionPMController.getCurrency);
route.post('/exportPayouts',uploads.none(),transactionPMController.exportPayouts);
route.post('/payoutCards',uploads.none(),transactionPMController.payoutCards);

// ************************************* ALL MERCHABT ************************************

route.post('/allMerchant',uploads.none(),transactionMTController.allMerchant);

// ************************************* END ALL MERCHANT ********************************

// defaultSettlement
route.post('/defaultSettlement',uploads.none(),helper.verify,settlementController.defaultSettlement);
route.post('/toggleSettlement',uploads.none(),helper.verify,settlementController.toggleSettlement);
route.post('/createSettlement',uploads.none(),helper.verify,settlementController.createSettlement);
route.post('/detailSettlement',uploads.none(),helper.verify,settlementController.detailSettlement);
route.post('/updateSettlement',uploads.none(),settlementController.updateSettlement);
route.post('/getById',uploads.none(),settlementController.getById);



//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚


module.exports = route;

