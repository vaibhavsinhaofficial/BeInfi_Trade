import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import AddTransaction from "./AddTransaction";
import Loader from "../../Loader/Loader";

export default function TableComp({ tableBodyData, setXlData,tableHeading,fetchData, loading }) {
  const [users, setUsers] = useState(tableBodyData);
 useEffect(()=>{
  setUsers(tableBodyData)
 },[tableBodyData])

  if(loading){
    return <Loader />
  }
 

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ whiteSpace: "nowrap" }}>
            {tableHeading?.map((item,i)=><TableCell key={i} style={{ fontWeight: "600", fontSize: "14px", cursor: "auto" }}>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {Object.keys(users).length > 0 ? (
              users?.map((item, index) => {
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
                        &#40;{item.user_id}&#41;&nbsp;{item.mer_name}
                      </div>
                    </TableCell>
                    <TableCell>{item.trx_id}</TableCell>
                    <TableCell style={{whiteSpace: "nowrap"}}>{item.recieved_date}</TableCell>
                    <TableCell>{item.currency}</TableCell>
                    <TableCell style={{whiteSpace: "nowrap"}}>{item.title}</TableCell>
                    <TableCell>{item.trx_type}</TableCell>
                    <TableCell>{item.deposit_recieved}</TableCell>
                    <TableCell>{item.bank_charge}</TableCell>
                    <TableCell>{item.tax}</TableCell>
                    <TableCell>{item.total_charges}</TableCell>
                    <TableCell>{item.deposit_recieved}</TableCell>
                    <TableCell>{item.auth}</TableCell>
                    <TableCell align="center">
                      <PopUp formData={item} fetchData={fetchData}/>
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
        </Table>
      </TableContainer>
    </>
  );
}

const PopUp = ({ formData,fetchData }) => {
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
        >
          <div style={{ padding: "10px 20px" }}>
            <AddTransaction readData={formData} edit={true} fetchData={fetchData}  />
          </div>
        </Popover>
      </div>
    </>
  );
};


