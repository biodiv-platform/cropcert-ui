import { Link } from "@chakra-ui/react";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function BatchCell({ batchId, _id }: { batchId?; _id? }) {
  const content = `View Batch #${batchId}`;
  return batchId ? (
    <Link href={`/batch/show/${_id}`}>
      <Tooltip content={content} aria-label={content}>
        <span>
          {batchId} <LuArrowRight />
        </span>
      </Tooltip>
    </Link>
  ) : null;
}
