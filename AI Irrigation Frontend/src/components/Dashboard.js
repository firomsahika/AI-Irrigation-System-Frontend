import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SensorCard from './SensorCard';
import PredictionCard from './PredictionCard';
import SensorStatus from './SensorStatus';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = localStorage.getItem("token");
const token_type = localStorage.getItem("token_type");

function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [error, setError] = useState(null);

  const fetchLatestSensorData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/system/get_sensordata/last`, {
        method: 'GET',
        headers: {
          Authorization:`${token_type} ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data && data.results) {
        setSensorData(data.results);
        setTimestamp(data.results.received_at);
        setError(null);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching latest sensor data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLatestSensorData();
    const interval = setInterval(fetchLatestSensorData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

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

      <div className="mt-8 text-center">
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