import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      setLoading(true)
      setError("");
      await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setLoading(false)
      setStep(2);
    } catch (error) {
      setError("Failed to send OTP. Please check the email.");
      console.log(error);
      setLoading(false)
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      setError("");
      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false)
      setStep(3);
    } catch (error) {
      setError("Invalid OTP. Please try again.");
      console.log(error);
      setLoading(false)
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true)
      setError("");
      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setLoading(false)
      navigate("/signin");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            onClick={() => navigate("/signin")}
            className="cursor-pointer text-[#ff4d2d]"
            size={30}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot password
          </h1>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
        )}

        {step === 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-200"
                placeholder="Enter your Email"
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white"/> : "Send Otp"}
              
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-200"
                placeholder="Enter OTP"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white"/> : "Verify Otp"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className="w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-200"
                placeholder="Enter New Password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-200"
                placeholder="Confirm New Password"
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white"/> : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
