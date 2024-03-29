import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "../images/orangeDollar.svg"
import rupeeorange from "../images/rupeeorange.svg"

const ViewMerchantPayout = ({ item }) => {
  
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
                className="btn btn-secondary mt-3 mb-3 btn-sm"
                style={{width: "70px"}}
                onClick={handleClickOpen}
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
                    View Merchant Payout
                </DialogTitle>
                <DialogContent>
                  <div className="row">
                    <div className="col-12 swapBox">
                    <form className="row justify-content-around">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Account Type</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Account Type" className="form-control mb-3" value={item.trx_from === 0 ? 'Nodel' : 'Current'} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank" className="form-control mb-3" value={item.payout_bank === 1 ? 'ICICI' : item.payout_bank === 2 ? 'Gate8' : 'YT Pay'} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Payout ID</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payout ID" className="form-control mb-3" value={item.uniqueid} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Customer Payout ID</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Customer Payout ID" className="form-control mb-3" value={item.payout_json_id} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Merchant Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Merchant Name" className="form-control mb-3" value={`(${item.users_id}) ${item.name}`} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Status" className="form-control mb-3" value={item.status} disabled />
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
                                <label className="merchantLabel">UTR Number</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="UTR Number" className="form-control mb-3" value={item.utrnumber} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Trx. Type</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Trx. Type" className="form-control mb-3" value={item.trx_type} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Payee Name</label>
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
                                <label className="merchantLabel">IFSC Code</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="IFSC Code" className="form-control mb-3" value={item.ifsc} disabled />
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
                                <label className="merchantLabel">Payout Charges</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Payout Charges" className="form-control mb-3" value={item.akonto_charge} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Gst Charge</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Gst Charge" className="form-control mb-3" value={item.gst_amount} disabled />
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
                                <label className="merchantLabel">B Response</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="B Response" className="form-control mb-3" value={item.i_number} disabled />
                            </div>
                          </div>
                        </div><div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">B Enc Req Res</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="B Enc Req Res" className="form-control mb-3" value={item.bank_full_response} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">B Enc Req Res</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="B Enc Req Res" className="form-control mb-3" value={item.bank_encrypted_request_response} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Wallet Address</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Wallet Address" className="form-control mb-3" value={item.wallet_address} disabled />
                            </div>
                          </div>
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
                                                <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Payout Amount</h6>
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
                                            <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Payout Amount</h6>
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

export default ViewMerchantPayout