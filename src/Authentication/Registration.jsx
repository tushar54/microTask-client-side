import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import { Context } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Registration = () => {
  const { SignUp, googleSignup } = useContext(Context);
  const navigate = useNavigate();
  const [googleRole, setGoogleRole] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setUploadedImageUrl(response.data.data.url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
    setUploading(false);
  };

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    const imgurl = uploadedImageUrl;
    const coin = role === "buyer" ? 50 : 10;

    try {
      const result = await SignUp(email, password);
      const user = result.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: imgurl,
      });

      await axios.post("https://micro-service-earning-platfrom-server-side.vercel.app/user", {
        name,
        email,
        imgurl,
        role,
        coin,
      });

      navigate("/Dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const logInwithGoogle = async () => {
    if (!googleRole) {
      alert("Please select a role before signing in with Google.");
      return;
    }
    const coin = googleRole === "buyer" ? 50 : 10;
    try {
      const result = await googleSignup();
      const user = result.user;
      await axios.post("https://micro-service-earning-platfrom-server-side.vercel.app/user", {
        name: user.displayName,
        email: user.email,
        imgurl: user.photoURL,
        role: googleRole,
        coin,
      });
      navigate("/Dashboard");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="hero mt-10 px-4 lg:px-0">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
        <div className="text-center lg:text-left lg:pr-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-indigo-700 mb-4">Create Your Account</h1>
          <p className="text-gray-600 lg:text-lg">
            Join us today to explore endless opportunities!
          </p>
        </div>
        <div className="card bg-base-100 shadow-xl w-full max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Profile Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must be at least 6 characters with uppercase and lowercase letters",
                  },
                })}
                className="input input-bordered"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                <option value="" disabled>
                  Select your role
                </option>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Register</button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-700 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </form>

          <div className="text-center mt-4 px-4">
            <select
              value={googleRole}
              onChange={(e) => setGoogleRole(e.target.value)}
              className="select select-bordered w-full mb-2"
            >
              <option value="" disabled>
                Select your role for Google Sign-In
              </option>
              <option value="buyer">Buyer</option>
              <option value="worker">Worker</option>
            </select>

            <div
              onClick={logInwithGoogle}
              className="border-2 border-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white transition"
            >
              <p className="font-bold flex justify-center items-center gap-2">
                <FcGoogle className="text-xl" /> Sign up with Google
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
