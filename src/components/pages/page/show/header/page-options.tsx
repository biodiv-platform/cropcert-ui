import { Box, Flex } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import ShareActionButton from "@components/@core/action-buttons/share";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import Container from "@components/@core/container";
import AddIcon from "@icons/add";
import EditIcon from "@icons/edit";
import { axDeletePageByID } from "@services/pages.service";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import NoSSR from "@/components/@core/no-ssr";

import usePages from "../../common/sidebar/use-pages-sidebar";
import { TableOfContents } from "./toc";

export function PageOptions({ title, pageId }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { canEdit } = usePages();

  const handleOnEdit = () => router.push(`/page/edit/${pageId}`);

  const handleOnCreate = () => router.push(`/page/create`);

  return (
    <Box
      bg="whiteAlpha.700"
      py={2}
      position="sticky"
      top={0}
      zIndex={1}
      backdropFilter="saturate(180%) blur(20px)"
      shadow="sm"
    >
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <NoSSR>
              <TableOfContents />
            </NoSSR>
          </Box>
          <Flex alignItems="center" gap={2}>
            <ShareActionButton text={title} title={t("page:share")} />
            {canEdit && (
              <>
                <SimpleActionButton
                  icon={<AddIcon />}
                  title={t("page:create.title")}
                  onClick={handleOnCreate}
                  colorPalette="yellow"
                />
                <SimpleActionButton
                  icon={<EditIcon />}
                  title={t("common:edit")}
                  onClick={handleOnEdit}
                  colorPalette="teal"
                />
                <DeleteActionButton
                  observationId={pageId}
                  title={t("page:remove.title")}
                  description={t("page:remove.description")}
                  deleted={t("page:remove.success")}
                  deleteFunc={axDeletePageByID}
                />
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
