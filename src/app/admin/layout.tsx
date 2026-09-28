import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminClientGuard } from "@/components/admin/AdminClientGuard";

export const metadata = {
  title: "Admin Portal | Dr. Noopur Patel Clinic",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light bg-[#F8FAFC] text-slate-900 min-h-screen" style={{ colorScheme: "light" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';`,
        }}
      />
      <AdminClientGuard>{children}</AdminClientGuard>
    </div>
  );
}

