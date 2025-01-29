import { Button, Group } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuRepeat, LuSettings } from "react-icons/lu";
import { MdCheckCircle } from "react-icons/md";

export default function BulkMapperHeader({
  bulkIds,
  selectAll,
  handleSelectAll,
  handleBulkCheckbox,
  openBulkMappingModal,
}) {
  const { t } = useTranslation();

  return (
    bulkIds &&
    bulkIds?.length > 0 && (
      <Group attached>
        {!selectAll && (
          <Button variant="outline" colorPalette="blue" onClick={handleSelectAll}>
            {<MdCheckCircle />}
            {t("common:actions.select_all")}
          </Button>
        )}
        <Button
          variant="outline"
          colorPalette="red"
          onClick={() => handleBulkCheckbox("UnsSelectAll")}
        >
          <LuRepeat />
          {t("common:actions.unselect_all")}
        </Button>
        <Button variant="outline" colorPalette="green" onClick={openBulkMappingModal}>
          {<LuSettings />}
          {t("common:actions.name")}
        </Button>
      </Group>
    )
  );
}
