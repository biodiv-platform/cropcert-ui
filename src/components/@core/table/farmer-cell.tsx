import { Flex, Link } from "@chakra-ui/react";
import { axGetFarmerDetailsByUUID } from "@services/farmer.service";
import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

import { Tooltip } from "@/components/ui/tooltip";

export default function FarmerCell({ farmerId, _id }: { farmerId?; _id? }) {
  const content = `View Farmer #${farmerId}`;
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
    <Link href={`/farmer/show/${id}`}>
      <Tooltip content={content} aria-label={content}>
        <span>
          <Flex gap={2} alignItems={"center"}>
            {farmerId} <LuArrowRight />
          </Flex>
        </span>
      </Tooltip>
    </Link>
  ) : null;
}
