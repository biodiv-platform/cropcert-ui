import Link from "next/link";
import React from "react";

export default function CustomLink({ children, item }) {
  return <Link href={item?.url ? item.url : `/page/show/${item.id}`}>{children}</Link>;
}
