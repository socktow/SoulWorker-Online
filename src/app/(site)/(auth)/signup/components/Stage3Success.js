"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Stage3Success({ userData, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoToDashboard = () => {
    setIsLoading(true);
    // Redirect to dashboard since user is already authenticated
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
      <div className="login-wrapper min-w-[50%] max-w-2xl w-full mx-auto bg-white rounded shadow-none p-0">
        <div className="text-center mt-16 mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="title text-4xl font-bold text-center mb-4 text-black">Registration Successful!</p>
          <div className="w-full mx-auto border-b-2 border-black mb-10"></div>
        </div>
        
        <div className="px-8 md:px-16 mb-8">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-black mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-black font-semibold">{userData.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Username:</span>
                <span className="text-black font-semibold">{userData.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Account Status:</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Registration Date:</span>
                <span className="text-black font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-blue-800 text-sm">
                Your account has been successfully created and you are now logged in. You can access your dashboard.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 px-8 md:px-16 items-center w-full mb-12">
          <button
            onClick={handleGoToDashboard}
            disabled={isLoading}
            className="btn-corner btn-loading w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl rounded-none hover:bg-gray-900 transition-all max-w-[480px] disabled:bg-gray-400 disabled:cursor-not-allowed"
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 91%, 88% 100%, 0 100%, 0 9%)' }}
          >
            {isLoading ? "Redirecting..." : "Go to Dashboard"}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="text-blue-600 hover:underline text-sm"
            disabled={isLoading}
          >
            Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
} 