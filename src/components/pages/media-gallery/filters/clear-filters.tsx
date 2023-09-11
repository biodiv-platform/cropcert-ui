import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import DeleteIcon from "@icons/delete";
import { DEFAULT_MEDIA_GALLERY_FILTER } from "@static/media-gallery-list";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useMediaGalleryFilter from "../common/use-media-gallery-filter";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_MEDIA_GALLERY_FILTER), "lang"];

export default function ClearFilters() {
  const { filter } = useMediaGalleryFilter();
  const filterCount: any =
    filter && Object.keys(filter).filter((f) => !FILTERS_BLACKLIST.includes(f)).length > 0;
  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => router.push("/media-gallery/list", {});

  return filterCount ? (
    <Tooltip title={message} hasArrow={true}>
      <Button
        onClick={clearFilters}
        variant="link"
        className="fade"
        size="lg"
        colorScheme="red"
        aria-label={message}
        leftIcon={<DeleteIcon />}
      >
        {filterCount}
      </Button>
    </Tooltip>
  ) : null;
}
