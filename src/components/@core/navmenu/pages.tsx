import useGlobalState from "@hooks/use-global-state";
import { flatToTree } from "@utils/pages";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import ListItems from "./pages-list-items";

const PagesNavmenu = ({ staticLinks }) => {
  const { pages } = useGlobalState();
  const router = useRouter();
  const finalPages = useMemo(() => pages.filter((o) => o.id !== 1), [pages]);

  return <ListItems key={router.asPath} children={[...staticLinks, ...flatToTree(finalPages)]} />;
};

export default PagesNavmenu;
