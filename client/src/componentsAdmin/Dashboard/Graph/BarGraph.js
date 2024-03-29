import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ColorRing } from 'react-loader-spinner';

const BarGraph = ({ options, series, loading,title}) => {

    //Loader
    const renderLoader = () => (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    );

    return (
        <div className="card px-2 py-1 rounded-3 border-0" >
            <p className="fw-normal ps-1 pt-2 fs-5 text-decoration-underline name">{title}</p>
            <div className=" start-0 ps-0">
                {loading ? ( // Render loader if loading state is true
                    renderLoader()  
                ) : (
                    <ReactApexChart  options={options} series={series} type="bar" height={250} />
                )}
            </div>
        </div>
    );
};

export default BarGraph;
