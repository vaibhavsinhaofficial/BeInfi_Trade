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
import FilterDateMax from "../../../commonAdminComp/filterDateMax/FilterDateMax";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function IPWhitelist(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Merchant",
    "WhiteList IP",
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
  const auth = localStorage.getItem("admin");

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");

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
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultIPWhitelist`,
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
  }, [to, from, date, page,limitVal]);

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
            `${baseUrl}/toggleIP`,
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
                    <TableCell>&#40;{item.user_id}&#41; {item.name}</TableCell>
                    <TableCell align="center">{item.ip}</TableCell>
                    <TableCell align="center">
                        {item.status === 1 ? (
                        <button className="btn btn-success" onClick={() => toggleStatus(item.id, item.status)}>Enable</button>
                        ) : (
                        <button className="btn btn-danger" onClick={() => toggleStatus(item.id, item.status)}>Disable</button>
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
              <h4 className="headingAll">Manage Whitelist IP</h4>
            </div>
            <div className="col-4">
                <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom} />
            </div>
            <div className="col-4">
              <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData} />
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
  const [merchant, setMerchant] = useState(''); 
  const [ip, setIp] = useState("")
  const auth = localStorage.getItem("admin");
  const [merchantName, setMerchantName] = useState([])
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    fetchData()
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
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
      console.log(result);
      setMerchantName(result.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!merchantName || !ip) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
        user_id: merchant,
        ip: ip,
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createIPWhitelist`, values, config);
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
                Add New IP
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
                          onChange={(e) => setMerchant(e.target.value)}
                          style={{height: "45px"}}
                        >
                          <option value={-1}>Select</option>
                          {
                            merchantName.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>
                                  &#40;{item.id}&#41; {item.name}
                                </option>
                              );
                            }
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                          <label>IP</label>
                      </div>
                      <div className="col-8">
                        <input type="text" placeholder="IP" className="form-control mb-3" onChange={(e) => setIp(e.target.value)} />
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

const DialogOpenModelEdit = ({ ID, ReadData }) => {
  const [open, setOpen] = useState(false);
  const [merchant, setMerchant] = useState([]); 
  const [ip, setIp] = useState("")
  const [merchantName, setMerchantName] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
    details(ID);
    fetchData()
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");

  const fetchData = async () => {
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
      console.log(result);
      setMerchantName(result.data.Data);
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
        ${baseUrl}/readOneIP`,
        {
          id: ID
        },
        config
      );
      setMerchant(result.data.gateway);
      setIp(result.data.ip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
        id: ID,
        user_id: merchant,
        ip: ip
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/editIP`, values, config);
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
          Edit IP Whitelist 
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
                      value={merchant}
                      onChange={(e) => setMerchant(e.target.value)}
                      style={{height: "45px"}}
                    >
                      <option value={-1}>Select</option>
                      {
                        merchantName.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              &#40;{item.id}&#41; {item.name}
                            </option>
                          );
                        }
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                      <label>IP</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="IP" className="form-control mb-3" value={ip} onChange={(e) => setIp(e.target.value)} />
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

export default IPWhitelist;
