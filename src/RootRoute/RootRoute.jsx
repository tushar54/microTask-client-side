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
import WorkerSubmission from "../Allroute/Dashboard/Worker/WorkerSubmission";
import WorkerHome from '../Allroute/Dashboard/Worker/WorkerHome';
import Withdrawals from '../Allroute/Dashboard/Worker/Withdrawals';
import WorkerTaskList from '../Allroute/Dashboard/Worker/WorkerTaskList';
import Taskdetails from "../AllComponent/Taskdetails";
import AdminHome from "../Allroute/Dashboard/Admin/AdminHome"
import AdminPrivate from "../PrivateRoute/AdminPrivate";
import BuyerPrivate from "../PrivateRoute/BuyerPrivate"
import WorkerPrivate from '../PrivateRoute/WorkerPrivate'
import BuyerPurchaseCoin from '../Allroute/Dashboard/Buyer/BuyerPurchaseCoin'
import PaymentHistory from "../Allroute/Dashboard/Buyer/PaymentHistory";
import DynamicTitle from "../DynamicTitle/DynamicTitle";
import ErrorPage from "../Allroute/ErrorPage";
import About from "../Allroute/About";
import Profile from "../Allroute/Profile";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <DynamicTitle></DynamicTitle>,
    children: [
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
          },
          {
            path:'/aboutUs',
            element:<About></About>
          },
          {
            path:'Profile',
            element:<Profile></Profile>
          }
        ]
      },
      {
        path: '/Dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          // admin route
          {
            path: 'AdminHome',
            element: <AdminPrivate><AdminHome></AdminHome></AdminPrivate>
          },
          {
            path: "manageuser",
            element: <AdminPrivate><Manageuser></Manageuser></AdminPrivate>
          },
          {
            path: 'managetask',
            element: <AdminPrivate><ManageTask></ManageTask></AdminPrivate>
          },
          // buyer route 
          {
            path: 'buyerHome',
            element: <BuyerPrivate><BuyerHome></BuyerHome></BuyerPrivate>
          },
          {
            path: 'buyerAddTask',
            element: <BuyerPrivate><BuyerAddTask></BuyerAddTask></BuyerPrivate>
          },
          {
            path: 'buyerTask',
            element: <BuyerPrivate> <BuyerTask></BuyerTask></BuyerPrivate>
          },
          {
            path: 'buyerPurchaseCoin',
            element: <BuyerPrivate><BuyerPurchaseCoin></BuyerPurchaseCoin></BuyerPrivate>
          },
          {
            path: 'paymentHistory',
            element: <BuyerPrivate><PaymentHistory></PaymentHistory></BuyerPrivate>
          },
          // worker route 
          {
            path: 'workerHome',
            element: <WorkerPrivate><WorkerHome></WorkerHome></WorkerPrivate>
          },
          {
            path: 'withdrawals',
            element: <WorkerPrivate><Withdrawals></Withdrawals></WorkerPrivate>
          },
          {
            path: 'workerSubmission',
            element: <WorkerPrivate> <WorkerSubmission></WorkerSubmission></WorkerPrivate>
          },
          {
            path: 'workerTaskList',
            element: <WorkerPrivate><WorkerTaskList></WorkerTaskList></WorkerPrivate>

          },
          {
            path: 'taskDetails/:id',
            element: <WorkerPrivate><Taskdetails></Taskdetails></WorkerPrivate>,
            loader: ({ params }) => fetch(`https://micro-service-earning-platfrom-server-side.vercel.app/oneTaskDetails${params.id}`),

          }


        ]
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>,
  },


]);