"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Stage2Credentials({ email, onNext, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError("");

    try {
      const result = await signUp({ email, username, password });
      
      if (result.success) {
        // Registration successful, proceed to next stage
        onNext({ email, username, password });
      } else {
        setApiError(result.error || "Registration failed");
      }
    } catch (err) {
      setApiError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
      <div className="login-wrapper min-w-[50%] max-w-2xl w-full mx-auto bg-white rounded shadow-none p-0">
        <p className="title text-4xl font-bold text-center mt-16 mb-4 text-black">Create Account</p>
        <div className="w-full mx-auto border-b-2 border-black mb-10"></div>
        
        {apiError && (
          <div className="mb-4 px-8 md:px-16">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {apiError}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-8 md:px-16 items-center w-full">
          <div className="w-full flex justify-center">
            <div className="relative w-[480px] mb-4">
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`border rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{
                  backgroundImage: 'url(/static/img/login/icon01.png)',
                  backgroundPosition: '98% 50%',
                  backgroundSize: '20px 27px',
                }}
                placeholder=""
                autoComplete="username"
                disabled={isLoading}
              />
              <label
                htmlFor="username"
                className={`
                  absolute left-6 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500 bg-white px-1 transition-all pointer-events-none
                  ${username ? "text-xs -top-3.5 left-4 text-blue-600" : ""}
                  peer-focus:text-xs peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-blue-600
                `}
              >
                Username
              </label>
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm -mt-4">{errors.username}</p>
          )}
          
          <div className="w-full flex justify-center">
            <div className="relative w-[480px] mb-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`border rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{
                  backgroundImage: 'url(/static/img/login/icon02.png)',
                  backgroundPosition: '98% 50%',
                  backgroundSize: '20px 27px',
                }}
                placeholder=""
                autoComplete="new-password"
                disabled={isLoading}
              />
              <label
                htmlFor="password"
                className={`
                  absolute left-6 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500 bg-white px-1 transition-all pointer-events-none
                  ${password ? "text-xs -top-3.5 left-4 text-blue-600" : ""}
                  peer-focus:text-xs peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-blue-600
                `}
              >
                Password
              </label>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm -mt-4">{errors.password}</p>
          )}
          
          <div className="w-full flex justify-center">
            <div className="relative w-[480px] mb-4">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`border rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{
                  backgroundImage: 'url(/static/img/login/icon02.png)',
                  backgroundPosition: '98% 50%',
                  backgroundSize: '20px 27px',
                }}
                placeholder=""
                autoComplete="new-password"
                disabled={isLoading}
              />
              <label
                htmlFor="confirmPassword"
                className={`
                  absolute left-6 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500 bg-white px-1 transition-all pointer-events-none
                  ${confirmPassword ? "text-xs -top-3.5 left-4 text-blue-600" : ""}
                  peer-focus:text-xs peer-focus:-top-3.5 peer-focus:left-4 peer-focus:text-blue-600
                `}
              >
                Confirm Password
              </label>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm -mt-4">{errors.confirmPassword}</p>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !username || !password || !confirmPassword}
            className="btn-corner btn-loading w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl rounded-none hover:bg-gray-900 transition-all max-w-[480px] disabled:bg-gray-400 disabled:cursor-not-allowed"
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 91%, 88% 100%, 0 100%, 0 9%)' }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="text-blue-600 hover:underline text-sm"
            disabled={isLoading}
          >
            Back to Email Verification
          </button>
        </form>
      </div>
    </div>
  );
} 