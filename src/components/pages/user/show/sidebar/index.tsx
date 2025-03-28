import { AspectRatio, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Badge from "@components/@core/user/badge";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { adminOrAuthor, hasAccess } from "@utils/auth";
import { getUserImage } from "@utils/media";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { Avatar } from "@/components/ui/avatar";

import DeleteAccount from "./delete-account";

export default function UserInfoSidebar({ user }) {
  const userImage = getUserImage(user.profilePic, user.name, 400);
  const { t } = useTranslation();
  const [canEdit, setCanEdit] = useState<boolean>();
  const [canDelete, setCanDelete] = useState<boolean>();
  const { user: u1 } = useGlobalState();

  useEffect(() => {
    setCanEdit(adminOrAuthor(user.id));
    setCanDelete(hasAccess([ROLES.ADMIN], u1));
  }, []);

  return (
    <div>
      <Flex flexDirection={{ base: "row", md: "column" }} mb={4}>
        <AspectRatio ratio={1} mb={{ md: 4 }} boxSize={{ base: "4rem", md: "auto" }} flexShrink={0}>
          <div>
            <Avatar position="absolute" boxSize="full" src={userImage} name={user.name} />
          </div>
        </AspectRatio>
        <Box pl={{ base: 4, md: 0 }} wordBreak="break-word">
          <Heading as="h1" fontSize="2xl">
            {user.name} <Badge isAdmin={user.isAdmin} />
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {user.userName}
          </Text>
        </Box>
      </Flex>
      <Link href={`/user/edit/${user.id}`}>
        <Button as="a" w="full" colorPalette="blue" mb={4} hidden={!canEdit}>
          {t("user:edit_profile")}
        </Button>
      </Link>
      {canDelete && <DeleteAccount userId={user.id} />}
    </div>
  );
}
