import { Box, CircularProgress, useDisclosure } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import { FarmerProduce } from "@interfaces/traceability";
import { axListFarmerProduceByBatchId } from "@services/batch.service";
import React, { useEffect, useState } from "react";

function BatchExpand(props) {
  const { isOpen, onOpen } = useDisclosure();
  const [fpList, setfpList] = useState([] as FarmerProduce[]);
  const columns = [...farmerProduceColumns];

  useEffect(() => {
    axListFarmerProduceByBatchId(props.data._id).then(({ data }) => {
      setfpList(data);
      onOpen();
    });
  }, [props.data]);

  return isOpen ? (
    <Box p={3}>
      <Table data={fpList} columns={columns} />
    </Box>
  ) : (
    <CircularProgress isIndeterminate={true} m={4} size="30px" color="blue"></CircularProgress>
  );
}

export default BatchExpand;
