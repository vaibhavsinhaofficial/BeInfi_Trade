import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ButtonBox = ({ name }) => {
  return (
    <>
      <button
        className={
          name === "Failed"
            ? "tablestatusbuttonFail"
            : name === "Success"
            ? "tablestatusbuttonComp"
            : "tablestatusbuttonWait"
        }
      >
        {name}
      </button>
    </>
  );
};

export default function InternationalTable({ tableBodyData, xlData, setXlData }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(tableBodyData);
  }, [tableBodyData]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
      setXlData(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.settlementId === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
      setXlData(tempUser.filter((item) => item.isChecked));
    }
  };

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{whiteSpace: "nowrap"}}>
            <TableRow>
              <TableCell>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="allSelect"
                  checked={!users.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell align="center">Settlement Id</TableCell>
              <TableCell align="center">Requested Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">From Currency</TableCell>
              <TableCell align="center">To Currency</TableCell>
              <TableCell align="center">Settlement Request</TableCell>
              <TableCell align="center">Rate/Fee Applied</TableCell>
              <TableCell align="center">Settlement Fee</TableCell>
              <TableCell align="center">Amount Sent</TableCell>
              <TableCell align="center">Amount Recieved</TableCell>
              <TableCell align="center">Source</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.settlementId}
                      checked={item?.isChecked || false}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell align="center">{item.settlementId}</TableCell>
                  <TableCell align="center">{item.requested_time}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex justify-content-between">
                      { item.status === 1 ? (
                        <ButtonBox name="Success" />
                      ) : item.status === 2 ? (
                        <ButtonBox name="Pending" />
                      ) : item.status === 3 ? (
                        <ButtonBox name="Pending" />
                      ) : (
                        <ButtonBox name="Failed" />
                      )}

                    </div>
                  </TableCell>
                  <TableCell align="center">{item.fromCurrency}</TableCell>
                  <TableCell align="center">{item.toCurrency}</TableCell>
                  <TableCell align="center">{item.requestedAmount}</TableCell>
                  <TableCell align="center">{item.exchangeRate}</TableCell>
                  <TableCell align="center">{item.charges}</TableCell>
                  <TableCell align="center">{item.settlementAmount}</TableCell>
                  <TableCell align="center">{item.settlementAmount}</TableCell>
                  <TableCell align="center">{item.source}</TableCell>
                  <TableCell align="center"><DialogOpenModel formData={item} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const DialogOpenModel = ({ formData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <h6
          onClick={handleClickOpen}
          className="btn btn-outline-primary"
        >
          View 
        </h6>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"lg"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              top: "0",
              margin: "0",
              borderRadius: "30px",
            },
          }}
        >
          <button
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#1eaae7',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '32px',
                height: '32px',
            }}
            onClick={handleClose}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            Transactions View
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-2 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Settlement ID
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settlementId}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Settlement Type
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settlementType}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      From Currency
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.fromCurrency}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      To Currency
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.toCurrency}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Account Number
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.accountNumber}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.bankName}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.branchName}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      City
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.city}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Country
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.country}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Swift Code
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.swiftCode}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Requested Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.requestedAmount}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Exchange Rate
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.exchangeRate}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Charges
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.charges}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Total Charges
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.totalCharges}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.created_on}
                    />
                  </div>
                  {
                    formData.settlementType === 'CRYPTO' ? (
                      <div className=" col-md-2 d-flex flex-column text-center  ">
                        <label htmlFor="" className="forminputDeposite">
                          Wallet Address
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={formData.walletAddress}
                        />
                      </div>
                    ) : ""
                  }
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3">
                    <div
                      className="dilogfirstbutton d-flex justify-content-center align-items-center"
                    >
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                        alt=""
                        width="45px"
                      />
                      <div className="mx-2">
                        <h6 style={{ color: "#000009", whiteSpace: "nowrap" }}>Settlement Amount</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px" }}>
                          {formData.settlementAmount}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
