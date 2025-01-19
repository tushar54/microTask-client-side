import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useQueryForBuyer = () => {
    const { currentUser } = useAuth();

    const { data: userdata, isLoading, error, refetch } = useQuery({
        queryKey: ['repoData', currentUser?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/oneUser?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    return { userdata, isLoading, error, refetch };
};

export default useQueryForBuyer;
