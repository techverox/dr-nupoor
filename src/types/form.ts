import { BaseEntity } from "./common";

export type FormFieldType =
  | "text"
  | "email"
  | "phone"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "hidden";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  name: string; // key in submission values (e.g. "full_name", "email")
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  options?: FormFieldOption[]; // for select, radio, checkbox
  defaultValue?: string;
  validation?: FormFieldValidation;
  width?: "full" | "half";
  order: number;
  isVisible: boolean;
  validationRegex?: string; // backwards compatibility
}

export type FormStatus = "active" | "inactive";
export type FormSuccessAction = "message" | "redirect";

export interface FormDefinition extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  status: FormStatus;
  fields: FormField[];
  submitButtonText: string;
  successAction: FormSuccessAction;
  successMessage: string;
  successRedirectUrl?: string;
  createLead: boolean;
  leadSource: string;
  spamProtection: {
    honeypot: boolean;
    rateLimit: boolean;
  };
  totalSubmissions?: number;
  notifyEmail?: string;
  createdBy?: string;
  isActive?: boolean; // backwards compatibility
}

export interface FormSubmission extends BaseEntity {
  formId: string;
  formName: string;
  landingPageId?: string;
  landingPageSlug?: string;
  values: Record<string, unknown>;
  payload?: Record<string, unknown>; // backwards compatibility
  source: string;
  pageUrl?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
  leadId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  sessionId?: string;
  visitorId?: string;
  status: "new" | "processed" | "spam";
}

export interface CreateFormInput {
  name: string;
  slug?: string;
  description?: string;
  status?: FormStatus;
  fields?: FormField[];
  submitButtonText?: string;
  successAction?: FormSuccessAction;
  successMessage?: string;
  successRedirectUrl?: string;
  createLead?: boolean;
  leadSource?: string;
  spamProtection?: {
    honeypot?: boolean;
    rateLimit?: boolean;
  };
  notifyEmail?: string;
}

export interface UpdateFormInput extends Partial<CreateFormInput> {
  id?: string;
}

export interface SubmitFormInput {
  formId: string;
  values: Record<string, unknown>;
  landingPageId?: string;
  landingPageSlug?: string;
  source?: string;
  pageUrl?: string;
  referrer?: string;
  website_hp?: string;
  formStartTime?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  sessionId?: string;
  visitorId?: string;
}
