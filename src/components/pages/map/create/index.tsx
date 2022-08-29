import { Box } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { ENDPOINT } from "@static/constants";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { NakshaLayerUpload } from "./naksha-upload";

export default function MapCreatePageComponent() {
  const { user } = useGlobalState();
  const router = useRouter();
  const { lang } = useTranslation();

  const handleOnLayerUpload = (status) => {
    if (status) {
      router.push("/map");
    }
  };

  return (
    <Box h="calc(100vh - var(--heading-height))" overflowX="auto" position="relative" p={4}>
      <NakshaLayerUpload
        lang={lang}
        nakshaEndpoint={`${ENDPOINT.NAKSHA}/layer/upload`}
        callback={handleOnLayerUpload}
        bearerToken={`Bearer ${user.accessToken}`}
      />
    </Box>
  );
}
