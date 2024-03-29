import React, { useState } from "react";
import CommonInternational from "./CommonInternational";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function RequestTeamInternational() {
  const [settlementId, setSettlementId] = useState(Math.trunc(Math.random() * 1000000));
  const [settleType, setSettleType] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [walletAdd, setWalletAdd] = useState("");
  const [accountN, setAccountN] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [net_amount_for_settlement, setNet_amount_for_settlement] = useState(requestedAmount);
  const [remBalance, setRemBalance] = useState(availableBalance - requestedAmount);
  const [swift, setSwift] = useState("");
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      if(settleType === 'CRYPTO'){
        formData.append("settlementId", settlementId);
        formData.append("settlementType", settleType);
        formData.append("fromCurrency", fromCurrency);
        formData.append("toCurrency", toCurrency);
        formData.append("walletAddress", walletAdd);
        formData.append("accountNumber", accountN);
        formData.append("bankName", bankName);
        formData.append("city", city);
        formData.append("branchName", branchName);
        formData.append("country", country);
        formData.append("zip_code", zipcode);
        formData.append("available_balance", availableBalance);
        formData.append("requestedAmount", requestedAmount);
        formData.append("net_amount_for_settlement", requestedAmount);
        formData.append("remBalance", (availableBalance - requestedAmount));
        formData.append("swiftCode", swift);
      } else {
        formData.append("settlementId", settlementId);
        formData.append("settlementType", settleType);
        formData.append("fromCurrency", fromCurrency);
        formData.append("toCurrency", toCurrency);
        formData.append("accountNumber", accountN);
        formData.append("bankName", bankName);
        formData.append("city", city);
        formData.append("branchName", branchName);
        formData.append("country", country);
        formData.append("zip_code", zipcode);
        formData.append("available_balance", availableBalance);
        formData.append("requestedAmount", requestedAmount);
        formData.append("net_amount_for_settlement", requestedAmount);
        formData.append("remBalance", (availableBalance - requestedAmount));
        formData.append("swiftCode", swift);
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/requestInternationalSettlement`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchant/TeamInternationalSettlement");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-10">
          <h4 className="headingAll">Add New International Settlement</h4>
        </div>
        <div className="col-2 text-end">
            <Link to="/bankconnect/merchant/TeamInternationalSettlement">
              <button
                style={{
                  background: "rgb(30, 170, 231)",
                  borderRadius: "30px",
                  color: "#fff",
                  width: "100px",
                  height: "36px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </Link>
        </div>
      </div>
      <CommonInternational
        settlementId={settlementId}
        setSettlementId={setSettlementId}
        settleType={settleType}
        setSettleType={setSettleType}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        walletAdd={walletAdd}
        setWalletAdd={setWalletAdd}
        accountN={accountN}
        setAccountN={setAccountN}
        bankName={bankName}
        setBankName={setBankName}
        branchName={branchName}
        setBranchName={setBranchName}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        zipcode={zipcode}
        setZipcode={setZipcode}
        availableBalance={availableBalance}
        setAvailableBalance={setAvailableBalance}
        requestedAmount = {requestedAmount}
        setRequestedAmount = {setRequestedAmount}
        net_amount_for_settlement={net_amount_for_settlement}
        setNet_amount_for_settlement = {setNet_amount_for_settlement}
        remBalance = {remBalance}
        setRemBalance = {setRemBalance}
        swift={swift}
        setSwift={setSwift}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default RequestTeamInternational;
