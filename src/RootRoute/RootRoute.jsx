import { createBrowserRouter } from "react-router-dom";
import Home from "../Allroute/Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Allroute/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Manageuser from "../Allroute/Dashboard/Manageuser";
import ManageTask from "../Allroute/Dashboard/ManageTask";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Home></Home>,
      children:[
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Registration></Registration>
        }
      ]
    },
    {
      path:'/Dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // admin route
        {
          path:"manageuser",
          element:<Manageuser></Manageuser>
        },
        {
          path:'managetask',
          element:<ManageTask></ManageTask>
        }
      ]
    }
   
  ]);