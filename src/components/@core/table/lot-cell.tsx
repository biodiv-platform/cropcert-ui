import { Icon, Link, Tooltip } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

export default function LotCell({ lotId, id, type }: { lotId?; id?; type }) {
  const finalLotId = type === "b" ? lotId : id;
  const label = `View Lot #${finalLotId}`;
  return finalLotId ? (
    <NextLink href={`/lot/show/${finalLotId}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            L-{finalLotId} <Icon name="arrow-forward" />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
