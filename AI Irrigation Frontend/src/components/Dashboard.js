import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SensorCard from './SensorCard';
import PredictionCard from './PredictionCard';
import SensorStatus from './SensorStatus';
import { useWebSocket } from '../services/websocket';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = localStorage.getItem("token");
const token_type = localStorage.getItem("token_type");

function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [error, setError] = useState(null);

  const handleWebSocketMessage = (data) => {
    if (data && data.results) {
      setSensorData(data.results);
      setTimestamp(data.results.received_at);
      setError(null);
    }
  };

  useWebSocket(handleWebSocketMessage);

  const sensorCards = [
    { title: 'Soil Moisture', icon: 'fill-drip', value: sensorData?.Soil_Moisture, unit: '' },
    { title: 'Soil Humidity', icon: 'mountain', value: sensorData?.Soil_Humidity, unit: '%' },
    { title: 'Air Humidity', icon: 'cloud-sun', value: sensorData?.Air_humidity_, unit: '%' },
    { title: 'Air Temperature', icon: 'sun', value: sensorData?.Air_temperature_C, unit: '°C' },
    { title: 'Wind Speed', icon: 'wind', value: sensorData?.Wind_speed_Kmh, unit: 'Km/h' },
    { title: 'Pressure', icon: 'tachometer-alt', value: sensorData?.Pressure_KPa, unit: 'KPa' },
    { title: 'Rainfall', icon: 'cloud-showers-heavy', value: sensorData?.rainfall, unit: 'mm' },
  ];

  return (
    <div className="container mx-auto px-4 lg:py-28">
      <header className="mb-8 bg-green-500 p-2 rounded-lg text-white">
        <h1 className="text-4xl font-bold text-white  ">
          <i className="fas fa-seedling mr-2"></i>
          AI Irrigation System
        </h1>
        <div className="text-white mt-2">
          Last Updated: {timestamp || 'Not available'}
        </div>
        {error && (
          <div className="mt-2 text-red-500">
            Error: {error}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PredictionCard prediction={sensorData?.prediction} />
        {sensorCards.map((card, index) => (
          <SensorCard key={index} {...card} />
        ))}
      </div>

      <div className="mt-8">
        <SensorStatus 
          workingSensors={sensorData?.number_of_working_sensors}
          nonWorkingSensors={sensorData?.Non_working_sensors}
        />
      </div>

      <div className="text-center mt-8">
        <Link 
          to="/historical" 
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <i className="fas fa-chart-bar mr-2"></i>
          View Historical Data
        </Link>
      </div>
    </div>
  );
}

export default Dashboard; 