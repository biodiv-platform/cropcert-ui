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

      {/* <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("Tags")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <TagFilterInput filterKey="tags" />}</AccordionPanel>
          </>
        )}
      </AccordionItem> */}
      {/*  <AccordionItem>
         {({ isExpanded }) => (
           <>
             <AccordionButton>
               <Box flex={1} textAlign="left">
                 {t("filters:user.title")}
               </Box>
               <AccordionIcon />
             </AccordionButton>
             <AccordionPanel>{isExpanded && <UserFilterInput filterKey="user" />}</AccordionPanel>
           </>
         )}
       </AccordionItem> */}
    </AccordionRoot>
  );
}
