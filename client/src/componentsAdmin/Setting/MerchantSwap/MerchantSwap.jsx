import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../../commonAdminComp/SearchBox/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../../context/ContextProvider";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function MerchantSwap({authCreate, authRead, authUpdate, authDelete}) {
    const tableHeading = [
        "Merchant Id",
        "UBankconnect Code",
        "Primary Gateway",
        "Switch Gateway",
        "Status",
        "Created Date",
        "Updated Date",
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
            `${baseUrl}/defaultSwap`,
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
        // setActive2("Exchange");
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

            let result = await axios.post(`${baseUrl}/deleteSwap`, formData, config);
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
            `${baseUrl}/toggleSwap`,
            formData,
            config
        );
        toast.success(result.data.result, {
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
                            <TableCell align="center">{item.merchant_id}<br /> <div className="codeName">&#40;{item.name}&#41;</div></TableCell>
                            <TableCell align="center">{item.bankcode} <br /> <div className="codeName">&#40;{item.title}&#41;</div></TableCell>
                            <TableCell align="center">&#40;{item.primary_gateway} {item.primaryGateway}&#41;</TableCell>
                            <TableCell align="center">&#40;{item.switch_gateway} {item.switchGateway}&#41;</TableCell>
                            <TableCell align="center">
                                {
                                    item.status === 1 ? (
                                        <button className="btn btn-outline-primary" style={{width: "100px"}} onClick={() => toggleStatus(item.id, item.status)}>Unblock</button>
                                    ) : (
                                        <button className="btn btn-outline-danger" style={{width: "100px"}} onClick={() => toggleStatus(item.id, item.status)}>Block</button>
                                    )
                                }
                            </TableCell>
                            <TableCell align="center">{item.creation_date}</TableCell>
                            <TableCell align="center">{item.modification_date}</TableCell>
                            <TableCell align="center">
                                <DialogOpenModel ID={item.id} authUpdate={authUpdate} />                            
                            </TableCell>
                            <TableCell align="center">
                                {authDelete? <button
                                    className="btn btn-danger fa fa-trash fa-lg nav_icon"
                                    onClick={() => deleteRow(item.id)}
                                >
                                </button>:"Not Authorized"}
                            
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
                <div className="col-9 mb-3">
                    <h4 className="mb-3 headingAll">Merchant Bank Swaping</h4>
                </div>
                <div className="col-3 mb-3 text-end">
                    <DialogOpenModelAdd authCreate={authCreate}/>
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

const DialogOpenModel = ({ ID, authUpdate }) => {
  
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [code, setCode] = useState([])
    const [gateway, setGateway] = useState([])
    const [merchant, setMerchant] = useState("")
    const [bankCode, setBankCode] = useState("")
    const [merGateway1, setMerGateway1] = useState("")
    const [merGateway2, setMerGateway2] = useState("")
    
  
    const handleClickOpen = () => {
      setOpen(true);
      swapDetails(ID);
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
          ${baseUrl}/allMerchant`,
          config
        );
        let result1 = await axios.post(`
          ${baseUrl}/selectBankCode`,
          {},
          config
        );
        let result2 = await axios.post(`
          ${baseUrl}/allGateway`,
          {},
          config
        );
        setData(result.data.Data);
        setCode(result1.data.result);
        setGateway(result2.data.Data);
      } catch (error) {
        console.log(error);
      }
    };

    const swapDetails = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(`
          ${baseUrl}/getSwapDetails`,
          {
            id: ID
          },
          config
        );
        setMerchant(result.data.result[0].merchant_id)
        setBankCode(result.data.result[0].bankcode)
        setMerGateway1(result.data.result[0].primary_gateway)
        setMerGateway2(result.data.result[0].switch_gateway)
        
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let values = {
            id: ID,
            merchant_id: merchant,
            bankcode: bankCode,
            primary_gateway: merGateway1,
            switch_gateway: merGateway2
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth}`,
            },
        };
  
        let result = await axios.post(`${baseUrl}/updateMerchantSwapGateway`, values, config);
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
            {authUpdate ?  <button className="btn btn-success fa fa-pencil-square-o fa-lg nav_icon" onClick={handleClickOpen}></button>:"Not Authorized"}
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
                    borderRadius: "0",
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
              Edit Swap Gateway
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
                            <select className="form-select mb-3" value={merchant} onChange={(e)=>setMerchant(e.target.value)}>
                                <option>Select Merchant</option>
                                {
                                    data?.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label>Bankconnect Code</label>
                        </div>
                        <div className="col-8">
                            <select className="form-select mb-3"  value={bankCode} onChange={(e)=>setBankCode(e.target.value)}>
                                <option>Select BankCodes</option>
                                {
                                    code?.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.code}>
                                            {item.selectValue}
                                        </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label>Primary Gateway</label>
                        </div>
                        <div className="col-8">
                            <select className="form-select mb-3" value={merGateway1} onChange={(e)=>setMerGateway1(e.target.value)}>
                                <option>Select Gateway</option>
                                {
                                    gateway?.map((item,index)=>{
                                    return(
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
                            <label>Swap Gateway</label>
                        </div>
                        <div className="col-8">
                            <select className="form-select mb-3" value={merGateway2} onChange={(e)=>setMerGateway2(e.target.value)}>
                                <option>Select Gateway</option>
                                {
                                    gateway?.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.id}>
                                            {item.gateway_name}
                                        </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block"}} type="submit">Update</button>
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

const DialogOpenModelAdd = ({ authCreate }) => {
  
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [code, setCode] = useState([])
    const [gateway, setGateway] = useState([])
    const [merchant, setMerchant] = useState("")
    const [bankCode, setBankCode] = useState("")
    const [merGateway1, setMerGateway1] = useState("")
    const [merGateway2, setMerGateway2] = useState("")
    
  
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
          ${baseUrl}/allMerchant`,
          config
        );
        let result1 = await axios.post(`
          ${baseUrl}/selectBankCode`,
          {},
          config
        );
        let result2 = await axios.post(`
          ${baseUrl}/allGateway`,
          {},
          config
        );
        setData(result.data.Data);
        setCode(result1.data.result);
        setGateway(result2.data.Data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let values = {
            merchant_id: merchant,
            bankcode: bankCode,
            primary_gateway: merGateway1,
            switch_gateway: merGateway2
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth}`,
            },
        };
  
        let result = await axios.post(`${baseUrl}/createMerchantSwap`, values, config);
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
                </button> ) : null}
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
                        borderRadius: "0",
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
                    Swap Gateway
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
                                    <select className="form-select mb-3" value={merchant} onChange={(e)=>setMerchant(e.target.value)}>
                                        <option>Select Merchant</option>
                                        {
                                            data?.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label>Bankconnect Code</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select mb-3"  value={bankCode} onChange={(e)=>setBankCode(e.target.value)}>
                                        <option>Select BankCodes</option>
                                        {
                                            code?.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.code}>
                                                    {item.selectValue}
                                                </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label>Primary Gateway</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select mb-3" value={merGateway1} onChange={(e)=>setMerGateway1(e.target.value)}>
                                        <option>Select Gateway</option>
                                        {
                                            gateway?.map((item,index)=>{
                                            return(
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
                                    <label>Swap Gateway</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select mb-3" value={merGateway2} onChange={(e)=>setMerGateway2(e.target.value)}>
                                        <option>Select Gateway</option>
                                        {
                                            gateway?.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.id}>
                                                    {item.gateway_name}
                                                </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn" style={{background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block"}} type="submit">Create</button>
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

export default MerchantSwap;
