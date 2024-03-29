import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import "./filter.css";
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

const CheakboxComp = ({ name,value,onChange,checked }) => {
  return (
    <>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={value} onChange={onChange} checked={checked} />
        <label className="cheackboxlable">{name}</label>
      </div>
    </>
  );
};



function Filter({
  methodPayment,
  setMethodPayment,
  currencyPayment,
  setCurrencyPayment,
  statusPayment,
  setStatusPayment,
  setDate,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show1, setShow1] = React.useState(true);
  const [show2, setShow2] = React.useState(true);
  const [show3, setShow3] = React.useState(true);

  const [choosedCurrency, setChoosedCurrency] = useState([])

  useEffect(() => {
    
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/teamMerchantChoosedCurrency`, formData, config)
      .then((res) => {
        setChoosedCurrency( res?.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = (e) => {
    const selectedValue = e.target.value;
    if (e.target.checked) {
      setCurrencyData([...currencyData, selectedValue]);
    } else {
      setCurrencyData(currencyData.filter((item) => item !== selectedValue));
    }
  };

  // Cheak Value Status
  const [methordData, setMethordData] = useState([]);

  // Status
  const [statusData, setStatusData] = useState([]);

  // Currency
  const [currencyData, setCurrencyData] = useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = () => {
    setShow1(!show1);
  };
  const handleClick2 = () => {
    setShow2(!show2);
  };
  const handleClick3 = () => {
    setShow3(!show3);
  };

  const cheakValue = (e) => {
    e.preventDefault();
    setDate((pre) => (pre = undefined));
    setMethodPayment([...new Set(methordData)]);
    setStatusPayment([...new Set(statusData)]);
    setCurrencyPayment([...new Set(currencyData)]);
    handleClose();
  };
  return (
    <div>
      <button
        className="filterdeposite "
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/filter.png"
          alt=""
          width="20px"
          className="mx-2"
        />
        Filter
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="my-3"
      >
        <div
          className="boxcontainer"
          style={{ height: show1 || show2 || show3 ? "47vh" : "" }}
        >
          <div className="row m-4 ">
            <div className="col-4 ">
              <button className="buttondate" onClick={handleClick1}>
                Method
              </button>
            </div>
            <div className="col-4">
              <button className="buttondate" onClick={handleClick2}>
                Status
              </button>
            </div>
            <div className="col-4">
              <button className="buttondate" onClick={handleClick3}>
                Currency
              </button>
            </div>
          </div>

          {show1 || show2 || show3 ? (
            <form className="row m-4  boxcontainer2">
              <div className="col-4  ">
                {show1 ? (
                  <>
                    <CheakboxComp
                      name="UPI"
                      value="UPI"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          :  setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("UPI")}
                    />
                    <CheakboxComp
                      name="Crypto"
                      value="CRYPTO"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          :  setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("CRYPTO")}
                    />
                    <CheakboxComp
                      name="Net Banking"
                      value="NetBanking"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          : setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("NetBanking")}
                    />
                    <CheakboxComp
                      name="CREDIT CARD"
                      value="CREDIT CARD"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          : setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("CREDIT CARD")}
                    />
                    <CheakboxComp
                      name="DEBIT CARD"
                      value="DEBIT CARD"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          : setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("DEBIT CARD")}
                    />
                    <CheakboxComp
                      name="E-Wallet"
                      value="Wallet"
                      onChange={(e) =>
                        e.target.checked
                          ? setMethordData([...methordData, e.target.value])
                          : setMethordData(
                            methordData.filter((item) => item !== e.target.value))
                      }
                      checked={methordData.includes("Wallet")}
                    />
                  </>
                ) : null}
              </div>

              <div className="col-4  ">
                {show2 ? (
                  <>
                    <CheakboxComp
                      name="Success"
                      value={1}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("1")}
                    />
                    <CheakboxComp
                      name="Waiting"
                      value={2}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("2")}
                    />
                    <CheakboxComp
                      name="Pending"
                      value={3}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("3")}
                    />
                    <CheakboxComp
                      name="Refund"
                      value={4}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("4")}
                    />
                    <CheakboxComp
                      name="Chargeback"
                      value={5}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("5")}
                    />
                    <CheakboxComp
                      name="Failed"
                      value={0}
                      onChange={(e) =>
                        e.target.checked
                          ? setStatusData([...statusData, e.target.value])
                          : setStatusData(
                            statusData.filter((item) => item !== e.target.value))
                      }
                      checked={statusData.includes("0")}
                    />
                  </>
                ) : null}
              </div>
              <div className="col-4 choosedCurrency">
              {
                choosedCurrency.length === 1 ? (
                  <>
                    <h6>You have choose only {choosedCurrency} currency</h6>
                  </>
                ) : (
                  <>
                    {show3 ? (
                      <>
                      {
                        choosedCurrency.map((item, index) => {
                          return (
                            <>
                            <CheakboxComp
                              key={item}
                              name={item}
                              value={item}
                              onChange={handleCheckboxChange}
                              checked={currencyData.includes(item)}
                            />
                            </>
                            );
                        })
                      }
                      </>
                    ) : null}
                  </>
                )
              }
              </div>
              <div style={{ width: "10rem" }}>
                <button className="buttondate my-4" onClick={cheakValue}>
                  Done
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </Menu>
    </div>
  );
}

export default Filter;