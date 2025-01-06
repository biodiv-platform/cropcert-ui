import {  Badge, Box, Flex, Heading, HStack, Link, Stack, Text } from "@chakra-ui/react";
import FlagActionButton from "@components/@core/action-buttons/flag";
import DocumentIcon from "@components/pages/document/common/document-icon";
import BookIcon from "@icons/bookmark";
import CalendarIcon from "@icons/calendar";
import MessageIcon from "@icons/message";
import PeopleIcon from "@icons/people";
import { axFlagDocument, axUnFlagDocument } from "@services/document.service";
import { getUserImage } from "@utils/media";
import { getInjectableHTML, stripTags } from "@utils/text";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { Avatar } from "@/components/ui/avatar";

interface InfoTabInterface {
  document;
  user;
  flags?;
}

interface MetaBlockProps {
  icon?;
  children?;
  isHtml?: boolean;
  tooltip?;
}

const MetaBlock = ({ icon, children, isHtml, tooltip }: MetaBlockProps) =>
  children ? (
    <HStack w="full" alignItems="center" gap={2} title={tooltip}>
      {icon}
      {isHtml ? (
        <div
          className="elipsis"
          dangerouslySetInnerHTML={{ __html: getInjectableHTML(children) }}
        />
      ) : (
        <div className="elipsis" children={children} />
      )}
    </HStack>
  ) : null;

export default function InfoTab({ document, flags, user }: InfoTabInterface) {
  const { t } = useTranslation();

  return (
    <Flex direction="column" minH="18rem" justifyContent="space-between" p={4}>
      <Stack color="gray.600">
        {/* Title + Flag */}
        <Flex justifyContent="space-between" mb={3}>
          <NextLink href={`/document/show/${document.id}`}>
            <HStack alignItems="center" gap={4}>
              <DocumentIcon />
              <Heading
                fontSize="lg"
                className="elipsis-2"
                dangerouslySetInnerHTML={{
                  __html: getInjectableHTML(document?.title || t("document:unknown")),
                }}
              />
              <Badge colorPalette="red">{document.itemtype}</Badge>
            </HStack>
          </NextLink>
          {/* Meta Data */}
          <Box>
            <FlagActionButton
              resourceId={document.id}
              resourceType="document"
              initialFlags={flags}
              userId={user.id}
              flagFunc={axFlagDocument}
              unFlagFunc={axUnFlagDocument}
            />
          </Box>
        </Flex>
        <MetaBlock
          icon={<PeopleIcon />}
          tooltip={t("document:bib.author")}
          children={document?.author}
        />
        <MetaBlock
          icon={<CalendarIcon />}
          tooltip={t("document:bib.year")}
          children={document?.year}
        />
        <MetaBlock
          icon={<BookIcon />}
          tooltip={t("document:bib.journal")}
          children={stripTags(document?.journal)}
        />
        <MetaBlock
          icon={<MessageIcon />}
          tooltip={t("document:bib.abstract")}
          children={stripTags(document?.notes)}
        />
      </Stack>
      <Link href={`/user/show/${user?.id}`}>
        <Flex alignItems="center">
          <Avatar
            mr={1}
            size="sm"
            name={user?.name}
            src={getUserImage(user?.profilePic, user?.name)}
          />
          <Text>{user?.name}</Text>
        </Flex>
      </Link>
    </Flex>
  );
}
