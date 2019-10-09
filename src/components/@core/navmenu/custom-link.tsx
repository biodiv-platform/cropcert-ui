import { PAGE_TYPE_OPTIONS } from "@utils/constants";
import { Link } from "gatsby";
import React from "react";

export default function CustomLink({ children, item }) {
  if (
    item.hasOwnProperty("pageType") &&
    item.pageType === PAGE_TYPE_OPTIONS.CONTENT.value
  ) {
    return <Link to={`/page/show?id=${item.id}`}>{children}</Link>;
  }
  if (item.url.startsWith("/")) {
    return <Link to={item.url}>{children}</Link>;
  }
  return <a href={item.url}>{children}</a>;
}
