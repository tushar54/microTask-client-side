import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import { Context } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

const Registration = () => {
  const { SignUp, googleSignup } = useContext(Context);
  const navigate = useNavigate();
  const [googleRole, setGoogleRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, imgurl, email, password, role } = data;
    const coin = role==='buyer'?50:10

    try {
      const result = await SignUp(email, password);
      const user = result.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: imgurl,
      });

      await axios.post("http://localhost:5000/user", {
        name,
        email,
        imgurl,
        role,
        coin
      });

      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const logInwithGoogle = async () => {
    if (!googleRole) {
      alert("Please select a role before signing in with Google.");
      return;
    }
    const coin = googleRole==='buyer'?50:10
    try {
      const result = await googleSignup();
      const user = result.user;
      await axios.post("http://localhost:5000/user", {
        name: user.displayName,
        email: user.email,
        imgurl: user.photoURL,
        role: googleRole,
        coin
      });
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="hero mt-10">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
        </div>
        <div className="card bg-base-100 shadow-2xl w-[500px]">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                {...register("imgurl", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
                    message: "Invalid image URL",
                  },
                })}
                className="input input-bordered"
              />
              {errors.imgurl && <p className="text-red-500">{errors.imgurl.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Password must be at least 6 characters with uppercase and lowercase letters",
                  },
                })}
                className="input input-bordered"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Role</span>
              </label>
              <select
                defaultValue=""
                {...register("role", { required: "Role is required" })}
                className="select select-bordered"
              >
                <option value="" disabled>Select your role</option>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <div className="text-center">
              <h1>
                Already have an account? <Link to="/login" className="text-green-700">Login</Link>
              </h1>
            </div>
          </form>
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
        </div>
      </div>
    </div>
  );
};

export default Registration;
