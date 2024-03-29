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
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Loader from "../Loader/Loader";
import { Popover, Dialog, DialogContent, DialogTitle } from "@mui/material";
function Contact({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = ["Name", "Email", "Mobile", "Message", "Date", "Action"];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading] =useState(true)
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

      let result = await axios.post(`${baseUrl}/contact`, formData, config);

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
  }, [page, searchVal, limitVal]);

  
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
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.mobile}</TableCell>
                  <TableCell align="center">
                    <div className="websiteMessage">
                      {item.message}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.created_on}</TableCell>

                  <TableCell align="center">
                    <PopUp item={item} authRead={authRead} authDelete={authDelete} ReadData={ReadData} />
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
          <h4 className="mb-3 headingAll"> Manage Call Request List</h4>
          <div className="col-6 mb-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Email"
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

const PopUp = ({item, authRead, authDelete, ReadData }) => {
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
          `${baseUrl}/deleteContact`,
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
              <MerchantView item={item}/>
            ) : null}

            {authDelete ? (
              <button
                className="btn btn-primary mt-3 mb-3" style={{width: "70px"}}
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

const MerchantView = ({ item }) => {
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div>
          <button
              className="btn btn-secondary mt-3 btn-sm"
              style={{width: "70px"}}
              onClick={handleClickOpen}
          >
              View
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
                  style={{ fontWeight: "700", fontSize: "20px", textAlign: "center" }}
              >
                  View Contact Us 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                  <div className="col-12 swapBox">
                    <form className="row justify-content-around">
                      <div className="row">
                        <div className="col-4">
                            <label>Name</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Name" className="form-control mb-3" value={item.name} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Email</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Email" className="form-control mb-3" value={item.email} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Mobile No</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Mobile No" className="form-control mb-3" value={item.mobile} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Message</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Message" className="form-control mb-3" value={item.message} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Send Date</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Send Date" className="form-control mb-3" value={item.created_on} disabled />
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

export default Contact;
