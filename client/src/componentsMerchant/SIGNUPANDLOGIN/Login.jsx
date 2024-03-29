import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../config/baseUrl.js";
import "./signup.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider.jsx";
import CachedIcon from "@mui/icons-material/Cached";
import ubankconnect from "./imgs/UBankConnect.svg"
import banner from "./imgs/banner.svg"
const LogInForm = () => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [qus, setQus] = useState([]);
  const [userName, setUserName] = useState('');
  const { setIsLoginUser,setAccoutType,accoutType } = useStateContext();

  const natigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };  
    axios
      .post(`${baseUrl}/login-merchant`, formData, config)
      .then((response) => {
        setMessage((message = response.data.message));
        if (response.data.is_complete === 1) {
          setToken(response.data.data.token)
          setAccoutType(response.data.data?.account_type)
          if(response.data.data.security_status===1){
            setQus(response.data.questionAnswer);
            setUserName(response.data.data.name)
            setStep(1);
          }else{
        setIsLoginUser(response.data.data.token);
        localStorage.setItem("user", response.data.data.token);
        localStorage.setItem('timeZone',JSON.stringify({name:"India",timeZone:"Asia/Kolkata"}))
        localStorage.setItem("userName",response.data.data.name)
        localStorage.setItem("accoutType",response.data.data?.account_type)
        localStorage.setItem("usercode",response.data.data.usercode)
        if(response.data.data.account_type === 1){
            natigate("/bankconnect/merchant/dashboard");
          } else if(response.data.data.account_type === 5){
            natigate("/bankconnect/merchant/PayoutDashboard");
          } else if (response.data.data.account_type === 0){
            natigate("/bankconnect/merchant/dashboard");
          } else if(response.data.data.account_type === 3){
            natigate("/bankconnect/merchant/TeamDashboard");
          }
        }     
        } else if (response.data.is_complete === 2) {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          natigate(`/bankconnect/merchant/InCompleteProfile/${response.data.data.token}`);
        } else {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong🔗🖇️", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const QusAns = ({name}) => {
    const [refreshNumber, setRefreshNumber] = useState(0);
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (answer.toLocaleLowerCase() === qus[refreshNumber].answer.toLocaleLowerCase()) {
        setIsLoginUser(Token);
        localStorage.setItem("user", Token);
        localStorage.setItem('timeZone',JSON.stringify({name:"India",timeZone:"Asia/Kolkata"}))
        localStorage.setItem("userName",userName)
        localStorage.setItem("accoutType",accoutType)
        natigate("/bankconnect/merchant/dashboard");
      } else {
        toast.error("Answer is not Matched❌❌", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    return (
      <>
        <form
          action=""
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          onSubmit={handleSubmit}
        >
          <h6 className="logintext">Secuirty Question For Login</h6>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label loginlable mb-3 ">
                {qus[refreshNumber]?.question}
              </label>
              <div
                className="refreshIconButton mb-3"
                onClick={() => setRefreshNumber(Math.floor(Math.random() * 3))}
              >
                <CachedIcon sx={{ fontSize: 20 }} />
              </div>
            </div>

            <input
              type="text"
              className="form-control inputField2"
              placeholder="Answer"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
          <div className="text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>

          <div className="d-flex  mt-3 justify-content-around">
            <button className="next" type="submit">
              Submit
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      {step === 0 ? (
        <form
          action=""
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          onSubmit={handleSubmit}
        >
          <h6 className="logintext">Login to Dashboard</h6>
          <div className="mb-3">
            <label className="form-label loginlable mb-3 "> Email ID</label>
            <input
              type="email"
              className="form-control inputField2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label loginlable mb-3 ">Password</label>
            <input
              type="password"
              className="form-control inputField2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end">
            <Link to="/bankconnect/merchant/forgot-password">Forgot Password</Link>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button className="next " type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <QusAns />
      )}
    </>
  );
};

function Login() {
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
              alt="not found"
              className=""
              width="300px"
            />
            <h6 className="firstline">
              Do more with Alternative Payment Methods!
            </h6>
            <p className="secondline">
              Use Alternative Payment Methods to accept from your Customers
            </p>
            <a href="https://ubankconnect.com/" className="btn btn learnMoreSign mb-4">Learn More</a>
            <div>
              Need help? <a href="https://ubankconnect.com/"> Contact Us</a>
            </div>
          </div>
          <div className="col-md-5">
            <LogInForm />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
