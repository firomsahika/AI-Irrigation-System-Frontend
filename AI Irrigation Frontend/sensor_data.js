


async function fetchLatestSensorData() {
  try {
    console.log("Inside try of sensordata")
    const response = await fetch(
      `${API_BASE_URL}/api/system/get_sensordata/last`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log("this is from sensor data. js")
    console.log("sensor_datas", data)

    // Update timestamp
    document.getElementById(
      "timestamp"
    ).textContent = `Last Updated: ${data.results.received_at}`;

    // Update prediction card
    const predictionCard = document.querySelector(".prediction-card");
    const predictionIcon = predictionCard.querySelector(".prediction-icon i");
    const predictionText = predictionCard.querySelector(".prediction-text");
    if (data.prediction === 0) {
      predictionCard.classList.remove("no-irrigation");
      predictionIcon.className = "fas fa-tint";
      predictionText.textContent = "Irrigation Recommended";
    } else {
      predictionCard.classList.add("no-irrigation");
      predictionIcon.className = "fas fa-tint-slash";
      predictionText.textContent = "No Irrigation Needed";
    }

    // Update sensor cards
    const cardValues = document.querySelectorAll(".card .card-value");
    cardValues[0].textContent = data.results.Soil_Moisture.toFixed(2);
    cardValues[1].textContent = `${data.results.Soil_Humidity.toFixed(1)}%`;
    cardValues[2].textContent = `${data.results.Air_humidity_.toFixed(0)}%`;
    cardValues[3].textContent = `${data.results.Air_temperature_C.toFixed(1)}°C`;
    cardValues[4].textContent = `${data.results.Wind_speed_Kmh.toFixed(2)} Km/h`;
    cardValues[5].textContent = `${data.results.Pressure_KPa.toFixed(1)} KPa`;
    cardValues[6].textContent = `${data.results.rainfall.toFixed(1)} mm`;

    // Update working sensors
    const workingSensorsElement = document.getElementById("working-sensors");
    workingSensorsElement.innerHTML = `<li>${data.results.number_of_working_sensors} sensors operational</li>`;

    // Update non-working sensors
    // const nonWorkingSensorsElement = document.getElementById(
    //   "non-working-sensors"
    // );
    // nonWorkingSensorsElement.innerHTML = data.Non_working_sensors.map(
    //   (sensor) => `<li>${sensor}</li>`
    // ).join("");
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
  }
}


// async function fetchNonWorkingSensors() {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/api/system/non_working_sensors`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const sensors = await response.json();

//     const nonWorkingSensorsElement = document.getElementById(
//       "non-working-sensors"
//     );
//     nonWorkingSensorsElement.innerHTML = sensors
//       .map((sensor) => `<li>${sensor}</li>`)
//       .join("");
//   } catch (error) {
//     console.error("Error fetching non-working sensors:", error);
//   }
// }
  