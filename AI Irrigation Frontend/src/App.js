import React from 'react';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historical" element={<HistoricalData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 