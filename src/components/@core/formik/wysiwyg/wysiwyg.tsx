import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/themes/silver/theme";
import "tinymce/tinymce";

import { axUploadHandler } from "@services/page.service";
import { Editor } from "@tinymce/tinymce-react";
import Head from "next/head";
import React from "react";

export default function TinymceEditor({ data, onUpdate }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/tinymce@5.3.1/skins/ui/oxide/content.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/tinymce@5.3.1/skins/ui/oxide/skin.min.css"
        />
      </Head>
      <Editor
        initialValue={data}
        init={{
          skin: false,
          width: "100%",
          height: "400px",
          relative_urls: false,
          plugins: ["image", "link", "code", "table", "lists"],
          style_formats: [
            { title: "Image formats" },
            {
              title: "Image Left",
              selector: "img",
              styles: { float: "left", margin: "0 10px 0 10px" },
            },
            {
              title: "Image Right",
              selector: "img",
              styles: { float: "right", margin: "0 0 10px 10px" },
            },
          ],
          toolbar:
            "undo redo | bold italic numlist bullist | alignleft aligncenter alignright alignjustify | link image table | code",
          images_upload_handler: axUploadHandler,
          images_upload_base_path: "/",
        }}
        onEditorChange={onUpdate}
      />
    </>
  );
}
