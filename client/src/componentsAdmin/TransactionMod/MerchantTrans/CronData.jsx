// import React, { useEffect, useState } from "react";
// import baseUrl from "../../config/baseUrl";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Loader from "../../Loader/Loader";

// function CronData() {

//   const [tableData, setTableData] = useState([]);
//   let { invoice_id } = useParams();
//   const [loading,setLoading] =useState(true);
//   const [transaction_id, setTransaction_id] = useState("")

//   const fetchData = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("id", invoice_id);
//       let result = await axios.post(
//         `${baseUrl}/cronMerchantLogs`,
//         formData
//       );
//       setTableData(result.data.data[0]);
//       setTransaction_id(result.data.data[0].transaction_id)
//       setLoading(false)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => { 
//     fetchData();
//   }, []);

//   if(loading){
//     return <Loader />
//   }

//   return (
//     <>
//       <table className="table table-bordered" style={{border: "1px solid #000"}}>
//         <tbody>
//           <tr>
//             <th colspan="2" style={{textAlign: "center", background: "#456b7b", color: "#fff", fontWeight: "700"}}><i className="fa fa-file-text-o" style={{fontSize: "25px", color: "#fff"}}></i>&nbsp;Cron Data For Transaction ID:&nbsp;<span style={{textDecoration: "underline"}}>{transaction_id}</span></th>
//             <td style={{textAlign: "center", background: "#456b7b", color: "#fff", fontWeight: "700"}}>
//               <Link to="/bankconnect/MerchantTrans">
//                 <button className="btn-sm" style={{ 
//                     background: "#fff",
//                     float: "right",
//                     color: "#000",
//                     fontWeight: "700"
//                   }}>
//                   BACK
//                 </button>
//               </Link>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div style={{overflowX: "auto"}}>
//         <table className="table table-bordered" style={{border: "1px solid #000"}}>
//             <tbody>
//                 <tr>
//                     <th style={{fontWeight: "700"}}>Merchant to Ubank Connect Request</th>
//                     <td>{tableData.post_data ? tableData.post_data : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
//                 </tr>
//                 <tr>
//                     <th style={{fontWeight: "700"}}>Ubank Connect to Bank Request</th>
//                     <td>{tableData.akonto_request ? tableData.akonto_request : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
//                 </tr>
//                 <tr>
//                     <th style={{fontWeight: "700"}}>Bank Logs</th>
//                     <td>{tableData.curlresponse ? tableData.curlresponse : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
//                 </tr>
//                 <tr>
//                     <th style={{fontWeight: "700"}}>Bank Logs for update db time</th>
//                     <td>{tableData.pg_response_in_json ? tableData.pg_response_in_json : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
//                 </tr>
//                 <tr>
//                     <th style={{fontWeight: "700"}}>Cron Logs</th>
//                     <td>{tableData.data ? tableData.data : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
//                 </tr>
//             </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default CronData

import React, { useEffect, useState } from "react";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import Loader from "../../Loader/Loader";

const CronData = ({item}) => {
  
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [transaction_id, setTransaction_id] = useState("");
  const [loading,setLoading] =useState(true);

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", item);
      let result = await axios.post(
        `${baseUrl}/cronMerchantLogs`,
        formData
      );
      setTableData(result.data.data[0]);
      setTransaction_id(result.data.data[0].txn_id)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
          <button
              className="btn btn-primary mb-3 btn-sm"
              style={{width: "70px"}}
              onClick={handleClickOpen}
          >
              Cron
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={false}
            maxWidth={"lg"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                top: "0",
                margin: "0",
                borderRadius: "30px",
                width: "100%",
              },
            }}
          >
            <DialogContent>
              <div className="row">
                <div className="col-12 swapBox">
                  <>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th colspan="2" style={{background: "#456b7b", color: "#fff", fontWeight: "700"}}><i className="fa fa-file-text-o" style={{fontSize: "25px", color: "#fff"}}></i>&nbsp;Cron Data For Transaction ID:&nbsp;<span style={{textDecoration: "underline"}}>{transaction_id}</span></th>
                          <td style={{background: "#456b7b"}}>
                            <button
                              style={{
                                position: 'absolute',
                                top: '27px',
                                right: '50px',
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {loading ? (
                      <div><Loader /></div>
                    ) : (
                    <div style={{overflowX: "auto"}}>
                      <table className="table table-bordered" style={{border: "1px solid #000"}}>
                          <tbody>
                              <tr>
                                  <th style={{fontWeight: "700"}}>Merchant to Ubank Connect Request</th>
                                  <td>{tableData.post_data ? tableData.post_data : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
                              </tr>
                              <tr>
                                  <th style={{fontWeight: "700"}}>Ubank Connect to Bank Request</th>
                                  <td>{tableData.akonto_request ? tableData.akonto_request : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
                              </tr>
                              <tr>
                                  <th style={{fontWeight: "700"}}>Bank Logs</th>
                                  <td>{tableData.pg_response_in_json ? tableData.pg_response_in_json : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
                              </tr>
                              <tr>
                                  <th style={{fontWeight: "700"}}>Bank Logs for update db time</th>
                                  <td>{tableData.curlresponse ? tableData.curlresponse : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
                              </tr>
                              <tr>
                                  <th style={{fontWeight: "700"}}>Cron Logs</th>
                                  <td>{tableData.data ? tableData.data : <span style={{fontWeight: "700"}}>No Entry</span>}</td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    )}
                  </>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      </div>
    </>
  );
};

export default CronData