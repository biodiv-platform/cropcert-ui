import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function LotCell({
  lotId,
  _id,
  lotIdMongo,
  batchStatus,
}: {
  lotId?;
  _id?;
  lotIdMongo?;
  batchStatus?;
}) {
  // const finalLotId = type === "b" ? lotId : id; //TODO: check lot type validation
  const finalLotId = lotId;
  const label = `View Lot #${finalLotId}`;
  const id = batchStatus === undefined ? _id : lotIdMongo;
  return finalLotId ? (
    <NextLink href={`/lot/show/${id}`} passHref={true}>
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
