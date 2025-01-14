import { createBrowserRouter } from "react-router-dom";
import Home from "../Allroute/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Home></Home>,
    },
  ]);