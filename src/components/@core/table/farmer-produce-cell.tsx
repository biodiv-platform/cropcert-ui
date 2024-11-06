import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function FarmerProduceCell({ farmerProduceId, _id }: { farmerProduceId?; _id? }) {
  const label = `View Farmer Produce #${farmerProduceId}`;
  return _id ? (
    <NextLink href={`/farmer-produce/show/${_id}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            FP-{farmerProduceId} <ArrowForwardIcon />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
