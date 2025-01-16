import { createBrowserRouter } from "react-router-dom";
import Home from "../Allroute/Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Allroute/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Manageuser from "../Allroute/Dashboard/Admin/Manageuser";
import ManageTask from "../Allroute/Dashboard/Admin/ManageTask";
import BuyerHome from "../Allroute/Dashboard/Buyer/BuyerHome";
import BuyerAddTask from '../Allroute/Dashboard/Buyer/BuyerAddTask';
import BuyerTask from '../Allroute/Dashboard/Buyer/BuyerTask';
import BuyerPurchaseCoin from '../Allroute/Dashboard/Buyer/BuyerPurchaseCoin';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      }
    ]
  },
  {
    path: '/Dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // admin route
      {
        path: "manageuser",
        element: <Manageuser></Manageuser>
      },
      {
        path: 'managetask',
        element: <ManageTask></ManageTask>
      },
      // buyer route 
      {
        path: 'buyerHome',
        element: <BuyerHome></BuyerHome>
      },
      {
        path: 'buyerAddTask',
        element: <BuyerAddTask></BuyerAddTask>
      },
      {
        path:'buyerTask',
        element:<BuyerTask></BuyerTask>
      },
      {
        path:'buyerPurchaseCoin',
        element:<BuyerPurchaseCoin></BuyerPurchaseCoin>
      }
    ]
  }

]);