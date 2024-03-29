import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../componentsAdmin/config/baseUrl";

function FilterMerchant({ setMerchantSelect, adminfilter }) {
  const auth = localStorage.getItem("admin");
  const [merchant, setMerchant] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      try {
        let formData = new FormData();
        adminfilter && formData.append("adminfilter", adminfilter)
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(
          `${baseUrl}/allMerchant`,
          formData,
          config
        );

        if (result.data.Data) {
          setMerchant(result.data.Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <>
      <select className="form-select depositSelect" onChange={(e) => setMerchantSelect(e.target.value)} style={{ borderRadius: "20px" }}>
        <option key="default">{adminfilter ? "Admin" : "Merchant"}</option>
        {merchant.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>

    </>
  );
}

export default FilterMerchant;
