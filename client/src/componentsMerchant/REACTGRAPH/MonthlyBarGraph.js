import React from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';
import baseUrl from '../config/baseUrl';
import { useStateContext } from "../../context/ContextProvider";

const MonthlyBarGraph = () => {
    const { dropdownMerchant } = useStateContext();

    class MonthlyBarGraph extends React.Component {
        
        constructor(props) {
            super(props);
            this.state = {
                series: [{
                name: 'Deposit',
                data: []
                }, {
                name: 'Payout',
                data: []
                }],
                options: {
                    chart: {
                        type: 'bar',
                        height: '100%'
                    },
                    plotOptions: {
                        bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    },
                    fill: {
                        opacity: 1
                    },
                },
            
            };

        }
        componentDidMount() {
            const monthly = async() => {
        
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
                
                    let {data} = await axios.post(`${baseUrl}/monthly_transaction`, formData, config);
                
                    this.setState({series:[{data:data.data.deposit},{data:data.data.payout}]})
                    
                } catch (error) {
                    console.log(error);
                }
                }
                monthly()
                
        }
        render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
            </div>
        );
        }
    }

    return <MonthlyBarGraph />;
}

export default MonthlyBarGraph;
