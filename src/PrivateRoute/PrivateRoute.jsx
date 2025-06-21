import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../AllHooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const location = useLocation();
    if (currentUser && currentUser?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;