import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";


function AllowPaymentLogs() {
  const tableHeading = [
    "Source",
    "Logs"
  ];

  const [tableData, setTableData] = useState([]);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [merchantSelect, setMerchantSelect] = useState("");
  const [merchant, setMerchant] = useState([]); 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("firstname", merchantSelect)

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/allowPaymentsLogs`,
        formData,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
    } catch (error) {
      console.log(error);
    }
  };

  const AdminData = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/filterAdmin`,
        formData,
        config
      );
      setMerchant(result.data.result)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
    AdminData();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [merchantSelect]);

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
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.source}</TableCell>
                  <TableCell align="center">{item.logs}</TableCell>
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
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-10">
                <h4 className="headingAll"><i className="fa fa-table" style={{fontSize: "30px"}}></i>Allow Payments Log &#62; List</h4>
            </div>
            <div className="col-2">
              <select
                className="form-select merchantselect"
                required
                value={merchantSelect}
                onChange={(e)=>setMerchantSelect(e.target.value)}
                style={{borderRadius: "30px"}}
              >
                <option>
                  Select Admin
                </option>
                {
                    merchant.length > 0 ? merchant.map((item,index)=>{
                        return(
                            <option key={index} value={item.firstname}>
                            {item.firstname}&nbsp;{item.lastname}
                            </option>
                        );
                    })
                  :"Wait A while" 
                }
              </select>
            </div>
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

export default AllowPaymentLogs;
