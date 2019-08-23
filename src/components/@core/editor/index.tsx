import "./editor.scss";

import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CKEditor from "@ckeditor/ckeditor5-react";
import { ENDPOINT } from "@utils/constants";
import SimpleuploadPlugin from "ckeditor5-simple-upload/src/simpleupload";
import React from "react";

export default function Editor({ data, token, onUpdate }) {
  console.log(token);

  return (
    <CKEditor
      editor={DecoupledEditor}
      onInit={editor => {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
      }}
      data={data}
      config={{
        extraPlugins: [SimpleuploadPlugin],
        simpleUpload: {
          uploadUrl: {
            url: `${ENDPOINT.PAGES}/image`,
            headers: {
              Authorization: token,
            },
          },
        },
      }}
      onChange={(event, editor) => {
        onUpdate(editor.getData());
      }}
    />
  );
}
