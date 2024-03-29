import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();
function ContextProvider({ children }) {
  const [active, setActive] = React.useState(0);
  const [toggel, setToggel] = useState(false);
  const [role, setRole] = useState("");
  const [downloadStatement, setDownloadStatement] = useState([]);
  const [isLoginUser, setIsLoginUser] = useState(localStorage.getItem("user"));
  const [timeZoneVal, setTimeZoneVal] = useState("");
  const [accoutType, setAccoutType] = useState("");
  const [dropdownMerchant, setDropdownMerchant] = useState("")
  return (
    <StateContext.Provider
      value={{
        isLoginUser,
        setIsLoginUser,
        active,
        setActive,
        toggel,
        setToggel,
        role,
        setRole,
        downloadStatement,
        setDownloadStatement,
        timeZoneVal,
        setTimeZoneVal,
        accoutType,
        setAccoutType,
        dropdownMerchant,
        setDropdownMerchant
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
