import { useEffect, useState, useRef } from "react";
import throttle from "lodash/throttle";

function useThrottle(value, wait = 250) {
  const [throttledValue, setThrottledValue] = useState(value);
  const changeHandler = useRef(
    throttle(newValue => setThrottledValue(newValue), wait)
  );

  useEffect(() => {
    changeHandler.current(value);
  }, [value]);

  useEffect(() => {
    const handler = changeHandler.current;
    return () => handler.cancel();
  }, []);

  return throttledValue;
}

export default useThrottle;
