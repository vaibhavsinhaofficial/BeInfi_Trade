import React, { useState, useEffect } from 'react';
import axios from "axios";

const Help2pay = () => {
    const [merchant, setMerchant] = useState('');
    const [currency, setCurrency] = useState('');
    const [customer, setCustomer] = useState('');
    const [reference, setReference] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [amount, setAmount] = useState('');
    const [datetime, setDatetime] = useState('');
    const [frontURI, setFrontURI] = useState('');
    const [backURI, setBackURI] = useState('');
    const [bank, setBank] = useState('');
    const [language, setLanguage] = useState('');
    const [clientIP, setClientIP] = useState('');
    
    const fetchData = async () => {
        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json",
                },
            };
            let res = await axios.post(
                `http://localhost:9240/help2Pay`, config
            );
            setMerchant(res.data.Merchant)
            setCurrency(res.data.Currency)
            setCustomer(res.data.Customer)
            setReference(res.data.Reference)
            setKeyValue(res.data.Key)
            setAmount(res.data.Amount)
            setDatetime(res.data.Datetime)
            setFrontURI(res.data.FrontURI)
            setBackURI(res.data.BackURI)
            setBank(res.data.Bank)
            setLanguage(res.data.Language)
            setClientIP(res.data.ClientIP)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const redirectURL = 'https://api.testingzone88.com/MerchantTransfer';
        const queryParams = `?merchant=${merchant}&currency=${currency}&customer=${customer}&reference=${reference}&key=${keyValue}&amount=${amount}&datetime=${datetime}&frontURI=${frontURI}&backURI=${backURI}&bank=${bank}&language=${language}&clientIP=${clientIP}`;
        window.location.href = redirectURL + queryParams;
        console.log();
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm" style={{borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "50%", marginLeft: "25%"}}>

                <h1 className="mb-4 text-center">LIVE Payment TEST</h1>
                <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                        <label htmlFor="merchant" className="col-sm-3 form-label text-dark">Merchant  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="merchant"
                                className="form-control"
                                value={merchant}
                                onChange={(e) => setMerchant(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3" >
                        <label htmlFor="currency" className="col-sm-3 form-label">Currency  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="currency"
                                className="form-control"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label htmlFor="customer" className="col-sm-3 form-label">Customer  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="customer"
                                className="form-control"
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label htmlFor="reference" className="col-sm-3 form-label">Reference  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="reference"
                                className="form-control"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="keyValue" className="col-sm-3 form-label">keyValue  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="keyValue"
                                className="form-control"
                                value={keyValue}
                                onChange={(e) => setKeyValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="amount" className="col-sm-3 form-label">Amount  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="amount"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="datetime" className="col-sm-3 form-label">DateTime  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="datetime"
                                className="form-control"
                                value={datetime}
                                onChange={(e) => setDatetime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="frontURI" className="col-sm
                        -3 form-label">FrontURI  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="frontURI"
                                className="form-control"
                                value={frontURI}
                                onChange={(e) => setFrontURI(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="backURI" className="col-sm-3 form-label">BackURI  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="backURI"
                                className="form-control"
                                value={backURI}
                                onChange={(e) => setBackURI(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="bank" className="col-sm-3 form-label">Bank  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="bank"
                                className="form-control"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="language" className="col-sm-3 form-label">Language  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="language"
                                className="form-control"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />

                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="clientIP" className="col-sm-3 form-label">ClientIP  :</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="clientIP"
                                className="form-control"
                                value={clientIP}
                                onChange={(e) => setClientIP(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-4">
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div >
    );
};

export default Help2pay;