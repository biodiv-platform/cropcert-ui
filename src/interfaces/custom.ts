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

export type CastType = "string" | "number" | "boolean" | any;
