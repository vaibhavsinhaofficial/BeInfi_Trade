import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "../../TransactionMod/images/orangeDollar.svg"
import rupeeorange from "../../TransactionMod/images/rupeeorange.svg"

const ViewPayouts = ({ item }) => {
  
    const [open, setOpen] = useState(false);
  
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
                className='btn btn-outline-primary btn-sm'
                onClick={handleClickOpen}
            >
                View
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={false}
                maxWidth={"md"}
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
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ fontWeight: "700", fontSize: "20px", textAlign: "center" }}
                >
                    View Sandbox Payout Transactions
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
                              <input type="text" placeholder="Merchant" className="form-control mb-3" value={`(${item.users_id}) ${item.name}`} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">AC Type</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="AC Type" className="form-control mb-3" value={item.trx_from === 0 ? "Nodel" : "Current"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Name" className="form-control mb-3" value={item.payout_bank === 1 ? "ICICI" : item.payout_bank === 2 ? "Gate8" : "YT Pay"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payout Id</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payout Id" className="form-control mb-3" value={item.uniqueid} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel mName">Customer Payout Id</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Customer Payout Id" className="form-control mb-3" value={item.customer_order_id} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Status" className="form-control mb-3" value={item.status === "FAILED" ?"Failed": item.status === "SUCCESS" ? "Success" : item.status === "WAITING" ? "Waiting" : item.status === "PENDING" ? "Pending" : item.status === "REFUND" ? "Refund" : "Chargeback"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Message</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Message" className="form-control mb-3" value={item.response} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">UTR</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="UTR" className="form-control mb-3" value={item.utrnumber} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">TRX Type</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="TRX Type" className="form-control mb-3" value={item.trx_type} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payee Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payee Name" className="form-control mb-3" value={item.payee_name} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Credit Account</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Credit Account" className="form-control mb-3" value={item.creditacc} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">IFSC</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="IFSC" className="form-control mb-3" value={item.ifsc} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Remark</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Remark" className="form-control mb-3" value={item.remark} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payout Charge</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payout Charge" className="form-control mb-3" value={item.akonto_charge} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">GST Charge</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="GST Charge" className="form-control mb-3" value={item.gst_amount} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank Charge</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Charge" className="form-control mb-3" value={item.bank_charges} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Wallet Deduct</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Wallet Deduct" className="form-control mb-3" value={item.wallet_deduct} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Currency</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Currency" className="form-control mb-3" value={item.currency} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Created On</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Created On" className="form-control mb-3" value={item.created_on} disabled />
                            </div>
                          </div>
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <div className="col-4">
                                    <label className="merchantLabel">Updated On</label>
                                </div>
                                <div className="col-8">
                                <input type="text" placeholder="Updated On" className="form-control mb-3" value={item.updated_on} disabled />
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <div className="col-4">
                                    <label className="merchantLabel">B Response</label>
                                </div>
                                <div className="col-8">
                                <input type="text" placeholder="B Response" className="form-control mb-3" value={item.bank_full_response} disabled />
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <div className="col-4">
                                    <label className="merchantLabel mName">Bank Encrypted Request Response</label>
                                </div>
                                <div className="col-8">
                                <input type="text" placeholder="Bank Encrypted Request Response" className="form-control mb-3" value={item.bank_encrypted_request_response} disabled />
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <div className="col-4">
                                    <label className="merchantLabel">Wallet Address</label>
                                </div>
                                <div className="col-8">
                                <input type="text" placeholder="Wallet Address" className="form-control mb-3" value={item.wallet_address} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="col-6"></div>
                        
                        <div>
                            {
                                item.currency === 'INR' ? (
                                    <>
                                        <div
                                            className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                            style={{background: "#ff6600", float: "right"}}
                                        >
                                            <img
                                                src={rupeeorange}
                                                alt=""
                                                width="35px"
                                            />
                                            <div className="mx-2">
                                                <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Total Amount</h6>
                                                <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff" }}>
                                                    {item.amount}
                                                </h6>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="dilogfirstbutton d-flex justify-content-center align-items-center"
                                        style={{background: "#ff6600", float: "right"}}
                                    >
                                        <img
                                            src={orangeDollar}
                                            alt=""
                                            width="35px"
                                        />
                                        <div className="mx-2">
                                            <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Total Amount</h6>
                                            <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff" }}>
                                                    {item.amount}
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

export default ViewPayouts