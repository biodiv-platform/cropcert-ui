import { Box } from "@chakra-ui/core";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import React from "react";

import ActionButton from "./action-button";

export default function DownloadTable({ ccList }) {
  return (
    <>
      {ccList.map(({ code, name }, index) => (
        <ResponsiveRow bgGray={index % 2 !== 0} key={code}>
          <Box fontSize="xl">
            {code}. {name}
          </Box>
          <Box textAlign={{ md: "right" }}>
            <ActionButton ccCode={code} ccName={name} />
          </Box>
        </ResponsiveRow>
      ))}
    </>
  );
}
