import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams, useLocation, useNavigate  } from 'react-router-dom';
import baseUrl from '../../config/baseUrl';
import { toast } from 'react-toastify';
import banktransfer from "../merchantcurrency/banktransfer.png";
import ewallet_logo from "../merchantcurrency/ewallet-logo.png";
import debitcardswitch from "../merchantcurrency/debitcardswitch.png";
import creditcardswitch from "../merchantcurrency/creditcardswitchpng.png";
import qrcode from "../merchantcurrency/qrcode.png";
import apmImage from "../merchantcurrency/apm.png";

function CurrencyModeSolution() {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cur = searchParams.get('cur');
    const navigate = useNavigate();
    const auth = localStorage.getItem("admin");
    const [netbanking, setNetBanking] = useState([]);
    const [wallet, setWallet] = useState([]);
    const [debitCard, setDebitCard] = useState([]);
    const [creditCard, setCreditCard] = useState([]);
    const [qrCode, setQrCode] = useState([]);
    const [apm, setapm] = useState([]);

    const [gateway_1, setgateway_1] = useState("");
    const [gateway_2, setgateway_2] = useState("");
    const [gateway_3, setgateway_3] = useState("");
    const [charges_1, setCharge_1] = useState("");
    const [charges_2, setCharge_2] = useState("");
    const [charges_3, setCharge_3] = useState("");

    const fetchData = async () => {
        try {
          let formData = new FormData();
          formData.append("merchantno", id);
          formData.append("currencies", cur);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
          let result = await axios.post(
            `${baseUrl}/NonINR`,
            formData,
            config
          );
    
          console.log(result.data.data)
          setNetBanking(result.data.data.netbanking);
          setWallet(result.data.data.wallet);
          setDebitCard(result.data.data.debitcard);
          setCreditCard(result.data.data.creditcard);
          setQrCode(result.data.data.qrcode);
          setapm(result.data.data.apm);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
    fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          let formData = new FormData();
            formData.append("merchantno", id);
            formData.append("currencies", cur);
            formData.append("currency", cur);
            formData.append("waynumber1", gateway_1);
            formData.append("waynumber2", gateway_2);
            formData.append("waynumber3", gateway_3);
            formData.append("charge1", charges_1);
            formData.append("charge2", charges_2);
            formData.append("charge3", charges_3);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(`${baseUrl}/NonINRUpdate`, formData, config);
    
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
            <div className="chartblockshdow">
                <div className="row">
                    <div className="col-10">
                        <h2 style={{textAlign: "center"}}>MODE OF PAYMENT SOLUTIONS</h2>
                    </div>
                    <div className="col-2">
                        <Link to={`/bankconnect/NonInr/${id}`}>
                            <button className='btn inrBack'>Back</button>
                        </Link>
                    </div>
                </div>
                <Accordion className='mt-4'>
                    <Accordion.Item eventKey="0" flush>
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={banktransfer} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Bank Transfer</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <>
                                {netbanking.length !== 0 ? (
                                    <>
                                        <div className="row">
                                            <div className="col-2 rowText">SELECT BANK</div>
                                            <div className="col-3 rowText">PREFERENCE-1</div>
                                            <div className="col-3 rowText">PREFERENCE-2</div>
                                            <div className="col-3 rowText">PREFERENCE-3</div>
                                            <div className="col-1"></div>
                                        </div>
                                        <hr />
                                        {netbanking.map((item, index) => (
                                            <div className="row" key={index}>
                                                <div className="col-2">
                                                    <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                                </div>
                                                <div className="col-3 mb-3">
                                                    <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                        <option>Select Gateway</option>
                                                        {item.waynames.map((wayname, wayIndex) => (
                                                        <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                            {wayname}
                                                        </option>
                                                        ))}
                                                    </select>
                                                    <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)} />
                                                </div>
                                                <div className="col-3 mb-3">
                                                    <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                        <option>Select Gateway</option>
                                                        {item.waynames.map((wayname, wayIndex) => (
                                                        <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                            {wayname}
                                                        </option>
                                                        ))}
                                                    </select>
                                                    <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_2(e.target.value)}/>
                                                </div>
                                                <div className="col-3 mb-3">
                                                    <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                        <option>Select Gateway</option>
                                                        {item.waynames.map((wayname, wayIndex) => (
                                                        <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                            {wayname}
                                                        </option>
                                                        ))}
                                                    </select>
                                                    <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                                </div>
                                                <div className="col-1">
                                                    <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                                </div>
                                                <hr/>
                                            </div>
                                        ))}
                                    </>
                                ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                            </>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={ewallet_logo} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Wallet</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <>
                            {wallet.length !== 0 ? (
                                <>
                                    <div className="row">
                                        <div className="col-2 rowText">SELECT BANK</div>
                                        <div className="col-3 rowText">PREFERENCE-1</div>
                                        <div className="col-3 rowText">PREFERENCE-2</div>
                                        <div className="col-3 rowText">PREFERENCE-3</div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr />
                                    {wallet.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-2">
                                                <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_2(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                            </div>
                                            <div className="col-1">
                                                <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </>
                            ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                        </>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={debitcardswitch} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Debit Cards</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <>
                            {debitCard.length !== 0 ? (
                                <>
                                    <div className="row">
                                        <div className="col-2 rowText">SELECT BANK</div>
                                        <div className="col-3 rowText">PREFERENCE-1</div>
                                        <div className="col-3 rowText">PREFERENCE-2</div>
                                        <div className="col-3 rowText">PREFERENCE-3</div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr />
                                    {debitCard.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-2">
                                                <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_2(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                            </div>
                                            <div className="col-1">
                                                <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </>
                            ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                        </>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={creditcardswitch} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Credit Cards</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <>
                            {creditCard.length !== 0 ? (
                                <>
                                    <div className="row">
                                        <div className="col-2 rowText">SELECT BANK</div>
                                        <div className="col-3 rowText">PREFERENCE-1</div>
                                        <div className="col-3 rowText">PREFERENCE-2</div>
                                        <div className="col-3 rowText">PREFERENCE-3</div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr />
                                    {creditCard.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-2">
                                                <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setgateway_2(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                            </div>
                                            <div className="col-1">
                                                <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </>
                            ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                        </>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={qrcode} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>QR Code</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <>
                            {qrCode.length !== 0 ? (
                                <>
                                    <div className="row">
                                        <div className="col-2 rowText">SELECT BANK</div>
                                        <div className="col-3 rowText">PREFERENCE-1</div>
                                        <div className="col-3 rowText">PREFERENCE-2</div>
                                        <div className="col-3 rowText">PREFERENCE-3</div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr />
                                    {qrCode.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-2">
                                                <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_2(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                            </div>
                                            <div className="col-1">
                                                <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </>
                            ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                        </>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={apmImage} alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>ALTERNATE PAYMENT METHODS</span></h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <>
                            {apm.length !== 0 ? (
                                <>
                                    <div className="row">
                                        <div className="col-2 rowText">SELECT BANK</div>
                                        <div className="col-3 rowText">PREFERENCE-1</div>
                                        <div className="col-3 rowText">PREFERENCE-2</div>
                                        <div className="col-3 rowText">PREFERENCE-3</div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr />
                                    {apm.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-2">
                                                <h6 style={{marginTop: "8px"}}>{item.bankname}</h6>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_1(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_1(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_2(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_2(e.target.value)}/>
                                            </div>
                                            <div className="col-3 mb-3">
                                                <select className="form-control upiSelect" onChange={(e)=>setgateway_3(e.target.value)}>
                                                    <option>Select Gateway</option>
                                                    {item.waynames.map((wayname, wayIndex) => (
                                                    <option key={wayIndex} value={item.typeName + "_" + item.waynumbers[wayIndex]}>
                                                        {wayname}
                                                    </option>
                                                    ))}
                                                </select>
                                                <input type="text" placeholder="Charge" className="form-control" style={{width: "72px", marginLeft: "120px", height: "37px"}} onChange={(e)=>setCharge_3(e.target.value)}/>
                                            </div>
                                            <div className="col-1">
                                                <button className='btn upiSave' style={{marginLeft: "auto", display: "flex"}} onClick={(e) => handleSubmit(e)}>Save</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </>
                            ) : <div className='text-center'>"No bank assign for this currency and merchant.."</div>}
                        </>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}

export default CurrencyModeSolution