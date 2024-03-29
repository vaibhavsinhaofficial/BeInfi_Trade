import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import baseUrl from '../config/baseUrl';
import './styles.css';
import { useStateContext } from "../../context/ContextProvider";


//Deposits Graph
const SparkLineGraph2 = () => {
  const { dropdownMerchant } = useStateContext();
  const [seriesData, setSeriesData] = useState([{ name: "# of trans", data: [], color: '#259ffb' }]);
  const [options, setOptions] = useState({
    chart: {
      height: '100%',
      type: 'line',
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#259ffb']
    },
    title: {
      text: 'Deposits',
      style: {
        fontSize: '15px',
        fontWeight: '700',
        color: '#259ffb'
      }
    },
    subtitle: {
      text: '',
      style: {
        fontSize: '25px',
        fontWeight: '600',
        color: '#259ffb'
      }
    },
    grid: {
      row: {
        colors: ['#ffffff', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['00:00-04:00', '04:01-08:00', '08:01-12:00', '12:01-16:00', '16:01-20:00', '20:00-23:59'],
    }
  });

  const fetchMonthlyData = async () => {
      try {
        const auth = localStorage.getItem("user");
        let formData = new FormData();
        formData.append("id", dropdownMerchant)
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };

        const { data } = await axios.post(`${baseUrl}/payout_icon`, formData, config);

        setSeriesData([{ data: data.data.dep_count }]);
        console.log(seriesData)
        setOptions(prevOptions => ({ ...prevOptions, subtitle: { text: data.data.dep_total } }));

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {    
    fetchMonthlyData();
  }, [dropdownMerchant]);

  return (
    <div id="chart" style={{ cursor: 'pointer' }}>
      <ReactApexChart options={options} series={seriesData} type="line" height={150} />
    </div>
  );
}

export default SparkLineGraph2;
