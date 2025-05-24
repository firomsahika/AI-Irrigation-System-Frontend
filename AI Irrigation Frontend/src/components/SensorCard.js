import React from 'react';

function SensorCard({ title, icon, value, unit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <i className={`fas fa-${icon} text-primary text-xl mr-2`}></i>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {value !== undefined ? value.toFixed(2) : '--'}
        <span className="text-sm font-normal text-gray-600 ml-1">{unit}</span>
      </div>
    </div>
  );
}

export default SensorCard; 