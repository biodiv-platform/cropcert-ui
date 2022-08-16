import { Box, Spinner } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import Table from "@components/@core/table";
import { axListCC } from "@services/cc.service";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { CollectionCenter } from "types/user";

import { ccListColumns } from "./data";

const CCListMap = dynamic(() => import("./map"), { ssr: false });

export default function CollectionCenterListComponent() {
  const [ccList, setCCList] = useState<CollectionCenter[]>([]);
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    axListCC().then(({ data }) => setCCList(data));
  }, []);

  return (
    <Container>
      <PageHeading>🗺️ Collection Centers</PageHeading>
      {ccList.length ? (
        <CoreGrid rows={2}>
          <Box className="scroll-container" overflowY="scroll">
            <Table data={ccList} columns={ccListColumns} onRowClicked={setSelected} />
          </Box>
          <CCListMap ccList={ccList} selected={selected} />
        </CoreGrid>
      ) : (
        <Spinner />
      )}
    </Container>
  );
}
