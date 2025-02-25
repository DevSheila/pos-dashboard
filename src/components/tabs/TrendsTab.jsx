import React from "react";
import LineChartComponent from "../charts/LineChart";
import BarChartComponent from "../charts/BarChart";

const TrendsTab = ({ dailyData }) => {
  // Calculate average order value for each day
  const dataWithAvg = dailyData.map((day) => ({
    ...day,
    avgOrderValue: day.orderCount > 0 ? day.totalSales / day.orderCount : 0,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Revenue Trend */}
      <BarChartComponent
        data={dailyData}
        xKey="date"
        dataKey="totalSales"
        name="Revenue Trend"
        desc="Tracks revenue changes over time"
        color="#8884d8"
        showLine
      />

      {/* Average Order Value Trend */}
      <LineChartComponent
        data={dataWithAvg}
        xKey="date"
        dataKey="avgOrderValue"
        name="Average Order Value Trend"
        desc="Shows the average order value over time"
        color="#8884d8"
        className="col-span-1 md:col-span-2"
      />
    </div>
  );
};


export default TrendsTab;
