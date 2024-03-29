import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import FilterDateMax from '../../commonAdminComp/filterDateMax/FilterDateMax';
import { Popover } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function PGMod({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Type",
    "PG Name",
    "Mer. No",
    "Gate Number",
    "Key",
    "Status",
    "Created_on",
    "Updated_on",
    "Action",
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [loading,setLoading]=useState(true)
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')

  const ReadData = async () => {
    try {
      const values = {pageNumber:page,date,to,from,searchVal}

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/paymentGateway`,
        values,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.result);
      setTotalPage(Number(result.data.numOfPages));
      
        setLoading(false)
      
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, date, to, from]);

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
        `${baseUrl}/togglePayment`,
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
                  <TableCell align="center">{item.type === 0?"Payin":"Payout"}</TableCell>
                  <TableCell align="center">{item.gateway_name}</TableCell>
                  <TableCell align="center">{item.merNo}</TableCell>
                  <TableCell align="center">{item.gateway_number}</TableCell>
                  <TableCell align="center">{item.key}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleStatus(item.id, item.status)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => toggleStatus(item.id, item.status)}
                      >
                        {" "}
                        Disable
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.updated_on}</TableCell>

                  <TableCell align="center">
                    <PopUp item={item} authUpdate={authUpdate} authDelete={authDelete} ReadData={ReadData}/>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                {" "}
                <h4>No Data Found</h4>{" "}
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
          <h4 className="mb-3 headingAll"> Manage Our Gate List</h4>
          <div className="col-6">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Gateway Name"
              />
            </div>
          </div>
          <div className="col-3" style={{margin: 0}}>
            <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/>
          </div>
          <div className="col-3 text-end">
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
      <ToastContainer />
    </>
  );
}

const PopUp = ({item, authUpdate, authDelete, ReadData }) => {
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

        let result = await axios.post(`${baseUrl}/delete`, formData, config);
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
            {authUpdate ? (
              <DialogOpenModelEdit authUpdate={authUpdate} ID={item.id} ReadData={ReadData}/>
            ) : null}
            {authDelete ? (
              <button
                className="btn btn-danger mt-3 mb-3" style={{width: "70px"}}
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
  const [type, setType] = useState("");
  const [gateway_name, setGateway_name] = useState("")
  const [merNo, setMerNo] = useState("")
  const [gateway_number, setGateway_number] = useState("")
  const [key, setKey] = useState("")

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const auth = localStorage.getItem("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!type || !gateway_name || !merNo || !gateway_number || !key ) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
          type: type,
          gateway_name: gateway_name,
          merchantN: merNo,
          gatewayN: gateway_number,
          // gatewayN: 0,
          key: key
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/create`, values, config);
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
                  New Payment Gateway
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Select Type</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select mb-3" onChange={(e)=>setType(e.target.value)}>
                              <option>Select Gate</option>
                              <option value="0">Payin</option>
                              <option value="1">Payout</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Gateway Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Name" className="form-control mb-3" onChange={(e) => setGateway_name(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Mer. No</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Mer. No" className="form-control mb-3" onChange={(e) => setMerNo(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Gateway Number</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Number" className="form-control mb-3" onChange={(e) => setGateway_number(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Key</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Key" className="form-control mb-3" onChange={(e) => setKey(e.target.value)} />
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

const DialogOpenModelEdit = ({ authUpdate, ID, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("");
  const [gateway_name, setGateway_name] = useState("")
  const [merNo, setMerNo] = useState("")
  const [gateway_number, setGateway_number] = useState("")
  const [key, setKey] = useState("")
  

  const handleClickOpen = () => {
    setOpen(true);
    gatewayDetails(ID);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");

  const gatewayDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/getId`,
        {
          id: ID
        },
        config
      );
      setType(result.data.data.type)
      setGateway_name(result.data.data.gateway_name)
      setMerNo(result.data.data.merNo)
      setGateway_number(result.data.data.gateway_number)
      setKey(result.data.data.key)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
          id: ID,
          type: type,
          gateway_name: gateway_name,
          merchantN: merNo,
          gatewayN: gateway_number,
          // gatewayN: 0,
          key: key
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/edit`, values, config);
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
          {authUpdate ? (
            <button
              className="btn btn-success mt-3"
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
                  Payment Gateway
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Select Type</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select mb-3" value={type} onChange={(e)=>setType(e.target.value)}>
                              <option>Select Gate</option>
                              <option value="0">Payin</option>
                              <option value="1">Payout</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Gateway Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Name" className="form-control mb-3" value={gateway_name} onChange={(e) => setGateway_name(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Mer. No</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Mer. No" className="form-control mb-3" value={merNo} onChange={(e) => setMerNo(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Gateway Number</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Number" className="form-control mb-3" value={gateway_number} onChange={(e) => setGateway_number(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Key</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Gateway Key" className="form-control mb-3" value={key} onChange={(e) => setKey(e.target.value)} />
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
      </div>
    </>
  );
};

export default PGMod;
