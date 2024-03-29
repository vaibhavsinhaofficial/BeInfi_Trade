import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import baseUrl from '../../../config/baseUrl';
import './styles.css'

export default class SparkLineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
          name: "# of trans",
          data: [ ],
          color: '#259ffb'
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
      },      
    };
  }

  componentDidMount() {
    const monthly = async() => {
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

        this.setState({series:[{data:data.data.dep_count}]})
        this.setState({options:{subtitle:{text:data.data.dep_total}}})
        
      } catch (error) {
        console.log(error);
      }
    }
    monthly()
  }

  render() {
    return (
      <div id="chart" style={{ cursor: 'pointer' }}>
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={150} />
      </div>
    );
  }
}