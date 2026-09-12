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
    console.error("[DigiVigee Admin Error Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6 text-white selection:bg-emerald-500/20">
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-zinc-100 mb-2">
          Admin Portal Error
        </h2>
        
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          {error?.message && process.env.NODE_ENV === "development"
            ? error.message
            : "An unexpected error occurred while loading this admin section. You can retry or return to the login screen."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-sm transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/admin/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Admin Login</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 font-medium text-xs transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        {error?.digest && (
          <p className="mt-6 text-[11px] font-mono text-zinc-600">
            Digest: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
