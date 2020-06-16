import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import Accesser from "@components/@core/accesser";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import { axListCCByCoId } from "@services/cc.service";
import { ROLES } from "@static/constants";
import { DB_CONFIG } from "@static/inspection-report";
import React, { useState } from "react";
import IndexedDBProvider from "use-indexeddb";

import DownloadTable from "./download-table";

export default function ManageFarmersComponent() {
  const [ccList, setCCList] = useState([]);
  const [ccListF, setCCListF] = useState([]);

  const listCCs = async (co) => {
    if (co?.value) {
      const { success, data } = await axListCCByCoId(co.value);
      if (success) {
        setCCList(data);
        setCCListF(data);
      }
    } else {
      setCCList([]);
    }
  };

  const onFilterChange = (e) => {
    const q = new RegExp(e.target.value, "i");
    setCCListF(ccList.filter((cc) => cc.name.match(q) || cc.code.toString().match(q)));
  };

  return (
    <div>
      <PageHeading>⬇️ Download Farmer(s) List</PageHeading>
      <CoreGrid mb={4}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={listCCs} />
        <div></div>
        <InputGroup mt={6}>
          <InputLeftElement children={<Icon name="search" color="gray.300" />} />
          <Input
            type="text"
            placeholder="Find Collection Center"
            borderColor="gray.400"
            onChange={onFilterChange}
          />
        </InputGroup>
      </CoreGrid>
      <IndexedDBProvider config={DB_CONFIG}>
        <DownloadTable ccList={ccListF} />
      </IndexedDBProvider>
    </div>
  );
}
