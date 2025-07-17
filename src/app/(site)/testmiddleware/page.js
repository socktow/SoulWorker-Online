'use client';
import { useEffect, useState } from 'react';

export default function TestMiddlewarePage() {
  const [status, setStatus] = useState('⏳ Loading...');

  useEffect(() => {
    const checkStatus = async () => {
      const res = await fetch('/testmiddleware', { credentials: 'include' });
      const role = res.headers.get('X-Auth-Status');

      if (role === 'admin') setStatus('✅ Admin');
      else if (role === 'user') setStatus('✅ User');
      else setStatus('🚫 Not authenticated');
    };

    checkStatus();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Test Middleware</h1>
      <p className="mt-4 text-lg">{status}</p>
    </div>
  );
}
