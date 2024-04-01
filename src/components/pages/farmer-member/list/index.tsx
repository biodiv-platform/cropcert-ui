import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import { NextSyncCounter } from "@components/traceability/nextSyncCounter";
import useGlobalState from "@hooks/use-global-state";
import { axSyncFMDataOnDemand } from "@services/farmer.service";
import { axGetLastSyncedTimeFM } from "@services/traceability.service";
import { ROLES } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { useQuery } from "@tanstack/react-query";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import { getLocalTime } from "@utils/traceability";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import Filters from "./filters";
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
  const { user } = useGlobalState();
  const { isOpen: clearRows } = useDisclosure();
  const [selectedFarmerMember, setSelectedFarmerMember] = useState([]); // TODO: add types
  const { t } = useTranslation();
  const { farmerMemberData } = useFarmerMemberFilter();

  // useEffect(() => {
  //   ccCodes.length && actions.listFarmerMember({ ccCodes, reset: true });
  // }, [ccCodes]);

  // useEffect(() => {
  //   ccs && setCCCodes(ccs.map((o) => o.value));
  // }, [ccs]);

  // useEffect(() => {
  //   if (hasAccess([ROLES.UNION], user)) {
  //     setHideAccessor(false);
  //     setCCs([0]); // dummy cc
  //   }
  // }, []);

  useEffect(() => {
    console.log("new farmerMemberData", farmerMemberData);
  }, [farmerMemberData]);

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
    try {
      setIsSyncing(true);
      await axSyncFMDataOnDemand();
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
    <Box w="full" maxH="calc( 100vh - var(--heading-height) )" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Filters />
        <Box
          maxH="full"
          w="full"
          id="items-container"
          overflowY="auto"
          gridColumn={{ lg: "4/15" }}
          p={4}
        >
          <PageHeading actions={<ActionButtons />}>
            🧑‍🌾 {t("traceability:tab_titles.farmer_member")}
          </PageHeading>
          <Flex justifyContent={"space-between"} alignItems={"center"} wrap={"wrap"}>
            {/* <Box my={2}>
              {t("traceability:total_records")}:{" "}
              {state.isLoading ? <Spinner size="xs" /> : farmerMemberData?.l.length}
            </Box> */}
            <Box my={2}>
              {t("traceability:total_records")}: {farmerMemberData?.l.length}
            </Box>
            <Box fontSize={"xs"}>
              {t("traceability:sync_status.last_synced")}{" "}
              {isLoading ? <Spinner size="xs" /> : getLocalTime(data?.data)} | <NextSyncCounter />
            </Box>
          </Flex>

          {/* <CoreGrid hidden={hideAccessor}>
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
          </CoreGrid> */}

          <MultipleTypeWarning show={showTypeError} />

          <Table
            data={farmerMemberData.l}
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

          {/* {state.isLoading ? (
            <Spinner />
          ) : state.farmer.length > 0 ? (
            <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
              <Table
                data={documentData.l}
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
          )} */}

          <MultiMarkerMapModal />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default FarmerMemberPageComponent;
