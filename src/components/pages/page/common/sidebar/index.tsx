import { Button, Collapsible, Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import MenuIcon from "@icons/menu";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { Suspense } from "react";

import { PagesList } from "./pages-list";
import usePages from "./use-pages-sidebar";

const ReOrderPagesModal = dynamic(() => import("../reorder-pages-modal"), { ssr: false });

export default function PagesSidebar() {
  const { canEdit } = usePages();
  const { pages } = useGlobalState();
  const { t } = useTranslation();

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { open, onToggle } = useDisclosure();

  return pages.length ? (
    <div>
      {!isDesktop && (
        <Button colorPalette="blue" w="full" mb={4} onClick={onToggle}>
          <MenuIcon />
          {t("page:sidebar.toggle")}
        </Button>
      )}
      <Collapsible.Root open={isDesktop || open} unmountOnExit={true}>
        {canEdit && (
          <Suspense fallback={<Spinner />}>
            <ReOrderPagesModal />
          </Suspense>
        )}
        <PagesList items={pages} isParent={true} />
      </Collapsible.Root>
    </div>
  ) : null;
}
