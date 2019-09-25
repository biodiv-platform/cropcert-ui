import "tinymce/tinymce";
import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/themes/silver/theme";
import "./index.scss"

import { axUploadHandler } from "@services/pages.services";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function TinymceEditor({ data, onUpdate }) {
  return (
    <Editor
      initialValue={data}
      init={{
        skin: false,
        width: "100%",
        height: "400px",
        relative_urls: false,
        plugins: ["link", "image", "table", "code"],
        toolbar:
          "undo redo | bold italic | alignleft aligncenter alignright alignjustify | link image table | code",
        images_upload_handler: axUploadHandler,
        images_upload_base_path: "/",
      }}
      onEditorChange={onUpdate}
    />
  );
}
