import useGlobalState from "@hooks/use-global-store";
import React from "react";
import { Page } from "types/pages";

import PageEditorComponent from "../editor";

export default function AddPageComponent({ parentId }) {
  const { user } = useGlobalState();

  const page: Page = {
    content: "",
    pageType: "CONTENT",
    parentId: Number(parentId),
    authorId: user.id,
  };

  return <PageEditorComponent page={page} isEdit={false} />;
}
