import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import useFarmerFilter from "@components/pages/farmer-member/list/use-farmer-filter";
import DeleteIcon from "@icons/delete";
import { DEFAULT_FARMER_MEMBER_FILTER } from "@static/constants";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";


const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_FARMER_MEMBER_FILTER), "lang"];

export default function ClearFilters() {
  const { filter } = useFarmerFilter();

  const filterCount: any =
    filter && Object.keys(filter).filter((f) => !FILTERS_BLACKLIST.includes(f)).length > 0;
  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => {
    router.push("/farmer/list", {}).then(() => window.location.reload());
  };

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
