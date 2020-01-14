import React from "react";
import BaseImage from "./BaseImage";
import { getImageUrl } from "utils";
import { getAspectRatioString } from "./AspectRatio";

function MediaGalleryModalImageViewer({ filePath }) {
  return (
    <BaseImage
      // Added this key to recreate the component when the "file_path" changes.
      // Without this, when user clicks the "next" or "previous" button, it wait image to load to rerender.
      key={filePath || "0"}
      src={getImageUrl(filePath, {
        original: true
      })}
      lazyLoad={false}
      aspectRatio={getAspectRatioString(16, 9)}
      objectFit="contain"
      showFallbackWhileLoading={true}
    />
  );
}

export default MediaGalleryModalImageViewer;
