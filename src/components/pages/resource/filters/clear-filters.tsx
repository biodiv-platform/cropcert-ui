import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import DeleteIcon from "@icons/delete";
import { DEFAULT_RESOURCE_FILTER } from "@static/resource-list";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResourceFilter from "../common/use-resource-filter";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_RESOURCE_FILTER), "lang"];

export default function ClearFilters() {
  const { filter } = useResourceFilter();
  const filterCount: any =
    filter && Object.keys(filter).filter((f) => !FILTERS_BLACKLIST.includes(f)).length > 0;
  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => {
    router.push("/resource/list", {}).then(() => window.location.reload());
  };

  return filterCount ? (
    <Tooltip title={message} showArrow={true}>
      <Button
        onClick={clearFilters}
        variant="plain"
        className="fade"
        size="lg"
        colorPalette="red"
        aria-label={message}
      >
        <DeleteIcon />
        {filterCount}
      </Button>
    </Tooltip>
  ) : null;
}
