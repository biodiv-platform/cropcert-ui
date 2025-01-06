import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import useDocumentFilter from "@components/pages/document/common/use-document-filter";
import DeleteIcon from "@icons/delete";
import { DEFAULT_FILTER } from "@static/documnet-list";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_FILTER), "lang", "userGroupList", "groupName"];

export default function ClearFilters() {
  const { filter } = useDocumentFilter();
  const filterCount = Object.keys(filter).filter((f) => !FILTERS_BLACKLIST.includes(f)).length;
  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => router.push("/document/list", {}).then(() => window.location.reload());

  return filterCount > 0 ? (
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
