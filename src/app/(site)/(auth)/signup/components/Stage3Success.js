"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from '@/lib/auth/client';

export default function Stage3Success({ onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    const result = await signUp({ username, password, email: username }); // TODO: truyền đúng email nếu có
    setIsLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const handleGoToLogin = () => {
    router.push("/signin");
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white rounded-none shadow-none p-0 flex flex-col items-center">
          <div className="text-center mt-16 mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-center mb-4 text-black">Registration Completed!</p>
            <div className="w-full border-t-2 border-black mb-8"></div>
            <p className="text-base text-gray-700 mb-6">Your account has been successfully created. You can now log in and enjoy the game!</p>
            <button
              onClick={handleGoToLogin}
              className="btn-corner w-full py-4 bg-black text-white font-bold text-xl transition-all mt-2 mb-2"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-none shadow-none p-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-black text-center mt-12 mb-6">Registration</h1>
        <div className="w-full border-t-2 border-black mb-8"></div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center mb-4 w-full">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="flex flex-col gap-6 w-full items-center">
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white"
              autoComplete="username"
              disabled={isLoading}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-none text-black text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-corner w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <button
          type="button"
          onClick={onBack}
          className="text-blue-600 hover:underline text-sm mt-2"
          disabled={isLoading}
        >
          Back
        </button>
      </div>
    </div>
  );
} 