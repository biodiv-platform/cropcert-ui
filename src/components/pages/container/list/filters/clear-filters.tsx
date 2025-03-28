import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import DeleteIcon from "@icons/delete";
import { DEFAULT_CONTAINER_FILTER } from "@static/constants";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useContainerFilter from "../use-container-filter";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_CONTAINER_FILTER), "lang"];

export default function ClearFilters() {
  const { filter, setFilterCount } = useContainerFilter();

  const filterCount: number = filter
    ? Object.keys(filter).filter((f) => filter[f] && !FILTERS_BLACKLIST.includes(f)).length
    : 0;

  setFilterCount(filterCount);
  const { t } = useTranslation();
  const router = useRouter();

  const clearFilters = () => {
    router.push("/traceability/container", {}).then(() => window.location.reload());
  };

  return filterCount ? (
    <Tooltip title={t("filters:clear", { filterCount })} showArrow={true}>
      <Button
        onClick={clearFilters}
        variant="plain"
        className="fade"
        size="lg"
        colorPalette="red"
        aria-label={t("filters:clear", { filterCount })}
      >
        <DeleteIcon />
        {filterCount}
      </Button>
    </Tooltip>
  ) : null;
}
