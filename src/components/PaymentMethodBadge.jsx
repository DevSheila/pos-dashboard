import React from "react";
import { Badge } from "@/components/ui/badge";

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

export default PaymentMethodBadge;
