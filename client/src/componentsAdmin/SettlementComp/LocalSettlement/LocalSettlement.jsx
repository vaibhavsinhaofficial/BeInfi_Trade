import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Card from '../../../commonAdminComp/Card/Card';
import * as XLSX from "xlsx";
import FilterDateMax from "../../../commonAdminComp/filterDateMax/FilterDateMax";
import SearchIcon from "@mui/icons-material/Search";
import styles from './style.module.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Loader from "../../Loader/Loader";
import Loader1 from "../../SettlementComp/Loader/Loader";
import { Popover } from "@mui/material";
import { useStateContext } from "../../../context/ContextProvider";
import ViewLocalSettlement from "./ViewLocalSettlement";
import NewLocalSettlement from "./NewLocalSettlement";
import EditLocalSettlement from "./EditLocalSettlement";

function LocalSettlement({authCreate, authRead, authUpdate, authDelete}) {
  
  const tableHeading = ['Final Authorization','Admin Status','Requested Date','Merchant Name','Source','Settlement Id','Bank Name','Currency','Requested Amount ','Settlement Fee','Settlement Amount	','Action'];
  const { role } = useStateContext();

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [cardData, setCardData] = useState([]);
  const [xlsxData,setXlData] = useState([])
  const [loading,setLoading] =useState(true)
  const [groupid, setGroupid] = useState("")

  const ReadData = async () => {
    try {
      const values = {pageNumber:page,date,to,from,searchItem}

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/api/settelment/localSettlement`,
        values,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.result);
      setTotalPage(Number(result.data.numOfPages));
      setGroupid(result.data.groupId)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const settlementCard = async()=>{
    const auth = localStorage.getItem("admin");
    const values = {date,to,from,searchItem }
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/api/settelment/settlementCards`, values, config)
      .then((res) => {
        // console.log(res);
        setCardData( res?.data.data);
      })
      .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    ReadData();
    settlementCard();
  }, [page,date,to,from,searchItem, message]);

  const downloadExl = () => {
    const auth = localStorage.getItem("admin");
    const values = {date,to,from,searchItem }
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios.post(`${baseUrl}/defaultDownload`, values, config)
    .then((res) => {
      const workSheet = XLSX.utils.json_to_sheet(res.data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "LocalSettlement");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "LocalSettlement.xlsx");
    })
    .catch((err) => console.log(err));
  }

  const toggleStatus = async (settlementId, val) => {
    try {
      let values= {settlementId, val}
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleSettlementStatus`,
        values,
        config
      );
      if(result.status === 200){
        ReadData();
      }
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

  if(role === "-1" || role === "1"){
    if(loading){
      return <Loader />
    }
  } else if(role === "2"){
    if(loading){
      return <Loader1 />
    }
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
                    {item.status === 1 ? (
                      <h6>Approved</h6>
                    ) : item.status === 2 ? (
                      <h6>Pending</h6>
                    ) : item.status === 3 ? (
                      <h6>Waiting For Final Approval</h6>
                    ) : item.status === 0 ? (
                      <h6>Failed</h6>
                    ) : ""}
                  </TableCell>
                  <TableCell align="d-flex  align-items-center justify-content-around flex-column">
                    {groupid === 1 ? (
                      <>
                        {item.status === 2 || item.status === 3 ? (
                          <>
                            <button className="btn btn-primary mb-1" style={{width: "100%", borderRadius: "20px"}} onClick={()=>toggleStatus(item.settlementId, 1)}>Approve</button>
                            <button className="btn btn-danger" style={{width: "100%", borderRadius: "20px"}} onClick={()=>toggleStatus(item.settlementId, 0)}>Failed</button>
                          </> 
                        ) : (
                          <>
                            <button className="btn btn-primary mb-1" style={{width: "100%", borderRadius: "20px"}} disabled>Approved</button>
                            <button className="btn btn-danger" style={{width: "100%", borderRadius: "20px"}} disabled>Failed</button> 
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {item.status === 2 ? (
                          <>
                            <button className="btn btn-primary mb-1" style={{width: "100%", borderRadius: "20px"}} onClick={()=>toggleStatus(item.settlementId, 1)}>Approve</button>
                            <button className="btn btn-danger" style={{width: "100%", borderRadius: "20px"}} onClick={()=>toggleStatus(item.settlementId, 0)}>Failed</button>
                          </> 
                        ) : item.status === 3 ? (
                          <>
                            <button className="btn btn-primary mb-1" style={{width: "100%", borderRadius: "20px"}} disabled>Approve</button>
                            <button className="btn btn-danger" style={{width: "100%", borderRadius: "20px"}} disabled>Failed</button> 
                          </>
                        ) : (
                          <>
                            <button className="btn btn-primary mb-1" style={{width: "100%", borderRadius: "20px"}} disabled>Approved</button>
                            <button className="btn btn-danger" style={{width: "100%", borderRadius: "20px"}} disabled>Failed</button> 
                          </>
                        )}
                      </>
                    )}
                    
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.requested_time}</TableCell>
                  <TableCell align="center">
                    <div className="mName">
                      &#40;{item.user_id}&#41;&nbsp;{item.merchant_name}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.source}</TableCell>
                  <TableCell align="center">{item.settlementId}</TableCell>
                  <TableCell align="center">{item.bankName}</TableCell>
                  <TableCell align="center">{item.toCurrency}</TableCell>
                  <TableCell align="center">{item.requestedAmount}</TableCell>
                  <TableCell align="center">{item.charges}</TableCell>
                  <TableCell align="center">{item.settlementAmount}</TableCell>
                  <TableCell align="center">
                    <PopUps item={item} authRead={authRead} authUpdate={authUpdate} groupid={groupid} />
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
        <div className="row align-items-center mb-3">
          <h4 className="headingAll">Local Settlement List</h4>
          <Card carddata={cardData} />
          <div className="col-3 mt-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="newinputSearch"
                placeholder="Settlement ID"
              />
            </div>
          </div>
          <div className="col-3 mt-3">
            <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/>
          </div>
          <div className="col-3 mt-3 text-end">
          {
            role === "-1" || role === "1" ? (
              <>
                <button className={styles.addTransaction} onClick={downloadExl} style={{marginLeft: "auto"}}><ArrowDownwardIcon  />Download</button>
              </>
            ) : (
              <>
                <button className="btn btn-success" onClick={downloadExl} style={{marginLeft: "auto", background: "#008000", borderRadius: "20px"}}><ArrowDownwardIcon  />Download</button>
              </>
            )
          }
          </div>
          <div className="col-3 mt-3 text-end">
            {
              authCreate ? (
                <NewLocalSettlement groupid={groupid} />
              ) : null
            }
          </div>
        </div>
        <MainTable setXlData={setXlData} tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
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

const PopUps = ({item, authRead, authUpdate, groupid }) => {
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
          {
            authRead ? (
              <ViewLocalSettlement item={item} groupid={groupid}/>
            ) : null
          }
          {
            authUpdate ? (
              <EditLocalSettlement ID={item.id} groupid={groupid}/>
            ) : null
          }
          </div>
          
        </Popover>
      </div>
    </>
  );
};

export default LocalSettlement;
