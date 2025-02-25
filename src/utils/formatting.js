export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  
  export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  export const timeAgo = (timestamp) => {
    if (!timestamp) return "Never";
  
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };