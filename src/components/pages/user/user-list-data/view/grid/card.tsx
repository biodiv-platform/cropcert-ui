import { Box, Image } from "@chakra-ui/react";
import ShadowedUser from "@components/pages/common/shadowed-user";
import { getUserImage } from "@utils/media";
import Link from "next/link";
import React from "react";

export default function GridViewCard({ user: { user } }) {
  return (
    <Box className="hover-box fade">
      <Box w="full" position="relative" h="16rem">
        <Link href={`/user/show/${user?.id}`}>
          <Image
            objectFit="cover"
            bg="gray.100"
            w="full"
            h="full"
            src={getUserImage(user?.profilePic, user?.name, 400)}
          />
        </Link>
        <ShadowedUser user={user} avatar={false} />
      </Box>
    </Box>
  );
}
