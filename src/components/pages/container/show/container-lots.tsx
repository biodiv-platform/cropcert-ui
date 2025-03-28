import { Box, Spinner } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import { fetchLotColumns } from "@components/pages/lot/list/data";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import ContainerShowPanel from "./panel";

export default function ContainerLots({ rows }) {
  const [lotColumns, setLotColumns] = useState<any[]>([]);
  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsError, setColumnsError] = useState<Error | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadColumns() {
      try {
        setColumnsLoading(true);
        const columns = await fetchLotColumns();
        const filteredCol = columns.filter((col) => col.name !== "Cooperative");
        setLotColumns(filteredCol);
      } catch (error) {
        setColumnsError(error as Error);
      } finally {
        setColumnsLoading(false);
      }
    }

    loadColumns();
  }, []);

  if (columnsError) {
    return (
      <Box>
        {t("traceability:container.expand_error")}
        {columnsError.message}
      </Box>
    );
  }

  return (
    <ContainerShowPanel icon="📦" title="Lot(s)" count={rows.length}>
      {columnsLoading ? (
        <Spinner />
      ) : (
        <DataTable keyField="lotId" columns={lotColumns} noHeader={true} data={rows} />
      )}
    </ContainerShowPanel>
  );
}
