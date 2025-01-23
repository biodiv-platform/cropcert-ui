import { Table } from "@chakra-ui/react";
import React from "react";

function TableRow({ children, name, color = "gray.100" }) {
  return (
    <Table.Row backgroundColor={color}>
      <Table.Cell textAlign="left">{name}</Table.Cell>
      <Table.Cell textAlign="left">{children}</Table.Cell>
    </Table.Row>
  );
}

export default TableRow;
