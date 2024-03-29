import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Form from "react-bootstrap/Form";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./sidebar.css";
import axios from "axios";
import baseUrl from "../config/baseUrl";

import logoImage from "./imgs/fav-icon.svg"
import quickprevious from "./imgs/quick-previous.svg"
import Vector from "./imgs/Vector.svg"
import notificationbell from "./imgs/notificationBell.png"

// Sidebar Icons
import dashboard from "./imgs/dashboard.svg"
import merchant from "./imgs/merchant.svg"
import transactions from "./imgs/transactions.svg"
import payout from "./imgs/payout.svg"
import singlepayout from "./imgs/singlepayout.svg"
import local from "./imgs/local.svg"
import intersettlement from "./imgs/intersettlement.png"
import reports from "./imgs/reports.svg"
import statements from "./imgs/statements.svg"
import employes from "./imgs/employes.svg"
import businesssettings from "./imgs/business-settings.svg"
import developerImg from "./imgs/developerImg.png"
import log from "./imgs/log.png"
import changepassword from "./imgs/changepassword.svg"
import Logout from "./imgs/logout.svg"
import settingbar from "./imgs/settingbar.svg"
import bankconnect from "./imgs/bankconnect.png"
import profile from "./imgs/profile.jpg"


const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const { setTimeZoneVal } = useStateContext();
  const { setIsLoginUser } = useStateContext();
  const [dateState, setDateState] = React.useState(new Date());
  const navigate = useNavigate()
  React.useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  const timeZoneFun = (e) => {
    setTimeZoneVal(JSON.parse(e.target.value).timeZone);
    localStorage.setItem("timeZone", e.target.value);
  };
  let timeZoneValShow = JSON.parse(localStorage.getItem("timeZone"))?.timeZone;
  const logout = () => {
    localStorage.clear("user");
    setIsLoginUser(undefined);
    setDropdownMerchant("");
    navigate('login-merchant')
  };

  const accountAssign = localStorage.getItem("accoutType")

  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl: `${dashboard}`,
      path: "dashboard",
    },
    {
      name: "Sub Merchants",
      iconUrl: `${merchant}`,
      path: "SubMerchants",
    },
    {
      name: "Deposit",
      iconUrl:
        `${transactions}`,
      path: "Deposit",
    },
    // {
    //   name: "Refund",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
    //   path: "Refund",
    // },

    {
      name: "Payout",
      iconUrl: `${payout}`,
      path: "payout",
    },
    {
      name: "SinglePayout",
      iconUrl: `${singlepayout}`,
      path: "SinglePayout"
    },
    {
      name: "Local Settlement",
      iconUrl:
        `${local}`,
      path: "Settlement",
    },
    {
      name: "International Settlement",
      iconUrl:
        `${intersettlement}`,
      path: "InternationalSettlement",
    },
    {
      name: "Reports",
      iconUrl:
        `${reports}`,
      path: "Reports",
    },

    {
      name: "Statements",
      iconUrl:
        `${statements}`,
      path: "Statements",
    },
    // {
    //   name: "Invoice",
    //   iconUrl:
    //     "	https://www.bankconnect.online/assets/merchants/img/billing.svg",
    //   path: "Invoice",
    // },
    // {
    //   name: "Virtual Terminal",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
    //   path: "Virtual",
    // },
    {
      name: "Teams",
      iconUrl:
        `${employes}`,
      path: "Teams",
    },
    {
      name: "Business Setting",
      iconUrl:
        `${businesssettings}`,
      path: "BusinessSetting",
    },
    {
      name: "Integrations",
      iconUrl:
        `${developerImg}`,
      path: "Integrations",
    },
    {
      name: "Wallet Logs",
      iconUrl:
        `${log}`,
      path: "WalletLogs",
    },
    // {
    //   name: "Help",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
    //   path: "Help",
    // },
    {
      name: "Change Password",
      iconUrl:
        `${changepassword}`,
      path: "ChangePassword",
    },
    {
      name: "Logout",
      iconUrl:
        `${Logout}`,
      path: "login-merchant",
    },
  ];

  const sidebarLinkManager = [
    {
      name: "Dashboard",
      iconUrl: `${dashboard}`,
      path: "PayoutDashboard",
    },
    {
      name: "Search User",
      iconUrl: `${dashboard}`,
      path: "searchuser",
    },
    {
      name: "User Payout Balance",
      iconUrl: `${dashboard}`,
      path: "UserPayoutBalance",
    },
    {
      name: "Logout",
      iconUrl:
        `${Logout}`,
      path: "login-merchant",
    },
  ];

  const submerchantLink = [
    {
      name: "Dashboard",
      iconUrl: `${dashboard}`,
      path: "dashboard",
    },
    {
      name: "Deposit",
      iconUrl:
        `${transactions}`,
      path: "Deposit",
    },
    {
      name: "Payout",
      iconUrl: `${payout}`,
      path: "payout",
    },
    {
      name: "SinglePayout",
      iconUrl: `${singlepayout}`,
      path: "SinglePayout"
    },
    {
      name: "Settlement",
      iconUrl:
        `${local}`,
      path: "Settlement",
    },
    {
      name: "International Settlement",
      iconUrl:
        `${intersettlement}`,
      path: "InternationalSettlement",
    },
    {
      name: "Reports",
      iconUrl:
        `${reports}`,
      path: "Reports",
    },
    {
      name: "Statements",
      iconUrl:
        `${statements}`,
      path: "Statements",
    },
    {
      name: "Teams",
      iconUrl:
        `${employes}`,
      path: "Teams",
    },
    {
      name: "Business Setting",
      iconUrl:
        `${businesssettings}`,
      path: "BusinessSetting",
    },
    {
      name: "Integrations",
      iconUrl:
        `${developerImg}`,
      path: "Integrations",
    },
    {
      name: "Wallet Logs",
      iconUrl:
        `${log}`,
      path: "WalletLogs",
    },
    {
      name: "Change Password",
      iconUrl:
        `${changepassword}`,
      path: "ChangePassword",
    },
    {
      name: "Logout",
      iconUrl:
        `${Logout}`,
      path: "login-merchant",
    },
  ];

  const liveTestModule = [
    {
      name: "Dashboard",
      iconUrl: `${dashboard}`,
      path: "TestDashboard",
    },
    // {
    //   name: "Sub Merchants",
    //   iconUrl:`${merchant}`,
    //   path: "SubMerchants",
    // },
    {
      name: "Deposit",
      iconUrl:
        `${transactions}`,
      path: "SandboxDeposit",
    },
    {
      name: "Payout",
      iconUrl: `${payout}`,
      path: "SandboxPayouts",
    },
    {
      name: "Wallet Logs",
      iconUrl:
        `${log}`,
      path: "WalletLogs",
    },
    {
      name: "Logout",
      iconUrl:
        `${Logout}`,
      path: "login-merchant",
    },
  ]

  function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Badge
          className="mx-3"
          style={{ cursor: "pointer" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img
            src={settingbar}
            alt=""
            width="40px"
          />
        </Badge>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem  > <Link to='BusinessSetting' onClick={handleClose} style={{ color: "#212529", fontWeight: "500", fontSize: "13px" }}> Account Setting</Link> </MenuItem>
          <MenuItem>  <Link to='ChangePassword' onClick={handleClose} style={{ color: "#212529", fontWeight: "500", fontSize: "13px" }}> Change Password</Link> </MenuItem>
          <MenuItem>  <div onClick={() => { handleClose(); logout(); }} style={{ color: "#212529", fontWeight: "500", fontSize: "13px" }}> Logout</div> </MenuItem>


        </Menu>
      </div>
    );
  }

  const auth = localStorage.getItem("user");
  const [submerchant, setSubmerchant] = useState([])
  const { setDropdownMerchant, dropdownMerchant } = useStateContext();
  const [defaultvalue, setDefaultvalue] = useState("");
  const [notification, setNotification] = useState([])
  const [count, setCount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [allAccount, setAllAccount] = useState([])
  const [submerchantID, setSubmerchantID] = useState([])

  const handleChange = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      navigate('dashboard') // Navigate to path1 if value is true
    } else {
      navigate('TestDashboard')// Navigate to path2 if value is false
    }
  };

  const ReadData = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/details`,
        formData,
        config
      );

      let result1 = await axios.post(
        `${baseUrl}/merchantNotificationBell`,
        formData,
        config
      );
      setSubmerchant(result.data.data);
      setDefaultvalue(result.data.id);
      setAllAccount(result.data.allAccount)
      setSubmerchantID(result.data.submerchants)

      setNotification(result1.data.result)
      setCount(result1.data.resultCount[0].count)

    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("status", 0);


      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleNotification`,
        formData,
        config
      );
      ReadData();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadData();
  }, []);

  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose1" : "openClose2"}
      >
        <img
          src={quickprevious}
          alt=""
          width="40px"
          style={{ position: "fixed", cursor: "pointer" }}
        />
      </div>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar className="appBarcom">

          <Typography
            variant="h6"
            noWrap
            component="div"
            className="d-flex align-items-center"
          >
            {open ? (
              <img
                src={bankconnect}
                alt=""
                width="200px"
              />
            ) : (
              <img
                src={bankconnect}
                //  src={logoImage} 
                alt=""
                width="200px" />
            )}
          </Typography>

          {/* SubMerchant Dropdown */}
          {/* <div>
            {Number(accountAssign) === 1 
            ? <select className="submerchantDropdown" style={{textAlign: "center", fontWeight: "600"}} onChange={(e)=>setDropdownMerchant(e.target.value)}>
                <option value={defaultvalue} style={{textAlign: "center", fontWeight: "600"}}>Own Account</option>
                <option value={allAccount} style={{textAlign: "center", fontWeight: "600"}}>All Account</option>
                <option value={submerchantID} style={{textAlign: "center", fontWeight: "600"}}>Sub Merchants</option>
                {submerchant?.map((item,index)=>{
                  return(
                    <>
                      <option style={{textAlign: "center", fontWeight: "600"}} value={item.id}>{item.name}</option>
                    </>
                  )})
                }
              </select> 
            : ""}
          </div>  */}

          {/* new code */}
          <div>
            {Number(accountAssign) === 1 && (
              <select
                className="submerchantDropdown"
                style={{ textAlign: "center", fontWeight: "600" }}
                onChange={(e) => setDropdownMerchant(e.target.value)}
              >
                <option
                  value={defaultvalue}
                  style={{ textAlign: "center", fontWeight: "600" }}
                >
                  Own Account
                </option>
                <option
                  value={allAccount}
                  style={{ textAlign: "center", fontWeight: "600" }}
                >
                  All Account
                </option>
                <option
                  value={submerchantID}
                  style={{ textAlign: "center", fontWeight: "600" }}
                >
                  Sub Merchants
                </option>
                {submerchant.map((item, index) => (
                  <option
                    key={index} // Assign a unique key here
                    style={{ textAlign: "center", fontWeight: "600" }}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>


          <div className="d-flex align-items-center ms-5 justify-content-center">
            <div
              className="d-flex justify-content-center align-items-center timezone"
            >
              <div className="d-flex justify-content-between align-items-center">
                <CalendarMonthIcon className="mx-1" />
                {dateState.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: timeZoneValShow ? timeZoneValShow : "Asia/Kolkata",
                })}
                <ScheduleIcon className="mx-1" />
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: timeZoneValShow ? timeZoneValShow : "Asia/Kolkata",
                })}
              </div>
            </div>
            <div>
              <Form.Select
                aria-label="Default select example"
                className="mx-3 timeSelect"
                onChange={(e) => timeZoneFun(e)}
                value={localStorage.getItem("timeZone")}
                style={{ borderRadius: "30px", textAlign: "center" }}
              >
                <option
                  value={JSON.stringify({
                    name: "India",
                    timeZone: "Asia/Kolkata",
                  })}
                >
                  India
                </option>
                <option
                  value={JSON.stringify({
                    name: "China",
                    timeZone: "Asia/Shanghai",
                  })}
                >
                  China
                </option>
                <option
                  value={JSON.stringify({
                    name: "Indonesia",
                    timeZone: "Asia/Jakarta",
                  })}
                >
                  Indonesia
                </option>
                <option
                  value={JSON.stringify({
                    name: "Philippines",
                    timeZone: "Asia/Manila",
                  })}
                >
                  Philippines
                </option>
                <option
                  value={JSON.stringify({
                    name: "Thailand",
                    timeZone: "Asia/Bangkok",
                  })}
                >
                  Thailand
                </option>
                <option
                  value={JSON.stringify({
                    name: "Malaysia",
                    timeZone: "Asia/Kuala_Lumpur",
                  })}
                >
                  Malaysia
                </option>
                <option
                  value={JSON.stringify({
                    name: "Vietanam",
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                >
                  Vietanam
                </option>
              </Form.Select>
            </div>
          </div>

          <>
            <div className="checkbox-wrapper-55">
              <label className="rocker rocker-small" style={{ verticalAlign: "middle", top: "5px" }}>
                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                <span className="switch-left">TEST</span>
                <span className="switch-right">LIVE</span>
              </label>
            </div>
          </>

          <div className=" navLeft">

            <div className="mx-2 ownerName">
              <span style={{ fontSize: "12px" }}>Hello,</span>&nbsp;
              <span className="username">
                {localStorage.getItem("userName")}
              </span>
            </div>

            {/* Notification */}
            {/* <Badge showZero badgeContent={count}>
              <div className = "icons">
                <div className = "notification">
                  <div className = "notBtn" href = "#">
                    <img
                      src={notificationbell}
                      alt=""
                      width="40px"
                      className="fa"
                    />
                      <div className = "boxNotification">
                        <div className = "display">
                          <div className = "cont">
                            {Object.keys(notification).length > 0 ? (
                              notification.map((item, index) => {
                                return (
                                  <>
                                      <div className = "sec new1" onClick={() => toggleStatus(item.id, item.status)}>
                                        <div className = "txt"><span style={{fontWeight: "700"}}>{item.title}</span><br/>{item.message}</div>
                                        <div className = "txt sub">{item.created_on}</div>
                                      </div>
                                  </>
                                );
                              })
                              ) : ( 
                                <h6 style={{textAlign: "center", marginTop: "75px"}}>You have 0 new notification</h6>
                            )}
                            <div style={{marginTop: "38%", textAlign: "center"}}>
                              <Link to="MerchantNotifcations">
                                <button className="button-7" style={{width: "200px"}}>See All Notifications</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </Badge> */}
            {/* Notification */}

            <Link to="BusinessSetting">
              <img
                src={profile}
                alt=""
                width="40px"
                style={{ borderRadius: "20px" }}
              />
            </Link>


            <div>

              <BasicMenu />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {
            isChecked === false ? (
              <>
                {Number(accountAssign) === 5 ? sidebarLinkManager.map((item, index) => {
                  return (
                    <div className="sidebarcontainer mb-3 " key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? " iconcontainer mx-3 iconActive"
                            : " iconcontainer mx-3"
                        }
                      >
                        <img
                          src={item.iconUrl}
                          alt="not found"
                          className="iconstyle"
                        />
                      </NavLink>

                      <div>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                          }
                          onClick={() => (item.name === "Logout" ? logout() : null)}
                        >
                          {item.name}
                        </NavLink>
                      </div>
                    </div>
                  );
                }) : Number(accountAssign) === 0 ? submerchantLink.map((item, index) => {
                  return (
                    <div className="sidebarcontainer mb-3 " key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? " iconcontainer mx-3 iconActive"
                            : " iconcontainer mx-3"
                        }
                      >
                        <img
                          src={item.iconUrl}
                          alt="not found"
                          className="iconstyle"
                        />
                      </NavLink>

                      <div>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                          }
                          onClick={() => (item.name === "Logout" ? logout() : null)}
                        >
                          {item.name}
                        </NavLink>
                      </div>
                    </div>
                  );
                }) : sidebarLink.map((item, index) => {
                  return (
                    <div className="sidebarcontainer mb-3 " key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? " iconcontainer mx-3 iconActive"
                            : " iconcontainer mx-3"
                        }
                      >
                        <img
                          src={item.iconUrl}
                          alt="not found"
                          className="iconstyle"
                        />
                      </NavLink>

                      <div>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                          }
                          onClick={() => (item.name === "Logout" ? logout() : null)}
                        >
                          {item.name}
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              liveTestModule.map((item, index) => {
                return (
                  <div className="sidebarcontainer mb-3 " key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? " iconcontainer mx-3 iconActive"
                          : " iconcontainer mx-3"
                      }
                    >
                      <img
                        src={item.iconUrl}
                        alt="not found"
                        className="iconstyle"
                      />
                    </NavLink>

                    <div>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                        }
                        onClick={() => (item.name === "Logout" ? logout() : null)}
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  </div>
                );
              })
            )
          }
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="mainBlockSideBar"
      >
        <DrawerHeader />
        <div className="bdcolor">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

