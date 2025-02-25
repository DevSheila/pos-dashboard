import React, { useMemo, useEffect } from "react";
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

import { ArrowUpDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency, formatDate, timeAgo } from "@/utils/formatting";
import useFilteredData from "@/hooks/useFilteredData";
import usePagination from "@/hooks/usePagination";
import useTransactions from "@/hooks/useTransactions";
import {
  setTransactionsSort,
  setTransactionsFilter,
  setTransactionsPage,
  setTransactionsSearch,
} from "@/store/uiPreferencesSlice";


import CacheIndicator from "@/components/CacheIndicator";
import PaymentMethodBadge from "@/components/PaymentMethodBadge";
import TableFilters from "@/components/TableFilters";
import TablePagination from "@/components/TablePagination";
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

export default TransactionsTable;
