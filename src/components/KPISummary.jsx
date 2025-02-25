import React from 'react';

const KPISummary = ({ stats }) => {
  const { totalRevenue, totalOrders, totalItems, averageOrderValue } = stats;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <KPICard 
        title="Total Revenue" 
        value={`$${totalRevenue.toFixed(2)}`} 
        icon={<MoneyIcon />} 
        bgColor="blue" 
      />
      <KPICard 
        title="Total Orders" 
        value={totalOrders} 
        icon={<OrderIcon />} 
        bgColor="green" 
      />
      <KPICard 
        title="Total Items Sold" 
        value={totalItems} 
        icon={<BoxIcon />} 
        bgColor="yellow" 
      />
      <KPICard 
        title="Avg. Order Value" 
        value={`$${averageOrderValue.toFixed(2)}`} 
        icon={<CalculatorIcon />} 
        bgColor="purple" 
      />
    </div>
  );
};
export default KPISummary

const KPICard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm ">{title}</p>
          <p className="text-2xl font-bold ">{value}</p>
        </div>
        <div className={`bg-${bgColor}-100 p-2 rounded-full`}>
          <div className={`w-6 h-6 text-${bgColor}-500`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const MoneyIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const OrderIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
  </svg>
);

const BoxIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
  </svg>
);

const CalculatorIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
  </svg>
);