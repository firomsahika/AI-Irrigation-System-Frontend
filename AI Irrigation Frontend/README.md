# AI Irrigation System Frontend

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