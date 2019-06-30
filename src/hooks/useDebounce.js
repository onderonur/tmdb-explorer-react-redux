import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";

function useDebounce(value, wait = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const changeHandler = useRef(
    debounce(newValue => setDebouncedValue(newValue), wait)
  );

  useEffect(() => {
    changeHandler.current(value);
  }, [value]);

  useEffect(() => {
    const handler = changeHandler.current;
    return () => handler.cancel();
  }, []);

  return debouncedValue;
}

export default useDebounce;
