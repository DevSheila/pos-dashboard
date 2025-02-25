import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";


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

export default TableFilters;