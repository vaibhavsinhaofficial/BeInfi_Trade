import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../../context/ContextProvider";
import { Dialog, DialogContent, DialogTitle, Popover } from "@mui/material";

function AllUpi({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Merchant Id",
    "Upi Id",
    "Reason for blocking",
    "Status",
    "Created Date",
    "Updated Date",
    "Action"
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
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
        `${baseUrl}/defaultAllUpi`,
        formData,
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
  }, [page, searchVal, limitVal]);

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
      `${baseUrl}/toggleUpi`,
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
                  <TableCell align="center">{item.merchant_id}</TableCell>
                  <TableCell align="center">{item.upi_id}</TableCell>
                  <TableCell align="center">{item.reason}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button className="btn btn-danger" style={{width: "100px"}} onClick={() => toggleStatus(item.id, item.status)}>Block</button>
                    ) : (
                      <button className="btn btn-primary" style={{width: "100px"}} onClick={() => toggleStatus(item.id, item.status)}>Unblock</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.create_on}</TableCell>
                  <TableCell align="center">{item.update_on}</TableCell>
                  <TableCell align="center">
                    <PopUp item={item} authUpdate={authUpdate} ReadData={ReadData} />
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
          <h4 className="mb-3 headingAll"> Upi List</h4>
          <div className="col-6 mb-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Upi Id"
              />
            </div>
          </div>
          <div className="col-3 mb-3">
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
          <div className="col-3 mb-3 text-end">
            <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData} />
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

        let result = await axios.post(`${baseUrl}/delete_upi`, formData, config);
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
            <DialogOpenModelEdit authUpdate={authUpdate} ID={item.id} ReadData={ReadData} />
            <button
              className="btn btn-primary mt-3 mb-3" style={{width: "70px"}}
              onClick={() => deleteRow(item.id)}
            >
              Delete
            </button>
        </div>
        </Popover>
      </div>
    </>
  );
};

const DialogOpenModelAdd = ({ authCreate, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [merchant, setMerchant] = useState([]); 
  const [user_id, setUser_id] = useState("");
  const [upi_id, setUpi_id] = useState("")
  const [reason, setReason] = useState("")

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const auth = localStorage.getItem("admin");

  const merchantData = async () => {
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
      setMerchant(result.data.Data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    merchantData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user_id || !upi_id || !reason) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
        id: user_id,
        upi_id: upi_id,
        reason: reason
      }
      const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createAllUpi`, values, config);
      ReadData()
      handleClose()
      window.location.reload();
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
                  New User Block
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
                            onChange={(e)=>setUser_id(e.target.value)}
                            style={{height: "45px"}}
                          >
                            <option className="" value={null}>
                            Select Merchant
                            </option>
                            {
                              merchant.length > 0 ? merchant.map((item,index)=>{
                                return(
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })
                              :"Wait A while" 
                            }
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>UPI ID</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="UPI ID" className="form-control mb-3" onChange={(e) => setUpi_id(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Reason for blocking</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Reason for blocking" className="form-control mb-3" onChange={(e) => setReason(e.target.value)} />
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
  
  const [open, setOpen] = useState(false);
  const [merchant, setMerchant] = useState([]); 
  const [user_id, setUser_id] = useState("");
  const [upi_id, setUpi_id] = useState("")
  const [reason, setReason] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
    details(ID);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");

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
        ${baseUrl}/readUpi`,
        {
          id: ID
        },
        config
      );
      setUser_id(result.data.data[0].merchant_id);
      setUpi_id(result.data.data[0].upi_id);
      setReason(result.data.data[0].reason);
    } catch (error) {
      console.log(error);
    }
  };

  const merchantData = async () => {
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
      setMerchant(result.data.Data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    merchantData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
          id: ID,
          merchant_id: user_id,
          upi_id: upi_id,
          reason: reason,
      }
      const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/update_upi`, values, config);
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
            > Edit
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
                  Edit UPI 
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
                              value={user_id}
                              onChange={(e)=>setUser_id(e.target.value)}
                              style={{height: "45px"}}
                            >
                              <option className="" value={null}>
                              Select Merchant
                              </option>
                              {
                                merchant.length > 0 ? merchant.map((item,index)=>{
                                  return(
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })
                                :"Wait A while" 
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>UPI ID</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="UPI ID" value={upi_id} className="form-control mb-3" onChange={(e) => setUpi_id(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Reason for blocking</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Reason for blocking" value={reason} className="form-control mb-3" onChange={(e) => setReason(e.target.value)} />
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

export default AllUpi;
