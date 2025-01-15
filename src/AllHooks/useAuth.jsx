import { useContext } from "react";
import { Context } from "../Context/AuthContext";


const useAuth = () => {
    const context = useContext(Context)
    return (
        context
    );
};

export default useAuth;