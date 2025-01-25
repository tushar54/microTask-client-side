import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/login": "Login Page",
      "/": "Home",
      "/register": "Registration",
      "/Dashboard": "Dashboard",
      "/Dashboard/AdminHome": "AdminHome",
      "/Dashboard/manageuser": "AdminManageUser",
      "/Dashboard/managetask": "AdminManageTask",
      "/Dashboard/buyerHome": "BuyerHome",
      "/Dashboard/buyerAddTask": "BuyerAddTask",
      "/Dashboard/buyerTask": "BuyerTask",
      "/Dashboard/paymentHistory": "BuyerPaymentHistory",
      "/Dashboard/buyerPurchaseCoin": "BuyerPurchaseCoin",
      "/Dashboard/workerHome": "WorkerHome",
      "/Dashboard/withdrawals": "withdrawals",
      "/Dashboard/workerSubmission": "workerSubmission",
      "/Dashboard/workerTaskList": "workerTaskList",
    };

    // Check for dynamic routes or nested paths
    if (location.pathname.startsWith("/Dashboard/taskDetails/")) {
      const id = location.pathname.split("/")[3]; // Extract the dynamic ID
      document.title = `taskDetails - ${id || "Unknown"}`;
    } 
    else {
      document.title = routeTitles[location.pathname] || "Default Title";
    }
  }, [location]);

  return <Outlet />;
};

export default DynamicTitle;
