import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../AdminTable/MainTable";
import Search from "../../../commonAdminComp/SearchBox/Search";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import FilterDate from "../../../commonAdminComp/filterDate/FilterDate";
import FilterMerchant from "../../../commonAdminComp/FilterMerchant/FilterMerchant";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import * as XLSX from "xlsx";
import Card from "../../../commonAdminComp/Card/Card";
import ViewMerchantPayout from "./ViewMerchantPayout";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../../commonAdminComp/SearchItem/style.module.css"

function PayoutMerchants({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "AC.Type ",
    "Bank",
    "Payout Id",
    "Merchant",
    "Status",
    "Change Status",
    "Trx Type",
    "Amount",
    "Currency",
    "Created On",
    "Details"
  ];

  const [user_id, setUser_id] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(true)

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [merchantSelect, setMerchantSelect] = useState("");
  const [status, setStatus] = useState("");

  const auth = localStorage.getItem("admin");
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
      formData.append("limit", limitVal);
      formData.append("to", from);
      formData.append("from", to);
      formData.append("merchantName", merchantSelect);
      formData.append("status", status)
      formData.append("currency", currencySelect);
      formData.append("vendor", gatewaySelect);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultPM`, formData, config);

      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  // const payoutCards = async()=>{
  //   const auth = localStorage.getItem("admin");
  //   let formData = new FormData();
  //   formData.append("to", from );
  //   formData.append("from", to );
  //   formData.append("merchantName", merchantSelect);
  //   formData.append("status", status);
  //   formData.append("searchText", searchVal);
  //   formData.append("currency", currencySelect);
  //   formData.append("payout_bank", gatewaySelect);
    
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       Authorization: `Bearer ${auth}`,
  //     },
  //   };

  //   axios
  //     .post(`${baseUrl}/payoutCards`, formData, config)
  //     .then((res) => {
  //       // console.log(res);
  //       setCardData( res?.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
        `${baseUrl}/payoutGateway`,
        formData,
        config
      );
      setCurrencyName(result1.data.Data);
      setGateway(result.data.payoutResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
    // payoutCards();
    typeDataFirst();
  }, [page, searchVal, limitVal, to,from, merchantSelect, status, currencySelect, gatewaySelect]);

  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      if (status === "SUCCESS") {
        formData.append("status", "SUCCESS");
      } else if (status === "FAILURE") {
        formData.append("status", "FAILURE");
      } else {
        formData.append("status", "PENDING");
      }

      let result = await axios.post(`${baseUrl}/toggleStatusPM`, formData);
      ReadData();

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

  const downloadExl = () => {
    const auth = localStorage.getItem("admin");
    let formData = new FormData();
    formData.append("to", from );
    formData.append("from", to );
    formData.append("merchantName", merchantSelect);
    formData.append("status", status);
    formData.append("vendor", gatewaySelect);
    formData.append("currency", currencySelect);
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
  
    axios.post(`${baseUrl}/exportPayouts`, formData, config)
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

  if(loading){
    return <Loader />
  }

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
                    {item.trx_from === 0 ? <h6>Nodel</h6> : <h6>Current</h6>}
                  </TableCell>
                  <TableCell align="center">
                    {item.payout_bank === 1 ? (
                      <h6>ICICI</h6>
                    ) : item.payout_bank === 2 ? (
                      <h6>Gate8</h6>
                    ) : (
                      <h6>YT Pay</h6>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.uniqueid}</TableCell>
                  <TableCell align="center">
                    <div className="mName">
                      &#40;{item.users_id}&#41;&nbsp;{item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around">
                      <button
                        className="btn btn-success btn-sm"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "SUCCESS")}
                      >
                        S
                      </button>
                      <button
                        className="mx-2 btn btn-danger btn-sm"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "FAILURE")}
                      >
                        F
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "PENDING")}
                      >
                        P
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.trx_type}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">{item.currency}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  <TableCell align="center">
                    <ViewMerchantPayout item={item}/>
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
        <div className="row mb-3">
          <div className="col-10">
          <h4 className="headingAll">Merchants Payouts</h4> 
          </div>
          <div className="col-2">
            {/* {authCreate ? (
              <NewPayout ReadData={ReadData} authCreate={authCreate} />
            ) : null} */}
          </div>
        </div>
        {/* <div className="mb-5">
          <Card carddata={cardData} />
        </div> */}
        <div className="row align-items-center mb-3">
          <div className="col-2 d-flex">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
            <div className={styles.bankSearch}>
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Payout Id"
              />
            </div>
          </div>
          <div className="col-5 d-flex">
            <FilterField  setTo={setTo}  setFrom={setFrom} setMerchantSelect={setMerchantSelect} setStatus= {setStatus} xlData={tableData}/>
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
                <option value={item.id}>{item.gateway_name}</option>
              ))}
            </select>
          </div>
          <div className="col-1">
            <button className="btn-sm"
              style={{
                background: "#ff6600",
                borderRadius: "60px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer",
                float: "inline-end"
              }} onClick={downloadExl}>Download</button>
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

const FilterField = ({ setFrom, setTo,setMerchantSelect, setStatus }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
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
                <option value="FAILURE">FAILED</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayoutMerchants;
