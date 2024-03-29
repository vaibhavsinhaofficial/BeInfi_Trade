import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../AdminTable/MainTable";
import SearchIcon from "@mui/icons-material/Search";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import Loader from "../../Loader/Loader";
import FilterDate from "../../../commonAdminComp/filterDate/FilterDate";
import * as XLSX from "xlsx";

function MerchantRefunds({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Merchant ",
    "Request ID",
    "Invoice  ID",
    "Issue",
    "Amount",
    "Status",
    "Refund Status",
    "Created",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(true)
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchText", searchVal);
      formData.append("limit", limitVal);
      formData.append("to", from);
      formData.append("from", to);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultMR`, formData, config);
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
  }, [page, searchVal, limitVal, to, from]);


  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      if (status === 0) {
        formData.append("status", 1);
      } else {
        formData.append("status", 0);
      } 

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleMR`,
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
    formData.append("searchText", searchVal);
    formData.append("to", from );
    formData.append("from", to );
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
  
    axios.post(`${baseUrl}/downloadAdminRefund`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Refund");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "Refund.xlsx");
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
                  <div className="mName">
                    &#40;{item.merchant_id}&#41;&nbsp;{item.name}
                  </div>
                </TableCell>
                <TableCell align="center">{item.request_id}</TableCell>
                <TableCell align="center">{item.invoice_Id}</TableCell>
                <TableCell align="center">{item.message}</TableCell>
                <TableCell align="center">{item.amount}</TableCell>
                <TableCell align="center">
                { item.status === 0 ? (
                    <button className="btn btn-danger btn-sm"
                    onClick={() => toggleStatus(item.id, item.status)}
                    >Pending</button>
                  ) : (
                    <button className="btn btn-success btn-sm">Success</button>
                  )}
                </TableCell>

                <TableCell align="center">{item.refund_status}</TableCell>

                <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
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
        <h4 className="mb-3 headingAll">Merchants Refund</h4>
        <div className="row align-items-center mb-3">
          <div className="col-4">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Request ID"
              />
            </div>
          </div>
          <div className="col-4">
            <FilterDate setTo={setTo} setFrom={setFrom} />
          </div>
          <div className="col-4">
            <button className="btn"
              style={{
                background: "#1caae8",
                borderRadius: "60px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer",
                float: "right"
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

export default MerchantRefunds;
