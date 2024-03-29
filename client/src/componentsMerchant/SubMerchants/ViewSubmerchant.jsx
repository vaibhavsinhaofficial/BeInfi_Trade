import React, { useState, useEffect } from 'react'
import baseUrl from "../config/baseUrl";
import axios from "axios";
import Header from "../../commonAdminComp/Header/Header";
import { useParams } from "react-router-dom";

function ViewSubmerchant() {
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
  let { id } = useParams();

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
      <Header title="SubMerchant" path="/merchant/SubMerchants" />
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
    </>
  );
}

export default ViewSubmerchant;
