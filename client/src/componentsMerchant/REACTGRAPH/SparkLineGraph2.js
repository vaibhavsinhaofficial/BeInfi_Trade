import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { useStateContext } from "../../context/ContextProvider";


//Payout Graph
const SparkLineGraph = () => {
  const { dropdownMerchant } = useStateContext();
  const [seriesData, setSeriesData] = useState([
    {
      name: "# of trnx",
      data: [],
      color: "#00e396",
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: "100%",
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#00e396"],
    },
    title: {
      text: "Payouts",
      style: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#00e396",
      },
    },
    subtitle: {
      text: "",
      style: {
        fontSize: "25px",
        fontWeight: "600",
        color: "#00e396",
      },
    },
    grid: {
      row: {
        colors: ["#ffffff", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "00:00-04:00",
        "04:01-08:00",
        "08:01-12:00",
        "12:01-16:00",
        "16:01-20:00",
        "20:00-23:59",
      ],
    },
  });

  useEffect(() => {
    const perDayPayout = async () => {
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

        const { data } = await axios.post(
          `${baseUrl}/payout_icon`,
          formData,
          config
        );

        setSeriesData([{ data: data.data.pay_count }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          subtitle: { text: data.data.pay_total },
        }));
      } catch (error) {
        console.log(error);
      }
    };
    perDayPayout();
  }, [dropdownMerchant]);

  return (
    <div id="chart" style={{ cursor: "pointer" }}>
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={150}
      />
    </div>
  );
};

export default SparkLineGraph;
