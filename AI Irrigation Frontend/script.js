

document.addEventListener("DOMContentLoaded", () => {
  fetchLatestSensorData();
  // fetchNonWorkingSensors();

  // Example: Fetch historical data for the past 7 days
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const startDateStr = startDate.toISOString().split("T")[0];

  fetchHistoricalData(startDateStr, endDate);
});
