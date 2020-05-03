import { useStoreState } from "easy-peasy";
import React from "react";
import { Page } from "types/pages";

import PageEditorComponent from "../editor";

export default function AddPageComponent({ parentId }) {
  const id = useStoreState((state) => state.user.id);

  const page: Page = {
    content: "",
    pageType: "CONTENT",
    parentId: Number(parentId),
    authorId: id,
  };

  return <PageEditorComponent page={page} isEdit={false} />;
}
