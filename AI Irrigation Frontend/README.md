# AI Irrigation System Frontend

![photo_2025-06-01_11-33-39](https://github.com/user-attachments/assets/db01f8fb-18a0-4825-a715-941b32b3a58e)
![photo_2025-06-01_11-33-39 (2)](https://github.com/user-attachments/assets/b3b29591-9555-46fe-bef1-d0f34c71ae8b)
![photo_2025-06-01_11-33-39 (3)](https://github.com/user-attachments/assets/edf462b0-43cd-458a-afad-db50763e70bf)
![photo_2025-06-01_11-33-39 (4)](https://github.com/user-attachments/assets/72eed938-01a9-4f48-a456-ee7f9249bd93)
![photo_2025-06-01_11-33-39 (6)](https://github.com/user-attachments/assets/e439990b-6678-4718-b6d4-dd1196714a2e)

A React-based frontend for the AI Irrigation System that displays real-time sensor data and historical analytics.
## Features

- Real-time sensor data monitoring
- Irrigation prediction
- Historical data visualization
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/
  │   ├── Dashboard.js
  │   ├── SensorCard.js
  │   ├── PredictionCard.js
  │   ├── SensorStatus.js
  │   └── HistoricalData.js
  ├── App.js
  ├── index.js
  └── index.css
```

## Technologies Used

- React
- Tailwind CSS
- Chart.js
- React Router
- Font Awesome Icons 
