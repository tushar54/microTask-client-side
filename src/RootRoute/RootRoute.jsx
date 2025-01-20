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
import WorkerSubmission from "../Allroute/Dashboard/Worker/WorkerSubmission";
import WorkerHome from '../Allroute/Dashboard/Worker/WorkerHome';
import Withdrawals from '../Allroute/Dashboard/Worker/Withdrawals';
import WorkerTaskList from '../Allroute/Dashboard/Worker/WorkerTaskList';
import Taskdetails from "../AllComponent/Taskdetails";
import AdminHome from "../Allroute/Dashboard/Admin/AdminHome"


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
        path:'AdminHome',
        element:<AdminHome></AdminHome>
      },
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
        path: 'buyerTask',
        element: <BuyerTask></BuyerTask>
      },
      {
        path: 'buyerPurchaseCoin',
        element: <BuyerPurchaseCoin></BuyerPurchaseCoin>
      },
      // worker route 
      {
        path: 'workerHome',
        element: <WorkerHome></WorkerHome>
      },
      {
        path: 'withdrawals',
        element: <Withdrawals></Withdrawals>
      },
      {
        path: 'workerSubmission',
        element: <WorkerSubmission></WorkerSubmission>
      },
      {
        path: 'workerTaskList',
        element: <WorkerTaskList></WorkerTaskList>,
       
      },
      {
        path: 'taskDetails/:id',
        element: <Taskdetails></Taskdetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/oneTaskDetails${params.id}`),
       
      }
      

    ]
  },
  

]);