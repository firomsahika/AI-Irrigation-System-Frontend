let historicalBarChart;

// const API_BASE_URL = "https://api.ai.astu.pro.et";
const API_BASE_URL = "https://integrated.ai.astu.pro.et";

async function fetchHistoricalData(startDate, endDate) {
  try {
    console.log("Inside historical data fetch.")
    const response = await fetch(
      `${API_BASE_URL}/api/system/sensordata/purge-by-date?start_date=${startDate}&end_date=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const historicalData = await response.json();

    console.log("hsitorical_data: ", historicalData)


    // Process data for chart
    const labels = historicalData.map((entry) => entry.timestamp);
    const soilMoistureData = historicalData.map((entry) => entry.Soil_Moisture);
    const soilHumidityData = historicalData.map((entry) => entry.Soil_Humidity);
    const airHumidityData = historicalData.map((entry) => entry.Air_humidity_);
    const airTempData = historicalData.map((entry) => entry.Air_temperature_C);
    const windSpeedData = historicalData.map((entry) => entry.Wind_speed_Kmh);
    const pressureData = historicalData.map((entry) => entry.Pressure_KPa);
    const rainfallData = historicalData.map((entry) => entry.rainfall);

    // Update chart
    updateHistoricalChart(
      labels,
      soilMoistureData,
      soilHumidityData,
      airHumidityData,
      airTempData,
      windSpeedData,
      pressureData,
      rainfallData
    );
  } catch (error) {
    console.error("Error fetching historical data:", error.message || error);
  }
}
  



function updateHistoricalChart(
  labels,
  soilMoisture,
  soilHumidity,
  airHumidity,
  airTemp,
  windSpeed,
  pressure,
  rainfall
) {
  const ctx = document.getElementById("historicalBarChart").getContext("2d");

  if (historicalBarChart) {
    historicalBarChart.destroy();
  }

  historicalBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Soil Moisture",
          data: soilMoisture,
          backgroundColor: "#4CAF50",
        },
        {
          label: "Soil Humidity",
          data: soilHumidity,
          backgroundColor: "#2196F3",
        },
        {
          label: "Air Humidity",
          data: airHumidity,
          backgroundColor: "#03A9F4",
        },
        {
          label: "Air Temperature",
          data: airTemp,
          backgroundColor: "#FFC107",
        },
        {
          label: "Wind Speed",
          data: windSpeed,
          backgroundColor: "#FF5722",
        },
        {
          label: "Pressure",
          data: pressure,
          backgroundColor: "#9C27B0",
        },
        {
          label: "Rainfall",
          data: rainfall,
          backgroundColor: "#00BCD4",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Values",
          },
        },
        x: {
          title: {
            display: true,
            text: "Timestamp",
          },
        },
      },
    },
  });
}


