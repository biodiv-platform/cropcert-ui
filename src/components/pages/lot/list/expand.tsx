import { Box, CircularProgress, useDisclosure } from "@chakra-ui/core";
import Table from "@components/@core/table";
import { axListBatchByLotId } from "@services/lot.service";
import { BATCH_TYPE } from "@static/constants";
import React, { useEffect, useState } from "react";
import { Batch } from "types/traceability";

import { batchColumns, batchColumnsWet } from "./data";

function LotExpand(props) {
  const { isOpen, onOpen } = useDisclosure();
  const [batchList, setBatchList] = useState([] as Batch[]);
  const columns = [...batchColumns, ...(props.data.type === BATCH_TYPE.WET ? batchColumnsWet : [])];

  useEffect(() => {
    axListBatchByLotId(props.data.id).then(({ data }) => {
      setBatchList(data);
      onOpen();
    });
  }, [props.data]);

  return isOpen ? (
    <Box p={3}>
      <Table data={batchList} columns={columns} />
    </Box>
  ) : (
    <CircularProgress isIndeterminate={true} m={4} size="30px" color="blue"></CircularProgress>
  );
}

export default LotExpand;
