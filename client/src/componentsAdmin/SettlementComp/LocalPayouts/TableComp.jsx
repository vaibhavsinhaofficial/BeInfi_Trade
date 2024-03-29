import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../Loader/Loader";


export default function TableComp({ tableBodyData,tableHeading, loading }) {
  if(loading){
    return <Loader />
  }
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
                    <TableCell>{item.payout_bank===1 && item.trx_from===1?"Current":"Nodel"}</TableCell>
                    <TableCell>{item.payout_bank===1?'ICIC':item.payout_bank===2?"GATE8":item.payout_bank===3?"YTPAY":"CURRENT"}</TableCell>
                    <TableCell>{item.uniqueid}</TableCell>
                    <TableCell>{item.customer_order_id}</TableCell>
                    <TableCell>
                      <div className="mName">
                        &#40;{item.users_id}&#41;&nbsp;{item.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.response }</TableCell>
                    <TableCell>{item.utrnumber}</TableCell>
                    <TableCell>{item.trx_type}</TableCell>
                    <TableCell>{item.payee_name}</TableCell>
                    <TableCell>{item.creditacc}</TableCell>
                    <TableCell>{item.ifsc}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.remark}</TableCell>
                    <TableCell>{item.akonto_charge}</TableCell>
                    <TableCell>{item.gst_amount}</TableCell>
                    <TableCell>{item.bank_charges}</TableCell>
                    <TableCell>{item.wallet_deduct}</TableCell>
                    <TableCell>{item.currency }</TableCell>
                    <TableCell style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                    <TableCell style={{whiteSpace: "nowrap"}}>{item.updated_on}</TableCell>
                    
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
        </Table>
      </TableContainer>
    </>
  );
}




