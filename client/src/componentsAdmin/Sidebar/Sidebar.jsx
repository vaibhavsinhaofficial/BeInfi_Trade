import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import logo from "./imgs/adminlogo.svg";
import quickprevious from "./imgs/quick-previous.svg";

// Sidebar Icons
import dashboard from "./imgs/dashboard.svg";
import subadmin from "./imgs/subadmin.svg";
import banks from "./imgs/banks.svg";
import merinfo from "./imgs/merinfo.svg";
import statements from "./imgs/statements.svg";
import billing from "./imgs/billing.svg";
import managemer from "./imgs/managemer.svg";
import transaction from "./imgs/transaction.svg";
import refund from "./imgs/refund.svg";
import payout from "./imgs/payout.svg";
import merchantchild from "./imgs/merchantchild.png";
import sanddeposit from "./imgs/sanddeposit.png";
import sandpayout from "./imgs/sandpayout.png";
import addfunds from "./imgs/addfunds.svg";
import localsettlement from "./imgs/localsettlement.svg";
import intersettlement from "./imgs/intersettlement.png";
import activity from "./imgs/activity.png";
import websiteemail from "./imgs/websiteemail.svg";
import setting from "./imgs/setting.svg";
import changepassword from "./imgs/changepassword.svg";
import Logout from "./imgs/logout.svg";
import settingbar from "./imgs/settingbar.svg";

const drawerWidth = 250;
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
  // necessary for content to be below app bar
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

export default function Sidebar({ modulePesmission }) {
  const [open, setOpen] = useState(true);
  const { active, setActive, toggel, setToggel, setIsLoginUser, isLoginUser, role } =
    useStateContext();

  const navigate = useNavigate();

  const userTokenExp = () => {
    if (localStorage.getItem("admin")) {
    } else {
      setIsLoginUser(!isLoginUser);
      navigate("/bankconnect");
    }
  };
  userTokenExp();

  const logout = () => {
    localStorage.clear("admin");
    localStorage.clear("role");
    setIsLoginUser(undefined);
    navigate("/bankconnect");
  };

  let sidebarLink;

  if(role === "-1"){
    sidebarLink = [
      {
        name: "Dashboard",
        iconUrl:
          `${dashboard}`,
        path: "/bankconnect/Dashboard",
        children: [{ name: "Sub Admin", path: "/bankconnect/subAdmin" }],
        authPermission:1,
      },
      {
        name: "Sub Admin",
        iconUrl:
          `${subadmin}`,
        path: "/bankconnect/subAdmin",
        children: [{ name: "Sub Admin", path: "/bankconnect/subAdmin" }],
        authPermission: 1,
      },
      {
        name: "Bank/Acquireres",
        iconUrl: `${banks}`,
        path: "/bankconnect/PGMod",
        children: [{ name: "Payment Gates", path: "/bankconnect/PGMod" }],
        authPermission: 1,
      },
      {
        name: "Merchants Info",
        iconUrl:
          `${merinfo}`,
        path: "/bankconnect/Mid",
        children: [{ name: "Mid", path: "/bankconnect/Mid" }],
        authPermission: 1,
      },
      {
        name: "BankCode Bankconnect",
        iconUrl:
          `${statements}`,
        path: "/bankconnect/bankcodeakonto",
        children: [{ name: "BankCode Module", path: "/bankconnect/bankcodeakonto" }],
        authPermission: 1,
      },
      {
        name: "BankCodes",
        iconUrl:
          `${billing}`,
        path: "/bankconnect/PayinBankCodes",
        children: [
          { name: "Payin BankCodes", path: "/bankconnect/PayinBankCodes" },
          { name: "Payout BankCodes", path: "/bankconnect/PayoutBankCodes"}
        ],
        authPermission: 1,
      },
      {
        name: "Merchant Onboarding",
        iconUrl:
          `${managemer}`,
        path: "/bankconnect/merchantAdmin",
        children: [{ name: "Merchant Admin", path: "/bankconnect/merchantAdmin" }],
        authPermission: 1,
      },
      {
        name: "Deposits",
        iconUrl:
          `${transaction}`,
        path: "/bankconnect/MerchantTrans",
        children: [
          { name: "Merchants Transaction ", path: "/bankconnect/MerchantTrans" },
        ],
        authPermission: 1,
      },
      {
        name: "Refunds",
        iconUrl:
          `${refund}`,
        path: "/bankconnect/MerchantRefunds",
        children: [
          { name: "Merchant Refund ", path: "/bankconnect/MerchantRefunds" },
        ],
        authPermission: 1,
      },
      {
        name: "Payouts",
        iconUrl:
          `${payout}`,
        path: "/bankconnect/PayoutMerchants",
        children: [
          { name: "Payout Merchant ", path: "/bankconnect/PayoutMerchants" },
        ],
        authPermission: 1,
      },
      {
        name: "SandBox",
        iconUrl:
          `${sanddeposit}`,
        path: "/bankconnect/SandBoxDeposits",
        children: [
          { name: "SandBox Deposits", path: "/bankconnect/SandBoxDeposits" },
          { name: "SandBox Payouts", path: "/bankconnect/SandBoxPayout" }
        ],
        authPermission: 1,
      },
      {
        name: "Add Funds",
        iconUrl:
          `${addfunds}`,
        path: "/bankconnect/AddFunds",
        children: [{ name: "Payment Gates", path: "/bankconnect/PGMod" }],
        authPermission: 1,
      },
      {
        name: "Local Settlement",
        iconUrl:
          `${localsettlement}`,
        path: "/bankconnect/LocalSettlement",
        children: [{ name: "Payment Gates", path: "/bankconnect/PGMod" }],
        authPermission: 1,
      },
      {
        name: "International Settlement ",
        iconUrl:`${intersettlement}`,
        path: "/bankconnect/InternationalSettlement",
        children: [{ name: "Payment Gates", path: "/bankconnect/PGMod" }],
        authPermission: 1,
      },
      {
        name: "Activity Logs",
        iconUrl:
          `${activity}`,
        path: "/bankconnect/AdminLogs",
        children: [
          { name: "Admin logs", path: "/bankconnect/AdminLogs" },
          { name: "Merchants Logs ", path: "/bankconnect/MerchantLogs" },
          { name: "Wallet Logs ", path: "/bankconnect/WalletLogs" },
          { name: "Currency Rate Logs ", path: "/bankconnect/CurrencyLogs" },
          { name: "Allow Payment Logs ", path: "/bankconnect/AllowPaymentLogs" },
        ],
        authPermission:1,
      },
      {
          name: "Website Email",
          iconUrl:
           `${websiteemail}`,
          path: "/bankconnect/contact",
          children: [{ name: "Contact", path: "/bankconnect/contact" }],
          authPermission: 1,
        },
      {
        name: "Setting Module",
        iconUrl:
          `${setting}`,
        path: "/bankconnect/siteSetting",
        children: [
          { name: "Site Setup", path: "/bankconnect/siteSetting" },
          { name: "Currency Exchange", path: "/bankconnect/CurrencyRate" },
          { name: "Exchange", path: "/bankconnect/Exchange" },
          { name: "Block User", path: "/bankconnect/AllUpi" },
          { name: "Ip WhiteList", path: "/bankconnect/IPWhitelist" },
          { name: "Set Limit", path: "/bankconnect/Limit" },
          { name: "Merchant Child", path: "/bankconnect/SubMerchant" },
          { name: "Manage Payment Gateway", path: "/bankconnect/Cron" },
          { name: "Merchant Swap Gateway", path: "/bankconnect/MerchantSwap" },
          // { name: "Neompay Autho", path: "/bankconnect/NeompayAutho" },
        ],
        authPermission: 1,
      },
      {
        name: "Change Password",
        iconUrl:
          `${changepassword}`,
        path: "/bankconnect/ChangePassword",
        children: [{ name: "Change Password", path: "/bankconnect/ChangePassword" }],
        authPermission: 1,
      },
    ];
  } else {
    sidebarLink = [
      {
        name: "Dashboard",
        iconUrl:
        `${dashboard}`,
        path: "/bankconnect/Dashboard",
        children: [{ name: "Sub Admin", path: "/bankconnect/subAdmin" }],
        authPermission:1,
      },
      {
        name: "Sub Admin",
        iconUrl:
        `${subadmin}`,
        path: "/bankconnect/subAdmin",
        children: [{ name: "Sub Admin", path: "/bankconnect/subAdmin" }],
        authPermission: modulePesmission[0] ? modulePesmission[0].status : 0,
      },
      {
        name: "Bank/Acquireres",
        iconUrl: `${banks}`,
        path: "/bankconnect/PGMod",
        children: [{ name: "Payment Gates", path: "/bankconnect/PGMod" }],
        authPermission: modulePesmission[1] ? modulePesmission[1].status : 0,
      },
      {
        name: "Merchants Info",
        iconUrl:
          `${merinfo}`,
        path: "/bankconnect/Mid",
        children: [{ name: "Mid", path: "/bankconnect/Mid" }],
        authPermission: modulePesmission[2] ? modulePesmission[2].status : 0,
      },
      {
        name: "BankCode Bankconnect",
        iconUrl:
          `${statements}`,
        path: "/bankconnect/bankcodeakonto",
        children: [{ name: "BankCode Module", path: "/bankconnect/bankcodeakonto" }],
        authPermission: modulePesmission[4] ? modulePesmission[4].status : 0,
      },
      {
        name: "BankCodes",
        iconUrl:
          `${billing}`,
        path: "/bankconnect/PayinBankCodes",
        children: [
          { name: "Payin BankCodes", path: "/bankconnect/PayinBankCodes" },
          { name: "Payout BankCodes", path: "/bankconnect/PayoutBankCodes"}
        ],
        authPermission: modulePesmission[5] ? modulePesmission[5].status : 0,
      },
      {
        name: "Merchant Onboarding",
        iconUrl:
          `${managemer}`,
        path: "/bankconnect/merchantAdmin",
        children: [{ name: "Merchant Admin", path: "/bankconnect/merchantAdmin" }],
        authPermission: modulePesmission[6] ? modulePesmission[6].status : 0,
      },
      {
        name: "Deposits",
        iconUrl:
          `${transaction}`,
        path: "/bankconnect/MerchantTrans",
        children: [
          { name: "Merchants Transaction ", path: "/bankconnect/MerchantTrans" },
        ],
        authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
      },
      {
        name: "Refunds",
        iconUrl:
          `${refund}`,
        path: "/bankconnect/MerchantRefunds",
        children: [
          { name: "Merchant Refund ", path: "/bankconnect/MerchantRefunds" },
        ],
        authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
      },
      {
        name: "Payouts",
        iconUrl:
          `${payout}`,
        path: "/bankconnect/PayoutMerchants",
        children: [
          { name: "Payout Merchant ", path: "/bankconnect/PayoutMerchants" },
        ],
        authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
      },
      {
        name: "SandBox",
        iconUrl:
          `${sanddeposit}`,
        path: "/bankconnect/SandBoxDeposits",
        children: [
          { name: "SandBox Deposits", path: "/bankconnect/SandBoxDeposits" },
          { name: "SandBox Payouts", path: "/bankconnect/SandBoxPayout" }
        ],
        authPermission: modulePesmission[8] ? modulePesmission[8].status : 0,
      },
      {
        name: "Add Funds",
        iconUrl:
          `${addfunds}`,
        path: "/bankconnect/AddFunds",
        children: [{ name: "Add Funds", path: "/bankconnect/AddFunds" }],
        authPermission: modulePesmission[10] ? modulePesmission[10].status : 0,
      },
      {
        name: "Local Settlement",
        iconUrl:
          `${localsettlement}`,
        path: "/bankconnect/LocalSettlement",
        children: [{ name: "Local Settlement", path: "/bankconnect/LocalSettlement" }],
        authPermission: modulePesmission[10] ? modulePesmission[10].status : 0,
      },
      {
        name: "International Settlement ",
        iconUrl:`${intersettlement}`,
        path: "/bankconnect/InternationalSettlement",
        children: [{ name: "International Settlement", path: "/bankconnect/InternationalSettlement" }],
        authPermission: modulePesmission[10] ? modulePesmission[10].status : 0,
      },
      {
        name: "Activity Logs",
        iconUrl:
          `${activity}`,
        path: "/bankconnect/AdminLogs",
        children: [
          { name: "Admin logs", path: "/bankconnect/AdminLogs" },
          { name: "Merchants Logs ", path: "/bankconnect/MerchantLogs" },
          { name: "Wallet Logs ", path: "/bankconnect/WalletLogs" },
          { name: "Currency Rate Logs ", path: "/bankconnect/CurrencyLogs" },
          { name: "Allow Payment Logs ", path: "/bankconnect/AllowPaymentLogs" },
        ],
        authPermission: modulePesmission[11] ? modulePesmission[11].status : 0,
      },
      {
          name: "Website Email",
          iconUrl:
           `${websiteemail}`,
          path: "/bankconnect/contact",
          children: [{ name: "Contact", path: "/bankconnect/contact" }],
          authPermission: modulePesmission[12] ? modulePesmission[12].status : 0,
        },
      {
        name: "Setting Module",
        iconUrl:
          `${setting}`,
        path: "/bankconnect/siteSetting",
        children: [
          { name: "Site Setup", path: "/bankconnect/siteSetting" },
          { name: "Currency Exchange", path: "/bankconnect/CurrencyRate" },
          { name: "Exchange", path: "/bankconnect/Exchange" },
          { name: "Block User", path: "/bankconnect/AllUpi" },
          { name: "Ip WhiteList", path: "/bankconnect/IPWhitelist" },
          { name: "Set Limit", path: "/bankconnect/Limit" },
          { name: "Merchant Child", path: "/bankconnect/SubMerchant" },
          { name: "Manage Payment Gateway", path: "/bankconnect/Cron" },
          { name: "Merchant Swap Gateway", path: "/bankconnect/MerchantSwap" },
        ],
        authPermission: modulePesmission[15] ? modulePesmission[15].status : 0,
      },
      {
        name: "Change Password",
        iconUrl:
          `${changepassword}`,
        path: "/bankconnect/ChangePassword",
        children: [{ name: "Change Password", path: "/bankconnect/ChangePassword" }],
        authPermission: modulePesmission[16] ? modulePesmission[16].status : 0,
      },
    ];
  }

  const sideBarPermissionLink = sidebarLink.filter(
    (item) => item.authPermission === 1
  );

  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose" : "openClose2"}
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
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src={logo}
                // src="./imges/adminlogo.svg"
                alt="adminLogo"
                width="200px"
              />
            ) : (
              <img src={logo} alt="adminLogo" width="200px" />
            )}
          </Typography>
          <div className="navLeft">
            {/* <Link to="ChangePassword" className="me-2 ">
              <img
                src="https://www.payoway.com/web/assets/ubankconnect/profile-image/6df347edc19697d5cb93e80b2d3c0d4c.png"
                alt=""
                width="42px"
                height="42px"
                className="golakrnewalaprofile"
              />
            </Link> */}
            <div >
              <img
                src={settingbar}
                alt=""
                width="40px"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sideBarPermissionLink.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex align-items-center">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive || (toggel && active === index)
                        ? "iconcontainer iconActive1 mx-2 my-1"
                        : "iconcontainer mx-1 my-1"
                    }
                  >
                    <img
                      src={item.iconUrl}
                      alt="not found"
                      width="23px"
                      height="23px"
                      className="m-3"
                      onClick={() => {
                        setActive(index);
                        setToggel(!toggel);
                      }}
                    />
                  </NavLink>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                    }
                    onClick={() => {
                      setActive(index);
                      setToggel(!toggel);
                    }}
                  >
                    {item.name}
                  </NavLink>
                  {item.children.length > 1 ? (
                    <div>
                      {toggel && active === index ? (
                        <UnfoldLessIcon
                          onClick={() => {
                            setActive(index);
                            setToggel(!toggel);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <AddIcon
                          onClick={() => {
                            setActive(index);
                            setToggel(!toggel);
                          }}
                          color="primary"
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
                {toggel && active === index ? (
                  <>
                    {item?.children.length > 1 &&
                      item.children.map((child, index) => (
                        <div
                          className="d-flex flex-column container"
                          key={index}
                        >
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              isActive
                                ? "linkNAme activeClass ms-5 container"
                                : "ms-5 linkNAme container"
                            }
                          >
                            {child.name}
                          </NavLink>
                        </div>
                      ))}
                  </>
                ) : null}
              </div>
            );
          })}
          <div className=" d-flex align-items-center">
            <img
              src={Logout}
              alt="not found"
              width="30px"
              height="30px"
              className="m-3"
              onClick={logout}
              style={{cursor:"pointer"}}
            />
            <div className="linkNAme mx-2" onClick={logout}>
              Logout
            </div>
          </div>
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
