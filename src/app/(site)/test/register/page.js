'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    setMessage('Sending OTP...');
    const res = await fetch('/api/public/auth/signup/sendotp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('OTP sent to email.');
      setStep(2);
    } else {
      setMessage(data.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    setMessage('Verifying OTP...');
    const res = await fetch('/api/public/auth/signup/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('OTP verified, continue to register.');
      setStep(3);
    } else {
      setMessage(data.error || 'Invalid OTP');
    }
  };

  const register = async () => {
    setMessage('Registering...');
    const res = await fetch('/api/public/auth/signup/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Register successful!');
      setStep(4);
    } else {
      setMessage(data.error || 'Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      {message && <p className="text-center text-sm text-blue-600">{message}</p>}

      {step === 1 && (
        <>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="w-full p-2 bg-blue-600 text-white rounded">Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="w-full p-2 bg-green-600 text-white rounded">Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={register} className="w-full p-2 bg-purple-600 text-white rounded">Register</button>
        </>
      )}

      {step === 4 && (
        <p className="text-center text-green-600 font-bold">🎉 You are registered successfully!</p>
      )}
    </div>
  );
}
