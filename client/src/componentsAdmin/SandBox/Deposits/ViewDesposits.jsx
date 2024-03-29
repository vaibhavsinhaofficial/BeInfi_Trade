import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "../../TransactionMod/images/orangeDollar.svg"
import rupeeorange from "../../TransactionMod/images/rupeeorange.svg"

const ViewDeposits = ({ item }) => {
  
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
                    View Sandbox Deposit Transactions
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
                              <input type="text" placeholder="Merchant" className="form-control mb-3" value={`(${item.user_id}) ${item.name}`} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">MOrder No</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="MOrder No" className="form-control mb-3" value={item.txn_id} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Order No</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Order No" className="form-control mb-3" value={item.order_no} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Transaction Id</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Transaction Id" className="form-control mb-3" value={item.transaction_id} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Pay By</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Pay By" className="form-control mb-3" value={item.payment_type} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payment Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payment Status" className="form-control mb-3" value={item.payment_status} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Currency</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Currency" className="form-control mb-3" value={item.ammount_type} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payin Charges</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payin Charges" className="form-control mb-3" value={item.payin_charges} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Bank GST Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank GST Amount" className="form-control mb-3" value={item.our_bank_charge_gst} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Bank Charges</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Charges" className="form-control mb-3" value={item.our_bank_charge} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">RR Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="RR Amount" className="form-control mb-3" value={item.rolling_reverse_amount} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Settle Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settle Amount" className="form-control mb-3" value={item.settle_amount} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Status" className="form-control mb-3" value={item.status === 0 ?"Failed": item.status === 1 ? "Success" : item.status === 2 ? "Waiting" : item.status === 3 ? "Pending" : item.status === 4 ? "Refund" : "Chargeback"} disabled />
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
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Updated On</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Updated On" className="form-control mb-3" value={item.updated_on} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">GST Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="GST Amount" className="form-control mb-3" value={item.gst_charges} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Gateway No</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Gateway No" className="form-control mb-3" value={item.gatewayNumber} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">End Point URL</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="End Point URL" className="form-control mb-3" value={item.end_point_url} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Redirect URL</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Redirect URL" className="form-control mb-3" value={item.redirection_url} disabled />
                            </div>
                          </div>
                        </div>
                        <div className='col-6'>

                        </div>
                        <div>
                            {
                                item.ammount_type === 'INR' ? (
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
                                                    {item.ammount}
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
                                                    {item.ammount}
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

export default ViewDeposits