import React from "react";
import { useSelector } from "react-redux";
import { selectBackdrop } from "reducers";
import BaseImage from "components/BaseImage";
import { getImageUrl } from "utils";
import RouterLink from "components/RouterLink";
import { useLocation } from "react-router-dom";

function MovieImageGridListItem({ backdropId }) {
  const backdrop = useSelector(state => selectBackdrop(state, backdropId));
  const location = useLocation();

  return (
    <RouterLink
      keepScroll
      to={`${location.pathname}?view=${backdrop.file_path}`}
    >
      <BaseImage
        src={backdrop ? getImageUrl(backdrop.file_path) : null}
        aspectRatio="16:9"
      />
    </RouterLink>
  );
}

export default MovieImageGridListItem;
