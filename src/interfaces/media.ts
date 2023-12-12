import { AssetStatus } from "./custom";

export interface MediaGallery {
  id?: number; // int64
  authorId?: number; // int64
  createdOn?: string; // date-time
  updatedOn?: string; // date-time
  name?: string;
  description?: string;
  isDeleted?: boolean;
}

export interface Resource {
  id?: number; // int64
  version?: number; // int64
  description?: string;
  fileName?: string;
  mimeType?: string;
  type?: string;
  url?: string;
  rating?: number; // int32
  uploadTime?: string; // date-time
  uploaderId?: number; // int64
  context?: string;
  languageId?: number; // int64
  accessRights?: string;
  annotations?: string;
  gbifId?: number; // int64
  licenseId?: number; // int64
}
export interface ResourceData {
  resource?: Resource;
  userIbp?: UserIbp;
  license?: License;
  tags?: Tags[];
}

export interface License {
  id?: number; // int64
  name?: string;
  url?: string;
}

export interface UserIbp {
  id?: number; // int64
  name?: string;
  profilePic?: string;
  isAdmin?: boolean;
}

export interface ShowMediaGalleryPage {
  mediaGallery?: MediaGallery;
  resourceData?: ResourceData[];
}

export interface ResourceMediaGallery {
  id: string;
  hashKey: string;
  fileName?: string;
  path: string;
  url: string;
  type: string;
  licenseId: string;
  status?: AssetStatus;
  caption: string;
  contributor: string;
  description?: string;
  rating?: number;
  blob?: any;
  isUsed?: number;
  dateCreated?: number;
  dateUploaded?: number;
  tags?: Tags[];
  mId?: string;
}

export interface Tags {
  id?: number; // int64
  version?: number; // int64
  name?: string;
}
export interface TagsMapping {
  objectId?: number; // int64
  tags?: Tags[];
}
export interface TopUploadersInfo {
  name?: string;
  pic?: string;
  authorId?: number; // int64
  count?: number; // int64
}

export interface MediaGalleryListMinimalData {
  mediaGalleryId?: number; // int64
  thumbnail?: string;
  userIbp?: UserIbp;
  resource?: ResourceMediaGallery;
}

export interface ResourceListMinimalData {
  resourceId?: number; // int64
  thumbnail?: string;
  userIbp?: UserIbp;
  resource?: ResourceMediaGallery;
}

export interface ResourceData {
  path?: string;
  url?: string;
  type?: string;
  caption?: string;
  rating?: number; // int32
  licenseId?: number; // int64
  context?: string;
}

export interface MediaGalleryUpdateData {
  id: any;
  mediaGalleryResource: any;
  mediaGallery: any;
  name: any;
  description: any;
  resources?: ResourceData[];
}
