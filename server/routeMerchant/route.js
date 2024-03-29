const loginController = require("../ControllerMerchant/loginController.js");
const dashbordController = require("../ControllerMerchant/dashbordController");
const payoutController = require("../ControllerMerchant/payoutController");
const depositsController = require("../ControllerMerchant/deposits_controller");
const settlementController = require("../ControllerMerchant/settlementController");
const teamsController = require("../ControllerMerchant/teamsController");
const statementController = require("../ControllerMerchant/statementController");
const reportsController = require("../ControllerMerchant/reportsController");
const invoiceController = require("../ControllerMerchant/invoiceController");
const changePassController = require("../ControllerMerchant/changePassController");
const BusinesSetting = require("../ControllerMerchant/businesSetting");
const SubmerchantDetails = require ("../ControllerMerchant/SubmerchantDetails");
const merchantRefundController = require ("../ControllerMerchant/refund");
const helpdefaultController = require("../ControllerMerchant/help")
const merchantNotifications = require("../ControllerMerchant/merchantNotification")
const WalletLogsController = require("../ControllerMerchant/wallet")
const testDepositsController = require("../ControllerMerchant/TestModule/sandboxDeposits")
const testPayoutsController = require("../ControllerMerchant/TestModule/sandboxPayout")
const SinglePayout = require("../ControllerMerchant/singlePayout")
const authMiddleware = require('../middleware/authMiddleware')
const route = require("express").Router();
const path = require("path");
const multer = require("multer");

// Team Routes
const TeamDashboard = require("../ControllerMerchant/Team/teamDashboard")
const TeamDeposits = require("../ControllerMerchant/Team/teamDeposits")
const TeamPayouts = require("../ControllerMerchant/Team/teamPayouts")
const TeamSinglePayout = require("../ControllerMerchant/Team/teamSinglePayout")
const TeamLocalSettle = require("../ControllerMerchant/Team/teamSettlement")
const TeamReports = require("../ControllerMerchant/Team/teamReports")
const TeamModController = require("../ControllerMerchant/Team/teamMod")
const TeamWallets = require("../ControllerMerchant/Team/teamWallet")

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images"));
//   },
//   filename: function (req, file, cb) {
//     let imgname = file.originalname;
//     // let imgname = new Date().toString();
//     imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
//     let imgext = path.extname(file.originalname);
//     let image = `${imgname}${imgext}`;
//     cb(null, image);
//   },
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/documents"));
  },
  filename: function (req, file, cb) {
    let imgname = file.originalname;
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.basename(imgname);
    let image = `${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });
const username = require("../helper/username");
const dashboardCount = require("../ControllerMerchant/dashbordController");
const subMerchant = require("../ControllerMerchant/subMerchant.js");
// const email_validate = require("../helper/email-validation");

const views = path.join(__dirname, "../views/");

// routes
route.get("/", (req, res) => {
  console.log(views);
  res.sendFile(views + "index.html");
});

route.post("/register", uploads.none(), loginController.register);
route.post(
  "/save-company-profile",
  uploads.none(),
  authMiddleware,
  loginController.company_profile
);

route.post(
  "/save_shareholder_info",
  uploads.none(),
  authMiddleware,
  loginController.save_shareholder_info
);
route.post(
  "/save_business_info",
  uploads.none(),
  authMiddleware,
  loginController.save_business_info
);
route.post(
  "/save_settelment_info",
  uploads.none(),
  authMiddleware,
  loginController.save_settelment_info
);

route.post("/login-merchant", uploads.none(), loginController.login);

// country of incorporation
route.post(
  "/country-list",
  uploads.none(),
  authMiddleware,
  loginController.get_countries
);
route.post(
  "/solution-apply",
  uploads.none(),
  authMiddleware,
  loginController.get_solution_apply
);
route.post(
  "/save-country-solution-apply",
  uploads.none(),
  authMiddleware,
  loginController.save_country_solution_apply
);
route.post(
  "/save-director-info",
  uploads.none(),
  authMiddleware,
  loginController.save_director_info
);

route.post("/qusAns", uploads.none(), authMiddleware, loginController.qusAns);
route.post("/tokenMail", uploads.none(), loginController.tokenMail);
route.post("/forgotPassword", uploads.none(), loginController.forgotPassword);

// dashboard controller

route.post(
  "/top_transaction_today",
  uploads.none(),
  authMiddleware,
  dashbordController.top_transaction_today
);

route.post(
  "/card_data",
  uploads.none(),
  authMiddleware,
  dashbordController.card_data
);

route.post(
  "/success_rate",
  uploads.none(),
  authMiddleware,
  dashbordController.success_rate
);
route.post(
  "/payment_type",
  uploads.none(),
  authMiddleware,
  dashbordController.payment_type
);
route.post(
  "/daily_sale_count_icon",
  uploads.none(),
  authMiddleware,
  dashbordController.daily_sale_count_icon
);
route.post(
  "/payout_icon",
  uploads.none(),
  authMiddleware,
  dashbordController.payout_icon
);
route.post(
  "/monthly_transaction",
  uploads.none(),
  authMiddleware,
  dashbordController.monthly_transaction
);
route.post(
  "/weekly_transaction",
  uploads.none(),
  authMiddleware,
  dashbordController.weekly_transaction
);
route.post(
  "/dbycurrency",
  uploads.none(),
  authMiddleware,
  dashbordController.dbycurrency
);

//deposits controller

// route.post(
//   "/show_all",
//   uploads.none(),
//   authMiddleware,
//   depositsController.defaultOrder
// );

route.post(
  "/downloadapi",
  uploads.none(),
  authMiddleware,
  depositsController.downloadapi
);

route.post(
  "/statusResult",
  uploads.none(),
  authMiddleware,
  depositsController.statusResult
);
route.post(
  "/searchDateFilter",
  uploads.none(),
  authMiddleware,
  depositsController.searchDateFilter
);

route.post(
  "/merchantChoosedCurrency",
  uploads.none(),
  authMiddleware,
  depositsController.merchantChoosedCurrency
);

// Payout Router

route.post("/filter", uploads.none(), authMiddleware, payoutController.filter);
route.post("/downloadReport", uploads.none(), authMiddleware, payoutController.downloadReport);
route.post(
  "/payoutheader",
  uploads.none(),
  authMiddleware,
  payoutController.payoutheader
);

// Settlement ___________________+++**&&*(())

route.post(
  "/settlemetnt_Trans",
  uploads.none(),
  authMiddleware,
  settlementController.settlemetnt_Trans
);

// route.post(
//   "/defaultSettlement",
//   uploads.none(),
//   authMiddleware,
//   settlementController.defaultSettlement
// );

route.post(
  "/requestSettlement",
  uploads.none(),
  authMiddleware,
  settlementController.requestSettlement
);

route.post(
  "/downloadReportsc",
  uploads.none(),
  authMiddleware,
  settlementController.downloadReportsc
);

route.post(
  "/localsettlemetnt_Trans",
  uploads.none(),
  authMiddleware,
  settlementController.localsettlemetnt_Trans
);

route.post(
  "/localrequestSettlement",
  uploads.none(),
  authMiddleware,
  settlementController.localrequestSettlement
);

route.post(
  "/localcardDetails",
  uploads.none(),
  authMiddleware,
  settlementController.localcardDetails
);

route.post(
  "/localdownloadReportsc",
  uploads.none(),
  authMiddleware,
  settlementController.localdownloadReportsc
);

route.post(
  "/exchangeRate",
  uploads.none(),
  authMiddleware,
  settlementController.exchangeRate
);

route.post(
  "/userWallet",
  uploads.none(),
  authMiddleware,
  settlementController.userWallet
);

route.post(
  "/cardDetails",
  uploads.none(),
  authMiddleware,
  settlementController.cardDetails
);


route.post(
  "/statement",
  uploads.none(),
  authMiddleware,
  statementController.statement
);

// teams controller ==============================
route.post("/default", uploads.none(), authMiddleware, teamsController.default);
route.post("/getTeamDetails", uploads.none(), authMiddleware, teamsController.getTeamDetails);
route.post("/teamEditDetails", uploads.none(), authMiddleware, teamsController.teamEditDetails);
route.post("/deleteTeam", uploads.none(), authMiddleware, teamsController.deleteTeam);
route.post("/verifyTeam", uploads.none(), authMiddleware, teamsController.verifyTeam);
route.post(
  "/createEmployee",
  uploads.none(),
  authMiddleware,
  teamsController.createEmployee
  );
module.exports = route;

// invoice
route.post(
  "/invoice",
  uploads.none(),
  authMiddleware,
  invoiceController.allInvoice
);
route.post(
  "/new_invoice",
  uploads.none(),
  authMiddleware,
  invoiceController.new_invoice
);

route.post(
  "/downloadInvoice",
  uploads.none(),
  authMiddleware,
  invoiceController.downloadInvoice
);

// Reports Controller
// route.post(
//   "/reports",
//   uploads.none(),
//   authMiddleware,
//   reportsController.reports
// );
route.post(
  "/changePassword-merchant",
  uploads.none(),
  authMiddleware,
  changePassController.changePassword
);


// reports abhineet
route.post(
  "/accountSummary",
  uploads.none(),
  authMiddleware,
  reportsController.accountSummary
);
route.post(
  "/defaultBusinesSettingData",
  uploads.none(),
  authMiddleware,
  BusinesSetting.default
);
route.post(
  "/toggleQNA",
  uploads.none(),
  authMiddleware,
  BusinesSetting.toggleQNA
);
route.post(
  "/blockToggle",
  uploads.none(),
  authMiddleware,
  BusinesSetting.blockToggle
);
route.post(
  "/BusnissDownload",
  authMiddleware,
  BusinesSetting.download
);
route.post(
  "/showHideKey",
  authMiddleware,
  BusinesSetting.showHideKey
);
route.post(
  "/blockCoustomer",
  authMiddleware,
  BusinesSetting.blockCoustomer
);
route.post(
  "/uploadDocument",
  authMiddleware,
  uploads.fields([{
    'name':'image' , 'maxCount':1
  },{
    'name':'image1', 'maxCount':1
  },{
    'name':'image2', 'maxCount':1
  },{
    'name':'image3' , 'maxCount':1
  }
  ]),
  BusinesSetting.uploadDocument
);
route.post(
  "/kycdetails",
  authMiddleware,
  BusinesSetting.kycdetails
);

route.post('/subMerchant',authMiddleware,subMerchant.subMerchant)
route.post('/createMerchant',authMiddleware,subMerchant.createMerchant)
route.post('/getIdSubmerchant',uploads.none(),authMiddleware,subMerchant.getIdSubmerchant)




route.post('/details',uploads.none(),authMiddleware,SubmerchantDetails.details)

route.post("/Kyc",uploads.fields([{
  'name':'image' , 'maxCount':1
},{
  'name':'image1', 'maxCount':1
},{
  'name':'image2', 'maxCount':1
},{
  'name':'image3' , 'maxCount':1
}
]),loginController.Kyc);


route.post('/merchantRefund', uploads.none(), authMiddleware, merchantRefundController.merchantRefund)


route.post('/helpdefault',authMiddleware,helpdefaultController.help_defaults);
route.post('/help_view',authMiddleware,helpdefaultController.help_view);
route.post('/generateTicket',uploads.single('images'),authMiddleware,helpdefaultController.generateTicket);

route.post("/UploadImage",uploads.single('images'),helpdefaultController.UploadImage)


route.post("/merchantNotificationBell",authMiddleware,merchantNotifications.merchantNotificationBell)
route.post("/toggleNotification",authMiddleware,merchantNotifications.toggleNotification)
route.post("/merchantNotification",authMiddleware,merchantNotifications.merchantNotification)


// Wallet logs
route.post("/merchantWalletLogs",authMiddleware,WalletLogsController.merchantWalletLogs)
route.post("/walletLogsDownload",authMiddleware,WalletLogsController.walletLogsDownload)





// Test Module Routes

route.post("/downloadSandboxDepositsapi",authMiddleware,testDepositsController.downloadSandboxDepositsapi)
route.post("/statusSandboxDepositsResult",authMiddleware,testDepositsController.statusSandboxDepositsResult)
route.post("/searchSandboxDepositsDateFilter",authMiddleware,testDepositsController.searchSandboxDepositsDateFilter)


route.post("/sandboxPayoutsDefault",authMiddleware,testPayoutsController.sandboxPayoutsDefault)
route.post("/sandboxPayoutheader",authMiddleware,testPayoutsController.sandboxPayoutheader)
route.post("/downloadSandboxPayoutReport",authMiddleware,testPayoutsController.downloadSandboxPayoutReport)


route.post("/singlePayoutCurrency",authMiddleware,SinglePayout.singlePayoutCurrency)
route.post("/singlePayoutBankcodes",authMiddleware,SinglePayout.singlePayoutBankcodes)
route.post("/singlePayoutCreate",authMiddleware,SinglePayout.singlePayoutCreate)


// --------------------------------------TEAM ROUTES STARTS--------------------------------------------- //

// DASHBOARD STARTS //

route.post("/team_card_data",authMiddleware,TeamDashboard.team_card_data)
route.post("/team_success_rate",authMiddleware,TeamDashboard.team_success_rate)
route.post("/team_top_transaction_today",authMiddleware,TeamDashboard.team_top_transaction_today)
route.post("/team_payout_icon",authMiddleware,TeamDashboard.team_payout_icon)
route.post("/team_daily_sale_count_icon",authMiddleware,TeamDashboard.team_daily_sale_count_icon)
route.post("/team_monthly_transaction",authMiddleware,TeamDashboard.team_monthly_transaction)
route.post("/team_weekly_transaction",authMiddleware,TeamDashboard.team_weekly_transaction)
route.post("/team_payment_type",authMiddleware,TeamDashboard.team_payment_type)
route.post("/team_dbycurrency",authMiddleware,TeamDashboard.team_dbycurrency)

// DASHBOARD ENDS //

// DEPOSITS START //

route.post("/teamDownloadapi",authMiddleware,TeamDeposits.teamDownloadapi)
route.post("/teamStatusResult",authMiddleware,TeamDeposits.teamStatusResult)
route.post("/teamSearchDateFilter",authMiddleware,TeamDeposits.teamSearchDateFilter)
route.post("/teamMerchantChoosedCurrency",authMiddleware,TeamDeposits.teamMerchantChoosedCurrency)

// DEPOSITS ENDS //

// PAYOUTS STARTS //
route.post("/teamFilter",authMiddleware,TeamPayouts.teamFilter)
route.post("/teamPayoutCard",authMiddleware,TeamPayouts.teamPayoutCard)
route.post("/teamDownloadReport",authMiddleware,TeamPayouts.teamDownloadReport)

// PAYOUTS ENDS //

// SINGLE PAYOUT STARTS //

route.post("/teamSinglePayoutCurrency",authMiddleware,TeamSinglePayout.teamSinglePayoutCurrency)
route.post("/teamSinglePayoutBankcodes",authMiddleware,TeamSinglePayout.teamSinglePayoutBankcodes)
route.post("/teamSinglePayoutCreate",authMiddleware,TeamSinglePayout.teamSinglePayoutCreate)

// SINGLE PAYOUT ENDS //

// SETTLEMENT STARTS //

// Local //
route.post("/teamLocalSettlement",authMiddleware,TeamLocalSettle.teamLocalSettlement)
route.post("/localTeamCardDetails",authMiddleware,TeamLocalSettle.localTeamCardDetails)
route.post("/localTeamRequestSettlement",authMiddleware,TeamLocalSettle.localTeamRequestSettlement)
route.post("/localTeamDownloadReportsc",authMiddleware,TeamLocalSettle.localTeamDownloadReportsc)

// Common API //
route.post("/userTeamWallet",authMiddleware,TeamLocalSettle.userTeamWallet)

// International //
route.post("/teamInternationalSettlement",authMiddleware,TeamLocalSettle.teamInternationalSettlement)
route.post("/teamInternationalCardDetails",authMiddleware,TeamLocalSettle.teamInternationalCardDetails)
route.post("/requestInternationalSettlement",authMiddleware,TeamLocalSettle.requestInternationalSettlement)
route.post("/teamDownloadReportsc",authMiddleware,TeamLocalSettle.teamDownloadReportsc)

// SETTLEMENT ENDS //

// REPORTS STARTS //

route.post("/accountTeamSummary", authMiddleware, TeamReports.accountTeamSummary)

// REPORTS ENDS //

// TEAM MOD STARTS //

route.post("/teamDefault", authMiddleware, TeamModController.teamDefault)
route.post("/getTeam", authMiddleware, TeamModController.getTeam)
route.post("/teamCreateEmployee", authMiddleware, TeamModController.teamCreateEmployee)
route.post("/teamEdit", authMiddleware, TeamModController.teamEdit)
route.post("/teamDeleteTeam", authMiddleware, TeamModController.teamDeleteTeam)
route.post("/teamVerifyTeam", authMiddleware, TeamModController.teamVerifyTeam)

// TEAM MOD ENDS //

//  TEAM Wallets //

route.post("/teammerchantWalletLogs", authMiddleware, TeamWallets.teammerchantWalletLogs)
route.post("/teamwalletLogsDownload", authMiddleware, TeamWallets.teamwalletLogsDownload)
