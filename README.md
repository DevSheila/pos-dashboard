# POS Dashboard

## Overview

This is a responsive analytical dashboard built using React. The dashboard displays key metrics and visualizations based on provided data.


- Hosted on **Vercel** live link: https://pos-dashboard-phi.vercel.app

## Features

- **Dashboard Layout**: Responsive layout with a header, sidebar, and main content area.
- **Data Visualization**: Interactive charts using a charting library ( Recharts).
  - Line chart showing trends over time.
  - Bar chart comparing categories.
  - Pie chart
- **Key Metrics Display**: Cards displaying important metrics like total sales and average order value.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: Redux Toolkit, React Redux , Context
- **Data Fetching**: Axios, TanStack React Query
- **Charts & Visualization**: Recharts, Chart.js, React Chart.js 2  
  e.t.c


## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16)
- npm or yarn

### Clone the Repository

```sh
git clone https://github.com/DevSheila/pos-dashboard.git
cd pos-dashboard
```

### Install Dependencies

```sh
npm install  # or yarn install
```

### Run the Application

```sh
npm run dev # or yarn start
```

This will start the development server at `http://localhost:5173`.

### Build for Production

```sh
npm run build # or yarn build
```

## Testing

- Unit tests written using Jest and React Testing Library.
- Run tests with:
  ```sh
  npm test
  ```

## **Architecture & Design**

### **State Management**

- **Redux Toolkit** – To manage global state for `orders`, `transactions`, and `UI preferences`, ensuring modular and predictable updates.
- **React Context API** – To handle theme management separately to keep it lightweight and efficient.

### **Custom Hooks**

- To encapsulate logic for better reusability and maintainability.
- Examples:
  - `useDataFetcher` – Fetches and caches data.
  - `useOrders` – Manages order-related state.
  - `usePagination` – Implements efficient pagination.

### **Data Visualization**

- **Recharts** – To render interactive charts for insights.
- **Dynamic Filters** – Enables real-time filtering and updates.

### **Data Handling**

- **Caching & validation** – To reduce API calls and ensures data consistency.
- **Memoized filtering & sorting** – Used `useMemo` to optimize performance.

### **Performance Optimizations**

- **Memoization** – Prevents redundant calculations.
- **Pagination** – Limits rendered rows for efficiency.
- **Caching** – Reduces API calls while keeping data fresh.

### **UI/UX Enhancements**

- **Tabs & sortable tables** – Organize and simplify data presentation.
- **Responsive design** – Ensures a seamless experience on all devices.
- **Color-coded badges** – Improve visual clarity.

### **Utility Functions**

- Includes `formatCurrency`, `formatDate`, and `timeAgo` for consistent data formatting.


