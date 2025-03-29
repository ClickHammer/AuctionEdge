import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B",
        backgroundColor: "rgba(214, 72, 43, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#D6482B",
        pointBorderColor: "#fff",
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#fdba88",
        backgroundColor: "rgba(253, 186, 136, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#fdba88",
        pointBorderColor: "#fff",
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: "#ffffff",
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders And Auctioneers Registered",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutCubic",
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;