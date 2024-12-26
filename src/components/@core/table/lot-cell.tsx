import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
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
    <NextLink href={`/lot/show/${id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip content={content} aria-label={content}>
          <span>
            {finalLotId} <LuArrowRight />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
