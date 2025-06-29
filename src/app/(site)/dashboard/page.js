"use client";
import { useEffect, useState } from 'react';
import { getUser, signOut } from '@/lib/auth';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
            
            {user && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome, {user.username}!</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-medium">{user.id}</span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Login:</span>
                      <span className="font-medium">
                        {new Date(user.lastLogin).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication Status</h3>
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✅ You are successfully authenticated!
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 