import React from 'react';
import ChartCard from '../ChartCard';
import BarChartComponent from '../charts/BarChart';
import PieChartComponent from '../charts/PieChart';

const ProductsTab = ({ topProducts, categoryData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Products by Revenue */}
      <ChartCard title="Top Products by Revenue">
        <BarChartComponent 
          data={topProducts} 
          xKey="product" 
          dataKey="sales" 
          name="Revenue ($)" 
          vertical={true} 
        />
      </ChartCard>
      
      {/* Top Products by Quantity */}
      <ChartCard title="Top Products by Quantity">
        <BarChartComponent 
          data={topProducts} 
          xKey="product" 
          dataKey="quantity" 
          name="Quantity Sold" 
          color="#82ca9d" 
          vertical={true} 
        />
      </ChartCard>
      
      {/* Product Category Distribution */}
      <ChartCard title="Category Distribution" className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <PieChartComponent 
              data={categoryData} 
              dataKey="sales" 
              nameKey="category" 
            />
            <p className="text-center font-medium mt-2">Sales by Category</p>
          </div>
          <div>
            <PieChartComponent 
              data={categoryData} 
              dataKey="quantity" 
              nameKey="category" 
            />
            <p className="text-center font-medium mt-2">Quantity by Category</p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default ProductsTab;