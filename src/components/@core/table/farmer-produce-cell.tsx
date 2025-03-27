import { Link } from "@chakra-ui/react";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function FarmerProduceCell({ farmerProduceId, _id }: { farmerProduceId?; _id? }) {
  const content = `View Farmer Produce #${farmerProduceId}`;
  return _id ? (
    <Link href={`/farmer-produce/show/${_id}`}>
      <Tooltip content={content} aria-label={content}>
        <span>
          {farmerProduceId} <LuArrowRight />
        </span>
      </Tooltip>
    </Link>
  ) : null;
}
