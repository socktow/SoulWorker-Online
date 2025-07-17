'use client';
import { useEffect, useState } from 'react';

export default function TestMiddlewarePage() {
  const [status, setStatus] = useState('❓ Không xác định');

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/testmiddleware', { credentials: 'include' });
      const authStatus = res.headers.get('X-Auth-Status');

      if (authStatus === 'not-user') setStatus('🚫 Không phải user, middleware chặn');
      else if (authStatus === 'user') setStatus('✅ Là user, middleware không chặn');
      else if (authStatus === 'admin') setStatus('✅ Là admin, middleware không chặn');
      else setStatus('❓ Không xác định');
    };

    fetchStatus();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Test Middleware</h1>
      <p className="mt-4 text-lg">{status}</p>
    </div>
  );
}
