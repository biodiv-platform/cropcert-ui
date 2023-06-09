import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function LotCell({ lotId, id, type }: { lotId?; id?; type }) {
  const finalLotId = type === "b" ? (lotId ?? "").slice(-3) : id;
  const label = `View Lot #${finalLotId}`;
  return finalLotId ? (
    <NextLink href={`/lot/show/${finalLotId}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            L-{finalLotId} <ArrowForwardIcon />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
