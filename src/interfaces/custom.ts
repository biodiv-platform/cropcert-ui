export interface DocumentData {
  l: any[];
  mvp: Record<string, unknown>;
  ag?: any;
  n: number;
  hasMore: boolean;
}

export interface ResourceDocument {
  resourceURL: string;
  size: string;
  timestamp: number;
}

export enum StatusType {
  InQueue = "q",
  InProgress = "p",
  Done = "d",
}

export interface License {
  name: string;
  link: string;
  label: string;
}

export interface MediaGalleryData {
  id: any;
  name: string;
  description: string;
  l: any[];
  mvp: Record<string, unknown>;
  ag?: any;
  n: number;
  hasMore: boolean;
}

export interface MediaGalleryFilterProps {
  user?: string;
  createdOnMaxDate?: string;
  createdOnMinDate?: string;
  mediaFilter?: string;
  limit?: number;
  offset?: number;
  view?: string;
}

export interface ResourceData {
  l: any[];
  mvp: Record<string, unknown>;
  ag?: any;
  n: number;
  hasMore: boolean;
}
export interface ResourceFilterProps {
  user?: string;
  createdOnMaxDate?: string;
  createdOnMinDate?: string;
  mediaFilter?: string;
  limit?: number;
  offset?: number;
  view?: string;
}

export enum AssetStatus {
  Pending = 1,
  InProgress = 2,
  Uploaded = 3,
  Failed = 4,
}

export type CastType = "string" | "number" | "boolean" | any;
