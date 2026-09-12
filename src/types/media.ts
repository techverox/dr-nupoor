import { BaseEntity } from "./common";

export interface MediaItem extends BaseEntity {
  name: string;
  fileName: string;
  url: string;
  storagePath: string;
  mimeType: string;
  fileSize: number; // in bytes
  width?: number;
  height?: number;
  altText: string;
  title?: string;
  caption?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface MediaUsageReference {
  collection: string;
  entityId: string;
  title: string;
  field: string;
}

export interface MediaUsageCheckResult {
  isUsed: boolean;
  references: MediaUsageReference[];
}
