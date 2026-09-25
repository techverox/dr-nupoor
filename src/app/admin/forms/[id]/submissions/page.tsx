"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { FormDefinition, FormSubmission } from "@/types/form";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Eye, 
  Inbox,
  Clock,
  Globe,
  Tag,
  Hash,
  X,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  ListFilter
} from "lucide-react";

export default function FormSubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const formId = resolvedParams.id;

  const [form, setForm] = useState<FormDefinition | null>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected Submission Detail Modal
  const [selectedSub, setSelectedSub] = useState<FormSubmission | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/admin/forms/${formId}/submissions`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success) {
          setForm(data.form);
          setSubmissions(data.submissions || []);
        }
      })
      .catch((err) => console.error("Error loading submissions:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [formId]);

  const filteredSubmissions = submissions.filter((sub) => {
    const valStr = JSON.stringify(sub.values || {}).toLowerCase();
    const matchesSearch =
      valStr.includes(searchQuery.toLowerCase()) ||
      (sub.source && sub.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.landingPageSlug && sub.landingPageSlug.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/forms"
            className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                {form ? form.name : "Loading Form..."}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                {submissions.length} Submissions
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Real-time incoming submissions captured from patient inquiries and consultation forms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/admin/forms/${formId}/builder`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Edit className="w-4 h-4 text-slate-500" />
            <span>Edit Form</span>
          </Link>

          <a
            href={`/api/admin/forms/${formId}/submissions?format=csv`}
            download
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter Bar */}
      <Card padding="md" className="bg-white border-slate-200 shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search submissions by submitter, email, phone, or answer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 sm:text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
              <div className="pl-2 pr-1 text-slate-400">
                <ListFilter className="w-4 h-4" />
              </div>
              {(["all", "new", "processed", "spam"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? "bg-white text-slate-900 shadow-sm font-bold"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Submissions Table */}
      <Card padding="none" className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin w-8 h-8 border-2 border-slate-300 border-t-rose-600 rounded-full mb-4"></div>
            <p className="text-sm font-medium">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No submissions found.
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search query or filters to find what you're looking for." 
                : "Submissions submitted through this form will automatically display here."}
            </p>
            {(searchQuery || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="mt-4 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitter Info</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Key Payload Values</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Source / Page</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted At</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map((sub) => {
                  const values = sub.values || {};
                  const name = String(values.name || values.fullName || values.contact_name || "Anonymous");
                  const email = String(values.email || values.work_email || "");
                  const phone = values.phone ? String(values.phone) : null;

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => setSelectedSub(sub)}
                    >
                      {/* Submitter */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{name}</div>
                        {email && (
                          <div className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                            {email}
                          </div>
                        )}
                        {phone && (
                          <div className="text-xs text-slate-400 mt-0.5">
                            {phone}
                          </div>
                        )}
                      </td>

                      {/* Values Snippet */}
                      <td className="px-5 py-4 max-w-[280px]">
                        <div className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {Object.entries(values)
                            .filter(([k]) => !["name", "email", "phone"].includes(k))
                            .map(([k, v], idx, arr) => (
                              <React.Fragment key={k}>
                                <span>
                                  <span className="font-medium text-slate-800">{k}:</span> {Array.isArray(v) ? v.join(", ") : String(v)}
                                </span>
                                {idx < arr.length - 1 && <span className="text-slate-300 mx-1">•</span>}
                              </React.Fragment>
                            ))}
                          {Object.entries(values).filter(([k]) => !["name", "email", "phone"].includes(k)).length === 0 && (
                            <span className="text-slate-400 italic">No additional fields</span>
                          )}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          {sub.landingPageSlug ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <Tag className="w-3.5 h-3.5 text-slate-400" />}
                          {sub.landingPageSlug ? `/landing/${sub.landingPageSlug}` : sub.pageUrl || sub.source}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Hash className="w-3 h-3 text-slate-400" /> tag: {sub.source}
                        </div>
                      </td>

                      {/* Submitted At */}
                      <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(sub.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                          })}
                        </div>
                        <div className="text-xs mt-0.5 ml-5 text-slate-400">
                           {new Date(sub.createdAt).toLocaleString("en-IN", {
                            timeStyle: "short",
                          })}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                          sub.status === "new" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : sub.status === "spam"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {sub.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSub(sub);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* SUBMISSION DETAILS MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-rose-600" />
                  Submission Details
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  ID: {selectedSub.id}
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              
              {/* Status Banner */}
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                selectedSub.status === 'new' 
                  ? "bg-blue-50 border-blue-200 text-blue-900" 
                  : selectedSub.status === 'spam'
                  ? "bg-red-50 border-red-200 text-red-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}>
                {selectedSub.status === 'new' && <Inbox className="w-5 h-5 text-blue-600" />}
                {selectedSub.status === 'spam' && <ShieldAlert className="w-5 h-5 text-red-600" />}
                {selectedSub.status === 'processed' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                <div>
                  <div className="font-bold uppercase tracking-wider text-sm">Status: {selectedSub.status}</div>
                  <div className="text-xs mt-0.5 opacity-80">This submission was captured on {new Date(selectedSub.createdAt).toLocaleDateString()}.</div>
                </div>
              </div>

              {/* Submitted Values Grid */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-slate-400" /> Submitted Form Fields
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  {Object.entries(selectedSub.values || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-slate-200/60 last:border-0 last:pb-0"
                    >
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider sm:w-1/3 shrink-0">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 break-words">
                        {Array.isArray(val) ? val.join(", ") : String(val || "—")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata Section */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-slate-400" /> Audit Metadata
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <div className="text-xs text-slate-500 mb-1">Submitted At</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(selectedSub.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <div className="text-xs text-slate-500 mb-1">IP Address</div>
                    <div className="text-sm font-mono font-medium text-slate-900">
                      {selectedSub.ipAddress || "Unknown"}
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <div className="text-xs text-slate-500 mb-1">Source Tag</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      {selectedSub.source || "N/A"}
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <div className="text-xs text-slate-500 mb-1">Landing Page</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {selectedSub.landingPageSlug || "Direct / Embedded"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Link if available */}
              {selectedSub.leadId && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Synchronized to Consultation Lead
                    </div>
                    <div className="text-xs text-emerald-700 mt-1 font-mono">
                      Lead ID: {selectedSub.leadId}
                    </div>
                  </div>
                  <Link
                    href={`/admin/leads?id=${selectedSub.leadId}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    View Lead <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
