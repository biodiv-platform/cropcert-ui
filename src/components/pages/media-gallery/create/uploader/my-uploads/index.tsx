import {
  Box,
  Button,
  Flex,
  NativeSelectField,
  SimpleGrid,
  Spinner,
  Text,
  // useCheckboxGroup,
} from "@chakra-ui/react";
import { MY_UPLOADS_SORT } from "@static/media-gallery";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuCheck } from "react-icons/lu";

import useManageMediaGallery from "../media-gallery-upload-provider";
import Checkbox from "./checkbox";

export default function MyMediaGalleryUploads({ onDone, hasTabs = true }) {
  const { assets, resourcesSortBy, setResourcesSortBy } = useManageMediaGallery();
  const { t } = useTranslation();

  const handleOnSort = (e) => {
    setResourcesSortBy(e.target.value);
  };
  // const { getCheckboxProps } = useCheckboxGroup({
  //   value: mediaGalleryAssets?.map((o) => o.hashKey),
  // });

  return assets ? (
    <Box>
      <Flex
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        alignItems="center"
        mb={2}
      >
        <Text mb={2}>💡 {"My Uploads"}</Text>
        <Flex>
          <NativeSelectField mr={4} value={resourcesSortBy} onChange={handleOnSort} maxW="10rem">
            {MY_UPLOADS_SORT.map((o) => (
              <option key={o.value} value={o.value}>
                {t(`form:my_uploads_sort.${o.label}`)}
              </option>
            ))}
          </NativeSelectField>
          {hasTabs && (
            <Button flexShrink={0} type="button" onClick={onDone} colorScheme="blue">
              <LuCheck />
              {"Use this resource"}
            </Button>
          )}
        </Flex>
      </Flex>
      <SimpleGrid columns={[3, 4, 5, 8]} gridGap={4} className="custom-checkbox-group">
        {assets.map((asset) => (
          <Checkbox
            key={asset.hashKey}
            asset={asset}
            // {...getCheckboxProps({ value: asset.hashKey })}
          />
        ))}
      </SimpleGrid>
    </Box>
  ) : (
    <Spinner mt={4} />
  );
}
