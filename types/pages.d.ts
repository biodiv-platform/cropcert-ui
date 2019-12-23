export interface Page {
    id?: number; // int64
    parentId?: number; // int64
    pageIndex?: number; // int64
    title?: string;
    pageType?: "CONTENT" | "REDIRECT";
    url?: string;
    heading?: string;
    authorId?: number; // int64
    authorName?: string;
    content?: string;
    createdOn?: string; // date-time
    modifiedOn?: string; // date-time
}
export interface StreamingOutput {
}
