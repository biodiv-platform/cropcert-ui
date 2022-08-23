import loadImage from "blueimp-load-image";

import notification from "./notification.util";

export function resizeImage(file: File, max = 3000): Promise<any> {
  return new Promise((resolve) => {
    loadImage(
      file,
      (img, data) => {
        try {
          if (data?.exif) {
            // fix orientation
            if (data.exif[274]) {
              loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            }

            // replace imageHead to restore exif of original image
            img.toBlob((blob) => {
              loadImage.replaceHead(blob, data.imageHead, (d) => resolve([d]));
            }, file.type);
          } else {
            img.toBlob((d) => resolve([d]));
          }
        } catch (e) {
          console.warn("EXIF Failed", e);
          if (!img.toBlob) {
            notification("Outdated/Unsupported Browser");
          }
          img.toBlob((d) => resolve([d, {}]));
        }
      },
      {
        meta: true,
        canvas: true,
        orientation: true,
        maxWidth: max,
        maxHeight: max,
      }
    );
  });
}
