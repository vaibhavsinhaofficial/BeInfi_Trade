import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useStateContext } from "../../context/ContextProvider";
import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Error from '../PAGE404/Error'
//Api Helper
import baseUrl from "../config/baseUrl";
import axios from "axios";
// MID Module
import Mid from "../Mid/Mid";
import NewMID from "../Mid/NewMID";
import EditMid from "../Mid/EditMid";
// Bankcode Akonto Module
import BankCodeAkonto from "../BankCodeAkonto/BankCodeAkonto";
import NewBankCodeAkonto from "../BankCodeAkonto/NewBankCodeAkonto";
import EditBankCodeAkonto from "../BankCodeAkonto/EditBankCodeAkonto";
// Bankcode Module
import BankCode from "../BankCode/BankCode";
import NewBankCode from "../BankCode/NewBankCode";
import EditBankCode from "../BankCode/EditBankCode";
// Contact Module
import Contact from "../contact/Contact";
import ReadContact from "../contact/ReadContact";
// Marchant Module
import MerchantAdmin from "../MerchantAdmin/MerchantAdmin";
import ReadMerchantAdmin from "../MerchantAdmin/ReadMerchantAdmin";
import AddNewMerchantAdmin from "../MerchantAdmin/AddNewMerchantAdmin";
import EditMerchantAdmin from "../MerchantAdmin/EditMerchantAdmin";
// Change Password Module
import ChangePassword from "../ChangePassword/ChangePassword";
// Site Setting Module
import SiteSetting from "../Setting/siteSetting/SiteSetting";
import EditSiteSetting from "../Setting/siteSetting/EditSiteSetting";
import CurrencyRate from "../Setting/currency/CurrencyRate";
import NewCurrency from "../Setting/currency/NewCurrency";
import UpdateCurrency from "../Setting/currency/UpdateCurrency";
import Exchange from "../Setting/Exchange/Exchange";
import NewExchange from "../Setting/Exchange/NewExchange";
import UpdateExchange from "../Setting/Exchange/UpdateExchange";
import AllUpi from "../Setting/AllUpi/AllUpi";
// SUB ADMIN MODULE
import SubAdmin from "../SubAdminModule/SubAdmin";
import NewSubAdmin from "../SubAdminModule/NewSubAdmin";
import SubAdminPermission from "../SubAdminModule/SubAdminPermission";
import EditSubAdmin from "../SubAdminModule/EditSubAdmin";
import ViewSubAdmin from "../SubAdminModule/ViewSubAdmin";
// PG MODULE
import PGMod from "../Payment/PGMod";
import NewPg from "../Payment/NewPg";
import EditGate from "../Payment/EditGate";
// Chines Module
import Chinese from "../ChineseModule/Chinese";
import NewChinese from "../ChineseModule/NewChinese";
import EditBank from "../ChineseModule/EditBank";
// Transaction Module
import MerchantTrans from "../TransactionMod/MerchantTrans/MerchantTrans";
import NewMerchant from "../TransactionMod/MerchantTrans/NewMerchant";
import ViewMerchant from "../TransactionMod/MerchantTrans/ViewMerchant";
import MerchantRefunds from "../TransactionMod/MerchantRefund/MerchantRefunds";
import EndOfDay from "../TransactionMod/MerchantEnd/EndOfDay";
import PayoutMerchants from "../TransactionMod/MerchantPayout/PayoutMerchants";
import CreatePayout from "../TransactionMod/MerchantPayout/CreatePayout";

// Settlemt Module
import Settlement from "../Settlement/Settlement";
import Common from "../Settlement/Common";
import AdminLogs from "../ActivityLogs/AdminLogs";
import MerchantLogs from "../ActivityLogs/MerchantLogs";
import WalletLogs from "../ActivityLogs/WalletLogs";


//<><><><><><><><><><><><><><><>🤓Settlement Dashboard🤓<><><><><><><><><><><><><><> 

import SettlementSidebar from '../SettlementComp/SIDEBAR/Sidebar'
import SettlementDashboard from '../SettlementComp/Dashboard/Dashboard'
import BankDeposit from "../SettlementComp/BankDeposit/BankDeposit";
import LocalPayouts from "../SettlementComp/LocalPayouts/LocalPayouts";
import AddFunds from "../SettlementComp/AddFunds/AddFunds";
import LocalSettlement from "../SettlementComp/LocalSettlement/LocalSettlement";
import InternationalSettlement from "../SettlementComp/InternationalSettlement/InternationalSettlement";
import DisputesChargebacks from "../SettlementComp/DisputesChargebacks/DisputesChargebacks";
import Refunds from "../SettlementComp/Refunds/Refunds";
// import Commissions from "../SettlementComp/Commissions/Commissions";
import Reports from "../SettlementComp/Reports/Reports";
import Banner from "../Setting/Banner/Banner";
import CMS from "../Setting/CMS/CMS";
import ViewCMS from "../Setting/CMS/ViewCMS";
import Meta from "../Setting/MetaModule/Meta";
import EditMeta from "../Setting/MetaModule/EditMeta";
import IPWhitelist from "../Setting/IPWhitelist/IPWhitelist";
import Limit from "../Setting/SetLimit/Limit";
import Cron from "../Setting/CronSetup/Cron";
import Currency from "../Setting/NewCurrency/Currency";
import Countries from "../Setting/Countries/Countries";
import NewCurrencyAdd from "../Setting/NewCurrency/NewCurrencyAdd";
import NewCountry from "../Setting/Countries/NewCountry";
import NewBanner from "../Setting/Banner/NewBanner";
import EditCMS from "../Setting/CMS/EditCMS";
import Charges from "../Setting/CronSetup/Charges";
import EditIP from "../Setting/IPWhitelist/EditIP";
import NewIP from "../Setting/IPWhitelist/NewIP";
import AddLimit from "../Setting/SetLimit/AddLimit";
import EditLimit from "../Setting/SetLimit/EditLimit";
import SandBoxDeposits from "../SandBox/Deposits/SandBoxDeposits";
import SandBoxPayout from "../SandBox/Payouts/SandboxPayout";
import SubMerchant from "../SubMerchant/SubMerchant";
import NewSubmerchant from "../SubMerchant/NewSubmerchant";
import UpdateSubmerchant from "../SubMerchant/UpdateSubmerchant";
import ViewSandboxDeposits from "../SandBox/Deposits/ViewSandboxDeposits";
import ViewSandboxPayout from "../SandBox/Payouts/ViewSandboxPayout";
import RequestLocalSettlement from "../SettlementComp/LocalSettlement/RequestLocalSettlement";
import AddUpi from "../Setting/AllUpi/AddUpi";
import RequestInternational from "../SettlementComp/InternationalSettlement/RequestInternational";
import EditLocal from "../SettlementComp/LocalSettlement/EditLocal";
import NetProfit from "../Setting/NetProfit/NetProfit";
import INR from "../MerchantAdmin/INR";
import UPI from "../MerchantAdmin/INR/UPI";
import Card from "../MerchantAdmin/INR/Card";
import Wallet from "../MerchantAdmin/INR/Wallet";
import NetBanking from "../MerchantAdmin/INR/NetBanking";
import UbankCodes from "../MerchantAdmin/INR/UbankCodes";
import NonInr from "../MerchantAdmin/NonInr";
import CurrencyModeSolution from "../MerchantAdmin/NON_INR/CurrencyModeSolution";
import EditUpi from "../Setting/AllUpi/EditUpi";
import CurrencyLogs from "../ActivityLogs/CurrencyLogs";
import AllowPaymentLogs from "../ActivityLogs/AllowPaymentLogs";
import EditInternational from "../SettlementComp/InternationalSettlement/EditInternational";

//<><><><><><><><><><><><><><><>🤓Settlement Dashboard End🤓<><><><><><><><><><><><><>
function Routers() {
  const [modulePesmission, setModulePesmission] = useState([]);
  const { isLoginUser,setIsLoginUser,role, setRole } = useStateContext();
  const location = useLocation();
  const reactNavigate = useNavigate()
  useLayoutEffect(() => {
   if(localStorage.getItem('admin')){
      fetchData();
      const { exp } = jwtDecode(localStorage.getItem('admin'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/')
        return;
      }
      setIsLoginUser(localStorage.getItem('admin'))
      setRole(localStorage.getItem('role'))
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
            <Route path="/Dashboard" element={<Dashboard />} />
            
            {/* Sub Admin */}
              <Route path="/subAdmin"  element={ <SubAdmin authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> }  />
              <Route path="/newSubAdmin" element={<NewSubAdmin />} />
              <Route path="/subAdminPermission/:id" element={<SubAdminPermission />} />
              <Route path="/EditSubAdmin/:id" element={<EditSubAdmin />} />
              <Route path="/ViewSubAdmin/:id" element={<ViewSubAdmin />} />
            {/* End Sub Admin */}

            {/* PG Module */}
              <Route path="/PGMod" element={ <PGMod authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/NewPg" element={<NewPg />} />
              <Route path="/EditGate/:id" element={<EditGate />} />
            {/* End PG Module */}
                        
            {/* MID Module */}        
              <Route path="/Mid" element={ <Mid authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/NewMid" element={<NewMID />} />
              <Route path="/EditMid/:id" element={<EditMid />} />
            {/* End MID Module */}

            {/* Chinese Module */}
              <Route path="/Chinese" element={ <Chinese authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/NewChinese" element={<NewChinese />} />
              <Route path="/EditBank/:id" element={<EditBank />} />
            {/* End Chinese Module */}
            
            {/* BankCode Akonto Module */}           
              <Route path="/bankcodeakonto" element={ <BankCodeAkonto authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/newbankcodeakonto" element={<NewBankCodeAkonto />} />
              <Route path="/editbankcodeakonto/:id" element={<EditBankCodeAkonto />} />
            {/* End BankCode Akonto Module */}

            {/* BankCode Module */}
              <Route path="/bankcode" element={ <BankCode authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/newbankcode" element={<NewBankCode />} />
              <Route path="/editbankcode/:id" element={<EditBankCode />} />
            {/* End BankCode Module */}

            {/* Merchant Onboarding Module */}      
              <Route  path="/merchantAdmin" element={ <MerchantAdmin authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/AddNewMerchantAdmin" element={<AddNewMerchantAdmin />} />
              <Route path="/readMerchantAdmin/:id" element={<ReadMerchantAdmin />} />
              <Route path="/EditMerchantAdmin/:id" element={<EditMerchantAdmin />} />
              <Route path="/INR/:id" element={<INR />} />
              <Route path="/NonInr/:id" element={<NonInr />}  />
              <Route path="/NonInr/:id/CurrencyModeSolution"  element={<CurrencyModeSolution />} />
              <Route path="/INR/:id/UPI" element={<UPI />} />
              <Route path="/INR/:id/Card" element={<Card />} />
              <Route path="/INR/:id/Wallet" element={<Wallet />} />
              <Route path="/INR/:id/NetBanking" element={<NetBanking />} />
              <Route path="/INR/:id/UbankCodes" element={<UbankCodes />} />
            {/* End Merchant Onboarding Module */}

            {/* Deposit Transaction */}
              <Route path="/MerchantTrans" element={ <MerchantTrans authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/NewMerchant" element={<NewMerchant />} />
              <Route path="/ViewMerchant/:invoice_id" element={<ViewMerchant />} />
            {/* End Deposit Transaction */}

            {/* End Of Day Transaction */}
              <Route path="/EndOfDay" element={ <EndOfDay authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> }/>
            {/* End Of Day Transaction */}

            {/* Merchant Refund  */}
              <Route path="/MerchantRefunds" element={ <MerchantRefunds authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
            {/* End Merchant Refund */}

            {/* SubMerchant Module */}
              <Route path="/SubMerchant" element={<SubMerchant authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/NewSubmerchant" element={<NewSubmerchant />} />
              <Route path="/UpdateSubmerchant/:id" element={<UpdateSubmerchant />} />
            {/* End SubMerchant Module */}

            {/* Merchant Payouts */}
              <Route path="/PayoutMerchants" element={ <PayoutMerchants authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/CreatePayout" element={<CreatePayout />} />
            {/* End Merchant Payouts */}

            {/* Sandbox Deposit Module */}         
              <Route path="/SandBoxDeposits" element={ <SandBoxDeposits authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/ViewSandboxDeposits/:invoice_id" element={<ViewSandboxDeposits />} /> 
            {/* End Sandbox Deposit Module */}

            {/* Sandbox Payout Module */}
              <Route path="/SandBoxPayout" element={ <SandBoxPayout authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/ViewSandboxPayout/:id" element={<ViewSandboxPayout />} />
            {/* End Sandbox Payout Module */}
            
            {/* Banner Module */}
              <Route path="/Banner" element={<Banner authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />                        
              <Route path="/NewBanner" element={<NewBanner />} />
            {/* End Banner Module */}  
            
            {/* Add Funds Module */}
              <Route path="/AddFunds" element={<AddFunds authCreate={1} authRead={1} authUpdate={1} authDelete={1}/>} />
            {/* End Add Funds Module */}

            {/* Local Settlement Module */}
              <Route path="/LocalSettlement" element={<LocalSettlement authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/RequestLocalSettlement" element={<RequestLocalSettlement />} />
              <Route path="/EditLocal/:id" element={<EditLocal />} />
            {/* End Local Settlement Module */}

            {/* International Settlement Module */}
              <Route path="/InternationalSettlement" element={<InternationalSettlement authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/RequestInternational" element={<RequestInternational />} />
              <Route path="/EditInternational/:id" element={<EditInternational />} />
            {/* End International Settlement Module */}
            
            {/* Activity Logs Module */}
              <Route path="/AdminLogs" element={<AdminLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/MerchantLogs" element={<MerchantLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/WalletLogs" element={<WalletLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/CurrencyLogs" element={<CurrencyLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              <Route path="/AllowPaymentLogs" element={<AllowPaymentLogs authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End Activity Logs Module */}
                    
            {/* Website Email Module */}       
              <Route path="/contact" element={ <Contact authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
              <Route path="/readContact/:id" element={<ReadContact />} />
            {/* End Website Email Module */}
                          
            {/* Setting Module */}
              {/* CMS Module */}
                <Route path="/CMS" element={<CMS authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/EditCMS/:id" element={<EditCMS />} />
                <Route path="/ViewCMS/:id" element={<ViewCMS />} />

              {/* Meta Module */}
                <Route path="/Meta" element={<Meta authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/EditMeta/:meta_id" element={<EditMeta />} />
              
              {/* Site Module */}
                <Route path="/siteSetting" element={ <SiteSetting /> } />     
                <Route path="/EditSiteSetting/:id" element={<EditSiteSetting />} />
                          
              {/* Currency Setting */}
                <Route path="/CurrencyRate" element={ <CurrencyRate authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />    
                <Route path="/NewCurrency" element={<NewCurrency />} />
                <Route path="/UpdateCurrency/:id" element={<UpdateCurrency />} />
                          
              {/* Exchange Setting */}
                <Route path="/Exchange" element={ <Exchange authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
                <Route path="/NewExchange" element={<NewExchange />} />
                <Route path="/UpdateExchange/:id" element={<UpdateExchange />} />
                          
              {/* All Upi */}
                <Route path="/AllUpi" element={ <AllUpi authCreate={1} authRead={1} authUpdate={1} authDelete={1} /> } />
                <Route path="/AddUpi" element={<AddUpi />} />
                <Route path="/EditUpi/:id" element={<EditUpi />} />

              {/* IP Whitelist */}
                <Route path="/IPWhitelist" element={ <IPWhitelist authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/EditIP/:id" element={<EditIP />} />
                <Route path="NewIP" element={<NewIP />} />

              {/* Set Limit */}
                <Route path="/Limit" element={ <Limit authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/AddLimit" element={ <AddLimit />} />
                <Route path="/EditLimit/:id" element={<EditLimit />} />

              {/* Cron Setup */}
                <Route path="/Cron"  element={ <Cron authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/Charges/:id" element={<Charges />} />
              
              {/* Net Profit */}
                <Route path="/NetProfit" element={<NetProfit authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
              
              {/* Currency */}
                <Route path="/Currency" element={ <Currency authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/NewCurrencyAdd" element={ <NewCurrencyAdd />} />
              
              {/* Countries */}
                <Route path="/Countries" element={ <Countries authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
                <Route path="/NewCountry" element={ <NewCountry />} />
                        
              {/* Change Password Module */}
                  <Route path="/ChangePassword" element={<ChangePassword authCreate={1} authRead={1} authUpdate={1} authDelete={1} />} />
            {/* End Setting Module */}
        );
        </Route>      
        ) : isLoginUser && role === "1" ? (
          <Route
            path="/"
            element={<Sidebar modulePesmission={modulePesmission} />}
          >
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/SubMerchant" element={<SubMerchant />} />
              <Route path="/NewSubmerchant" element={<NewSubmerchant />} />
              <Route path="/UpdateSubmerchant/:id" element={<UpdateSubmerchant />} />
            {Object.keys(modulePesmission).length > 0
              ? modulePesmission.map((item, index) => {
                  return (
                    <>
                      {item.module === "Sub Admin Module" &&
                      item.status === 1 ? (
                        <>
                          <Route
                            path="/subAdmin"
                            element={
                              <SubAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newSubAdmin"
                              element={<NewSubAdmin />}
                            />
                          ) : null}

                          <Route
                            path="/subAdminPermission/:id"
                            element={<SubAdminPermission />}
                          />
                          {item.m_edit === 1 ? (
                            <Route
                              path="/EditSubAdmin/:id"
                              element={<EditSubAdmin />}
                            />
                          ) : null}
                          {item.m_view === 1 ? (
                            <Route
                              path="/ViewSubAdmin/:id"
                              element={<ViewSubAdmin />}
                            />
                          ) : null}
                        </>
                      )
                    
                      : item.module === "PG Module" && item.status === 1 ? (
                        <>
                          {/* PG Module */}
                          <Route
                            path="/PGMod"
                            element={
                              <PGMod
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/NewPg" element={<NewPg />} />
                          <Route path="/EditGate/:id" element={<EditGate />} />
                          {/* End PG Module */}
                        </>
                      ) : item.module ==="MID Module" && item.status === 1 ? (
                        <>
                          <Route
                            path="/Mid"
                            element={
                              <Mid
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route path="/NewMid" element={<NewMID />} />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route path="/EditMid/:id" element={<EditMid />} />
                          ) : null}
                        </>
                      ) : item.module === "Chinese bank Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Chinese Module */}
                          <Route
                            path="/Chinese"
                            element={
                              <Chinese
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/NewChinese" element={<NewChinese />} />
                          <Route path="/EditBank/:id" element={<EditBank />} />
                        </>
                      ) : item.module === "Bankcode BankConnect Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankcodeakonto"
                            element={
                              <BankCodeAkonto
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newbankcodeakonto"
                              element={<NewBankCodeAkonto />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/editbankcodeakonto/:id"
                              element={<EditBankCodeAkonto />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "Bankcode Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankcode"
                            element={
                              <BankCode
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newbankcode"
                              element={<NewBankCode />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/editbankcode/:id"
                              element={<EditBankCode />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "Merchant Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/merchantAdmin"
                            element={
                              <MerchantAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/AddNewMerchantAdmin"
                              element={<AddNewMerchantAdmin />}
                            />
                          ) : null}
                          {item.m_view === 1 ? (
                            <Route
                              path="/readMerchantAdmin/:id"
                              element={<ReadMerchantAdmin />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/EditMerchantAdmin/:id"
                              element={<EditMerchantAdmin />}
                            />
                          ) : null}
                          <Route
                            path="/INR/:id"
                            element={<INR />}
                          />
                          <Route
                            path="/NonInr/:id"
                            element={<NonInr />}
                          />
                          <Route
                            path="/NonInr/:id/CurrencyModeSolution"
                            element={<CurrencyModeSolution />}
                          />
                          <Route
                            path="/INR/:id/UPI"
                            element={<UPI />}
                          />
                          <Route
                            path="/INR/:id/Card"
                            element={<Card />}
                          />
                          <Route
                            path="/INR/:id/Wallet"
                            element={<Wallet />}
                          />
                          <Route
                            path="/INR/:id/NetBanking"
                            element={<NetBanking />}
                          />
                          <Route
                            path="/INR/:id/UbankCodes"
                            element={<UbankCodes />}
                          />
                        </>
                      ) : item.module === "Transaction Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Merchant Transaction */}
                          <Route
                            path="/MerchantTrans"
                            element={
                              <MerchantTrans
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/NewMerchant"
                            element={<NewMerchant />}
                          />
                          <Route
                            path="/ViewMerchant/:invoice_id"
                            element={<ViewMerchant />}
                          />

                          {/* End Merchant Transaction */}

                          {/* End Of Day Transaction */}
                          <Route
                            path="/EndOfDay"
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
                            path="/MerchantRefunds"
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
                            path="/PayoutMerchants"
                            element={
                              <PayoutMerchants
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/CreatePayout"
                            element={<CreatePayout />}
                          />
                          {/* End Merchant Payouts */}
                        </>
                      ) : item.module === "SandBox Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/SandBoxDeposits"
                            element={
                              <SandBoxDeposits
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/ViewSandboxDeposits/:invoice_id" element={<ViewSandboxDeposits />} />
                          <Route
                            path="/SandBoxPayout"
                            element={
                              <SandBoxPayout 
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/ViewSandboxPayout/:id" element={<ViewSandboxPayout />} />
                        </>
                      ) : item.module === "Banner Module" &&
                        item.status === 1 ? (
                        <>
                          <Route path="/Banner" element={<Banner />} />                        
                          <Route path="/NewBanner" element={<NewBanner />} />                        
                        </>
                      ) : item.module === "Settlement Module" &&
                        item.status === 1 ? (
                        <>
                          <Route path="/LocalSettlement" element={
                            <LocalSettlement
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                            />} />
                          <Route path="/RequestLocalSettlement" element={<RequestLocalSettlement />} />
                          <Route path="/InternationalSettlement" element={
                            <InternationalSettlement
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                            />} />
                          <Route path="/RequestInternational" element={<RequestInternational />} />
                          <Route path="/EditLocal/:id" element={<EditLocal />} />
                          <Route path="/EditInternational/:id" element={<EditInternational />} />
                          <Route path="/AddFunds" element={
                            <AddFunds
                              authCreate={item.m_add}
                              authRead={item.m_view}
                              authUpdate={item.m_edit}
                              authDelete={item.m_delete}
                            />
                          } />
                        </>
                      ) : item.module === "Activity Logs" &&
                        item.status === 1 ? (
                        <>
                        <Route path="/AdminLogs" element={<AdminLogs />} />
                        <Route path="/MerchantLogs" element={<MerchantLogs />} />
                        <Route path="/WalletLogs" element={<WalletLogs />} />
                        <Route path="/CurrencyLogs" element={<CurrencyLogs />} />
                        <Route path="/AllowPaymentLogs" element={<AllowPaymentLogs />} />
                      
                        </>
                      ) : item.module === "Contact Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/contact"
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
                              path="/readContact/:id"
                              element={<ReadContact />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "CMS Module" && item.status === 1 ? (
                        <>
                        <Route path="/CMS" element={<CMS />} />
                        <Route path="/EditCMS/:id" element={<EditCMS />} />
                        <Route path="/ViewCMS/:id" element={<ViewCMS />} />
                        </>
                      ) : item.module === "Meta Module" && item.status === 1 ? (
                        <>
                        <Route path="/Meta" element={<Meta />} />
                        <Route path="/EditMeta/:meta_id" element={<EditMeta />} />
                        </>
                      ) : item.module === "Setting Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/siteSetting"
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
                              path="/EditSiteSetting/:id"
                              element={<EditSiteSetting />}
                            />
                          ) : null}
                          {/* Currency Setting */}
                          <Route
                            path="/CurrencyRate"
                            element={
                              <CurrencyRate
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/NewCurrency"
                              element={<NewCurrency />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/UpdateCurrency/:id"
                              element={<UpdateCurrency />}
                            />
                          ) : null}
                          {/* Exchange Setting */}
                          <Route
                            path="/Exchange"
                            element={
                              <Exchange
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/NewExchange"
                              element={<NewExchange />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/UpdateExchange/:id"
                              element={<UpdateExchange />}
                            />
                          ) : null}
                          {/* All Upi */}
                          <Route
                            path="/AllUpi"
                            element={
                              <AllUpi
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                            <Route
                              path="/AddUpi"
                              element={<AddUpi />}
                            />

                            <Route path="/EditUpi/:id" element={<EditUpi />} />
                          {/* IP Whitelist */}
                          <Route
                            path="/IPWhitelist"
                            element={
                              <IPWhitelist />}
                          />
                          <Route
                              path="/EditIP/:id"
                              element={<EditIP />}
                            />
                          <Route
                              path="NewIP"
                              element={<NewIP />}
                            />
                          {/* Set Limit */}
                          <Route
                            path="/Limit"
                            element={
                              <Limit />}
                          />
                          <Route
                            path="/AddLimit"
                            element={
                              <AddLimit />}
                          />
                          <Route
                            path="/EditLimit/:id"
                            element={<EditLimit />}
                          />
                          {/* Cron Setup */}
                          <Route
                            path="/Cron"
                            element={
                              <Cron />}
                          />
                          <Route
                              path="/Charges/:id"
                              element={<Charges />}
                            />
                            {/* Net Profit */}
                            <Route
                              path="/NetProfit"
                              element={<NetProfit />}
                            />
                          {/* Currency */}
                          <Route
                            path="/Currency"
                            element={
                              <Currency />}
                          />
                          <Route
                            path="/NewCurrencyAdd"
                            element={
                              <NewCurrencyAdd />}
                          />
                          {/* Countries */}
                          <Route
                            path="/Countries"
                            element={
                              <Countries />}
                          />
                          <Route
                            path="/NewCountry"
                            element={
                              <NewCountry />}
                          />
                        </>
                      ) : item.module === "Change Password" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/ChangePassword"
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
            <Route path="/SettlementDashboard" element={<SettlementDashboard/>} />
              {Object.keys(modulePesmission).length > 0
                ? modulePesmission.map((item, index) => {
                    return (
                      <>
                        {
                          item.module === "Bank Deposit Received" && item.status === 1 ? (
                            <>
                            <Route path="/BankDepositReceived" element={
                              <BankDeposit
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Local Payouts" && item.status === 1 ? (
                            <>
                            <Route path="/LocalPayouts" element={
                              <LocalPayouts
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Add Funds" && item.status === 1 ? (
                            <>
                            <Route path="/AddFunds" element={
                              <AddFunds
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Local Settlement" && item.status === 1 ? (
                            <>
                              <Route path="/LocalSettlement" element={
                              <LocalSettlement
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />} />
                            <Route path="/EditLocal/:id" element={<EditLocal />} />
                            <Route path="/RequestLocalSettlement" element={<RequestLocalSettlement />} />
                          </>
                          ) : item.module === "International Settlement" && item.status === 1 ? (
                            <>
                              <Route path="/InternationalSettlement" element={
                                <InternationalSettlement
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                                />} />
                              <Route path="/RequestInternational" element={<RequestInternational />} />
                              <Route path="/EditInternational/:id" element={<EditInternational />} />
                            </>
                          ) : item.module === "Dispute/Chargebacks" && item.status === 1 ? (
                            <>
                              <Route path="/DisputesChargebacks" element={
                                <DisputesChargebacks
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                              />} />
                            </>
                          ) : item.module === "Refunds" && item.status === 1 ? (
                            <>
                              <Route path="/Refunds" element={
                                <Refunds
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                              />} />
                            </>      
                          ) : item.module === "Reports" && item.status === 1 ? (
                            <>
                              <Route path="/Reports" element={
                                <Reports
                                  authCreate={item.m_add}
                                  authRead={item.m_view}
                                  authUpdate={item.m_edit}
                                  authDelete={item.m_delete}
                                />} />
                            </>
                          ) : item.module === "SettlementChangePassword" && item.status === 1 ? (
                            <>
                              <Route path="/ChangePassword" element={<ChangePassword/>} />
                            </>
                          ) : null
                        }
                      </>
                    );
                  })
              : null}
        </Route>
        ) : <Route path="/" element={<Login />} />
      }
        
      {/* <Route path="*" element={isLoginUser && role?<Error />:<Login/>} /> */}
    </Routes>
  );
}

export default Routers;
