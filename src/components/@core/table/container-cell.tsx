import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
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
    <Link href={`/container/show/${id}`} passHref={true} legacyBehavior>
      <ChakraLink>
        <Tooltip content={content} aria-label={content}>
          <span>
            {finalContainerId} <LuArrowRight />
          </span>
        </Tooltip>
      </ChakraLink>
    </Link>
  ) : null;
}
