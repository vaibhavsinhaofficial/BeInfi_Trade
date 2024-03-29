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

const NewPasswordReg = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (!newPassword || !confirmPassword || !token) {
      setFormIncomplete(true);
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setFormIncomplete(false);
        setErrorMessage("");
      }, 5000); 
      return;
    }
    formData.append("newpassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    formData.append("userVerificationToken", token);
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let result = await axios.post(
      `${baseUrl}/forgotPassword`,
      formData,
      config
    );
    if(result){
      toast.success("Password Changed Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchant/login-merchant");
    } else {
      toast.error("Check Email", {
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
        <h6 className="logintext">New Password</h6>
        <div className="mb-3">
            <label className="form-label loginlable">
                Verifciation Token
            </label>
            <input
                type="text"
                className="form-control inputField2 mb-3"
                placeholder="Verifciation Token"
                required
                onChange={(e) => setToken(e.target.value)}
            />
            <label className="form-label loginlable">
                New Passowrd
            </label>
            <input
                type="password"
                className="form-control inputField2 mb-3"
                placeholder="New Password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="form-label loginlable">
                Confirm Password
            </label>
            <input
                type="password"
                className="form-control inputField2 mb-3"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="next " onClick={(e) => handleSubmit(e)}>
              Submit
          </button>
        </div>
        <div className="mt-3">
          {formIncomplete && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </div>
      </form>
    </>
  );
};

function NewPassword() {
  
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
            <span className="text1">New to UBank Connect ?</span>
            <Link to="/bankconnect/merchant/signup-merchant" className="button1">
              Sign Up
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
            <NewPasswordReg />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
