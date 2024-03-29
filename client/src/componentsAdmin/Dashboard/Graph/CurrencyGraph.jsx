import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import baseUrl from '../../componentsMerchant/config/baseUrl';
import { ColorRing } from 'react-loader-spinner';
import ReactApexChart from 'react-apexcharts';
import baseUrl from '../../../componentsMerchant/config/baseUrl';

const CurrencyGraph = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      // title: {
      //   text: 'Dynamic Updating Chart',
      //   align: 'left'
      // },
      markers: {
        size: 0
      },
      // xaxis: {
      //   type: 'datetime',
      //   // range: XAXISRANGE,
      // },
      yaxis: {
        max: 100
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: 'left',
        onItemClick: {
          toggleDataSeries: false
        },
        position: 'top',
        offsetY: -28,
        offsetX: 60
      },
    },
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = localStorage.getItem('admin');
        const formData = new FormData();
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${auth}`
          }
        };

        // Fetch currency data 
        const [currencyResponse] = await Promise.all([
          axios.post(`${baseUrl}/currency_data`, formData, config),
        ]);

        const currencyData = currencyResponse.data.data;
        const categoriesCurrency = currencyData.map(item => item.sortname);
        const deposits = currencyData.map(item => typeof item.Deposits === 'string' ? parseFloat(item.Deposits.replace(/,/g, '')) : 0);
        const payouts = currencyData.map(item => typeof item.Payouts === 'string' ? parseFloat(item.Payouts.replace(/,/g, '')) : 0);

        setChartData(prevState => ({
          ...prevState,
          series: [
            { name: 'Deposits', data: deposits },
            { name: 'Payouts', data: payouts }
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categoriesCurrency
            }
          },
          loading: false
        }));
      } catch (error) {
        console.log('API error:', error);
      } finally {
        // Set loading to false regardless of success or failure
        setChartData(prevState => ({
          ...prevState,
          loading: false
        }));
      }
    };

    fetchData();
  }, []);

  const renderLoader = () => (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <ColorRing
        visible={true}
        height={80}
        width={80}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );

  return (
    <div className="card px-2 py-1 border-0" style={{borderRadius: "25px"}}>
      <p className="fw-normal ps-2 pt-2 fs-5 text-decoration-underline name text-uppercase fw-bold">Dynamic Updating Chart</p>
      <div className="start-0 ps-0 appexCharts">
        {/* {chartData.loading ? (
          renderLoader()
        ) : ( */}
          <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
        {/* )} */}
      </div>
    </div>
  );
};

export default CurrencyGraph;
