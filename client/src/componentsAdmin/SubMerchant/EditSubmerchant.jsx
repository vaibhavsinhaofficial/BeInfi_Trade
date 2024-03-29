import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config/baseUrl';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const EditSubmerchant = ({ authUpdate, ID, ReadData }) => {
  
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [sec_key, setSec_key] = useState("")
    const [salt, setSalt] = useState("")
    const [percentage, setPercentage] = useState("")
    const [mid, setMid] = useState("")
    const [merchant_ids, setMerchant_ids] = useState("")
    
  
    const handleClickOpen = () => {
      setOpen(true);
      submerchantDetails(ID);
    };
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };
  
    const auth = localStorage.getItem("admin");
  
    const submerchantDetails = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(`
          ${baseUrl}/readOneSubmerchant`,
          {
            id: ID
          },
          config
        );
        setName(result.data.name)
        setMid(result.data.mid)
        setSec_key(result.data.sec_key)
        setPercentage(result.data.percentage)
        setSalt(result.data.salt)
        setMerchant_ids(result.data.merchant_ids)
        
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let values = {
            id: ID,
            name: name,
            mid: mid,
            sec_key: sec_key,
            salt: salt,
            percentage: percentage,
            merchant_ids: merchant_ids
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth}`,
            },
        };
  
        let result = await axios.post(`${baseUrl}/editSubmerchant`, values, config);
        toast.success(result.data.message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        ReadData()
        handleClose()
      } catch (error) {
        console.log(error);
      }
    };
  
  
    return (
      <>
        <div>
            {authUpdate ? (
              <button
                className="btn btn-success mt-3 mb-3 btn-sm"
                style={{width: "70px"}}
                onClick={handleClickOpen}
              >
                Edit
              </button>
            ) : null}
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
                    style={{ fontWeight: "700", fontSize: "20px" }}
                >
                    Edit Sub Merchant 
                </DialogTitle>
                <DialogContent>
                  <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Name" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Key</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Key" className="form-control mb-3" value={sec_key} onChange={(e) => setSec_key(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Salt</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Salt" className="form-control mb-3" value={salt} onChange={(e) => setSalt(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Percentage</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Percentage" className="form-control mb-3" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>MID</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="MID" className="form-control mb-3" value={mid} onChange={(e) => setMid(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Merchant ID's</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Merchant ID's" className="form-control mb-3" value={merchant_ids} onChange={(e) => setMerchant_ids(e.target.value)} />
                          </div>
                        </div>
                        <div>
                            <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} type="submit">Update</button>
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

export default EditSubmerchant