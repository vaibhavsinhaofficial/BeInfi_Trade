import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useStateContext } from "../../../context/ContextProvider";
import quickprevious from "./imgs/quick-previous.svg"
import newLogo from "./imgs/newlogo.svg"

// Sidebar Icons
import dashboard from "./imgs/virtual-terminal.svg"
// import bankdeposit from "./imgs/abc.svg"
import payout from "./imgs/payout.svg"
import addfund from "./imgs/addfunds.svg"
import localsettle from "./imgs/localsettlement.svg"
import intersettle from "./imgs/intersettlement.png"
import disputes from "./imgs/disputes.svg"
// import dashboard from "./imgs/virtual-terminal.svg"
// import dashboard from "./imgs/virtual-terminal.svg"
// import dashboard from "./imgs/virtual-terminal.svg"

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

export default function SettlementSidebar({modulePesmission}) {
  const [open, setOpen] = React.useState(true);
  const {setIsLoginUser} = useStateContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("admin");
    localStorage.clear("role");
    setIsLoginUser(undefined);
    navigate("/bankconnect");
  };

  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl:
        `${dashboard}`,
      path: "/bankconnect/SettlementDashboard",
      authPermission:1
    },
    {
      name: "Bank Deposit Received",
      iconUrl:
        `${payout}`,
      path: "/bankconnect/BankDepositReceived",
      authPermission: modulePesmission[0] ? modulePesmission[0].status : 0,
    },
    {
      name: "Local Payouts",
      iconUrl: `${payout}`,
      path: "/bankconnect/LocalPayouts",
      authPermission: modulePesmission[1] ? modulePesmission[1].status : 0,
    },
    {
      name: "Add Funds",
      iconUrl:
        `${addfund}`,
      path: "/bankconnect/AddFunds",
      authPermission: modulePesmission[2] ? modulePesmission[2].status : 0,
    },
    {
      name: "Local Settlement",
      iconUrl:
        `${localsettle}`,
      path: "/bankconnect/LocalSettlement",
      authPermission: modulePesmission[3] ? modulePesmission[3].status : 0,
    },
    {
      name: "International Settlement ",
      iconUrl:`${intersettle}`,
      path: "/bankconnect/InternationalSettlement",
      authPermission: modulePesmission[4] ? modulePesmission[4].status : 0,
    },
    {
      name: "Disputes/Chargeback",
      iconUrl:
        `${disputes}`,
      path: "/bankconnect/DisputesChargebacks",
      authPermission: modulePesmission[5] ? modulePesmission[5].status : 0,
    },
    {
      name: "Refunds",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/refund.svg",
      path: "/bankconnect/Refunds",
      authPermission: modulePesmission[6] ? modulePesmission[6].status : 0,
    },
    {
      name: "Reports",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/reports.svg",
      path: "/bankconnect/Reports",
      authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
    },
    {
      name: "Change Password",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/password.svg",
      path: "/bankconnect/ChangePassword",
      authPermission: modulePesmission[8] ? modulePesmission[8].status : 0,
    },
  ];

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
      <AppBar position="fixed" open={open} className="settlementappBar">
        <Toolbar className="settlementappBarcom">
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src={newLogo}
                alt="not found"
                width="200px"
              />
            ) : (
              <img src={newLogo} alt="" width="200px" />
            )}
          </Typography>
          {/* <div className="settlementnavLeft">
            
            
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="./imgs/profile.svg"
                alt=""
                width="40px"
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="mx-2">
              <span style={{ fontSize: "14px" }}>UBankConnect</span>
              
            </div>
          </div> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sideBarPermissionLink.map((item, index) => {
            return (
              <div className="settlementsidebarcontainer mb-3 " key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? " settlementiconcontainer mx-2 settlementiconActive"
                      : " settlementiconcontainer mx-2"
                  }
                >
                  <img src={item.iconUrl} alt="" className="settlementiconstyle" onClick={() => (item.name === "Logout" ? logout() : null)} />
                </NavLink>

                <div>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "settlementlinkNAme settlementactiveClass mx-2" : "settlementlinkNAme mx-2"
                    }
                    onClick={() => (item.name === "Logout" ? logout() : null)}
                  >
                    {item.name}
                  </NavLink>
                </div>
              </div>
            );
          })}
          <div className=" d-flex align-items-center">
            <img
              src="https://www.bankconnect.online/assets/merchants/img/log-out.svg"
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
