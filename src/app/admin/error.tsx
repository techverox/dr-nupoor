"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, LogIn, Home } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dr. Noopur Patel Admin Error Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6 text-slate-800 selection:bg-rose-500/20">
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Admin Portal Error
        </h2>
        
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {error?.message && process.env.NODE_ENV === "development"
            ? error.message
            : "An unexpected error occurred while loading this admin section. You can retry or return to the login screen."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/admin/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Admin Login</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-medium text-xs transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        {error?.digest && (
          <p className="mt-6 text-[11px] font-mono text-slate-400">
            Digest: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
