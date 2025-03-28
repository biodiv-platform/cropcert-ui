import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function BatchCell({ batchId, _id }: { batchId?; _id? }) {
  const content = `View Batch #${batchId}`;
  return batchId ? (
    <Link href={`/batch/show/${_id}`}>
      <ChakraLink>
        <Tooltip content={content} aria-label={content}>
          <span>
            {batchId} <LuArrowRight />
          </span>
        </Tooltip>
      </ChakraLink>
    </Link>
  ) : null;
}
