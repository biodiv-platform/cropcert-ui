import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function BatchCell({ batchId, _id }: { batchId?; _id? }) {
  const content = `View Batch #${batchId}`;
  return batchId ? (
    <NextLink href={`/batch/show/${_id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip content={content} aria-label={content}>
          <span>
            {batchId} <LuArrowRight />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
