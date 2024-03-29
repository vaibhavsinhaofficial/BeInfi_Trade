import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const CreateSubMer = ({formData,ReadData}) => {
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("user");
  const [currency, setCurrency] = useState([])

  const [formDataAll,setFormDataAll] = useState({
    FirstName:'',
    LastName:'',
    Email:'',
    MobileNo:'',
    SettleCurrency:"",
    BusinessName:'',
    BusinessLocation:"",
    JobTitle:'',
    Website:'',
    AnnualProcessingVolume:'',
    AverageTransactionAmount:"",
    chargebackpercentage:"",
    CurrenciesRequire:'',
  })

  const handleChange = (e)=>{
    setFormDataAll({...formDataAll,[e.target.name]:e.target.value})
  }

  const detailSettlement = async() => {
    try{
    let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/userWallet`,
        formData,
        config
      );
      setCurrency(result.data.currencyResult)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailSettlement();
  }, []);

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const auth = localStorage.getItem("user");
    try {
      
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/createMerchant`, formDataAll, config);
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
    } catch (error) {
      console.log(error);
    }
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <div style={{marginLeft: "auto"}}>
        <button className="createNewMerchant" onClick={handleClickOpen}>
          <AddIcon />
          SubMerchant
        </button>
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
            Add SubMerchant
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      First Name <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*First Name Required</span>
                    </label>
                    <input type="text" className="input1" name="FirstName" onChange={handleChange} value={formData?.fname}/>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Last Name <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Last Name Required</span>
                    </label>
                    <input type="text" className="input1" name="LastName"onChange={handleChange} value={formData?.lname}/>
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Email <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Email Required</span>
                    </label>
                    <input type="email" className="input1" name="Email" onChange={handleChange} value={formData?.email}/>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Mobile No <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Mobile No Required</span>
                    </label>
                    <input type="text" className="input1" name="MobileNo"onChange={handleChange} value={formData?.mobile_no}/>
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Settle Currency <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Note It's permanent.</span>
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption"
                      name="SettleCurrency"
                      defaultValue={"default"}
                      style={{width:"100px"}}
                      onChange={handleChange}
                      value={formData?.settle_currency}
                    >
                      <option> Select</option>
                        {currency.map((item, index) => (
                            <option value={item.sortname}>{item.sortname}</option>
                        ))}
                    </select>
                    </div>
                    
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Business Name
                    </label>
                    <input type="text" className="input1" name="BusinessName" onChange={handleChange} value={formData?.bname} />
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "800", color: "#000" }}
                    >
                     Business location
                    </label>
                    <input type="email" className="input1" name="BusinessLocation" onChange={handleChange} value={formData?.blocation} />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Job Title
                    </label>
                    <input type="text" className="input1" name="JobTitle" onChange={handleChange} value={formData?.job_title}/>
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Website
                    </label>
                    <input type="text" className="input1" name="Website" onChange={handleChange} value={formData?.website}/>
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Annual Processing Volume
                    </label>
                    <input type="text" className="input1" name="AnnualProcessingVolume" onChange={handleChange} value={formData?.apv}/>
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Average Transaction Amount
                    </label>
                    <input type="email" className="input1" name="AverageTransactionAmount" onChange={handleChange} value={formData?.ata}/>
                  </div>
                  
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-6 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      What is your current charge back percentage?
                    </label>
                    <input type="text" className="input1" name="chargebackpercentage" onChange={handleChange} value={formData?.charge_back_per}/>
                  </div>
                  <div className="col-md-6 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Currencies Require
                    </label>
                    <input type="text" className="input1" name="CurrenciesRequire" onChange={handleChange} value={formData?.currencies_req}/>
                  </div>
                  <hr style={{ width: "95%" }} />
             <div className="d-flex justify-content-end">
             {formData?<button className="createNewMerchant2Close" onClick={handleClose} type='submit'>
                Close
              </button>:<button className="createNewMerchant2" onClick={(e)=>handleSubmit(e)} type='submit'>
                Create 
              </button>}
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

export default CreateSubMer;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import baseUrl from "../config/baseUrl";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Button } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { toast } from "react-toastify";
// import {Divider,Chip} from "@mui/material";
// import { fontWeight } from "@mui/system";
// import Validation from "../../commonCompMerchant/Validation/Validation";

// const CreateSubMer = ({formData,ReadData}) => {
//   const [open, setOpen] = React.useState(false);
//   const auth = localStorage.getItem("user");
//   const [currency, setCurrency] = useState([])
//   const [errors,setErrors]=useState({})

//   const [formDataAll,setFormDataAll] = useState({
//     FirstName:'',
//     LastName:'',
//     Email:'',
//     MobileNo:'',
//     SettleCurrency:"",
//     BusinessName:'',
//     BusinessLocation:"",
//     JobTitle:'',
//     Website:'',
//     AnnualProcessingVolume:'',
//     AverageTransactionAmount:"",
//     chargebackpercentage:"",
//     CurrenciesRequire:'',
//   })

//   const handleChange = (e)=>{
//     setFormDataAll({...formDataAll,[e.target.name]:e.target.value})
//   }

//   const detailSettlement = async() => {
//     try{
//     let formData = new FormData();

//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${auth}`,
//         },
//       };

//       let result = await axios.post(
//         `${baseUrl}/userWallet`,
//         formData,
//         config
//       );
//       setCurrency(result.data.currencyResult)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     detailSettlement();
//   }, []);

//   const handleSubmit = async (e)=>{
//     e.preventDefault()
//     console.log(formDataAll);
//     // let fromData=new FormData(formDataAll)
//     const validationErrors = Validation(formDataAll)
//     console.log(validationErrors)
//     if (Object.keys(validationErrors).length > 0) {
//      setErrors(validationErrors);
//      console.log(errors)
//      return; // Don't submit the form if there are errors
//    }
//     const auth = localStorage.getItem("user");
//     try {
//       const config = {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${auth}`,
//         },
//       };
      
//       let result = await axios.post(`${baseUrl}/createMerchant`, formDataAll, config);
//       toast.success(result.data.message, {
//         position: "bottom-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       ReadData()
//     } catch (error) {
//       console.log(error);
//     }
//     handleClose()
//   }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setErrors({})
//     setOpen(false);
//   };
  
//   return (
//     <>
//       <div style={{marginLeft: "auto"}}>
//         <button className="createNewMerchant" onClick={handleClickOpen}>
//           <AddIcon />
//           SubMerchant
//         </button>
//         {/* <Button variant="contained" onClick={handleClickOpen} style={{width:"250px"}} title="Create Sub Merchant"><AddIcon />Create Sub Merchant</Button> */}
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           fullWidth={false}
//           maxWidth={"lg"}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle
//             id="alert-dialog-title"
//             style={{ fontWeight: "700", fontSize: "20px" }}
//           >
//             Add SubMerchant
//           </DialogTitle>
//           <DialogContent>
//             <div className="row">
//               <div className="col-12 dialogBlock1">
//                 <form action="" className="row justify-content-around">

//                   <div className=" col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       First Name <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*First Name Required</span>
//                     </label>
//                     <input type="text" className="input1" name="FirstName" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         fname: undefined,
//                       }));
//                     }}
//                     value={formData?.fname}/>
//                     {errors.fname && <p className="error" style={{color : "red"}}>{errors.fname}</p>}
//                   </div>
//                   <div className="col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Last Name <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Last Name Required</span>
//                     </label>
//                     <input type="text" className="input1" name="LastName"onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         lname: undefined,
//                       }));
//                     }} value={formData?.lname}/>
//                     {errors.lname && <p className="error" style={{color : "red"}}>{errors.lname}</p>}
//                   </div>

//                   <div className="col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Email <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Email Required</span>
//                     </label>
//                     <input type="email" className="input1" name="Email" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         email: undefined,
//                       }));
//                     }}
//                      value={formData?.email}/>
//                     {errors.email && <p className="error" style={{color : "red"}}>{errors.email}</p>}

//                   </div>
//                   <div className="col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Mobile No <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Mobile No Required</span>
//                     </label>
//                     <input type="text" className="input1" name="MobileNo"onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         mobile_no: undefined,
//                       }));
//                     }} value={formData?.mobile_no}/>
//                     {errors.mobile_no && <p className="error" style={{color : "red"}}>{errors.mobile_no}</p>}
//                   </div>
//                   <hr style={{ width: "95%" }} />
//                   <div className=" col-md-4 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Settle Currency <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Note It's permanent.</span>
//                     </label>
//                     <div className="d-flex justify-content-center align-items-center">
//                     <select
//                       className="form-select form-select-sm mb-3 boldOption"
//                       name="SettleCurrency"
//                       defaultValue={"default"}
//                       style={{width:"100px"}}
//                       onChange={(e)=>
//                         {
//                           handleChange(e);
                          
//                         }}
//                       value={formData?.settle_currency}
//                     >
//                       <option> Select</option>
//                         {currency.map((item, index) => (
//                             <option value={item.sortname}>{item.sortname}</option>
//                         ))}
//                     </select>
//                     </div>
                    
//                   </div>
//                   <div className="col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Business Name
//                     </label>
//                     <input type="text" className="input1" name="BusinessName" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         bname: undefined,
//                       }));
//                     }} value={formData?.bname} />
//                     {errors.bname && <p className="error" style={{color : "red"}}>{errors.bname}</p>}
//                   </div>

//                   <div className="col-md-3 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "800", color: "#000" }}
//                     >
//                      Business location
//                     </label>
//                     <input type="email" className="input1" name="BusinessLocation" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         blocation: undefined,
//                       }));
//                     }} value={formData?.blocation} />
//                     {errors.blocation && <p className="error" style={{color : "red"}}>{errors.blocation}</p>}
//                   </div>
//                   <div className="col-md-2 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                      Job Title
//                     </label>
//                     <input type="text" className="input1" name="JobTitle" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         job_title: undefined,
//                       }));
//                     }} value={formData?.job_title}/>
//                     {errors.job_title && <p className="error" style={{color : "red"}}>{errors.job_title}</p>}
//                   </div>
//                   <hr style={{ width: "95%" }} />
//                   <div className=" col-md-4 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                      Website
//                     </label>
//                     <input type="text" className="input1" name="Website" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         website: undefined,
//                       }));
//                     }} value={formData?.website}/>
//                     {errors.website && <p className="error" style={{color : "red"}}>{errors.website}</p>}
//                   </div>
//                   <div className="col-md-4 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Annual Processing Volume
//                     </label>
//                     <input type="text" className="input1" name="AnnualProcessingVolume" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         apv: undefined,
//                       }));
//                     }} value={formData?.apv}/>
//                     {errors.apv && <p className="error" style={{color : "red"}}>{errors.apv}</p>}
//                   </div>
//                   <div className="col-md-4 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Average Transaction Amount
//                     </label>
//                     <input type="email" className="input1" name="AverageTransactionAmount" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         ata: undefined,
//                       }));
//                     }} value={formData?.ata}/>
//                     {errors.ata && <p className="error" style={{color : "red"}}>{errors.ata}</p>}
//                   </div>
                  
//                   <hr style={{ width: "95%" }} />
//                   <div className=" col-md-6 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       What is your current charge back percentage?
//                     </label>
//                     <input type="text" className="input1" name="chargebackpercentage" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         charge_back_per: undefined,
//                       }));
//                     }} value={formData?.charge_back_per}/>
//                     {errors.charge_back_per && <p className="error" style={{color : "red"}}>{errors.charge_back_per}</p>}
//                   </div>
//                   <div className="col-md-6 d-flex flex-column text-center">
//                     <label
//                       className="forminputDeposite"
//                       style={{ fontWeight: "700", color: "#000" }}
//                     >
//                       Currencies Require
//                     </label>
//                     <input type="text" className="input1" name="CurrenciesRequire" onChange={(e)=>
//                     {
//                       handleChange(e);
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         currencies_req: undefined,
//                       }));
//                     }} value={formData?.currencies_req}/>
//                     {errors.currencies_req && <p className="error" style={{color : "red"}}>{errors.currencies_req}</p>}
//                   </div>
//                   <hr style={{ width: "95%" }} />
//              <div className="d-flex justify-content-end">
//              {formData?<button className="createNewMerchant2Close" onClick={handleClose} type='submit'>
//                 Close
//               </button>:<Button className="createNewMerchant2" variant="contained" onClick={(e)=>handleSubmit(e)} type='submit'>
//                 Create 
//               </Button>}
//               </div>
//                 </form>
//               </div>
              
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default CreateSubMer;