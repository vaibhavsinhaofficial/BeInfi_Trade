import axios from 'axios';
import React, { useEffect, useState } from 'react'
import baseUrl from '../config/baseUrl';
import { toast } from 'react-toastify';

function SinglePayout() {
  const [choosedCurrency, setChoosedCurrency] = useState([])
  const [bankcodes, setBankcodes] = useState([])
  const [wallet_amount, setWallet_amount] = useState("")
  
  const [transaction_id, setTransaction_id] = useState("")
  const [currency, setCurrency] = useState("")
  const [amount, setAmount] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accontNumber, setAccountNumber] = useState("")
  const [selectedBankcodes, setSelectedBankcodes] = useState("")
  const [branch, setBranch] = useState("")
  const [type, setType] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [notes, setNotes] = useState("")

  const ReadData = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios
        .post(`${baseUrl}/singlePayoutCurrency`, formData, config)
        .then((res) => {
          setChoosedCurrency(res?.data.data);
          setTransaction_id(res?.data.transactionId);
          setWallet_amount(res?.data.wallet_amount);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    BankCode(selectedCurrency);
  };
  
  const BankCode = async (selectedCurrency ) => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("currency", selectedCurrency )
      let value = {
        currency: selectedCurrency
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios
        .post(`${baseUrl}/singlePayoutBankcodes`, value, config)
        .then((res) => {
          setBankcodes(res?.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = localStorage.getItem("user");
      let values;
      if(currency === 'INR'){
        values = {
          uniqueid : transaction_id ,
          currency : currency,
          amount   : amount,
          customer_name : accountName,
          creditacc : accontNumber,
          bank_name : selectedBankcodes,
          email : email,
          contact : contact,
          address : address,
          state : province,
          city : city,
          remark : notes,
          branch : branch,
          trx_type: type,
          ifsc: ifsc
        }
      } else {
        values = {
          uniqueid : transaction_id ,
          currency : currency,
          amount   : amount,
          customer_name : accountName,
          creditacc : accontNumber,
          bank_name : selectedBankcodes,
          email : email,
          contact : contact,
          address : address,
          state : province,
          city : city,
          remark : notes,
          branch : branch
        }
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/singlePayoutCreate`, values, config);
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
    BankCode();
  }, []);
  return (
    <>
      <div className='chartblockshdow'>
      <h4 className="heading animate__backInDown">SINGLE PAYOUT</h4>
      <hr/>
        <div className="row mb-3">
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Transaction ID</label>
            <input type="text" value={transaction_id} className="form-control singlPayoutInput" disabled />
          </div>
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Currency</label>
            <select className="form-select depositSelect" style={{lineHeight: "32px", color: "#bfbfbf"}} onChange={handleCurrencyChange}>
            <option>Select Currency</option>
            {
              choosedCurrency.map((item, index) => {
                return (
                  <>
                    <option value={item.text}>{item.text}</option>
                  </>
                  );
              })
            }
            </select>
          </div>
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Amount</label>
            <input type="text" className="form-control singlPayoutInput" onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" />
            {
              (wallet_amount < amount) ? <small className="form-text text-muted smallText">Your Payout Amount Is Higher Than Your Current Wallet Amount</small> : ""
            }
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Account Name</label>
            <input type="text" className="form-control singlPayoutInput" onChange={(e)=>setAccountName(e.target.value)} placeholder="Account Name" />
          </div>
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Account Number</label>
            <input type="text" className="form-control singlPayoutInput" onChange={(e)=>setAccountNumber(e.target.value)} placeholder="Account Number" />
          </div>
          <div className="col-4">
            <label className="form-input singlePayoutLabel">Bank Code</label>
            <select className="form-select depositSelect" style={{lineHeight: "32px"}} onChange={(e)=>setSelectedBankcodes(e.target.value)}>
            <option>Select Bankcodes</option>
            {
              bankcodes && bankcodes.length > 0 ? (
              bankcodes.map((item, index) => (
                <option key={item.gateway_name} value={item.gateway_name}>{item.gateway_name}</option>
              ))
            ) : (
              <option disabled>No Gateway Assigned</option>
            )}
            </select>
          </div>
        </div>
        {
            currency === 'INR' ? (
              <>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Branch</label>
                    <input type="text" className="form-control singlPayoutInput" onChange={(e)=>setBranch(e.target.value)} placeholder="Branch" />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Transaction Type</label>&nbsp;
                    <small className="form-text text-muted smallText">(Only for INR)</small>
                    <select className="form-select depositSelect" style={{lineHeight: "32px"}} onChange={(e)=>setType(e.target.value)}>
                      <option>Select Type</option>
                      <option value="IMPS">IMPS</option>
                      <option value="NEFT">NEFT</option>
                      <option value="RTGS">RTGS</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">IFSC Code</label>&nbsp;
                    <small className="form-text text-muted smallText">(Only for INR)</small>
                    <input type="text" className="form-control singlPayoutInput" placeholder="IFSC Code" onChange={(e)=>setIfsc(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Email</label>
                    <input type="email" className="form-control singlPayoutInput" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Contact No.</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='Contact No.' onChange={(e)=>setContact(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Address</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='Address' onChange={(e)=>setAddress(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Province</label>
                    <input type="text" className="form-control singlPayoutInput" placeholder="Province" onChange={(e)=>setProvince(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">City</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='City' onChange={(e)=>setCity(e.target.value)} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Branch</label>
                    <input type="text" className="form-control singlPayoutInput" placeholder="Branch" onChange={(e)=>setBranch(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Email</label>
                    <input type="text" className="form-control singlPayoutInput" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Contact No.</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='Contact No.' onChange={(e)=>setContact(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Address</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='Address' onChange={(e)=>setAddress(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">Province</label>
                    <input type="text" className="form-control singlPayoutInput" placeholder="Province" onChange={(e)=>setAddress(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-input singlePayoutLabel">City</label>&nbsp;
                    <input type='text' className='form-control singlPayoutInput' placeholder='City' onChange={(e)=>setCity(e.target.value)} />
                  </div>
                </div>
              </>
            )
          }
        <div className="form-group mb-3">
          <label className="form-input singlePayoutLabel">Notes</label>&nbsp;
          <textarea className="form-control singlPayoutInput" rows="3" placeholder='Payout Payment' onChange={(e)=>setNotes(e.target.value)}></textarea>
        </div>
        {
          (wallet_amount < amount) ? <button className="btn btn-primary" style={{margin: "auto", display: "block"}} disabled>Submit</button> : <button className="btn btn-primary" style={{margin: "auto", display: "block"}} onClick={(e)=>handleSubmit(e)}>Submit</button>
        }
        
        <div className="mt-3">
          <small className="form-text text-muted">Notes: <br/>IMPS is instant transfer 24*7 upto an amount of 200000 <br/>RTGS is 24*7 for amounts above 200000</small>
        </div>
      </div>
    </>
  )
}

export default SinglePayout