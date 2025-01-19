import DashboardNavbar from '../../AllComponent/DashboardNavbar';
import { Link, Outlet } from 'react-router-dom';
import useQueryForBuyer from '../../AllHooks/useQueryForBuyer';

const Dashboard = () => {
    const{userdata}=useQueryForBuyer()
   
    // console.log(userdata.role)
    return (
        <div className='container mx-auto'>
            <DashboardNavbar data={userdata} ></DashboardNavbar>
            <div className='flex justify-center gap-6'>
                <div className='w-2/12  bg-yellow-600 h-[150vh]'>
                    {
                        userdata?.role === 'worker' && <> 
                        <Link to={'workerTaskList'}>Task List</Link> <br />
                        <Link to={'workerSubmission'}>My Submissions</Link> <br />
                        <Link to={'withdrawals'}>withdrawals</Link>
                        </>
                    }
                    {
                        userdata?.role==='buyer'&&
                        <>
                        <Link to={'buyerHome'}>Home</Link><br />
                         <Link to={'buyerAddTask'}>Add new Tasks</Link> <br />
                         <Link to={'buyerTask'}>My Task’s</Link> <br />
                         <Link to={'buyerPurchaseCoin'}>Purchase Coin</Link>
                        </>
                    }
                    {
                        userdata?.role==='admin'&&
                        <>
                        
                         <Link to={"manageuser"}>Manage User</Link> <br />
                         <Link to={"managetask"}>Manage Task</Link>
                        </>
                    }
                </div>
                <div className=' w-8/12'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;