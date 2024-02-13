import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Link, Tooltip } from "@chakra-ui/react";
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
            <Flex gap={2} alignItems={"center"}>
              {finalFarmerId} <ExternalLinkIcon />
            </Flex>
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
