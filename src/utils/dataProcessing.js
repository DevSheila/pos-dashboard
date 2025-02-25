export const processSalesData = (mockData) => {
    // Process data by date
    const processDataByDate = () => {
      const dateMap = {};
      
      mockData.forEach(sale => {
        const date = sale.SaleDate;
        if (!dateMap[date]) {
          dateMap[date] = {
            date,
            totalSales: 0,
            totalQuantity: 0,
            orderCount: 0
          };
        }
        
        dateMap[date].totalSales += sale.TotalAmount;
        dateMap[date].totalQuantity += sale.Quantity;
        dateMap[date].orderCount += 1;
      });
      
      return Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
    };
  
    // Process data by product category
    const processDataByProductCategory = () => {
      const categoryMap = {};
      
      mockData.forEach(sale => {
        const categoryId = Math.floor(sale.ProductID / 10);
        const categoryName = `Category ${categoryId}`;
        
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = {
            category: categoryName,
            sales: 0,
            quantity: 0
          };
        }
        
        categoryMap[categoryName].sales += sale.TotalAmount;
        categoryMap[categoryName].quantity += sale.Quantity;
      });
      
      return Object.values(categoryMap);
    };
  
    // Get top selling products
    const getTopSellingProducts = () => {
      const productMap = {};
      
      mockData.forEach(sale => {
        const productId = `Product ${sale.ProductID}`;
        
        if (!productMap[productId]) {
          productMap[productId] = {
            product: productId,
            sales: 0,
            quantity: 0
          };
        }
        
        productMap[productId].sales += sale.TotalAmount;
        productMap[productId].quantity += sale.Quantity;
      });
      
      return Object.values(productMap)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
    };
  
    // Calculate summary statistics
    const calculateSummaryStats = () => {
      const totalRevenue = mockData.reduce((sum, sale) => sum + sale.TotalAmount, 0);
      const totalItems = mockData.reduce((sum, sale) => sum + sale.Quantity, 0);
      const totalOrders = mockData.length;
      const averageOrderValue = totalRevenue / totalOrders;
      
      return {
        totalRevenue,
        totalItems,
        totalOrders,
        averageOrderValue
      };
    };
  
    // Return all processed data
    return {
      dailyData: processDataByDate(),
      categoryData: processDataByProductCategory(),
      topProducts: getTopSellingProducts(),
      summaryStats: calculateSummaryStats()
    };
  };