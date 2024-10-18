import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Link, Tooltip } from "@chakra-ui/react";
import { axGetFarmerProduceDetailsById } from "@services/farmer.service";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

export default function FarmerProduceCell({ farmerProduceId, _id }: { farmerProduceId?; _id? }) {
  const label = `View Farmer Produce #${farmerProduceId}`;
  const [id, setId] = useState(_id);

  const fetchFarmerProduceDetailsByUUID = async () => {
    const { data } = await axGetFarmerProduceDetailsById(_id);
    setId(data._id);
  };

  useEffect(() => {
    if (_id.substring(0, 4) === "uuid") {
      fetchFarmerProduceDetailsByUUID();
    }
  }, []);

  return farmerProduceId ? (
    <NextLink href={`/farmer-produce/show/${id}`} passHref={true}>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            <Flex gap={2} alignItems={"center"}>
              FP-{farmerProduceId} <ArrowForwardIcon />
            </Flex>
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
