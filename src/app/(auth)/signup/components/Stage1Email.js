"use client";
import { useState } from "react";

export default function Stage1Email({ onNext }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onNext({ email, otp });
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
      <div className="login-wrapper min-w-[50%] max-w-2xl w-full mx-auto bg-white rounded shadow-none p-0">
        <p className="title text-4xl font-bold text-center mt-16 mb-4 text-black">Register</p>
        <div className="w-full mx-auto border-b-2 border-black mb-10"></div>
        
        {!showOtp ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-8 px-8 md:px-16 items-center w-full">
            <div className="w-full flex justify-center">
              <div className="relative w-[480px] mb-4">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer"
                  style={{
                    backgroundImage: 'url(/static/img/login/icon01.png)',
                    backgroundPosition: '98% 50%',
                    backgroundSize: '20px 27px',
                  }}
                  placeholder=""
                  autoComplete="email"
                />
                <label
                  htmlFor="email"
                  className={`
                    absolute left-6 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500 bg-white px-1 transition-all pointer-events-none
                    ${email ? "text-xs -top-3.5 left-4 text-blue-600" : ""}
                    peer-focus:text-xs peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-blue-600
                  `}
                >
                  Email
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="btn-corner btn-loading w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl rounded-none hover:bg-gray-900 transition-all max-w-[480px] disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 91%, 88% 100%, 0 100%, 0 9%)' }}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8 px-8 md:px-16 items-center w-full">
            <div className="w-full flex justify-center">
              <div className="relative w-[480px] mb-4">
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="border border-gray-300 rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer text-center tracking-widest"
                  style={{
                    backgroundImage: 'url(/static/img/login/icon02.png)',
                    backgroundPosition: '98% 50%',
                    backgroundSize: '20px 27px',
                  }}
                  placeholder=""
                  maxLength={6}
                />
                <label
                  htmlFor="otp"
                  className={`
                    absolute left-6 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500 bg-white px-1 transition-all pointer-events-none
                    ${otp ? "text-xs -top-3.5 left-4 text-blue-600" : ""}
                    peer-focus:text-xs peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-blue-600
                  `}
                >
                  OTP Code
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              We've sent a 6-digit code to <strong>{email}</strong>
            </p>
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="btn-corner btn-loading w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl rounded-none hover:bg-gray-900 transition-all max-w-[480px] disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 91%, 88% 100%, 0 100%, 0 9%)' }}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="text-blue-600 hover:underline text-sm"
            >
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 