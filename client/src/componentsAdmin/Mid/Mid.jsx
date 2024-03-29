import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { Popover, Dialog, DialogContent, DialogTitle } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


function Mid({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Title",
    "MId",
    "Key",
    "IV",
    "Merchant URL",
    "Merchant Other URL",
    "Action",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading]= useState(true)
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/readMid`, formData, config);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal]);

  

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
                    <div className="mName">
                      {item.title}
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.mid}</TableCell>
                  <TableCell align="center">{item.sec_key}</TableCell>
                  <TableCell align="center">{item.iv}</TableCell>
                  <TableCell align="center">
                    <div className="mName">
                      {item.merchant_url}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="mName">
                      {item.merchant_otherurl}
                    </div>
                  </TableCell>
                  <TableCell>
                    <PopUp item={item} authUpdate={authUpdate} authDelete={authDelete} authRead={authRead} ReadData={ReadData}/>
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
          <h4 className="mb-3 headingAll">Manage Mid List</h4>
          <div className="col-9 mb-3">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
            <div className="newSearch" style={{width: "30%"}}>
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-3 mb-3 text-end">
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

const PopUp = ({item, authUpdate, authDelete, authRead, ReadData }) => {
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

        let result = await axios.post(`${baseUrl}/deleteMid`, formData, config);
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
            <DialogOpenModelEdit authUpdate={authUpdate} ReadData={ReadData} ID={item.id}/>
          ) : null}

          {authRead ? (
            <DialogOpenModelView authRead={authRead} ID={item.id} />
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
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("")
  const [sec_key, setSec_key] = useState("")
  const [iv, setIv] = useState("")
  const [merchant_url, setMerchant_url] = useState("")
  const [merchant_otherurl, setMerchant_otherurl] = useState("")

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
      if (!title || !mid || !sec_key || !iv || !merchant_url || !merchant_otherurl) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
          title: title,
          mid: mid,
          sec_key: sec_key,
          iv: iv,
          merchant_url: merchant_url,
          merchant_otherurl: merchant_otherurl
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createMid`, values, config);
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
                  New MID
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Title</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Title" className="form-control mb-3" onChange={(e) => setTitle(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Mer. No</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Mer. No" className="form-control mb-3" onChange={(e) => setMid(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Key</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Key" className="form-control mb-3" onChange={(e) => setSec_key(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>IV</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="IV" className="form-control mb-3" onChange={(e) => setIv(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Merchant First URl</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="First URL" className="form-control mb-3" onChange={(e) => setMerchant_url(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Merchant Second URl</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Second URL" className="form-control mb-3" onChange={(e) => setMerchant_otherurl(e.target.value)} />
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
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("")
  const [sec_key, setSec_key] = useState("")
  const [iv, setIv] = useState("")
  const [merchant_url, setMerchant_url] = useState("")
  const [merchant_otherurl, setMerchant_otherurl] = useState("")
  

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
        ${baseUrl}/readUpdateMid`,
        {
          id: ID
        },
        config
      );
      setTitle(result.data.title)
      setMid(result.data.mid)
      setSec_key(result.data.sec_key)
      setIv(result.data.iv)
      setMerchant_url(result.data.merchant_url)
      setMerchant_otherurl(result.data.merchant_otherurl)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
          id: ID,
          title: title,
          mid: mid,
          sec_key: sec_key,
          iv: iv,
          merchant_url: merchant_url,
          merchant_otherurl: merchant_otherurl
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/updateMid`, values, config);
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
                  MID 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                  <div className="col-12 swapBox">
                    <form className="row justify-content-around"  onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-4">
                            <label>Title</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Title" className="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Mer. No</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Mer. No" className="form-control mb-3" value={mid} onChange={(e) => setMid(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Key</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Key" className="form-control mb-3" value={sec_key} onChange={(e) => setSec_key(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>IV</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="IV" className="form-control mb-3" value={iv} onChange={(e) => setIv(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Merchant First URl</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="First URL" className="form-control mb-3" value={merchant_url} onChange={(e) => setMerchant_url(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Merchant Second URl</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Second URL" className="form-control mb-3" value={merchant_otherurl} onChange={(e) => setMerchant_otherurl(e.target.value)} />
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

const DialogOpenModelView = ({ authRead, ID }) => {
  
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("")
  const [sec_key, setSec_key] = useState("")
  const [iv, setIv] = useState("")
  const [merchant_url, setMerchant_url] = useState("")
  const [merchant_otherurl, setMerchant_otherurl] = useState("")
  

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
        ${baseUrl}/readUpdateMid`,
        {
          id: ID
        },
        config
      );
      setTitle(result.data.title)
      setMid(result.data.mid)
      setSec_key(result.data.sec_key)
      setIv(result.data.iv)
      setMerchant_url(result.data.merchant_url)
      setMerchant_otherurl(result.data.merchant_otherurl)
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
          {authRead ? (
            <button
              className="btn btn-secondary mt-3"
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
                  View MID 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                  <div className="col-12 swapBox">
                    <form className="row justify-content-around">
                      <div className="row">
                        <div className="col-4">
                            <label>Title</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Title" className="form-control mb-3" value={title} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Mer. No</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Mer. No" className="form-control mb-3" value={mid} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Key</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Key" className="form-control mb-3" value={sec_key} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>IV</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="IV" className="form-control mb-3" value={iv} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Merchant First URl</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="First URL" className="form-control mb-3" value={merchant_url} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Merchant Second URl</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Second URL" className="form-control mb-3" value={merchant_otherurl} disabled />
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

export default Mid;
