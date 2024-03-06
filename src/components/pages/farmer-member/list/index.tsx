import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import { axSyncFMDataOnDemand } from "@services/farmer.service";
import { axGetLastSyncedTimeFM } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { useQuery } from "@tanstack/react-query";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import { getLocalTime, timeUntilNext } from "@utils/traceability";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import MultiMarkerMapModal from "./modals/multi-marker-map";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerStore } from "./use-farmer-store";

function FarmerMemberPageComponent() {
  const [ccs, setCCs] = useState([] as any);
  const [co, setCo] = useState<any>();
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerStore();
  const [showTypeError, setShowTypeError] = useState(false);
  const [hideAccessor, setHideAccessor] = useState<boolean>();
  const [isSyncing, setIsSyncing] = useState(false);
  const [time, setTime] = useState(0);
  const { user } = useGlobalState();
  const { isOpen: clearRows } = useDisclosure();
  const [selectedFarmerMember, setSelectedFarmerMember] = useState([]); // TODO: add types
  const { t } = useTranslation();

  useEffect(() => {
    ccCodes.length && actions.listFarmerMember({ ccCodes, reset: true });
  }, [ccCodes]);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  useEffect(() => {
    if (hasAccess([ROLES.UNION], user)) {
      setHideAccessor(false);
      setCCs([0]); // dummy cc
    }

    // for time until next sync countdown
    const interval = setInterval(() => {
      setTime(timeUntilNext(60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["lastSyncedTimeFM"],
    queryFn: axGetLastSyncedTimeFM,
    refetchInterval: 60 * 60 * 1000,
  });

  const handleLoadMore = () => {
    actions.listFarmerMember({ ccCodes });
  };

  const handleOnSelectionChange = ({ selectedRows }) => {
    setSelectedFarmerMember(selectedRows);
    setShowTypeError([...new Set(selectedRows.map((r) => r.type))].length === 2 ? true : false);
  };

  const handleDrawMap = () => {
    emit(DRAW_MAP, { selectedFarmerMember });
  };

  const handleSyncData = async () => {
    setIsSyncing(true);
    await axSyncFMDataOnDemand();
    window.location.reload();
    notification("Data Synced Successfully", NotificationType.Success);
    setIsSyncing(false);
  };

  const ActionButtons = () => {
    return (
      <ButtonGroup spacing={4}>
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
          {isSyncing ? "Syncing..." : "Sync Data"}
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🧑‍🌾 {t("traceability:tab_titles.farmer_member")}
      </PageHeading>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box my={2}>
          {t("traceability:total_records")}:{" "}
          {state.isLoading ? <Spinner size="xs" /> : state.farmer.length}
        </Box>
        <Box fontSize={"xs"}>
          {t("traceability:sync_status.last_synced")}{" "}
          {isLoading ? <Spinner size="xs" /> : getLocalTime(data.data)} |{" "}
          {t("traceability:sync_status.next_sync")} {Math.floor(time / 3600)}:
          {Math.floor((time / 60) % 60)}:{time % 60}
        </Box>
      </Flex>

      <CoreGrid hidden={hideAccessor}>
        <Accesser
          toRole={ROLES.COOPERATIVE}
          onChange={setCo}
          onTouch={() => {
            actions?.clearFarmerMember();
            actions?.setLoading(true);
          }}
        />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      {state.isLoading ? (
        <Spinner />
      ) : state.farmer.length > 0 ? (
        <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
          <Table
            data={state.farmer}
            columns={batchColumns}
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
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 50, 100]}
          />
        </InfiniteScroll>
      ) : (
        <Box mt={2}>No records found</Box>
      )}

      <MultiMarkerMapModal />
    </Box>
  );
}

export default FarmerMemberPageComponent;
