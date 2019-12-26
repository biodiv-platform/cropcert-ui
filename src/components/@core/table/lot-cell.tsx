import { Tooltip, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { MdArrowForward } from "react-icons/md";

export default function LotCell({ lotId, id }: { lotId?; id? }) {
  const finalLotId = lotId || id;
  const label = `View Lot #${finalLotId}`;
  return (
    <NextLink href={`/lot/show/${finalLotId}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            {finalLotId} <MdArrowForward />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  );
}
