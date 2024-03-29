import React from 'react';
import "./merchantAdmin.css";
import upi from "./merchantcurrency/cashless-payment.png"
import card from "./merchantcurrency/debit-card.png"
import ewallet from "./merchantcurrency/ewallet(1).png"
import transfer from "./merchantcurrency/transfer.png"
import code from "./merchantcurrency/code.png";
import { Link, useParams } from "react-router-dom";

function INR() {
    const { id } = useParams();
    // console.log(id)
  return (
    <>
        <div className="chartblockshdow">
            <div className="row">
                <div className="col-10">
                    <h2 style={{textAlign: "center"}}>INR METHOD</h2>
                </div>
                <div className="col-2">
                    <Link to={'/bankconnect/merchantAdmin'}>
                        <button className='btn inrBack'>Back</button>
                    </Link>
                </div>
            </div>
            <hr/>
            
            <table className="table table-borderless">
                <tbody>
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={upi} alt="switchicons" /><span style={{marginLeft: "40px"}}>UPI</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/INR/${id}/UPI`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={card} alt="switchicons" /><span style={{marginLeft: "40px"}}>CARD</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/INR/${id}/Card`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={ewallet} alt="switchicons" /><span style={{marginLeft: "40px"}}>E-WALLET</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/INR/${id}/Wallet`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={transfer} alt="switchicons" /><span style={{marginLeft: "40px"}}>NET BANKING</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/INR/${id}/NetBanking`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src={code} alt="switchicons" /><span style={{marginLeft: "40px"}}>UBANKCONNECT CODE</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/INR/${id}/UbankCodes`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default INR