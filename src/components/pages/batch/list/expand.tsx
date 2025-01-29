import { Box, useDisclosure } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { farmerProduceColumns } from "@components/pages/farmer-produce/list/data";
import { FarmerProduce } from "@interfaces/traceability";
import { axListFarmerProduceByBatchId } from "@services/batch.service";
import React, { useEffect, useState } from "react";

import { ProgressCircleRing, ProgressCircleRoot } from "@/components/ui/progress-circle";

function BatchExpand(props) {
  const { open, onOpen } = useDisclosure();
  const [fpList, setfpList] = useState([] as FarmerProduce[]);
  const columns = [...farmerProduceColumns];

  useEffect(() => {
    axListFarmerProduceByBatchId(props.data._id).then(({ data }) => {
      setfpList(data);
      onOpen();
    });
  }, [props.data]);

  return open ? (
    <Box p={3}>
      <Table
        title={"Farmer Produce"}
        data={fpList}
        columns={columns}
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "chakra-colors-blue-500", // Example Chakra color
              color: "white",
            },
          },
        }}
        ml={props.ml}
      />
    </Box>
  ) : (
    // size="30px"
    <ProgressCircleRoot value={null} m={4} size="md" colorPalette="blue">
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  );
}

export default BatchExpand;
