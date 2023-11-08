import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Spinner, useDisclosure } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { DRAW_MAP } from "@static/events";
import { hasAccess } from "@utils/auth";
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
  }, []);

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
            !hasAccess([ROLES.ADMIN, ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER], user)
          }
          leftIcon={<AddIcon />}
        >
          Show On Map
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Box>
      <PageHeading actions={<ActionButtons />}>
        🧑‍🌾 {t("traceability:tab_titles.farmer_member")}
      </PageHeading>
      <Box my={2}>
        {t("traceability:total_records")}:{" "}
        {state.isLoading ? <Spinner size="xs" /> : state.farmer.length}
      </Box>

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
