import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import FilterDate from "../../../commonAdminComp/filterDate/FilterDate";
import FilterMerchant from "../../../commonAdminComp/FilterMerchant/FilterMerchant";
import Loader from "../../Loader/Loader";
import * as XLSX from "xlsx";
import Card from "../../../commonAdminComp/Card/Card";
import { Dialog, DialogContent, DialogTitle, Popover } from "@mui/material";
import MerchantView from "./MerchantView";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../../commonAdminComp/SearchItem/style.module.css"


// Images
import idr from "../images/idrflag.svg"
import inr from "../images/inrflg.svg"
import php from "../images/phpflag.svg"
import bdt from "../images/bdtflag.svg"
import brl from "../images/brlflag.svg"
import clp from "../images/clpflag.svg"
import cny from "../images/cnyflag.svg"
import crc from "../images/crcflag.svg"
import euro from "../images/euroflag.svg"
import gtq from "../images/gtqflag.svg"
import krw from "../images/krwflag.svg"
import lak from "../images/lakflag.svg"
import mxn from "../images/mxnflag.svg"
import myr from "../images/myrflag.svg"
import pen from "../images/penflag.svg"
import pkr from "../images/pkrflag.svg"
import thb from "../images/thbflag.svg"
import ugx from "../images/ugxflag.svg"
import usd from "../images/usdflag.svg"
import vnd from "../images/vndflag.svg"
import zar from "../images/zarflag.svg"
import CronData from "./CronData";

function MerchantTrans({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Merchant Name",
    "Created On",
    "Currency",
    "Status",
    "MOrder No",
    "Order No",
    "Transaction Id",
    "Pay By",
    "Req Amount",
    "Deposit Charges",
    "Net Amt",
    "Action",
    "Details",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  // const [searchDate, setSearchDate] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [merchantSelect, setMerchantSelect] = useState("");
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading] =useState(true)
  const auth = localStorage.getItem("admin");
  const [status, setStatus] = useState("")
  const [cardData, setCardData] = useState([]);
  const [currencyName, setCurrencyName] = useState([]);
  const [currencySelect, setCurrencySelect] = useState("");
  const [gateway, setGateway] = useState([]);
  const [gatewaySelect, setGatewaySelect] = useState("");
   

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchText", searchVal);
      // formData.append("searchDate",searchDate)
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );
      formData.append("merchantName", merchantSelect);
      formData.append("status", status);
      formData.append("currency", currencySelect);
      formData.append("gatewayNumber", gatewaySelect);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultMT`, formData, config);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  // const depositsCards = async()=>{
  //   const auth = localStorage.getItem("admin");
  //   let formData = new FormData();
  //   formData.append("to", from );
  //   formData.append("from", to );
  //   formData.append("merchantName", merchantSelect);
  //   formData.append("status", status);
  //   formData.append("searchText", searchVal);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       Authorization: `Bearer ${auth}`,
  //     },
  //   };

  //   axios
  //     .post(`${baseUrl}/depositsCards`, formData, config)
  //     .then((res) => {
  //       // console.log(res);
  //       setCardData( res?.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  const typeDataFirst = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result1 = await axios.post(
        `${baseUrl}/allCurrency`,
        formData,
        config
      );
      let result = await axios.post(
        `${baseUrl}/payinGateway`,
        formData,
        config
      );
      setCurrencyName(result1.data.Data);
      setGateway(result.data.paymentResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
    // depositsCards();
    typeDataFirst();
  }, [page, searchVal, limitVal, to, from,merchantSelect, status, currencySelect, gatewaySelect]);

  if(loading){
    return <Loader />
  }

  const downloadExl = () => {
    const auth = localStorage.getItem("admin");
    let formData = new FormData();
    formData.append("to",from );
    formData.append("from",to );
    formData.append("merchantName", merchantSelect);
    formData.append("status", status);
    formData.append("currency", currencySelect);
    formData.append("gatewayNumber", gatewaySelect);
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
  
    axios.post(`${baseUrl}/exportMT`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Payout");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "Payout.xlsx");
      })
      .catch((err) => console.log(err));
  };

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#bfbfbf",
                      cursor: "auto"
                    },
                  }}
                  key={index}
                >
                  <TableCell align="center">
                    <div className="mName">
                      &#40;{item.user_id}&#41;&nbsp;{item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>
                    {
                      item.ammount_type === "IDR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={idr} alt="idr" width="30px" />
                        </>
                      ) : item.ammount_type === "INR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={inr} alt="ruppe" width="30px" />
                        </>
                      ) : item.ammount_type === "PHP" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={php} alt="php" width="30px" />
                        </>
                      ) : item.ammount_type === "BDT" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={bdt} alt="bdt" width="30px" />
                        </>
                      ) : item.ammount_type === "BRL" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={brl} alt="brl" width="30px" />
                        </>
                      ) : item.ammount_type === "CLP" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={clp} alt="clp" width="30px" />
                        </>
                      ) : item.ammount_type === "CNY" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={cny} alt="cny" width="30px" />
                        </>
                      ) : item.ammount_type === "CRC" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={crc} alt="crc" width="30px" />
                        </>
                      ) : item.ammount_type === "EUR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={euro} alt="euro" width="30px" />
                        </>
                      ) : item.ammount_type === "GTQ" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={gtq} alt="gtq" width="30px" />
                        </>
                      ) : item.ammount_type === "KRW" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={krw} alt="krw" width="30px" />
                        </>
                      ) : item.ammount_type === "LAK" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={lak} alt="lak" width="30px" />
                        </>
                      ) : item.ammount_type === "MXN" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={mxn} alt="mxn" width="30px" />
                        </>
                      ) : item.ammount_type === "MYR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={myr} alt="myr" width="30px" />
                        </>
                      ) : item.ammount_type === "PEN" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={pen} alt="pen" width="30px" />
                        </>
                      ) : item.ammount_type === "PKR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={pkr} alt="pkr" width="30px" />
                        </>
                      ) : item.ammount_type === "THB" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={thb} alt="thb" width="30px" />
                        </>
                      ) : item.ammount_type === "UGX" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={ugx} alt="ugx" width="30px" />
                        </>
                      ) : item.ammount_type === "USD" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={usd} alt="usd" width="30px" />
                        </>
                      ) : item.ammount_type === "VND" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={vnd} alt="vnd" width="30px" />
                        </>
                      ) : item.ammount_type === "ZAR" ? (
                        <>
                          <span>{item.ammount_type}</span>&nbsp;&nbsp;
                          <img src={zar} alt="zar" width="30px" />
                        </>
                      ) : ""
                    }
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 0 ? (
                      <h6>Failed</h6>
                    ) : item.status === 1 ? (
                      <h6>Success</h6>
                    ) : item.status === 2 ? (
                      <h6>Waiting</h6>
                    ) : item.status === 3 ? (
                      <h6>Pending</h6>
                    ) : item.status === 4 ? (
                      <h6>Refund</h6>
                    ) : (
                      <h6>ChargeBack</h6>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.txn_id}</TableCell>
                  <TableCell align="center">{item.order_no}</TableCell>
                  <TableCell align="center">{item.transaction_id}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.payment_type}</TableCell>
                  <TableCell align="center">{item.ammount}</TableCell>
                  <TableCell align="center">{item.payin_charges}</TableCell>
                  <TableCell align="center">{item.settle_amount}</TableCell>
                  <TableCell align="center">
                    {/* <div>
                      <button
                        className="btn btn-success"
                        onClick={() => changeToSuccess(item.invoice_id)}
                        style={{width: "120%"}}
                      >
                        Success
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => changeToFailed(item.invoice_id)}
                        style={{width: "120%"}}
                      >
                        Failed
                      </button>
                    </div> */}
                    <PopUpAction item={item.invoice_id} ReadData={ReadData} />
                  </TableCell>
                  <TableCell align="center">
                    <PopUp item={item} authRead={authRead} ReadData={ReadData}/>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <h4>No Data Found</h4>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </>
    );
  };
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row mb-5">
          <div className="col-10">
            <h4 className="headingAll">Merchants Transaction</h4>
          </div>
          <div className="col-2">
            {/* {authCreate ? (
              <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData} />
            ) : null} */}
          </div>
        </div>
        {/* <div className="mb-5"> */}
          {/* <Card carddata={cardData} /> */}
        {/* </div> */}
        <div className="row d-flex justify-content-center align-items-lg-center mb-5">
          <div className="col-2 d-flex">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
            <div className={styles.bankSearch}>
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Transaction Id"
              />
            </div>
          </div>
          <div className="col-5 d-flex">
            <FilterField  setTo={setTo}  setFrom={setFrom} setMerchantSelect={setMerchantSelect} xlData={tableData} setStatus= {setStatus}/>
          </div>
          <div className="col-2">
            <select className="form-select depositSelect" style={{borderRadius: "20px"}} onChange={(e)=>setCurrencySelect(e.target.value)}>
              <option>Currency</option>
              {
                currencyName.map((item, index) => {
                  return (
                    <option key={index} value={item.sortname}>
                      {item.sortname}
                    </option>
                  );
                })
              }
            </select>
          </div>
          <div className="col-2">
            <select className="form-select depositSelect" style={{borderRadius: "20px"}} onChange={(e)=>setGatewaySelect(e.target.value)}>
              <option>Vendor</option>
              {gateway.map((item, index) => (
                <option value={item.gateway_number}>{item.gateway_name}</option>
              ))}
            </select>
          </div>
          <div className="col-1">
            <button className="btn-sm" 
              style={{
                background: "#ff6600",
                borderRadius: "20px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer",
                float: "inline-end"
              }}
              onClick={downloadExl}>Download</button>
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
      </Box>
    </>
  );
}

const FilterField = ({ setFrom, setTo,setMerchantSelect,xlData, setStatus }) => {
  return (
    <>
      <div className="row justify-content-between align-items-center">
        <div className="col-5">
          <FilterDate setTo={setTo} setFrom={setFrom} />
        </div>
        <div className="col-4">
          <FilterMerchant setMerchantSelect={setMerchantSelect} />
        </div>
        <div className="col-3">
          <select className="form-select depositSelect" onChange={(e)=>setStatus(e.target.value)} style={{borderRadius: "20px"}}>
            <option selected>Status</option>
            <option value="0">Failed</option>
            <option value="1">Success</option>
            <option value="2">Waiting</option>
            <option value="3">Pending</option>
            <option value="4">Refund</option>
            <option value="5">Chargeback</option>
          </select>
        </div>
      </div>
    </>
  );
};

const PopUp = ({item, authRead }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  
  return (
    <>
      <div>
        <img
          src="https://www.bankconnect.online/assets/merchants/img/more-v.svg"
          alt=""
          className="mx-2"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          PaperProps={{
            style: { width: "100px" },
          }}
        >

        <div className="d-flex  align-items-center justify-content-around flex-column">
          {authRead ? (
            <MerchantView item={item} />
          ) : null}
          {/* <Link to={`/bankconnect/MerchantTrans/CronData/${item.invoice_id}`}>
            <button className="btn btn-primary mb-3 btn-sm" style={{width: "70px"}}>Cron</button>
          </Link> */}
          <CronData item={item.invoice_id}/>
          <Link to={`/bankconnect/MerchantTrans/StatusData/${item.order_no}`}>
            <button className="btn btn-success mb-3 btn-sm">Status</button>
          </Link>
          {/* <StatusView ID={item.order_no} /> */}
        </div>
          
        </Popover>
      </div>
    </>
  );
};

const PopUpAction = ({ item, ReadData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleStatus = async (item, status) => {
    try {
      let formData = new FormData();
      formData.append("id", item);
      if (status === 0 ) {
        formData.append("status", 0);
      } else if (status === 1 ){
        formData.append("status", 1);
      } else if (status === 2) {
        formData.append("status", 2);
      } else if (status === 3) {
        formData.append("status", 3);
      } else if (status === 4 ){
        formData.append("status", 4);
      } else if (status === 5 ){
        formData.append("status", 5)
      }

      let result = await axios.post(`${baseUrl}/toggleStatusMT`, formData);
      ReadData()
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div>
        <button className="button-34" onClick={handleClick}>Status</button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          PaperProps={{
            style: { width: "150px" },
          }}
        >

        <div className="d-flex  align-items-center justify-content-around flex-column">
          <button className="btn btn-success btn-sm mt-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 1)}
          >Success</button>
          <button className="btn btn-danger btn-sm mt-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 0)}
          >Failed</button>
          <button className="btn btn-info btn-sm mt-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 2)}
          >Waiting</button>
          <button className="btn btn-warning btn-sm mt-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 3)}
          >Pending</button>
          <button className="btn btn-primary btn-sm mt-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 4)}
          >Refund</button>
          <button className="btn btn-secondary btn-sm mt-3 mb-3" style={{width: "120px"}}
            onClick={() => toggleStatus(item, 5)}
          >ChargeBack</button>
        </div>
          
        </Popover>
      </div>
    </>
  );
};

const DialogOpenModelAdd = ({ authCreate, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [user_id, setUser_id] = useState("");
  const [type, setType] = useState("")
  const [uniqueId, setUniqueId] = useState("")
  const [currencyID, setCurrencyID] = useState("")
  const [payee_name, setPayee_name] = useState("")
  const [amount, setAmount] = useState("")
  const [data, setData] = useState([]);
  const [pass, setPass] = useState([]);

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };

  const details = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/allMerchant`,config);
      setData(result.data.Data);
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    details();
  }, []);

  const MerchantCurrency = async(val)=>{  
    try{
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let formData = new FormData();
        formData.append("id", val);
      let cur = await axios.post(`${baseUrl}/getCurrencyMT`, formData, config)

      setPass(cur.data.data);
    
    } catch(error){
        console.log(error);
    }
  }

  const auth = localStorage.getItem("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user_id || !type || !uniqueId || !currencyID || !payee_name || !amount) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
        merchantId: user_id,
        currency_id: currencyID,
        trx_type: type,
        transaction_id: uniqueId,
        name: payee_name,
        amount: amount
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createMT`, values, config);
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      ReadData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
          {authCreate ? (
            <button
              style={{
                background: "#ff6600",
                borderRadius: "30px",
                color: "#fff",
                width: "100px",
                height: "36px",
                cursor: "pointer",
                float: "right"
              }}
              onClick={handleClickOpen}
            >
              Add New
            </button>
          ) : null}
          <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={false}
              maxWidth={"md"}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style: {
                  top: "0",
                  margin: "0",
                  borderRadius: "30px",
                },
              }}
          >
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
              <DialogTitle
                  id="alert-dialog-title"
                  style={{ fontWeight: "700", fontSize: "20px" }}
              >
                  New Deposit Transaction
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Merchant</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select" value={user_id} onChange={(e)=>{MerchantCurrency(e.target.value);setUser_id(e.target.value)}}>
                              <option value="select name">Select Merchant</option>
                              {
                                data?.map((item,index)=>{
                                return(
                                  <option key={index} value={item.id}>
                                  {item.name}
                                  </option>
                                );
                                })
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Currency</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select" value={currencyID} onChange={(e)=>setCurrencyID(e.target.value)}>
                              <option value="-1">Select Currency</option>
                              {
                                pass?.map((item,index)=>{
                                  return(
                                    <option key={index} value={item.currencyID}>
                                      {item.sortname}
                                    </option>
                                  );
                                })
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Trx. Type</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select" value={type} onChange={(e)=>setType(e.target.value)}>
                              <option value="-1">Select Trx. Type</option>
                              <option value="CASH">Cash</option>
                              <option value="CRYPTO">Crypto</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Transaction Id</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Transaction Id" className="form-control mb-3" onChange={(e) => setUniqueId(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Name" className="form-control mb-3" onChange={(e) => setPayee_name(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Amount</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Amount" className="form-control mb-3" onChange={(e) => setAmount(e.target.value)} />
                          </div>
                        </div>
                        <div>
                            <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} type="submit">Create</button>
                        </div>
                        {formIncomplete && (
                          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
                        )}
                      </form>
                    </div>
                </div>
              </DialogContent>
          </Dialog>
      </div>
    </>
  );
};

export default MerchantTrans;