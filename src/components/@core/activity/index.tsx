import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import LazyLoad from "react-lazyload";

import ActivityList from "./activity-list";
import Comment from "./comment";

export default function Activity({ resourceId, resourceType, commentFunc = null }) {
  const titleRef = useRef(null);
  const { t } = useTranslation();

  return (
    <LazyLoad once={true}>
      <Box bg="white" border="1px" borderColor="gray.300" borderRadius="md" mb={3}>
        <div ref={titleRef}></div>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem boxShadow="md" bg="gray.200" borderRadius="md">
            {({ isExpanded }) => (
              <>
                <AccordionButton p={4}>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="lg">
                      🕒 {t("common:activity")}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel py={4} bg="white">
                  {isExpanded && (
                    <ActivityList resourceType={resourceType} resourceId={resourceId} />
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
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
      </Box>
    </LazyLoad>
  );
}
