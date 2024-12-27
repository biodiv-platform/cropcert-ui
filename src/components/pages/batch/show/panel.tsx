import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

export default function BatchShowPanel({
  title,
  children,
  // isOpen = false,
  count = -1,
  icon,
  noPadding = false,
}) {
  return (
    // <AccordionItem
    //   defaultChecked={isOpen}
    //   isDisabled={count === 0}
    //   boxShadow="md"
    //   bg="gray.200"
    //   mb={6}
    //   borderRadius="md"
    // >
    //   {({ isExpanded }) => (
    //     <>
    //       <AccordionButton p={4}>
    //         <Box flex="1" textAlign="left">
    //           <Heading as="h2" size="lg">
    //             {icon} {count > -1 && (count > 0 ? count : "No")} {title}
    //           </Heading>
    //         </Box>
    //         <AccordionIcon />
    //       </AccordionButton>
    //       <AccordionPanel p={noPadding ? 0 : 4} bg="white">
    //         {isExpanded && children}
    //       </AccordionPanel>
    //     </>
    //   )}
    // </AccordionItem>
    <AccordionItem value={"filterKey"} pl={4} disabled={count === 0}>
      <AccordionItemTrigger>
        <Box flex="1" textAlign="left">
          <Heading as="h2" size="lg">
            {icon} {count > -1 && (count > 0 ? count : "No")} {title}
          </Heading>
        </Box>
      </AccordionItemTrigger>
      <AccordionItemContent p={noPadding ? 0 : 4} bg="white">
        {children}
      </AccordionItemContent>
    </AccordionItem>
  );
}
