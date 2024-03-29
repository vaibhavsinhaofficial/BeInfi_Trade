import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./changePass.css";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { toast } from "react-toastify";
const Token = localStorage.getItem('user');
function ChangePassword() {
  return (
    <>
      <h4 className="heading">Change Password</h4>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="Parent"
      >
        <Grid item xs={11} sm={8} md={6} className="child">
          <Header />
          <ChangePassForm />
        </Grid>
      </Grid>
    </>
  );
}
const Header = () => {
  const [img, setimg] = useState("https://www.bankconnect.online/assets/merchants/img/profile.jpg");
  const chooseImg =(e)=>{
    const file =e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function(){
      setimg(reader.result)
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="imgdiv">
          <input type="file" className="file" onChange={chooseImg} />
          <img
            src={img}
            alt="Not Found"
            className="UploadImg"
          />
        </div>
        <div className="mt-2">
          <h6 className="uploadtext">Upload Profile Image</h6>
        </div>
      </div>
    </>
  );
};
const ChangePassForm = () => {
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [type3, setType3] = useState("password");
  let token = localStorage.getItem("user");
  const [changePassdata, setChangePassData] = useState({
    token,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const changeType1 = () => {
    setType1((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType2 = () => {
    setType2((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType3 = () => {
    setType3((preType) => (preType === "password" ? "text" : "password"));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      };
      const { data } = await axios.post(`${baseUrl}/changePassword-merchant`,changePassdata,config);
      toast.success("Password Changed Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setChangePassData({ ...changePassdata, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form>
        <div className="mb-4">
          <label for="exampleInputEmail1" className="form-label">
            Current Password
          </label>
          <div className="iconfix">
            <input
              type={type1}
              className="form-control inputField"
              placeholder="Current Password"
              name="oldPassword"
              onChange={handleChange}
            />
            <img
              src=" https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType1}
            />
          </div>
        </div>
        <div className="mb-4">
          <label for="exampleInputEmail1" className="form-label">
            New Password
          </label>
          <div className="iconfix">
            <input
              type={type2}
              className="form-control inputField"
              placeholder="Current Password"
              name="newPassword"
              onChange={handleChange}
            />
            <img
              src=" https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType2}
            />
          </div>
        </div>
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Confirm Password
          </label>
          <div className="iconfix">
            <input
              type={type3}
              className="form-control inputField"
              placeholder="Current Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <img
              src=" https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType3}
            />
          </div>
        </div>
        <p className="mb-4">
          Note: Your password must be 8-20 characters long, contain letters and
          numbers, one of these special characters: "$@#^|!~=+-_." and must not
          conatin spaces.
        </p>
        <div className="text-end">
          <button type="submit" className="cancel mx-2">
            Cancel
          </button>
          <button
            type="submit"
            className="changepassBtn"
            onClick={handlesubmit}
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  );
};
export default ChangePassword;