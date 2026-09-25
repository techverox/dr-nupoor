import React from "react";
import Link from "next/link";
import { DashboardLeadItem } from "@/lib/services/dashboardService";
import { Badge } from "@/components/ui/Badge";

export interface RecentLeadsTableProps {
  leads: DashboardLeadItem[];
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return <Badge variant="primary-solid" size="sm">NEW</Badge>;
      case "contacted":
        return <Badge variant="info" size="sm">CONTACTED</Badge>;
      case "qualified":
        return <Badge variant="primary-subtle" size="sm">QUALIFIED</Badge>;
      case "converted":
        return <Badge variant="primary-solid" size="sm">CONVERTED</Badge>;
      case "lost":
        return <Badge variant="error" size="sm">LOST</Badge>;
      default:
        return <Badge variant="outline" size="sm">{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden h-full">
      {/* Table Header */}
      <div className="px-5 sm:px-6 py-4.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/90 bg-white">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Consultation Requests &amp; Inquiries
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Real-time inquiries captured from patient consultation and appointment forms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            {leads.length} {leads.length === 1 ? "Record" : "Records"}
          </span>

          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors no-underline"
          >
            Manage All Consultations →
          </Link>
        </div>
      </div>

      {/* Table / Content */}
      {leads.length === 0 ? (
        <div className="px-6 py-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            No Consultations Submitted Yet
          </h4>
          <p className="text-xs text-slate-500 max-w-[380px]">
            New inquiries submitted through the website consultation and contact forms will be synchronized and listed here in real-time.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/90">
              <tr>
                <th className="px-6 py-3.5 font-bold">Patient / Contact</th>
                <th className="px-6 py-3.5 font-bold">Clinical Care Interest</th>
                <th className="px-6 py-3.5 font-bold">Submitted At</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
                <th className="px-6 py-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div className="font-bold text-slate-900 text-xs sm:text-[13px]">{lead.name}</div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                    {lead.phone && (
                      <div className="text-[11px] text-slate-400 font-mono">{lead.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-slate-700 text-xs sm:text-[13px] font-medium">
                    {lead.service || "General Inquiry"}
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 text-xs tabular-nums font-mono">
                    {lead.createdAt}
                  </td>
                  <td className="px-6 py-3.5">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      href="/admin/leads"
                      className="inline-flex text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg transition-colors no-underline shadow-2xs"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
