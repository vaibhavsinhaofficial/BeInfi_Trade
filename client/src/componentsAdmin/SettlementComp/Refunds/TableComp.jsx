import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/Loader"
import greenrupee from "../LocalSettlement/imgs/rupeegreen.svg"
import greenDollar from "../InternationalSettlement/imgs/greendollar.svg"
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import { toast } from "react-toastify";

export default function TableComp({ tableBodyData,tableHeading, authUpdate, loading }) {
  if(loading){
    return <Loader />
  }
  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ whiteSpace: "nowrap" }}>
              {tableHeading.map((item,i)=><TableCell key={i} style={{fontWeight:"600", fontSize: "14px", cursor: "auto" }}>{item}</TableCell>)}
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
                      &#40;{item.user_id}&#41;&nbsp;{item.mer_name}
                    </div>
                  </TableCell>
                  <TableCell>{item.trx_id}</TableCell>
                  <TableCell style={{whiteSpace: "nowrap"}}>{item.received_date}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.charges}</TableCell>
                  <TableCell>{item.net_amount}</TableCell>
                  <TableCell>{item.net_amount}</TableCell>
                  <TableCell style={{whiteSpace: "nowrap"}}>{item.trx_type}</TableCell>
                  <TableCell>{item.bank_name}</TableCell>
                  <TableCell align="center">
                    {
                      authUpdate ? (
                        <PopUp formData={item} ID={item.trx_id} />
                      ) : null
                    }
                  </TableCell>
                </TableRow>
              );
            })
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={12}>
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

const PopUp = ({ formData, ID }) => {
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
            <DialogOpenModel formData={formData} />
            <DialogOpenModel1 ID={ID} />
          </div>
        </Popover>
      </div>
    </>
  );
};

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
          className="btn btn-success mt-3"
          style={{ width: "70px" }}
        >
          View 
        </h6>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            Refund Transaction
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.trx_id}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Merchant Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.mer_name}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Currency
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.currency}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.amount}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Payment Method
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.trx_type}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Charges
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.charges}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Updated On
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.updated_on}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Case Number
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.case_no}
                    />
                  </div>

                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.bank_name}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Reason
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.reason}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.customer_name}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Received Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.received_date}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3">
                    <div
                      onClick={handleClose}
                      className="dilogfirstbutton1 d-flex justify-content-center align-items-center"
                    >
                    {
                      formData.currency === "INR" ? (
                        <>
                          <img
                            src={greenrupee}
                            alt=""
                            width="45px"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={greenDollar}
                            alt=""
                            width="45px"
                          />
                        </>
                      )
                    }
                      <div className="mx-2">
                        <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Net Amount</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff", textAlign: "center" }}>
                          {formData.net_amount}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    <div>
                      <span onClick={handleClose} className="dilogrefund mx-3" style={{color: "#fff", background: "#008800"}}>
                        Close
                      </span>
                    </div>
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

const DialogOpenModel1 = ({ ID }) => {
  
  const [open, setOpen] = React.useState(false);
  const [merchantId, setMerchantId] = useState("")
  const [merchantName, setMerchantName] = useState("")
  const [receivedDate, setReceivedData] = useState("")
  const [currency, setCurrency] = useState("")
  const [bank, setBank] = useState("")
  const [type, setType] = useState("")
  const [transaction_id, setTransaction_id] = useState("")
  const [customer_name, setCustomer_name] = useState("")
  const [amount, setAmount] = useState("")
  const [charges, setCharges] = useState("")
  const [reason, setReason] = useState("")
  const [autho, setAuth] = useState("")
  const [net_amount, setNet_amount] = useState("")
  const [caseNumber, setCaseNumber] = useState("")

  const [mapCurrency, setMapCurrency] = useState([]);
  const [gateway, setGateway] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");
  const details = async () => {
    try {
      let values = {
        trx_id: ID
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/getRefundData`,
        values,
        config
      );

      let result1 = await axios.post(`${baseUrl}/allCurrency`,{},config);
      let result2 = await axios.post(`${baseUrl}/allGateway`,{},config);

      setMerchantId(result.data.result.user_id)
      setMerchantName(result.data.result.customer_name)
      setReceivedData(result.data.result.recieved_date)
      setCurrency(result.data.result.currency)
      setBank(result.data.result.bank_name)
      setType(result.data.result.trx_type)
      setTransaction_id(result.data.result.trx_id)
      setCustomer_name(result.data.result.customer_name)
      setAmount(result.data.result.amount)
      setCharges(result.data.result.charges)
      setReason(result.data.result.reason)
      setAuth(result.data.result.auth)
      setNet_amount(result.data.result.net_amount)
      setCaseNumber(result.data.result.case_no)

      setMapCurrency(result1.data.Data);
      setGateway(result2.data.Data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values={
        currency,
        bank,
        type,
        reason,
        caseNumber,
        ID: ID
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/updateRefund`, values, config);
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // fetchData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    details();
  }, []);


  return (
    <>
      <div>
        <h6
          onClick={handleClickOpen}
          className="btn btn-primary mt-3 mb-3"
          style={{ width: "70px" }}
        >
          Edit 
        </h6>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            Edit Refund Transaction
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form className="row justify-content-around"  onSubmit={handleSubmit}>
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Merchant ID<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={merchantId}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Merchant Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={merchantName}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Received Date<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={receivedDate}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Currency
                    </label>
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="Currency"
                      defaultValue={"default"}
                      style={{width:"100px"}}
                      value={currency}
                      onChange={(e)=>setCurrency(e.target.value)}
                      required
                      >
                      <option value="default">Select Currency</option>
                      {
                        mapCurrency?.map((item,index)=>{
                        return(
                          <option key={index} value={item.sortname}>
                          {item.sortname}
                          </option>
                        );
                        })
                      } 
                      </select>
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Bank Name
                    </label>
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="merchantId"
                      style={{width:"100px"}}
                      value={bank}
                      onChange={(e)=>setBank(e.target.value)}
                      required
                    >
                      <option value="default">Select Gateway</option>
                      {
                        gateway?.map((item,index)=>{
                        return(
                          <option key={index} value={item.id}>
                          {item.gateway_name}
                          </option>
                        );
                        })
                      }
                      </select>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Transaction Type
                    </label>
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      value={type}
                      onChange={(e)=>setType(e.target.value)}
                      required
                      style={{marginLeft: "40px"}}
                    >
                      <option value="default">Select Gateway</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="CRYPTO">Crypto</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Transaction ID<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={transaction_id}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Customer name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={customer_name}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  
                  <div className="col-md-2 col-md-offset-1 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                        Case Number
                      </label>
                      <input
                        type="text"
                        className="input1"
                        value={caseNumber}
                        onChange={(e)=>setCaseNumber(e.target.value)}
                      />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Amount<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={amount}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Charges<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={charges}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Reason
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={reason}
                      onChange={(e)=>setReason(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Authorizer<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={autho}
                    />
                  </div>


                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3">
                    <div
                      onClick={handleClose}
                      className="dilogfirstbutton1 d-flex justify-content-center align-items-center"
                    >
                      {currency === "INR" ? (
                        <>
                          <img
                            src={greenrupee}
                            alt=""
                            width="45px"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={greenDollar}
                            alt=""
                            width="45px"
                          />
                        </>
                      )}
                      <div className="mx-2">
                        <h6 style={{ color: "#fff", whiteSpace: "nowrap" }}>Amount</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px", color: "#fff", textAlign: "center" }}>
                          {net_amount}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    <div>
                     <button className="btn btn" style={{background: "#008800", color: "#fff"}} type="submit">Update</button>
                    </div>
                  </div>
                  <span style={{ color: "red", fontSize: "12px" }}>*These Fields Are Not Allowed To Edit</span>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
