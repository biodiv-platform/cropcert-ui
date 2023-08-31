import { Box, Button, Flex } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import FilterComponent from "@components/@core/table/filter-component";
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
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    actions.listFarmer({ ccCodes: "71,70,78,77,73,76,72,74,69,75", reset: true });
  }, []);

  useEffect(() => {
    ccs && setCCCodes(ccs.map((o) => o.value));
  }, [ccs]);

  const handleLoadMore = () => {
    actions.listFarmer({ ccCodes });
  };

  const filteredItems =
    state.farmer &&
    state.farmer.filter(
      (item) => item.farmerName && item.farmerName.toLowerCase().includes(filterText.toLowerCase())
    );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        // setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    <Box>
      <PageHeading>🧑‍🌾 Farmer Member(s)</PageHeading>
      <Box my={2}>{`Total Records: ${state.farmer.length}`}</Box>

      {/* <CoreGrid hidden={hideAccessor}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={setCo} onTouch={actions?.clearFarmer} />
        <Box>
          <CCMultiSelect coId={co?.value} onChange={setCCs} />
        </Box>
      </CoreGrid> */}

      <MultipleTypeWarning show={showTypeError} />

      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={state.hasMore}>
        {filteredItems.length > 0 ? (
          <Table
            data={filteredItems}
            columns={batchColumns}
            selectableRows={false}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
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
        ) : (
          <Flex alignItems="center" flexDirection="column" gap={2}>
            <Box textAlign="center" mt={4}>
              No matching records found.
            </Box>
            <Button onClick={() => setFilterText("")}>Clear Filter</Button>
          </Flex>
        )}
      </InfiniteScroll>
    </Box>
  );
}

export default FarmerMemberPageComponent;
