import React, { useState, useEffect } from "react";
import "./Gpayment.css";
import hdfc from "./img/logo-HDFC.png";
import axis from "./img/logo-AXIS.svg";
import india from "./img/INDIAN_OVERSEAS.png";
import icic from "./img/ICICI.png";
import sbi from "./img/SBI.png";
import uco from "./img/UCO.png";
import kotak from "./img/KOTAK.png";
import copy from "./img/icon-copy.svg";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Gpayment() {
  const [countdown, setCountdown] = useState('1h 0m 0s');
  const [language, setLanguage] = useState("en");

  const [account_holder, setAccount_holder] = useState('');
  const [account_number, setAccount_number] = useState('');
  const [ifsc_code, setIfsc_code] = useState('');
  const [amount, setAmount] = useState('');
  const [order_no, setOrder_no] = useState('');
  const [uid, setUid] = useState('');
  const [paid_to, setPaid_to] = useState('');
  const [bank_type, setBankType] = useState('');
  const [trn_id, setTrn_id] = useState('');
  const [utr, setUtr] = useState('');
  const navigate = useNavigate();

  const translations = {
    en: {
      order: "Order #",
      completeTransaction:
        "Please Complete Your Transaction Using The Specified Details",
      accountName: "Account Name",
      accountNo: "Account No",
      ifsc: "IFSC",
      amount: "Amount",
      makePayment:
        "1. Make your payment using the provided recipient details (refer to the payment information for transferring funds)",
      enterUtrNo:
        "2. Enter the UPI UTR No. from the deposit confirmation message",
      completeText: '3. After filling out the form, click SUBMIT to complete the deposit successfully',
      submit: "Submit",
      banks: "Suggested Top Banks",
      paymentReminder: "Payment Reminder:",
      utrNoRequired: " UTR No. required",
      utr: "ENTER UTR NUMBER",
    },
    hi: {
      order: "ऑर्डर #",
      completeTransaction:
        "कृपया निर्दिष्ट विवरण का उपयोग करके अपना लेनदेन पूरा करें",
      accountName: "खाता नाम",
      accountNo: "खाता नंबर",
      ifsc: "आईएफएससी",
      amount: "मात्रा",
      makePayment:
        "1. दिए गए प्राप्तकर्ता विवरण का उपयोग करके अपना भुगतान करें (देखें)। धनराशि स्थानांतरित करने के लिए भुगतान जानकारी",
      enterUtrNo: '2. जमा पुष्टिकरण संदेश से "UPI UTR No." दर्ज करें',
      completeText: '3. फॉर्म भरने के बाद, जमा पूरा करने के लिए SUBMIT पर क्लिक करें सफलतापूर्वक',
      submit: "सबमिट करें",
      banks: "सुझाए गए शीर्ष बैंक",
      paymentReminder: "भुगतान रिमाईन्डर:",
      utrNoRequired: "यूपीआई यूटीआर नंबर आवश्यक",
      utr: " यूटीआर नंबर दर्ज करें",
    },
  };

  useEffect(() => {

    // Function to fetch values from the URL
    const fetchValuesFromURL = () => {
      const params = new URLSearchParams(window.location.search);

      // Replace 'defaultValue' with the default value you want to use if the parameter is not present in the URL
      setAccount_holder(params.get('account_holder') || 'defaultValue');
      setAccount_number(params.get('account_number') || 'defaultValue');
      setIfsc_code(params.get('ifsc_code') || 'defaultValue');
      setAmount(params.get('amount') || 'defaultValue');
      setOrder_no(params.get('order_no') || 'defaultValue');
      setUid(params.get('uid') || 'defaultValue');
      setTrn_id(params.get('trn_id') || 'defaultValue');
      setPaid_to(params.get('paid_to') || 'defaultValue');
      setBankType(params.get('bank_type') || 'defaultValue');
    };
    console.log(bank_type);

    // Call the function when the component mounts
    fetchValuesFromURL();

    const expiryDate = new Date().getTime() + 3600000; // 1 hour in milliseconds

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate - now;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('EXPIRED');
      } else {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert(value + ' Copied');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values={
        uid: uid,
        paid_to: paid_to,
        trn_id: trn_id,
        bankType: bank_type,
        utr: utr
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };
      let result = await axios.post(`${baseUrl}/crickpayTransRes`,
        values,
        config
      );
      console.log(result)
      toast.success(<span style={{ fontWeight: 'bold', color: '#ff6600' }}>{result.data.message}</span>, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false
      });
      setTimeout(() => {
        if(result.data.status === "Success"){
          navigate("/bankconnect/Cricpays");
        }
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <>
      <div className="main1">
        <div className="container pt-5">
          <div className="row">
            <div className="shadow-lg theme-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-10 ">
                    <p className="theme-text ">
                      <b className="orderSize">
                        <span>{translations[language].order}</span>{" "}
                        {order_no}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-2">
                    <select
                      name="language"
                      className="lang-button"
                      onChange={handleLanguageChange}
                    >
                      <option value="en" selected="selected">
                        English
                      </option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                </div>
                <form
                  name="creditcard_checkout"
                  // onSubmit={handleSubmit}
                  className="row"
                >
                  <div className="row">
                    <p className="theme-text orderID text-center">
                      {translations[language].completeTransaction}
                    </p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 align-self-center">
                      <p className="fw-bold theme-text remindText" style={{whiteSpace: "nowrap", textAlign: "center"}}>
                        {/* Account Name */}
                        {translations[language].accountName}
                      </p>
                    </div>
                    <div className="col-sm-8">
                      <p className="theme-text pill nameinput">
                        {account_holder}
                        <button
                          className="copyA"
                          label="Account Name"
                          text-copy="COPY"
                          style={{background: "#c5e7ff", float: 'inline-end'}}
                          onClick={() => copyClipboard({account_holder})}
                        >
                          <img src={copy} alt="Copy Icon" width="20px" />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 align-self-center">
                      <p className="fw-bold theme-text remindText" style={{whiteSpace: "nowrap", textAlign: "center"}}>
                        {/* Account No */}
                        {translations[language].accountNo}
                      </p>
                    </div>
                    <div className="col-sm-8">
                      <p className="theme-text pill nameinput">
                        {account_number}
                        <button
                          className="copyA "
                          label="Account Name"
                          text-copy="COPY"
                          style={{background: "#c5e7ff", float: 'inline-end'}}
                          onClick={() => copyClipboard({account_number})}
                        >
                          <img src={copy} alt="Copy Icon" width="20px" />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4  align-self-center">
                      <p className="theme-text fw-bold remindText" style={{whiteSpace: "nowrap", textAlign: "center"}}>
                        {/* IFSC */}
                        {translations[language].ifsc}
                      </p>
                    </div>
                    <div className="col-sm-8">
                      <p className="theme-text pill nameinput">
                        {ifsc_code}
                        <button
                          className="copyA"
                          label="Account Name"
                          text-copy="COPY"
                          style={{background: "#c5e7ff", float: 'inline-end'}}
                          onClick={() => copyClipboard({ifsc_code})}
                        >
                          <img src={copy} alt="Copy Icon" width="20px" />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4 align-self-center">
                      <p className="theme-text fw-bold remindText" style={{whiteSpace: "nowrap", textAlign: "center"}}>
                        {/* Amount */}
                        {translations[language].amount}
                      </p>
                    </div>
                    <div className="col-sm-8">
                      <p className="theme-text pill nameinput">
                        ₹ {amount}
                        <button
                          className="copyA"
                          label="Account Name"
                          text-copy="COPY"
                          style={{background: "#c5e7ff", float: 'inline-end'}}
                          onClick={() => copyClipboard({amount})}
                        >
                          <img src={copy} alt="Copy Icon" width="20px" />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <p className="theme-text fw-bold fs-4">
                      {translations[language].banks}
                    </p>
                    <div>
                      <img
                        src={hdfc}
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                        alt="HDFC Bank"
                      />
                      <img
                        src={axis}
                        alt="Axis Bank"
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                      />
                      <img
                        src={india}
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                        alt="Indian Overseas Bank"
                      />
                      <img
                        src={icic}
                        alt="ICICI Bank"
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                      />
                      <img
                        src={sbi}
                        alt="State Bank of India"
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                      />
                      <img
                        src={uco}
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                        alt="UCO Bank"
                      />
                      <img
                        src={kotak}
                        style={{ height: "40px", marginLeft: "10px", marginBottom: "5px" }}
                        alt="Kotak Mahindra Bank"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <p className="text-left theme-text remindText" style={{ color: "#007bff", fontWeight: "800", textAlign: "center" }}>{translations[language].utrNoRequired}</p>
                    <input type="text" className="form-control upi-input" name="utr" id="utr" placeholder={translations[language].utrNoRequired} required style={{ backgroundColor: "#c5e7ff", border: "1px solid #dee2e6", borderRadius: "20px", margin: "auto"}} onChange={(e) => setUtr(e.target.value)} />
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary theme-btn shadow-lg submitButton"
                        onClick={(e) => { handleSubmit(e); }}
                      >
                        {/* Submit */}
                        {translations[language].submit}
                      </button>
                      <br/>
                      <p className="btn btn-primary mt-3">{countdown}</p>
                      <p className="card-text text-center small"></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                          <h4 className="text-left theme-text paymentReminder">
                            {translations[language].paymentReminder}
                          </h4>
                          <p className="text-left theme-text remindText">
                            {/* 1. Make your payment using the provided recipient
                            details (refer to the payment information for
                            transferring funds) */}
                            {translations[language].makePayment}
                          </p>
                          <p className="text-left theme-text remindText">
                            {/* 2. Enter the UPI UTR No. from the deposit
                            confirmation message */}
                            {translations[language].enterUtrNo}
                          </p>
                          <p className="text-left theme-text remindText">
                            {/* 3. After filling out the form, click SUBMIT to
                            complete the deposit successfully */}
                            {translations[language].completeText}
                          </p>
                        </div>
                        <div className="col-lg-1"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gpayment;
