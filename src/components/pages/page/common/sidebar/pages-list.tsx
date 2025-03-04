import { Box, Button, chakra } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import { axDeletePageByID } from "@services/pages.service";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

import { PAGE_TYPES } from "../data";
import usePages from "./use-pages-sidebar";

interface PagesListProps {
  items;
  isParent?;
}

const TogglePaneButton = ({ isExpanded, onToggle }) => (
  <Button variant="ghost" fontSize="xl" colorPalette="transparent" onClick={onToggle} pl={0}>
    {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
  </Button>
);

const PagesListItem = ({ page, isParent }) => {
  const { currentPage, linkType, canEdit } = usePages();
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasChildren, isActive] = useMemo(
    () => [page.children.length > 0, currentPage?.id === page.id],
    [page, currentPage]
  );
  const { t } = useTranslation();

  return (
    <div>
      <Box
        rounded="md"
        bg={isActive ? "blue.100" : "none"}
        _hover={isActive ? {} : { bg: "gray.200" }}
        display="flex"
        transition="all 0.2s"
        alignItems="center"
        justifyContent="space-between"
        fontWeight={isParent ? "semibold" : "normal"}
        mb={2}
      >
        <Link passHref={true} href={`/page/${linkType}/${page.id}`} legacyBehavior>
          <chakra.a flexGrow={1} pl={3} py={2}>
            {!isParent && <chakra.span opacity={0.5} mr={3} children="#" />}
            {page.title}
          </chakra.a>
        </Link>
        {canEdit && page.pageType == PAGE_TYPES.REDIRECT && (
          <DeleteActionButton
            observationId={currentPage.id}
            title={t("page:remove.title")}
            description={t("page:remove.description")}
            deleted={t("page:remove.success")}
            deleteFunc={axDeletePageByID}
          />
        )}

        {hasChildren && (
          <TogglePaneButton isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
        )}
      </Box>
      {isExpanded && hasChildren && <PagesList items={page.children} key={page.id} />}
    </div>
  );
};

export const PagesList = ({ items, isParent }: PagesListProps) => (
  <Box ml={isParent ? 0 : 3}>
    {items.map((page) => (
      <PagesListItem page={page} key={page.id} isParent={isParent} />
    ))}
  </Box>
);
