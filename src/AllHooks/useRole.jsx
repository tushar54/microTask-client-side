import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { currentUser } = useAuth();
    const axiosSecure=useAxiosSecure()

    const { data: userdata, isLoading, error, refetch } = useQuery({
        queryKey: ['repoData', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/oneUser${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    return { userdata, isLoading, error, refetch };
};

export default useRole;
