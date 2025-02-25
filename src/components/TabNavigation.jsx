import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'trends', label: 'Trends' }
  ];

  return (
    <div className="flex border-b mb-6">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`py-2 px-4 font-medium ${activeTab === tab.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;