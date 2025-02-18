import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Context } from '../Context/AuthContext';
import axios from 'axios';





const Login = () => {
    const { Signin, googleSignup, loading } = useContext(Context);
    const [googleRole, setGoogleRole] = useState("");

    const navigate = useNavigate()
    const [error, setError] = useState('');
    const location = useLocation()


    // signInwithpassword
    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        Signin(email, password)
            .then((result) => {
                setError('');
                if (!loading) {
                    navigate(location?.state ? location.state : '/Dashboard')
                }


            })
            .catch((error) => {
                console.error("Login error:", error);

                if (error.code === 'auth/wrong-password') {
                    setError('Incorrect password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    setError('No user found with this email.');
                } else {
                    setError('Login failed. Please try again.');
                }

            });
    };
    // google login
    const logInwithGoogle = async () => {
        if (!googleRole) {
          alert("Please select a role before signing in with Google.");
          return;
        }
        const coin = googleRole==='buyer'?50:10
        try {
          const result = await googleSignup();
          const user = result.user;
          await axios.post("https://micro-service-earning-platfrom-server-side.vercel.app/user", {
            name: user.displayName,
            email: user.email,
            imgurl: user.photoURL,
            role: googleRole,
            coin
          });
          navigate(location?.state ? location.state:'/Dashboard')
        } catch (error) {
          console.error("Google sign-in failed:", error);
        }
      };

    // Redirect to forgot password
    const handleForgotPassword = () => {
        const email = document.querySelector('input[name="email"]').value;
        navigate('/forgot-password', { state: { email } });
    };

    return (
        <div>
            {/* <div><Navbar /></div> */}
            <div className="hero min-h-screen mt-10">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2x">
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                               
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn ">Login</button>
                            </div>
                            {error?<><h1 className='text-center text-red-700'>{error}</h1></>:''}
                            <div className='text-center'>
                                <h1>
                                    If you don't have an account please{' '}
                                    <Link to={'/register'} className="text-blue-700">
                                        Register
                                    </Link>
                                </h1>
                            </div>
                            <div className="text-center m-2">
                                <select
                                    value={googleRole}
                                    onChange={(e) => setGoogleRole(e.target.value)}
                                    className="select select-bordered mb-2"
                                >
                                    <option value="" disabled>Select your role for Google Sign-In</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="worker">Worker</option>
                                </select>
                                <div onClick={logInwithGoogle} className="border-2 px-2 py-3 cursor-pointer">
                                    <p className="font-bold flex justify-center items-center gap-2">
                                        <FcGoogle className="text-xl" /> Signup with Google
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div><Footer></Footer></div> */}
        </div>
    );
};

export default Login;
