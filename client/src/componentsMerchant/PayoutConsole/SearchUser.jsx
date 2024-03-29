import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// import Search from "../../../commonAdminComp/SearchBox/Search";
// import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
// import baseUrl from "../../config/baseUrl";
// import axios from "axios";
// import { useStateContext } from "../../../context/ContextProvider";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";


function SearchUser() {
  const tableHeading = [
    "User ID",
    "Name",
    "Mobile No.",
    "Email ID",
    "Status",
    "Distributor ID",
    "Agent ID",
    "Sub Agent ID",
    "Closing Balance",
    "Sales Person Name",
    "Sales Mobile No.",
  ];

//   const [page, setPage] = useState(1);
//   const [tableData, setTableData] = useState([]);
//   const [totalPage, setTotalPage] = useState(1);
//   const [searchVal, setSearchval] = useState("");
//   const [limitVal, setLimitVal] = useState(10);
//   const { setActive, setActive2, setToggel } = useStateContext();
//   const [message, setMessage] = useState("");
  const auth = localStorage.getItem("user");

//   const ReadData = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("page", page);
//       formData.append("searchItem", searchVal);
//       formData.append("limit", limitVal);

//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${auth}`,
//         },
//       };

//       let result = await axios.post(
//         `${baseUrl}/defaultNewCurrency`,
//         formData,
//         config
//       );
//       console.log(result.data);
//       setMessage(result.data.message);
//       setTableData(result.data.data);
//       setTotalPage(Number(result.data.totalPages));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     ReadData();
//   }, [page, searchVal, limitVal]);


  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {/* {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return ( */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                //   key={index}
                >
                  <TableCell align="center">124522655</TableCell>
                  <TableCell align="center">Shyam Yadav</TableCell>
                  <TableCell align="center">8745962145</TableCell>
                  <TableCell align="center">abc@gmail.com</TableCell>
                  <TableCell align="center"><button className="btn btn-success">Approved</button></TableCell>
                  <TableCell align="center">qwerty12455</TableCell>
                  <TableCell align="center">awsdd451</TableCell>
                  <TableCell align="center">12456325</TableCell>
                  <TableCell align="center">784525552</TableCell>
                  <TableCell align="center">Shyam</TableCell>
                  <TableCell align="center">87451245522</TableCell>
                </TableRow>
              {/* );
            })
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <h4>No Data Found</h4>
              </TableCell>
            </TableRow>
          )} */}
        </TableBody>
      </>
    );
  };
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <div className="row justify-content-between align-items-center mb-3">
            {/* <div className="col-6"> */}
                <h4 className="headingAll">Search User</h4>
            {/* </div> */}
            {/* <div className="col-6">
              <Link to='/NewCurrencyAdd'>
                <button className="btn btn-success" style={{marginLeft: "auto", display: "block"}}>Add Currency</button>
              </Link>
            </div> */}
          </div>

          <div className="row mb-3">
            <div className="col-3">
                <select className="sub_agent">
                    <option>Select Sub Agent</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <button className="userSearch">Search</button>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
                <div className="bd-example">
                    <button type="button" className="btn btn-primary new">COPY</button>
                    <button type="button" className="btn btn-secondary new">CSV</button>
                    <button type="button" className="btn btn-success new">EXCEL</button>
                    <button type="button" className="btn btn-danger new">PDF</button>
                    <button type="button" className="btn btn-warning new">PRINT</button>
                </div>
            </div>
            <div className="col-6">
                <div className="serachbox" style={{float: "right"}}>
                    <input
                    type="search"
                    placeholder="Search"
                    className="search"
                    // value={orderNumber}
                    // onChange={(e) => setorderNumber(e.target.value)}
                    />
                    <img
                    src="https://www.bankconnect.online/assets/merchants/img/search.svg"
                    alt=""
                    className="icon"
                    style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        {/* <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        /> */}
      </Box>
    </>
  );
}

export default SearchUser;
