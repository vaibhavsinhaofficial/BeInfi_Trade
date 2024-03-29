import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import baseUrl from '../../componentsMerchant/config/baseUrl';
import PieGraph from './Graph/PieGraph';
import { MdOutlineMonetizationOn } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import DashboardTable from './DashboardTable';
import { useLocation } from 'react-router-dom';
import deposit from './images/deposits.png'
import payouts from './images/payouts.png'
import settlements from './images/settlements.png'
import comissions from './images/comissions.png'

const Card = ({ className, name, amount, image, icons: Icon, iconColor, bgColor }) => {
  // Define the URL for each card using an object
  const detailPageUrls = {
    DEPOSITS: '/bankconnect/MerchantTrans',
    PAYOUTS: '/bankconnect/PayoutMerchants',
    SETTLEMENTS: '/bankconnect/InternationalSettlement',
    default: '/default-url',
  };
  const detailPageUrl = detailPageUrls[name] || detailPageUrls.default;

  return (
    <div className={`col-sm-3 position-relative mb-2 card1 rounded-3`} style={{ height: '8rem' }}>
      <div className={`card px-2 h-100 border-0 box ${className}`} style={{ borderRadius: '25px' }}>
        <div className="position-absolute top-0 start-0 fw-bold ps-3 pt-3 name">{name}</div>
        <div className="position-absolute top-50 start-0 ps-3 translate-middle-y fs-5 fw-bolder p-4 amount">₹{amount}</div>
        <div className="position-absolute bottom-0 start-0 ps-3 pb-3 fw-normal details">
          <Link to={detailPageUrl} className="details"><ins>See Details</ins></Link>
        </div>
        {/* <div className="position-absolute bottom-0 start-0 ps-3 pb-3 align-item-end justify-content-start "> */}
          <img src={image} alt={name} className="position-absolute bottom-0 end-0 pe-3 pb-3  " style={{ maxWidth: '45%', maxHeight: '45%',zIndex:'1' }} />
          {/* <div className="position-absolute top-50 end-0 pe-3 pt-3"><p className='p-1 rounded' style={{ color: iconColor, backgroundColor: bgColor }}><Icon size={25} /></p></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};


const Dashboard = () => {
  const location = useLocation();
  const loginName = location.state && location.state.loginName;
  const className = ['box1', 'box2', 'box3', 'box4'];
  const image=[deposit,payouts,settlements,comissions]
  const name = ['DEPOSITS', 'PAYOUTS', 'SETTLEMENTS', 'COMMISSIONS'];

  const [loading, setLoading] = useState(true); // Loading state
  const [dashboardData, setDashboardData] = useState([
    { id: 1, amount: null },
    { id: 2, amount: null },
    { id: 3, amount: null },
    { id: 4, amount: "5000" },
  ]);

  // PieGraph Data
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        width: '100',
        type: 'donut',
      },
      series: [],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      responsive: [
        {
          breakpoint:280,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        position: 'right'
      },
      colors: ["rgb(255,23,82)", "rgb(0,236,147)", "rgb(255,176,0)"]
      // dataLabels: {
      //   enabled: true,

      // },
      
    },
    loading: true, // Introducing loading state
    SuccessValue: null
  });

  //TableData for TopVendors
  const [vendorsData, setVendorsData] = useState({});

  //TableData for Currency
  const [currencyData, setCurrencyData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = localStorage.getItem('admin');
        const formData = new FormData();
        // Headers Configuration
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${auth}`
          }
        };

        // Fetch all data concurrently
        const [dashboardCardResponse, currencyResponse, topVendorsResponse, pieGraphResponse] = await Promise.all([
          axios.post(`${baseUrl}/dasboard_cardData`, formData, config),
          axios.post(`${baseUrl}/currency_data`, formData, config),
          axios.post(`${baseUrl}/top_vendors`, formData, config),
          axios.post(`${baseUrl}/piegraph_data`, formData, config),
        ]);

        const dashboardCardData = dashboardCardResponse.data.data;
        const topVendorsData = topVendorsResponse.data.data;
        const currencyData = currencyResponse.data.data;
        const pieGraphData = pieGraphResponse.data.data; // Extract data object
        const cardData = Object.values(dashboardCardData).map(value => {
          if (typeof value === 'string') {
            return parseFloat(value.replace(/,/g, ''));
          } else {
            return value;
          }
        });

        const SuccessValue = pieGraphData.status_1_sum;

        // Define mapping object for legend labels
        const labelMapping = {
          status_1_sum: 'Success',
          status_3_sum: 'Pending',
          status_0_sum: 'Failed',   
          status_2_sum: 'Waiting',  
          status_4_sum: 'Refund',
          status_5_sum: 'Chargeback',
        };

        // Extract series data and keys from the response
        const filteredData = Object.entries(pieGraphData)
          .filter(([key, value]) => ![2, 4, 5].includes(parseInt(key.split('_')[1])))
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});

        const seriesData = Object.values(filteredData).map(value => parseFloat(value.replace(/,/g, '')));
        const keys = Object.keys(filteredData);

        // Replace keys with labels using the mapping object
        const labels = keys.map(key => labelMapping[key]);

        // Update chartData state with the series data and labels
        setChartData(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            series: seriesData,
            labels: labels, // Use labels for legend

          },
          loading: false, // Update loading state once data is fetched
          SuccessValue: SuccessValue
        }));
        setDashboardData(prevState => prevState.map((item, index) => ({
          ...item,
          amount: index === 3 ? item.amount : cardData[index]
        })));
        setVendorsData(topVendorsData);
        setCurrencyData(currencyData);
      } catch (error) {
        console.log('API error:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container px-0" >
      {loading ? (
        <>
        {/* Data while loading */}
          <div className="d-flex justify-content-center align-items-center ">
            <div className='text-center'>
              <h4 className='fw-bold' style={{ color: '#ff6600' }}>Hey {loginName} !</h4>
              <h5 className='fw-bold' style={{ color: '#ff6600' }}>Please wait...</h5>
            </div>
          </div>
        </>
      ) : (
        <>
        {/* Data after loading */}
          <h4 className='fw-bold ' style={{ color: '#ff6600' }}>Hey {loginName} !</h4>
          <h5 className='fw-bold' style={{ color: '#ff6600' }}>Welcome To UBankconnect Dashboard!</h5>
          {/* First row */}
          <div className="row sparkboxes">
            {dashboardData.map((item, index) => (
              // Dashboard Card Data
              <Card
                key={item.id}
                className={className[index]}
                name={name[index]}
                amount={item.amount}
                image={image[index]} // Pass the image URL as a prop
              />
            ))}
          </div>

          {/* Second Row */}
          <div className="row my-2 ">
            {/* PieGraph According to status */}
            <div className="col-xs-12 col-sm-4 mb-2 ">
              <PieGraph chartData={chartData} />
            </div>

            {/* Top Vendors Table */}
            <div className="col-xs-12 col-sm-3 mb-2 ">
              {vendorsData && (<DashboardTable data={vendorsData} title="Top Vendors" />)}
            </div>

            {/* Currency Table */}
            <div className="col-xs-12 col-sm-5 mb-2 ">
              {currencyData && <DashboardTable data={currencyData} title="Transaction Details" />}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
