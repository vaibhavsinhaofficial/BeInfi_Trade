import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ubankconnect from "./imgs/UBankConnect.svg"
import banner from "./imgs/banner.svg"
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../config/baseUrl";

const ForgetReg = () => {
  const [email, setEmail] = useState("");
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let result = await axios.post(
      `${baseUrl}/tokenMail`,
      formData,
      config
    );
    if(result){
      toast.success("Check Your Email For Verification Token", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchant/NewPassword");
    } else {
      toast.error("error", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <form
        action=""
        className="logindash"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
      >
        <h6 className="logintext">Forgot Password</h6>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">
            Registered Email ID
          </label>
          <input
            type="email"
            className="form-control inputField2"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="next" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
  };

function Forget() {
  
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="sighnContainer">
      <div className="row main ">
        <header className="col-12 row">
          <div className="col-6 ">
            <div className="ubank-logo">
              <img
                src={ubankconnect}
                alt=""
                className=" me-auto ubank"
              />
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <span className="text1">Have a UBank Connect account already ?</span>
            <Link to="/bankconnect/merchant/login-merchant" className="button1">
              Log In
            </Link>
          </div>
        </header>

        <div className="col-12 secondblock container">
          <div className="col-md-7 p-4">
            <img
              src={banner}
              alt=""
              className=""
              width="300px"
            />
            <h6 className="firstline">
              Do more with Alternative Payment Methods!
            </h6>
            <p className="secondline">
              Use Alternative Payment Methods to accept from your Customers
            </p>
            <button className="learnMoreSign mb-4">Learn More</button>
            <div>
              Need help? <a href="bb"> Contact Us</a>
            </div>
          </div>
          <div className="col-md-5">
            <ForgetReg />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forget;
