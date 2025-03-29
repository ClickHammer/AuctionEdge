import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

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
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "rgba(214, 72, 43, 0.8)",
        borderColor: "#D6482B",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(214, 72, 43, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          color: "#ffffff",
          callback: function (value) {
            return "$" + value.toLocaleString();
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
        text: "Monthly Total Payments Received",
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
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;