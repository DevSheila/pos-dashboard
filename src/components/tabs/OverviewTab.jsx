import React from "react";
import LineChartComponent from "../charts/LineChart";
import BarChartComponent from "../charts/BarChart";

const OverviewTab = ({ dailyData, categoryData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Daily Sales */}
      <LineChartComponent
        data={dailyData}
        xKey="date"
        dataKey="totalSales"
        name="Daily Sales"
        desc="Shows how your revenue fluctuates daily"
      />

      {/* Sales by Category */}
      <BarChartComponent
        data={categoryData}
        xKey="category"
        dataKey="sales"
        name="Sales by Product Category"
        desc="Displays which product categories generate the most revenue"
      />

      {/* Daily Order Count */}
      <BarChartComponent
        data={dailyData}
        xKey="date"
        dataKey="orderCount"
        name="Daily Order Count"
        desc="Tracks the number of orders placed each day"
        color="#82ca9d"
      />

      {/* Daily Items Sold */}
      <LineChartComponent
        data={dailyData}
        xKey="date"
        dataKey="totalQuantity"
        name="Daily Items Sold"
        desc="Shows the quantity of products sold each day"
        color="#82ca9d"
      />
    </div>
  );
};


export default OverviewTab;
