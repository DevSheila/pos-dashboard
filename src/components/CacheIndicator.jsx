import { timeAgo } from "@/utils/formatting";
import React from "react";


// Cache Indicator Component
const CacheIndicator = ({ lastFetched }) => {
  return (
    <div className="text-xs text-gray-500 mt-2">
      Last updated: {timeAgo(lastFetched)}
    </div>
  );
};

export default CacheIndicator