import React from 'react'
import { Link, useParams } from 'react-router-dom'

function NonInr() {
    const { id } = useParams();
  return (
    <>
        <div className='chartblockshdow'>
            <div className="row">
                <div className="col-10">
                    <h2 style={{textAlign: "center"}}>NON-INR CURRENCIES</h2>
                </div>
                <div className="col-2">
                    <Link to={'/bankconnect/merchantAdmin'}>
                        <button className='btn inrBack'>Back</button>
                    </Link>
                </div>
            </div>
            <hr />

            <table className="table table-borderless">
                <tbody>	

                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/brl.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Brazil [ BRL ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'BRL'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/clp.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Chile [ CLP ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'CLP'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/cny.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>China [ CNY ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'CNY'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/crc.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Costa Rica [ CRC ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'CRC'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/eur.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Euro [ EUR ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'EUR'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/gtq.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Guatemala [ GTQ ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'GTQ'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/indo.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Indonesia [ IDR ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'IDR'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/lak.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Laos [ LAK ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'LAK'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/myr.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Malaysia [ MYR ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'MYR'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/mxn.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Mexico [ MXN ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'MXN'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/pkr.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Pakistan [ PKR ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'PKR'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/sol.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Peru [ PEN ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'PEN'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/php.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Philippines [ PHP ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'PHP'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/zar.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>South Africa [ ZAR ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'ZAR'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/krw.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>South Korea [ KRW ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'KRW'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/baht.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Thailand [ THB ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'THB'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/dollar.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>United States Of America [ USD ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'USD'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/dong.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Vietnam [ VND ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'VND'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/bdt.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Bangladesh [ BDT ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'BDT'}`}>
                                <button className='btn optionBtn'>Click Here For Payment Methods</button>
                            </Link>
                        </td>
                    </tr>
                                                    
                    <tr style={{borderBottom: "1px solid #bfbfbf"}}>
                        <td>
                            <div className="currencyBox">
                                <div className="currencyHeading">
                                    <h6><img src="https://payoway.com/web/assets/merchants/img/currency/ugx.svg" alt="switchicons" /><span style={{marginLeft: "20px", fontWeight: "700"}}>Uganda [ UGX ]</span></h6>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign: "end", verticalAlign: "middle"}}>
                            <Link to={`/bankconnect/NonInr/${id}/CurrencyModeSolution?cur=${'UGX'}`}>
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

export default NonInr