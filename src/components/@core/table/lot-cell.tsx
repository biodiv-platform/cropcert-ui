import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

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
  const finalLotId = lotId;
  const content = `View Lot #${finalLotId}`;
  const id = batchStatus === undefined ? _id : lotIdMongo;
  return finalLotId ? (
    <Link href={`/lot/show/${id}`}>
      <ChakraLink>
        <Tooltip content={content} aria-label={content}>
          <span>
            {finalLotId} <LuArrowRight />
          </span>
        </Tooltip>
      </ChakraLink>
    </Link>
  ) : null;
}
