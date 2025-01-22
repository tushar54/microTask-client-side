import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {

   const navigate=useNavigate
    const {Out}=useAuth()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('stoped by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    })
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    },
        async(error)=>{
            console.log('interceptor',error)
           await Out()
           navigate('/login')
            return Promise.reject(error);
        })
    return (
        axiosSecure
    );
};

export default useAxiosSecure;