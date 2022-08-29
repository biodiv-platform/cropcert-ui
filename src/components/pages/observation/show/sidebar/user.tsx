import { Avatar, Box, Link, SimpleGrid } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import Badge from "@components/@core/user/badge";
import { UserIbp } from "@interfaces/observation";
import { getUserImage } from "@utils/media";
import NextLink from "next/link";
import React from "react";

interface UserProps {
  user: UserIbp | undefined;
}

const User = ({ user }: UserProps) =>
  user ? (
    <SimpleGrid columns={5} py={4} mb={4} alignItems="center" className="white-box">
      <NextLink href={`/user/show/${user.id}`}>
        <Link justifySelf="center" px={4}>
          <Avatar name={user.name} src={getUserImage(user.profilePic, user.name)} />
        </Link>
      </NextLink>
      <Box gridColumn="2/6">
        <NextLink href={`/user/show/${user.id}`}>
          <BlueLink className="text-elipsis" fontWeight="bold">
            {user.name} <Badge isAdmin={user.isAdmin} />
          </BlueLink>
        </NextLink>
      </Box>
    </SimpleGrid>
  ) : null;

export default User;
