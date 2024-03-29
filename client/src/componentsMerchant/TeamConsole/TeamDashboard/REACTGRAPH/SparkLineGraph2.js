import React from "react";
import ReactApexChart from 'react-apexcharts';
import './styles.css'
import axios from "axios";
import baseUrl from "../../../config/baseUrl";

export default class SparkLineGraph2 extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
      
        series1: [{
            name: "# of trnx",
            data: [ ],
            color: '#00e396'
        }],
        options: {
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
            colors: ['#00e396']
          },
          title: {
              text: 'Payouts',
              style: {
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#00e396'
              }
          },
          subtitle: {
              text: '',
              style: {
                  fontSize: '25px',
                  fontWeight: '600',
                  color: '#00e396'
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
        },
      };
    }

  componentDidMount() {
    const perDayPayout = async() => {
      try {
        const auth = localStorage.getItem("user");
        let formData = new FormData();
        
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
    
        let {data} = await axios.post(`${baseUrl}/team_payout_icon`, formData, config);
        
        this.setState({series1:[{data:data.data.pay_count}]})
        this.setState({options:{subtitle:{text:data.data.pay_total}}})
        
      } catch (error) {
        console.log(error);
      }
    }
    perDayPayout()
  }
  render() {
    return (
    <div id="chart" style={{ cursor: 'pointer' }}>
        <ReactApexChart options={this.state.options} series={this.state.series1} type="line" height={150} />
    </div>
    );
  }
}
