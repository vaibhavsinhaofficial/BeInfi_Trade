import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import baseUrl from '../../config/baseUrl';
import { toast } from "react-toastify";

function UbankCodes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = localStorage.getItem("admin");

    const [wallet, setWallet] = useState([])
    const [netBanking, setNetBanking] = useState([]);
    const [bankcode, setBankcode] = useState("")

    const fetchData = async () => {
        try {
          let formData = new FormData();
          formData.append("id", id);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
          let result = await axios.post(
            `${baseUrl}/default_bankUbankconnect`,
            formData,
            config
          );

          setWallet(result.data.walletResult)
          setNetBanking(result.data.netBankingResult)
    
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [id]);

      const handleSubmit = async (e, payment_type, bank_id) => {
        e.preventDefault();
    
        try {
          let formData = new FormData();
          formData.append("bank_id", bank_id);
          formData.append("payment_type", payment_type);
          formData.append("bankcode", bankcode);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(`${baseUrl}/updateInsert_bankUbank_inr`, formData, config);
    
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
                    <div className="col-10">
                        <h4 style={{textAlign: "center", fontWeight: "700"}}>BANK UBANKCONNECT CODES</h4>
                    </div>
                    <div className="col-2">
                        <Link to={`/INR/${id}`}>
                        <button className='btn' style={{background: "#ff6600", color: "#fff", float: "right"}}>Back</button>
                        </Link>
                    </div>
                </div>
                <hr />

                <h3 style={{textAlign: "center", fontWeight: "700", color: "#ff6600"}}>FOR NET BANKING</h3>
                <hr/>

                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/axis1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 1)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/icici1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 2)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/kotak1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 3)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/hdfc1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 4)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/sbi1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 5)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/yes1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 6)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/other.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {netBanking?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 3, 7)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />

                <h3 style={{textAlign: "center", fontWeight: "700", color: "#ff6600"}}>FOR WALLET</h3>
                <hr/>

                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/paytm1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 8)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/phonepe1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 9)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/googlepay1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 10)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/amazon1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 11)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/freecharge1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 12)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/mobikwik1.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 13)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="upiheading">
                            <h2>
                                <img src="https://payoway.com/web/assets/admin/icons/other.png" style={{maxHeight: "30px", marginTop: "5px"}} alt="" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <select className="form-control bankcodeSelect"
                        onChange={(e)=>setBankcode(e.target.value)}
                        >
                            <option>Select Gateway</option>
                            {wallet?.map((item, index) => (
                                <option value={item.code}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-2">
                        <button className='btn upiSave' onClick={(e) => handleSubmit(e, 4, 14)} style={{marginLeft: "auto", display: "flex"}}>Save</button>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default UbankCodes