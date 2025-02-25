import React, { useState } from "react";
import mockData from "../data/sales_data.json";
import KPISummary from "@/components/KPISummary";
import TabNavigation from "@/components/TabNavigation";
import OverviewTab from "@/components/tabs/OverviewTab";
import ProductsTab from "@/components/tabs/ProductsTab";
import TrendsTab from "@/components/tabs/TrendsTab";
import { processSalesData } from "@/utils/dataProcessing";
import { Filter } from "lucide-react";

const Overview = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Process data for visualization
  const { dailyData, categoryData, topProducts, summaryStats } =
    processSalesData(mockData);

  // Extract available months and categories
  const availableMonths = [
    "All",
    ...new Set(dailyData.map((d) => d.date.slice(0, 7))),
  ];
  const categories = ["All", ...new Set(categoryData.map((c) => c.category))];

  // State for filters
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Apply filtering
  const filteredDailyData =
    selectedMonth === "All"
      ? dailyData
      : dailyData.filter((d) => d.date.startsWith(selectedMonth));

  const filteredCategoryData =
    selectedCategory === "All"
      ? categoryData
      : categoryData.filter((c) => c.category === selectedCategory);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Sales Performance Dashboard
      </h1>

      {/* KPI Summary */}
      <KPISummary stats={summaryStats} />

      {/* Shared Filters */}
      <div className="flex gap-4 mb-4 items-center">
        <Filter className="h-4 w-4 text-gray-400" />

        {/* Month Filter */}
        <select
          className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-100 dark:text-gray-100"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-100 dark:text-gray-100"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && (
        <OverviewTab
          dailyData={filteredDailyData}
          categoryData={filteredCategoryData}
        />
      )}

      {activeTab === "products" && (
        <ProductsTab
          topProducts={topProducts}
          categoryData={filteredCategoryData}
        />
      )}

      {activeTab === "trends" && <TrendsTab dailyData={filteredDailyData} />}
    </div>
  );
};

export default Overview;
