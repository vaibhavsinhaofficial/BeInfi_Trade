import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import rupee from './rupee.svg'

function CommonSettle({
  settlementId,
  setSettlementId,
  toCurrency,
  setToCurrency,
  accountN,
  setAccountN,
  bankName,
  setBankName,
  branchName,
  setBranchName,
  availableBalance,
  setAvailableBalance,
  requestedAmount,
  setRequestedAmount,
  remBalance,
  setRemBalance,
  handleSubmit,
  buttonText,
}) {
    const auth = localStorage.getItem("user");
    const [currency, setCurrency] = useState([])

      useEffect(() => {
        detailSettlement();
      }, []);

      const detailSettlement = async() => {
        try{
        let formData = new FormData();
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(
            `${baseUrl}/userTeamWallet`,
            formData,
            config
          );
          setAvailableBalance(result.data.data[0].wallet)
          setCurrency(result.data.currencyResult)
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
        <div className="row">
            <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Settlement ID
                    </label>
                    <input
                        type="text"
                        className="input1"
                        value={settlementId}
                        disabled
                    />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000", textAlign: "left", marginLeft: "30px" }}
                    >
                        To Currency
                    </label>
                    <select className="form-select form-select-sm mb-3 boldOption" value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                        <option> Select</option>
                        {currency.map((item, index) => (
                            <option value={item.sortname}>{item.sortname}</option>
                        ))}
                    </select>
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        Account Number
                        </label>
                        <input 
                            type="text" 
                            className="input1" 
                            value={accountN}
                            onChange={(e) => setAccountN(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        Bank Name
                        </label>
                        <input 
                            type="text" 
                            className="input1" 
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)} 
                        />
                    </div>
                    <hr style={{ width: "95%" }} />

                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        Branch Name
                        </label>
                        <input 
                            type="text" 
                            className="input1" 
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Available Balance
                    </label>
                    <input 
                        type="text" 
                        className="input1" 
                        value={availableBalance}
                        onChange={(e) => setAvailableBalance(e.target.value)}
                    />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Requested Amount
                    </label>
                    <input
                        type="text" 
                        className="input1" 
                        value={requestedAmount}
                        onChange={(e) => setRequestedAmount(e.target.value)} 
                    />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Remaining Balance
                    </label>
                    <input 
                        type="text" 
                        className="input1" 
                        value={requestedAmount ? availableBalance - requestedAmount : availableBalance}
                        onChange={(e) => setRemBalance(e.target.value)}
                    />
                    </div>
                    <hr style={{ width: "95%" }} />

                    <div className="col-md-3">
                        <div
                            defaultValue="0"
                            className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                        >
                            <img
                                src={rupee}
                                alt=""
                                width="35px"
                            />
                            <div className="mx-2 w-100">
                                <h6
                                    style={{
                                    color: "#000009",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    }}
                                >
                                    Settlement Amount
                                </h6>
                                <h6
                                    style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    }}
                                >
                                    {
                                        requestedAmount ? requestedAmount : 0
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 d-flex align-items-center justify-content-end">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{
                                borderRadius: "50px",
                                marginTop: "20px",
                                color: "#fff",
                                background: "#1EAAE7",
                                display: "flex",
                                marginLeft: "auto",
                                width: "120px",
                                height: "40px"
                            }}
                            className="downloadDeposite px-4"
                        >
                        <img
                            src="https://www.bankconnect.online/assets/merchants/img/send.png"
                            alt=""
                            width="25px"
                            style={{marginRight: "10px"}}
                        />{" "}
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </div> 
    </>
  );
}

export default CommonSettle;
