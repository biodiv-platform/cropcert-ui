import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function FarmerCell({ farmerId, _id }: { farmerId?; _id? }) {
  const finalFarmerId = farmerId;
  const label = `View Farmer #${finalFarmerId}`;
  return finalFarmerId ? (
    <NextLink href={`/farmer/show/${_id}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            {finalFarmerId} <ArrowForwardIcon />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
