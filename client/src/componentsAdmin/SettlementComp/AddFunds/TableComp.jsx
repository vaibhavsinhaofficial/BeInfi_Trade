import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TableComp({ tableBodyData, setXlData,tableHeading ,fetchData}) {
  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ whiteSpace: "nowrap" }}>
              {tableHeading.map((item,i)=><TableCell key={i} style={{ fontWeight: "600", fontSize: "14px", cursor: "auto" }}>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {Object.keys(tableBodyData).length > 0 ? (
              tableBodyData?.map((item, index) => {
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
                   
                  <TableCell>
                    <div className="mName">
                      &#40;{item.merchant_id}&#41;&nbsp;{item.merchant_name}
                    </div>
                  </TableCell>
                  <TableCell>{item.current_wallet}</TableCell>
                  <TableCell>{item.update_wallet_tot}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.current_action === 1 ? "ADD" : "SUB"}</TableCell>
                  <TableCell>{item.effective_amt}</TableCell>
                  <TableCell>{item.login_admin === -1 ? "By Super Admin" : item.login_admin === 1 ? "By Admin" : item.login_admin === 2 ? "By Settlement" : ""} </TableCell>
                  <TableCell>{item.created_on}</TableCell>
                  <TableCell>{item.objective}</TableCell>
                  <TableCell>{item.remark}</TableCell>
                </TableRow>
              );
            })
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={11} style={{ fontSize: "16px" }}>
                  <h4>No Data Found</h4>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
