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
import Select from 'react-select';

function PayinBankCodes({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Type",
    "Payment Gate",
    "Title",
    "Code",
    "Akonto Code",
    "Bank Services Charge",
    "Merchant Status",
    "Status",
    "Action",
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
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
      formData.append("type", 10);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/readBankCode`,
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
  }, [page, searchVal, limitVal]);

  const toggleStatus = async (id, status, akontocode) => {
    
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("akontocode", akontocode);
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
        `${baseUrl}/toggleBankCode`,
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
                    {
                        item.type2 === 10
                        ? "Payout" 
                        : ""
                    }
                  </TableCell>
                  <TableCell align="center">{item.gateway_name}</TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item.code}</TableCell>
                  <TableCell align="center">{item.akontocode}</TableCell>
                  <TableCell align="center">
                    {item.bank_services_charge}
                  </TableCell>
                  <TableCell align="center">
                    <MerchantDialog Code={item.akontocode} />
                  </TableCell>
                  <TableCell align="center">
                    {item.status2 === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          toggleStatus(item.identification, item.status2, item.akontocode)
                        }
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          toggleStatus(item.identification, item.status2, item.akontocode)
                        }
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <PopUp item={item} authUpdate={authUpdate} authDelete={authDelete} ReadData={ReadData}/>
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
          <h4 className="mb-3 headingAll">Manage Bankcode List</h4>
          <div className="col-6 mb-3">
            <div className="newSearch">
              <SearchIcon className="mx-2" />
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchval(e.target.value)}
                className="newinputSearch"
                placeholder="Title"
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
          `${baseUrl}/deleteBankCode`,
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
            {authUpdate ? (
              <DialogOpenModelEdit authUpdate={authUpdate} ReadData={ReadData} ID={item.identification} />
            ) : null}

            {authDelete ? (
              <button
                className="btn btn-danger mt-3 mb-3" style={{width: "70px"}}
                onClick={() => deleteRow(item.identification)}
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
  const [type1Name, setType1Name] = useState([]);
  const [bankCodeName, setBankCodeName] = useState([]);
  const [type, setType] = useState("");
  const [type1, setType1] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankServicesCharge, setBankServicesCharge] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [branch_code, setBranch_code] = useState("")

  const [merchantSelect, setMerchantSelect] = useState([])
  const [merchantValue, setMerchantValue] = useState("")
  
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    merchantData()
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");


  const merchantData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/merchantSelect`,
        {},
        config
      );
      console.log(result.data.result);
      setMerchantSelect(result.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const handleCurrencyChange = (selectedOptions) => {
    setSelectedMerchant(selectedOptions);
    const values = selectedOptions.map((option) => option.value);
    setMerchantValue(values);
  };
  
  const typeDataFirst = async (val) => {
    try {
      let values = {
        value: val
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/readType1BankCode`,
        values,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/readType2BankCode`,
        values,
        config
      );    
      setType1Name(result.data.data);
      setBankCodeName(result2.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !type || !bankCode || !type1 || !bankServicesCharge || !code) {
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
        akontocode: bankCode,
        payment_gate: type1,
        bank_services_charge: bankServicesCharge,
        title: title,
        code: code,
        branch_code: branch_code,
        mer_no: merchantValue
      }
      const config = {
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/createBankCode`, values, config);
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
                  New Bankcode
              </DialogTitle>
              <DialogContent>
                <div className="row">
                    <div className="col-12 swapBox">
                      <form className="row justify-content-around"  onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-4">
                              <label>Type</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select mb-3" onChange={(e)=> {typeDataFirst(e.target.value); setType(e.target.value)}}>
                              <option>Select Type</option>
                              <option value={10} style={{fontWeight: "700", color: "red"}}>Payout</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Merchant</label>
                          </div>
                          <div className="col-8">
                            <Select
                              closeMenuOnSelect={false}
                              options={merchantSelect}
                              isMulti
                              value={selectedMerchant}
                              onChange={handleCurrencyChange}
                              menuPosition="top"
                              className="form-control mb-3"
                              styles={{
                                container: (provided) => ({
                                  ...provided,
                                  width: '105%',
                                  fontSize: '12px',
                                  position: 'relative',
                                  background: "transparent",
                                  border: 'none',
                                  marginLeft: '-12px'
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
                                  // maxHeight: '80px',
                                  overflow: 'auto',
                                }),
                              }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Gateway</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select mb-3" onChange={(e) => setType1(e.target.value)}>
                              <option value={-1}>Select Gateway</option>
                              {
                                type1Name.map((item, index) => {
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
                              <label>Bank Codes</label>
                          </div>
                          <div className="col-8">
                            <select className="form-select mb-3" onChange={(e) => setBankCode(e.target.value)}>
                              <option value={0} style={{fontWeight: "700", color: "#000"}}>Select Bankcode</option>
                              {bankCodeName.map((item,index)=>{
                                return(
                                  <option key={index} value={item.code}>
                                    {item.title}
                                  </option>
                                )

                              })}
                            </select>
                          </div>
                        </div>
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
                              <label>Code</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Code" className="form-control mb-3" onChange={(e) => setCode(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Branch Code</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Branch Code" className="form-control mb-3" onChange={(e) => setBranch_code(e.target.value)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                              <label>Bank Services Charge</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Bank Services Charge" className="form-control mb-3" onChange={(e) => setBankServicesCharge(e.target.value)} />
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
  const [type1Name, setType1Name] = useState([]);
  const [bankCodeName, setBankCodeName] = useState([]);
  const [type, setType] = useState("");
  const [type1, setType1] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankServicesCharge, setBankServicesCharge] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [branch_code, setBranch_code] = useState("")

  const [merchantSelect, setMerchantSelect] = useState([])
  const [merchantValue, setMerchantValue] = useState("")
  const [merchantSelectedValue, setMerchantSelectedValue] = useState([])
  

  const handleClickOpen = () => {
    setOpen(true);
    bankcodeDetails(ID);
    merchantData()
    typeDataFirst();
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");

  const merchantData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/merchantSelect`,
        {},
        config
      );
      setMerchantSelect(result.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const handleCurrencyChange = (selectedOptions) => {
    setSelectedMerchant(selectedOptions);
    const values = selectedOptions.map((option) => option.value);
    setMerchantValue(values);
  };

  const typeDataFirst = async () => {
    try {
      let values = {
        value: "10"
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/readType1BankCode`,
        values,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/readType2BankCode`,
        values,
        config
      );    
      setType1Name(result.data.data);
      setBankCodeName(result2.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bankcodeDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`
        ${baseUrl}/readUpdateBankCode`,
        {
          id: ID,
          type: "10" 
        },
        config
      );
      setType1(result.data.data[0].gateway_name);
      setTitle(result.data.data[0].title);
      setCode(result.data.data[0].code);
      setType(result.data.data[0].type2);
      setBankCode(result.data.data[0].akontocode);
      setBankServicesCharge(result.data.data[0].bank_services_charge);
      setBranch_code(result.data.data[0].branch_code);
      setMerchantSelectedValue(result.data.data[0].merNo);
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
        akontocode: bankCode,
        payment_gate: type1,
        bank_services_charge: bankServicesCharge,
        title: title,
        code: code,
        branch_code: branch_code,
        mer_no: merchantValue
      }
      const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(`${baseUrl}/updateBankCode`, values, config);
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
                            <label>Type</label>
                        </div>
                        <div className="col-8">
                          <select className="form-select mb-3" value={type} onChange={(e)=> {setType(e.target.value)}}>
                            <option>Select Type</option>
                            <option value={10} style={{fontWeight: "700", color: "red"}}>Payout</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Already Assigned Merchant</label>
                        </div>
                        <div className="col-8">
                          <input type="text" value={merchantSelectedValue} className="form-control mb-3" disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Assign New Merchants</label>
                        </div>
                        <div className="col-8">
                          <Select
                            closeMenuOnSelect={false}
                            options={merchantSelect}
                            isMulti
                            value={selectedMerchant}
                            onChange={handleCurrencyChange}
                            menuPosition="top"
                            className="form-control mb-3"
                            styles={{
                              container: (provided) => ({
                                ...provided,
                                width: '105%',
                                fontSize: '12px',
                                position: 'relative',
                                background: "transparent",
                                border: 'none',
                                marginLeft: '-12px'
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
                                // maxHeight: '80px',
                                overflow: 'auto',
                              }),
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Gateway</label>
                        </div>
                        <div className="col-8">
                          <select className="form-select mb-3" value={type1} onChange={(e) => setType1(e.target.value)}>
                            <option value={-1}>Select Gateway</option>
                            {
                              type1Name.map((item, index) => {
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
                            <label>Bank Codes</label>
                        </div>
                        <div className="col-8">
                          <select className="form-select mb-3" value={bankCode} onChange={(e) => setBankCode(e.target.value)}>
                            <option value={0}>Select Bankcode</option>
                            {bankCodeName.map((item,index)=>{
                              return(
                                <option key={index} value={item.code}>
                                  {item.title}
                                </option>
                              )

                            })}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Title</label>
                        </div>
                        <div className="col-8">
                          <input type="text" value={title} className="form-control mb-3" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Code</label>
                        </div>
                        <div className="col-8">
                          <input type="text" value={code} className="form-control mb-3" onChange={(e) => setCode(e.target.value)} />
                        </div>
                      </div>
                      <div className="row">
                          <div className="col-4">
                              <label>Branch Code</label>
                          </div>
                          <div className="col-8">
                            <input type="text" placeholder="Branch Code" className="form-control mb-3" onChange={(e) => setBranch_code(e.target.value)} />
                          </div>
                        </div>
                      <div className="row">
                        <div className="col-4">
                            <label>Bank Services Charge</label>
                        </div>
                        <div className="col-8">
                          <input type="text" value={bankServicesCharge} className="form-control mb-3" onChange={(e) => setBankServicesCharge(e.target.value)} />
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

const MerchantDialog = ({Code}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    MerchantData(Code)
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const auth = localStorage.getItem("admin");
  const [merchantData, setMerchantData] = useState([])

  const MerchantData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/merchantData`,
        {akontocode: Code},
        config
      );
      setMerchantData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleMerchantStatus = async (id, status, b_code) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("code", b_code);
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
        `${baseUrl}/toggleMerchantBankCodes`,
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
      MerchantData()
     
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteMerchant = async (id, b_code) => {
    
  //   try {
  //     let answer = window.confirm("Are you sure you want to delete this Merchant?");
  //     if (answer) {
  //       let formData = new FormData();
  //       formData.append("id", id);
  //       formData.append("code", b_code);

  //       const config = {
  //         headers: {
  //           "content-type": "multipart/form-data",
  //           Authorization: `Bearer ${auth}`,
  //         },
  //       };

  //       let result = await axios.post(
  //         `${baseUrl}/deleteMerchantBankCode`,
  //         formData,
  //         config
  //       );
  //       toast.success(result.data.message, {
  //         position: "bottom-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       MerchantData();
        
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div>
        <button
          className="btn btn-success"
          onClick={handleClickOpen}
        >
          Merchant
        </button>
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={false}
            maxWidth={"xl"}
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
                Merchant Bankcodes Enable/Disable 
            </DialogTitle>
            <DialogContent>
              <div style={{overflowX: "auto"}}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Merchant Details</th>
                      <th scope="col">BankCodes Enable/Disable</th>
                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(merchantData).length > 0 ? (
                      merchantData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">({item.mer_no}) {item.name}</th>
                            <td className="text-center">
                              {item.status === 1 ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    toggleMerchantStatus(item.id, item.status, item.b_code)
                                  }
                                >
                                  Enable
                                </button>
                              ) : (
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    toggleMerchantStatus(item.id, item.status, item.b_code)
                                  }
                                >
                                  Disable
                                </button>
                              )}
                            </td>
                            {/* <td>
                              <button className="btn btn-danger" onClick={() => deleteMerchant(item.id, item.b_code)}>Delete</button>
                            </td> */}
                          </tr>
                          );
                        })
                        ) : (
                          <h4 className="mt-3">No Merchant Assigned</h4>
                    )}
                  </tbody>
                </table>
              </div>
            </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
export default PayinBankCodes;