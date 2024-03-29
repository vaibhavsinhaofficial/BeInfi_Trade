import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import img from "./logoubank.png";
import { useNavigate } from "react-router-dom";
import "./card.css"
import card from "./card.svg"

function ReactForm() {
  const [transactionid, setTransactionId] = useState(
    Math.floor(100000 + Math.random() * 900000) + "NODE"
  );
  const [firstname, setFirstName] = useState("Testing");
  const [lastname, setlastName] = useState("Singh");
  const [email, setEmail] = useState("manjeet@gmail.com");
  const [phone, setPhone] = useState("8400137432");
  const [address, setAddress] = useState("INDIA");
  const [state, setState] = useState("");
  const [city, setCity] = useState("INDIA");
  const [zipcode, setZipcode] = useState("777777");
  const [notes, setNotes] = useState("");

  const [showCard, setShowCard] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showUpi, setShowUpi] = useState(false);
  const [showQrpay, setShowQrpay] = useState(false);
  const [stateName, setStateName] = useState([]);
  const [currencyName, setCurrencyName] = useState([]);
  const [bankName, setBankName] = useState([]);
  const [toCurrency, setToCurrency] = useState("");
  const [selectCardOption, setSelectOption] = useState("");

  const navigate = useNavigate();

  const handleshow = (paymentMethod) => {
    setShowCard(false);
    setShowNetBanking(false);
    setShowWallet(false);
    setShowUpi(false);
    setShowQrpay(false);

    if (paymentMethod === "card") {
      setShowCard(true);
      setSelectOption(1);
    } else if (paymentMethod === "netbanking") {
      setShowNetBanking(true);
      setSelectOption(3);
    } else if (paymentMethod === "wallet") {
      setShowWallet(true);
      setSelectOption(4);
    } else if (paymentMethod === "upi") {
      setShowUpi(true);
      setSelectOption(2);
    } else if (paymentMethod === "Qrpay") {
      setShowQrpay(true);
      setSelectOption(5);
    }
  };

  const readstate = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };
      let res = await axios.post(`${baseUrl}/state`, config);
      let res1 = await axios.post(`${baseUrl}/currency`, config);
      // console.log(res);
      setStateName(res.data);
      setCurrencyName(res1.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const merchantGate = async (val) => {
    try {
      let value = {
        currency: toCurrency,
        pay_by: selectCardOption,
        merchantno: 62,
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };
      let result = await axios.post(`${baseUrl}/getMerchantGateeeeee`,
        value,
        config
      );
      setBankName(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newBankPayment = async (e) => {
    e.preventDefault();
    try {
      let values = {
        merchantno: "62",
        secretkey: "fPFBKsaC",
        order_id: transactionid,
        fname: "Testing",
        lname: "Singh",
        email: "manjeet@gmail.com",
        mobile_no: "8400137432",
        address: "INDIA",
        state: state,
        city: "INDIA",
        pincode: "777777",
        description: notes,
        amount: 1050,
        currency: toCurrency,
        pay_by: selectCardOption,
        payment_mode: "LIVE",
        callback_url:
          "https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-callback.php",
        return_url:
          "https://homeofbulldogs.com/dev/pay-form/wp-callback/wp-return.php",
        // upi_id: upi_id,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };
      let result = await axios.post(`${baseUrl}/BankPaymentInr`,
        values,
        config
      );
      console.log(result.data);
      const { account_info } = result.data;
      const { account_holder, account_number, ifsc_code, amount, order_no, uid, utr, paid_to, trn_id, bank_type } = account_info;
      // console.log("hello",{ account_holder, account_number, ifsc_code, amount, order_no, uid, utr, paid_to, trn_id, bank_type}); 
      if(result.data.bank_res === 'Success') {
        const redirectPath = '/bankconnect/Gpayment';
        const queryParams = `?account_holder=${account_holder}&account_number=${account_number}&ifsc_code=${ifsc_code}&amount=${amount}&order_no=${order_no}&uid=${uid}&utr=${utr}&paid_to=${paid_to}&trn_id=${trn_id}&bank_type=${bank_type}`;
        navigate(redirectPath + queryParams);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readstate();
    merchantGate();
  }, [toCurrency, selectCardOption]);

  return (
    <>
      <div className="container">
        <form className=" border shadow p-4">
          <img
            src={img}
            alt="bank"
            style={{ height: "5rem", margin: "auto", display: "block" }}
          />
          <div className="row mt-4 d-flex">
            <div className="col-lg-4 col-md-4 col-sm-2 ">
              <div className="mb-3">
                <h6> Transaction ID</h6>
                <input
                  className="form-control "
                  type="text"
                  name="transaction_id"
                  required
                  title="Transaction "
                  value={transactionid}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> First Name </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  required
                  placeholder="firstname"
                  title="firstname"
                  value={firstname}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Last Name </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  title="lastname"
                  required
                  placeholder="lastname"
                  value={lastname}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Email </h6>
                <input
                  className="form-control input-group-lg "
                  type="email"
                  title="email"
                  required
                  placeholder="Email"
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Phone No </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  title="phone"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Address </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  title="address"
                  required
                  placeholder="Address"
                  value={address}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> City </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  title="city"
                  required
                  placeholder="city"
                  value={city}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> State </h6>
                <select
                  className="form-select form-select-lg"
                  aria-label="Default select example"
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>Select State</option>
                  {stateName.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Pincode </h6>
                <input
                  className="form-control input-group-lg "
                  type="text"
                  title="pincode"
                  required
                  placeholder="pincode"
                  value={zipcode}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="mb-3">
                <h6> Currency </h6>
                <select
                  className="form-select form-select-lg"
                  aria-label="Default select example"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  <option>Select Currency</option>
                  {currencyName.map((item, index) => {
                    return (
                      <option key={index} value={item.currency}>
                        {item.currency}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 ">
              <div className="mb-4">
                <h6> Order Description</h6>
                <textarea
                  className="form-control input-group-lg "
                  type="text"
                  title="note"
                  placeholder="Enter Description"
                />
              </div>
            </div>
          </div>
          <h4 className="text-center mb-4 mt-4"> Pay Using</h4>
          <div className="form-check ">
            <div className="col-lg-12 mb-4 shadow">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body " style={{ marginLeft: "20px" }}>
                  <input
                    className="form-check-input "
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    onChange={() => handleshow("card")}
                  />
                  <h6 className="card-subtitle mt-0">Card</h6>
                </div>
              </div>
            </div>
            {showCard && (
              <div className="container border p-3 shadow mb-3">
                <div className="row">
                  <div className="col-lg-12  d-flex gap-3">
                    <div className=" PaymentType">
                      <input type="radio" name="Card_type" checked value="1" />
                      <span> 
                        <img src={card} alt="debit-card" />
                          Debit
                      </span>
                      <input type="radio" name="Card_type" value="2" style={{marginLeft: "10px"}} />
                      <span>
                        <img src={card} alt="credit-card" />
                          Credit
                      </span>
                  </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <input
                        className="form-control input-group-lg "
                        type="text"
                        placeholder="Card Number "
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <input
                        className="form-control input-group-lg "
                        type="text"
                        placeholder=" Expire Month"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <input
                        className="form-control input-group-lg "
                        type="text"
                        placeholder=" Expire Year (2020)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <input
                        className="form-control input-group-lg "
                        type="text"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-lg-12 mb-4 shadow">
              <div
                className="card"
                style={{
                  width: "100%",
                }}
              >
                <div className="card-body" style={{ marginLeft: "20px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    onChange={() => handleshow("netbanking")}
                  />
                  <h6 className="card-subtitle mt-0">Net Banking</h6>
                </div>
              </div>
            </div>
            {showNetBanking && (
              <div className="container border p-3 shadow mb-3">
                {
                  bankName.length !== 0 ? (
                    <>
                      <select
                        className="form-select form-select-lg"
                        aria-label="Default select example"
                        placeholder="select Bank"
                      >
                        <option value=""> Select Bank </option>
                        {bankName.map((item,index) => (
                          <option key={index} value={item.akontocode}>{item.title}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span style={{color: "#1caae8", fontWeight: "700"}}>
                      No Gateway Assigned For This Payment Mode
                    </span>
                  )
                }
              </div>
            )}

            <div className="col-lg-12 mb-4 shadow">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body" style={{ marginLeft: "20px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    onChange={() => handleshow("wallet")}
                  />
                  <h6 className="card-subtitle mt-0">Wallet</h6>
                </div>
              </div>
            </div>
            {showWallet && (
              <div className="container border p-3 shadow mb-3">
                {
                  bankName.length !== 0 ? (
                    <>
                      <select
                        className="form-select form-select-lg"
                        aria-label="Default select example"
                        placeholder="select Bank"
                      >
                        <option value=""> Select Bank </option>
                        {bankName.map((item,index) => (
                          <option key={index} value={item.akontocode}>{item.title}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span style={{color: "#1caae8", fontWeight: "700"}}>
                      No Gateway Assigned For This Payment Mode
                    </span>
                  )
                }
              </div>
            )}
            <div className="col-lg-12 mb-4 shadow">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body " style={{ marginLeft: "20px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    onChange={() => handleshow("upi")}
                  />
                  <h6 className="card-subtitle mt-0">UPI</h6>
                </div>
              </div>
            </div>
            {showUpi && (
              <div className="container border p-3 shadow mb-3">
                <input
                  className="form-control input-group-lg "
                  type="text"
                  placeholder=" Upi Id "
                />
              </div>
            )}
            <div className="col-lg-12 mb-4 shadow">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body " style={{ marginLeft: "20px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="Qrpay"
                    onChange={() => handleshow("Qrpay")}
                  />
                  <h6 className="card-subtitle mt-0">QR Pay</h6>
                </div>
              </div>
            </div>
            {showQrpay && (
              <div className="container border p-3 shadow mb-3">
                {
                  bankName.length !== 0 ? (
                    <>
                      <select
                        className="form-select form-select-lg"
                        aria-label="Default select example"
                        placeholder="select Bank"
                      >
                        <option value=""> Select Bank </option>
                        {bankName.map((item,index) => (
                          <option key={index} value={item.akontocode}>{item.title}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span style={{color: "#1caae8", fontWeight: "700"}}>
                      No Gateway Assigned For This Payment Mode
                    </span>
                  )
                }
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <input
                className="form-control input-group-lg "
                type="number"
                placeholder="Amount"
                name="amount"
                value={1050}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary mt-4 shadow"
                style={{ marginLeft: "46%" }}
                onClick={(e) => {
                  newBankPayment(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default ReactForm;
