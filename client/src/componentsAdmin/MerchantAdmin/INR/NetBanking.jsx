import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import baseUrl from '../../config/baseUrl';

function NetBanking() {
  const { id } = useParams();
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();

  const [axis, setAxis] = useState([])
  const [icici, setICICI] = useState([])
  const [kotak, setKotak] = useState([])
  const [hdfc, setHDFC] = useState([])
  const [sbi, setSBI] = useState([])
  const [yes, setYES] = useState([])
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
      formData.append("type", 3);
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

      setYES(result.data.yes);
      setOther(result.data.otherNetBanking);
      setAxis(result.data.axis);
      setICICI(result.data.icici);
      setKotak(result.data.kotak)
      setHDFC(result.data.hdfc);
      setSBI(result.data.sbi);

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
      formData.append("type", 3);
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
        if(bankcode === 1){
          formData.append("category_id", 1)
          formData.append("bank_code", 1)
        } else if(bankcode === 2){
          formData.append("category_id", 1)
          formData.append("bank_code", 2)
        } else if (bankcode === 3){
          formData.append("category_id", 1)
          formData.append("bank_code", 3)
        } else if (bankcode === 4){
          formData.append("category_id", 1)
          formData.append("bank_code", 4)
        } else if (bankcode === 5){
          formData.append("category_id", 1)
          formData.append("bank_code", 5)
        } else if (bankcode === 6){
          formData.append("category_id", 1)
          formData.append("bank_code", 6)
        } else if (bankcode === 7){
          formData.append("category_id", 1)
          formData.append("bank_code", 7)
        }
      } else if(category === 2){
        if(bankcode === 1){
          formData.append("category_id", 2)
          formData.append("bank_code", 1)
        } else if(bankcode === 2){
          formData.append("category_id", 2)
          formData.append("bank_code", 2)
        } else if (bankcode === 3){
          formData.append("category_id", 2)
          formData.append("bank_code", 3)
        } else if (bankcode === 4){
          formData.append("category_id", 2)
          formData.append("bank_code", 4)
        } else if (bankcode === 5){
          formData.append("category_id", 2)
          formData.append("bank_code", 5)
        } else if (bankcode === 6){
          formData.append("category_id", 2)
          formData.append("bank_code", 6)
        } else if (bankcode === 7){
          formData.append("category_id", 2)
          formData.append("bank_code", 7)
        }
      } else if(category === 3){
        if(bankcode === 1){
          formData.append("category_id", 3)
          formData.append("bank_code", 1)
        } else if(bankcode === 2){
          formData.append("category_id", 3)
          formData.append("bank_code", 2)
        } else if (bankcode === 3){
          formData.append("category_id", 3)
          formData.append("bank_code", 3)
        } else if (bankcode === 4){
          formData.append("category_id", 3)
          formData.append("bank_code", 4)
        } else if (bankcode === 5){
          formData.append("category_id", 3)
          formData.append("bank_code", 5)
        } else if (bankcode === 6){
          formData.append("category_id", 3)
          formData.append("bank_code", 6)
        } else if (bankcode === 7){
          formData.append("category_id", 3)
          formData.append("bank_code", 7)
        }
      } else if(category === 4) {
        if(bankcode === 1){
          formData.append("category_id", 4)
          formData.append("bank_code", 1)
        } else if(bankcode === 2){
          formData.append("category_id", 4)
          formData.append("bank_code", 2)
        } else if (bankcode === 3){
          formData.append("category_id", 4)
          formData.append("bank_code", 3)
        } else if (bankcode === 4){
          formData.append("category_id", 4)
          formData.append("bank_code", 4)
        } else if (bankcode === 5){
          formData.append("category_id", 4)
          formData.append("bank_code", 5)
        } else if (bankcode === 6){
          formData.append("category_id", 4)
          formData.append("bank_code", 6)
        } else if (bankcode === 7){
          formData.append("category_id", 4)
          formData.append("bank_code", 7)
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
                  <img src="https://payoway.com/web/assets/admin/icons/axis1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 1)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/icici1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 2)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/kotak1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 3)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/hdfc1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 4)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/sbi1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 5)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/yes1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 6)}>Save</button>
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
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 7)}>Save</button>
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
                  <img src="https://payoway.com/web/assets/admin/icons/axis1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 1)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/icici1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 2)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/kotak1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 3)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/hdfc1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 4)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/sbi1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 5)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/yes1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 6)}>Save</button>
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
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 7)}>Save</button>
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
                  <img src="https://payoway.com/web/assets/admin/icons/axis1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 1)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/icici1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 2)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/kotak1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 3)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/hdfc1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 4)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/sbi1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 5)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/yes1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 6)}>Save</button>
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
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 7)}>Save</button>
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
                  <img src="https://payoway.com/web/assets/admin/icons/axis1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
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
              {axis?.map((item, index) => (
                <option value={item.payment_gates}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 1)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/icici1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
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
              {kotak?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 2)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/kotak1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
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
              {sbi?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 3)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/hdfc1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
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
              {icici?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 4)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/sbi1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
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
              {hdfc?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 5)}>Save</button>
        </div>
        <hr />

        <div className="row mt-4">
          <div className="col-2">
            <div className="upiheading">
              <h2>
                  <img src="https://payoway.com/web/assets/admin/icons/yes1.png" className='imagenew' alt="" />
              </h2>
            </div>
          </div>
          <div className="col-2">
            <select className="form-control upiSelect" 
              onChange={(e)=>setgateway_1(e.target.value)}
            >
              <option>Select Gateway</option>
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
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
              {yes?.map((item, index) => (
                <option value={item.payment_gate}>{item.waynames}</option>
              ))}
            </select>
            <input type="text" placeholder="Charge" name="upiEcommCharge_1" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 6)}>Save</button>
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
            <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 7)}>Save</button>
        </div>
        
        {/* EDUCATION ENDS */}
      </div>
    </>
  )
}

export default NetBanking