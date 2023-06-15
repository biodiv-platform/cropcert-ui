import { Box } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { batchColumns } from "./data";
import MultipleTypeWarning from "./multiple-warning";
import { useFarmerStore } from "./use-farmer-store";

function FarmerMemberPageComponent() {
  const [ccs] = useState([] as any);
  const [ccCodes, setCCCodes] = useState<any>([]);
  const { state, ...actions } = useFarmerStore();
  const [showTypeError] = useState(false);

  useEffect(() => {
    actions.listFarmer({ ccCodes: "71,70,78,77,73,76,72,74,69,75", reset: true });
  }, []);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const handleLoadMore = () => {
    actions.listFarmer({ ccCodes });
  };

  return (
    <Box>
      <PageHeading>🧑‍🌾 Farmer Member(s)</PageHeading>

      {/* <CoreGrid hidden={hideAccessor}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions?.clearFarmer} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid> */}

      <MultipleTypeWarning show={showTypeError} />

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        <Table
          data={state.farmer.filter(
            (row) => row.batchId === null || row.batchId === undefined || row.batchId === ""
          )}
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
        />
      </InfiniteScroll>
    </Box>
  );
}

export default FarmerMemberPageComponent;
