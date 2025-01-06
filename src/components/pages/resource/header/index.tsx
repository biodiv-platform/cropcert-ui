import { Flex, Heading, Tabs, Text } from "@chakra-ui/react";
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
    setFilter,
    onOpen: openBulkMappingModal,
    resourceData,
    selectAll,
    handleBulkCheckbox,
    bulkResourceIds,
  } = useResourceFilter();
  const { t } = useTranslation();

  const handleOnViewChange = (value) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f.view = value;
    });
  };

  const handleSelectAll = () => {
    alert(` ${resourceData.n}${" resources selected"}`);
    handleBulkCheckbox("selectAll");
  };

  const handleOnAdd = () => router.push(`/resource/create`);

  return (
    <>
      <Flex mt={4} direction={{ base: "column", md: "row" }} justify="space-between">
        <Tabs.Root
          display="inline-block"
          className="icon-tabs"
          onValueChange={(e) => handleOnViewChange(e.value)}
          activationMode="manual"
          mb={4}
          lazyMount
          hidden={true}
        >
          <Tabs.List aria-orientation="vertical">
            {viewTabs.map(({ name, icon, key }) => (
              <Tabs.Trigger
                value={key}
                key={key}
                aria-label={t(name)}
                aria-controls={`view_${key}`}
              >
                {icon} {t(name)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Flex>
      {resourceData && resourceData.n > -1 && (
        <Flex mb={4} justifyContent="center" minH="32px" alignItems="center" flexDirection="column">
          <Heading textAlign="center" size="5xl">
            All Media Gallery
            <SimpleActionButton
              icon={<Add2Icon />}
              title={t("common:resource.contribute")}
              onClick={handleOnAdd}
              colorPalette="green"
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
