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

import StatusBadge from "@/components/StatusBadge";
import CacheIndicator from "@/components/CacheIndicator";
import DashboardStats from "@/components/DashboardStats";
import ItemsPerPageSelector from "@/components/ItemsPerPageSelector";
import OrdersTable from "@/components/OrdersTable";
import PaymentMethodBadge from "@/components/PaymentMethodBadge";
import TableFilters from "@/components/TableFilters";
import TablePagination from "@/components/TablePagination";
import TransactionsTable from "@/components/TransactionsTable";

// Main Dashboard Component
const Reports = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.uiPreferences);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

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
