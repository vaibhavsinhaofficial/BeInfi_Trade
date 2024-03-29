import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FilterDateMax from "../../../commonAdminComp/filterDateMax/FilterDateMax";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


function Limit(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Merchant",
    "Gateway",
    "Currency",
    "Min",
    "Max",
    "Status",
    "Created On",
    "Updated On",
    "Action"
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let values = {
        to: to,
        from: from,
        date: date,
        page: page,
        limit: limitVal
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSetLimitmodule`,
        values,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [page, limitVal, to, from, date]);

  const toggleStatus = async (id, status) => {
      try {
          let formData = new FormData();
          formData.append("id", id);
          if (status === 0) {
              formData.append("status", 1);
          } else {
              formData.append("status", 0);
          }

          const config = {
              headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
              },
          };

          let result = await axios.post(
              `${baseUrl}/toggleLimit`,
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
                  <TableCell align="center">&#40;{item.user_id}&#41; {item.name}</TableCell>
                  <TableCell align="center">{item.gateway_name}</TableCell>
                  <TableCell align="center">{item.currency}</TableCell>
                  <TableCell align="center">{item.min}</TableCell>
                  <TableCell align="center">{item.max}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                    <button className="btn btn-success" onClick={() => toggleStatus(item.id, item.status)}>Enable</button>
                    ) : (
                    <button className="btn btn-secondary" onClick={() => toggleStatus(item.id, item.status)}>Disable</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell align="center">
                    <DialogOpenModelEdit ID={item.id} ReadData={ReadData} />
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
          <div className="row justify-content-between align-items-center mb-5">
            <div className="col-4">
              <h4 className="headingAll">Manage Amount Limit</h4>
            </div>
            <div className="col-4">
              <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom} />
            </div>
            <div className="col-4">
              <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData} />
              {/* <Link to={"/AddLimit"}>
                <button className="btn btn-success" style={{marginLeft: "auto", display: "block"}}>Set Limt</button>
              </Link> */}
            </div>
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

const DialogOpenModelAdd = ({ authCreate, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [merchantName, setMerchantName] = useState([])
  const [gatewayName, setGatewayName] = useState([])
  const [currencyName, setCurrencyName] = useState([])
  const [merchants, setMerchants] = useState("");
  const [gateway, setGateway] = useState("");
  const [currency, setCurrency] = useState("");
  const [min_amount, setMin_amount] = useState("");
  const [max_amount, setMax_amount] = useState("");
  const auth = localStorage.getItem("admin");
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    typeDataFirst()
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        `${baseUrl}/allMerchant`,
        formData,
        config
      );
      let result1 = await axios.post(
        `${baseUrl}/allCurrency`,
        formData,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/allGateway`,
        formData,
        config
      );    
      setMerchantName(result.data.Data);
      setCurrencyName(result1.data.Data);
      setGatewayName(result2.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!merchants || !gateway || !currency || !min_amount || !max_amount) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
        user_id: merchants,
        gateway: gateway,
        currency: currency,
        max: max_amount,
        min: min_amount,
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createLimit`, values, config);
      ReadData()
      handleClose()
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {authCreate ? (
        <button
          style={{
            background: "#ff6600",
            borderRadius: "30px",
            color: "#fff",
            width: "100px",
            height: "36px",
            cursor: "pointer",
            marginLeft: "auto",
            display: "block"
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
        maxWidth={"md"}
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
          Set Merchant Limit
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12 swapBox">
              <form className="row justify-content-around"  onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                      <label>Merchant</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      onChange={(e) => setMerchants(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {merchantName.map((item,index)=>{
                        return(
                          <option value={item.id}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Gateway</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      onChange={(e) => setGateway(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {
                        gatewayName.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                            {item.gateway_name}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Currency</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {currencyName.map((item, index) => {
                        return (
                          <option key={index} value={item.sortname}>
                            {item.sortname}
                          </option>
                        )})
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Max Amount</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="Max. Amount" className="form-control mb-3" onChange={(e) => setMax_amount(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Min Amount</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="Min. Amount" className="form-control mb-3" onChange={(e) => setMin_amount(e.target.value)} />
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
    </>
  );
};

const DialogOpenModelEdit = ({ ID, ReadData }) => {
  const [open, setOpen] = useState(false);
  const [merchantName, setMerchantName] = useState([])
  const [gatewayName, setGatewayName] = useState([])
  const [currencyName, setCurrencyName] = useState([])
  const [merchants, setMerchants] = useState("");
  const [gateway, setGateway] = useState("");
  const [currency, setCurrency] = useState("");
  const [min_amount, setMin_amount] = useState("");
  const [max_amount, setMax_amount] = useState("");
  const auth = localStorage.getItem("admin");

  const handleClickOpen = () => {
    setOpen(true);
    details(ID);
    typeDataFirst()
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };


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
        `${baseUrl}/allMerchant`,
        formData,
        config
      );
      let result1 = await axios.post(
        `${baseUrl}/allCurrency`,
        formData,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/allGateway`,
        formData,
        config
      );    
      setMerchantName(result.data.Data);
      setCurrencyName(result1.data.Data);
      setGatewayName(result2.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const details = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/readOneLimit`,
        {
          id: ID
        },
        config
      );
      setMerchants(result.data.user_id);
      setGateway(result.data.gateway);
      setCurrency(result.data.currency);
      setMax_amount(result.data.max);
      setMin_amount(result.data.min);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
        id: ID,
        user_id: merchants,
        gateway: gateway,
        currency: currency,
        min: min_amount,
        max: max_amount,
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/editLimit`, values, config);
      ReadData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="btn-sm"
        onClick={handleClickOpen}
        style={{background: "transparent"}}
      > <img  src="./imges/edit.svg" alt="edit" style={{ width: "20px" }} />
      </button>
      <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
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
          Edit Merchant Set Limit
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12 swapBox">
            <form className="row justify-content-around"  onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                      <label>Merchant</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      value={merchants}
                      onChange={(e) => setMerchants(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {merchantName.map((item,index)=>{
                        return(
                          <option value={item.id}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Gateway</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      value={gateway}
                      onChange={(e) => setGateway(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {
                        gatewayName.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                            {item.gateway_name}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Currency</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm mb-3 merchantselect"
                      required
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={0}>Select</option>
                      {currencyName.map((item, index) => {
                        return (
                          <option key={index} value={item.sortname}>
                            {item.sortname}
                          </option>
                        )})
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Max Amount</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="Max. Amount" className="form-control mb-3" value={max_amount} onChange={(e) => setMax_amount(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>Min Amount</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="Min. Amount" className="form-control mb-3" value={min_amount} onChange={(e) => setMin_amount(e.target.value)} />
                  </div>
                </div>
                <div>
                    <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px"}} type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Limit;
