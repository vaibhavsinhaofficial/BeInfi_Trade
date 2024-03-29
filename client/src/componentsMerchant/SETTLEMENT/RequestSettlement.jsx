import React, { useState } from "react";
import CommonSettle from "./CommonSettle";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function RequestSettlement() {
  const [settlementId, setSettlementId] = useState(Math.trunc(Math.random() * 1000000));
  const [toCurrency, setToCurrency] = useState("");
  const [accountN, setAccountN] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [remBalance, setRemBalance] = useState(requestedAmount ? (availableBalance - requestedAmount) : availableBalance);
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("settlementId", settlementId);
      formData.append("toCurrency", toCurrency);
      formData.append("accountNumber", accountN);
      formData.append("bankName", bankName);
      formData.append("branchName", branchName);
      formData.append("available_balance", availableBalance);
      formData.append("requestedAmount", requestedAmount);
      formData.append("remBalance", (requestedAmount ? (availableBalance - requestedAmount) : availableBalance));
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/localrequestSettlement`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchant/Settlement");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-10">
          <h4 className="headingAll">Add New Local Settlement</h4>
        </div>
        <div className="col-2 text-end">
            <Link to="/bankconnect/merchant/Settlement">
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
      <CommonSettle
        settlementId={settlementId}
        setSettlementId={setSettlementId}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        accountN={accountN}
        setAccountN={setAccountN}
        bankName={bankName}
        setBankName={setBankName}
        branchName={branchName}
        setBranchName={setBranchName}
        availableBalance={availableBalance}
        setAvailableBalance={setAvailableBalance}
        requestedAmount = {requestedAmount}
        setRequestedAmount = {setRequestedAmount}
        remBalance = {remBalance}
        setRemBalance = {setRemBalance}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default RequestSettlement;
