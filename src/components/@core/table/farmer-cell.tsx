import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Link, Tooltip } from "@chakra-ui/react";
import { axGetFarmerDetailsByUUID } from "@services/farmer.service";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

export default function FarmerCell({ farmerId, _id }: { farmerId?; _id? }) {
  const label = `View Farmer #${farmerId}`;
  const [id, setId] = useState(_id);

  const fetchFarmerDetailsByUUID = async () => {
    const { data } = await axGetFarmerDetailsByUUID(_id);
    setId(data._id);
  };

  useEffect(() => {
    if (_id?.substring(0, 4) === "uuid") {
      fetchFarmerDetailsByUUID();
    }
  }, []);

  return farmerId ? (
    <NextLink href={`/farmer/show/${id}`} passHref={true} legacyBehavior>
      <Link>
        <Tooltip label={label} aria-label={label}>
          <span>
            <Flex gap={2} alignItems={"center"}>
              {farmerId} <ArrowForwardIcon />
            </Flex>
          </span>
        </Tooltip>
      </Link>
    </NextLink>
  ) : null;
}
