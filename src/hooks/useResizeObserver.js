import { useRef, useState, useEffect, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";
import useThrottle from "./useThrottle";

function useResizeObserver({ wait } = {}) {
  const observerRef = useRef();
  const [rect, setRect] = useState({});
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
      setRect(false);
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

  return [refCallback, throttledRect];
}

export default useResizeObserver;
