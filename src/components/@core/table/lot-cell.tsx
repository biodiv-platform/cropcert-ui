import { Link, Tooltip } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { MdArrowForward } from "react-icons/md";

export default function LotCell({ lotId, id, type }: { lotId?; id?; type }) {
  const finalLotId = type === "b" ? lotId : id;
  const label = `View Lot #${finalLotId}`;
  return finalLotId ? (
    <NextLink href={`/lot/show/${finalLotId}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            L-{finalLotId} <MdArrowForward />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
