import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';
import baseUrl from '../../config/baseUrl';
import ecommerce from "./imgs/e-commerce1.png";
import ngo from "./imgs/ngo1.png";
import govt from "./imgs/government1.png";
import edu from "./imgs/education1.png";
import { toast } from "react-toastify";

const Category = ({ title, icon, id, fetchSwitchingData, selectedGateways, setSelectedGateways, charges, setCharges, onSelectCategory }) => {
  const [gatewayName, setGatewayName] = useState([]);

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append('id', id);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      let result = await axios.post(`${baseUrl}/default_inr`, formData, config);
      setGatewayName(result.data.filteredBanks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccordionClick = () => {
    fetchSwitchingData(id);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const renderOptions = () => {
    return gatewayName?.map((item, index) => (
      <option key={index} value={item.payment_gate}>
        {item.waynames}
      </option>
    ));
  };

  const handleGatewayChange = (index, event) => {
    const value = event.target.value;
    setSelectedGateways(index, value);
  };

  const handleChargeChange = (index, event) => {
    const value = event.target.value;
    setCharges(index, value);
  };

  const renderCategoryBody = () => {
    return (
      <>
        <div className="row">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col rowText">
              PREFERENCE-{index + 1}
            </div>
          ))}
          <div className="col rowText" style={{ textAlign: 'center' }}>
            Action
          </div>
        </div>
        <hr />
        <div className="row">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col" style={{ textAlign: 'center' }}>
              <select className="form-control upiSelect"
                value={selectedGateways[index]}
                onChange={(event) => handleGatewayChange(index, event)}
                style={{fontWeight: "700", color: "#0c63e7"}}
              >
                <option>Select Gateway</option>
                {renderOptions()}
              </select>
              <input type="text" placeholder="Charge" className="form-control upiInput"
                value={charges[index]}
                onChange={(event) => handleChargeChange(index, event)}
                style={{fontWeight: "700", color: "#0c63e7"}}
              />
            </div>
          ))}
          <div className="col" style={{ textAlign: 'center' }}>
            <button className="btn upiSave" onClick={() => onSelectCategory()}>Save</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header onClick={handleAccordionClick}>
        <div className="currencyBox">
          <div className="upiheading">
            <h2>
              <img src={icon} alt="" />
              <span style={{ marginTop: '10px' }}>{title}</span>
            </h2>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>{renderCategoryBody()}</Accordion.Body>
    </Accordion.Item>
  );
};

function UPI() {
  const { id } = useParams();
  const [selectedGateways, setSelectedGateways] = useState(["", "", "", ""]);
  const [charges, setCharges] = useState(["", "", "", ""]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchSwitchingData = async (category) => {
    try {
      let formData = new FormData();
      formData.append('merchantno', id);
      formData.append('type', 2);
      formData.append('category', category);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      let result = await axios.post(`${baseUrl}/defautlSwitchingData`, formData, config);
      const data = result.data[0];
      setSelectedGateways([
        data?.gateway_1 || "",
        data?.gateway_2 || "",
        data?.gateway_3 || "",
        data?.gateway_4 || "",
      ]);

      setCharges([
        data?.charges_1 || "",
        data?.charges_2 || "",
        data?.charges_3 || "",
        data?.charges_4 || "",
      ]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e, category, selectedGateways, charges) => {
    e.preventDefault();

    try {
      // console.log(category);
      console.log(category, selectedGateways, charges);
      const formData = new FormData();
      formData.append('category', category);
      formData.append('id', id);
      formData.append('type', 2);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      selectedGateways.forEach((gateway, index) => {
        formData.append(`gateways_${index}`, gateway || "");
      });
  
      charges.forEach((charge, index) => {
        formData.append(`charges_${index}`, charge || "");
      });

      const result = await axios.post(
        `${baseUrl}/update_inrInsert_inr`, 
        formData, 
        config
      );

      console.log(result);

      toast.success('Gateway Preference Updated', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate("/bankconnect/merchantAdmin");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, selectedCategory, selectedGateways, charges)}>
        <div className="chartblockshdow">
          <div className="row">
            <div className="col-10">
              <h2 style={{ textAlign: 'center' }}>CATEGORIES</h2>
            </div>
            <div className="col-2">
              <Link to={`/bankconnect/INR/${id}`}>
                <button className="btn inrBack">Back</button>
              </Link>
            </div>
          </div>
          <Accordion className="mt-4">
            <Category title="E-COMMERCE" icon={ecommerce} id="4" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("4")}
            />
            <Category title="NGO/TRUST" icon={ngo} id="2" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("2")}
            />
            <Category title="GOVERNMENT SERVICES" icon={govt} id="1" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("1")}
            />
            <Category title="EDUCATION" icon={edu} id="3" 
              fetchSwitchingData={fetchSwitchingData}
              selectedGateways={selectedGateways}
              setSelectedGateways={(index, value) => {
                const updatedGateways = [...selectedGateways];
                updatedGateways[index] = value;
                setSelectedGateways(updatedGateways);
              }}
              charges={charges}
              setCharges={(index, value) => {
                const updatedCharges = [...charges];
                updatedCharges[index] = value;
                setCharges(updatedCharges);
              }}
              onSelectCategory={() => handleCategorySelect("3")}
            />
          </Accordion>
        </div>
      </form>
    </>
  );
}

export default UPI;
