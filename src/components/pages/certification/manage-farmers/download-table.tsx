import { Button } from "@chakra-ui/core";
import Table from "@components/@core/table";
import React from "react";

export default function DownloadTable({ ccList }) {
  const DownloadCell = ({ code }) => (
    <Button size="sm" onClick={() => console.log(code)} leftIcon="download">
      Make Available Offline
    </Button>
  );

  const ccListHeader = [
    {
      name: "Code",
      selector: "code",
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Action",
      selector: "code",
      cell: DownloadCell,
    },
  ];

  return <Table keyField="id" columns={ccListHeader} noHeader={true} data={ccList} />;
}
