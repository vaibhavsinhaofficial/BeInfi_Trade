import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import orangeDollar from "../images/orangeDollar.svg"
import rupeeorange from "../images/rupeeorange.svg"

const MerchantView = ({ item }) => {
  
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
                    View Merchant 
                </DialogTitle>
                <DialogContent>
                  <div className="row">
                    <div className="col-12 swapBox">
                    <form className="row justify-content-around">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Merchant Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Merchant Name" className="form-control mb-3" value={item.name} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Sign Info</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Sign Info" className="form-control mb-3" value={item.sign_info} disabled />
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
                                <label className="merchantLabel">Transaction Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Transaction Status" className="form-control mb-3" value={item.payment_status} disabled />
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
                                <label className="merchantLabel">Tax Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Tax Amount" className="form-control mb-3" value={item.tax_amt} disabled />
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
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>GST Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="GST Amount" className="form-control mb-3" value={item.gst_charges} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Bank GST Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank GST Amount" className="form-control mb-3" value={item.our_bank_charge} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank Charges with GST</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Charges with GST" className="form-control mb-3" value={item.our_bank_charge_gst} disabled />
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
                                <label className="merchantLabel">Availabe Settle Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Availabe Settle Amount" className="form-control mb-3" value={item.settle_amount} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Redirect to</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Redirect to" className="form-control mb-3" value={item.redirection_url} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Status</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Status" className="form-control mb-3" value={ item.status === 0 ? "Failed" : item.status === 1 ? "Success" : item.status === 2 ? "Waiting" : item.status === 3 ? "Pending" : item.status === 4 ? "Refund" : "ChargeBack" } disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Endpoint URL</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Endpoint URL" className="form-control mb-3" value={item.end_point_url} disabled />
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
                                <label className="merchantLabel">User IP</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="User IP" className="form-control mb-3" value={item.i_ip} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Full Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Full Name" className="form-control mb-3" value={item.i_flname} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Email</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Email" className="form-control mb-3" value={item.i_email} disabled />
                            </div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Mobile No</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Mobile No" className="form-control mb-3" value={item.i_number} disabled />
                            </div>
                          </div>
                        </div><div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Request Date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Request Date" className="form-control mb-3" value={item.curl_request_date} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Update Date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Update Date" className="form-control mb-3" value={item.updated_on} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Billing Address</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Billing Address" className="form-control mb-3" value={item.bill_address} disabled />
                            </div>
                          </div>
                        </div><div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">State</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="State" className="form-control mb-3" value={item.i_state} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Country</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Country" className="form-control mb-3" value={item.i_country} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">ZIP</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="ZIP" className="form-control mb-3" value={item.i_zip} disabled />
                            </div>
                          </div>
                        </div><div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Merchant End Point Response</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Merchant End Point Response" className="form-control mb-3" value={item.merchant_db_response} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Bank Charges with GST</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Bank Charges with GST" className="form-control mb-3" value={item.our_bank_charge_gst} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Settlement date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Settlement date" className="form-control mb-3" value={item.settlement_on} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">RR date</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="RR date" className="form-control mb-3" value={item.rolling_reverse_on} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Transaction Type</label>
                            </div>
                            <div className="col-8">
                            <input type="text" placeholder="Transaction Type" className="form-control mb-3" value={item.trx_live_test === 1 ? "Live" : "Test"} disabled />
                            </div>
                          </div>
                        </div>
                        <div className="">
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

export default MerchantView