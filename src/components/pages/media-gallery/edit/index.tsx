import Container from "@components/@core/container";
import React from "react";

import MediaGalleryEditForm from "./form/mediaGalleryEditForm";

export default function MediaGalleryEditComponent(props) {
  return (
    <Container py={6}>
      <MediaGalleryEditForm {...props} />
    </Container>
  );
}
