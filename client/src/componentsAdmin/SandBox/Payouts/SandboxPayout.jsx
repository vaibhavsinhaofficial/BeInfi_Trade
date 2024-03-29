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
import { toast } from "react-toastify";
import FilterDate from "../../../commonAdminComp/filterDate/FilterDate";
import Loader from "../../Loader/Loader";
import * as XLSX from "xlsx";
import Card from "../../../commonAdminComp/Card/Card";
import SearchIcon from "@mui/icons-material/Search";
import FilterMerchant from "../../../commonAdminComp/FilterMerchant/FilterMerchant";
import { Popover } from "@mui/material";
import ViewPayouts from "./ViewPayouts";



function SandBoxPayout() {
  const tableHeading = [
    "AC.Type ",
    "Bank",
    "Payout Id",
    "Merchant",
    "Status",
    "UTR",
    "Change Status",
    "Trx Type",
    "Amount",
    "Payout Charge",
    "Currency",
    "Created On",
    "Updated On",
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
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );
      formData.append("merchantName", merchantSelect);
      formData.append("status", status);
      formData.append("searchText", searchVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSandboxPayout`,
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
      .post(`${baseUrl}/sandboxPayoutCards`, formData, config)
      .then((res) => {
        // console.log(res);
        setCardData( res?.data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    ReadData();
    depositsSandboxCards();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [page, searchVal, limitVal, to, from, merchantSelect, status]);

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
      const config = {
        headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleSandboxPayout`,
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

    axios.post(`${baseUrl}/downloadSandboxPayout`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "SandboxPayout");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "SandboxPayout.xlsx");
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
                  <TableCell align="center">{item.utrnumber}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around">
                      <button
                        className="btn btn-success"
                        style={{ boxShadow: "none", width: "50px", borderRadius: "20px" }}
                        onClick={() => toggleStatus(item.id, "SUCCESS")}
                      >
                        S
                      </button>
                      <button
                        className="mx-2 btn btn-danger"
                        style={{ boxShadow: "none", width: "50px", borderRadius: "20px" }}
                        onClick={() => toggleStatus(item.id, "FAILURE")}
                      >
                        F
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.trx_type}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">{item.akonto_charge}</TableCell>
                  <TableCell align="center">{item.currency}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.updated_on}</TableCell>
                  <TableCell align="center">
                    <ViewPayouts item={item} />
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
        <h4 className="mb-3 headingAll">Manage Sandbox Payout</h4>
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
                placeholder="Payout ID"
              />
            </div>
          </div>
          <div className="col-2">
            <FilterDate setTo={setTo} setFrom={setFrom} />
          </div>
          <div className="col-2">
            <FilterMerchant setMerchantSelect={setMerchantSelect} />
          </div>
          <div className="col-2">
            <select className="form-select depositSelect" onChange={(e)=> setStatus(e.target.value)} style={{borderRadius: "20px"}}>
              <option selected>Select By Status</option>
              <option value="FAILIURE">Failed</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <div className="col-2">
            
          </div>
          <div className="col-1">
            <button className="btn" 
              style={{
                background: "#1caae8",
                borderRadius: "60px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer"
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
            <Link to={`/bankconnect/ViewSandboxPayout/${item.id}`}>
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

export default SandBoxPayout;