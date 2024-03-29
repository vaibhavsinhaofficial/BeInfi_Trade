import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateSubMer from "./CreateSubMer";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Loader from "../Loader/Loader";

function SubMerchants() {
  const tableHeading = [
    "Account Type",
    "Name",
    "Sub Merchant Id",
    "Status",
    "Web Payment",
    "Created",
    "Action",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("user");
  const [limitVal, setLimitVal] = useState(10);
  const [loading,setLoading] =useState(true)

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("limit", limitVal);
      let values = {page, limit: limitVal}

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/subMerchant`,
        values,
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
  }, [page, limitVal]);

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
                  <TableCell align="center">
                    {item.account_type === 0 ? (
                      <div className="normail">Normal</div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">{item.fname + item.lname}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <div className="btn btn-success" style={{width: "120px", borderRadius: "20px"}}>Approve</div>
                    ) : (
                      <div className="btn btn-danger" style={{width: "120px", borderRadius: "20px"}}>Not Approve</div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.allow_webpayment === 1 ? <div className="btn btn-success" style={{width: "120px", borderRadius: "20px"}}>Approve</div> :  <div className="btn btn-danger" style={{width: "120px", borderRadius: "20px"}}>Not Approve</div>}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">
                    <DialogOpenModel id={item.id}/>
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
  if(loading){
    return <Loader />
  }
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-10">
                <h4 className="headingAll">Sub Merchants</h4>
            </div>
            <div className="col-2">
              <CreateSubMer ReadData={ReadData}/>
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

const DialogOpenModel = ({id}) => {
  const [open, setOpen] = React.useState(false);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [settle_currency, setSettle_currency] = useState("");
  const [bname, setBname] = useState("");
  const [blocation, setBlocation] = useState("");
  const [job_title, setJob_title] = useState("");
  const [website, setWebsite] = useState("");
  const [apv, setApv] = useState("");
  const [ata, setAta] = useState("");
  const [chargeback_percentage, setChargeback_percentage] = useState("");
  const [currency_require, setCurrency_require] = useState("");
  const auth = localStorage.getItem("user");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/getIdSubmerchant`,
        formData,
        config
      );
      setFname(result.data.data[0].fname);
      setLname(result.data.data[0].lname);
      setEmail(result.data.data[0].email);
      setMobile_no(result.data.data[0].mobile_no);
      setSettle_currency(result.data.data[0].settle_currency);
      setBname(result.data.data[0].bname);
      setBlocation(result.data.data[0].blocation);
      setJob_title(result.data.data[0].job_title);
      setWebsite(result.data.data[0].website);
      setApv(result.data.data[0].apv);
      setAta(result.data.data[0].ata);
      setChargeback_percentage(result.data.data[0].charge_back_per);
      setCurrency_require(result.data.data[0].currencies_req);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, []);

  return (
    <>
      <div>
        <h6
          onClick={handleClickOpen}
          className="btn btn-outline-primary" style={{borderRadius: "20px"}}
        >
          View
        </h6>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"lg"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <button
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#1eaae7',
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
            SubMerchant View
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form className="row justify-content-around">
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={fName}
                      disabled
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={lName}
                      disabled
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Mobile No.
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={mobile_no}
                      disabled
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Settle Currency
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value={settle_currency}
                      disabled 
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Business Name
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value={bname}
                      disabled 
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Business location
                    </label>
                    <input
                      type="text" 
                      className="input1"
                      value={blocation}
                      disabled 
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Job Title
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value={job_title}
                      disabled 
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Website
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value= {website}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Annual Processing Volume
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value= {apv}
                      disabled 
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Average Transaction Amount
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value={ata}
                      disabled 
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      What is your current charge back percentage?
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value= {chargeback_percentage}
                      disabled 
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                    >
                      Currencies Require
                    </label>
                    <input 
                      type="text" 
                      className="input1"
                      value={currency_require}
                      disabled 
                    />
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

export default SubMerchants;
