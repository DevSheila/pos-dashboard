import React, { useState } from 'react';
import mockData from "../data/sales_data.json";
import KPISummary from '@/components/KPISummary';
import TabNavigation from '@/components/TabNavigation';
import OverviewTab from '@/components/tabs/OverviewTab';
import ProductsTab from '@/components/tabs/ProductsTab';
import TrendsTab from '@/components/tabs/TrendsTab';
import { processSalesData } from '@/utils/dataProcessing';


const Overview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Process data for visualization using the utility function
  const {
    dailyData,
    categoryData,
    topProducts,
    summaryStats
  } = processSalesData(mockData);

  return (
    <div className="p-4  min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sales Performance Dashboard</h1>
      </div>
      

      {/* KPI Summary */}
      <KPISummary stats={summaryStats} />
      
      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'overview' && (
        <OverviewTab dailyData={dailyData} categoryData={categoryData} />
      )}
      
      {activeTab === 'products' && (
        <ProductsTab topProducts={topProducts} categoryData={categoryData} />
      )}
      
      {activeTab === 'trends' && (
        <TrendsTab dailyData={dailyData} />
      )}
    </div>
  );
};

export default Overview;

