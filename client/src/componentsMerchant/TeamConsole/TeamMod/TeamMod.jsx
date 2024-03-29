import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import baseUrl from "../../../componentsMerchant/config/baseUrl";
import axios from "axios";
import "./team.css";
import { useStateContext } from "../../../context/ContextProvider";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { Popover } from "@mui/material";
import popimg from "./imgs/more-v.svg";

function TeamMod() {
  const [page, setPage] = useState(1);
  const [tableBodyData, setTableBodyData] = useState([]);
  const [message, setMessage] = useState("");
  const { dropdownMerchant } = useStateContext();
  const [loading,setLoading] =useState(true)
  // const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    tabledatafetch();
  }, []);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("page", page);
      formData.append("id", dropdownMerchant)

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/teamDefault`, formData, config);
      setTableBodyData(result.data.data);
      setMessage(result.data.message);
      setLoading(false)
      // setTotalPage(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  if(loading){
    return <Loader />
  }
  return (
    <>
      <div className="row mb-3">
        <div className="col-8">
          <h4 className="heading">Employee</h4>
        </div>
        <div className="col-4 text-end">
          <TableDialog  tabledatafetch={tabledatafetch}/>
        </div>
      </div>
      <TeamTable tableBodyData={tableBodyData} message={message} />
    </>
  );
}

const TableDialog = ({tabledatafetch}) => {
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [usercode, setUsercode] = useState("1");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTeamApi = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("usercode", usercode);
      formData.append("email", email);
      formData.append("mobile_no", mobile_no);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/teamCreateEmployee`,
        formData,
        config
      );
      if(result.status === 200){
        handleClose();
        tabledatafetch();
        window.location.reload();
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <button className="buttonteam1" onClick={handleClickOpen}>
          <img
            src="https://www.bankconnect.online/assets/merchants/img/plus.svg"
            alt="Not Found"
            height="18px"
            className=" mx-2"
          />
          Create Team
        </button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>
            <h4 className="heading">Create Team</h4>
          </DialogTitle>
          <DialogContent className="dialog1">
            <DialogContentText id="alert-dialog-slide-description">
              <div className="row">
                <div className="col-12 dialogBlock1 mb-3 ">
                  <form action="" className="row">
                    <div className=" col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <div className=" col-md-4 d-flex flex-column text-center mb-3 justify-content-center align-items-center">
                      <label htmlFor="">Role</label>
                      <select className="merchantTeam" onChange={(e) => setUsercode(e.target.value)}>
                        <option value="1">Administrator</option>
                        <option value="2">Manager</option>
                        <option value="3">Cashier</option>
                        <option value="4">Reporter</option>
                      </select>
                    </div>

                    <hr />
                    <div className=" col-md-6 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Email Address</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={mobile_no}
                        onChange={(e) => setMobile_no(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-12 dialogBlock1">
                  <div className="mx-3">
                    <h5 style={{ fontSize: "24px", color: "#000" }}>
                      Description
                    </h5>
                    <div
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      {usercode === "1"
                        ? "Administrator"
                        : usercode === "2"
                        ? "Manager"
                        : usercode === "3"
                        ? "Cashier"
                        : "Reporter"}
                    </div>
                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      {usercode === "1"
                        ? "Full access to UBank Connect. This role allows the same permissions as the Owner, but does not allow access to Owner information. The Admin role should only be assigned to your most trusted and senior employees only."
                        : usercode === "2"
                        ? "Limited access to UBank Connect. As an Owner or Admin, you must grant the Manager role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements, Add Employees only."
                        : usercode === "3"
                        ? "Limited access to UBank Connect. As an Owner or Admin, you must grant the Cashier role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements only."
                        : "Limited access to UBank Connect. As an Owner or Admin, you must grant the Reporter role access to additional permissions, such as Reports, Statements only."}
                    </div>
                    <br />
                    <div style={{ fontWeight: "600", color: "black" }}>
                      Note
                    </div>

                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      Activating a New Employee Account <br /> New employees
                      will receive a link via email to activate their account.{" "}
                      <br /> Account: Active
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="buttonteam2"
              onClick={() => {
                createTeamApi();
              }}
            >
              Create
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const verifyTeam = async (id) => {
  try {
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    formData.append("id", id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    let result = await axios.post(
      `${baseUrl}/teamVerifyTeam`,
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

const TeamTable = ({ tableBodyData, message }) => {
  return (
    <>
      <TableContainer className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{whiteSpace: "nowrap"}}>
              <TableCell>Employee Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBodyData?.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div className="mName">
                      {item.fname}&nbsp;{item.lname}
                    </div>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile_no}</TableCell>
                  <TableCell style={{ fontWeight: "600" }}>
                    {item.usercode === "1"
                      ? "Administrator"
                      : item.usercode === "2"
                      ? "Manager"
                      : item.usercode === "3"
                      ? "Cashier"
                      : "Reporter"}
                  </TableCell>
                  <TableCell >{item.created_on}</TableCell>
                  <TableCell>
                    {item.status ? (
                      <button className="btn btn-secondary" disabled style={{color: "#fff", width: "100px"}}>Verified</button>
                    ) : (
                      <button className="btn btn-success" onClick={() => verifyTeam(item.id)} style={{color: "#fff", width: "100px"}}>Verify</button>
                    )}
                  </TableCell>
                  <TableCell>
                      {/* <EditDialog ID={item.id} tableBodyData={tableBodyData}/> */}
                      <PopUp ID={item.id}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="tableBottomMsg">{message}</p>
    </>
  );
};

const PopUp = ({ID}) => {
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
      const auth = localStorage.getItem("user");
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
          `${baseUrl}/teamDeleteTeam`,
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <img
          src={popimg}
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
          <EditDialog ID={ID} />
          <button
            className="btn btn-outline-danger mt-3 mb-3"
            onClick={() => deleteRow(ID)}
          >
            Delete
          </button>
        </div>
          
        </Popover>
      </div>
    </>
  );
};

const EditDialog = ({ID}) => {
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [usercode, setUsercode] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const auth = localStorage.getItem("user");

  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const teamDetails = await getTeamDetails(ID);
      setFname(teamDetails.fname);
      setLname(teamDetails.lname);
      setUsercode(teamDetails.usercode);
      setEmail(teamDetails.email);
      setMobile_no(teamDetails.mobile_no);
    } catch (error) {
      console.error("Error fetching team details:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTeamDetails = async (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    const response = await axios.post(`${baseUrl}/getTeam`, { id }, config);
    return response.data.result;
  };

  const editTeamApi = async () => {
    try {
      const values = {
        id: ID,
        fname: fname,
        lname: lname,
        usercode: usercode,
        email: email,
        mobile_no: mobile_no,
      };
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      const result = await axios.post(`${baseUrl}/teamEdit`, values, config);
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error editing team member:", error);
    }
  };

  return (
    <>
      <div>
        <button className="btn btn-outline-primary mt-3" style={{width: "70px"}} onClick={handleClickOpen}>
          Edit
        </button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>
            <h4 className="heading">Edit Team Member</h4>
          </DialogTitle>
          <DialogContent className="dialog1">
            <DialogContentText id="alert-dialog-slide-description">
              <div className="row">
                <div className="col-12 dialogBlock1 mb-3 ">
                  <form action="" className="row">
                    <div className=" col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <div className=" col-md-4 d-flex flex-column text-center mb-3 justify-content-center align-items-center">
                      <label htmlFor="">Role</label>
                      <select className="merchantTeam" value={usercode} onChange={(e) => setUsercode(e.target.value)}>
                        <option value="1">Administrator</option>
                        <option value="2">Manager</option>
                        <option value="3">Cashier</option>
                        <option value="4">Reporter</option>
                      </select>
                    </div>

                    <hr />
                    <div className=" col-md-6 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Email Address</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={mobile_no}
                        onChange={(e) => setMobile_no(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-12 dialogBlock1">
                  <div className="mx-3">
                    <h5 style={{ fontSize: "24px", color: "#000" }}>
                      Description
                    </h5>
                    <div
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      {usercode === "1"
                        ? "Administrator"
                        : usercode === "2"
                        ? "Manager"
                        : usercode === "3"
                        ? "Cashier"
                        : "Reporter"}
                    </div>
                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      {usercode === "1"
                        ? "Full access to UBank Connect. This role allows the same permissions as the Owner, but does not allow access to Owner information. The Admin role should only be assigned to your most trusted and senior employees only."
                        : usercode === "2"
                        ? "Limited access to UBank Connect. As an Owner or Admin, you must grant the Manager role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements, Add Employees only."
                        : usercode === "3"
                        ? "Limited access to UBank Connect. As an Owner or Admin, you must grant the Cashier role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements only."
                        : "Limited access to UBank Connect. As an Owner or Admin, you must grant the Reporter role access to additional permissions, such as Reports, Statements only."}
                    </div>
                    <br />
                    <div style={{ fontWeight: "600", color: "black" }}>
                      Note
                    </div>

                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      Activating a New Employee Account <br /> New employees
                      will receive a link via email to activate their account.{" "}
                      <br /> Account: Active
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="buttonteam2"
              onClick={() => {
                editTeamApi()
              }}
            >
              Update
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TeamMod;
