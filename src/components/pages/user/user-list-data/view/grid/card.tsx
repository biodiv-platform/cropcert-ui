import { Box, Image, Link } from "@chakra-ui/react";
import ShadowedUser from "@components/pages/common/shadowed-user";
import { getUserImage } from "@utils/media";
import NextLink from "next/link";
import React from "react";

export default function GridViewCard({ user: { user } }) {
  return (
    <Box className="hover-box fade">
      <Box w="full" position="relative" h="16rem">
        <NextLink href={`/user/show/${user?.id}`}>
          <Link>
            <Image
              objectFit="cover"
              bg="gray.100"
              w="full"
              h="full"
              src={getUserImage(user?.profilePic, user?.name, 400)}
            />
          </Link>
        </NextLink>
        <ShadowedUser user={user} avatar={false} />
      </Box>
    </Box>
  );
}
