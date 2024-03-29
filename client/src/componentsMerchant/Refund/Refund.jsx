import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import { useStateContext } from "../../context/ContextProvider";

function Refund() {
  const tableHeading = [
    "Order ID",
    "Date",
    "Amount",
    "Request Id",
    "Issue",
    "Status",
    "Refund Status"
  ];

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("user");
  const { dropdownMerchant } = useStateContext();

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("pages", page);
      formData.append("id", dropdownMerchant)

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/merchantRefund`,
        formData,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(result.data.totalPages)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page]);

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell align="center">{item.invoice_Id}</TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">{item.request_id}</TableCell>
                  <TableCell align="center">{item.message}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-success"
                        style={{width: "100%"}}
                      >
                        OK
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        style={{width: "100%"}}
                      >
                        PENDING
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.refund_status}
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
          <h4 className="mb-3 headingAll">Refund Transaction</h4>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
        {/* <div className="row">
          <div className="mt-3 mb-3">
            <p className="tableBottomMsg">{message}</p>
          </div>
        </div> */}
      </Box>
    </>
  );
}

export default Refund;
