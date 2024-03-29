import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import FilterDate from "../../../commonAdminComp/filterDate/FilterDate";
import Loader from "../../Loader/Loader";
import * as XLSX from "xlsx";
import Card from "../../../commonAdminComp/Card/Card";
import SearchIcon from "@mui/icons-material/Search";
import FilterMerchant from "../../../commonAdminComp/FilterMerchant/FilterMerchant";
import { toast } from "react-toastify";
import { Popover } from "@mui/material";
import ViewDeposits from "./ViewDesposits";


function SandBoxDeposits() {
  const tableHeading = [
    "Merchant Name",
    "Callback",
    "Status",
    "MOrder No",
    "Order No",
    "Currency",
    "Req. Amt",
    "Payin Charges",
    "Net Amount",
    "Created On",
    "Action",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [loading,setLoading]=useState(true);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState("");
  const [cardData, setCardData] = useState([]);
  const [merchantSelect, setMerchantSelect] = useState("");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchText", searchVal);
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );
      formData.append("status", status)
      formData.append("merchantName", merchantSelect);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSandboxDeposits`,
        formData,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const depositsSandboxCards = async()=>{
    const auth = localStorage.getItem("admin");
    let formData = new FormData();
    formData.append("to", from );
    formData.append("from", to );
    formData.append("merchantName", merchantSelect);
    formData.append("status", status);
    formData.append("searchText", searchVal);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/depositsSandboxCards`, formData, config)
      .then((res) => {
        // console.log(res);
        setCardData( res?.data.data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    ReadData();
    depositsSandboxCards();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [page, searchVal, limitVal, to, from, merchantSelect, status]);

  const downloadExl = () => {
    const auth = localStorage.getItem("admin");
    let formData = new FormData();
    formData.append("to", from );
    formData.append("from", to );
    formData.append("merchantName", merchantSelect);
    formData.append("status", status);
    formData.append("searchText", searchVal);
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios.post(`${baseUrl}/downloadSandboxDeposits`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "SandboxDeposits");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "SandboxDeposits.xlsx");
      })
      .catch((err) => console.log(err));
  };

  const toggleStatus = async (invoice_id, value) => {
    try {
      let formData = new FormData();
      formData.append("invoice_id", invoice_id);
      if (value === 1) {
        formData.append("status", 0);
      } else if (value === 2) {
        formData.append("status", 1);
      } else if (value === 3){
        formData.append("status", 4);
      } else if (value === 4){
        formData.append("status", 5);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/changeSandboxDepositStatus`, formData, config);
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
                    <div className="mName">
                      &#40;{item.user_id}&#41;&nbsp;{item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="" style={{width: "290px"}}>
                      <button className="btn btn-sm btn-success" style={{width: "100px", borderRadius: "20px"}} onClick={() => toggleStatus(item.invoice_id, 2)}>SUCCESS</button>
                      <button className="btn btn-sm btn-danger" style={{width: "100px", marginLeft: "10px", borderRadius: "20px"}} onClick={() => toggleStatus(item.invoice_id, 1)}>FAILED</button>
                    </div>
                    <div className="mt-3" style={{width: "290px"}}>
                      <button className="btn btn-sm btn-primary" style={{width: "100px", borderRadius: "20px"}} onClick={() => toggleStatus(item.invoice_id, 3)}>REFUND</button>
                      <button className="btn btn-sm btn-info" style={{color: "#fff", width: "100px", marginLeft: "10px", borderRadius: "20px"}} onClick={() => toggleStatus(item.invoice_id, 4)}>CB</button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 0 ? (
                      <span className="btn btn-sm btn-danger" style={{borderRadius: "20px", width: "75px"}}>Failed</span>
                    ) : item.status === 1 ? (
                      <span className="btn btn-sm btn-success" style={{borderRadius: "20px", width: "75px"}}>Success</span>
                    ) : item.status === 2 ? (
                      <span className="btn btn-sm btn-warning" style={{color: "#fff", borderRadius: "20px", width: "75px"}}>Waiting</span>
                    ) : item.status === 3 ? (
                      <span className="btn btn-sm btn-info" style={{color: "#fff", borderRadius: "20px", width: "75px"}}>Pending</span>
                    ) : item.status === 4 ? (
                      <span className="btn btn-sm btn-primary" style={{borderRadius: "20px", width: "75px"}}>Refund</span>
                    ) : (
                      <span className="btn btn-sm btn-info" style={{color: "#fff", borderRadius: "20px", width: "75px"}}>CB</span>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.txn_id}</TableCell>
                  <TableCell align="center">{item.order_no}</TableCell>
                  <TableCell align="center">{item.ammount_type}</TableCell>
                  <TableCell align="center">{item.ammount}</TableCell>
                  <TableCell align="center">{item.payin_charges}</TableCell>
                  <TableCell align="center">{item.settle_amount}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  <TableCell align="center">
                    <ViewDeposits item={item}/>
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
        <h4 className="mb-3 headingAll">Manage Sandbox Deposit</h4>
        <div className="mb-5">
          <Card carddata={cardData} />
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Order No."
              />
            </div>
          </div>
          <div className="col-2">
            <FilterDate setTo={setTo} setFrom={setFrom} />
          </div>
          <div className="col-3">
            <FilterMerchant setMerchantSelect={setMerchantSelect} />
          </div>
          <div className="col-2">
            <select className="form-select depositSelect" onChange={(e)=> setStatus(e.target.value)} style={{borderRadius: "20px"}}>
              <option selected>Select By Status</option>
              <option value="0">Failed</option>
              <option value="1">Success</option>
              <option value="3">Waiting</option>
              <option value="4">Pending &#40;User Side&#41;</option>
              <option value="5">Pedning &#40;Bank Side&#41;</option>
            </select>
          </div>
          <div className="col-2">
            <button className="btn" 
              style={{
                background: "#1caae8",
                borderRadius: "60px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer",
                float: "right"
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

const PopUp = ({item}) => {
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
            <Link to={`/bankconnect/ViewSandboxDeposits/${item.invoice_id}`}>
              <button className="btn btn-success mt-3 mb-3">
                View
              </button>
            </Link>
          </div>
        
        </Popover>
      </div>
    </>
  );
};

export default SandBoxDeposits;