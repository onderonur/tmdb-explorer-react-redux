import React from "react";
import BaseImage from "./BaseImage";
import RouterLink from "./RouterLink";
import { useLocation } from "react-router-dom";
import { useConfiguration } from "./ConfigurationProvider";

function ImageGridListItem({ filePath, aspectRatio }) {
  const location = useLocation();
  const { getImageUrl } = useConfiguration();

  return (
    <li>
      <RouterLink keepScroll to={`${location.pathname}?view=${filePath}`}>
        <BaseImage
          src={getImageUrl(filePath)}
          aspectRatio={aspectRatio}
          objectFit="contain"
        />
      </RouterLink>
    </li>
  );
}

export default ImageGridListItem;
