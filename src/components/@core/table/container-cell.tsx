import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function ContainerCell({
  containerId,
  _id,
  containerIdMongo,
  lotStatus,
}: {
  containerId?;
  _id?;
  containerIdMongo?;
  lotStatus?;
}) {
  const finalContainerId = containerId;
  const content = `View Container #${finalContainerId}`;
  const id = lotStatus === undefined ? _id : containerIdMongo;
  return finalContainerId ? (
    <NextLink href={`/container/show/${id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip content={content} aria-label={content}>
          <span>
            {finalContainerId} <LuArrowRight />
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
