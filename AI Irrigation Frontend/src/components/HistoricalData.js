import { useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useWebSocket } from '../services/websocket';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalData = () => {
  const [sensorDataArray, setSensorDataArray] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const handleWebSocketMessage = (data) => {
    if (data && data.results) {
      const sensorData = Array.isArray(data.results) ? data.results : [data.results];
      setSensorDataArray(sensorData);

      const newTimestamps = sensorData.map(
        (item) => item.received_at || item.created_at || ""
      );
      setTimestamps(newTimestamps);
    }
  };

  useWebSocket(handleWebSocketMessage);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sensor Snapshot" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          <i className="fas fa-history mr-2"></i>
          Sensor History
        </h1>
      </header>

      {sensorDataArray.length > 0 ? (
        sensorDataArray.map((data, index) => {
          const labels = [
            "Soil Moisture",
            "Soil Humidity",
            "Air Temperature",
            "Air Humidity",
            "Pressure (KPa)",
            "Wind Speed (Kmh)",
            "Rainfall (mm)",
          ];

          const values = [
            data.Soil_Moisture,
            data.Soil_Humidity,
            data.Air_temperature_C,
            data.Air_humidity_,
            data.Pressure_KPa,
            data.Wind_speed_Kmh,
            data.rainfall,
          ];

          const chartData = {
            labels,
            datasets: [
              {
                label: `Snapshot ${index + 1}`,
                data: values,
                borderColor: "#4fd1c5",
                backgroundColor: "#4fd1c5",
                fill: false,
                tension: 0.4,
              },
            ],
          };

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 mb-10"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Snapshot {index + 1}
              </h2>
              <p className="text-gray-600 mb-4">
                Timestamp:{" "}
                {timestamps[index]
                  ? new Date(timestamps[index]).toLocaleString()
                  : "N/A"}
              </p>
              <div style={{ height: "300px", width: "80%", margin: "auto" }}>
                <Line options={options} data={chartData} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-600">Loading chart data...</div>
      )}

      <div className="text-center mt-8">
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
};

export default HistoricalData;
