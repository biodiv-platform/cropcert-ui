import Table from "@components/@core/table";
import React from "react";

import ActionButton from "./action-button";

export default function DownloadTable({ ccList }) {
  const ccListHeader = [
    {
      name: "#",
      selector: "code",
      maxWidth: "100px",
    },
    {
      name: "Collection Centre Name",
      selector: "name",
    },
    {
      name: "Action",
      selector: "code",
      cell: ActionButton,
      center: true,
    },
  ];

  return <Table keyField="id" columns={ccListHeader} noHeader={true} data={ccList} />;
}
