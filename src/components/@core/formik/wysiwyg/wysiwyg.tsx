import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/themes/silver";

import { axUploadHandler } from "@services/page.service";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function TinymceEditor({ data, onUpdate }) {
  return (
    <>
      <Editor
        initialValue={data}
        init={{
          skin_url: "https://unpkg.com/tinymce@5.4.2/skins/ui/oxide",
          width: "100%",
          height: "400px",
          relative_urls: false,
          object_resizing: true,
          resize_img_proportional: true,
          plugins: ["image", "imagetools", "link", "code", "table", "lists"],
          contextmenu: "link image imagetools table configurepermanentpen",
          imagetools_toolbar: "alignleft aligncenter alignright | imageoptions",
          toolbar:
            "undo redo | formatselect fontselect fontsizeselect bold italic forecolor backcolor removeformat | numlist bullist | alignleft aligncenter alignright alignjustify | link image table | code",
          images_upload_handler: axUploadHandler,
          images_upload_base_path: "/",
        }}
        onEditorChange={onUpdate}
      />
    </>
  );
}
