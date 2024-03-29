import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "./imgs/orangeDollar.svg"
import greendollar from "./imgs/greendollar.svg"
import { useStateContext } from '../../../context/ContextProvider';

const ViewInternational = ({ item, groupid }) => {
  
    const [open, setOpen] = useState(false);
    const { role } = useStateContext();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <div>
            <button
                className='btn btn-primary btn-sm mt-3 mb-3'
                onClick={handleClickOpen}
                style={{width: "50px"}}
            >
                View
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
                    View Local Settlement Transactions
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-12 swapBox">
                            <form action="" className="row justify-content-around">
                            <div className=" col-md-2 d-flex flex-column text-center">
                                <label htmlFor="" className="forminputDeposite">
                                Merchant ID
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.user_id}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label htmlFor="" className="forminputDeposite">
                                Merchant Name
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.merchant_name}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label htmlFor="" className="forminputDeposite">
                                Settlement Id
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.settlementId}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center">
                                <label htmlFor="" className="forminputDeposite">
                                Settlement Type
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.settlementType}
                                disabled
                                />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                From Currency
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.fromCurrency}
                                disabled
                                />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                To Currency
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.toCurrency}
                                disabled
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            
                            <div className=" col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Source
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.source}
                                disabled
                                />
                            </div>
                            <div className=" col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Settlement Mode
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={"International Settlement"}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Wallet Type
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.wallet_type}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Wallet Address
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.walletAddress}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Account Number
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.accountNumber}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Bank Name
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.bankName}
                                disabled
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Branch Name
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.branchName}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                City
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.city}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Country
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.country}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Zipcode
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.zip_code}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Exchange Rate
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.exchangeRate}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Requested Amount
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.requestedAmount}
                                disabled
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Settlement Fees
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.charges}
                                disabled
                                />
                            </div>
                            <div className="col-md-2 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Net Amount
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.net_amount_for_settlement}
                                disabled
                                />
                            </div>
                            <div className="col-md-4 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Requested Date
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.requested_time}
                                disabled
                                />
                            </div>
                            <div className="col-md-4 d-flex flex-column text-center  ">
                                <label htmlFor="" className="forminputDeposite">
                                Settlement Date
                                </label>
                                <input
                                type="text"
                                className="input1"
                                value={item.status === 1 ? item.settlement_time : "Not Yet Settled"}
                                disabled
                                />
                            </div>
                            <hr style={{ width: "95%" }} />

                            <div className="col-md-3">
                                {
                                role === "-1" || role === "1" ? (
                                    <>
                                    <div
                                        onClick={handleClose}
                                        className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                        style={{background: "#ff6600"}}
                                    >
                                        <img
                                        src={orangeDollar}
                                        alt=""
                                        width="35px"
                                        />
                                        <div className="mx-2">
                                        <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Settlement Amount</h6>
                                        <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff" }}>
                                            {item.settlementAmount}
                                        </h6>
                                        </div>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <div
                                        onClick={handleClose}
                                        className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                        style={{background: "#008000"}}
                                    >
                                        <img
                                        src={greendollar}
                                        alt=""
                                        width="35px"
                                        />
                                        <div className="mx-2">
                                        <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Settlement Amount</h6>
                                        <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff" }}>
                                            {item.settlementAmount}
                                        </h6>
                                        </div>
                                    </div>
                                    </>
                                )
                                }
                            </div>
                            <div className="col-md-8 d-flex align-items-center justify-content-end">
                                {
                                role === "-1" || role === "1" ? (
                                    <>
                                    <div>
                                        <span onClick={handleClose} className="dilogrefund mx-3" style={{background: "#ff6600", color: "#fff"}}>
                                        Close
                                        </span>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <div>
                                        <span onClick={handleClose} className="dilogrefund mx-3" style={{background: "#008800", color: "#fff"}}>
                                        Close
                                        </span>
                                    </div>
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

export default ViewInternational