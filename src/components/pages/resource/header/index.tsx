import { Flex, Heading, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import BulkMapperHeader from "@components/pages/common/bulk-mapper";
import Add2Icon from "@icons/add";
import { viewTabs } from "@static/resource-list";
import { format } from "indian-number-format";
import router from "next/router";
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
    alert(` ${resourceData.n}${t(" resources selected")}`);

    handleBulkCheckbox("selectAll");
  };

  const handleOnAdd = () => router.push(`/resource/create`);

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
        <Flex mb={4} justifyContent="center" minH="32px" alignItems="center" flexDirection="column">
          <Heading textAlign="center" size="2xl">
            All Media Gallery
            <SimpleActionButton
              icon={<Add2Icon />}
              title={t("common:resource.contribute")}
              onClick={handleOnAdd}
              colorScheme="green"
            />
          </Heading>
          <Text fontSize="xl" color="gray.600">
            {format(resourceData.n)} {t("common:resource.total")}
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
