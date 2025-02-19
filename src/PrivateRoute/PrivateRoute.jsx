import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../AllHooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const location = useLocation();
    // if (loading) {
    //     return <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
    //         <span className="loading loading-dots loading-lg"></span>
    //     </div>
    // }

    if (currentUser && currentUser?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;