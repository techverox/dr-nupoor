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
            className="inline-flex items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                {form ? form.name : "Loading Form..."}
              </h1>
              <Badge variant="primary-subtle" size="sm" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {submissions.length} Submissions
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Real-time incoming submissions captured from this form.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/admin/forms/${formId}/builder`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Form</span>
          </Link>

          <a
            href={`/api/admin/forms/${formId}/submissions?format=csv`}
            download
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter Bar */}
      <Card padding="md" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search submissions by submitter, email, phone, or answer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg leading-5 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100 sm:text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700 shrink-0">
              <div className="pl-2 pr-1 text-zinc-400">
                <ListFilter className="w-4 h-4" />
              </div>
              {(["all", "new", "processed", "spam"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
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
      <Card padding="none" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
            <div className="animate-spin w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100 rounded-full mb-4"></div>
            <p className="text-sm font-medium">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              No submissions found.
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
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
                className="mt-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg text-sm font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Submitter Info</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Key Payload Values</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Source / Page</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Submitted At</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredSubmissions.map((sub) => {
                  const values = sub.values || {};
                  const name = String(values.name || values.fullName || values.contact_name || "Anonymous");
                  const email = String(values.email || values.work_email || "");
                  const phone = values.phone ? String(values.phone) : null;

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedSub(sub)}
                    >
                      {/* Submitter */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">{name}</div>
                        {email && (
                          <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                            {email}
                          </div>
                        )}
                        {phone && (
                          <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                            {phone}
                          </div>
                        )}
                      </td>

                      {/* Values Snippet */}
                      <td className="px-5 py-4 max-w-[280px]">
                        <div className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {Object.entries(values)
                            .filter(([k]) => !["name", "email", "phone"].includes(k))
                            .map(([k, v], idx, arr) => (
                              <React.Fragment key={k}>
                                <span>
                                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{k}:</span> {Array.isArray(v) ? v.join(", ") : String(v)}
                                </span>
                                {idx < arr.length - 1 && <span className="text-zinc-300 dark:text-zinc-600 mx-1">•</span>}
                              </React.Fragment>
                            ))}
                          {Object.entries(values).filter(([k]) => !["name", "email", "phone"].includes(k)).length === 0 && (
                            <span className="text-zinc-400 italic">No additional fields</span>
                          )}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          {sub.landingPageSlug ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <Tag className="w-3.5 h-3.5 text-zinc-400" />}
                          {sub.landingPageSlug ? `/landing/${sub.landingPageSlug}` : sub.pageUrl || sub.source}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                          <Hash className="w-3 h-3" /> tag: {sub.source}
                        </div>
                      </td>

                      {/* Submitted At */}
                      <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(sub.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                          })}
                        </div>
                        <div className="text-xs mt-0.5 ml-5">
                           {new Date(sub.createdAt).toLocaleString("en-IN", {
                            timeStyle: "short",
                          })}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                          sub.status === "new" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                            : sub.status === "spam"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
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
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-zinc-400" />
                  Submission Details
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  ID: {selectedSub.id}
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              
              {/* Status Banner */}
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                selectedSub.status === 'new' 
                  ? "bg-blue-50 border-blue-100 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-300" 
                  : selectedSub.status === 'spam'
                  ? "bg-red-50 border-red-100 text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-300"
                  : "bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-300"
              }`}>
                {selectedSub.status === 'new' && <Inbox className="w-5 h-5" />}
                {selectedSub.status === 'spam' && <ShieldAlert className="w-5 h-5" />}
                {selectedSub.status === 'processed' && <CheckCircle2 className="w-5 h-5" />}
                <div>
                  <div className="font-bold uppercase tracking-wider text-sm">Status: {selectedSub.status}</div>
                  <div className="text-xs mt-0.5 opacity-80">This submission was captured on {new Date(selectedSub.createdAt).toLocaleDateString()}.</div>
                </div>
              </div>

              {/* Submitted Values Grid */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ListFilter className="w-4 h-4" /> Submitted Form Fields
                </h4>
                <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
                  {Object.entries(selectedSub.values || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-zinc-200/60 dark:border-zinc-700/60 last:border-0 last:pb-0"
                    >
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider sm:w-1/3 shrink-0">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 break-words">
                        {Array.isArray(val) ? val.join(", ") : String(val || "—")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata Section */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" /> Audit Metadata
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Submitted At</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {new Date(selectedSub.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">IP Address</div>
                    <div className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      {selectedSub.ipAddress || "Unknown"}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Source Tag</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-zinc-400" />
                      {selectedSub.source || "N/A"}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Landing Page</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      {selectedSub.landingPageSlug || "Direct / Embedded"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Link if available */}
              {selectedSub.leadId && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="text-sm font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Synchronized to CRM Lead
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-500 mt-1 font-mono">
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
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-2xl flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
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
