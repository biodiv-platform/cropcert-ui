import PagesStore from "@stores/pages.store";
import { flatToTree } from "@utils/pages.util";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

import ListItems from "./pages-list-items";

const PagesNavmenu = ({ staticLinks }) => {
  const pagesStore = useContext(PagesStore);

  useEffect(() => {
    pagesStore.listPages();
  }, []);

  return (
    <ListItems children={[...staticLinks, ...flatToTree(pagesStore.pages)]} />
  );
};

export default observer(PagesNavmenu);
