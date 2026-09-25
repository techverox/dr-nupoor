"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FormDefinition,
  FormField,
  FormFieldType,
  FormFieldOption,
} from "@/types/form";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/forms/Input";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { 
  ArrowLeft, 
  Settings, 
  Layers, 
  Save, 
  Eye, 
  PenTool, 
  Inbox, 
  Type, 
  Mail, 
  Phone, 
  AlignLeft, 
  ChevronDown, 
  CircleDot, 
  CheckSquare, 
  Lock, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";

function isSafeRedirectUrl(url: string | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
}

export default function FormBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const formId = resolvedParams.id;
  const router = useRouter();

  const [form, setForm] = useState<FormDefinition | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<"field" | "form">("field");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Form from Server
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/admin/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.form) {
          setForm(data.form);
          if (data.form.fields && data.form.fields.length > 0) {
            setSelectedFieldId(data.form.fields[0].id);
          }
        } else {
          alert(data.error || "Failed to load form.");
          router.push("/admin/forms");
        }
      })
      .catch(() => {
        if (isMounted) {
          alert("Error loading form data.");
          router.push("/admin/forms");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [formId, router]);

  // Selected Field Helper
  const selectedField = form?.fields?.find((f) => f.id === selectedFieldId) || null;

  // Add a new Field of given Type
  const handleAddField = (type: FormFieldType, preset?: Partial<FormField>) => {
    if (!form) return;

    const newOrder = (form.fields || []).length;
    const baseLabel =
      type === "text"
        ? "Text Input"
        : type === "email"
        ? "Patient Email Address"
        : type === "phone"
        ? "Contact Number"
        : type === "textarea"
        ? "Clinical Query / Symptoms"
        : type === "select"
        ? "Dropdown Selection"
        : type === "radio"
        ? "Single Choice"
        : type === "checkbox"
        ? "Multi-Select Options"
        : "Tracking Parameter";

    const baseName =
      preset?.name ||
      `${type}_${Date.now().toString().slice(-4)}`;

    const newField: FormField = {
      id: `fld-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      name: baseName,
      label: preset?.label || baseLabel,
      placeholder: preset?.placeholder || (type === "email" ? "patient@example.com" : type === "phone" ? "+91 98765 43210" : ""),
      helpText: preset?.helpText || "",
      required: preset?.required ?? (type === "email" || type === "text"),
      width: preset?.width || (type === "textarea" || type === "checkbox" ? "full" : "half"),
      order: newOrder,
      isVisible: true,
      options:
        preset?.options ||
        (type === "select" || type === "radio" || type === "checkbox"
          ? [
              { label: "Option 1", value: "option_1" },
              { label: "Option 2", value: "option_2" },
              { label: "Option 3", value: "option_3" },
            ]
          : undefined),
    };

    const updatedFields = [...(form.fields || []), newField];
    setForm({ ...form, fields: updatedFields });
    setSelectedFieldId(newField.id);
    setActiveInspectorTab("field");
    setIsDirty(true);
  };

  // Update selected field attributes
  const handleUpdateSelectedField = (updates: Partial<FormField>) => {
    if (!form || !selectedFieldId) return;

    const updatedFields = (form.fields || []).map((f) =>
      f.id === selectedFieldId ? { ...f, ...updates } : f
    );

    setForm({ ...form, fields: updatedFields });
    setIsDirty(true);
  };

  // Delete field
  const handleDeleteField = (fieldId: string) => {
    if (!form) return;
    const remaining = (form.fields || []).filter((f) => f.id !== fieldId);
    // Re-index order
    const reordered = remaining.map((f, idx) => ({ ...f, order: idx }));
    setForm({ ...form, fields: reordered });
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(reordered[0]?.id || null);
    }
    setIsDirty(true);
  };

  // Duplicate field
  const handleDuplicateField = (field: FormField) => {
    if (!form) return;
    const copy: FormField = {
      ...JSON.parse(JSON.stringify(field)),
      id: `fld-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${field.name}_copy`,
      label: `${field.label} (Copy)`,
      order: (form.fields || []).length,
    };
    const updated = [...(form.fields || []), copy];
    setForm({ ...form, fields: updated });
    setSelectedFieldId(copy.id);
    setIsDirty(true);
  };

  // Move Field Up or Down
  const handleMoveField = (index: number, direction: "up" | "down") => {
    if (!form || !form.fields) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= form.fields.length) return;

    const newFields = [...form.fields];
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;

    // Re-assign order numbers
    newFields.forEach((f, idx) => {
      f.order = idx;
    });

    setForm({ ...form, fields: newFields });
    setIsDirty(true);
  };

  // Save Form Definition to API
  const handleSaveForm = async () => {
    if (!form) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/forms/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success && data.form) {
        setForm(data.form);
        setIsDirty(false);
        setToastMessage("Form saved successfully!");
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        alert(data.error || "Failed to save form.");
      }
    } catch {
      alert("Network error while saving form.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !form) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="animate-spin w-10 h-10 border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full mx-auto mb-4"></div>
        <div className="text-lg font-medium">Loading Form Builder...</div>
      </div>
    );
  }

  const getFieldIcon = (type: FormFieldType) => {
    switch (type) {
      case "text": return <Type className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      case "textarea": return <AlignLeft className="w-4 h-4" />;
      case "select": return <ChevronDown className="w-4 h-4" />;
      case "radio": return <CircleDot className="w-4 h-4" />;
      case "checkbox": return <CheckSquare className="w-4 h-4" />;
      case "hidden": return <Lock className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-6 bg-slate-100/70 overflow-hidden">
      {/* 1. TOP TOOLBAR */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 py-4 bg-white border-b border-slate-200 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/forms"
            className="inline-flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-bold text-slate-900 leading-none">
                {form.name}
              </h1>

              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                form.status === "active" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}>
                {form.status === "active" ? "Live" : "Inactive"}
              </span>

              {isDirty && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              slug: {form.slug}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Submissions shortcut */}
          <Link
            href={`/admin/forms/${form.id}/submissions`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Inbox className="w-4 h-4 text-slate-500" />
            Submissions ({form.totalSubmissions || 0})
          </Link>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setIsPreviewMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isPreviewMode 
                  ? "bg-white text-slate-900 shadow-sm font-bold" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-rose-600" /> Builder
            </button>
            <button
              onClick={() => setIsPreviewMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isPreviewMode 
                  ? "bg-white text-slate-900 shadow-sm font-bold" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-rose-600" /> Preview
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveForm}
            disabled={!isDirty || isSaving}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold min-w-[120px] transition-all shadow-sm ${
              !isDirty || isSaving
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                : "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/20"
            }`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Form"}
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-PANEL LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* ================= LEFT PANEL: FIELD PALETTE ================= */}
        {!isPreviewMode && (
          <aside className="w-72 bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 custom-scrollbar">
            <div className="p-5">
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-rose-600" /> Field Library
                </h3>
                <p className="text-xs text-slate-500">
                  Click any component to add it to your form canvas.
                </p>
              </div>

              {/* Standard Field Types */}
              <div className="space-y-2">
                {[
                  { type: "text" as FormFieldType, label: "Single Line Text" },
                  { type: "email" as FormFieldType, label: "Email Address" },
                  { type: "phone" as FormFieldType, label: "Phone Number" },
                  { type: "textarea" as FormFieldType, label: "Paragraph / Textarea" },
                  { type: "select" as FormFieldType, label: "Dropdown Select" },
                  { type: "radio" as FormFieldType, label: "Radio Selection" },
                  { type: "checkbox" as FormFieldType, label: "Checkbox Group" },
                  { type: "hidden" as FormFieldType, label: "Hidden Field" },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleAddField(item.type)}
                    className="flex items-center gap-3 w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-rose-50/40 hover:border-rose-200 hover:text-slate-900 transition-all text-left shadow-xs group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-700 transition-colors">
                      {getFieldIcon(item.type)}
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Preset Starters */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Clinical Presets
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleAddField("select", {
                        name: "consultation_type",
                        label: "Consultation / Care Type",
                        width: "half",
                        options: [
                          { label: "OPD Consultation (Marengo CIMS)", value: "cims_opd" },
                          { label: "Second Opinion / Biopsy Review", value: "second_opinion" },
                          { label: "Surgery Pre-Op Evaluation", value: "surgery_preop" },
                          { label: "Routine Screening / Mammogram", value: "screening" },
                        ],
                      })
                    }
                    className="flex items-center gap-2 w-full p-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-900 transition-colors text-left"
                  >
                    <Plus className="w-3.5 h-3.5 text-rose-600" /> Consultation Type
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddField("radio", {
                        name: "preferred_slot",
                        label: "Preferred Appointment Slot",
                        width: "half",
                        options: [
                          { label: "Morning OPD (10:00 AM - 1:00 PM)", value: "morning" },
                          { label: "Evening OPD (5:00 PM - 8:00 PM)", value: "evening" },
                          { label: "Urgent Slot (Next Available)", value: "urgent" },
                        ],
                      })
                    }
                    className="flex items-center gap-2 w-full p-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-900 transition-colors text-left"
                  >
                    <Plus className="w-3.5 h-3.5 text-rose-600" /> Preferred Slot Radio
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddField("text", {
                        name: "patient_city",
                        label: "Patient City / Town",
                        placeholder: "e.g. Ahmedabad, Surat, Rajkot",
                        width: "half",
                        required: true,
                      })
                    }
                    className="flex items-center gap-2 w-full p-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-900 transition-colors text-left"
                  >
                    <Plus className="w-3.5 h-3.5 text-rose-600" /> Patient City / Location
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ================= CENTER CANVAS: FORM CANVAS / TEST PREVIEW ================= */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center bg-slate-100/70 custom-scrollbar relative">
          
          {/* Subtle dotted background pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          <div className="w-full max-w-3xl z-10 relative">
            {isPreviewMode ? (
              /* Live Interactive Preview */
              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 mb-6 shadow-xs">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">You are testing the live form with active client validation.</span>
                  </div>
                  <button
                    onClick={() => setIsPreviewMode(false)}
                    className="text-sm font-bold text-blue-700 hover:underline"
                  >
                    Return to Builder
                  </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <FormRenderer form={form} isTestMode={true} />
                </div>
              </div>
            ) : (
              /* Interactive Canvas Editor */
              <div className="w-full pb-20 animate-in fade-in duration-300">
                {/* Form Canvas Header Card */}
                <div
                  onClick={() => setActiveInspectorTab("form")}
                  className={`p-6 rounded-2xl bg-white mb-6 cursor-pointer shadow-sm transition-all border-2 ${
                    activeInspectorTab === "form" 
                      ? "border-rose-600 ring-4 ring-rose-500/10" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight">
                        {form.name}
                      </h2>
                      {form.description ? (
                        <p className="text-sm text-slate-500">
                          {form.description}
                        </p>
                      ) : (
                        <p className="text-sm text-slate-400 italic">
                          No description provided. Click to add one.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold whitespace-nowrap border border-slate-200">
                      <Settings className="w-3.5 h-3.5 text-slate-500" /> Form Settings
                    </div>
                  </div>
                </div>

                {/* Fields Container (2-Column Canvas) */}
                {(!form.fields || form.fields.length === 0) ? (
                  <div className="p-16 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-white text-slate-500 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Layers className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-2">
                      Your form is empty.
                    </div>
                    <div className="text-sm max-w-sm text-slate-500">
                      Click any field type on the left palette to insert your first component.
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {form.fields.map((field, idx) => {
                      const isSelected = selectedFieldId === field.id && activeInspectorTab === "field";
                      const isHalf = field.width === "half";
                      const gridSpan = isHalf ? "md:col-span-1" : "md:col-span-2";

                      return (
                        <div
                          key={field.id}
                          onClick={() => {
                            setSelectedFieldId(field.id);
                            setActiveInspectorTab("field");
                          }}
                          className={`group relative p-5 rounded-xl bg-white cursor-pointer transition-all border-2 ${gridSpan} ${
                            isSelected 
                              ? "border-rose-600 shadow-md ring-4 ring-rose-500/10" 
                              : "border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm"
                          }`}
                        >
                          {/* Field Card Header */}
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <div>
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-sm font-bold text-slate-900">
                                  {field.label}
                                </span>
                                {field.required && (
                                  <span className="text-rose-600 font-bold">*</span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block">
                                {field.name}
                              </div>
                            </div>

                            {/* Quick Toolbar on Card (Visible on Hover or Selected) */}
                            <div className={`flex gap-1 items-center bg-slate-50 p-1 rounded-lg border border-slate-200 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                              <div className="flex items-center gap-1 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 mr-1">
                                {getFieldIcon(field.type)}
                                <span className="hidden xl:inline">{field.type}</span>
                              </div>

                              {/* Move Up */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveField(idx, "up");
                                }}
                                disabled={idx === 0}
                                className={`p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors ${idx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                title="Move field up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              {/* Move Down */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveField(idx, "down");
                                }}
                                disabled={idx === (form.fields?.length || 1) - 1}
                                className={`p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors ${idx === (form.fields?.length || 1) - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                                title="Move field down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteField(field.id);
                                }}
                                className="p-1 rounded text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete field"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Dummy Input Preview */}
                          <div className={`px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                            isSelected 
                              ? "bg-slate-50 border-slate-300 text-slate-600" 
                              : "bg-slate-50/60 border-slate-200 text-slate-400"
                          }`}>
                            {field.placeholder || `[${field.type} input placeholder]`}
                          </div>
                          
                          {field.helpText && (
                            <div className="mt-2 text-xs text-slate-400">
                              {field.helpText}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Submit Button Preview */}
                <div className="mt-6 flex justify-end">
                  <button disabled className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm opacity-90 cursor-not-allowed shadow-sm w-full sm:w-auto">
                    {form.submitButtonText || "Submit Inquiry"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ================= RIGHT PANEL: INSPECTOR ================= */}
        {!isPreviewMode && (
          <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-10 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.03)]">
            {/* Inspector Tab Switcher */}
            <div className="grid grid-cols-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveInspectorTab("field")}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeInspectorTab === "field"
                    ? "border-rose-600 text-rose-600 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                Field Settings
              </button>
              <button
                type="button"
                onClick={() => setActiveInspectorTab("form")}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeInspectorTab === "form"
                    ? "border-rose-600 text-rose-600 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                Form Settings
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* TAB 1: FIELD SETTINGS */}
              {activeInspectorTab === "field" && (
                <div className="p-5 space-y-6">
                  {!selectedField ? (
                    <div className="text-center text-slate-500 py-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <PenTool className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="text-sm">Select a field on the canvas to configure its settings.</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-200 space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {getFieldIcon(selectedField.type)}
                          {selectedField.type} Field
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDuplicateField(selectedField)}
                          className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" /> Duplicate
                        </button>
                      </div>

                      {/* Field Label */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                          Field Label <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={selectedField.label}
                          onChange={(e) => handleUpdateSelectedField({ label: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                      </div>

                      {/* Field Key / Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5 flex items-center justify-between">
                          Payload Key (name) <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={selectedField.name}
                          onChange={(e) =>
                            handleUpdateSelectedField({
                              name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                        <span className="text-xs text-slate-500 mt-1.5 block">
                          Key used in submissions JSON (e.g. "patient_email").
                        </span>
                      </div>

                      {/* Placeholder */}
                      {selectedField.type !== "radio" && selectedField.type !== "checkbox" && selectedField.type !== "hidden" && (
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                            Placeholder Text
                          </label>
                          <input
                            type="text"
                            value={selectedField.placeholder || ""}
                            onChange={(e) => handleUpdateSelectedField({ placeholder: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                          />
                        </div>
                      )}

                      {/* Help Text / Hint */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                          Help Text / Hint (Optional)
                        </label>
                        <input
                          type="text"
                          value={selectedField.helpText || ""}
                          onChange={(e) => handleUpdateSelectedField({ helpText: e.target.value })}
                          placeholder="e.g. Strictly confidential patient data."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                      </div>

                      {/* Grid Width Toggle */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Column Layout
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateSelectedField({ width: "half" })}
                            className={`px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${
                              selectedField.width === "half"
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            Half Width (50%)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateSelectedField({ width: "full" })}
                            className={`px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${
                              selectedField.width === "full"
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            Full Width (100%)
                          </button>
                        </div>
                      </div>

                      {/* Required Toggle */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            Required Field
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Must be completed before submit
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedField.required}
                          onChange={(e) => handleUpdateSelectedField({ required: e.target.checked })}
                          className="w-5 h-5 text-rose-600 rounded border-slate-300 focus:ring-rose-500 cursor-pointer"
                        />
                      </div>

                      {/* Options Editor (For select, radio, checkbox) */}
                      {(selectedField.type === "select" || selectedField.type === "radio" || selectedField.type === "checkbox") && (
                        <div className="pt-4 border-t border-slate-200">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-slate-900">
                              Selectable Options
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const opts = selectedField.options || [];
                                const newOpt: FormFieldOption = {
                                  label: `Option ${opts.length + 1}`,
                                  value: `option_${opts.length + 1}`,
                                };
                                handleUpdateSelectedField({ options: [...opts, newOpt] });
                              }}
                              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Option
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(selectedField.options || []).map((opt, idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={opt.label}
                                  placeholder="Option Label"
                                  onChange={(e) => {
                                    const next = [...(selectedField.options || [])];
                                    next[idx] = { ...next[idx], label: e.target.value, value: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "_") };
                                    handleUpdateSelectedField({ options: next });
                                  }}
                                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = (selectedField.options || []).filter((_, i) => i !== idx);
                                    handleUpdateSelectedField({ options: next });
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none"
                                  title="Remove option"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Delete Field Button */}
                      <div className="pt-6 mt-4 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleDeleteField(selectedField.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-rose-200 bg-rose-50 text-rose-700 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete This Field
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: FORM SETTINGS */}
              {activeInspectorTab === "form" && (
                <div className="p-5 space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-rose-600" /> Form Configuration
                    </h4>
                    <p className="text-xs text-slate-500">
                      Global behavior, submission routing, and conversion actions.
                    </p>
                  </div>

                  {/* Form Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Form Title <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                    />
                  </div>

                  {/* Form Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Slug Identifier
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => {
                        setForm({ ...form, slug: e.target.value });
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                    />
                  </div>

                  {/* Form Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Internal Description
                    </label>
                    <textarea
                      rows={2}
                      value={form.description || ""}
                      onChange={(e) => {
                        setForm({ ...form, description: e.target.value });
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                    />
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Form Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, status: "active" });
                          setIsDirty(true);
                        }}
                        className={`px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${
                          form.status === "active"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, status: "inactive" });
                          setIsDirty(true);
                        }}
                        className={`px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${
                          form.status === "inactive"
                            ? "bg-rose-600 text-white border-rose-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>

                  {/* Submit Button Text */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Submit Button Text
                    </label>
                    <input
                      type="text"
                      value={form.submitButtonText || ""}
                      onChange={(e) => {
                        setForm({ ...form, submitButtonText: e.target.value });
                        setIsDirty(true);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                    />
                  </div>

                  {/* Success Action */}
                  <div className="pt-4 border-t border-slate-200">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      On Submission Success
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, successAction: "message" });
                          setIsDirty(true);
                        }}
                        className={`px-3 py-2 rounded-lg border text-xs font-bold transition-colors ${
                          form.successAction === "message"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Show Message
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, successAction: "redirect" });
                          setIsDirty(true);
                        }}
                        className={`px-3 py-2 rounded-lg border text-xs font-bold transition-colors ${
                          form.successAction === "redirect"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Redirect URL
                      </button>
                    </div>

                    {form.successAction === "message" ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Success Message
                        </label>
                        <textarea
                          rows={3}
                          value={form.successMessage || ""}
                          onChange={(e) => {
                            setForm({ ...form, successMessage: e.target.value });
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Redirect URL (Relative path required)
                        </label>
                        <input
                          type="text"
                          value={form.successRedirectUrl || ""}
                          placeholder="/thank-you"
                          onChange={(e) => {
                            setForm({ ...form, successRedirectUrl: e.target.value });
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                        {form.successRedirectUrl && !isSafeRedirectUrl(form.successRedirectUrl) && (
                          <div className="flex items-start gap-1.5 mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                            Must start with "/" (relative path). External redirect URLs are disallowed for security.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Lead Generation & Source */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Auto-Create Consultation Lead
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Routes submissions into Leads Dashboard
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={form.createLead}
                        onChange={(e) => {
                          setForm({ ...form, createLead: e.target.checked });
                          setIsDirty(true);
                        }}
                        className="w-5 h-5 text-rose-600 rounded border-slate-300 focus:ring-rose-500 cursor-pointer"
                      />
                    </div>

                    {form.createLead && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Lead Source Tag
                        </label>
                        <input
                          type="text"
                          value={form.leadSource || ""}
                          placeholder="e.g. cims_consultation, patient_portal"
                          onChange={(e) => {
                            setForm({ ...form, leadSource: e.target.value });
                            setIsDirty(true);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
