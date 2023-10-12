import { Box } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import CCMultiSelect from "@components/@core/accesser/cc-multi-select";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { hasAccess } from "@utils/auth";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerStore } from "./use-farmer-store";

function FarmerMemberPageComponent() {
  const [ccs, setCCs] = useState([] as any);
  const [co, setCo] = useState<any>();
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerStore();
  const [showTypeError] = useState(false);
  const [hideAccessor, setHideAccessor] = useState<boolean>();
  const { user } = useGlobalState();

  useEffect(() => {
    ccCodes.length && actions.listFarmer({ ccCodes, reset: true });
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
    actions.listFarmer({ ccCodes });
  };

  return (
    <Box>
      <PageHeading>🧑‍🌾 Farmer Member(s)</PageHeading>
      <Box my={2}>{`Total Records: ${state.farmer.length}`}</Box>

      <CoreGrid hidden={hideAccessor}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions?.clearFarmer} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid>

      <MultipleTypeWarning show={showTypeError} />

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        <Table
          data={state.farmer}
          columns={batchColumns}
          selectableRows={false}
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
          paginationRowsPerPageOptions={[20, 50, 100]}
        />
      </InfiniteScroll>
    </Box>
  );
}

export default FarmerMemberPageComponent;
