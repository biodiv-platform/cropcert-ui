import { Flex, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import BulkMapperHeader from "@components/pages/common/bulk-mapper";
import { viewTabs } from "@static/resource-list";
import { format } from "indian-number-format";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResourceFilter from "../common/use-resource-filter";

export default function ListHeader() {
  const {
    filter,
    setFilter,
    onOpen: openBulkMappingModal,
    resourceData,
    selectAll,
    handleBulkCheckbox,
    bulkResourceIds,
  } = useResourceFilter();
  const defaultIndex = viewTabs.findIndex((tab) => tab.key === filter?.view);
  const { t } = useTranslation();

  const handleOnViewChange = (index: number) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f.view = viewTabs[index].key;
    });
  };

  const handleSelectAll = () => {
    alert(` ${t("Current resource on this page is selected")}`);

    handleBulkCheckbox("selectAll");
  };

  return (
    <>
      <Flex mt={4} direction={{ base: "column", md: "row" }} justify="space-between">
        <Tabs
          display="inline-block"
          className="icon-tabs"
          onChange={handleOnViewChange}
          variant="soft-rounded"
          isManual={true}
          defaultIndex={defaultIndex}
          mb={4}
          isLazy={true}
          hidden={true}
        >
          <TabList aria-orientation="vertical">
            {viewTabs.map(({ name, icon, key }) => (
              <Tab key={key} aria-label={t(name)} aria-controls={`view_${key}`}>
                {icon} {t(name)}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
      {resourceData && resourceData.n > -1 && (
        <Flex mb={4} justifyContent="space-between" minH="32px" alignItems="center">
          <Text color="gray.600">
            {format(resourceData.n)} {t("Total Resources")}
          </Text>
          <BulkMapperHeader
            selectAll={selectAll}
            bulkIds={bulkResourceIds}
            handleSelectAll={handleSelectAll}
            handleBulkCheckbox={handleBulkCheckbox}
            openBulkMappingModal={openBulkMappingModal}
          />
        </Flex>
      )}
    </>
  );
}
