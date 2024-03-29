import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./changePass.css";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";

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
          <ChangePassForm />
        </Grid>
      </Grid>
    </>
  );
}

const ChangePassForm = () => {
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [type3, setType3] = useState("password");
  const { role } = useStateContext();
  const auth = localStorage.getItem("admin");
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const hamgleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("oldPassword", inputData.oldPassword);
      formData.append("newPassword", inputData.newPassword);
      formData.append("confirmPassword", inputData.confirmPassword);
      formData.append("token", auth);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/changePassword`,
        formData,
        config
      );
     
      if (result.status === 200) { 
        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setInputData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } else {
        toast.error(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeType1 = () => {
    setType1((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType2 = () => {
    setType2((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType3 = () => {
    setType3((preType) => (preType === "password" ? "text" : "password"));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Current Password</label>
          <div className="iconfix">
            <input
              type={type1}
              className="form-control inputField"
              placeholder="Current Password"
              value={inputData.oldPassword}
              name="oldPassword"
              onChange={hamgleChange}
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType1}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">New Password</label>
          <div className="iconfix">
            <input
              type={type2}
              className="form-control inputField"
              placeholder="Current Password"
              value={inputData.newPassword}
              name="newPassword"
              onChange={hamgleChange}
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType2}
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Confirm Password</label>
          <div className="iconfix">
            <input
              type={type3}
              className="form-control inputField"
              placeholder="Current Password"
              value={inputData.confirmPassword}
              name="confirmPassword"
              onChange={hamgleChange}
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
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
          {
            role === "1" || role === "-1" ? (
              <>
              <button type="submit" className="btn btn" style={{background: "#ff6600", borderRadius: "20px", color: "#fff", height: "45px"}}>
                Change Password
              </button>
              </>
            ) : (
              <>
              <button type="submit" className="btn btn" style={{background: "#008800", borderRadius: "20px", color: "#fff", height: "45px"}}>
                Change Password
              </button>
              </>
            )
          }
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
