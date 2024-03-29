import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useStateContext } from "../../context/ContextProvider";
import Login from "../Login/Login";
import Sidebar from "../../componentsAdmin/Sidebar/Sidebar";
import Dashboard from "../../componentsAdmin/Dashboard/Dashboard";
import Error from '../PAGE404/Error'
//Api Helper
import baseUrl from "../../componentsAdmin/config/baseUrl";
import axios from "axios";
// MID Module
import Mid from "../../componentsAdmin/Mid/Mid";
// Bankcode Akonto Module
import BankCodeAkonto from "../../componentsAdmin/BankCodeAkonto/BankCodeAkonto";
// Bankcode Module
import PayinBankCodes from "../../componentsAdmin/BankCode/BankCode";
import PayoutBankCodes from "../../componentsAdmin/BankCode/PayoutBankCodes";
// Contact Module
import Contact from "../../componentsAdmin/contact/Contact";
import ReadContact from "../../componentsAdmin/contact/ReadContact";
// Marchant Module
import MerchantAdmin from "../../componentsAdmin/MerchantAdmin/MerchantAdmin";
// Change Password Module
import ChangePassword from "../../componentsAdmin/ChangePassword/ChangePassword";
// Site Setting Module
import SiteSetting from "../../componentsAdmin/Setting/siteSetting/SiteSetting";
import EditSiteSetting from "../../componentsAdmin/Setting/siteSetting/EditSiteSetting";
import CurrencyRate from "../../componentsAdmin/Setting/currency/CurrencyRate";
import Exchange from "../../componentsAdmin/Setting/Exchange/Exchange";
import AllUpi from "../../componentsAdmin/Setting/AllUpi/AllUpi";
// SUB ADMIN MODULE
import SubAdmin from "../../componentsAdmin/SubAdminModule/SubAdmin";
import SubAdminPermission from "../../componentsAdmin/SubAdminModule/SubAdminPermission";
// PG MODULE
import PGMod from "../../componentsAdmin/Payment/PGMod";
// Chines Module
import Chinese from "../../componentsAdmin/ChineseModule/Chinese";
import NewChinese from "../../componentsAdmin/ChineseModule/NewChinese";
import EditBank from "../../componentsAdmin/ChineseModule/EditBank";
// Transaction Module
import MerchantTrans from "../../componentsAdmin/TransactionMod/MerchantTrans/MerchantTrans";
import MerchantRefunds from "../../componentsAdmin/TransactionMod/MerchantRefund/MerchantRefunds";
import EndOfDay from "../../componentsAdmin/TransactionMod/MerchantEnd/EndOfDay";
import PayoutMerchants from "../../componentsAdmin/TransactionMod/MerchantPayout/PayoutMerchants";

// Settlemt Module
import Settlement from "../../componentsAdmin/Settlement/Settlement";
import Common from "../../componentsAdmin/Settlement/Common";
import AdminLogs from "../../componentsAdmin/ActivityLogs/AdminLogs";
import MerchantLogs from "../../componentsAdmin/ActivityLogs/MerchantLogs";
import WalletLogs from "../../componentsAdmin/ActivityLogs/WalletLogs";


//<><><><><><><><><><><><><><><>🤓Settlement Dashboard🤓<><><><><><><><><><><><><><> 

import SettlementSidebar from '../SettlementComp/SIDEBAR/Sidebar'
import SettlementDashboard from '../SettlementComp/Dashboard/Dashboard'
import BankDeposit from "../../componentsAdmin/SettlementComp/BankDeposit/BankDeposit";
import LocalPayouts from "../../componentsAdmin/SettlementComp/LocalPayouts/LocalPayouts";
import AddFunds from "../../componentsAdmin/SettlementComp/AddFunds/AddFunds";
import LocalSettlement from "../../componentsAdmin/SettlementComp/LocalSettlement/LocalSettlement";
import InternationalSettlement from "../../componentsAdmin/SettlementComp/InternationalSettlement/InternationalSettlement";
import DisputesChargebacks from "../../componentsAdmin/SettlementComp/DisputesChargebacks/DisputesChargebacks";
import Refunds from "../../componentsAdmin/SettlementComp/Refunds/Refunds";
// import Commissions from "../../componentsAdmin/SettlementComp/Commissions/Commissions";
import Reports from "../../componentsAdmin/SettlementComp/Reports/Reports";
import Banner from "../../componentsAdmin/Setting/Banner/Banner";
import CMS from "../../componentsAdmin/Setting/CMS/CMS";
import ViewCMS from "../../componentsAdmin/Setting/CMS/ViewCMS";
import Meta from "../../componentsAdmin/Setting/MetaModule/Meta";
import EditMeta from "../../componentsAdmin/Setting/MetaModule/EditMeta";
import IPWhitelist from "../../componentsAdmin/Setting/IPWhitelist/IPWhitelist";
import Limit from "../../componentsAdmin/Setting/SetLimit/Limit";
import Cron from "../../componentsAdmin/Setting/CronSetup/Cron";
import Currency from "../../componentsAdmin/Setting/NewCurrency/Currency";
import Countries from "../../componentsAdmin/Setting/Countries/Countries";
import NewCurrencyAdd from "../../componentsAdmin/Setting/NewCurrency/NewCurrencyAdd";
import NewCountry from "../../componentsAdmin/Setting/Countries/NewCountry";
import NewBanner from "../../componentsAdmin/Setting/Banner/NewBanner";
import EditCMS from "../../componentsAdmin/Setting/CMS/EditCMS";
import SandBoxDeposits from "../../componentsAdmin/SandBox/Deposits/SandBoxDeposits";
import SandBoxPayout from "../../componentsAdmin/SandBox/Payouts/SandboxPayout";
import SubMerchant from "../../componentsAdmin/SubMerchant/SubMerchant";
import NetProfit from "../../componentsAdmin/Setting/NetProfit/NetProfit";
import INR from "../../componentsAdmin/MerchantAdmin/INR";
import UPI from "../../componentsAdmin/MerchantAdmin/INR/UPI";
import Card from "../../componentsAdmin/MerchantAdmin/INR/Card";
import Wallet from "../../componentsAdmin/MerchantAdmin/INR/Wallet";
import NetBanking from "../../componentsAdmin/MerchantAdmin/INR/NetBanking";
import UbankCodes from "../../componentsAdmin/MerchantAdmin/INR/UbankCodes";
import NonInr from "../../componentsAdmin/MerchantAdmin/NonInr";
import CurrencyModeSolution from "../../componentsAdmin/MerchantAdmin/NON_INR/CurrencyModeSolution";
import CurrencyLogs from "../../componentsAdmin/ActivityLogs/CurrencyLogs";
import AllowPaymentLogs from "../../componentsAdmin/ActivityLogs/AllowPaymentLogs";
import MerchantSwap from "../../componentsAdmin/Setting/MerchantSwap/MerchantSwap";
import NeompayAutho from "../../componentsAdmin/Setting/NeompayAutho/NeompayAutho";

// Merchant Dashboard //

import Dashbord from "../../componentsMerchant/DASHBOARD/Dashbord";
import Deposit from "../../componentsMerchant/DEPOSIT/Deposit";
import Virtual from "../../componentsMerchant/VIRTUAlTERMINAL/Virtual";
import MerchantSidebar from "../../componentsMerchant/SIDEBAR/Sidebar";
import Statements from "../../componentsMerchant/STATEMANTS/Statements";
import MerchantReports from "../../componentsMerchant/REPORTS/Reports";
import Teams from "../../componentsMerchant/TEAMS/Team";
import BusinessSetting from "../../componentsMerchant/BUSINESSSETTING/BusinessSetting";
import Integrations from "../../componentsMerchant/INTEGRATIONS/Integrations";
import MerchantChangePassword from "../../componentsMerchant/CHANGEPASSWORD/ChangePass";
import InCompleteProfile from "../../componentsMerchant/SIGNUPANDLOGIN/InCompleteProfile";
import MerchantLogin from "../../componentsMerchant/SIGNUPANDLOGIN/Login";
import SignUp from "../../componentsMerchant/SIGNUPANDLOGIN/SignUp";
import MerchantPayout from "../../componentsMerchant/PAYOUT/Payout";
import MerchantSettlement from "../../componentsMerchant/SETTLEMENT/Settlement";
import Invoice from "../../componentsMerchant/INVOICE/Invoice";
import DownloadRep from "../../componentsMerchant/STATEMANTS/DownloadRep";
import CreateInvoice from '../../componentsMerchant/INVOICE/CreateInvoice'
import DownloadSetting from "../../componentsMerchant/BUSINESSSETTING/DownloadSetting";
import Forget from "../../componentsMerchant/SIGNUPANDLOGIN/Forget";
import SubMerchants from "../../componentsMerchant/SubMerchants/SubMerchants";
import ViewSubmerchant from "../../componentsMerchant/SubMerchants/ViewSubmerchant";
import RequestSettlement from "../../componentsMerchant/SETTLEMENT/RequestSettlement";
import Help from "../../componentsMerchant/Help/Help";
import Refund from "../../componentsMerchant/Refund/Refund";
import AddTicket from "../../componentsMerchant/Help/AddTicket";
import ViewTicket from "../../componentsMerchant/Help/ViewTicket";
import UploadDocument from "../../componentsMerchant/BUSINESSSETTING/UploadDocument";
import MerchantNotifcations from "../../componentsMerchant/Notifications/MerchantNotifcations";
import MerchantInternationalSettlement from "../../componentsMerchant/InternationalSettlement/InternationalSettlement";
import MerchantRequestInternational from "../../componentsMerchant/InternationalSettlement/RequestInternational";
import SandboxDeposit from "../../componentsMerchant/TestModule/Deposits/SandboxDeposit";
import TestDashboard from "../../componentsMerchant/TestModule/Dashboard/TestDashboard";
import SandboxPayouts from "../../componentsMerchant/TestModule/Payouts/SandboxPayouts";
import MerchantWalletLogs from "../../componentsMerchant/WalletLogs/WalletLogs";
import CronData from "../TransactionMod/MerchantTrans/CronData";
import StatusData from "../TransactionMod/MerchantTrans/StatusData";
import NewPassword from "../../componentsMerchant/SIGNUPANDLOGIN/NewPassword";
import SinglePayout from "../../componentsMerchant/SinglePayout/SinglePayout";

// Team Routes
import TeamSidebar from "../../componentsMerchant/TeamConsole/TeamSidebar/TeamSidebar";
import TeamDashboard from "../../componentsMerchant/TeamConsole/TeamDashboard/TeamDashboard";
import TeamSubmerchant from "../../componentsMerchant/TeamConsole/TeamSubmerchant/TeamSubmerchant";
import TeamPayout from "../../componentsMerchant/TeamConsole/TeamPayout/TeamPayout";
import TeamDeposit from "../../componentsMerchant/TeamConsole/TeamDeposit/TeamDeposit";
import TeamSinglePayout from "../../componentsMerchant/TeamConsole/TeamSinglePayout/TeamSinglePayout";
import TeamLocalSettlement from "../../componentsMerchant/TeamConsole/TeamLocalSettlement/TeamLocalSettlement";
import TeamRequestSettlement from "../../componentsMerchant/TeamConsole/TeamLocalSettlement/TeamRequestSettlement";
import TeamInternationalSettlement from "../../componentsMerchant/TeamConsole/TeamInternational/TeamInternationalSettlement";
import RequestTeamInternational from "../../componentsMerchant/TeamConsole/TeamInternational/RequestTeamInternational";
import TeamReports from "../../componentsMerchant/TeamConsole/TeamReports/TeamReports";
import TeamStatements from "../../componentsMerchant/TeamConsole/TeamStatements/TeamStatements";
import TeamMod from "../../componentsMerchant/TeamConsole/TeamMod/TeamMod";
import TeamWallet from "../../componentsMerchant/TeamConsole/TeamWallet/TeamWallet";


// Gateway routes
import ReactForm from "../../Gateway/Form/ReactForm"
import Response from "../../Gateway/Response/Response"
import Help2pay from "../../Gateway/Form/Help2pay"
import Loading from "../../Gateway/LOAD/Loading";
import Gpayment from "../../Gateway/Gpayment/Gpayment";
import PayPlanet from "../../Gateway/Form/PayPlanet";
import Redipay from "../../Gateway/Form/Redipay";


//<><><><><><><><><><><><><><><>🤓Settlement Dashboard End🤓<><><><><><><><><><><><><>
function Routers() {
  const [modulePesmission, setModulePesmission] = useState([]);
  const { isLoginUser,setIsLoginUser,role, setRole, setAccoutType,accoutType } = useStateContext();
  const location = useLocation();
  const reactNavigate = useNavigate()
  useLayoutEffect(() => {
   if(localStorage.getItem('admin')){
      fetchData();
      const { exp } = jwtDecode(localStorage.getItem('admin'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/bankconnect')
        return;
      }
      setIsLoginUser(localStorage.getItem('admin'))
      setRole(localStorage.getItem('role'))
    } else if(localStorage.getItem('user')){
      const { exp } = jwtDecode(localStorage.getItem('user'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/bankconnect/merchant/login-merchant')
        return;
      }
      setIsLoginUser(localStorage.getItem('user')) 
      setAccoutType(localStorage.getItem('accoutType')) 
    }
  }, [location.pathname,isLoginUser,role]);
  
  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("token", isLoginUser);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${isLoginUser}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/modulePesmission`,
        formData,
        config
      );
      if (result.status === 200) {
        setModulePesmission(result.data.permission);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Routes>
      { 
        isLoginUser && role === '-1' ? (
          <Route
            path="/"
            element={<Sidebar modulePesmission={modulePesmission} />}
          >
            <Route path="/bankconnect/Dashboard" element={<Dashboard />} />
            
            {/* Sub Admin */}
              <Route path="/bankconnect/subAdmin"  element={ <SubAdmin authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> }  />
              <Route path="/bankconnect/subAdminPermission/:id" element={<SubAdminPermission />} />
            {/* End Sub Admin */}

            {/* PG Module */}
              <Route path="/bankconnect/PGMod" element={ <PGMod authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End PG Module */}
                        
            {/* MID Module */}        
              <Route path="/bankconnect/Mid" element={ <Mid authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End MID Module */}

            {/* Chinese Module */}
              <Route path="/bankconnect/Chinese" element={ <Chinese authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/bankconnect/NewChinese" element={<NewChinese />} />
              <Route path="/bankconnect/EditBank/:id" element={<EditBank />} />
            {/* End Chinese Module */}
            
            {/* BankCode Akonto Module */}           
              <Route path="/bankconnect/bankcodeakonto" element={ <BankCodeAkonto authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End BankCode Akonto Module */}

            {/* BankCode Module */}
              <Route path="/bankconnect/PayinBankCodes" element={ <PayinBankCodes authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/bankconnect/PayoutBankCodes" element={ <PayoutBankCodes authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End BankCode Module */}

            {/* Merchant Onboarding Module */}      
              <Route  path="/bankconnect/merchantAdmin" element={ <MerchantAdmin authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/bankconnect/INR/:id" element={<INR />} />
              <Route path="/bankconnect/NonInr/:id" element={<NonInr />}  />
              <Route path="/bankconnect/NonInr/:id/CurrencyModeSolution"  element={<CurrencyModeSolution />} />
              <Route path="/bankconnect/INR/:id/UPI" element={<UPI />} />
              <Route path="/bankconnect/INR/:id/Card" element={<Card />} />
              <Route path="/bankconnect/INR/:id/Wallet" element={<Wallet />} />
              <Route path="/bankconnect/INR/:id/NetBanking" element={<NetBanking />} />
              <Route path="/bankconnect/INR/:id/UbankCodes" element={<UbankCodes />} />
            {/* End Merchant Onboarding Module */}

            {/* Deposit Transaction */}
              <Route path="/bankconnect/MerchantTrans" element={ <MerchantTrans authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/bankconnect/MerchantTrans/CronData/:invoice_id" element={<CronData />} />
              <Route path="/bankconnect/MerchantTrans/StatusData/:order_no" element={<StatusData />} />
            {/* End Deposit Transaction */}

            {/* End Of Day Transaction */}
              <Route path="/bankconnect/EndOfDay" element={ <EndOfDay authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> }/>
            {/* End Of Day Transaction */}

            {/* Merchant Refund  */}
              <Route path="/bankconnect/MerchantRefunds" element={ <MerchantRefunds authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End Merchant Refund */}

            {/* SubMerchant Module */}
              <Route path="/bankconnect/SubMerchant" element={<SubMerchant authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End SubMerchant Module */}

            {/* Merchant Payouts */}
              <Route path="/bankconnect/PayoutMerchants" element={ <PayoutMerchants authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End Merchant Payouts */}

            {/* Sandbox Deposit Module */}         
              <Route path="/bankconnect/SandBoxDeposits" element={ <SandBoxDeposits authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End Sandbox Deposit Module */}

            {/* Sandbox Payout Module */}
              <Route path="/bankconnect/SandBoxPayout" element={ <SandBoxPayout authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End Sandbox Payout Module */}
            
            {/* Banner Module */}
              <Route path="/bankconnect/Banner" element={<Banner authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />                        
              <Route path="/bankconnect/NewBanner" element={<NewBanner />} />
            {/* End Banner Module */}  
            
            {/* Local Settlement Module */}
              <Route path="/bankconnect/LocalSettlement" element={<LocalSettlement authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End Local Settlement Module */}

            {/* Add Fund Module */}
              <Route path="/bankconnect/AddFunds" element={<AddFunds authCreate={1} authRead={1} authUpdate={1} authDelete={1}/>} />
            {/* End Add Fund Module */}

            {/* International Settlement Module */}
              <Route path="/bankconnect/InternationalSettlement" element={<InternationalSettlement authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End International Settlement Module */}
            
            {/* Activity Logs Module */}
              <Route path="/bankconnect/AdminLogs" element={<AdminLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/bankconnect/MerchantLogs" element={<MerchantLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/bankconnect/WalletLogs" element={<WalletLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/bankconnect/CurrencyLogs" element={<CurrencyLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/bankconnect/AllowPaymentLogs" element={<AllowPaymentLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End Activity Logs Module */}
                    
            {/* Website Email Module */}       
              <Route path="/bankconnect/contact" element={ <Contact authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/bankconnect/readContact/:id" element={<ReadContact />} />
            {/* End Website Email Module */}
                          
            {/* Setting Module */}
              {/* CMS Module */}
                <Route path="/bankconnect/CMS" element={<CMS authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/bankconnect/EditCMS/:id" element={<EditCMS />} />
                <Route path="/bankconnect/ViewCMS/:id" element={<ViewCMS />} />

              {/* Meta Module */}
                <Route path="/bankconnect/Meta" element={<Meta authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/bankconnect/EditMeta/:meta_id" element={<EditMeta />} />
              
              {/* Site Module */}
                <Route path="/bankconnect/siteSetting" element={ <SiteSetting authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />     
                <Route path="/bankconnect/EditSiteSetting/:id" element={<EditSiteSetting />} />
                          
              {/* Currency Setting */}
                <Route path="/bankconnect/CurrencyRate" element={ <CurrencyRate authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
                          
              {/* Exchange Setting */}
                <Route path="/bankconnect/Exchange" element={ <Exchange authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
                          
              {/* All Upi */}
                <Route path="/bankconnect/AllUpi" element={ <AllUpi authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />

              {/* IP Whitelist */}
                <Route path="/bankconnect/IPWhitelist" element={ <IPWhitelist authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />

              {/* Set Limit */}
                <Route path="/bankconnect/Limit" element={ <Limit authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />

              {/* Cron Setup */}
                <Route path="/bankconnect/Cron"  element={ <Cron authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              
              {/* Net Profit */}
                <Route path="/bankconnect/NetProfit" element={<NetProfit authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              
              {/* Currency */}
                <Route path="/bankconnect/Currency" element={ <Currency authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/bankconnect/NewCurrencyAdd" element={ <NewCurrencyAdd />} />
              
              {/* Countries */}
                <Route path="/bankconnect/Countries" element={ <Countries authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/bankconnect/NewCountry" element={ <NewCountry />} />

              {/* Merchant Swap */}
                <Route path="/bankconnect/MerchantSwap" element={<MerchantSwap authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />

              {/* Neompay Autho */}
                <Route path="/bankconnect/NeompayAutho" element={<NeompayAutho authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />

              {/* Merchant Child */}
                <Route path="/bankconnect/SubMerchant" element={<SubMerchant authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                        
              {/* Change Password Module */}
                  <Route path="/bankconnect/ChangePassword" element={<ChangePassword authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End Setting Module */}
        );
        </Route>      
        ) : isLoginUser && role === "1" ? (
          <Route
            path="/"
            element={<Sidebar modulePesmission={modulePesmission} />}
          >
            <Route path="/bankconnect/Dashboard" element={<Dashboard />} />
            {Object.keys(modulePesmission).length > 0
              ? modulePesmission.map((item, index) => {
                  return (
                    <>
                      {item.module === "Sub Admin Module" &&
                      item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/subAdmin"
                            element={
                              <SubAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />

                          <Route
                            path="/bankconnect/subAdminPermission/:id"
                            element={<SubAdminPermission />}
                          />
                        </>
                      )
                    
                      : item.module === "PG Module" && item.status === 1 ? (
                        <>
                          {/* PG Module */}
                          <Route
                            path="/bankconnect/PGMod"
                            element={
                              <PGMod
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End PG Module */}
                        </>
                      ) : item.module ==="MID Module" && item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/Mid"
                            element={
                              <Mid
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                        </>
                      ) : item.module === "Chinese bank Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Chinese Module */}
                          <Route
                            path="/bankconnect/Chinese"
                            element={
                              <Chinese
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/bankconnect/NewChinese" element={<NewChinese />} />
                          <Route path="/bankconnect/EditBank/:id" element={<EditBank />} />
                        </>
                      ) : item.module === "Bankcode BankConnect Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/bankcodeakonto"
                            element={
                              <BankCodeAkonto
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                        </>
                      ) : item.module === "Bankcode Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/PayinBankCodes"
                            element={
                              <PayinBankCodes
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/bankconnect/PayoutBankCodes"
                            element={
                              <PayoutBankCodes
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                        </>
                      ) : item.module === "Merchant Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/merchantAdmin"
                            element={
                              <MerchantAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/bankconnect/INR/:id"
                            element={<INR />}
                          />
                          <Route
                            path="/bankconnect/NonInr/:id"
                            element={<NonInr />}
                          />
                          <Route
                            path="/bankconnect/NonInr/:id/CurrencyModeSolution"
                            element={<CurrencyModeSolution />}
                          />
                          <Route
                            path="/bankconnect/INR/:id/UPI"
                            element={<UPI />}
                          />
                          <Route
                            path="/bankconnect/INR/:id/Card"
                            element={<Card />}
                          />
                          <Route
                            path="/bankconnect/INR/:id/Wallet"
                            element={<Wallet />}
                          />
                          <Route
                            path="/bankconnect/INR/:id/NetBanking"
                            element={<NetBanking />}
                          />
                          <Route
                            path="/bankconnect/INR/:id/UbankCodes"
                            element={<UbankCodes />}
                          />
                        </>
                      ) : item.module === "Transaction Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Merchant Transaction */}
                          <Route
                            path="/bankconnect/MerchantTrans"
                            element={
                              <MerchantTrans
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />

                          {/* End Merchant Transaction */}

                          {/* End Of Day Transaction */}
                          <Route
                            path="/bankconnect/EndOfDay"
                            element={
                              <EndOfDay
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End Of Day Transaction */}

                          {/* Merchant Refund  */}
                          <Route
                            path="/bankconnect/MerchantRefunds"
                            element={
                              <MerchantRefunds
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End Merchant Refund */}

                          {/* Merchant Payouts */}
                          <Route
                            path="/bankconnect/PayoutMerchants"
                            element={
                              <PayoutMerchants
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End Merchant Payouts */}
                        </>
                      ) : item.module === "SandBox Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/SandBoxDeposits"
                            element={
                              <SandBoxDeposits
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/bankconnect/SandBoxPayout"
                            element={
                              <SandBoxPayout 
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                              />
                            }
                          />
                        </>
                      ) : item.module === "Banner Module" &&
                        item.status === 1 ? (
                        <>
                          <Route path="/bankconnect/Banner" element={<Banner />} />                        
                          <Route path="/bankconnect/NewBanner" element={<NewBanner />} />                        
                        </>
                      ) : item.module === "Settlement Module" &&
                        item.status === 1 ? (
                        <>
                          <Route path="/bankconnect/LocalSettlement" element={
                            <LocalSettlement
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                            />} />
                          <Route path="/bankconnect/InternationalSettlement" element={
                            <InternationalSettlement
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                            />} />
                            <Route path="/bankconnect/AddFunds" element={<AddFunds/>} />
                        </>
                      ) : item.module === "Activity Logs" &&
                        item.status === 1 ? (
                        <>
                        <Route path="/bankconnect/AdminLogs" element={<AdminLogs />} />
                        <Route path="/bankconnect/MerchantLogs" element={<MerchantLogs />} />
                        <Route path="/bankconnect/WalletLogs" element={<WalletLogs />} />
                        <Route path="/bankconnect/CurrencyLogs" element={<CurrencyLogs />} />
                        <Route path="/bankconnect/AllowPaymentLogs" element={<AllowPaymentLogs />} />
                      
                        </>
                      ) : item.module === "Contact Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/contact"
                            element={
                              <Contact
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_view === 1 ? (
                            <Route
                              path="/bankconnect/readContact/:id"
                              element={<ReadContact />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "CMS Module" && item.status === 1 ? (
                        <>
                        <Route path="/bankconnect/CMS" element={<CMS />} />
                        <Route path="/bankconnect/EditCMS/:id" element={<EditCMS />} />
                        <Route path="/bankconnect/ViewCMS/:id" element={<ViewCMS />} />
                        </>
                      ) : item.module === "Meta Module" && item.status === 1 ? (
                        <>
                        <Route path="/bankconnect/Meta" element={<Meta />} />
                        <Route path="/bankconnect/EditMeta/:meta_id" element={<EditMeta />} />
                        </>
                      ) : item.module === "Setting Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/siteSetting"
                            element={
                              <SiteSetting
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_edit === 1 ? (
                            <Route
                              path="/bankconnect/EditSiteSetting/:id"
                              element={<EditSiteSetting />}
                            />
                          ) : null}
                          {/* Currency Setting */}
                          <Route
                            path="/bankconnect/CurrencyRate"
                            element={
                              <CurrencyRate
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* Exchange Setting */}
                          <Route
                            path="/bankconnect/Exchange"
                            element={
                              <Exchange
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* All Upi */}
                          <Route
                            path="/bankconnect/AllUpi"
                            element={
                              <AllUpi
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* IP Whitelist */}
                          <Route
                            path="/bankconnect/IPWhitelist"
                            element={
                              <IPWhitelist
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />}
                          />
                          {/* Set Limit */}
                          <Route
                            path="/bankconnect/Limit"
                            element={
                              <Limit />}
                          />
                          {/* Cron Setup */}
                          <Route
                            path="/bankconnect/Cron"
                            element={
                              <Cron />}
                          />
                            {/* Net Profit */}
                            <Route
                              path="/bankconnect/NetProfit"
                              element={<NetProfit />}
                            />
                            {/* Merchant Child */}
                            <Route path="/bankconnect/SubMerchant" element={<SubMerchant />} />
                            {/* Neompay Autho */}
                            <Route
                              path="/bankconnect/NeompayAutho"
                              element={<NeompayAutho />}
                            />
                          {/* Currency */}
                          <Route
                            path="/bankconnect/Currency"
                            element={
                              <Currency />}
                          />
                          <Route
                            path="/bankconnect/NewCurrencyAdd"
                            element={
                              <NewCurrencyAdd />}
                          />
                          {/* Countries */}
                          <Route
                            path="/bankconnect/Countries"
                            element={
                              <Countries />}
                          />
                          <Route
                            path="/bankconnect/NewCountry"
                            element={
                              <NewCountry />}
                          />

                          {/* Merchant Swap */}
                          <Route path="/bankconnect/MerchantSwap" element={
                            <MerchantSwap 
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete} />}
                            />
                        </>
                      ) : item.module === "Change Password" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankconnect/ChangePassword"
                            element={<ChangePassword />}
                          />
                        </>
                      ) : null}
                    </>
                  );
                })
              : null}
          </Route>
        ) : isLoginUser && role === "2" ? (
          <Route path="/" element={<SettlementSidebar  modulePesmission={modulePesmission} />}>
            <Route path="/bankconnect/SettlementDashboard" element={<SettlementDashboard/>} />
              {Object.keys(modulePesmission).length > 0
                ? modulePesmission.map((item, index) => {
                    return (
                      <>
                        {
                          item.module === "Bank Deposit Received" && item.status === 1 ? (
                            <>
                            <Route path="/bankconnect/BankDepositReceived" element={
                              <BankDeposit
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Local Payouts" && item.status === 1 ? (
                            <>
                            <Route path="/bankconnect/LocalPayouts" element={
                              <LocalPayouts
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Add Funds" && item.status === 1 ? (
                            <>
                            <Route path="/bankconnect/AddFunds" element={
                              <AddFunds
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Local Settlement" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/LocalSettlement" element={
                              <LocalSettlement
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                          </>
                          ) : item.module === "International Settlement" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/InternationalSettlement" element={
                                <InternationalSettlement
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                                />} />
                            </>
                          ) : item.module === "Dispute/Chargebacks" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/DisputesChargebacks" element={
                                <DisputesChargebacks
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Refunds" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/Refunds" element={
                                <Refunds
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                              />} />
                            </>      
                          ) : item.module === "Reports" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/Reports" element={
                                <Reports
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                                />} />
                            </>
                          ) : item.module === "SettlementChangePassword" && item.status === 1 ? (
                            <>
                              <Route path="/bankconnect/ChangePassword" element={<ChangePassword/>} />
                            </>
                          ) : null
                        }
                      </>
                    );
                  })
              : null}
        </Route>
        ) : <Route path="/bankconnect" element={<Login />} />
      }

      <Route>
        {isLoginUser && (accoutType ==='1' || accoutType === "0") ? (
          <>
            <Route path="/bankconnect/merchant" element={<MerchantSidebar />}>
              <Route path="dashboard" element={<Dashbord />} />
              <Route path="SubMerchants" element={<SubMerchants />} />
              <Route path="SubMerchants/ViewSubmerchant/:id" element={<ViewSubmerchant />} />
              <Route path="Refund" element={<Refund />} />
              <Route path="Deposit" element={<Deposit />} />
              <Route path="payout" element={<MerchantPayout />} />
              <Route path="SinglePayout" element={<SinglePayout />} />
              <Route path="Settlement" element={<MerchantSettlement />} />
              <Route path="Settlement/RequestSettlement" element={<RequestSettlement />} />
              <Route path="InternationalSettlement" element={<MerchantInternationalSettlement />} />
              <Route path="InternationalSettlement/RequestInternational" element={<MerchantRequestInternational />} />
              <Route path="Reports" element={<MerchantReports />} />
              <Route path="Statements" element={<Statements />} />
              <Route path="Invoice" element={<Invoice />} />
              <Route path="Virtual" element={<Virtual />} />
              <Route path="Teams" element={<Teams />} />
              <Route path="BusinessSetting" element={<BusinessSetting />} />
              <Route path="MerchantNotifcations" element={<MerchantNotifcations />} />
              <Route path="Integrations" element={<Integrations />} />
              <Route path="WalletLogs" element={<MerchantWalletLogs />} />
              <Route path="Help" element={<Help />} />
              <Route path="Help/AddTicket" element={<AddTicket />} />
              <Route path="Help/ViewTicket/:id" element={<ViewTicket />} />
              <Route path="Help/ViewTicket/:id/AddTicket" element={<AddTicket />} />
              <Route path="ChangePassword" element={<MerchantChangePassword />} />
              <Route path="Invoice/CreateInvoice" element={<CreateInvoice />} />
              <Route path="BusinessSetting/UploadDocument/:id" element={<UploadDocument />} />

                              {/* Test Module Routes */}
              <Route path="TestDashboard" element={<TestDashboard />} />
              <Route path="SandboxDeposit" element={<SandboxDeposit />} />
              <Route path="SandboxPayouts" element={<SandboxPayouts />} />
            </Route>
            <Route path="/bankconnect/DownloadRep" element={<DownloadRep />} />
            <Route path="/bankconnect/DownloadSetting" element={<DownloadSetting />} />
          </>
        ) : isLoginUser && accoutType ==='3' ? (
            <Route path="/bankconnect/merchant" element={<TeamSidebar />}>
              <Route path="TeamDashboard" element={<TeamDashboard />} />
              <Route path="TeamSubmerchant" element={<TeamSubmerchant />} />
              <Route path="TeamDeposit" element={<TeamDeposit />} />
              <Route path="TeamPayout" element={<TeamPayout />} />
              <Route path="TeamSinglePayout" element={<TeamSinglePayout />} />
              <Route path="TeamLocalSettlement" element={<TeamLocalSettlement />} />
              <Route path="TeamLocalSettlement/TeamRequestSettlement" element={<TeamRequestSettlement />} />
              <Route path="TeamInternationalSettlement" element={<TeamInternationalSettlement />} />
              <Route path="TeamInternationalSettlement/RequestTeamInternational" element={<RequestTeamInternational />} />
              <Route path="TeamReports" element={<TeamReports />} />
              <Route path="TeamStatements" element={<TeamStatements />} />
              <Route path="TeamMod" element={<TeamMod />} />
              <Route path="Integrations" element={<Integrations />} />
              <Route path="TeamWalletLogs" element={<TeamWallet />} />
              <Route path="ChangePassword" element={<MerchantChangePassword />} />

                              {/* Test Module Routes */}
              {/* <Route path="TestDashboard" element={<TestDashboard />} />
              <Route path="SandboxDeposit" element={<SandboxDeposit />} />
              <Route path="SandboxPayouts" element={<SandboxPayouts />} /> */}
            </Route>
        ) : (
          <>
          <Route path="/bankconnect/merchant/login-merchant" element={<MerchantLogin />} />
          <Route path="/bankconnect/merchant/signup-merchant" element={<SignUp />} />
          <Route path="/bankconnect/merchant/InCompleteProfile/:key" element={<InCompleteProfile />} />
          <Route path="/bankconnect/merchant/forgot-password" element={<Forget />} />
          <Route path="/bankconnect/merchant/NewPassword" element={<NewPassword />} />
          </>   
        )}
        {/* <Route path="*" element={isLoginUser?<Error />:<Login />} /> */}
      </Route>

      {/* Gateway Routes */}

      <Route>
        <Route path="/bankconnect/Cricpays" element={<ReactForm />} />
        <Route path="/bankconnect/Response" element={<Response />} />
        <Route path="/bankconnect/Loading" element={<Loading />} />
        <Route path="/bankconnect/Gpayment" element={<Gpayment />} />
        <Route path="/bankconnect/Help2pay" element={<Help2pay />} />
        <Route path="/bankconnect/PayPlanet" element={<PayPlanet />} />
        <Route path="/bankconnect/Redipay" element={<Redipay />} />
      </Route>
        
      {/* <Route path="*" element={isLoginUser && role?<Error />:<Login/>} /> */}
    </Routes>
  );
}

export default Routers;
