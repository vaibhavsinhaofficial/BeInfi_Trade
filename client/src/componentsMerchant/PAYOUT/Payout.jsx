import React, { useEffect, useState } from "react";
import "../DEPOSIT/deposire.css";
import axios from "axios";
import PayoutTable from "./PayoutTable";
import Pagination from "@mui/material/Pagination";
import Search from "../../commonCompMerchant/SearchBox/Search";
import FilterDate from "../../commonCompMerchant/filterDate/FilterDate";
import Card from "../../commonCompMerchant/Card/Card";
import baseUrl from "../../componentsMerchant/config/baseUrl";
import * as XLSX from "xlsx";
import { useStateContext } from "../../context/ContextProvider";
import Loader from "../Loader/Loader";
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
  xlData,
  setXlData,
}) => {
  return (
    <>
      <div className="row justify-content-around  my-5 align-items-center">
        <div className="col-4 ">
          <Search orderNumber={orderNumber} setorderNumber={setorderNumber} />
        </div>
        <div className="col-3 ">
          <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
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

function Payout() {
  const { dropdownMerchant } = useStateContext();
  // CARD DATa
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [xlData, setXlData] = useState([]);
  const[message,setMessage]=useState("")
  const [loading,setLoading] =useState(true)

  const cardDataFetcch = async() =>{
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    formData.append("from", to)
    formData.append("to", from)
    formData.append("date", date)
    formData.append("searchitem", orderNumber)
    formData.append("id", dropdownMerchant);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/payoutheader`, formData, config)
      .then((res) => {
        setCardData((pre) => (pre = res.data.data));
      })
      .catch((err) => console.log(err));
  }

  // +++++++++++++++++++++Table Data++++++++++++++++++++
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("page", page);
      formData.append("uniqueid", orderNumber);
      formData.append("Date", date);
      formData.append("to", to);
      formData.append("from", from);
      formData.append("id", dropdownMerchant);

      if (orderNumber) {
        formData.append("filterType", 2);
      }
      else if (date) {
        formData.append("filterType", 3);
      }
      else if (to && from) {
        formData.append("filterType", 4);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/filter`, formData, config);
      
      setTableBodyData(result.data.data);
      setTotalPage(result.data.totalPage);
      setMessage(result.data.message)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tabledatafetch();
    cardDataFetcch();
  }, [dropdownMerchant,page, orderNumber, date, to, from]);


  const downloadExl = () => {
    if(xlData.length === 0){
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    formData.append("from", from);
    formData.append("to", to);
    formData.append("date", date);
    formData.append("uniqueid", orderNumber);
    formData.append("id", dropdownMerchant);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };
    axios.post(`${baseUrl}/downloadReport`, formData, config)
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
    } else {
      const workSheet = XLSX.utils.json_to_sheet(xlData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Payout");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "Payout.xlsx");
    }
  };

  if(loading){
    return <Loader />
  }

  return (
    <>
      <h4 className="heading animate__backInDown">Payout Transactions</h4>
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
              tableBodyData={tableBodyData}
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
          <PayoutTable tableBodyData={tableBodyData} xlData={xlData} setXlData={setXlData} />
        </div>
      </div>
      <Footer setPage={setPage} page={page} totalPage={totalPage} message={message} />
    </>
  );
}

export default Payout;
