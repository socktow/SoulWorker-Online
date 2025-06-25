"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="Content" className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
      <div className="login-wrapper min-w-[50%] max-w-2xl w-full mx-auto bg-white rounded shadow-none p-0">
        <p className="title text-4xl font-bold text-center mt-16 mb-4 text-black">Login</p>
        <div className="w-full mx-auto border-b-2 border-black mb-10"></div>
        <form id="form" method="POST" className="flex flex-col gap-8 px-8 md:px-16 items-center w-full">
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
                autoComplete="username"
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
          <div className="w-full flex justify-center">
            <div className="relative w-[480px] mb-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-6 py-4 pr-20 bg-no-repeat text-black text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all peer"
                style={{
                  backgroundImage: 'url(/static/img/login/icon02.png)',
                  backgroundPosition: '98% 50%',
                  backgroundSize: '20px 27px',
                }}
                placeholder=""
                autoComplete="current-password"
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
          <button
            type="submit"
            className="btn-corner btn-loading w-full py-4 mt-2 mb-2 bg-black text-white font-bold text-xl rounded-none hover:bg-gray-900 transition-all max-w-[480px]"
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 91%, 88% 100%, 0 100%, 0 9%)' }}
          >
            Login
          </button>
        </form>
        <ul className="list-function flex justify-center gap-12 mt-6 mb-12 text-black text-lg">
          <li><a href="#" className="hover:underline">Find Account</a></li>
          <li><a href="#" className="hover:underline">Find Password</a></li>
          <li><a href="#" className="hover:underline">Create Account</a></li>
        </ul>
      </div>
    </div>
  );
} 