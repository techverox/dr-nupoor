import { BaseEntity } from "./common";

export type RedirectStatusCode = 301 | 302;

export interface RedirectItem extends BaseEntity {
  sourcePath: string;
  destinationPath: string;
  statusCode: RedirectStatusCode;
  isActive: boolean;
  note?: string;
  hitCount: number;
  lastTriggeredAt?: string;
}

export interface RedirectValidationResult {
  isValid: boolean;
  error?: string;
}
