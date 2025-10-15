import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState("")
  const [otp , setOtp] = useState("");

  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack onClick={() => navigate("/signin")} className="cursor-pointer text-[#ff4d2d]" size={30} />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot password
          </h1>
        </div>
        {step == 1 && 
          <div>

            {/* email */}
            <div className="mb-6">
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
                className="w-full rounded-lg px-3 py-2 focus:outline-none border-[1px] border-gray-200"
                placeholder="Enter your Email"
              />
            </div>
            <button
          className={`w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Send Otp
        </button>
          </div>
        }

        {step == 2 && 
          <div>

            {/* otp */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                otp
              </label>
              <input
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="w-full rounded-lg px-3 py-2 focus:outline-none border-[1px] border-gray-200"
                placeholder="Enter Otp"
              />
            </div>
            <button
          className={`w-full font-semibold rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Send Otp
        </button>
          </div>
        }
        
      </div>
    </div>
  );
};

export default ForgotPassword;
