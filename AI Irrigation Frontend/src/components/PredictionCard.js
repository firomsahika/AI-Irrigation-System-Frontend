import React from 'react';

function PredictionCard({ prediction }) {
  const isIrrigationNeeded = prediction === 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
      isIrrigationNeeded ? 'border-l-4 border-primary' : 'border-l-4 border-red-500'
    }`}>
      <div className="flex items-center mb-4">
        <i className={`fas fa-tint text-2xl mr-3 ${
          isIrrigationNeeded ? 'text-primary' : 'text-red-500'
        }`}></i>
        <h3 className="text-lg font-semibold text-gray-800">Irrigation Status</h3>
      </div>
      <div className="text-xl font-bold text-gray-900">
        {isIrrigationNeeded ? 'No Irrigation Needed':'Irrigation Recommended'}
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Based on current conditions
      </div>
    </div>
  );
}

export default PredictionCard; 