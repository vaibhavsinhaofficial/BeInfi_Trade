import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { useStateContext } from "../../context/ContextProvider";

const SplineGraph = () => {
  const { dropdownMerchant } = useStateContext();
  const [seriesData, setSeriesData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = localStorage.getItem("user");
        let formData = new FormData();
        formData.append("id", dropdownMerchant);
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
    
        let { data } = await axios.post(`${baseUrl}/daily_sale_count_icon`, formData, config);
        setSeriesData([{ data: Object.values(data.data) }]);
        console.log("seriesData:",Object.values(data.data))
        setCategories(Object.keys(data.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dropdownMerchant]);

  const options = {
    chart: {
      height: '100%',
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    title: {
        text: 'Daily Sales Count',
        align: 'center',
        style: {
            fontSize: '15px',
            fontWeight: '700',
            color: '#CCC'
        }
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: 0.5
    },
    xaxis: {
      type: 'weekly',
      categories: categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  return (
    <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="area" height={200} />
    </div>
  );
}

export default SplineGraph;
