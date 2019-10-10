import React from "react";
import BaseImage from "./BaseImage";
import { getImageUrl } from "utils";
import RouterLink from "./RouterLink";
import { useLocation } from "react-router-dom";

function ImageGridListItem({ filePath }) {
  const location = useLocation();

  return (
    <li>
      <RouterLink keepScroll to={`${location.pathname}?view=${filePath}`}>
        <BaseImage src={getImageUrl(filePath)} aspectRatio="16:9" />
      </RouterLink>
    </li>
  );
}

export default ImageGridListItem;
