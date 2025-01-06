import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import DeleteIcon from "@icons/delete";
import { DEFAULT_FARMER_PRODUCE_FILTER } from "@static/constants";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useFarmerProduceFilter from "../use-farmer-produce-filter";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_FARMER_PRODUCE_FILTER), "lang"];

export default function ClearFilters() {
  const { filter, setFilterCount } = useFarmerProduceFilter();

  const filterCount: number = filter
    ? Object.keys(filter).filter((f) => filter[f] && !FILTERS_BLACKLIST.includes(f)).length
    : 0;
  setFilterCount(filterCount);

  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => {
    router.push("/traceability/farmer-produce", {}).then(() => window.location.reload());
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
