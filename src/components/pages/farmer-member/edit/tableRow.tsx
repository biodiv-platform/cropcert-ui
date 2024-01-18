import { Td, Tr } from "@chakra-ui/react";
import React from "react";

function TableRow({ children, name, color = "gray.100" }) {
  return (
    <Tr backgroundColor={color}>
      <Td textAlign="left">{name}</Td>
      <Td textAlign="left">{children}</Td>
    </Tr>
  );
}

export default TableRow;
