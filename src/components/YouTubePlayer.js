import React from "react";
import useAspectRatio, { getAspectRatioString } from "hooks/useAspectRatio";

function YouTubePlayer({ youTubeId }) {
  const aspectRatioClasses = useAspectRatio({
    aspectRatio: getAspectRatioString(16, 9)
  });

  return (
    <div className={aspectRatioClasses.root}>
      <iframe
        className={aspectRatioClasses.child}
        // Key is added to unmount the iframe everytime youTubeId changes.
        // Otherwise, iframe messes up with the browser history.
        key={youTubeId}
        title="YouTubePlayer"
        src={`https://www.youtube.com/embed/${youTubeId}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubePlayer;
