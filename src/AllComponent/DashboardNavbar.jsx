import { Link } from 'react-router-dom';

const DashboardNavbar = ({data}) => {
  

   
      const {role,coin,imgurl,name,email
      }= data||{}
      const allInfo=<>
      <li>{coin}</li>
      <li>{role}</li>
      <li>{name}</li>
      <li>{email}</li>
      
      <li><a>Notification</a></li>
      </>
     

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                  
                    <Link to={'/'} className="btn btn-ghost text-xl">miCroTask</Link>
                </div>
              
                <div className='navbar-end'>
                <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu absolute right-2 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 space-x-4 shadow">
                            {allInfo}
                        </ul>
                    </div>
                    <div className=" hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-3 px-1">
                        {allInfo}
                    </ul>
                </div>
                </div>
                
               
            </div>
        </div>
    );
};

export default DashboardNavbar;