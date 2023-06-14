import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function LotCell({ lotId, _id }: { lotId?; _id? }) {
  // const finalLotId = type === "b" ? lotId : id; //TODO: check lot type validation
  const finalLotId = lotId;
  const label = `View Lot #${finalLotId}`;
  return finalLotId ? (
    <NextLink href={`/lot/show/${_id}`} passHref={true}>
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
