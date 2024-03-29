import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "./imgs/orangeDollar.svg"
import greenDollar from "./imgs/greendollar.svg"
import axios from 'axios';
import baseUrl from '../../config/baseUrl';
import { useStateContext } from '../../../context/ContextProvider';

const EditInternationalSettlement = ({ groupid, ID }) => {
  
    const [open, setOpen] = React.useState(false);
    const { role } = useStateContext();
    const [merchant, setMerchant] = useState([]);
    const [currencyName, setCurrencyName] = useState([])
    const [settlementId, setSettlementId] = useState("");
    const [user_id, setUser_id] = useState("");
    const [settlementType, setSettlementType] = useState("");
    const [currency, setCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("USDT");
    const [availableBalance, setAvailableBalance] = useState("");
    const [requestedAmount, setRequestedAmount] = useState("");
    const [fees, setFees] = useState("");
    const [net_amount_for_settlement, setNet_amount_for_settlement] = useState(requestedAmount - (requestedAmount*fees/100));
    const [exchangeRate, setExchangeRate] = useState("");
    const [accountN, setAccountN] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [swift, setSwift] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [account_name, setAccount_name] = useState("");
    const [walletAdd, setWalletAdd] = useState("");
    const [timeOfReq, setTimeOfReq] = useState("");
    const [authorizer, setAuthorizer] = useState("");
    const [wallet_type, setWallet_type] = useState("");
    const [settlementAmount, setSettlementAmount] = useState("");
    const auth = localStorage.getItem("admin");
    let today = new Date(); 
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    
  
    const handleClickOpen = () => {
      setOpen(true);
      fetchData(ID);
    };
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };
  
  
    const fetchData = async () => {
        try {
            let values={id: ID}
            const config = {
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth}`,
                },
            };
            let result = await axios.post(
                `${baseUrl}/getLocalData`,
                values,
                config
            );
            setSettlementId(result.data.data[0].settlementId);
            setUser_id(result.data.data[0].user_id);
            setSettlementType(result.data.data[0].settlementType);
            setCurrency(result.data.data[0].fromCurrency);
            setToCurrency(result.data.data[0].toCurrency);
            setWallet_type(result.data.data[0].wallet_type);
            setAvailableBalance(result.data.data[0].available_balance);
            setRequestedAmount(result.data.data[0].requestedAmount);
            setNet_amount_for_settlement(result.data.data[0].net_amount_for_settlement);
            setExchangeRate(result.data.data[0].exchangeRate);
            setAccountN(result.data.data[0].accountNumber);
            setBankName(result.data.data[0].bankName);
            setBranchName(result.data.data[0].branchName);
            setCity(result.data.data[0].city);
            setCountry(result.data.data[0].country);
            setSwift(result.data.data[0].swiftCode);
            setZipcode(result.data.data[0].zip_code);
            setAccount_name(result.data.data[0].account_name)
            setWalletAdd(result.data.data[0].walletAddress);
            setTimeOfReq(result.data.data[0].requested_time);
            setAuthorizer(result.data.data[0].source);
            setFees(result.data.data[0].charges);
            setSettlementAmount(result.data.data[0].settlementAmount);
        }   catch (error) {
            console.log(error);
        }
    };

    const ReadData = async () => {
        try {
          let formData = new FormData();
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(
            `${baseUrl}/allMerchant`,
            formData,
            config
          );
          let result1 = await axios.post(
            `${baseUrl}/allCurrency`,
            formData,
            config
          );
          setMerchant(result.data.Data)
          setCurrencyName(result1.data.Data);
        } catch (error) {
          console.log(error);
        }
    };

    const detailSettlement = async(val) => {
        try{
            let formData = new FormData();
            formData.append("id", val);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${auth}`,
                },
            };

            let result = await axios.post(`${baseUrl}/userSettlementWallet`,
                formData,
                config
            );
            setAvailableBalance(result.data.data[0].wallet)
        } catch (error) {
            console.log(error);
        }
    };

    const settlementExchangeRate = async(val) => {
        try{
            let formData = new FormData();
            formData.append("currency", currency)
            formData.append("tocurrency", val)
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${auth}`,
                },
            };
    
            let result = await axios.post(
                `${baseUrl}/userExchangeRate`,
                formData,
                config
            );
            setExchangeRate(result.data.data[0].rate)
        }   catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        ReadData();
        detailSettlement();
        settlementExchangeRate();
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          let values={id: ID, settlementId, user_id, settlementType, currency, toCurrency, availableBalance, requestedAmount, fees, net_amount_for_settlement,exchangeRate, accountN, bankName, city, branchName, country, swift, zipcode, account_name, walletAdd, authorizer, settlementAmount}
          const config = {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(`${baseUrl}/editInternational`, values, config);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };
  
  
    return (
      <>
        <div>
            <button
                className="btn btn-secondary btn-sm mb-3"
                style={{width: "50px"}}
                onClick={handleClickOpen}
            >
                Edit
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={false}
                maxWidth={"lg"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                  style: {
                    top: "0",
                    margin: "0",
                    borderRadius: "30px",
                  },
                }}
            >
                {
                    role === "-1" || role === "1" ? (
                        <button
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: '#ff6600',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '32px',
                                height: '32px',
                            }}
                            onClick={handleClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    ) : (
                        <button
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: '#008000',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '32px',
                                height: '32px',
                            }}
                            onClick={handleClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )
                }
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ fontWeight: "700", fontSize: "20px", textAlign: "center" }}
                >
                    Edit International Settlement Transaction
                </DialogTitle>
                <DialogContent>
                <div className="row">
                    <div className="col-12 dialogBlock1">
                        <form action="" className="row justify-content-around" onSubmit={(e)=>handleSubmit(e)}>
                            <div className=" col-md-2 d-flex flex-column text-center">
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
                            <div className=" col-md-2 d-flex flex-column text-center">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    Merchant Name
                                </label>
                                <select
                                    className="form-select form-select-sm mb-3 boldOption"
                                    requiredz
                                    value={user_id}
                                    onChange={(e)=>{detailSettlement(e.target.value); setUser_id(e.target.value)}}
                                >
                                    <option className="" value={null}>
                                    Select Merchant
                                    </option>
                                    {
                                        merchant.length > 0 ? merchant.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.id}>
                                                {item.id}&nbsp;{item.name}
                                                </option>
                                            );
                                        })
                                        :"Wait A while" 
                                    }
                                </select>
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    Settlement Type
                                </label>
                                <select
                                    className="form-select form-select-sm mb-3 boldOption"
                                    required
                                    value={settlementType}
                                    onChange={(e)=>setSettlementType(e.target.value)}
                                >
                                    <option className="" value={null} >
                                    Select
                                    </option>
                                    <option value="FIAT">FIAT</option>
                                    <option value="CRYPTO">CRYPTO</option>
                                </select>
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    From Currency
                                </label>
                                <select className="form-select form-select-sm mb-3 boldOption" style={{textAlign: "center"}} value={currency} onChange={(e) => {setCurrency(e.target.value)}} >
                                    <option selected>Select Currency</option>
                                    {
                                        currencyName.map((item, index) => {
                                        return (
                                            <option key={index} value={item.sortname}>
                                                {item.sortname}
                                            </option>
                                        );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    To Currency
                                </label>
                                <select className="form-select form-select-sm mb-3 boldOption" style={{textAlign: "center"}} value={toCurrency} onChange={(e) => {settlementExchangeRate(e.target.value); setToCurrency(e.target.value)}} > 
                                    <option selected>Select Currency</option>
                                    {
                                        currencyName.map((item, index) => {
                                        return (
                                            <option key={index} value={item.sortname}>
                                                {item.sortname}
                                            </option>
                                        );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                Wallet Address
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={walletAdd}
                                onChange={(e) => setWalletAdd(e.target.value)}
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-2 d-flex flex-column text-center">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    Wallet Type
                                </label>
                                <select
                                    className="form-select form-select-sm mb-3 boldOption"
                                    required
                                    value={wallet_type}
                                    onChange={(e)=>setWallet_type(e.target.value)}
                                    style={{marginLeft: "35px"}}
                                >
                                    <option className="" value={null} >
                                    Select
                                    </option>
                                    <option value="ERC 20">ERC 20</option>
                                    <option value="TRC 20">TRC 20</option>
                                </select>
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center  ">
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
                            <div className=" col-md-2 d-flex flex-column text-center  ">
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
                            <div className="col-md-2 d-flex flex-column text-center  ">
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
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                City
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)} 
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                Country
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)} 
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                ZipCode
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)} 
                                />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center">
                            <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                            >
                                Account Holder Name
                            </label>
                            <input 
                                type="text" 
                                className="input1" 
                                value={account_name}
                                onChange={(e) => setAccount_name(e.target.value)}
                            />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center">
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
                            <div className=" col-md-2 d-flex flex-column text-center">
                            <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                            >
                                Charges & Fees (%)
                            </label>
                            <input 
                                type="text" 
                                className="input1" 
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                            />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                SWIFT CODE/SEPA
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={swift}
                                    onChange={(e) => setSwift(e.target.value)} 
                                />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center  ">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    Exchange Rate
                                </label>
                                <input
                                    type="text" 
                                    className="input1" 
                                    value= {exchangeRate}
                                    onChange={(e) => setExchangeRate(e.target.value)}
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                Net Amount For Settlement
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={requestedAmount && !fees ? requestedAmount : (requestedAmount && fees) ? (requestedAmount - fees) : ""}
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                htmlFor=""
                                className="forminputDeposite"
                                style={{ fontWeight: "700", color: "#000" }}
                                >
                                Authorizer
                                </label>
                                <input 
                                    type="text" 
                                    className="input1" 
                                    value={authorizer}
                                    onChange={(e) => setAuthorizer(e.target.value)} 
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label
                                    htmlFor=""
                                    className="forminputDeposite"
                                    style={{ fontWeight: "700", color: "#000" }}
                                >
                                    Requested Time
                                </label>
                                <input
                                    type="text" 
                                    className="input1" 
                                    value= {dateTime}
                                    disabled
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-3">
                                {
                                    role === "-1" || role === "1" ? (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#ff6600"}}
                                            >
                                                <img
                                                    src={orangeDollar}
                                                    alt=""
                                                    width="35px"
                                                />
                                                <div className="mx-2 w-100">
                                                    <h6
                                                        style={{
                                                        color: "#fff",
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
                                                        color: "#fff"
                                                        }}
                                                    >
                                                        {
                                                            requestedAmount && !fees && !exchangeRate ? requestedAmount : (requestedAmount && fees && !exchangeRate) ? (requestedAmount - fees) : (requestedAmount && fees && exchangeRate) ? ((requestedAmount - fees)/exchangeRate) : 0
                                                        }
                                                    </h6>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#008800"}}
                                            >
                                                <img
                                                    src={greenDollar}
                                                    alt=""
                                                    width="35px"
                                                />
                                                <div className="mx-2 w-100">
                                                    <h6
                                                        style={{
                                                        color: "#fff",
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
                                                        color: "#fff"
                                                        }}
                                                    >
                                                        {
                                                            requestedAmount && !fees && !exchangeRate ? requestedAmount : (requestedAmount && fees && !exchangeRate) ? (requestedAmount - fees) : (requestedAmount && fees && exchangeRate) ? ((requestedAmount - fees)/exchangeRate) : 0
                                                        }
                                                    </h6>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="col-md-3">
                                {
                                    role === "-1" || role === "1" ? (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#ff6600"}}
                                            >
                                                <div className="mx-2 w-200">
                                                <label
                                                    className='localLabel'
                                                    style={{ fontWeight: "700", color: "#fff", marginLeft: "45px" }}
                                                >
                                                    Available Balance
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="input1" 
                                                    value={((availableBalance > 0) ? availableBalance : "0")}
                                                    onChange={(e) => setAvailableBalance(e.target.value)}
                                                    style={{color: "#fff"}}
                                                    disabled
                                                />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#008800"}}
                                            >
                                                <div className="mx-2 w-200">
                                                <label
                                                   className='localLabel'
                                                    style={{ fontWeight: "700", color: "#fff", marginLeft: "45px" }}
                                                >
                                                    Available Balance
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="input1" 
                                                    value={((availableBalance > 0) ? availableBalance : "0")}
                                                    onChange={(e) => setAvailableBalance(e.target.value)}
                                                    style={{color: "#fff"}}
                                                    disabled
                                                />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="col-md-3">
                                {
                                    role === "-1" || role === "1" ? (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#ff6600"}}
                                            >
                                                <div className="mx-2 w-100">
                                                    <label
                                                        className='localLabel'
                                                        style={{ fontWeight: "700", color: "#fff", marginLeft: "45px" }}
                                                    >
                                                        Unsettled Amount
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="input1" 
                                                        value={(availableBalance > 0 ? (availableBalance - requestedAmount) : "0")}
                                                        style={{color: "#fff"}}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                defaultValue="0"
                                                className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                                style={{background: "#008800"}}
                                            >
                                                <div className="mx-2 w-100">
                                                    <label
                                                        className='localLabel'
                                                        style={{ fontWeight: "700", color: "#fff", marginLeft: "45px" }}
                                                    >
                                                        Unsettled Amount
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="input1" 
                                                        value={(availableBalance > 0 ? (availableBalance - requestedAmount) : "0")}
                                                        style={{color: "#fff"}}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end">
                                {
                                    role === "-1" || role === "1" ? (
                                        <>
                                            <button
                                                className='btn btn btn-sm'
                                                style={{
                                                    borderRadius: "50px",
                                                    marginTop: "20px",
                                                    color: "#fff",
                                                    background: "#ff6600",
                                                    display: "flex",
                                                    marginLeft: "auto",
                                                    width: "120px",
                                                    height: "40px"
                                                }}
                                            >
                                            <img
                                                src="https://www.bankconnect.online/assets/merchants/img/send.png"
                                                alt=""
                                                width="25px"
                                                style={{marginRight: "10px"}}
                                            />{" "}
                                                Update
                                            </button>
                                        </>
                                ) : (
                                        <>
                                            <button
                                                className='btn btn btn-sm'
                                                style={{
                                                    borderRadius: "50px",
                                                    marginTop: "20px",
                                                    color: "#fff",
                                                    background: "#008000",
                                                    display: "flex",
                                                    marginLeft: "auto",
                                                    width: "120px",
                                                    height: "40px"
                                                }}
                                            >
                                            <img
                                                src="https://www.bankconnect.online/assets/merchants/img/send.png"
                                                alt=""
                                                width="25px"
                                                style={{marginRight: "10px"}}
                                            />{" "}
                                                Update
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
                </DialogContent>
            </Dialog>
        </div>
      </>
    );
};

export default EditInternationalSettlement