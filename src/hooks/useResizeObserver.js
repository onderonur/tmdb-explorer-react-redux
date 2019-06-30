import { useRef, useState, useEffect, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";
import useThrottle from "./useThrottle";

function useResizeObserver({ wait = 200 } = {}) {
  const observerRef = useRef();
  const [rect, setRect] = useState();
  const throttledRect = useThrottle(rect, wait);

  function clearPreviousObserver() {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearPreviousObserver();
      setRect({});
    };
  }, []);

  const refCallback = useCallback(node => {
    clearPreviousObserver();

    if (node) {
      observerRef.current = new ResizeObserver(([entry]) => {
        setRect(entry.contentRect);
      });

      observerRef.current.observe(node);
    }
  }, []);

  // If we directly return "throttledRect", when the component mounts it initializes as undefined.
  // But "rect" is actually has values. This is due to "wait"ing of throttle.
  // This may cause some flickering on screen etc.
  // To return the initial "rect" value, we check if "rect" is initialized and "throttledRect" is not yet.
  // In this case we return the original "rect". Otherwise, we return the "throttledRect".
  return [refCallback, rect && !throttledRect ? rect : throttledRect || {}];
}

export default useResizeObserver;
