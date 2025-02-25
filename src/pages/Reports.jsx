import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency, formatDate, timeAgo } from "@/utils/formatting";
import useDataFetcher from "@/hooks/useDataFetcher";
import useFilteredData from "@/hooks/useFilteredData";
import useOrders from "@/hooks/useOrders";
import usePagination from "@/hooks/usePagination";
import useTransactions from "@/hooks/useTransactions";
import {
  setActiveTab,
  setOrdersSort,
  setOrdersFilter,
  setOrdersPage,
  setOrdersSearch,
  setTransactionsSort,
  setTransactionsFilter,
  setTransactionsPage,
  setTransactionsSearch,
  setItemsPerPage,
} from "@/store/uiPreferencesSlice";



// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <Badge className={getStatusColor(status)}>{status}</Badge>;
};

// Payment Method Badge Component
const PaymentMethodBadge = ({ method }) => {
  const getMethodColor = (method) => {
    switch (method) {
      case "Credit Card":
        return "bg-purple-100 text-purple-800";
      case "PayPal":
        return "bg-blue-100 text-blue-800";
      case "Bank Transfer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <Badge className={getMethodColor(method)}>{method}</Badge>;
};

// Table Pagination Component
const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages || 1}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Search and Filter Bar Component
const TableFilters = ({
  onSearch,
  searchValue,
  onFilterChange,
  filterValue,
  filterOptions,
  filterLabel = "Filter by",
  loading = false,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-start md:items-center">
      <div className="flex items-center relative w-full md:w-64">
        <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search..."
          className="pl-8"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {filterOptions && filterOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={filterValue} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={filterLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button
        variant="outline"
        size="sm"
        className="ml-auto"
        onClick={onRefresh}
        disabled={loading}
      >
        <RefreshCw
          className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
    </div>
  );
};

// Cache Indicator Component
const CacheIndicator = ({ lastFetched }) => {
  return (
    <div className="text-xs text-gray-500 mt-2">
      Last updated: {timeAgo(lastFetched)}
    </div>
  );
};

// Orders Table Component
const OrdersTable = () => {
  const dispatch = useDispatch();
  const {
    ordersPage,
    ordersSortField,
    ordersSortDirection,
    ordersFilter,
    ordersSearch,
    itemsPerPage,
  } = useSelector((state) => state.uiPreferences);

  const {
    data: orders,
    loading,
    error,
    fetchData: fetchOrders,
    lastFetched,
  } = useOrders();

  // Get unique statuses for filter
  const statuses = useMemo(
    () => [...new Set(orders.map((order) => order.Status))],
    [orders]
  );

  // Handle sorting
  const handleSort = (field) => {
    if (ordersSortField === field) {
      dispatch(
        setOrdersSort({
          field,
          direction: ordersSortDirection === "asc" ? "desc" : "asc",
        })
      );
    } else {
      dispatch(setOrdersSort({ field, direction: "asc" }));
    }
  };

  // Apply filters and sort
  const filteredOrders = useFilteredData(
    orders,
    ordersSearch,
    "Status",
    ordersFilter,
    ordersSortField,
    ordersSortDirection
  );

  // Apply pagination
  const { paginatedData, totalPages } = usePagination(
    filteredOrders,
    ordersPage,
    itemsPerPage
  );

  // Load data on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Sort direction indicator
  const SortIcon = ({ field }) => {
    if (ordersSortField !== field)
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return ordersSortDirection === "asc" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500 rotate-180" />
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage and review customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <TableFilters
          onSearch={(value) => dispatch(setOrdersSearch(value))}
          searchValue={ordersSearch}
          onFilterChange={(value) => dispatch(setOrdersFilter(value))}
          filterValue={ordersFilter}
          filterOptions={statuses}
          filterLabel="Filter by status"
          loading={loading}
          onRefresh={() => fetchOrders(true)}
        />

        <CacheIndicator lastFetched={lastFetched} />

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            Error: {error}
          </div>
        )}

        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[100px] cursor-pointer"
                  onClick={() => handleSort("OrderID")}
                >
                  <div className="flex items-center">
                    Order ID
                    <SortIcon field="OrderID" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("CustomerID")}
                >
                  <div className="flex items-center">
                    Customer ID
                    <SortIcon field="CustomerID" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("OrderDate")}
                >
                  <div className="flex items-center">
                    Order Date
                    <SortIcon field="OrderDate" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Status")}
                >
                  <div className="flex items-center">
                    Status
                    <SortIcon field="Status" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("TotalAmount")}
                >
                  <div className="flex items-center justify-end">
                    Total Amount
                    <SortIcon field="TotalAmount" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((order) => (
                  <TableRow key={order.OrderID}>
                    <TableCell className="font-medium">
                      {order.OrderID}
                    </TableCell>
                    <TableCell>{order.CustomerID}</TableCell>
                    <TableCell>{formatDate(order.OrderDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.Status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order.TotalAmount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <TablePagination
          currentPage={ordersPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setOrdersPage(page))}
        />
      </CardFooter>
    </Card>
  );
};

// Transactions Table Component
const TransactionsTable = () => {
  const dispatch = useDispatch();
  const {
    transactionsPage,
    transactionsSortField,
    transactionsSortDirection,
    transactionsFilter,
    transactionsSearch,
    itemsPerPage,
  } = useSelector((state) => state.uiPreferences);

  const {
    data: transactions,
    loading,
    error,
    fetchData: fetchTransactions,
    lastFetched,
  } = useTransactions();

  // Get unique payment methods for filter
  const paymentMethods = useMemo(
    () => [...new Set(transactions.map((tx) => tx.PaymentMethod))],
    [transactions]
  );

  // Handle sorting
  const handleSort = (field) => {
    if (transactionsSortField === field) {
      dispatch(
        setTransactionsSort({
          field,
          direction: transactionsSortDirection === "asc" ? "desc" : "asc",
        })
      );
    } else {
      dispatch(setTransactionsSort({ field, direction: "asc" }));
    }
  };

  // Apply filters and sort
  const filteredTransactions = useFilteredData(
    transactions,
    transactionsSearch,
    "PaymentMethod",
    transactionsFilter,
    transactionsSortField,
    transactionsSortDirection
  );

  // Apply pagination
  const { paginatedData, totalPages } = usePagination(
    filteredTransactions,
    transactionsPage,
    itemsPerPage
  );

  // Load data on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Sort direction indicator
  const SortIcon = ({ field }) => {
    if (transactionsSortField !== field)
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return transactionsSortDirection === "asc" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500 rotate-180" />
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>View and manage payment transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <TableFilters
          onSearch={(value) => dispatch(setTransactionsSearch(value))}
          searchValue={transactionsSearch}
          onFilterChange={(value) => dispatch(setTransactionsFilter(value))}
          filterValue={transactionsFilter}
          filterOptions={paymentMethods}
          filterLabel="Filter by payment method"
          loading={loading}
          onRefresh={() => fetchTransactions(true)}
        />

        <CacheIndicator lastFetched={lastFetched} />

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            Error: {error}
          </div>
        )}

        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[100px] cursor-pointer"
                  onClick={() => handleSort("TransactionID")}
                >
                  <div className="flex items-center">
                    Transaction ID
                    <SortIcon field="TransactionID" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("OrderID")}
                >
                  <div className="flex items-center">
                    Order ID
                    <SortIcon field="OrderID" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("TransactionDate")}
                >
                  <div className="flex items-center">
                    Date
                    <SortIcon field="TransactionDate" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("PaymentMethod")}
                >
                  <div className="flex items-center">
                    Payment Method
                    <SortIcon field="PaymentMethod" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("Amount")}
                >
                  <div className="flex items-center justify-end">
                    Amount
                    <SortIcon field="Amount" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((tx) => (
                  <TableRow key={tx.TransactionID}>
                    <TableCell className="font-medium">
                      {tx.TransactionID}
                    </TableCell>
                    <TableCell>{tx.OrderID}</TableCell>
                    <TableCell>{formatDate(tx.TransactionDate)}</TableCell>
                    <TableCell>
                      <PaymentMethodBadge method={tx.PaymentMethod} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(tx.Amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <TablePagination
          currentPage={transactionsPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setTransactionsPage(page))}
        />
      </CardFooter>
    </Card>
  );
};

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
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className="text-xs text-gray-500 mt-1">Total Orders</p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">
            {formatCurrency(stats.totalAmount)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Total Revenue</p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.deliveredPercentage}%</div>
          <p className="text-xs text-gray-500 mt-1">Delivery Rate</p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.topPaymentMethod}</div>
          <p className="text-xs text-gray-500 mt-1">Popular Payment Method</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Items Per Page Selector Component
const ItemsPerPageSelector = () => {
  const dispatch = useDispatch();
  const { itemsPerPage } = useSelector((state) => state.uiPreferences);

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-gray-500">Items per page:</span>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => dispatch(setItemsPerPage(parseInt(value)))}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// Main Dashboard Component
const Reports = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.uiPreferences);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Order Management Dashboard</h1>

      <DashboardStats />

      <Tabs
        value={activeTab}
        onValueChange={(value) => dispatch(setActiveTab(value))}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <div className="mb-4">
          <ItemsPerPageSelector />
        </div>

        <TabsContent value="orders">
          <OrdersTable />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Reports;
