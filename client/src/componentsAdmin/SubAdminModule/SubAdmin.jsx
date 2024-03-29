import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";
import Loader from "../Loader/Loader";
import FilterDateMax from '../../commonAdminComp/filterDateMax/FilterDateMax';
import Popover from "@mui/material/Popover";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SubAdmin({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Sub Admin",
    "Email",
    "Role",
    "Last Login",
    "Status",
    "Created On",
    "Action",
  ];
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(true)
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [showOptions, setShowOptions] = useState(false);

  const ReadData = async () => {
    try {
      const values = {pageNumber:page,date,to,from,searchVal}

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/subAdmin`, values, config);

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
      formData.append("status", status);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleSubAdmin`,
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
    return <Loader/>
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
                    {item.firstname}&nbsp;{item.lastname}
                  </TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {item.role === 1 ? "admin" : item.role === 2 ? "settlement" : item.role === 3 ? "payout" : item.role === 4 ? "commission" : ""}
                  </TableCell>
                  <TableCell align="center">{item.last_login_date}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleStatus(item.user_id, 0)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => toggleStatus(item.user_id, 1)}
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>

                  <TableCell align="center">{item.updated_on}</TableCell>

                  <TableCell align="center">
                    <PopUp item={item} authRead={authRead} authUpdate={authUpdate} authDelete={authDelete} ReadData={ReadData}/>
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
          <h4 className="mb-3 headingAll">Manage Sub Admin  List</h4>
          <div className="col-4 mb-3">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Name, Email"
              />
            </div>
          </div>
          <div className="col-5 mb-3">
            <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/>
          </div>
          <div className="col-3 mb-3 text-end">
            {authCreate ? (
              <DialogOpenModelAdd authCreate={authCreate} />
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

        let result = await axios.post(
          `${baseUrl}/deleteSubAdmin`,
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
            style: { width: "150px" },
          }}
        >

        <div className="d-flex  align-items-center justify-content-around flex-column">

          {authUpdate ? (
            <DialogOpenModel ID={item.user_id} authUpdate={authUpdate} />  
          ) : null}

          <Link to={`/bankconnect/subAdminPermission/${item.user_id}`}>
            <button className="btn btn-primary mt-3" style={{width: "120px"}}>
              Permissions
            </button>
          </Link>

          {authDelete ? (
            <button
              className="btn btn-danger mt-3 mb-3" style={{width: "120px"}}
              onClick={() => deleteRow(item.user_id)}
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

const DialogOpenModelAdd = ({ authCreate }) => {
  
  const [open, setOpen] = React.useState(false);
  const [role_type, setRole_type] = useState([])
  const [role, setRole] = useState("");
  const [fname, setFname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/getRole`,
        {},
        config
      );
      setRole_type(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!fname || !lastName || !email || !password || !role) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000);
        return;
      }
      let values = {
          fname: fname,
          lname: lastName,
          email: email,
          password: password,
          role: role
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createSubAdmin`, values, config);
      toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
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
                  New SubAdmin
              </DialogTitle>
              <DialogContent>
              <div className="row">
                  <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>First Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="First Name" className="form-control mb-3" onChange={(e) => setFname(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Last Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Last Name" className="form-control mb-3" onChange={(e) => setLastName(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Email</label>
                          </div>
                          <div className="col-8">
                            <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Password</label>
                          </div>
                          <div className="col-8">
                            <input type="password" placeholder="Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Role</label>
                          </div>
                          <div className="col-8">
                              <select className="form-select mb-3" onChange={(e)=>setRole(e.target.value)}>
                                  <option>Select Role</option>
                                  {
                                    role_type?.map((item,index)=>{
                                      return(
                                          <option key={index} value={item.id}>
                                              {item.role_name}
                                          </option>
                                          );
                                      })
                                  }
                              </select>
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

const DialogOpenModel = ({ ID, authUpdate }) => {
  
  const [open, setOpen] = React.useState(false);
  const [role_type, setRole_type] = useState([])
  const [role, setRole] = useState("");
  const [fname, setFname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const handleClickOpen = () => {
    setOpen(true);
    subadminDetails(ID);
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
        ${baseUrl}/getRole`,
        {},
        config
      );
      setRole_type(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const subadminDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/getViewSubAdmin`,
        {
          id: ID
        },
        config
      );
      setFname(result.data.data[0].firstname)
      setLastName(result.data.data[0].lastname)
      setEmail(result.data.data[0].email)
      setRole(result.data.data[0].role)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
          id: ID,
          fname: fname,
          lname: lastName,
          email: email,
          password: password,
          role: role
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/updateSubAdmin`, values, config);
      toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
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
          {authUpdate ? (
            <button
              className="btn btn-success mt-3"
              onClick={handleClickOpen}
              style={{width: "120px"}}
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
                New SubAdmin
            </DialogTitle>
            <DialogContent>
              <div className="row">
                  <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>First Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="First Name" className="form-control mb-3" value={fname} onChange={(e) => setFname(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Last Name</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Last Name" className="form-control mb-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Email</label>
                          </div>
                          <div className="col-8">
                            <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Password</label>
                          </div>
                          <div className="col-8">
                            <input type="password" placeholder="New Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Role</label>
                          </div>
                          <div className="col-8">
                              <select className="form-select mb-3" value={role} onChange={(e)=>setRole(e.target.value)}>
                                  <option>Select Role</option>
                                  {
                                    role_type?.map((item,index)=>{
                                      return(
                                          <option key={index} value={item.id}>
                                              {item.role_name}
                                          </option>
                                          );
                                      })
                                  }
                              </select>
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

export default SubAdmin;
