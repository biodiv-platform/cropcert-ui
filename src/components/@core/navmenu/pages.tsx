import { flatToTree } from "@utils/pages.util";
import { useStoreState } from "easy-peasy";
import React from "react";

import ListItems from "./pages-list-items";

const PagesNavmenu = ({ staticLinks }) => {
  const pages = useStoreState((state) => state.pages).filter((o) => o.id !== 1);
  return <ListItems children={[...staticLinks, ...flatToTree(pages)]} />;
};

export default PagesNavmenu;
