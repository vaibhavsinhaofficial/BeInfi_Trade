import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./css/mainTable.css";
const MainTable = ({ tableHeading, TableBodyCom }) => {
  return (
    <TableContainer className="tablecontainer2">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ whiteSpace: "nowrap" }}>
            {tableHeading.map((item, index) => {
              return (
                <TableCell key={index} align="center" style={{ fontWeight: "600", fontSize: "14px", cursor: "auto" }}>
                  <b> {item}</b>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBodyCom />
      </Table>
    </TableContainer>
  );
};

export default MainTable;
