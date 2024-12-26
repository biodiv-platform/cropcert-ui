import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function FarmerProduceCell({ farmerProduceId, _id }: { farmerProduceId?; _id? }) {
  const content = `View Farmer Produce #${farmerProduceId}`;
  return _id ? (
    <NextLink href={`/farmer-produce/show/${_id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip content={content} aria-label={content}>
          <span>
            {farmerProduceId} <LuArrowRight />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
