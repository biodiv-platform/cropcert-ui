import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function LotCell({
  farmerId,
  _id,
  farmerIdMongo,
  batchStatus,
}: {
  farmerId?;
  _id?;
  farmerIdMongo?;
  batchStatus?;
}) {
  const finalFarmerId = farmerId;
  const label = `View Lot #${finalFarmerId}`;
  const id = batchStatus === undefined ? _id : farmerIdMongo;
  return finalFarmerId ? (
    <NextLink href={`/lot/show/${id}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            L-{finalFarmerId} <ArrowForwardIcon />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
