import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className=" p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ChartCard;