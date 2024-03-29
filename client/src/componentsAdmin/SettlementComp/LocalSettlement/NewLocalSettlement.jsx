import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import rupeeorange from "./imgs/rupeeorange.svg"
import rupeegreen from "./imgs/rupeegreen.svg"
import { useStateContext } from '../../../context/ContextProvider';
import axios from 'axios';
import baseUrl from '../../config/baseUrl';
import { toast } from 'react-toastify';

const NewLocalSettlement = ({ groupid }) => {
  
    const [open, setOpen] = useState(false);
    const { role } = useStateContext();
    const auth = localStorage.getItem("admin");
    const [merchant, setMerchant] = useState([]);
    const [currencyName, setCurrencyName] = useState([])
    let today = new Date(); 
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    const [settlementId, setSettlementId] = useState(Math.trunc(Math.random() * 1000000));
    const [user_id, setUser_id] = useState("");
    const [toCurrency, setToCurrency] = useState('');
    const [accountN, setAccountN] = useState('');
    const [bankName, setBankName] = useState('');
    const [account_name, setAccount_name] = useState('');
    const [branchName, setBranchName] = useState('');
    const [swift, setSwift] = useState('');
    const [timeOfReq, setTimeOfReq] = useState("");
    const [requestedAmount, setRequestedAmount] = useState("");
    const [fees, setFees] = useState("");
    const [authorizer, setAuthorizer] = useState('');
    const [availableBalance, setAvailableBalance] = useState("");
    const [remBalance, setRemBalance] = useState("");
    const [settlementAmount, setSettlementAmount] = useState("");
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
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
            let values = {
                id: val
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            };

            let result = await axios.post(`${baseUrl}/userSettlementWallet`,
                values,
                config
            );
            setAvailableBalance(result.data.data[0].wallet)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        ReadData();
        detailSettlement();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user_id || !toCurrency || !accountN || !bankName || !account_name || !branchName || !swift || !requestedAmount || !fees || !availableBalance) {
                setFormIncomplete(true);
                setErrorMessage("Please fill in all fields.");
                setTimeout(() => {
                  setFormIncomplete(false);
                  setErrorMessage("");
                }, 5000); 
                return;
            }
          let values={settlementId, user_id, toCurrency, accountN, bankName, branchName, account_name, requestedAmount, fees, swift, authorizer, timeOfReq, availableBalance, remBalance: (availableBalance - requestedAmount)}
          const config = {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
            },
          };
    
            let result = await axios.post(`${baseUrl}/requestLocalSettlement`, values, config);
            window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
  
    return (
      <>
        <div>
            {
                role === "-1" || role === "1" ? (
                    <button
                    className='btn btn btn-sm'
                    style={{
                        background: "#ff6600",
                        borderRadius: "30px",
                        color: "#fff",
                        width: "100px",
                        height: "36px",
                        cursor: "pointer"
                    }}
                    onClick={handleClickOpen}
                >
                    Add New
                </button>
                ) : (
                    <button
                    className='btn btn btn-sm'
                    style={{
                        background: "#008000",
                        borderRadius: "30px",
                        color: "#fff",
                        width: "100px",
                        height: "36px",
                        cursor: "pointer"
                    }}
                    onClick={handleClickOpen}
                >
                    Add New
                </button>
                )
            }
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
                    New Local Settlement Transaction
                </DialogTitle>
                <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
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
                                style={{ fontWeight: "700", color: "#000" }}
                            >
                                Merchant Name
                            </label>
                            <select
                                className="form-select form-select-sm mb-3 boldOption"
                                style={{backgroundColor: "#f2f2f2"}}
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
                                            {item.name}
                                            </option>
                                        );
                                    })
                                    :"Wait A while" 
                                }
                            </select>
                        </div>
                        <div className="col-md-3 d-flex flex-column text-center">
                        <label
                            htmlFor=""
                            className="forminputDeposite"
                            style={{ fontWeight: "700", color: "#000" }}
                        >
                            To Currency
                        </label>
                        <select className="form-select form-select-sm mb-3 boldOption"
                        style={{backgroundColor: "#f2f2f2"}} value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} >
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
                        <div className="col-md-3 d-flex flex-column text-center">
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
                        <hr style={{ width: "95%" }} />

                        <div className="col-md-3 d-flex flex-column text-center">
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
                        <div className="col-md-3 d-flex flex-column text-center">
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
                            Account Holder Name
                        </label>
                        <input 
                            type="text" 
                            className="input1" 
                            value={account_name}
                            onChange={(e) => setAccount_name(e.target.value)}
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
                        <hr style={{ width: "95%" }} />
                        
                        <div className="col-md-2 d-flex flex-column text-center">
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
                        <div className="col-md-2 d-flex flex-column text-center">
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
                        <div className="col-md-2 d-flex flex-column text-center">
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
                                // onChange={(e) => setAuthorizer(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-2 d-flex flex-column text-center">
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
                        <div className="col-md-2 d-flex flex-column text-center">
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
                                onChange={(e) => setTimeOfReq(e.target.value)}
                                disabled
                            />
                        </div>
                        <hr style={{ width: "95%" }} />

                        <div className="col-md-3">
                            {
                                role === "-1" || role === "1" ? (
                                    <div
                                        defaultValue="0"
                                        className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                        style={{background: "#ff6600"}}
                                    >
                                        <img
                                            src={rupeeorange}
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
                                                    requestedAmount && !fees ? requestedAmount : (requestedAmount && fees) ? (requestedAmount - fees) : 0
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            defaultValue="0"
                                            className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                                            style={{background: "#008000"}}
                                        >
                                            <img
                                                src={rupeegreen}
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
                                                        requestedAmount && !fees ? requestedAmount : (requestedAmount && fees) ? (requestedAmount - fees) : 0
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
                                                value={((availableBalance > 0) ? availableBalance : 0)}
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
                                            style={{background: "#008000"}}
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
                                                value={((availableBalance > 0) ? availableBalance : 0)}
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
                                                value={(availableBalance > 0 ? (availableBalance - requestedAmount) : 0)}
                                                onChange={(e) => setRemBalance(e.target.value)}
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
                                        style={{background: "#008000"}}
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
                                                value={(availableBalance > 0 ? (availableBalance - requestedAmount) : 0)}
                                                onChange={(e) => setRemBalance(e.target.value)}
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
                                        className="downloadDeposite px-4"
                                    >
                                        <img
                                            src="https://www.bankconnect.online/assets/merchants/img/send.png"
                                            alt=""
                                            width="25px"
                                            style={{marginRight: "10px"}}
                                        />{" "}
                                        Create
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        variant="primary"
                                        type="submit"
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
                                        className="downloadDeposite px-4"
                                    >
                                        <img
                                            src="https://www.bankconnect.online/assets/merchants/img/send.png"
                                            alt=""
                                            width="25px"
                                            style={{marginRight: "10px"}}
                                        />{" "}
                                        Create
                                    </button>
                                </>
                            )
                        }
                        </div>
                        {formIncomplete && (
                            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{errorMessage}</p>
                        )}
                    </form>
                    </div>
                </div>
                </DialogContent>
            </Dialog>
        </div>
      </>
    );
};

export default NewLocalSettlement