// import React, { useEffect, useState } from "react";
// import Modal from 'react-bootstrap/Modal';
// import Accordion from 'react-bootstrap/Accordion';
// import baseUrl from "../config/baseUrl";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Payout({ id }) {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => {
//         Currency(id);
//         setShow(true);
//     };

//     const [paymentData, setPaymentData] = useState([]);
//     const [payoutGateway, setPayoutGateWay] = useState("");
//     const [choosedCurrency, setChoosedCurrency] = useState([])
//     const labels = ["Card", "UPI", "BANK TRANSFER", "WALLET", "QR CODE"];
//     const auth = localStorage.getItem("admin");

//     const ReadData = async () => {
//         try {
//         let formData = new FormData();

//         const config = {
//             headers: {
//             "content-type": "multipart/form-data",
//             Authorization: `Bearer ${auth}`,
//             },
//         };

//         let result = await axios.post(
//             `${baseUrl}/payoutGateway`,
//             formData,
//             config
//         );
//         setPaymentData(result.data.payoutResult);
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     const Currency = async (merchantId) => {
//         try {
//             let value = {
//                 id: merchantId
//             }
//             const config = {
//                 headers: {
//                     "Content-type": "application/json",
//                     Accept: "application/json",
//                     Authorization: `Bearer ${auth}`,
//                 },
//             };

//             let result = await axios.post(
//                 `${baseUrl}/merchantCurrency`,
//                 value,
//                 config
//             );
//             setChoosedCurrency(result.data.data)
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         ReadData();
//     }, []);

//     const updateSelectKey = async (name, type, value) => {
//         try {
//         let formData = new FormData();
//         formData.append("merNo", id);
//         formData.append("currency", name);
//         formData.append("type", type);
//         formData.append("gatewayNo", value);
//         const config = {
//             headers: {
//             "content-type": "multipart/form-data",
//             Authorization: `Bearer ${auth}`,
//             },
//         };

//         let result = await axios.post(
//             `${baseUrl}/assignPayoutGateway`,
//             formData,
//             config
//         );
//         toast.success(result.data.message, {
//             position: "bottom-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//         ReadData();
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     return (
//         <>
//         <button className=" btn btn-warning payin btn-sm" onClick={handleShow} style={{width: "100%", color: "#fff"}}>Assign Payout</button>
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header>
//                 <button
//                     style={{
//                         position: 'absolute',
//                         top: '10px',
//                         right: '10px',
//                         background: '#ff6600',
//                         border: 'none',
//                         borderRadius: '50%',
//                         cursor: 'pointer',
//                         padding: '5px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         width: '32px',
//                         height: '32px',
//                     }}
//                     onClick={handleClose}
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="white"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-x"
//                         style={{
//                             display: 'block',
//                             width: '100%',
//                             height: '100%',
//                         }}
//                     >
//                         <line x1="18" y1="6" x2="6" y2="18"></line>
//                         <line x1="6" y1="6" x2="18" y2="18"></line>
//                     </svg>
//                 </button>
//                 <Modal.Title style={{fontSize: "20px"}}>Assign Gateway For One Or More Currency</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Accordion>
//                     {
//                         choosedCurrency ? (
//                             <>
//                                 {choosedCurrency.map((currency, indexCurrency) => (
//                                     <Accordion.Item key={indexCurrency} eventKey={indexCurrency.toString()}>
//                                         <Accordion.Header>{currency}</Accordion.Header>
//                                         <Accordion.Body>
//                                             <div className="d-flex justify-content-around flex-column">
//                                                 {Array.from({ length: 5 }).map((_, index) => (
//                                                     <div className="row" key={index}>
//                                                         <div className="col-10">
//                                                             <label className="GatewayLabel">
//                                                                 <span>{labels[index]}</span>
//                                                                 <select
//                                                                     className="form-select form-select-sm new"
//                                                                     style={{ width: "150px" }}
//                                                                     onChange={(e) => {setPayoutGateWay(e.target.value)}}
//                                                                 >
//                                                                     <option value="SELECT GATEWAY">SELECT GATEWAY</option>
//                                                                     {paymentData.map((payment, indexPayment) => (
//                                                                         <option key={indexPayment} value={payment.id}>
//                                                                             {payment.gateway_name}
//                                                                         </option>
//                                                                     ))}
//                                                                 </select>
//                                                             </label>
//                                                         </div>
//                                                         <div className="col-2">
//                                                             <button className="btn btn-info mb-3" onClick={() => updateSelectKey(currency, index + 1, payoutGateway)} style={{color: "#fff"}}>Save</button>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </Accordion.Body>
//                                     </Accordion.Item>
//                                 ))}
//                             </>
//                         ) : (
//                             <span style={{textAlign: "center", fontWeight: "700", display: "block"}}>
//                                 Merchant Has Not Chosen Any Currency
//                             </span>
//                         )
//                     }
//                 </Accordion>
//             </Modal.Body>
//         </Modal>
//         </>
//     );
// }

// export default Payout;




import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

function Payout({ id }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        Currency(id);
        setShow(true);
    };

    const [paymentData, setPaymentData] = useState([]);
    const [payoutGateway, setPayoutGateWay] = useState("");
    const [choosedCurrency, setChoosedCurrency] = useState([])
    const labels = ["Card", "UPI", "BANK TRANSFER", "WALLET", "QR CODE"];
    const auth = localStorage.getItem("admin");
    // const [choosedGate, setChoosedGate] = useState("")

    const ReadData = async () => {
        try {
        let formData = new FormData();

        const config = {
            headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
            },
        };

        let result = await axios.post(
            `${baseUrl}/payoutGateway`,
            formData,
            config
        );
        setPaymentData(result.data.payoutResult);
        } catch (error) {
        console.log(error);
        }
    };

    const Currency = async (merchantId) => {
        try {
            let value = {
                id: merchantId
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            };

            let result = await axios.post(
                `${baseUrl}/merchantCurrency`,
                value,
                config
            );
            setChoosedCurrency(result.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    // const handleAccordionClick = async (selectedCurrency) => {
    //     try {
    //         // Do something with the selected currency and payout gateway
    //         console.log(`Selected Currency: ${selectedCurrency}, merchant_id: ${id}`);
    //         let value = {
    //             id: id,
    //             currency: selectedCurrency
    //         }
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //                 Accept: "application/json",
    //                 Authorization: `Bearer ${auth}`,
    //             },
    //         };

    //         let result = await axios.post(
    //             `${baseUrl}/payoutdefault`,
    //             value,
    //             config
    //         );
    //         console.log(result.data.result[0]);
    //         // setChoosedGate(result.data.result[0].gatewayNo);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        ReadData();
    }, []);

    const updateSelectKey = async (name, value) => {
        try {
        let formData = new FormData();
        formData.append("merNo", id);
        formData.append("currency", name);
        // formData.append("type", type);
        formData.append("gatewayNo", value);
        const config = {
            headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
            },
        };

        let result = await axios.post(
            `${baseUrl}/assignPayoutGateway`,
            formData,
            config
        );
        toast.success(result.data.message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        ReadData();
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <>
        <button className=" btn btn-warning payin btn-sm" onClick={handleShow} style={{width: "100%", color: "#fff"}}>Assign Payout</button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
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
                <Modal.Title style={{fontSize: "20px"}}>Assign Gateway For One Or More Currency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {
                        choosedCurrency ? (
                            <>
                                {choosedCurrency.map((currency, indexCurrency) => (
                                    <Accordion.Item key={indexCurrency} eventKey={indexCurrency.toString()}>
                                        <Accordion.Header 
                                            // onClick={() => handleAccordionClick(currency)}
                                        >{currency}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex justify-content-around flex-column">
                                                {/* {Array.from({ length: 5 }).map((_, index) => ( */}
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <label className="GatewayLabel">
                                                                {/* <span>{labels[index]}</span> */}
                                                                <span style={{lineHeight: "30px"}}>Payout Gateway</span>
                                                                <select
                                                                    className="form-select form-select-sm new"
                                                                    style={{ width: "150px" }}
                                                                    // value={choosedGate}
                                                                    onChange={(e) => {setPayoutGateWay(e.target.value)}}
                                                                >
                                                                    <option value="SELECT GATEWAY">SELECT GATEWAY</option>
                                                                    {paymentData.map((payment, indexPayment) => (
                                                                        <option key={indexPayment} value={payment.id}>
                                                                            {payment.gateway_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </label>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-info mb-3" onClick={() => updateSelectKey(currency, payoutGateway)} style={{color: "#fff"}}>Save</button>
                                                        </div>
                                                    </div>
                                                {/* ))} */}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </>
                        ) : (
                            <span style={{textAlign: "center", fontWeight: "700", display: "block"}}>
                                Merchant Has Not Chosen Any Currency
                            </span>
                        )
                    }
                </Accordion>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default Payout;