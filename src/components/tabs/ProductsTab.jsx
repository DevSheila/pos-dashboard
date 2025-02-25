import React from "react";
import ChartCard from "../ChartCard";
import PieChartComponent from "../charts/PieChart";

const ProductsTab = ({ topProducts, categoryData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Category Distribution */}
      <ChartCard title="Category Distribution">
        <PieChartComponent
          data={categoryData}
          dataKey="sales"
          nameKey="category"
        />
        <p className="text-center font-medium mt-2">Sales by Category</p>
      </ChartCard>

      <ChartCard title="Quantity Distribution">
        <PieChartComponent
          data={categoryData}
          dataKey="quantity"
          nameKey="category"
        />
        <p className="text-center font-medium mt-2">Quantity by Category</p>
      </ChartCard>
    </div>
  );
};


export default ProductsTab;
