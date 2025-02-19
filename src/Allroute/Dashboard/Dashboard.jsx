import DashboardNavbar from "../../AllComponent/DashboardNavbar";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import useRole from "../../AllHooks/useRole";
import Footer from '../../AllComponent/Footer'

const Dashboard = () => {
  const { userdata } = useRole();
  const location = useLocation();

  const defaultRoute =
    userdata?.role === "admin"
      ? "AdminHome"
      : userdata?.role === "worker"
      ? "workerHome"
      : userdata?.role === "buyer"
      ? "buyerHome"
      : null;

  if (location.pathname === "/Dashboard" && defaultRoute) {
    return <Navigate to={defaultRoute} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <DashboardNavbar data={userdata} />

      <div className="lg:flex flex-grow">
        {/* Sidebar */}
        <div className="w-full lg:w-2/12 bg-gradient-to-b from-blue-500 to-blue-300 p-6 text-white">
          <h2 className="text-lg font-semibold mb-4">
            {userdata?.role?.toUpperCase()} Dashboard
          </h2>
          <div className="space-y-4">
            {userdata?.role === "worker" && (
              <>
                <NavLink
                  className="block  bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"workerHome"}
                >
                  Home
                </NavLink>
                <NavLink
                  className="block bg-white  text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"workerTaskList"}
                >
                  Task List
                </NavLink>
                <NavLink
                  className="block  bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"workerSubmission"}
                >
                  My Submissions
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"withdrawals"}
                >
                  Withdrawals
                </NavLink>
              </>
            )}
            {userdata?.role === "buyer" && (
              <>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"buyerHome"}
                >
                  Home
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"buyerAddTask"}
                >
                  Add New Tasks
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"buyerTask"}
                >
                  My Tasks
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"buyerPurchaseCoin"}
                >
                  Purchase Coin
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"paymentHistory"}
                >
                  Payment History
                </NavLink>
              </>
            )}
            {userdata?.role === "admin" && (
              <>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"AdminHome"}
                >
                  Home
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"manageuser"}
                >
                  Manage User
                </NavLink>
                <NavLink
                  className="block bg-white text-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md text-center"
                  to={"managetask"}
                >
                  Manage Task
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-6  shadow-md rounded-lg min-h-screen">
          <Outlet />
        </div>
      </div>
        <Footer></Footer>
        
    </div>
  );
};

export default Dashboard;
