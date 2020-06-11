import Accesser from "@components/@core/accesser";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import { axListCCByCoId } from "@services/cc.service";
import { ROLES } from "@static/constants";
import React, { useState } from "react";

import DownloadTable from "./download-table";

export default function ManageFarmersComponent() {
  const [ccList, setCCList] = useState([]);

  const listCCs = async (co) => {
    if (co?.value) {
      const { success, data } = await axListCCByCoId(co.value);
      if (success) {
        setCCList(data);
      }
    } else {
      setCCList([]);
    }
  };

  return (
    <div>
      <PageHeading>⬇️ Download Farmer(s) List</PageHeading>
      <CoreGrid>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={listCCs} />
      </CoreGrid>
      <DownloadTable ccList={ccList} />
    </div>
  );
}
