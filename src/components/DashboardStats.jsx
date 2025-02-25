import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { formatCurrency, formatDate, timeAgo } from "@/utils/formatting";
import useOrders from "@/hooks/useOrders";
import useTransactions from "@/hooks/useTransactions";

// Dashboard Stats Component
const DashboardStats = () => {
  const { data: orders, loading: ordersLoading } = useOrders();
  const { data: transactions, loading: transactionsLoading } =
    useTransactions();

  // Calculate stats
  const stats = useMemo(() => {
    if (ordersLoading || transactionsLoading) {
      return {
        totalOrders: 0,
        totalAmount: 0,
        deliveredOrders: 0,
        deliveredPercentage: 0,
        topPaymentMethod: "N/A",
        topPaymentCount: 0,
      };
    }

    const totalOrders = orders.length;
    const totalAmount = orders.reduce(
      (sum, order) => sum + order.TotalAmount,
      0
    );
    const deliveredOrders = orders.filter(
      (order) => order.Status === "Delivered"
    ).length;
    const deliveredPercentage =
      totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

    const paymentMethods = transactions.reduce((acc, tx) => {
      acc[tx.PaymentMethod] = (acc[tx.PaymentMethod] || 0) + 1;
      return acc;
    }, {});

    let topPaymentMethod = "N/A";
    let topPaymentCount = 0;

    Object.entries(paymentMethods).forEach(([method, count]) => {
      if (count > topPaymentCount) {
        topPaymentMethod = method;
        topPaymentCount = count;
      }
    });

    return {
      totalOrders,
      totalAmount,
      deliveredOrders,
      deliveredPercentage,
      topPaymentMethod,
      topPaymentCount,
    };
  }, [orders, transactions, ordersLoading, transactionsLoading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-500 mt-1">Total Orders</p>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-500 mt-1">Total Revenue</p>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.totalAmount)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-500 mt-1">Delivery Rate</p>
          <div className="text-2xl font-bold">{stats.deliveredPercentage}%</div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-500 mt-1">Popular Payment Method</p>
          <div className="text-2xl font-bold">{stats.topPaymentMethod}</div>
        </CardContent>
      </Card>
    </div>
  );
};
export default DashboardStats;
