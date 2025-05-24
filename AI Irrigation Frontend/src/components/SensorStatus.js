import React from 'react';

function SensorStatus({ workingSensors, nonWorkingSensors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <i className="fas fa-check-circle text-green-500 text-xl mr-2"></i>
          <h3 className="text-lg font-semibold text-gray-800">Working Sensors</h3>
        </div>
        <ul className="text-gray-600">
          <li>{workingSensors} sensors operational</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <i className="fas fa-exclamation-circle text-red-500 text-xl mr-2"></i>
          <h3 className="text-lg font-semibold text-gray-800">Non-Working Sensors</h3>
        </div>
        <ul className="text-gray-600">
          {nonWorkingSensors?.map((sensor, index) => (
            <li key={index}>{sensor}</li>
          )) || <li>All sensors operational</li>}
        </ul>
      </div>
    </div>
  );
}

export default SensorStatus; 