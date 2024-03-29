import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import dollarGreen from "../InternationalSettlement/imgs/greendollar.svg";
import { toast } from 'react-toastify';
import AddIcon from "@mui/icons-material/Add";
import styles from './style.module.css'

export default function EnterNewRefund({fetchData}) {
  const auth = localStorage.getItem("admin");
  const [open, setOpen] = useState(false);
  const [merchant, setMerchant] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [gateway, setGateway] = useState([]);
  const [authorizer, setAuthorizer] = useState("");
  const [amount, setAmount] = useState("")
  const [charges, setCharges] = useState("")
  const [customer_name, setCustomer_name] = useState("")
  const [orderid, setOrderid] = useState("")

  const [merchantId, setMerchantId] = useState("");
  const [refundCurrency, setRefundCurrency] = useState("");
  const [bank, setBank] = useState("");
  const [transactionType,setTransactionType]=useState("");
  const [reason, setReason] = useState("")

  let today = new Date(); 
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time; 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const ReadData = async (val) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/allMerchant`,config);
      let result1 = await axios.post(`${baseUrl}/allCurrency`,{},config);
      let result2 = await axios.post(`${baseUrl}/payinGateway`,{},config);

      setMerchant(result.data.Data);
      setCurrency(result1.data.Data);
      setGateway(result2.data.paymentResult);
      setAuthorizer(result1.data.auth);
     
    } catch (error) {
      console.log(error);
    }
  };

  const details = async (val) => {
    setOrderid(val)
    try {
      let values = {
        orderId: val
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let disputeDetails = await axios.post(`
        ${baseUrl}/getRefundDetails`,
        values,
        config
      );

      setAmount(disputeDetails.data.Amount)
      setCharges(disputeDetails.data.Charges)
      setCustomer_name(disputeDetails.data.CustomerName)
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values={
        merchantId,
        refundCurrency,
        bank,
        transactionType,
        RefundId: Date.now(),
        cusName: customer_name,
        refundAmount: amount,
        refundCharges: charges,
        reason,
        orderid
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/newRefund`, values, config);
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
    details();
  }, []);

  return (
    <div>
      <button className={styles.addTransaction} onClick={handleClickOpen}><AddIcon /> Enter Transaction</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title" style={{fontWeight: "700", textAlign: "center"}}>
          {"ADD NEW REFUND"}
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12 dialogBlock1">
              <form action="" className="row justify-content-around" onSubmit={handleSubmit}>
                <div className=" col-md-3 d-flex flex-column text-center">
                  <label
                    className="forminputDeposite"
                    style={{ fontWeight: "700", color: "#000" }}
                  >
                    Merchant Id
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
                    <select
                    className="form-select form-select-sm mb-3 boldOption text-center"
                    name="merchantId"
                    style={{width:"100px"}}
                    value={merchantId}
                    onChange={(e)=>setMerchantId(e.target.value)}
                    required
                    >
                    <option value="default">Select Merchant</option>
                    {
                      merchant?.map((item,index)=>{
                      return(
                        <option key={index} value={item.id}>
                        &#40;{item.id}&#41;&nbsp;{item.name}
                        </option>
                      );
                      })
                    } 
                    </select>
                  </div>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Refund Date
                  </label>
                  <input type="text" className="input1" value={dateTime} name="receivedDate" required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                    Currency
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
                    <select
                    className="form-select form-select-sm mb-3 boldOption text-center"
                    name="Currency"
                    defaultValue={"default"}
                    style={{width:"100px"}}
                    value={refundCurrency}
                    onChange={(e)=>setRefundCurrency(e.target.value)}
                    required
                    >
                    <option value="default">Select Currency</option>
                    {
                      currency?.map((item,index)=>{
                      return(
                        <option key={index} value={item.sortname}>
                        {item.sortname}
                        </option>
                      );
                      })
                    } 
                    </select>
                  </div>
                </div>
                <div className=" col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Bank Name
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
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
                </div>
                <hr style={{ width: "95%" }} />

                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                    Transaction Type
                  </label>
                  <select
                    className="form-select form-select-sm mb-3 boldOption text-center"
                    value={transactionType}
                    onChange={(e)=>setTransactionType(e.target.value)}
                    required
                    style={{marginLeft: "40px"}}
                  >
                    <option value="default">Select Gateway</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="CRYPTO">Crypto</option>
                  </select>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Refund ID
                  </label>
                  <input type="text" className="input1" value={Date.now()} name="receivedDate" required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                    Reason
                  </label>
                  <input type="text" className="input1" value={reason} onChange={(e)=>setReason(e.target.value)} required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Order ID
                  </label>
                  <input type="text" className="input1" onChange={(e)=>{details(e.target.value);}} required/>
                </div>
                <hr style={{ width: "95%" }} />

                <div className=" col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Customer Name
                  </label>
                  <input type="text" className="input1" value={customer_name} readOnly required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Amount
                  </label>
                  <input type="text" className="input1" value={amount} readOnly required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Charges
                  </label>
                  <input type="text" className="input1" value={charges} readOnly required/>
                </div>
                <div className="col-md-3 d-flex flex-column text-center">
                  <label
                  className="forminputDeposite"
                  style={{ fontWeight: "700", color: "#000" }}
                  >
                  Authorizer
                  </label>
                  <input type="text" className="input1" value={authorizer} readOnly required/>
                </div>
                <hr style={{ width: "95%" }} />

                <div className="d-flex justify-content-between align-items-center">
                  <div className="totalBankdeposite d-flex align-items-center"> 
                    <img src={dollarGreen} alt="" width="50px" height="50px"/>
                    <div className="ms-2">
                        <h6 style={{color: "#fff"}}>Net Amount</h6>
                        <input type="text" style={{border:"none",outline:"none",backgroundColor:"#008800",fontWeight:"bold",width:"70%", color: "#fff" }} value={amount ? (amount - charges) : 0} name="NetAmount" readOnly />
                    </div>
                  </div>
                  <div>
                    <button className="btn btn" style={{background: "#008800", color: "#fff"}} type="submit">Create</button>
                  </div>                 
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}