"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#060B18] text-slate-900 dark:text-white font-sans selection:bg-emerald-500/30 px-4">
      
      {/* Centered Login Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-[#0B1120] rounded-[16px] shadow-[0_4px_24px_rgb(0,0,0,0.06)] dark:shadow-none border border-slate-100 dark:border-slate-800 p-10 relative">
        
        {/* Digivigee Logo (Centered) */}
        <div className="flex items-center justify-center mb-10">
          <div className="relative w-48 h-14">
            <Image 
              src="/images/doctor/assets/logo.png" 
              alt="Dr. Noopur Patel Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or corporate ID"
              className="w-full h-[44px] px-4 bg-[#F1F5F9] dark:bg-[#1E293B] border border-transparent rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00875A] transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
            
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[44px] px-4 bg-[#F1F5F9] dark:bg-[#1E293B] border border-transparent rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00875A] transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] mt-2 rounded-[8px] bg-[#00875A] hover:bg-[#00754E] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-[15px] font-semibold flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <span>Next</span>
            )}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-5 text-center">
          <a href="#" className="text-[14px] text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </div>


      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center text-[14px]">
        <span className="text-slate-600 dark:text-slate-400">Need admin access? </span>
        <a href="mailto:admin@noopur.com" className="text-[#00875A] hover:underline font-medium transition-colors">
          Contact Administrator
        </a>
      </div>
      
    </div>
  );
}
