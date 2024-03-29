import React, { useEffect, useState } from "react";
import "../../DEPOSIT/deposire.css";
import axios from "axios";
import SandboxTableCom from "../Deposits/SandboxTableCom";
import Pagination from "@mui/material/Pagination";
import Search from "../../../commonCompMerchant/SearchBox/Search";
import FilterDate from "../../../commonCompMerchant/filterDate/FilterDate";
import Filter from "../../../commonCompMerchant/filter/Filter";
import Card from "../../../commonCompMerchant/Card/Card";
import baseUrl from "../../../componentsMerchant/config/baseUrl";
import * as XLSX from "xlsx";
import { useStateContext } from "../../../context/ContextProvider";

const Footer = ({ setPage, page, totalPage, message }) => {
  const pageNumber = (e, p) => {
    setPage(p);
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-4">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={5}
            siblingCount={0}
            size="large"
            color="primary"
            onChange={pageNumber}
          />
        </div>
      </div>
    </>
  );
};

const SecondBlock = ({
  orderNumber,
  setorderNumber,
  setDate,
  setFrom,
  setTo,
  methodPayment,
  setMethodPayment,
  currencyPayment,
  setCurrencyPayment,
  statusPayment,
  setStatusPayment,
  tableBodyData,
  xlData,
  setXlData,
}) => {
  const { dropdownMerchant } = useStateContext();
  


  return (
    <>
      <div className="row justify-content-around  my-5 align-items-center">
        <div className="col-4 ">
          <Search orderNumber={orderNumber} setorderNumber={setorderNumber} />
        </div>
        <div className="col-3 ">
          <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
        </div>
        <div className="col-2 ">
          <Filter
            methodPayment={methodPayment}
            setMethodPayment={setMethodPayment}
            currencyPayment={currencyPayment}
            setCurrencyPayment={setCurrencyPayment}
            statusPayment={statusPayment}
            setStatusPayment={setStatusPayment}
            setDate={setDate}
          />
        </div>
        <div className="col-3 ">
          {/* <button className="downloadDeposite" onClick={downloadExl}>
            <img
              src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
              alt=""
              width="20px"
              className="mx-2"
            />
            Download Reports
          </button> */}
        </div>
      </div>
    </>
  );
};

function SandboxDeposit() {
  // Download Data
  const [xlData,setXlData]= useState([]);
  const { dropdownMerchant } = useStateContext();
  // CARD DATA
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  // +++++++++++++++++++++Table Data++++++++++++++++++++
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  const [message, setMessage] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  //Filter CheackBox

  let [methodPayment, setMethodPayment] = useState([]);
  let [status, setStatusPayment] = useState([]);
  let [currency, setCurrencyPayment] = useState([]);
  
  const fetchDatafilterall = () => {
    const auth = localStorage.getItem("user");
    let values;
    if (date) {
      values = {page: page, date: date}
      
    } else if (from && to) {
      values = {page: page, from: from, to: to}
       
    } else if (
      methodPayment.length > 0 &&
      status.length > 0 &&
      currency.length > 0
    ) {
      values = {page: page, methodPayment, status, currency}
    } else if (methodPayment.length > 0 && status.length > 0) {
      values = {page: page, methodPayment, status}
    } else if (status.length > 0 && currency.length > 0) {
      values = {page: page, status, currency}
    } else if (methodPayment.length > 0 && currency.length > 0) {
      values = {page: page, methodPayment, currency}
    } else if (methodPayment.length > 0) {
      values = {page: page, methodPayment}
    } else if (status.length > 0) {
      values = {page: page, status}
    } else if (currency.length > 0) {
      values = {page: page, currency}
    } else {
      values = {page: page, merchantSelect: dropdownMerchant}
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/searchSandboxDepositsDateFilter`, values, config)
      .then((res) => {
        setTotalPage(res.data.data.totalPages);
        setTableBodyData((pre) => (pre = res.data.data.deposits));
        setMessage(res.data.data.message);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    const auth = localStorage.getItem("user");
    let values;
    if (date) {
      values = {date: date}
    } else if (from && to) {
      values = {from: from, to: to}
    } else if (
      methodPayment.length > 0 &&
      currency.length > 0
    ) {
      values = {methodPayment, currency}
    } else if (methodPayment.length > 0) {
      values = {methodPayment}
    } else if (status.length > 0 && currency.length > 0) {
      values = {status, currency}
    } else if (methodPayment.length > 0 && currency.length > 0) {
      values = {methodPayment, currency}
    } else if (methodPayment.length > 0) {
      values = {methodPayment}
    } else if (currency.length > 0) {
      values = {currency}
    } else {
      values = {merchantSelect: dropdownMerchant}
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/statusSandboxDepositsResult`, values, config)
      .then((res) => {
        setCardData( res?.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchDatafilterall();
    fetchData();
  }, [date, to, from, methodPayment, page, status, currency, message]);

  const downloadExl = () => {
    if(xlData.length === 0){
    const auth = localStorage.getItem("user");
    let values;
    if (date) {
      values = {date: date}
      
    } else if (from && to) {
      values = {from: from, to: to}
       
    } else if (
      methodPayment.length > 0 &&
      status.length > 0 &&
      currency.length > 0
    ) {
      values = {methodPayment, status, currency}
    } else if (methodPayment.length > 0 && status.length > 0) {
      values = {methodPayment, status}
    } else if (status.length > 0 && currency.length > 0) {
      values = {status, currency}
    } else if (methodPayment.length > 0 && currency.length > 0) {
      values = {methodPayment, currency}
    } else if (methodPayment.length > 0) {
      values = {methodPayment}
    } else if (status.length > 0) {
      values = {status}
    } else if (currency.length > 0) {
      values = {currency}
    } else {
      values = {merchantSelect: dropdownMerchant}
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios.post(`${baseUrl}/downloadSandboxDepositsapi`, values, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "SandboxDeposit");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "SandboxDeposit.xlsx");
      })
      .catch((err) => console.log(err));
    }else{
      const workSheet = XLSX.utils.json_to_sheet(xlData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "SandboxDeposit");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "SandboxDeposit.xlsx");
    }
    
  };

  // Search

  return (
    <>
      <h4 className="heading animate__backInDown">Deposit Transactions</h4>
      <div className="row">
        <div className="col-12">
          <Card carddata={cardData} />
        </div>
        <div className="row">
          <div className="col-10">
            <SecondBlock
              orderNumber={orderNumber}
              setorderNumber={setorderNumber}
              setDate={setDate}
              setFrom={setFrom}
              setTo={setTo}
              methodPayment={methodPayment}
              setMethodPayment={setMethodPayment}
              currencyPayment={currency}
              setCurrencyPayment={setCurrencyPayment}
              statusPayment={status}
              setStatusPayment={setStatusPayment}
              tableBodyData={tableBodyData}
              xlData={xlData}
              setXlData={setXlData}
            />
          </div>
          <div className="col-2">
            <button className="downloadDeposite" onClick={downloadExl} style={{width: "200px", marginLeft: "auto", display: "block", marginTop: "45px"}}>
              <img
                src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
                alt=""
                width="20px"
                className="mx-2"
              />
              Download Reports
            </button>
          </div>
        </div>
        <div className="col-12">
          <SandboxTableCom
            tableBodyData={tableBodyData}
            setXlData={setXlData}
            xlData={xlData}
          />
        </div>
      </div>

      <Footer setPage={setPage} page={page} totalPage={totalPage} message={message} />
    </>
  );
}

export default SandboxDeposit;