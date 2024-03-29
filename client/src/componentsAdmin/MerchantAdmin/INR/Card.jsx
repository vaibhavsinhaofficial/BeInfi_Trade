// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { Link, useParams, useNavigate } from "react-router-dom";
// import baseUrl from '../../config/baseUrl';
// import { toast } from "react-toastify";

// function Card() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const auth = localStorage.getItem("admin");
//   const [gatewayName, setGatewayName] = useState([]);
//   const [gateway_1, setgateway_1] = useState("");
//   const [gateway_2, setgateway_2] = useState("");
//   const [gateway_3, setgateway_3] = useState("");
//   const [gateway_4, setgateway_4] = useState("");
//   const [gateway_5, setgateway_5] = useState("");
//   const [charges_1, setCharge_1] = useState("");
//   const [charges_2, setCharge_2] = useState("");
//   const [charges_3, setCharge_3] = useState("");
//   const [charges_4, setCharge_4] = useState("");   
//   const [charges_5, setCharge_5] = useState("");   
//   // console.log(id)

//   const fetchData = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("id", id);
//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${auth}`,
//         },
//       };
//       let result = await axios.post(
//         `${baseUrl}/default_inr`,
//         formData,
//         config
//       );

//       setGatewayName(result.data.filteredBanks)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const handleSubmit = async (e, category, bankcode) => {
//     e.preventDefault();
//     console.log(category)

//     try {
//       let formData = new FormData();
//       formData.append("merchantno", id);
//       formData.append("type", 1);
//       formData.append("gateway_1", gateway_1);
//       formData.append("gateway_2", gateway_2);
//       formData.append("gateway_3", gateway_3);
//       formData.append("gateway_4", gateway_4);
//       formData.append("gateway_5", gateway_5);
//       formData.append("charges_1", charges_1);
//       formData.append("charges_2", charges_2);
//       formData.append("charges_3", charges_3);
//       formData.append("charges_4", charges_4);
//       formData.append("charges_5", charges_5);

//       if(category === 1){
//         if(bankcode === 1){
//           formData.append("category_id", 1)
//           formData.append("bank_code", 1)
//         } else if(bankcode === 2){
//           formData.append("category_id", 1)
//           formData.append("bank_code", 2)
//         } else if (bankcode === 3){
//           formData.append("category_id", 1)
//           formData.append("bank_code", 3)
//         } else if (bankcode === 4){
//           formData.append("category_id", 1)
//           formData.append("bank_code", 4)
//         }
//       } else if(category === 2){
//         if(bankcode === 1){
//           formData.append("category_id", 2)
//           formData.append("bank_code", 1)
//         } else if(bankcode === 2){
//           formData.append("category_id", 2)
//           formData.append("bank_code", 2)
//         } else if (bankcode === 3){
//           formData.append("category_id", 2)
//           formData.append("bank_code", 3)
//         } else if (bankcode === 4){
//           formData.append("category_id", 2)
//           formData.append("bank_code", 4)
//         }
//       } else if(category === 3){
//         if(bankcode === 1){
//           formData.append("category_id", 3)
//           formData.append("bank_code", 1)
//         } else if(bankcode === 2){
//           formData.append("category_id", 3)
//           formData.append("bank_code", 2)
//         } else if (bankcode === 3){
//           formData.append("category_id", 3)
//           formData.append("bank_code", 3)
//         } else if (bankcode === 4){
//           formData.append("category_id", 3)
//           formData.append("bank_code", 4)
//         }
//       } else if(category === 4) {
//         if(bankcode === 1){
//           formData.append("category_id", 4)
//           formData.append("bank_code", 1)
//         } else if(bankcode === 2){
//           formData.append("category_id", 4)
//           formData.append("bank_code", 2)
//         } else if (bankcode === 3){
//           formData.append("category_id", 4)
//           formData.append("bank_code", 3)
//         } else if (bankcode === 4){
//           formData.append("category_id", 4)
//           formData.append("bank_code", 4)
//         }
//       }
//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${auth}`,
//         },
//       };

//       let result = await axios.post(`${baseUrl}/update_inrInsert_inr`, formData, config);

//       toast.success(result.data.message, {
//         position: "bottom-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       navigate("/bankconnect/merchantAdmin");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// //   console.log(id)
//   return (
//     <>
//       <div className='chartblockshdow'>
//         <div className="row mb-3">
//           <div className="col-10"><h4 style={{textAlign: "center", fontWeight: "700"}}>SMART SWITCH FOR CARDS</h4></div>
//           <div className="col-2">
//             <Link to={`/INR/${id}`}>
//               <button className='btn' style={{background: "#ff6600", color: "#fff", float: "right"}}>Back</button>
//             </Link>
//           </div>
//         </div>
//         <hr />

//         {/* E-COMMERCE STARTS */}

//         <div className="upiheading">
//             <h2>
//                 <img src="https://payoway.com/web/assets/admin/icons/e-commerce1.png" alt="" />
//                 <span style={{marginTop: "10px"}}>E-COMMERCE</span>
//             </h2>
//         </div>
//         <hr/>

//         <div className="row">
//           <div className="col-2 rowText">CATEGORY</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/creditcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>CREDIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 1)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/debitcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>DEBIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 2)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/rupay1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>RUPAY</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 3)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/amex1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>AMERICAN<br/> &nbsp;&nbsp;EXPRESS</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 4, 4)}>Save</button>
//         </div>
//         <hr />

//         {/* E-COMMERCE ENDS */}

//         {/* NGO STARTS */}

//         <div className="upiheading">
//             <h2>
//                 <img src="https://payoway.com/web/assets/admin/icons/ngo1.png" alt="" />
//                 <span style={{marginTop: "10px"}}>NGO/TRUST</span>
//             </h2>
//         </div>
//         <hr/>

//         <div className="row">
//           <div className="col-2 rowText">CATEGORY</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/creditcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>CREDIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 1)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/debitcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>DEBIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 2)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/rupay1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>RUPAY</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 3)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/amex1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>AMERICAN<br/> &nbsp;&nbsp;EXPRESS</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>

//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 2, 4)}>Save</button>
//         </div>
//         <hr/>
        
//         {/* NGO ENDS */}

//         {/* GOVERNMENT SERVICES STARTS */}

//         <div className="upiheading">
//             <h2>
//                 <img src="https://payoway.com/web/assets/admin/icons/government1.png" alt="" />
//                 <span style={{marginTop: "10px"}}>GOVERNMENT SERVICES</span>
//             </h2>
//         </div>
//         <hr/>

//         <div className="row">
//           <div className="col-2 rowText">CATEGORY</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/creditcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>CREDIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 1)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/debitcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>DEBIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 2)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/rupay1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>RUPAY</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 3)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/amex1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>AMERICAN<br/> &nbsp;&nbsp;EXPRESS</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>

//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 1, 4)}>Save</button>
//         </div>
//         <hr/>
        
//         {/* GOVERNMENT SERVICES ENDS */}

//         {/* EDUCATION STARTS */}

//         <div className="upiheading">
//             <h2>
//                 <img src="https://payoway.com/web/assets/admin/icons/education1.png" alt="" />
//                 <span style={{marginTop: "10px"}}>EDUCATION</span>
//             </h2>
//         </div>
//         <hr/>

//         <div className="row">
//           <div className="col-2 rowText">CATEGORY</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-1</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-2</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-3</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-4</div>
//           <div className="col-2 rowText" style={{textAlign: "center"}}>PREFERENCE-5</div>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/creditcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>CREDIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 1)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/debitcard1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>DEBIT CARD</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 2)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/rupay1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>RUPAY</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>
//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 3)}>Save</button>
//         </div>
//         <hr />

//         <div className="row mt-4">
//           <div className="col-2">
//             <div className="upiheading">
//               <h2>
//                   <img src="https://payoway.com/web/assets/admin/icons/amex1.png" alt="" />
//                   <span style={{marginTop: "10px"}}>AMERICAN<br/> &nbsp;&nbsp;EXPRESS</span>
//               </h2>
//             </div>
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_1(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_1(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_2(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_2(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_3(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_3(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_4(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_4(e.target.value)} />
//           </div>
//           <div className="col-2">
//             <select className="form-control upiSelect"
//               onChange={(e)=>setgateway_5(e.target.value)}
//             >
//               <option>Select Gateway</option>
//               {gatewayName?.map((item, index) => (
//                 <option value={item.payment_gate}>{item.waynames}</option>
//               ))}
//             </select>
//             <input type="text" placeholder="Charge" className="form-control upiInput" onChange={(e) => setCharge_5(e.target.value)} />
//           </div>
//         </div>

//         <div className='mt-3'>
//             <button className='btn cardSave' onClick={(e) => handleSubmit(e, 3, 4)}>Save</button>
//         </div>
        
//         {/* EDUCATION ENDS */}
//       </div>
//     </>
//   )
// }

// export default Card

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';
import baseUrl from '../../config/baseUrl';
import { toast } from "react-toastify";
import ecommerce from "./imgs/e-commerce1.png";
import ngo from "./imgs/ngo1.png";
import govt from "./imgs/government1.png";
import edu from "./imgs/education1.png";
import credit from "./imgs/creditcard1.png";
import debit from "./imgs/debitcard1.png";
import rupay from "./imgs/rupay1.png";
import amex from "./imgs/amex1.png";

const Category = ({ title, icon, id, fetchSwitchingData, selectedGateways, setSelectedGateways, charges, setCharges, onSelectCategory }) => {
  const [gatewayName, setGatewayName] = useState([]);

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append('id', id);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      let result = await axios.post(`${baseUrl}/default_inr`, formData, config);
      setGatewayName(result.data.filteredBanks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccordionClick = () => {
    fetchSwitchingData(id);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const renderOptions = () => {
    return gatewayName?.map((item, index) => (
      <option key={index} value={item.payment_gate}>
        {item.waynames}
      </option>
    ));
  };

  const handleGatewayChange = (index, event) => {
    const value = event.target.value;
    setSelectedGateways(index, value);
  };

  const handleChargeChange = (index, event) => {
    const value = event.target.value;
    setCharges(index, value);
  };

  const renderCategoryBody = () => {
    return (
      <>
        <div className="row">
          <div className="col rowText" style={{ textAlign: 'center' }}>
            <div className="col rowText" style={{ textAlign: 'center' }}>
              Type
            </div>
          </div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col rowText" style={{ textAlign: 'center' }}>
              PREFERENCE-{index + 1}
            </div>
          ))}
          <div className="col rowText" style={{ textAlign: 'center' }}>
            Action
          </div>
        </div>

        <hr />
        <div className="row">
          <>
            {[...Array(4)].map((row, rowIndex) => (
              <div key={rowIndex}>
                <div className="row">
                  <div className="col" style={{ textAlign: 'center' }}>
                    {/* Add the image tag here */}
                    {rowIndex === 0 && (
                      <div>
                        <p style={{position: "absolute", lineHeight: "40px", fontWeight: "700"}}>Credit Card</p>
                        <img src={credit} alt='' style={{ maxWidth: '50px', marginLeft: "100px"}} />
                      </div>
                    )}
                    {rowIndex === 1 && (
                      <div>
                        <p style={{position: "absolute", lineHeight: "40px", fontWeight: "700"}}>Debit Card</p>
                        <img src={debit} alt='' style={{ maxWidth: '50px', marginLeft: "100px"}} />
                      </div>
                    )}
                    {rowIndex === 2 && (
                      <div>
                        <p style={{position: "absolute", lineHeight: "40px", fontWeight: "700"}}>RuPay Card</p>
                        <img src={rupay} alt='' style={{ maxWidth: '40px', marginLeft: "100px"}} />
                      </div>
                    )}
                    {rowIndex === 3 && (
                      <div>
                        <p style={{position: "absolute", lineHeight: "40px", fontWeight: "700"}}>Amex Card</p>
                        <img src={amex} alt='' style={{ maxWidth: '50px', marginLeft: "100px"}} />
                      </div>
                    )}
                  </div>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="col" style={{ textAlign: 'center' }}>
                      <select
                        className="form-control upiSelect"
                        value={selectedGateways[index]}
                        onChange={(event) => handleGatewayChange(index, event)}
                        style={{ fontWeight: '700', color: '#0c63e7' }}
                      >
                        <option>Select Gateway</option>
                        {renderOptions()}
                      </select>
                      <input
                        type="text"
                        placeholder="Charge"
                        className="form-control upiInput"
                        value={charges[index]}
                        onChange={(event) => handleChargeChange(index, event)}
                        style={{ fontWeight: '700', color: '#0c63e7' }}
                      />
                    </div>
                  ))}
                  <div className="col" style={{ textAlign: 'center' }}>
                    <button className="btn upiSave" onClick={() => onSelectCategory()}>
                      Save
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </>
        </div>
      </>
    );
  };

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header onClick={handleAccordionClick}>
        <div className="currencyBox">
          <div className="upiheading">
            <h2>
              <img src={icon} alt="" />
              <span style={{ marginTop: '10px' }}>{title}</span>
            </h2>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>{renderCategoryBody()}</Accordion.Body>
    </Accordion.Item>
  );
};

function Card() {
  const { id } = useParams();
  const [selectedGateways, setSelectedGateways] = useState(["", "", "", "", ""]);
  const [charges, setCharges] = useState(["", "", "", "", ""]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // const fetchSwitchingData = async (category) => {
  //   try {
  //     let formData = new FormData();
  //     formData.append('merchantno', id);
  //     formData.append('type', 1);
  //     formData.append('category', category);
  //     const config = {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${localStorage.getItem('admin')}`,
  //       },
  //     };
  //     let result = await axios.post(`${baseUrl}/defautlSwitchingData`, formData, config);
  //     const data = result.data[0];
  //     setSelectedGateways([
  //       data?.gateway_1 || "",
  //       data?.gateway_2 || "",
  //       data?.gateway_3 || "",
  //       data?.gateway_4 || "",
  //     ]);

  //     setCharges([
  //       data?.charges_1 || "",
  //       data?.charges_2 || "",
  //       data?.charges_3 || "",
  //       data?.charges_4 || "",
  //     ]);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchSwitchingData = async (category) => {
    try {
      let formData = new FormData();
      formData.append('merchantno', id);
      formData.append('type', 1);
      formData.append('category', category);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      let result = await axios.post(`${baseUrl}/defautlSwitchingData`, formData, config);
      const data = result.data[0];
  
      // Create a mapping for card types
      const cardTypeMapping = {
        0: 'Credit Card',
        1: 'Debit Card',
        2: 'RuPay Card',
        3: 'Amex Card',
        // Add more card types as needed
      };
  
      // Set selected gateways and charges based on card type
      const selectedGateways = [];
      const charges = [];
      for (let i = 0; i < 4; i++) {
        const gatewayKey = `gateway_${i + 1}`;
        const chargeKey = `charges_${i + 1}`;
        selectedGateways.push(data[gatewayKey] || '');
        charges.push(data[chargeKey] || '');
      }
  
      setSelectedGateways(selectedGateways);
      setCharges(charges);
  
      console.log("charges", charges);
      console.log("gateways", selectedGateways);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e, category, selectedGateways, charges) => {
    e.preventDefault();

    try {
      // console.log(category);
      console.log(category, selectedGateways, charges);
      const formData = new FormData();
      formData.append('category', category);
      formData.append('id', id);
      formData.append('type', 2);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      selectedGateways.forEach((gateway, index) => {
        formData.append(`gateways_${index}`, gateway || "");
      });
  
      charges.forEach((charge, index) => {
        formData.append(`charges_${index}`, charge || "");
      });

      const result = await axios.post(
        `${baseUrl}/update_inrInsert_inr`, 
        formData, 
        config
      );

      console.log(result);

      toast.success('Gateway Preference Updated', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate("/bankconnect/merchantAdmin");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, selectedCategory, selectedGateways, charges)}>
        <div className="chartblockshdow">
          <div className="row">
            <div className="col-10">
              <h2 style={{ textAlign: 'center' }}>CATEGORIES</h2>
            </div>
            <div className="col-2">
              <Link to={`/bankconnect/INR/${id}`}>
                <button className="btn inrBack">Back</button>
              </Link>
            </div>
          </div>
          <Accordion className="mt-4">
            <Category title="E-COMMERCE" icon={ecommerce} id="4" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("4")}
            />
            <Category title="NGO/TRUST" icon={ngo} id="2" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("2")}
            />
            <Category title="GOVERNMENT SERVICES" icon={govt} id="1" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("1")}
            />
            <Category title="EDUCATION" icon={edu} id="3" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("3")}
            />
          </Accordion>
        </div>
      </form>
    </>
  );
}

export default Card;
