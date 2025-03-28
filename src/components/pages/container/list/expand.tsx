import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { fetchLotColumns } from "@components/pages/lot/list/data";
import LotExpand from "@components/pages/lot/list/expand";
import { Lot } from "@interfaces/traceability";
import { axListLotByContainerId } from "@services/container.service";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { ProgressCircleRing, ProgressCircleRoot } from "@/components/ui/progress-circle";

function LotExpandComponent(props) {
  const { open, onOpen } = useDisclosure();
  const [lotList, setLotList] = useState([] as Lot[]);

  const [lotColumns, setLotColumns] = useState<any[]>([]);
  const [columnsLoading, setColumnsLoading] = useState(true);
  const [columnsError, setColumnsError] = useState<Error | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadColumns() {
      try {
        setColumnsLoading(true);
        const columns = await fetchLotColumns();
        setLotColumns(columns);
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

  useEffect(() => {
    axListLotByContainerId(props.data._id).then(({ data }) => {
      setLotList(data);
      onOpen();
    });
  }, [props.data]);

  const LotExpandWithProps = (props) => {
    return <LotExpand ml={8} {...props} />;
  };

  return open ? (
    <Box p={3}>
      {columnsLoading ? (
        <Spinner />
      ) : (
        <Table
          title={"Lot"}
          data={lotList}
          columns={lotColumns}
          expandableRows={true}
          expandableRowsComponent={LotExpandWithProps}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "chakra-colors-blue-500",
                color: "white",
              },
            },
          }}
        />
      )}
    </Box>
  ) : (
    <ProgressCircleRoot value={null} m={4} size="sm" color="blue">
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  );
}

export default LotExpandComponent;
