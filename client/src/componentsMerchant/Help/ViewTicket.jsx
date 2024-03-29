import React, { useState, useEffect } from 'react'
import baseUrl from '../config/baseUrl';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import images from "../../images"


function ViewTicket() {
    const auth = localStorage.getItem("user");
    let { id } = useParams();
    const [date, setDate] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [tokenNo, setTokenNo] = useState([]);
    const [status, setStatus] = useState([]);
    const [imageData, setImageData] = useState([])
    const imgPath = '../../../images/';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const ReadData = async () => {
        try {
          const values = {id: id}
          const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(
            `${baseUrl}/help_view`,
            values,
            config
          );
          setDate(result.data.result1[0].date);
          setTicket(result.data.result1[0].ticket_for);
          setTokenNo(result.data.result1[0].ticket);
          setStatus(result.data.result1[0].status);
          setImageData(result.data.result2)
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
    ReadData();
    }, [""]);
    
    return (
        <>
            <div className='chartblockshdow'>
                <div className="row mb-5">
                    <div className="col-6">
                        <h2>Support Ticket</h2>
                    </div>
                    <div className="col-6 text-end">
                        <Link to="/merchant/Help">
                            <button className='btn btn-primary'>Back</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <h6 style={{fontWeight: "700", marginTop: "10px"}}>Date: {date}</h6>
                    </div>
                    <div className="col-2">
                        <h6 style={{fontWeight: "700", marginTop: "10px"}}>
                        Ticket For: {ticket === 1 ? "Deposit" : ticket === 2 ? "Payout" : ticket === 3 ? "Settlement" : "Technical Support"}
                        </h6>
                    </div>
                    <div className="col-3">
                        <h6 style={{whiteSpace: "nowrap", fontWeight: "700", marginTop: "10px"}}>Token No: {tokenNo}</h6>
                    </div>
                    <div className="col-2 text-end">
                        <h6 style={{fontWeight: "700"}}>
                        Status:&nbsp; &nbsp;
                        {status === 0 ? <button className='btn btn-primary'>Pending</button> : status === 1 ? <button className='btn btn-danger'>Closed</button> : <button className='btn btn-success'>Open</button>}
                        </h6>
                    </div>
                    <div className="col-3 text-end">
                        <Link to='AddTicket'>
                            {status === 1 ? "" : <button className='btn btn-danger'>Express Issue</button>}
                        </Link>
                    </div>
                </div>
                <hr/>
                <h2 style={{textAlign: "center"}}>
                    Description
                </h2>
                <hr/>
                <div className="">
                {
                    imageData.map((item, index) => {
                    return (
                        <>
                            <div className="info">  
                                <div className="img-cont"> 
                                    <img src= {imgPath + item.images} onClick={() => openModal(imgPath + item.images)} alt='' width={200} height={120} style={{marginBottom: "10px", cursor: "pointer", padding: "2px", border: "1px solid #ccc"}}/>
                                    {isModalOpen && <Modal closeModal={closeModal} imageSrc={selectedImage}/>}
                                </div>
                                <div className="description">{item.description}</div>
                                <div className="profileinfo">
                                    You <div> {item.date}</div>
                                </div>
                            </div>
                        </>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

function Modal({ closeModal, imageSrc }) {
    return (
      <div className="modal" style={modalStyle}>
        <div className="modal-content" style={modalContentStyle}>
            <div className="modal-header mb-3">
                <h4 className="modal-title">Image Preview</h4>
                <button onClick={closeModal} style={{background: "transparent"}}><i className="fa fa-close" style={{fontSize: "36px", color: "#fff"}}></i></button>
            </div>
            <img src={imageSrc} alt="modalImg" style={imageStyle} />
        </div>
      </div>
    );
}

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
  
const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    display: 'block'
};
  
const imageStyle = {
    width: '400px',
    height: '300px',
    objectFit: 'contain',
};



export default ViewTicket