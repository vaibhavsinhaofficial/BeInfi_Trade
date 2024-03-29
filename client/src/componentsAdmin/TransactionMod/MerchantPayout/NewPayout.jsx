import React, { useEffect, useState } from 'react'
import baseUrl from '../../config/baseUrl';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function NewPayout({ReadData, authCreate}) {
    const [open, setOpen] = React.useState(false);
    const [user_id, setUser_id] = useState("");
    const [type, setType] = useState("")
    const [uniqueId, setUniqueId] = useState("")
    const [currencyID, setCurrencyID] = useState("")
    const [payee_name, setPayee_name] = useState("")
    const [amount, setAmount] = useState("")
    const [data, setData] = useState([]);
    const [pass, setPass] = useState([]);
  
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
  
    };
  
    const details = async () => {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(`${baseUrl}/allMerchant`,config);
        setData(result.data.Data);
       
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      details();
    }, []);
  
    const MerchantCurrency = async(val)=>{  
      try{
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let formData = new FormData();
          formData.append("id", val);
        let cur = await axios.post(`${baseUrl}/getCurrencyMT`, formData, config)
  
        setPass(cur.data.data);
      
      } catch(error){
          console.log(error);
      }
    }
  
    const auth = localStorage.getItem("admin");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!user_id || !type || !uniqueId || !currencyID || !payee_name || !amount) {
          setFormIncomplete(true);
          setErrorMessage("Please fill in all fields.");
          setTimeout(() => {
            setFormIncomplete(false);
            setErrorMessage("");
          }, 5000); 
          return;
        }
        let values = {
          merchantId: user_id,
          currency_id: currencyID,
          trx_type: type,
          transaction_id: uniqueId,
          name: payee_name,
          amount: amount
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };
  
        let result = await axios.post(`${baseUrl}/createMT`, values, config);
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
                  float: "right"
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
                    New Payout Transaction
                </DialogTitle>
                <DialogContent>
                  <div className="row">
                      <div className="col-12 swapBox">
                        <form className="row justify-content-around"  onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-4">
                                <label>Merchant</label>
                            </div>
                            <div className="col-8">
                              <select className="form-select" value={user_id} onChange={(e)=>{MerchantCurrency(e.target.value);setUser_id(e.target.value)}}>
                                <option value="select name">Select Merchant</option>
                                {
                                  data?.map((item,index)=>{
                                  return(
                                    <option key={index} value={item.id}>
                                    {item.name}
                                    </option>
                                  );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Currency</label>
                            </div>
                            <div className="col-8">
                              <select className="form-select" value={currencyID} onChange={(e)=>setCurrencyID(e.target.value)}>
                                <option value="-1">Select Currency</option>
                                {
                                  pass?.map((item,index)=>{
                                    return(
                                      <option key={index} value={item.currencyID}>
                                        {item.sortname}
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Trx. Type</label>
                            </div>
                            <div className="col-8">
                              <select className="form-select" value={type} onChange={(e)=>setType(e.target.value)}>
                                <option value="-1">Select Trx. Type</option>
                                <option value="CASH">Cash</option>
                                <option value="CRYPTO">Crypto</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Transaction Id</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Transaction Id" className="form-control mb-3" onChange={(e) => setUniqueId(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Name" className="form-control mb-3" onChange={(e) => setPayee_name(e.target.value)} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                                <label>Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Amount" className="form-control mb-3" onChange={(e) => setAmount(e.target.value)} />
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
}

export default NewPayout