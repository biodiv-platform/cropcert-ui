import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import { fetchBatchColumns } from "@components/pages/batch/list/data";
import BatchUpdateModal from "@components/pages/batch/list/modals/batch-update-modal-new";
import useBatchFilter from "@components/pages/batch/list/use-batch-filter";
import React, { useEffect, useState } from "react";

import ContainerShowPanel from "./panel";

export default function ContainerBatches({ rows }) {
  const [batchColumns, setBatchColumns] = useState<any[]>([]);
  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsError, setColumnsError] = useState<Error | null>(null);
  const { onToggle } = useDisclosure();

  const { updateBatch } = useBatchFilter();

  useEffect(() => {
    async function loadColumns() {
      try {
        setColumnsLoading(true);
        const columns = await fetchBatchColumns();
        const filteredCol = columns.filter((col) => col.name !== "Cooperative");
        setBatchColumns(filteredCol);
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

  const onBatchUpdate = () => {
    onToggle();
    updateBatch();
  };

  return (
    <ContainerShowPanel icon="🧺" title="Batch(s)" count={rows.length}>
      {columnsLoading ? (
        <Spinner />
      ) : (
        <DataTable keyField="batchId" columns={batchColumns} noHeader={true} data={rows} />
      )}
      <BatchUpdateModal update={onBatchUpdate} />
    </ContainerShowPanel>
  );
}
