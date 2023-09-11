import { Flex, Heading, Text } from "@chakra-ui/react";
import { format } from "indian-number-format";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";

export default function ListHeader() {
  const { mediaGalleryListData } = useMediaGalleryFilter();
  const { t } = useTranslation();

  return (
    <>
      {mediaGalleryListData && (
        <Flex mb={8} direction="column" justifyContent="center" alignItems="center" py={6}>
          <Heading textAlign="center" size="2xl" mb={2}>
            {t(" Media Gallery")}
          </Heading>

          <Text fontSize="xl" color="gray.600">
            ({format(mediaGalleryListData.n)} {t("Total Media Gallery")})
          </Text>
        </Flex>
      )}
    </>
  );
}
