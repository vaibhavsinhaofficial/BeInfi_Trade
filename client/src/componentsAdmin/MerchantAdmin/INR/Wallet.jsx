import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import baseUrl from '../../config/baseUrl';

function Wallet() {
  const { id } = useParams();
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();

  const [paytm, setPaytm] = useState([])
  const [amazon, setAmazon] = useState([])
  const [phonepe, setPhonepe] = useState([])
  const [freecharge, setFreecharge] = useState([])
  const [googlePay, setGooglePay] = useState([])
  const [mobikwik, setMobikwik] = useState([])
  const [other, setOther] = useState([])

  const [gateway_1, setgateway_1] = useState("");
  const [gateway_2, setgateway_2] = useState("");
  const [gateway_3, setgateway_3] = useState("");
  const [gateway_4, setgateway_4] = useState("");
  const [gateway_5, setgateway_5] = useState("");
  const [charges_1, setCharge_1] = useState("");
  const [charges_2, setCharge_2] = useState("");
  const [charges_3, setCharge_3] = useState("");
  const [charges_4, setCharge_4] = useState("");   
  const [charges_5, setCharge_5] = useState(""); 

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", 4);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/default_inr_netbankingEwallet`,
        formData,
        config
      );
      console.log(result.data)

      setMobikwik(result.data.mobikwik);
      setOther(result.data.otherWallet);
      setPaytm(result.data.paytm);
      setAmazon(result.data.amazonPay);
      setPhonepe(result.data.phonePay)
      setFreecharge(result.data.freecharge);
      setGooglePay(result.data.googlePay);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e, category, bankcode) => {
    e.preventDefault();
    console.log(category)

    try {
      let formData = new FormData();
      formData.append("merchantno", id);
      formData.append("type", 4);
      formData.append("gateway_1", gateway_1);
      formData.append("gateway_2", gateway_2);
      formData.append("gateway_3", gateway_3);
      formData.append("gateway_4", gateway_4);
      formData.append("gateway_5", gateway_5);
      formData.append("charges_1", charges_1);
      formData.append("charges_2", charges_2);
      formData.append("charges_3", charges_3);
      formData.append("charges_4", charges_4);
      formData.append("charges_5", charges_5);

      if(category === 1){
        if(bankcode === 8){
          formData.append("category_id", 1)
          formData.append("bank_code", 8)
        } else if(bankcode === 9){
          formData.append("category_id", 1)
          formData.append("bank_code", 9)
        } else if (bankcode === 10){
          formData.append("category_id", 1)
          formData.append("bank_code", 10)
        } else if (bankcode === 11){
          formData.append("category_id", 1)
          formData.append("bank_code", 11)
        } else if (bankcode === 12){
          formData.append("category_id", 1)
          formData.append("bank_code", 12)
        } else if (bankcode === 13){
          formData.append("category_id", 1)
          formData.append("bank_code", 13)
        } else if (bankcode === 14){
          formData.append("category_id", 1)
          formData.append("bank_code", 14)
        }
      } else if(category === 2){
        if(bankcode === 8){
          formData.append("category_id", 2)
          formData.append("bank_code", 8)
        } else if(bankcode === 9){
          formData.append("category_id", 2)
          formData.append("bank_code", 9)
        } else if (bankcode === 10){
          formData.append("category_id", 2)
          formData.append("bank_code", 10)
        } else if (bankcode === 11){
          formData.append("category_id", 2)
          formData.append("bank_code", 11)
        } else if (bankcode === 12){
          formData.append("category_id", 2)
          formData.append("bank_code", 12)
        } else if (bankcode === 13){
          formData.append("category_id", 2)
          formData.append("bank_code", 13)
        } else if (bankcode === 14){
          formData.append("category_id", 2)
          formData.append("bank_code", 14)
        }
      } else if(category === 3){
        if(bankcode === 8){
          formData.append("category_id", 3)
          formData.append("bank_code", 8)
        } else if(bankcode === 9){
          formData.append("category_id", 3)
          formData.append("bank_code", 9)
        } else if (bankcode === 10){
          formData.append("category_id", 3)
          formData.append("bank_code", 10)
        } else if (bankcode === 11){
          formData.append("category_id", 3)
          formData.append("bank_code", 11)
        } else if (bankcode === 12){
          formData.append("category_id", 3)
          formData.append("bank_code", 12)
        } else if (bankcode === 13){
          formData.append("category_id", 3)
          formData.append("bank_code", 13)
        } else if (bankcode === 14){
          formData.append("category_id", 3)
          formData.append("bank_code", 14)
        }
      } else if(category === 4) {
        if(bankcode === 8){
          formData.append("category_id", 4)
          formData.append("bank_code", 8)
        } else if(bankcode === 9){
          formData.append("category_id", 4)
          formData.append("bank_code", 9)
        } else if (bankcode === 10){
          formData.append("category_id", 4)
          formData.append("bank_code", 10)
        } else if (bankcode === 11){
          formData.append("category_id", 4)
          formData.append("bank_code", 11)
        } else if (bankcode === 12){
          formData.append("category_id", 4)
          formData.append("bank_code", 12)
        } else if (bankcode === 13){
          formData.append("category_id", 4)
          formData.append("bank_code", 13)
        } else if (bankcode === 14){
          formData.append("category_id", 4)
          formData.append("bank_code", 14)
        }
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/update_inrInsert_inr`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchantAdmin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='chartblockshdow'>
        <div className="row mb-3">
          <div className="col-10"><h4 style={{textAlign: "center", fontWeight: "700"}}>SMART SWITCH FOR E-WALLETS</h4></div>
          <div className="col-2">
            <Link to={`/INR/${id}`}>
              <button className='btn' style={{background: "#ff6600", color: "#fff", float: "right"}}>Back</button>
            </Link>
          </div>
        </div>
        <hr />

        {/* E-COMMERCE STARTS */}

        <div className="upiheading">
            <h2>
                <img src="https://payoway.com/web/assets/admin/icons/e-commerce1.png" alt="" />
                <span style={{marginTop: "10px"}}>E-COMMERCE</span>
            </h2>
        </div>
        <hr/>

        <div className="row">
          <div className="col-2 rowText">CATEGORY</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/paytm1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 8)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/phonepe1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 9)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/googlepay1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 10)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/amazon1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 11)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/freecharge1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 12)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/mobikwik1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 13)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/other.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 14)}>Save</button>
        </div>
        <hr />

        {/* E-COMMERCE ENDS */}

        {/* NGO STARTS */}

        <div className="upiheading">
            <h2>
                <img src="https://payoway.com/web/assets/admin/icons/ngo1.png" alt="" />
                <span style={{marginTop: "10px"}}>NGO/TRUST</span>
            </h2>
        </div>
        <hr/>

        <div className="row">
          <div className="col-2 rowText">CATEGORY</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/paytm1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 8)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/phonepe1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 9)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/googlepay1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 10)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/amazon1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 11)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/freecharge1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 12)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/mobikwik1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 13)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/other.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 14)}>Save</button>
        </div>
        <hr />
        
        {/* NGO ENDS */}

        {/* GOVERNMENT SERVICES STARTS */}

        <div className="upiheading">
            <h2>
                <img src="https://payoway.com/web/assets/admin/icons/government1.png" alt="" />
                <span style={{marginTop: "10px"}}>GOVERNMENT SERVICES</span>
            </h2>
        </div>
        <hr/>

        <div className="row">
          <div className="col-2 rowText">CATEGORY</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/paytm1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 8)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/phonepe1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 9)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/googlepay1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 10)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/amazon1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 11)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/freecharge1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 12)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/mobikwik1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 13)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/other.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 14)}>Save</button>
        </div>
        <hr />
        
        {/* GOVERNMENT SERVICES ENDS */}

        {/* EDUCATION STARTS */}

        <div className="upiheading">
          <h2>
            <img src="https://payoway.com/web/assets/admin/icons/education1.png" alt="" />
            <span style={{marginTop: "10px"}}>EDUCATION</span>
          </h2>
        </div>
        <hr/>

        <div className="row">
          <div className="col-2 rowText">CATEGORY</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
          <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/paytm1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {paytm?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 8)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/phonepe1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {phonepe?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 9)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/googlepay1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {googlePay?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 10)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/amazon1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {amazon?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 11)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/freecharge1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {freecharge?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 12)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/mobikwik1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {mobikwik?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 13)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/other.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_2(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_3(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_4(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_5(e.target.value)}
            >
              <option>Select Gateway</option>
              {other?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 14)}>Save</button>
        </div>
        
        {/* EDUCATION ENDS */}
      </div>
    </>
  )
}

export default Wallet