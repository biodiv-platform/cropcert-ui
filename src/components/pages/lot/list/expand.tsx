import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { fetchBatchColumns } from "@components/pages/batch/list/data";
import BatchExpand from "@components/pages/batch/list/expand";
import { Batch } from "@interfaces/traceability";
import { axListBatchByLotId } from "@services/lot.service";
import React, { useEffect, useState } from "react";

import { ProgressCircleRing, ProgressCircleRoot } from "@/components/ui/progress-circle";

function LotExpand(props) {
  const { open, onOpen } = useDisclosure();
  const [batchList, setBatchList] = useState([] as Batch[]);

  const [batchColumns, setBatchColumns] = useState<any[]>([]);
  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsError, setColumnsError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadColumns() {
      try {
        setColumnsLoading(true);
        const columns = await fetchBatchColumns();
        setBatchColumns(columns);
      } catch (error) {
        setColumnsError(error as Error);
      } finally {
        setColumnsLoading(false);
      }
    }

    loadColumns();
  }, []);

  if (columnsError) {
    return <Box>Error loading columns: {columnsError.message}</Box>;
  }

  useEffect(() => {
    axListBatchByLotId(props.data._id).then(({ data }) => {
      setBatchList(data);
      onOpen();
    });
  }, [props.data]);

  const BatchExpandWithProps = (props) => {
    return <BatchExpand ml={8} {...props} />;
  };

  return open ? (
    <Box p={3}>
      {columnsLoading ? (
        <Spinner />
      ) : (
        <Table
          title={"Batch"}
          data={batchList}
          columns={batchColumns}
          expandableRows={true}
          expandableRowsComponent={BatchExpandWithProps}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "chakra-colors-blue-500", // Example Chakra color
                color: "white",
              },
            },
          }}
        />
      )}
    </Box>
  ) : (
    <ProgressCircleRoot value={null} m={4} size="sm" color="blue">  <ProgressCircleRing cap="round" /></ProgressCircleRoot>
  );
}

export default LotExpand;
