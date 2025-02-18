import { Link } from "react-router-dom";

const DashboardNavbar = ({ data }) => {
  const { role, coin, imgurl, name, email } = data || {};

  const allInfo = (
    <>
      <li className="text-sm font-medium">💰 Coins: {coin || "0"}</li>
      <li className="text-sm capitalize font-medium">👤 Role: {role || "N/A"}</li>
      <li className="text-sm font-medium">📛 Name: {name || "Guest"}</li>
      <li className="text-sm font-medium">✉️ Email: {email || "Not Provided"}</li>
      <li>
        <button className="btn btn-primary btn-sm">🔔 Notifications</button>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* Left Section */}
        <div className="navbar-start">
          <Link to={"/"} className="text-2xl font-bold tracking-wide">
            miCroTask
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-end">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className=" right-5 menu dropdown-content bg-white text-gray-700 rounded-box z-[1] mt-3 w-52 p-2 shadow-md">
              {allInfo}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <ul className="menu menu-horizontal space-x-4">{allInfo}</ul>
            {imgurl ? (
              <img
                src={imgurl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-700 font-bold">
                {name?.charAt(0) || "?"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
