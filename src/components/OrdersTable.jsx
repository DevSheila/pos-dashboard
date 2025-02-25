
import React, {  useMemo, useEffect } from "react";
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
import {

  ArrowUpDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency, formatDate, timeAgo } from "@/utils/formatting";
import useFilteredData from "@/hooks/useFilteredData";
import useOrders from "@/hooks/useOrders";
import usePagination from "@/hooks/usePagination";
import {
  setOrdersSort,
  setOrdersFilter,
  setOrdersPage,
  setOrdersSearch,

} from "@/store/uiPreferencesSlice";
import StatusBadge from "@/components/StatusBadge";
import CacheIndicator from "@/components/CacheIndicator";
import TableFilters from "@/components/TableFilters";
import TablePagination from "@/components/TablePagination";

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

  export default OrdersTable