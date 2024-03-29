import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
// import { useStateContext } from "../../context/ContextProvider";
// import GenerateTicket from "./GenerateTicket";
import {Link} from 'react-router-dom'

function Help() {
  const tableHeading = [
    "#",
    "Date",
    "Ticket For",
    "Token No",
    "Status",
    "View"
  ];

  const [tableData, setTableData] = useState([]);
  const auth = localStorage.getItem("user");

  const ReadData = async () => {
    try {
      let formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/helpdefault`,
        formData,
        config
      );
      setTableData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [""]);

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
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                  <TableCell align="center">{item.ticket_for}</TableCell>
                  <TableCell align="center">{item.ticket}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? <button className="btn btn-danger" disabled style={{width: "100px"}}>Closed</button> : <button className="btn btn-primary" style={{width: "100px"}}>Pending</button>}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`ViewTicket/${item.id}`}>
                      <button className="btn btn-secondary">View</button>
                    </Link>
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
            <div className="col-10">
              <h4 className="headingAll">Merchant Support</h4>
            </div>
            <div className="col-2">
                <Link to='AddTicket'>
                  <button className="createNewMerchant" style={{marginLeft: "auto"}}>
                    Generate Ticket
                  </button>
                </Link>
            </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
      </Box>
    </>
  );
}

export default Help;
