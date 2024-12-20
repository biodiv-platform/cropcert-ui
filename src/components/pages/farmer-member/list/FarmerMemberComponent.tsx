import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import LastSyncTime from "@components/traceability/lastSyncTime";
import { NextSyncCounter } from "@components/traceability/nextSyncCounter";
import useGlobalState from "@hooks/use-global-state";
import { axSyncFMDataOnDemand } from "@services/farmer.service";
import { ROLES } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";

import { farmerMemberColumns } from "./data";
import MultiMarkerMapModal from "./modals/multi-marker-map";
import MultipleTypeWarning from "./multiple-warning";
import useFarmerFilter from "./use-farmer-filter";

function FarmerMemberComponent() {
  const [ccs, setCCs] = useState([] as any);
  const [co, setCo] = useState<any>();
  const { clearFarmerMember, setCCCodes, farmerListData, loading } = useFarmerFilter();

  const [showTypeError, setShowTypeError] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user, union } = useGlobalState();
  const { isOpen: clearRows } = useDisclosure();
  const [selectedFarmerMember, setSelectedFarmerMember] = useState([]); // TODO: add types
  const { t } = useTranslation();

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const handleOnSelectionChange = ({ selectedRows }) => {
    setSelectedFarmerMember(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleDrawMap = () => {
    emit(DRAW_MAP, { selectedFarmerMember });
  };

  const handleSyncData = async () => {
    try {
      setIsSyncing(true);
      await axSyncFMDataOnDemand(user?.unionCode);
      window.location.reload();
      notification(t("traceability:sync_status.success"), NotificationType.Success);
      setIsSyncing(false);
    } catch (error) {
      notification(t("traceability:sync_status.error"), NotificationType.Error);
      setIsSyncing(false);
    }
  };

  const ActionButtons = () => {
    return (
      <ButtonGroup display={"flex"} flexWrap={"wrap"} gap={4}>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={handleDrawMap}
          isDisabled={
            showTypeError ||
            selectedFarmerMember.length === 0 ||
            !hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
          leftIcon={<AddIcon />}
        >
          Show On Map
        </Button>
        <Button
          colorScheme="gray"
          variant="solid"
          onClick={handleSyncData}
          isDisabled={showTypeError || isSyncing || !hasAccess([ROLES.ADMIN, ROLES.UNION], user)}
          leftIcon={isSyncing ? <Spinner size="xs" /> : <RepeatIcon />}
        >
          {isSyncing
            ? t("traceability:sync_status.syncing")
            : t("traceability:sync_status.sync_now")}
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🧑‍🌾 {t("traceability:tab_titles.farmer_member")}
      </PageHeading>
      <Flex justifyContent={"space-between"} alignItems={"center"} wrap={"wrap"}>
        <Box my={2}>
          {t("traceability:total_records")}:{" "}
          {loading ? <Spinner size="xs" /> : farmerListData?.length}
        </Box>
        <Box
          fontSize={"xs"}
          visibility={union?.value ? "visible" : "hidden"}
          display={"flex"}
          gap={2}
        >
          <LastSyncTime type={"FM"} isSyncing={isSyncing} /> |{" "}
          <NextSyncCounter syncIntervalHours={120} />
        </Box>
      </Flex>

      <CoreGrid hidden={false}>
        <Accesser
          toRole={ROLES.COOPERATIVE}
          onChange={setCo}
          onTouch={() => {
            clearFarmerMember();
          }}
        />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {loading ? (
        <Spinner />
      ) : farmerListData?.length > 0 ? (
        <Table
          data={farmerListData}
          columns={farmerMemberColumns}
          selectableRows={true}
          onSelectedRowsChange={handleOnSelectionChange}
          clearSelectedRows={clearRows}
          conditionalRowStyles={[
            {
              when: (row) => row.lotId,
              style: {
                background: "var(--chakra-colors-gray-100)!important",
                opacity: "0.6",
              },
            },
          ]}
          pagination
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 40, 60, 100]}
          fixedHeader
          fixedHeaderScrollHeight="610px"
          showFooter={false}
        />
      ) : (
        <Flex direction={"column"} alignItems={"center"} gap={2}>
          <Box mt={2} minHeight={"300px"}>
            {t("traceability:no_records")}
          </Box>
        </Flex>
      )}

      <MultiMarkerMapModal />
    </Box>
  );
}

export default FarmerMemberComponent;
