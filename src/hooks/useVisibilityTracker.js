import { useRef, useState, useEffect } from "react";

// For more info: https://developers.google.com/web/updates/2016/04/intersectionobserver
function useVisibilityTracker({
  // The root to use for intersection.
  // If not provided, use the top-level document’s viewport.
  root = null,
  // Same as margin, can be 1, 2, 3 or 4 components, possibly negative lengths.
  // If an explicit root element is specified, components may be percentages of the
  // root element size.  If no explicit root element is specified, using a percentage
  // is an error.
  rootMargin = "0px",
  // Threshold(s) at which to trigger callback, specified as a ratio, or list of
  // ratios, of (visible area / total area) of the observed element (hence all
  // entries must be in the range [0, 1]).  Callback will be invoked when the visible
  // ratio of the observed element crosses a threshold in the list.
  threshold = [0]
} = {}) {
  const ref = useRef();
  const observerRef = useRef();
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    function getObserver() {
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );
      }
      return observerRef.current;
    }

    const observer = getObserver();

    const node = ref.current;

    if (node) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, { isVisible }];
}

export default useVisibilityTracker;
