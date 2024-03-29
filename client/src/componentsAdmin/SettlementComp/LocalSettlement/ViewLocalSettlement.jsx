import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import rupeeorange from "./imgs/rupeeorange.svg"
import rupeegreen from "./imgs/rupeegreen.svg"
import { useStateContext } from '../../../context/ContextProvider';

const ViewLocalSettlement = ({ item, groupid }) => {
  
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
                      <form className="row justify-content-around">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Merchant</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Merchant" className="form-control mb-3" value={`(${item.user_id}) ${item.merchant_name}`} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Settlement Id</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settlement Id" className="form-control mb-3" value={item.settlementId} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Currency</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Currency" className="form-control mb-3" value={item.toCurrency} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Settlement Type</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settlement Type" className="form-control mb-3" value={"Local Settlement"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Source</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Source" className="form-control mb-3" value={item.source} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Account Number</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Account Number" className="form-control mb-3" value={item.accountNumber} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Name" className="form-control mb-3" value={item.bankName} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Branch Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Branch Name" className="form-control mb-3" value={item.branchName} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Settlement Fees</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settlement Fees" className="form-control mb-3" value={item.charges} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Requested Date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Requested Date" className="form-control mb-3" value={item.requested_time} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Settlement Date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settlement Date" className="form-control mb-3" value={item.settlement_time} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Authorizer</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Authorizer" className="form-control mb-3" value={item.authorizer} disabled />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                        {
                          role === "-1" || role === "1" ? (
                            <>
                                <div
                                onClick={handleClose}
                                className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                style={{background: "#ff6600", float: "right"}}
                                >
                                <img
                                    src={rupeeorange}
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
                                <div
                                onClick={handleClose}
                                className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                style={{background: "#008000", float: "right"}}
                                >
                                <img
                                    src={rupeegreen}
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

export default ViewLocalSettlement