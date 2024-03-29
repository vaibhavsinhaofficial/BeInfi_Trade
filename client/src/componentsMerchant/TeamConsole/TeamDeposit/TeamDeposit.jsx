import React, { useEffect, useState } from "react";
import "./deposire.css";
import axios from "axios";
import TableComp from "../../../commonCompMerchant/Table/TableCom";
import Pagination from "@mui/material/Pagination";
import Search from "../../../commonCompMerchant/SearchBox/Search";
import FilterDate from "../../../commonCompMerchant/filterDate/FilterDate";
import Filter from "./filter/Filter";
import Card from "../../../commonCompMerchant/Card/Card";
import baseUrl from "../../../componentsMerchant/config/baseUrl";
import * as XLSX from "xlsx";
import { useStateContext } from "../../../context/ContextProvider";
import Loader from "../../Loader/Loader";

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

function TeamDeposit() {
  // Download Data
  const [xlData,setXlData]= useState([]);
  const { dropdownMerchant } = useStateContext();

  // CARD DATA
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [methodPayment, setMethodPayment] = useState([]);
  const [status, setStatusPayment] = useState([]);
  const [currency, setCurrencyPayment] = useState([]);

  // Today Yesterday Customise filter
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loading,setLoading] =useState(true)
  
  const fetchDatafilterall = () => {
    const auth = localStorage.getItem("user");
    let value;

    if (date) {
      value = {
        date: date,
        page: page
     }
    } else if (from && to) {
      value = {
        to: to,
        from: from,
        page: page
      }
    } else if ( methodPayment.length > 0 && status.length > 0 && currency.length > 0  ) {
      value = {
        methodPayment: methodPayment,
        status: status,
        currency: currency,
        page: page
      }
    } else if (methodPayment.length > 0 && status.length > 0) {
      value = {
        methodPayment: methodPayment,
        status: status,
        page: page
      }
    } else if (status.length > 0 && currency.length > 0) {
      value = {
        status: status,
        currency: currency,
        page: page
      }
    } else if (methodPayment.length > 0 && currency.length > 0) {
      value = {
        methodPayment: methodPayment,
        currency: currency,
        page: page
      }
    } else if (methodPayment.length > 0) {
      value = {
        methodPayment: methodPayment,
        page: page
      }
    } else if (status.length > 0) {
      value = {
        status: status,
        page: page
      }
    } else if (currency.length > 0) {
      value = {
        currency: currency,
        page: page
      }
    } else if(orderNumber) {
      value = {
        searchItem: orderNumber,
        page: page
      }
    }else {
      value = {
        page: page
      }
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/teamSearchDateFilter`, value, config)
      .then((res) => {
        setTotalPage(res.data.data.totalPages);
        setTableBodyData((pre) => (pre = res.data.data.deposits));
        setMessage(res.data.data.message);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    const auth = localStorage.getItem("user");
    let value;

    if (date) {
      value = {
        date: date,
     }
    } else if (from && to) {
      value = {
        to: to,
        from: from,
      }
    } else if ( methodPayment.length > 0 && status.length > 0 && currency.length > 0  ) {
      value = {
        methodPayment: methodPayment,
        status: status,
        currency: currency,
      }
    } else if (methodPayment.length > 0 && status.length > 0) {
      value = {
        methodPayment: methodPayment,
        status: status,
      }
    } else if (status.length > 0 && currency.length > 0) {
      value = {
        status: status,
        currency: currency,
      }
    } else if (methodPayment.length > 0 && currency.length > 0) {
      value = {
        methodPayment: methodPayment,
        currency: currency,
      }
    } else if (methodPayment.length > 0) {
      value = {
        methodPayment: methodPayment,
      }
    } else if (status.length > 0) {
      value = {
        status: status,
      }
    } else if (currency.length > 0) {
      value = {
        currency: currency,
      }
    } else{
      value = {
        searchItem: orderNumber,
      }
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/teamStatusResult`, value, config)
      .then((res) => {
        setCardData( res?.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDatafilterall();
    fetchData();
  }, [date, to, from, methodPayment, page, status, currency, message, orderNumber]);

  const downloadExl = () => {
    if(xlData.length === 0){
    const auth = localStorage.getItem("user");
    let value;

    if (date) {
      value = {
        date: date,
     }
    } else if (from && to) {
      value = {
        to: to,
        from: from,
      }
    } else if ( methodPayment.length > 0 && status.length > 0 && currency.length > 0  ) {
      value = {
        methodPayment: methodPayment,
        status: status,
        currency: currency,
      }
    } else if (methodPayment.length > 0 && status.length > 0) {
      value = {
        methodPayment: methodPayment,
        status: status,
      }
    } else if (status.length > 0 && currency.length > 0) {
      value = {
        status: status,
        currency: currency,
      }
    } else if (methodPayment.length > 0 && currency.length > 0) {
      value = {
        methodPayment: methodPayment,
        currency: currency,
      }
    } else if (methodPayment.length > 0) {
      value = {
        methodPayment: methodPayment,
      }
    } else if (status.length > 0) {
      value = {
        status: status,
      }
    } else if (currency.length > 0) {
      value = {
        currency: currency,
      }
    } else{
      value = {
        searchItem: orderNumber,
      }
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios.post(`${baseUrl}/teamDownloadapi`, value, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "Deposit.xlsx");
      })
      .catch((err) => console.log(err));
    }else{
      const workSheet = XLSX.utils.json_to_sheet(xlData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "Deposit.xlsx");
    }
    
  };

  if(loading){
    return <Loader />
  }

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
          <TableComp
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

export default TeamDeposit;