import { Box } from "@chakra-ui/core";
import React from "react";

import ActionButton from "./action-button";
import CustomRow from "./custom-row";

export default function DownloadTable({ ccList }) {
  return ccList.length > 0
    ? ccList.map(({ code, name }, index) => (
        <CustomRow bgGray={index % 2 !== 0} key={code}>
          <Box fontSize="xl">
            {code}. {name}
          </Box>
          <Box textAlign={{ md: "right" }}>
            <ActionButton ccCode={code} ccName={name} />
          </Box>
        </CustomRow>
      ))
    : null;
}
