import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import Gateway from "./Gateway";
import Payout from "./Payout";
import { Popover, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Select from 'react-select';


function MerchantAdmin({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Profile",
    "Smart Switch",
    "Wallet",
    // "Payin chrg",
    // "Payout chrg",
    // "Cash Payout chrg",
    // "Crypto Payout chrg",
    "Rolling reverse chrg",
    "Merchant Number",
    "Name",
    "Email",
    "Secret Key",
    "Secret IV",
    "Test Secret Key",
    "Test Secret IV",
    "Settle",
    // "CARD",
    // "UPI",
    // "NetBanking",
    // "Wallet",
    // "QR Code",
    "Payout Gateway",
    "Status",
    "Web Payment",
    "Action",
    "Created",
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [payoutGateWay, setPayoutGateWay] = useState([]);
  const [urlData, setUrlData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(true)
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/merchantAdmin`,
        formData,
        config
      );
      setMessage(result.data.message);
      setPaymentData(result.data.paymentResult);
      setUrlData(result.data.urlResult);
      setPayoutGateWay(result.data.payoutResult);

      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, limitVal]);

  const updateSelectKey = async (id, name, value) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("secretName", name);
      formData.append("value", value);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/updateSelectKey`,
        formData,
        config
      );
      ReadData();
    } catch (error) {
      console.log(error);
    }
  };

  const verifyStatus = async (id, email_verification) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("email", email_verification);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/verifyProfile`,
        formData,
        config
      );
      
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      ReadData();
     
    } catch (error) {
      console.log(error);
    }
  };

  const sendMail = async (email) => {
    try {
      let formData = new FormData();
      formData.append("email", email);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/sendMail`,
        formData,
        config
      );
      
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // ReadData();
     
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async (id) => {
    try {
      let formData = new FormData();
      formData.append("id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/completeProfile`,
        formData,
        config
      );
      
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      ReadData();
     
    } catch (error) {
      console.log(error);
    }
  };

  if(loading){
    return <Loader />
  }

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
                  <TableCell align="center">
                    {item.password ? (
                      <button className="btn btn-primary btn-sm" onClick={() => sendMail(item.email)} style={{width: "100%"}}>Resend</button>
                    ) : (
                      <button className="btn btn-success btn-sm" onClick={() => sendMail(item.email)} style={{width: "100%"}}>Send</button>
                    )}
                    {item.email_verification ? (
                      <button className="btn btn-info my-2 btn-sm" style={{width: "100%"}} disabled>
                        Verified
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary my-2 btn-sm" style={{width: "100%"}}
                        onClick={() => verifyStatus(item.id, item.email_verification)}
                      >
                        Verify
                      </button>
                    )}
                    {item.complete_profile === 1 ? (
                      <button className="btn btn-primary btn-sm" style={{width: "100%"}} disabled>
                        Completed
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm" style={{width: "100%"}}
                        onClick={() => complete(item.id)}
                      >
                        Complete
                      </button>
                    )}
                    <Gateway id={item.id} />
                  </TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                      <Link to={`/bankconnect/INR/${item.id}`}>
                        <button button className="btn btn-info btn-sm" style={{width: "100px", color: "#fff"}}>INR</button>
                      </Link>
                      <Link to={`/bankconnect/NonInr/${item.id}`}>
                        <button className="btn btn-info mt-3 btn-sm" style={{width: "100px", color: "#fff"}}>NON INR</button>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.wallet}</TableCell>
                  {/* <TableCell align="center">{item.payin_upi}</TableCell>
                  <TableCell align="center">{item.payout_neft}</TableCell>
                  <TableCell align="center">{item.payout_imps}</TableCell>
                  <TableCell align="center">{item.payout_rtgs}</TableCell> */}
                  <TableCell align="center">{item.rolling_reverse}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">
                    <div className="mName">
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {item.secretkey}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "secretkey", 1)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.sec_iv}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "sec_iv", 2)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.test_secretkey}
                    <button
                      className="m-2"
                      onClick={() =>
                        updateSelectKey(item.id, "test_secretkey", 3)
                      }
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.test_sec_iv}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "test_sec_iv", 4)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">{item.settle_currency}</TableCell>
                  {/* <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id}
                      onChange={(e) => {
                        updateSelectKey(item.id, "gateway_id", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment, indexPayment) => {
                        return (
                          <option value={payment.id} key={indexPayment}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.card_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "card_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url, urlIndex) => {
                        return (
                          <option value={url.merchant_url} key={urlIndex}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.card_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "card_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell> */}
                  {/* <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_2}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_2",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.upi_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "upi_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.upi_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "upi_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell> */}
                  {/* <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_3}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_3",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.netBanking_url}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "netBanking_url",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.netbanking_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "netbanking_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell> */}
                  {/* <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_4}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_4",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.wallet_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "wallet_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.wallet_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "wallet_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell> */}
                  {/* <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_5}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_5",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.qr_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "qr_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url, index) => {
                        return (
                          <option value={url.merchant_url} key={index}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.qr_otherurl}
                      onChange={(e) => {
                        updateSelectKey(item.id, "qr_otherurl", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell> */}

                  <TableCell align="center">
                    <Payout id={item.id} />
                  </TableCell>

                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateSelectKey(item.id, "status", 0)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateSelectKey(item.id, "status", 1)}
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {item.allow_webpayment === 1 ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          updateSelectKey(item.id, "allow_webpayment", 0)
                        }
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          updateSelectKey(item.id, "allow_webpayment", 1)
                        }
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <PopUp item={item} authRead={authRead} authUpdate={authUpdate} authDelete={authDelete} ReadData={ReadData}/>
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  {/* <TableCell align="center">
                    <div className="d-flex flex-column">
                      <img
                        src="./imgs/avatar.svg"
                        alt="not found"
                        width="100px"
                      />
                      <h6 style={{ fontSize: "12px", fontWeight: "600" }}>
                        Img Not Found
                      </h6>
                    </div>
                  </TableCell> */}
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
          <div className="col-4">
            <h4 className="headingAll"> Manage Merchants List</h4>
          </div>
          <div className="col-4">
            {/* <SearchItem searchItem={searchVal} setSearchItem={setSearchval}  /> */}
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="col-2">
            <span>Show</span>
            <select
              name="tableRow"
              className="mx-2"
              onChange={(e) => setLimitVal(e.target.value)}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Entries</span>
          </div>
          <div className="col-2 text-end">
            {authCreate ? (
              <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData}/>
            ) : null}
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

const PopUp = ({item, authRead, authUpdate, authDelete, ReadData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteRow = async (id) => {
    try {
      const auth = localStorage.getItem("admin");
      let answer = window.confirm("Are you sure you want to delete this row?");
      if (answer) {
        let formData = new FormData();
        formData.append("id", id);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };

        let result = await axios.post(
          `${baseUrl}/deleteMerchantAdmin`,
          formData,
          config
        );
        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        ReadData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
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
          PaperProps={{
            style: { width: "100px" },
          }}
        >

          <div className="d-flex  align-items-center justify-content-around flex-column">
            {authRead ? (
              <DialogOpenModelView authRead={authRead} ID={item.id} />
            ) : null}

            {/* {authUpdate ? (
              <Link to={`/bankconnect/EditMerchantAdmin/${item.id}`}>
                <button className="btn btn-primary mt-3" style={{width: "70px"}}>
                  Edit
                </button>
              </Link>
            ) : null} */}
            {authUpdate ? (
              <DialogOpenModelEdit authUpdate={authUpdate} ID={item.id} />
            ) : null}

            {authDelete ? (
              <button
                className="btn btn-info mt-3 mb-3 btn-sm"
                style={{width: "70px", color: "#fff"}}
                onClick={() => deleteRow(item.id)}
              >
                Delete
              </button>
            ) : null}
          </div>
          
        </Popover>
      </div>
    </>
  );
};

const DialogOpenModelAdd = ({ authCreate, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile_no, setMobile_no] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessLocation, setBusinessLocation] = useState("")
  const [job_title, setJob_title] = useState("")
  const [website, setWebsite] = useState("")
  const [apv, setApv] = useState("")
  const [ata, setAta] = useState("")
  const [chargebackPercentage, setChargebackPercentage] = useState("")
  const [currenciesReq, setCurrenciesReq] = useState("")
  const [currencyName, setCurrencyName] = useState([])

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const auth = localStorage.getItem("admin");

  const typeDataFirst = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/currencySelect`,
        formData,
        config
      );
      setCurrencyName(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    typeDataFirst();
  }, []);

  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const handleCurrencyChange = (selectedOptions) => {
    setSelectedCurrencies(selectedOptions);
    const currencyValues = selectedOptions.map((option) => option.value);
    setCurrenciesReq(currencyValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!firstName || !lastName || !email || !mobile_no || !businessName || !businessLocation || !job_title || !website || !apv || !ata || !chargebackPercentage || !currenciesReq ) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
          fname: firstName,
          lname: lastName,
          email: email,
          mobile_no: mobile_no,
          bname: businessName,
          blocation: businessLocation,
          job_title: job_title,
          website: website,
          apv: apv,
          ata: ata,
          charge_back_per: chargebackPercentage,
          currencies_req: currenciesReq,
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createMerchantAdmin`, values, config);
      toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      ReadData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
          {authCreate ? (
            <button
              style={{
              background: "#ff6600",
              borderRadius: "30px",
              color: "#fff",
              width: "100px",
              height: "36px",
              cursor: "pointer",
              }}
              onClick={handleClickOpen}
            >
              Add New
            </button>
          ) : null}
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
                      background: '#ff6600',
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
                  New Merchant
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">First Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="First Name" className="form-control mb-3" onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Last Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Last Name" className="form-control mb-3" onChange={(e) => setLastName(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Email</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Mobile No.</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Mobile" className="form-control mb-3" onChange={(e) => setMobile_no(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Business Name</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Business Name" className="form-control mb-3" onChange={(e) => setBusinessName(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Business Location</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Business Location" className="form-control mb-3" onChange={(e) => setBusinessLocation(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Job Title</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Job Title" className="form-control mb-3" onChange={(e) => setJob_title(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Website</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Website" className="form-control mb-3" onChange={(e) => setWebsite(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Annual Processing Volume</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Annual Processing Volume" className="form-control mb-3" onChange={(e) => setApv(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel" style={{whiteSpace: "nowrap"}}>Average Transaction Amount</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Average Transaction Amount" className="form-control mb-3" onChange={(e) => setAta(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Chargeback Percenatge</label>
                            </div>
                            <div className="col-8">
                              <input type="text" placeholder="Chargeback Percenatge" className="form-control mb-3" onChange={(e) => setChargebackPercentage(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-4">
                                <label className="merchantLabel">Currencies Required</label>
                            </div>
                            <div className="col-8">
                              <Select
                                closeMenuOnSelect={false}
                                options={currencyName}
                                isMulti
                                value={selectedCurrencies}
                                onChange={handleCurrencyChange}
                                menuPosition="top"
                                styles={{
                                  container: (provided) => ({
                                    ...provided,
                                    width: '100%',
                                    fontSize: '12px',
                                    position: 'relative',
                                  }),
                                  control: (provided) => ({
                                    ...provided,
                                    minHeight: '32px',
                                  }),
                                  option: (provided) => ({
                                    ...provided,
                                    fontSize: '12px',
                                  }),
                                  menuList: (provided) => ({
                                    ...provided,
                                    maxHeight: '80px',
                                    overflow: 'auto',
                                  }),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                            <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} type="submit">Create</button>
                        </div>
                        {formIncomplete && (
                          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
                        )}
                      </form>
                    </div>
                </div>
              </DialogContent>
          </Dialog>
      </div>
    </>
  );
};

const DialogOpenModelEdit = ({ authUpdate, ID }) => {
  
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("admin");
  const [walletOps, setWalletOps] = useState(0);
  const [inpWallet, setInpWallet] = useState("");
  const [wallet, setWallet] = useState("");
  const [country, setCountry] = useState([]);
  const [data, setData] = useState([]);
  const [sandboxWallet, setSandboxWallet] = useState("");
  const [bankName, setBankName] = useState([]);
  const [walletSandOps, setWalletSandOps] = useState(0);
  const [inpSandWallet, setInpSandWallet] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [data1, setData1] = useState([])
  const [walletMesssage, setWalletMessage] = useState("");
  const [sandboxWalletMessage, setSandboxWalletMessage] = useState("");
  const [paymentModeMessage, setPaymentModeMessage] = useState("");
  const [addBankMessage, setAddBankMessage] = useState("");
  const [merchantCharges, setMerchantCharges] = useState("");
  const [merchantUpdated, setMerchantUpdated] = useState("");
  const [dataUpdated, setDataUpdated] = useState(false);
  const [bankTitles, setBankTitles] = useState([])

  const handleInputChange = async (value, field, index) => {
    const updatedCountry = [...country];
    updatedCountry[index][field] = value;
    setCountry(updatedCountry);

    setData1(updatedCountry[index]);
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchData(ID);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const [check, setCheck] = useState({
    Card: "",
    NetBanking: "",
    UPI: "",
    Wallet: "",
    QRCode: "",
    Payout: "",
    MidData: "",
  });

  const [inputdata, setInputdata] = useState({
    ChargeBackChargesDown: "",
    ChargeBackChargesUp: "",
    RefundChargesINR: "",
    RollingReversemonth: "",
    RollingReverseCharges: "",
    PayoutCashCharges: "",
    PayoutCryptoCharges: "",
    Country1: "",
    PayinCharges1: "",
    PayoutCharges1: "",
    GSTCharges1: "",
    AddBankAndWallet: "",

    // After Set A defaul 🤓🤓🤓
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
    Businessname: "",
    Businesslocation: "",
    Jobtitle: "",
    Website: "",
    AnnualProcessingVolume: "",
    AverageTransactionAmount: "",
    Chargebackpercentage: "",
    Currenciesrequired: "",
    MID: "",
    MKEY: "",
    MIDBilldesk: "",
    MKEYBilldesk: "",
    SettledCurrency: "",
    IsPayMerchantCode: "",
    IsPayEncryptionKey: "",
    IsPaySecureSecret: "",
    IsPayAccessCode: "",
    IsPayMccCode: "",
    IsPayTerminalID: "",
    CashfreeMid: "",
    CashfreeSecretkey: "",
    MerchantURL: "",
  });

  // Fetch Data Starts
  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", ID);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/readOneMerchantAdmin`,
        formData,
        config
      );
      setCountry(result.data.country);
      setBankName(result.data.bankName);
      setBankTitles(result.data.bankTitles)
      setCheck({
        Card: result.data.data.allow_card_payment,
        NetBanking: result.data.data.allow_netbanking_payment,
        UPI: result.data.data.allow_upi_payment,
        Wallet: result.data.data.allow_wallet_payment,
        QRCode: result.data.data.allow_qr_payment,
        Payout: result.data.data.allow_payout,
        MidData: result.data.data.allow_webpayment,
      });

      setInputdata({
        ChargeBackChargesDown: result.data.data.chargebk_down,
        ChargeBackChargesUp: result.data.data.chargebk_up,
        RefundChargesINR: result.data.data.refund,
        RollingReversemonth: result.data.data.rolling_reverse_months,
        RollingReverseCharges: result.data.data.rolling_reverse,
        PayoutCashCharges: result.data.data.payout_imps,
        PayoutCryptoCharges: result.data.data.payout_rtgs,
        Country1: "",
        PayinCharges1: "",
        PayoutCharges1: "",
        GSTCharges1: "",
        AddBankAndWallet: "",

        // After Set a value 🤓🤓🤓
        Firstname: result.data.data.fname,
        Lastname: result.data.data.lname,
        Email: result.data.data.email,
        Mobileno: result.data.data.mobile_no,
        Businessname: result.data.data.bname,
        Businesslocation: result.data.data.blocation,
        Jobtitle: result.data.data.job_title,
        Website: result.data.data.website,
        AnnualProcessingVolume: result.data.data.apv,
        AverageTransactionAmount: result.data.data.ata,
        Chargebackpercentage: result.data.data.charge_back_per,
        Currenciesrequired: result.data.data.currencies_req,
        MID: result.data.data.mid,
        MKEY: result.data.data.mkey,
        MIDBilldesk: result.data.data.mid2,
        MKEYBilldesk: result.data.data.mkey2,
        SettledCurrency: result.data.data.settle_currency,
        IsPayMerchantCode: result.data.data.mid3,
        IsPayEncryptionKey: result.data.data.mkey3,
        IsPaySecureSecret: result.data.data.secure_secret,
        IsPayAccessCode: result.data.data.access_code,
        IsPayMccCode: result.data.data.mcc_code,
        IsPayTerminalID: result.data.data.terminal_id,
        CashfreeMid: result.data.data.cashfree_mid,
        CashfreeSecretkey: result.data.data.cashfree_scerity_key,
        MerchantURL: result.data.data.merchant_url,
        Bankid: result.data.data.bankid
      });
      setData(result.data.data);
      setSandboxWallet(result.data.data.sandboxwallet)
      setWallet(result.data.data.wallet)

    } catch (error) {
      console.log(error);
    }
  };
  const commaSeparatedTitles = bankTitles.join(', ');
  // Fetch Data Ends

  // Update Wallets Starts
  const updateWallet = async () => {
    try {
      let walllet;
      if (walletOps === "1") {
        walllet = Number(inpWallet) + wallet;
      } else if (walletOps === "2") {
        walllet = wallet - inpWallet;
      } else {
        walllet=wallet;
      }
      let formData = new FormData();
      formData.append("wallet", walllet);
      formData.append("id", ID);
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateWallet`,
        formData,
        config
      );
      if (result) {
        fetchData()
        setWalletOps(0);
        setInpWallet("Enter Wallet Amount")
        setDataUpdated(true);
        setWalletMessage("Wallet Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setWalletMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSandboxWallet = async () => {
    try {
      let wallet;
      if (walletSandOps === "1") {
        wallet = Number(inpSandWallet) + sandboxWallet;
      } else if (walletSandOps === "2") {
        wallet = sandboxWallet - inpSandWallet;
      } else {
        wallet=sandboxWallet;
      }
      let formData = new FormData();
      formData.append("wallet", wallet);
      formData.append("id", ID);
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateSandboxWallet`,
        formData,
        config
      );
      if (result) {
        fetchData()
        setWalletSandOps(0);
        setInpSandWallet("Enter Sandbox Wallet Amount")
        setDataUpdated(true);
        setSandboxWalletMessage("Sandbox Wallet Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setSandboxWalletMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Update Wallets Ends

  // Update Payment Modes Starts
  const setPaymentMethod = async () => {
    try {
      const data = {
        id: ID,
        value: check,
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/setPaymentMethod`,
        data,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setPaymentModeMessage("Payment Mode Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setPaymentModeMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Update payment Modes Ends

  const checkHandleChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked ? 1 : 0 });
  };
  const handleChangeInput = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  // Update Merchant Details
  const updateData = async () => {
    try {
      const values = {
        id: ID,
        value: inputdata,
        selectedOption
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateMerchantAdmin`,
        values,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setMerchantUpdated("Merchant Details Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setMerchantUpdated("");
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Merchant charges according to currency
  const updateCharges = async () => {
    try {
      const data = {
        id: ID,
        value1: data1
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateMerchantCharges`,
        data,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setMerchantCharges("Merchant Charges Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setMerchantCharges("");
        }, 5000);
      }
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Add Banks
  const addBanks = async () => {
    try {
      const data = {
        id: ID,
        selectedOption
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/addBanks`,
        data,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setAddBankMessage("Bank Added");
        setTimeout(() => {
          setDataUpdated(false);
          setAddBankMessage("");
        }, 5000);
      }
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
          {authUpdate ? (
            <button
              className="btn btn-secondary mt-3 btn-sm"
              style={{width: "70px"}}
              onClick={handleClickOpen}
            >
              Edit
            </button>
          ) : null}
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
                      background: '#ff6600',
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
                  Edit Merchant 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <div className="row justify-content-around">
                        {/* Wallet Update */}
                        <div className="row mb-3">
                          <div className="col-3">
                              <Heading heading= {`Wallet: ${data.wallet ? data.wallet : 0}`} />
                          </div>
                          <div className="col-3">
                            <select
                              className="form-select"
                              style={{height: "47px"}}
                              value={walletOps}
                              onChange={(e) => setWalletOps(e.target.value)}
                            >
                              <option value={0}>Select</option>
                              <option value={1}>Add(+)</option>
                              <option value={2}>Sub(-)</option>
                            </select>
                          </div>
                          <div className="col-3">
                            <input
                              type="number"
                              placeholder="Enter Wallet Amount"
                              value={inpWallet}
                              onChange={(e) => setInpWallet(e.target.value)}
                              style={{border: "1px solid #bfbfbf", padding: "10px"}}
                            />
                          </div>
                          <div className="col-3">
                            <button
                              className="btn btn"
                              style={{width: "100px", margin: "auto", display: "block"}}
                              onClick={() => updateWallet(data.wallet)}
                            >
                              Update
                            </button>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{walletMesssage}</p>
                          )}
                        </div>

                        {/* Sandbox Wallet Update */}
                        <div className="row mb-3">
                          <div className="col-3">
                            <Heading heading= {`Sandbox Wallet: ${data.sandboxwallet ? data.sandboxwallet : 0}`} />
                          </div>
                          <div className="col-3">
                            <select
                              className="form-select"
                              style={{height: "47px"}}
                              value={walletSandOps}
                              onChange={(e) => setWalletSandOps(e.target.value)}
                            >
                              <option value={0}>Select</option>
                              <option value={1}>Add(+)</option>
                              <option value={2}>Sub(-)</option>
                            </select>
                          </div>
                          <div className="col-3">
                            <input
                              type="number"
                              placeholder="Enter Sandbox Wallet Amount"
                              value={inpSandWallet}
                              onChange={(e) => setInpSandWallet(e.target.value)}
                              style={{border: "1px solid #bfbfbf", padding: "10px"}}
                            />
                          </div>
                          <div className="col-3">
                            <button
                              className="btn btn"
                              style={{width: "100px", margin: "auto", display: "block"}}
                              onClick={() => updateSandboxWallet(data.sandboxwallet)}
                            >
                              Update
                            </button>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{sandboxWalletMessage}</p>
                          )}
                        </div>
                        <hr />

                        {/* Check Box Starts */}
                        <HeadingTable heading="Merchant Payment Modes" />
                        <div className="row">
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Card}
                              onChange={checkHandleChange}
                              name="Card"
                              label="Card Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.NetBanking}
                              onChange={checkHandleChange}
                              name="NetBanking"
                              label="NetBanking Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.UPI}
                              onChange={checkHandleChange}
                              name="UPI"
                              label="UPI Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Wallet}
                              onChange={checkHandleChange}
                              name="Wallet"
                              label="Wallet Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.QRCode}
                              onChange={checkHandleChange}
                              name="QRCode"
                              label="QR Code Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Payout}
                              onChange={checkHandleChange}
                              name="Payout"
                              label="Payout Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.MidData}
                              onChange={checkHandleChange}
                              name="MidData"
                              label="Data to MID"
                            />
                          </div>
                          <div className="col-3 mt-4">
                            <button
                              className="btn btn"
                              style={{width: "50%"}}
                              onClick={() => setPaymentMethod()}
                            >
                              Set Payments
                            </button>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{paymentModeMessage}</p>
                          )}
                        </div>
                        <hr />
                        {/* Check Box Ends */}

                        <HeadingTable heading="Merchant Charges According To Currencies" />
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <th colSpan="2">
                                <table className="table table-bordered my-4" width="100%">
                                    <tbody>
                                    <tr>
                                        <th className="merchantTh"></th>
                                        <th colSpan="6" className="merchantTh">Payin Charges in %</th>
                                        <th className="merchantTh">Payout Charges in %</th>
                                        <th className="merchantTh">GST Charges in %</th>
                                        <th className="merchantTh">Action</th>
                                    </tr>
                                    <tr>
                                      <th className="merchantTh">Country</th>
                                      <th className="merchantTh">NetBanking</th>
                                      <th className="merchantTh">E-Wallet</th>
                                      <th className="merchantTh">QR-Code</th>
                                      <th className="merchantTh">UPI</th>
                                      <th className="merchantTh">Card</th>
                                      <th className="merchantTh">VA Offline</th>
                                      <th className="merchantTh">Payout</th>
                                      <th className="merchantTh">GST</th>
                                      <th className="merchantTh"></th>
                                    </tr>
                                    {Object.keys(country).length > 0 ? (
                                      country.map((item, i) => {
                                      return (
                                        <tr>
                                          <td style={{fontWeight: "900", verticalAlign: "middle"}}>{item.name}<br />&#40;{item.sortname}&#41;</td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.PayinNetbanking}
                                            value={item.PayinNetbanking}
                                            onChange={(e) => handleInputChange(e.target.value, 'PayinNetbanking', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.PayinWallet}
                                            value={item.PayinWallet}
                                            onChange={(e) => handleInputChange(e.target.value, 'PayinWallet', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.PayinQR}
                                            value={item.PayinQR}
                                            onChange={(e) => handleInputChange(e.target.value, 'PayinQR', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.payinUPI}
                                            value={item.payinUPI}
                                            onChange={(e) => handleInputChange(e.target.value, 'payinUPI', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.PayinCard}
                                            value={item.PayinCard}
                                            onChange={(e) => handleInputChange(e.target.value, 'PayinCard', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.vaoffline}
                                            value={item.vaoffline}
                                            onChange={(e) => handleInputChange(e.target.value, 'vaoffline', i)}
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.PayoutAmount}
                                            value={item.PayoutAmount}
                                            onChange={(e) => handleInputChange(e.target.value, 'PayoutAmount', i)}
                                            className="mt-3"
                                          />
                                          </td>
                                          <td>
                                          <InputField
                                            type="text"
                                            name={item.GstAmount}
                                            value={item.GstAmount}
                                            onChange={(e) => handleInputChange(e.target.value, 'GstAmount', i)}
                                          />
                                          </td>
                                          <td>
                                            <button className="btn btn" style={{marginTop: "20px"}} 
                                            onClick={() => updateCharges()}
                                            >Update</button>
                                          </td>
                                        </tr>
                                        
                                      )})
                                    ) : (
                                        <tr>
                                          <td colSpan="10" style={{textAlign: "center", color: "red", fontSize: "15px", padding: "10px"}}>You have not selected any currency..</td>
                                        </tr>
                                    )}
                                    {
                                      merchantCharges ? (
                                        <tr>
                                          <td colSpan="10" style={{textAlign: "center", color: "red", fontSize: "15px", padding: "10px"}}>
                                            {dataUpdated && (
                                              <p style={{ color: "red", textAlign: "center" }}>{merchantCharges}</p>
                                            )}
                                          </td>
                                        </tr>
                                      ) : ""
                                    }                    
                                  </tbody>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>

                        <div className="row d-flex justify-content-center align-items-center mb-3">
                          {/* <HeadingTable heading={`Previous Choosed Bank: ${commaSeparatedTitles ? commaSeparatedTitles : "No Bank Choosed"}`} /> */}
                          <div className="headingTable" style={{color: "#fff"}}>
                            <h5>Previous Choosed Bank:</h5><span>{`${commaSeparatedTitles ? commaSeparatedTitles : "No Bank Choosed"}`}</span>
                          </div>
                          <div className="col-10">
                            <label className="form-label">Add Bank And Wallet</label>
                            <Select
                              closeMenuOnSelect={false}
                              options={bankName}
                              isMulti
                              // value={bankName.filter(option => inputdata.Bankid.includes(option.value))}
                              onChange={setSelectedOption}
                            />
                          </div>
                          <div className="col-2">
                            <div>
                              <button className="btn btn" style={{marginTop: "35px"}} onClick={() => addBanks()}>Add Bank</button>
                            </div>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{addBankMessage}</p>
                          )}
                        </div>
                        
                        <HeadingTable heading="Charges Details" />
                        <div className="col-3 my-2">
                          <InputField
                            title="ChargeBack Charges in INR Down"
                            type="text"
                            name="ChargeBackChargesDown"
                            value={inputdata.ChargeBackChargesDown}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputField
                            title="ChargeBack Charges in INR UP"
                            type="text"
                            name="ChargeBackChargesUp"
                            value={inputdata.ChargeBackChargesUp}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputField
                            title="Refund Charges in INR"
                            type="text"
                            name="RefundChargesINR"
                            value={inputdata.RefundChargesINR}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputField
                            title="Rolling Reverse month"
                            type="text"
                            name="RollingReversemonth"
                            value={inputdata.RollingReversemonth}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            title="Rolling Reverse Charges in %"
                            type="text"
                            name="RollingReverseCharges"
                            value={inputdata.RollingReverseCharges}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            title="Payout Cash Charges in %*"
                            type="text"
                            name="PayoutCashCharges"
                            value={inputdata.PayoutCashCharges}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            title="Payout Crypto Charges in %*"
                            type="text"
                            name="PayoutCryptoCharges"
                            value={inputdata.PayoutCryptoCharges}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <hr />

                        <HeadingTable heading="Merchant Details" />
                        <>
                          <div className="col-3 my-2">
                            <InputField
                              title="First name"
                              type="text"
                              name="Firstname"
                              value={inputdata.Firstname}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Last name"
                              type="text"
                              name="Lastname"
                              value={inputdata.Lastname}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Email"
                              type="text"
                              name="Email"
                              value={inputdata.Email}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Mobile no"
                              type="text"
                              name="Mobileno"
                              value={inputdata.Mobileno}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Business name"
                              type="text"
                              name="Businessname"
                              value={inputdata.Businessname}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Business location"
                              type="text"
                              name="Businesslocation"
                              value={inputdata.Businesslocation}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Job title"
                              type="text"
                              name="Jobtitle"
                              value={inputdata.Jobtitle}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Website"
                              type="text"
                              name="Website"
                              value={inputdata.Website}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Annual Processing Volume"
                              type="text"
                              name="AnnualProcessingVolume"
                              value={inputdata.AnnualProcessingVolume}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Average Transaction Amount"
                              type="text"
                              name="AverageTransactionAmount"
                              value={inputdata.AverageTransactionAmount}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Charge back percentage"
                              type="text"
                              name="Chargebackpercentage"
                              value={inputdata.Chargebackpercentage}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Currencies required"
                              type="text"
                              name="Currenciesrequired"
                              value={inputdata.Currenciesrequired}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="MID"
                              type="text"
                              name="MID"
                              value={inputdata.MID}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="MKEY"
                              type="text"
                              name="MKEY"
                              value={inputdata.MKEY}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="MID Billdesk"
                              type="text"
                              name="MIDBilldesk"
                              value={inputdata.MIDBilldesk}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="MKEY Billdesk"
                              type="text"
                              name="MKEYBilldesk"
                              value={inputdata.MKEYBilldesk}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <label className="form-label">Settled Currency</label>
                            <select
                              className="form-select"
                              name="SettledCurrency"
                              onChange={handleChangeInput}
                              value={inputdata.SettledCurrency}
                            >
                              <option>Plese Select</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="USDT">USDT</option>
                              <option value="BTC">BTC</option>
                              <option value="ETH">ETH</option>
                            </select>
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Merchant Code"
                              type="text"
                              name="IsPayMerchantCode"
                              value={inputdata.IsPayMerchantCode}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Encryption Key"
                              type="text"
                              name="IsPayEncryptionKey"
                              value={inputdata.IsPayEncryptionKey}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Secure Secret"
                              type="text"
                              name="IsPaySecureSecret"
                              value={inputdata.IsPaySecureSecret}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Access Code"
                              type="text"
                              name="IsPayAccessCode"
                              value={inputdata.IsPayAccessCode}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Mcc Code"
                              type="text"
                              name="IsPayMccCode"
                              value={inputdata.IsPayMccCode}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="IsPay Terminal ID"
                              type="text"
                              name="IsPayTerminalID"
                              value={inputdata.IsPayTerminalID}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Cashfree Mid"
                              type="text"
                              name="CashfreeMid"
                              value={inputdata.CashfreeMid}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Cashfree Secret key"
                              type="text"
                              name="CashfreeSecretkey"
                              value={inputdata.CashfreeSecretkey}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputField
                              title="Merchant URL"
                              type="text"
                              name="MerchantURL"
                              value={inputdata.MerchantURL}
                              onChange={handleChangeInput}
                            />
                          </div>
                        </>
                        
                        <div>
                            <button className="btn btn" style={{background: "#456b7b", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} onClick={() => updateData()}>Update</button>
                        </div>
                        {dataUpdated && (
                          <p style={{ color: "red", textAlign: "center" }}>{merchantUpdated}</p>
                        )}
                      </div>
                    </div>
                </div>
              </DialogContent>
          </Dialog>
      </div>
    </>
  );
};

const DialogOpenModelView = ({ authRead, ID }) => {
  
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("admin");
  const [wallet, setWallet] = useState("");
  const [country, setCountry] = useState([]);
  const [data, setData] = useState([]);
  const [sandboxWallet, setSandboxWallet] = useState("");
  const [bankName, setBankName] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentModeMessage, setPaymentModeMessage] = useState("");
  const [addBankMessage, setAddBankMessage] = useState("");
  const [dataUpdated, setDataUpdated] = useState(false);
  const [bankTitles, setBankTitles] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
    fetchData(ID);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [check, setCheck] = useState({
    Card: "",
    NetBanking: "",
    UPI: "",
    Wallet: "",
    QRCode: "",
    Payout: "",
    MidData: "",
  });

  const [inputdata, setInputdata] = useState({
    ChargeBackChargesDown: "",
    ChargeBackChargesUp: "",
    RefundChargesINR: "",
    RollingReversemonth: "",
    RollingReverseCharges: "",
    PayoutCashCharges: "",
    PayoutCryptoCharges: "",
    Country1: "",
    PayinCharges1: "",
    PayoutCharges1: "",
    GSTCharges1: "",
    AddBankAndWallet: "",

    // After Set A defaul 🤓🤓🤓
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
    Businessname: "",
    Businesslocation: "",
    Jobtitle: "",
    Website: "",
    AnnualProcessingVolume: "",
    AverageTransactionAmount: "",
    Chargebackpercentage: "",
    Currenciesrequired: "",
    MID: "",
    MKEY: "",
    MIDBilldesk: "",
    MKEYBilldesk: "",
    SettledCurrency: "",
    IsPayMerchantCode: "",
    IsPayEncryptionKey: "",
    IsPaySecureSecret: "",
    IsPayAccessCode: "",
    IsPayMccCode: "",
    IsPayTerminalID: "",
    CashfreeMid: "",
    CashfreeSecretkey: "",
    MerchantURL: "",
  });

  // Fetch Data Starts
  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", ID);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/readOneMerchantAdmin`,
        formData,
        config
      );
      setCountry(result.data.country);
      setBankName(result.data.bankName);
      setBankTitles(result.data.bankTitles)
      setCheck({
        Card: result.data.data.allow_card_payment,
        NetBanking: result.data.data.allow_netbanking_payment,
        UPI: result.data.data.allow_upi_payment,
        Wallet: result.data.data.allow_wallet_payment,
        QRCode: result.data.data.allow_qr_payment,
        Payout: result.data.data.allow_payout,
        MidData: result.data.data.allow_webpayment,
      });

      setInputdata({
        ChargeBackChargesDown: result.data.data.chargebk_down,
        ChargeBackChargesUp: result.data.data.chargebk_up,
        RefundChargesINR: result.data.data.refund,
        RollingReversemonth: result.data.data.rolling_reverse_months,
        RollingReverseCharges: result.data.data.rolling_reverse,
        PayoutCashCharges: result.data.data.payout_imps,
        PayoutCryptoCharges: result.data.data.payout_rtgs,
        Country1: "",
        PayinCharges1: "",
        PayoutCharges1: "",
        GSTCharges1: "",
        AddBankAndWallet: "",

        // After Set a value 🤓🤓🤓
        Firstname: result.data.data.fname,
        Lastname: result.data.data.lname,
        Email: result.data.data.email,
        Mobileno: result.data.data.mobile_no,
        Businessname: result.data.data.bname,
        Businesslocation: result.data.data.blocation,
        Jobtitle: result.data.data.job_title,
        Website: result.data.data.website,
        AnnualProcessingVolume: result.data.data.apv,
        AverageTransactionAmount: result.data.data.ata,
        Chargebackpercentage: result.data.data.charge_back_per,
        Currenciesrequired: result.data.data.currencies_req,
        MID: result.data.data.mid,
        MKEY: result.data.data.mkey,
        MIDBilldesk: result.data.data.mid2,
        MKEYBilldesk: result.data.data.mkey2,
        SettledCurrency: result.data.data.settle_currency,
        IsPayMerchantCode: result.data.data.mid3,
        IsPayEncryptionKey: result.data.data.mkey3,
        IsPaySecureSecret: result.data.data.secure_secret,
        IsPayAccessCode: result.data.data.access_code,
        IsPayMccCode: result.data.data.mcc_code,
        IsPayTerminalID: result.data.data.terminal_id,
        CashfreeMid: result.data.data.cashfree_mid,
        CashfreeSecretkey: result.data.data.cashfree_scerity_key,
        MerchantURL: result.data.data.merchant_url,
        Bankid: result.data.data.bankid
      });
      setData(result.data.data);
      setSandboxWallet(result.data.data.sandboxwallet)
      setWallet(result.data.data.wallet)

    } catch (error) {
      console.log(error);
    }
  };
  const commaSeparatedTitles = bankTitles.join(', ');
  // Fetch Data Ends

  // Update Payment Modes Starts
  const setPaymentMethod = async () => {
    try {
      const data = {
        id: ID,
        value: check,
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/setPaymentMethod`,
        data,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setPaymentModeMessage("Payment Mode Updated");
        setTimeout(() => {
          setDataUpdated(false);
          setPaymentModeMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Update payment Modes Ends

  const checkHandleChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  // Add Banks
  const addBanks = async () => {
    try {
      const data = {
        id: ID,
        selectedOption
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/addBanks`,
        data,
        config
      );
      if (result) {
        fetchData()
        setDataUpdated(true);
        setAddBankMessage("Bank Added");
        setTimeout(() => {
          setDataUpdated(false);
          setAddBankMessage("");
        }, 5000);
      }
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
          {authRead ? (
            <button
              className="btn btn-primary mt-3 btn-sm"
              style={{width: "70px"}}
              onClick={handleClickOpen}
            >
              View
            </button>
          ) : null}
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
                      background: '#ff6600',
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
                  View Merchant Details 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <div className="row justify-content-around">
                        {/* Wallet Update */}
                        <div className="row mb-3">
                          <div className="col-6">
                              <Heading heading= {`Wallet: ${data.wallet ? data.wallet : 0}`} />
                          </div>
                          <div className="col-6">
                            <Heading heading= {`Sandbox Wallet: ${data.sandboxwallet ? data.sandboxwallet : 0}`} />
                          </div>
                        </div>
                        <hr />

                        {/* Check Box Starts */}
                        <HeadingTable heading="Merchant Payment Modes" />
                        <div className="row">
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Card}
                              onChange={checkHandleChange}
                              name="Card"
                              label="Card Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.NetBanking}
                              onChange={checkHandleChange}
                              name="NetBanking"
                              label="NetBanking Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.UPI}
                              onChange={checkHandleChange}
                              name="UPI"
                              label="UPI Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Wallet}
                              onChange={checkHandleChange}
                              name="Wallet"
                              label="Wallet Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.QRCode}
                              onChange={checkHandleChange}
                              name="QRCode"
                              label="QR Code Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.Payout}
                              onChange={checkHandleChange}
                              name="Payout"
                              label="Payout Payment"
                            />
                          </div>
                          <div className="col-3 my-2">
                            <CheckBox
                              check={check.MidData}
                              onChange={checkHandleChange}
                              name="MidData"
                              label="Data to MID"
                            />
                          </div>
                          <div className="col-3 mt-4">
                            <button
                              className="btn btn"
                              style={{width: "50%"}}
                              onClick={() => setPaymentMethod()}
                            >
                              Set Payments
                            </button>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{paymentModeMessage}</p>
                          )}
                        </div>
                        <hr />
                        {/* Check Box Ends */}

                        <HeadingTable heading="Merchant Charges According To Currencies" />
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <th colSpan="2">
                                <table className="table table-bordered my-4" width="100%">
                                    <tbody>
                                    <tr>
                                        <th className="merchantTh"></th>
                                        <th colSpan="6" className="merchantTh">Payin Charges in %</th>
                                        <th className="merchantTh">Payout Charges in %</th>
                                        <th className="merchantTh">GST Charges in %</th>
                                    </tr>
                                    <tr>
                                      <th className="merchantTh">Country</th>
                                      <th className="merchantTh">NetBanking</th>
                                      <th className="merchantTh">E-Wallet</th>
                                      <th className="merchantTh">QR-Code</th>
                                      <th className="merchantTh">UPI</th>
                                      <th className="merchantTh">Card</th>
                                      <th className="merchantTh">VA Offline</th>
                                      <th className="merchantTh">Payout</th>
                                      <th className="merchantTh">GST</th>
                                    </tr>
                                    {Object.keys(country).length > 0 ? (
                                      country.map((item, i) => {
                                      return (
                                        <tr key={i}>
                                          <td style={{fontWeight: "900", verticalAlign: "middle"}}>{item.name}<br />&#40;{item.sortname}&#41;</td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.PayinNetbanking}
                                            value={item.PayinNetbanking}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.PayinWallet}
                                            value={item.PayinWallet}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.PayinQR}
                                            value={item.PayinQR}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.payinUPI}
                                            value={item.payinUPI}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.PayinCard}
                                            value={item.PayinCard}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.vaoffline}
                                            value={item.vaoffline}
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.PayoutAmount}
                                            value={item.PayoutAmount}
                                            className="mt-3"
                                          />
                                          </td>
                                          <td>
                                          <InputFieldView
                                            type="text"
                                            name={item.GstAmount}
                                            value={item.GstAmount}
                                          />
                                          </td>
                                        </tr>
                                        
                                      )})
                                    ) : (
                                        <tr key="no-currency">
                                          <td colSpan="10" style={{textAlign: "center", color: "red", fontSize: "15px", padding: "10px"}}>You have not selected any currency..</td>
                                        </tr>
                                    )}                    
                                  </tbody>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>

                        <div className="row d-flex justify-content-center align-items-center mb-3">
                          {/* <HeadingTable heading={`Previous Choosed Bank: ${commaSeparatedTitles ? commaSeparatedTitles : "No Bank Choosed"}`} /> */}
                          <span style={{textAlign: "center", fontWeight: "600", color: "#456b7b"}}>
                            Previous Choosed banks: <br/> {commaSeparatedTitles ? commaSeparatedTitles : "No Bank Choosed"}
                          </span>
                          <div className="col-10">
                            <label className="form-label">Add Bank And Wallet</label>
                            <Select
                              closeMenuOnSelect={false}
                              options={bankName}
                              isMulti
                              // value={bankName.filter(option => inputdata.Bankid.includes(option.value))}
                              onChange={setSelectedOption}
                            />
                          </div>
                          <div className="col-2">
                            <div>
                              <button className="btn btn" style={{marginTop: "35px"}} onClick={() => addBanks()}>Add Bank</button>
                            </div>
                          </div>
                          {dataUpdated && (
                            <p style={{ color: "red", textAlign: "center" }}>{addBankMessage}</p>
                          )}
                        </div>
                        
                        <HeadingTable heading="Charges Details" />
                        <div className="col-3 my-2">
                          <InputFieldView
                            title="ChargeBack Charges in INR Down"
                            type="text"
                            name="ChargeBackChargesDown"
                            value={inputdata.ChargeBackChargesDown}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputFieldView
                            title="ChargeBack Charges in INR UP"
                            type="text"
                            name="ChargeBackChargesUp"
                            value={inputdata.ChargeBackChargesUp}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputFieldView
                            title="Refund Charges in INR"
                            type="text"
                            name="RefundChargesINR"
                            value={inputdata.RefundChargesINR}
                          />
                        </div>
                        <div className="col-3 my-2">
                          <InputFieldView
                            title="Rolling Reverse month"
                            type="text"
                            name="RollingReversemonth"
                            value={inputdata.RollingReversemonth}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputFieldView
                            title="Rolling Reverse Charges in %"
                            type="text"
                            name="RollingReverseCharges"
                            value={inputdata.RollingReverseCharges}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputFieldView
                            title="Payout Cash Charges in %*"
                            type="text"
                            name="PayoutCashCharges"
                            value={inputdata.PayoutCashCharges}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputFieldView
                            title="Payout Crypto Charges in %*"
                            type="text"
                            name="PayoutCryptoCharges"
                            value={inputdata.PayoutCryptoCharges}
                          />
                        </div>
                        <hr />

                        <HeadingTable heading="Merchant Details" />
                        <>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="First name"
                              type="text"
                              name="Firstname"
                              value={inputdata.Firstname}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Last name"
                              type="text"
                              name="Lastname"
                              value={inputdata.Lastname}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Email"
                              type="text"
                              name="Email"
                              value={inputdata.Email}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Mobile no"
                              type="text"
                              name="Mobileno"
                              value={inputdata.Mobileno}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Business name"
                              type="text"
                              name="Businessname"
                              value={inputdata.Businessname}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Business location"
                              type="text"
                              name="Businesslocation"
                              value={inputdata.Businesslocation}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Job title"
                              type="text"
                              name="Jobtitle"
                              value={inputdata.Jobtitle}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Website"
                              type="text"
                              name="Website"
                              value={inputdata.Website}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Annual Processing Volume"
                              type="text"
                              name="AnnualProcessingVolume"
                              value={inputdata.AnnualProcessingVolume}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Average Transaction Amount"
                              type="text"
                              name="AverageTransactionAmount"
                              value={inputdata.AverageTransactionAmount}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Charge back percentage"
                              type="text"
                              name="Chargebackpercentage"
                              value={inputdata.Chargebackpercentage}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Currencies required"
                              type="text"
                              name="Currenciesrequired"
                              value={inputdata.Currenciesrequired}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="MID"
                              type="text"
                              name="MID"
                              value={inputdata.MID}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="MKEY"
                              type="text"
                              name="MKEY"
                              value={inputdata.MKEY}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="MID Billdesk"
                              type="text"
                              name="MIDBilldesk"
                              value={inputdata.MIDBilldesk}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="MKEY Billdesk"
                              type="text"
                              name="MKEYBilldesk"
                              value={inputdata.MKEYBilldesk}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <label className="form-label">Settled Currency</label>
                            <select
                              className="form-select"
                              name="SettledCurrency"
                              disabled
                              value={inputdata.SettledCurrency}
                            >
                              <option>Plese Select</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="USDT">USDT</option>
                              <option value="BTC">BTC</option>
                              <option value="ETH">ETH</option>
                            </select>
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Merchant Code"
                              type="text"
                              name="IsPayMerchantCode"
                              value={inputdata.IsPayMerchantCode}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Encryption Key"
                              type="text"
                              name="IsPayEncryptionKey"
                              value={inputdata.IsPayEncryptionKey}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Secure Secret"
                              type="text"
                              name="IsPaySecureSecret"
                              value={inputdata.IsPaySecureSecret}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Access Code"
                              type="text"
                              name="IsPayAccessCode"
                              value={inputdata.IsPayAccessCode}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Mcc Code"
                              type="text"
                              name="IsPayMccCode"
                              value={inputdata.IsPayMccCode}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="IsPay Terminal ID"
                              type="text"
                              name="IsPayTerminalID"
                              value={inputdata.IsPayTerminalID}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Cashfree Mid"
                              type="text"
                              name="CashfreeMid"
                              value={inputdata.CashfreeMid}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Cashfree Secret key"
                              type="text"
                              name="CashfreeSecretkey"
                              value={inputdata.CashfreeSecretkey}
                            />
                          </div>
                          <div className="col-3 my-2">
                            <InputFieldView
                              title="Merchant URL"
                              type="text"
                              name="MerchantURL"
                              value={inputdata.MerchantURL}
                            />
                          </div>
                        </>
                      </div>
                    </div>
                </div>
              </DialogContent>
          </Dialog>
      </div>
    </>
  );
};

const CheckBox = ({ check, onChange, name, label }) => {
  return (
    <>
      <div className="my-2">{label}</div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value={check}
          checked={check ? true : false}
          onChange={onChange}
          name={name}
        />
        <label className="form-check-label">{check ? "Yes" : "No"}</label>
      </div>
    </>
  );
};

const InputField = ({ title, type, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label" style={{whiteSpace: "nowrap"}}>{title}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={name}
      />
    </div>
  );
};

const InputFieldView = ({ title, type, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label" style={{whiteSpace: "nowrap"}}>{title}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        placeholder={name}
        disabled
      />
    </div>
  );
};

const HeadingTable = ({ heading }) => {
  return (
    <>
      <div className="bg-primary headingTable" style={{height: "40px"}}>
        <h6 className="text-white" style={{lineHeight: "36px", textAlign: "center", fontWeight: "700"}}>
          {heading}
        </h6>
      </div>
    </>
  );
};

const Heading = ({ heading }) => {
  return (
    <>
      <div className="bg-primary headingTable" style={{height: "40px"}}>
        <h6 className="text-white" style={{lineHeight: "36px", fontWeight: "700", paddingLeft: "10px"}}>
          {heading}
        </h6>
      </div>
    </>
  );
};

export default MerchantAdmin;