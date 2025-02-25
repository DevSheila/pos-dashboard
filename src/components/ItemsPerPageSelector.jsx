import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSelector, useDispatch } from "react-redux";
import { setItemsPerPage } from "@/store/uiPreferencesSlice";

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

export default ItemsPerPageSelector;
