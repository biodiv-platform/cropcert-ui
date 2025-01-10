import { Box, Heading } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import LazyLoad from "react-lazyload";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

import ActivityList from "./activity-list";
import Comment from "./comment";

export default function Activity({ resourceId, resourceType, commentFunc = null }) {
  const titleRef = useRef(null);
  const { t } = useTranslation();

  return (
    <LazyLoad once={true}>
      <AccordionItem
        value={"activity"}
        style={{
          boxShadow: "var(--chakra-shadows-md)",
          background: "var(--chakra-colors-gray-200)",
          borderRadius: "var(--chakra-radii-md)",
        }}
      >
        <>
          <AccordionItemTrigger p={3}>
            <Box flex="1" textAlign="left">
              <Heading as="h2" size="3xl">
                🕒 {t("common:activity")}
              </Heading>
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent py={4} bg="white">
            {<ActivityList resourceType={resourceType} resourceId={resourceId} />}
          </AccordionItemContent>
        </>
      </AccordionItem>
      {commentFunc && (
        <Box mb={4} p={4} className="fadeInUp delay-1 white-box">
          <Comment
            resourceId={resourceId}
            resourceType={resourceType}
            focusRef={titleRef}
            commentFunc={commentFunc}
          />
        </Box>
      )}
    </LazyLoad>
  );
}
