import { Stack } from "@chakra-ui/react";
import React from "react";

import { Tag } from "@/components/ui/tag";

export default function WKTList({ list, onDelete, nameTitle }) {
  return list.length > 0 ? (
    <Stack gap={2} p={4} pt={0} direction={"row"}>
      {list.map((o, index) => (
        <Tag
          key={index}
          content={o[nameTitle]}
          rounded="full"
          variant="solid"
          colorPalette="blue"
          closable={onDelete(index)}
        ></Tag>
      ))}
    </Stack>
  ) : null;
}
