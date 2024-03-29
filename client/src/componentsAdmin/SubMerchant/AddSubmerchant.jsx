import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config/baseUrl';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const AddSubmerchant = ({ authCreate, ReadData }) => {
  
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [sec_key, setSec_key] = useState("")
    const [salt, setSalt] = useState("")
    const [percentage, setPercentage] = useState("")
    const [mid, setMid] = useState("")
    const [merchant_ids, setMerchant_ids] = useState("")
  
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const auth = localStorage.getItem("admin");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!name || !mid || !sec_key || !salt || !percentage || !merchant_ids) {
          setFormIncomplete(true);
          setErrorMessage("Please fill in all fields.");
          setTimeout(() => {
            setFormIncomplete(false);
            setErrorMessage("");
          }, 5000); 
          return;
        }
        let values = {
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
  
        let result = await axios.post(`${baseUrl}/createSubmerchant`, values, config);
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
            {authCreate ? (
              <button
                style={{
                background: "#ff6600",
                borderRadius: "30px",
                color: "#fff",
                width: "100px",
                height: "36px",
                cursor: "pointer",
                }}
                onClick={handleClickOpen}
              >
                Add New
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
                    New MID
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
                              <input type="text" placeholder="Name" className="form-control mb-3" onChange={(e) => setName(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Key</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Key" className="form-control mb-3" onChange={(e) => setSec_key(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Salt</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Salt" className="form-control mb-3" onChange={(e) => setSalt(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Percentage</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Percentage" className="form-control mb-3" onChange={(e) => setPercentage(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>MID</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="MID" className="form-control mb-3" onChange={(e) => setMid(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Merchant ID's</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Merchant ID's" className="form-control mb-3" onChange={(e) => setMerchant_ids(e.target.value)} />
                            </div>
                          </div>
                          <div>
                              <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} type="submit">Create</button>
                          </div>
                          {formIncomplete && (
                            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
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

export default AddSubmerchant