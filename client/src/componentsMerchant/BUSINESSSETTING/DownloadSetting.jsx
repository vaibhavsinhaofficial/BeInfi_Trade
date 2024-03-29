import React, { useState, useEffect} from 'react';
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config/baseUrl.js";
const token = localStorage.getItem("user");


const DownloadTable = () => {
  const [profile, setProfile] = useState([]);
  const [country, setCountry] = useState([]);
  const [mode_solution, setMode_solution] = useState([])

  const ReadData = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/BusnissDownload`,
        formData,
        config
      );
      setProfile(result.data.default[0])
      setCountry(result.data.buisness_country[0])
      setMode_solution(result.data.countryResult)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    ReadData()
  },[])

  return (
    <>
      <table className="table" style={{ border: "2px solid #000" }}>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Profile</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">Name</th>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Email</th>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Profile Completed</th>
            <td>
              {profile.complete_profile === 1 ? (
                <h6>Completed</h6>
              ) : (
                <h6>Incompleted</h6>
              )}
            </td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Merchant Key</th>
            <td>{profile.id}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Secret Key</th>
            <td>{profile.secretkey}</td>
          </tr>
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Company Profile</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">Company Name</th>
            <td>{profile.bname}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Trading As / Doing Business As (DBA) </th>
            <td>{profile.trading_dba}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Registered Address</th>
            <td>{profile.blocation}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Company Number / Registration Number </th>
            <td>{profile.busines_Code}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Country of Incorporation</th>
            <td>{country.name}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Main Contact Person</th>
            <td>{profile.fname}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Main Contact Email Address</th>
            <td>{profile.main_contact_email}</td>
          </tr>
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Solutions Applying For</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">Solutions and Payment Methods</th>
            <td>
              <div>
                {mode_solution?.map((item,index)=>{
                  return(
                    <>
                      <h6 className="tableHead">{item.name} ({item.sortname})</h6>
                        {item.methods.map((d, i)=>{
                          return(
                            <>
                              <li style={{marginBottom: "-20px"}}>{d.name} - {d.type}</li> <br/>
                            </>
                          )
                        })}
                    </>
                  )})
                }
              </div>
            </td>
          </tr>          
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Director’s Info</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr className="boldheading">Director 1 Info</tr>
          {/* <tr>
            <td></td>
            <th colSpan={4} className="boldheading">Director 1 Info</th>
          </tr> */}
          <tr>
            <th colSpan={4} className="tableHead">Full Name</th>
            <td>{profile.director1_name}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Date of Birth</th>
            <td>{profile.director1_dob}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Nationality</th>
            <td>{profile.director1_nationality}</td>
          </tr> 
          <tr className="boldheading">Director 2 Info</tr>       
          {/* <tr>
            <td></td>
            <th colSpan={4} className="boldheading">Director 2 Info</th>
          </tr> */}
          <tr>
            <th colSpan={4} className="tableHead">Full Name</th>
            <td>{profile.director2_name}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Date of Birth</th>
            <td>{profile.director2_dob}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Nationality</th>
            <td>{profile.director2_nationality}</td>
          </tr>        
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Sharholder’s Info</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr className="boldheading">Shareholder 1 Info</tr>
          {/* <tr>
            <td></td>
            <th colSpan={4} className="boldheading">Shareholder 1 Info</th>
          </tr> */}
          <tr>
            <th colSpan={4} className="tableHead">Full Name</th>
            <td>{profile.shareholder1_name}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Date of Birth</th>
            <td>{profile.shareholder1_dob}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Nationality</th>
            <td>{profile.shareholder1_nationality}</td>
          </tr> 
          <tr className="boldheading">Shareholder 2 Info</tr>       
          {/* <tr>
            <td></td>
            <th colSpan={4} className="boldheading">Shareholder 2 Info</th>
          </tr> */}
          <tr>
            <th colSpan={4} className="tableHead">Full Name</th>
            <td>{profile.shareholder2_name}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Date of Birth</th>
            <td>{profile.shareholder2_dob}</td>
          </tr>        
          <tr>
            <th colSpan={4} className="tableHead">Nationality</th>
            <td>{profile.shareholder2_nationality}</td>
          </tr>        
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Business Info</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">Website / Processing URL</th>
            <td>{profile.website}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Nature Of Buisness</th>
            <td>{profile.job_title}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Estimated Monthly Volume per Market (in USD)</th>
            <td>{profile.company_estimated_monthly_volume}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Average Ticket Size (in USD)</th>
            <td>{profile.company_avarage_ticket_size}</td>
          </tr>
        </tbody>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Settlement Info</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">International Settlement Currency</th>
            <td>{profile.settle_currency}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Crypto Wallet Address (Optional)</th>
            <td>{profile.wallet_url}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

function DownloadSetting() {
  const { downloadStatement } = useStateContext();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="row containerdownlodSett my-4">
        <div className="row mb-3">
          <div className="col-6">
            <button
              className="print"
              onClick={() => window.print()}
            >
              🖶 Print
            </button>
          </div>
          <div className="col-6">
            <button className="backButton">
              <Link to="/bankconnect/merchant/BusinessSetting" style={{ color: "#fff" }}>
                Back
              </Link>
            </button>
          </div>
        </div>
        <div className="col-12">
          <DownloadTable downloadStatement={downloadStatement} />
        </div>
      </div>
    </div>
  );
}

export default DownloadSetting