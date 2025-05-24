import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function HistoricalData() {
  const [chartData, setChartData] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  const fetchLatestSensorData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/system/get_sensordata/last`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const sensorData = data.results; // Assuming response has `results`

      const chartData = {
        labels: [
          'Soil Moisture',
          'Soil Humidity',
          'Air Temperature',
          'Air Humidity',
          'Pressure (KPa)',
          'Wind Speed (Kmh)',
          'Rainfall (mm)',
        ],
        datasets: [
          {
            label: 'Latest Sensor Values',
            data: [
              sensorData.Soil_Moisture,
              sensorData.Soil_Humidity,
              sensorData.Air_temperature_C,
              sensorData.Air_humidity_,
              sensorData.Pressure_KPa,
              sensorData.Wind_speed_Kmh,
              sensorData.rainfall,
            ],
            backgroundColor: [
              '#4fd1c5',
              '#63b3ed',
              '#f56565',
              '#a0aec0',
              '#f6ad55',
              '#9f7aea',
              '#68d391',
            ],
          },
        ],
      };

      setChartData(chartData);
      setTimestamp(sensorData.received_at || sensorData.created_at || '');
    } catch (error) {
      console.error('Error fetching latest sensor data:', error);
    }
  };

  useEffect(() => {
    fetchLatestSensorData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Latest Sensor Data Overview',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          <i className="fas fa-history mr-2"></i>
          Sensor Snapshot
        </h1>
        <div className="text-gray-600 mt-2">
          Last Updated: {timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {chartData ? (
          <Bar options={options} data={chartData} />
        ) : (
          <div className="text-center text-gray-600">Loading chart data...</div>
        )}
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HistoricalData;
