import React,{useState } from 'react';
import axios from 'axios';
import baseUrl from "../config/baseUrl";
import { Link, useNavigate } from "react-router-dom";

function AddTicket() {
  const [image, setImage] = useState("");
  const [ticketFor, setTicketFor] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();
  function handleImage(e) {
    setImage(e.target.files[0])
  }

  function handleApi() {
    const formData = new FormData();
    formData.append("ticket_for", ticketFor);
    formData.append("description", description)
    const auth = localStorage.getItem("user");
    formData.append("images", image)
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let result = axios.post(`${baseUrl}/generateTicket`, formData, config)
    navigate("/merchant/Help");

  }

  return (
    <>
      {/* <div>
          <input type='file' name='file' onChange={handleImage} />
          <button onClick={handleApi}>Save</button>
      </div> */}
      <div className='chartblockshdow'>
        <div className="row">
          <div className="col-6">
            <h2>GENERATE TICKET</h2>
          </div>
          <div className="col-6 text-end">
            <Link to="/merchant/Help">
              <button className='btn btn-danger'>Back</button>
            </Link>
          </div>
        </div>
        <div className="row">
            <div className="col-12 mb-3">
                <form action="" className="row justify-content-around">
                    <div className="form-group" style={{padding: "10px"}}>
                        <label>Generate Ticket For</label>
                        <select className="form-control" onChange={(e)=>setTicketFor(e.target.value)}>
                            <option value=""> Select Generate Ticket For</option>
                            <option value="1"> Deposit</option>
                            <option value="2"> Payout</option>
                            <option value="3"> Selttlement</option>
                            <option value="4"> Techinical Support</option>
                        </select>
                    </div>
                    <div className="form-group" style={{padding: "10px"}}>
                        <label>Description</label>
                        <textarea className="form-control" onChange={(e)=>setDescription(e.target.value)} placeholder="Description" rows="8"></textarea>
                    </div>
                    <div className="form-group" style={{padding: "10px"}}>
                        <label>Attachment</label>
                        <input className="form-control" type='file' name='file' onChange={handleImage} />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={handleApi}>Save</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default AddTicket