import React from "react";
import { Badge } from "@/components/ui/badge";

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

  export default StatusBadge;