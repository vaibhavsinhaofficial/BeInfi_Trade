import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceTable from "./InvoiceTable";
import Pagination from "@mui/material/Pagination";
import FilterDate from "../../commonCompMerchant/filterDate/FilterDate";
import FilterInvoice from "./FilterInvoice";
import Card from "../../commonCompMerchant/Card/Card";
import baseUrl from "../../componentsMerchant/config/baseUrl";
import * as XLSX from "xlsx";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const Footer = ({ message }) => {
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
};

const SecondBlock = ({
  setDate,
  setFrom,
  setTo,
  setPaid,
  setUnpaid,
  setOverdue,
  setPending,
  paid,
  unpaid,
  overdue,
  pending,
  sendCheck,
  setSendCheck,
  xlData,
}) => {
  
  return (
    <>
      <div className="row justify-content-around  my-5 align-items-center">
        <div className="col-3 ">
          <Link to="CreateInvoice" style={{ color: "#fff" }}>
            <button className="filterdeposite">Create Invoice </button>
          </Link>
        </div>
        <div className="col-3 ">
          <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
        </div>
        <div className="col-2 ">
          <FilterInvoice
            setPaid={setPaid}
            setUnpaid={setUnpaid}
            setOverdue={setOverdue}
            setPending={setPending}
            paid={paid}
            unpaid={unpaid}
            overdue={overdue}
            pending={pending}
            sendCheck={sendCheck}
            setSendCheck={setSendCheck}
            
          />
        </div>
      </div>
    </>
  );
};

function Invoice() {
  // Download Data
  const [xlData, setXlData] = useState([]);
 

  // CARD DATA
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  
  // +++++++++++++++++++++Table Data++++++++++++++++++++
  const [tableBodyData, setTableBodyData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading,setLoading] =useState(true)

  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  //Filter CheackBox
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");
  const [overdue, setOverdue] = useState("");
  const [pending, setPending] = useState("");
  const [sendCheck, setSendCheck] = useState(false);

  useEffect(() => {
    tabledatafetch();
    
  }, [page, date, from, to, sendCheck]);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      if (date) {
        formData.append("date", date);
        formData.append("page", page);
      } else if (from && to) {
        formData.append("from", from);
        formData.append("to", to);
        formData.append("page", page);
      }
      else if (paid) {
        formData.append("paid", paid);
        formData.append("page", page);
      }else if(unpaid){
        formData.append("unpaid", unpaid);
        formData.append("page", page);
      }else if(overdue){
        formData.append("overdue", overdue);
        formData.append("page", page);
      }else if(pending){
        formData.append("pending", pending);
        formData.append("page", page);
      }else if(paid && unpaid){
        formData.append("paid", paid);
        formData.append("unpaid", unpaid);
        formData.append("page", page);
      }else if(paid && overdue){
        formData.append("paid", paid);
        formData.append("overdue", overdue);
        formData.append("page", page);
      }else if( paid && pending){
        formData.append("paid", paid);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if(unpaid && overdue){
        formData.append("unpaid", unpaid);
        formData.append("overdue", overdue);
        formData.append("page", page);
      }else if(unpaid && pending){
        formData.append("unpaid", unpaid);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if(overdue && pending){
        formData.append("overdue", overdue);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if(paid && unpaid && overdue){
        formData.append("paid", paid);
        formData.append("unpaid", unpaid);
        formData.append("overdue", overdue);
        formData.append("page", page);
      }else if( paid && unpaid && pending){
        formData.append("paid", paid);
        formData.append("unpaid", unpaid);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if( paid && overdue && pending){
        formData.append("paid", paid);
        formData.append("overdue", overdue);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if( unpaid && overdue && pending){
        formData.append("unpaid", unpaid);
        formData.append("overdue", overdue);
        formData.append("pending", pending);
        formData.append("page", page);
      }else if( paid && unpaid && overdue && pending){
        formData.append("paid", paid);
        formData.append("unpaid", unpaid);
        formData.append("overdue", overdue);
        formData.append("pending", pending);
        formData.append("page", page);
      }


      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/invoice`, formData, config);
      setCardData(result.data.card);
      setTableBodyData(result.data.data);
      setTotalPage(result.data.data.totalPage);
      setMessage(result.data.message);
      setLoading(false)

    } catch (error) {
      console.log(error);
    }
  };

  const downloadExl = () => {
    if(xlData.length === 0){
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    formData.append("date", date)
    formData.append("from", from)
    formData.append("to", to)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios.post(`${baseUrl}/downloadInvoice`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "invoice");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "invoice.xlsx");
      })
      .catch((err) => console.log(err));
    }else{
      const workSheet = XLSX.utils.json_to_sheet(xlData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "invoice");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "invoice.xlsx");
    }
    
  };

  if(loading){
    return <Loader />
  }

  return (
    <>
      <h4 className="heading animate__backInDown">All invoices</h4>
      <div className="row">
        <div className="col-12">
          <Card carddata={cardData} />
        </div>
        <div className="row">
          <div className="col-9">
            <SecondBlock
              orderNumber={orderNumber}
              setorderNumber={setorderNumber}
              setDate={setDate}
              setFrom={setFrom}
              setTo={setTo}
              setPaid={setPaid}
              setUnpaid={setUnpaid}
              setOverdue={setOverdue}
              setPending={setPending}
              paid={paid}
              unpaid={unpaid}
              overdue={overdue}
              pending={pending}
              tableBodyData={tableBodyData}
              xlData={xlData}
              sendCheck={sendCheck}
              setSendCheck={setSendCheck}
            />
          </div>
          <div className="col-3 ">
            <button className="downloadDeposite" style={{marginTop: "45px"}} onClick={downloadExl}>
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
          <InvoiceTable
            tableBodyData={tableBodyData}
            setXlData={setXlData}
            xlData={xlData}
          />
        </div>
      </div>

      <Footer message={message}
/>
    </>
  );
}

export default Invoice;
