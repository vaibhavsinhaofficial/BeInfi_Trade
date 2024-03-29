import axios from 'axios';
import React, { useEffect, useState } from 'react'
import baseUrl from '../config/baseUrl';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UploadDocument() {
    const [uploadState, setUploadState] = useState("");
    let { id } = useParams();
    const auth = localStorage.getItem("user");

    const onChangeUploadDocument = (e) => {
      const selectedId = e.target.value;
      const selecteduploadState = Data.filter((d) => d.id == selectedId)[0];
      setUploadState(selecteduploadState);
    };

    useEffect(() => {
      setUploadState(Data[0]);
    }, []);

    const [image, setImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const navigate = useNavigate();
    function handleImage(e) {
      setImage(e.target.files[0])
    }
    function handleImage1(e) {
      setImage1(e.target.files[0])
    }
    function handleImage2(e) {
      setImage2(e.target.files[0])
    }
    function handleImage3(e) {
      setImage3(e.target.files[0])
    }

    function handleApi() {
      const formData = new FormData();
      
      formData.append("filterType", uploadState.id)
      formData.append("id", id)
      formData.append("image", image)
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = axios.post(`${baseUrl}/uploadDocument`, formData, config)
      toast.success(result.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/merchant/BusinessSetting");

    }

    const Data = [
      {
        id: "",
        options: "Select Category",
        upload:
        "",
      },
      {
        id: "1",
        options: "LLP/Private Limited/Public Limited",
        upload:
        <div className="drop-area">
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              1. Proof of Business Identity
              <ul>
                <li><small>Certificate of Incorporation</small></li> 
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              2. Proof of Business Existence
              <ul>
                <li><small>Income Tax Registration (Company PAN Card)</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage1} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              3. Proof of Identity of Business Owners and Authorised Signatory
              <ul>
                <li><small>Government-approved authorised signatory identity proof (like Aadhar Card/Voter Card/DL/Passport and so on.)</small></li>
                <li><small>Authorised signatory PAN Card details.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage2} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              4. Proof of Business Working
              <ul>
                <li><small>Current Account Statement (past three months) Or</small></li>
                <li><small>Cancelled cheque Or first page of settlement account.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage3} />
          </div>
        </div>,
      },
      {
        id: "2",
        options: "Partnership",
        upload:
        <div className="drop-area">
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              1. Proof of Business Identity
              <ul>
                <li><small>Certificate of Incorporation</small></li> 
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              2. Proof of Business Existence
              <ul>
                <li><small>Income Tax Registration (Company PAN Card)</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage1} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              3. Proof of Identity of Business Owners and Authorised Signatory
              <ul>
                <li><small>Government-approved authorised signatory identity proof (like Aadhar Card/Voter Card/DL/Passport and so on.)</small></li>
                <li><small>Authorised signatory PAN Card details.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage2} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              4. Proof of Business Working
              <ul>
                <li><small>Current Account Statement (past three months) Or</small></li>
                <li><small>Cancelled cheque Or first page of settlement account.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage3} />
          </div>
        </div>,
      },
      {
        id: "3",
        options: "Sole Proprietorship",
        upload:
        <div className="drop-area">
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              1. Proof of Business Identity
              <ul>
                <li><small>Certificate of Incorporation</small></li> 
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              2. Proof of Business Existence
              <ul>
                <li><small>Income Tax Registration (Company PAN Card)</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage1} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              3. Proof of Identity of Business Owners and Authorised Signatory
              <ul>
                <li><small>Government-approved authorised signatory identity proof (like Aadhar Card/Voter Card/DL/Passport and so on.)</small></li>
                <li><small>Authorised signatory PAN Card details.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage2} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              4. Proof of Business Working
              <ul>
                <li><small>Current Account Statement (past three months) Or</small></li>
                <li><small>Cancelled cheque Or first page of settlement account.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage3} />
          </div>
        </div>,
      },
      {
        id: "4",
        options: "Trust/NGO",
        upload:
        <div className="drop-area">
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              1. Proof of Business Identity
              <ul>
                <li><small>Certificate of Incorporation</small></li> 
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              2. Proof of Business Existence
              <ul>
                <li><small>Income Tax Registration (Company PAN Card)</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage1} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              3. Proof of Identity of Business Owners and Authorised Signatory
              <ul>
                <li><small>Government-approved authorised signatory identity proof (like Aadhar Card/Voter Card/DL/Passport and so on.)</small></li>
                <li><small>Authorised signatory PAN Card details.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage2} />
          </div>
          <div className="form-group" style={{padding: "10px"}}>
            <label>
              4. Proof of Business Working
              <ul>
                <li><small>Current Account Statement (past three months) Or</small></li>
                <li><small>Cancelled cheque Or first page of settlement account.</small></li>
              </ul>
            </label>
            <input className="form-control" type='file' name='file' onChange={handleImage3} />
          </div>
        </div>,
      },
    ];
  return (
    <>
      <div className='chartblockshdow'>
      <div className="row mb-3">
        <div className="col-6">
          <h3>KYC Document Upload</h3>
        </div>
        <div className="col-6 text-end">
          <Link to={'/bankconnect/merchant/BusinessSetting'}>
            <button className='btn' style={{background: "#1caae8", color: "#fff"}}>Back</button>
          </Link>
        </div>
      </div>
        <h6 className="mb-3">KYC Documents Extension allow : <span style={{color: "red"}}>gif,jpg,png,jpeg,pdf</span></h6>
        <select
          className="form-control mb-3"
          value={uploadState?.id}
          onChange={(e) => {
            onChangeUploadDocument(e);
          }}
        >
          {Data.map((d) => (
            <option key={d.id} value={d.id}>
              {d.options}
            </option>
          ))}
        </select>
        {uploadState ? (
        <>
        {uploadState?.upload}
        </>
        ) : (
          ""
        )}

        <div className='mt-4 mb-3'>
          <button className="btnSave" type="button" 
            onClick={handleApi}
            >Upload
          </button>
        </div>
      </div>
    </>
  )
}

export default UploadDocument