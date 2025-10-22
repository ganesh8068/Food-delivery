import React from "react";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners"

const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]"
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Sign In
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delious food deliverirs
        </p>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Email"
            style={{
              border: `1px solid ${borderColor}`,
            }}
          />
        </div>

        {/* password  */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your password"
              style={{
                border: `1px solid ${borderColor}`,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
            >
              {showPassword ? <BsEyeSlashFill /> : <IoEyeSharp />}
            </button>
          </div>
        </div>

        <div
          className="cursor-pointer text-right mb-4 text-[#ff4d2d] font-medium"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </div>

        <button
          className={`w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white"/> : "Sign In"}
        </button>

        {err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}

        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-2 py-3 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer"
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        <p
          className="text-center mt-3 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new Account ?{" "}
          <span className="text-[#ff4d2d]">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
