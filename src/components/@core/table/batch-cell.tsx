import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function BatchCell({ batchId, _id }: { batchId?; _id? }) {
  const label = `View Batch #${batchId}`;
  return batchId ? (
    <NextLink href={`/batch/show/${_id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            {batchId} <ArrowForwardIcon />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
