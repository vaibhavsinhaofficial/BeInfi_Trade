import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../commonAdminComp/SearchBox/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import FilterDate from "../../commonAdminComp/filterDate/FilterDate";
import { Popover } from "@mui/material";
import AddSubmerchant from "./AddSubmerchant";
import EditSubmerchant from "./EditSubmerchant";


function SubMerchant({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Name",
    "Key",
    "Salt",
    "MID",
    "Merchant IDs",
    "Child Percentage",
    "Status",
    "Created On",
    "Updated On",
    "Action",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading]= useState(true)
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultSubmerchant`, formData, config);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, limitVal]);

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
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.sec_key}</TableCell>
                  <TableCell align="center">{item.salt}</TableCell>
                  <TableCell align="center">{item.mid}</TableCell>
                  <TableCell align="center">{item.merchant_ids}</TableCell>
                  <TableCell align="center">{item.percentage}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button className="btn btn-success">Enable</button>
                    ) : (
                      <button className="btn btn-danger">Disable</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell>
                    <PopUp authUpdate={authUpdate} ID={item.id} ReadData={ReadData} />
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
        <div className="row align-items-center">
          <h4 className="mb-3 headingAll">Manage Sub Merchant</h4>
          <div className="col-6 mb-3">
            <FilterDate setTo={setTo} setFrom={setFrom}/>
          </div>
          <div className="col-6 mb-3 text-end">
            <AddSubmerchant authCreate={authCreate} ReadData={ReadData}/>
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

const PopUp = ({authUpdate, ID, ReadData }) => {
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
            authUpdate ? (
              <EditSubmerchant authUpdate={authUpdate} ID={ID} ReadData={ReadData} />
            ) : ""
          }
        </div>

        </Popover>
      </div>
    </>
  );
};

export default SubMerchant;
