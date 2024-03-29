import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../../context/ContextProvider";
import Loader from "../../Loader/Loader";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CurrencyRate({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Deposit Currency",
    "Settled Currency",
    "Rate",
    "Edit",
    "Delete",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [loading,setLoading] =useState(true)

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
        `${baseUrl}/defaultCurrency`,
        formData,
        config
      );
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
    // setActive(14);
    // setActive2("Currency Exchange Rate");
    // setToggel(true);
  }, [page, searchVal, limitVal]);

  const deleteRow = async (id) => {
    try {
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
          `${baseUrl}/deleteCurrency`,
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
                  <TableCell align="center">{item.deposit_currency}</TableCell>
                  <TableCell align="center">{item.settled_currency}</TableCell>
                  <TableCell align="center">{item.rate}</TableCell>
                  <TableCell align="center">
                    <DialogOpenModelEdit authUpdate={authUpdate} ReadData={ReadData} ID={item.id}/>
                  </TableCell>
                  <TableCell align="center">
                    {authDelete ? (
                      <button
                        className="btn btn-danger fa fa-trash fa-lg nav_icon"
                        onClick={() => deleteRow(item.id)}
                      ></button>
                    ) : (
                      ""
                    )}
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
          <h4 className="mb-3 headingAll"> Currency List</h4>
          <div className="col-6 mb-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Deposit Currency"
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
            {authCreate ? (
              <DialogOpenModelAdd authCreate={authCreate} ReadData={ReadData} />
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

const DialogOpenModelAdd = ({ authCreate, ReadData }) => {
  
  const [open, setOpen] = React.useState(false);
  const [deposit_currency, setDeposit_currency] = useState("");
  const [settled_currency, setSettled_currency] = useState("")
  const [rate, setRate] = useState("")

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
      if (!deposit_currency || !settled_currency || !rate) {
        setFormIncomplete(true);
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => {
          setFormIncomplete(false);
          setErrorMessage("");
        }, 5000); 
        return;
      }
      let values = {
          deposit_currency: deposit_currency,
          settled_currency: settled_currency,
          rate: rate
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createCurrency`, values, config);
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
                  New Currency Rate
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Deposit Currency</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Deposit Currency" className="form-control mb-3" onChange={(e) => setDeposit_currency(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Settled Currency</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Settled Currency" className="form-control mb-3" onChange={(e) => setSettled_currency(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Rate</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Rate" className="form-control mb-3" onChange={(e) => setRate(e.target.value)} />
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
  const [deposit_currency, setDeposit_currency] = useState("");
  const [settled_currency, setSettled_currency] = useState("")
  const [rate, setRate] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
    currencyDetails(ID);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");

  const currencyDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/readOneCurrency`,
        {
          id: ID
        },
        config
      );
      setDeposit_currency(result.data.deposit_currency);
      setSettled_currency(result.data.settled_currency);
      setRate(result.data.rate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let values = {
          id: ID,
          deposit_currency: deposit_currency,
          settled_currency: settled_currency,
          rate: rate,
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/updateCurrency`, values, config);
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
              className="btn btn-success fa fa-pencil-square-o fa-lg nav_icon"
              onClick={handleClickOpen}
            >
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
                  Edit Currency 
              </DialogTitle>
              <DialogContent>
                <div className="row">
                  <div className="col-12 swapBox">
                    <form className="row justify-content-around"  onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-4">
                            <label>Deposit Currency</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Deposit Currency" className="form-control mb-3" value={deposit_currency} onChange={(e) => setDeposit_currency(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Settled Currency</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Settled Currency" className="form-control mb-3" value={settled_currency} onChange={(e) => setSettled_currency(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Rate</label>
                        </div>
                        <div className="col-8">
                          <input type="text" placeholder="Rate" className="form-control mb-3" value={rate} onChange={(e) => setRate(e.target.value)} />
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

export default CurrencyRate;
