import useGlobalState from "@hooks/use-global-store";
import { flatToTree } from "@utils/pages.util";
import React, { useMemo } from "react";

import ListItems from "./pages-list-items";

const PagesNavmenu = ({ staticLinks }) => {
  const { pages } = useGlobalState();
  const finalPages = useMemo(() => pages.filter((o) => o.id !== 1), [pages]);

  return <ListItems children={[...staticLinks, ...flatToTree(finalPages)]} />;
};

export default PagesNavmenu;
