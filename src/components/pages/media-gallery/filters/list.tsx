import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import MediaType from "./media-type";
import TagFilterInput from "./tags";
import UserFilterInput from "./user";

export default function FiltersList() {
  return (
    <AccordionRoot multiple lazyMount>
      <MediaType />
      <TagFilterInput filterKey="tags" />
      <UserFilterInput filterKey="user" />
    </AccordionRoot>
  );
}
