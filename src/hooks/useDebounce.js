import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";

function useDebounce(value, wait = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const changeHandler = useRef();

  useEffect(() => {
    changeHandler.current = debounce(
      newValue => setDebouncedValue(newValue),
      wait
    );

    return () => changeHandler.current.cancel();
  }, [wait]);

  useEffect(() => {
    changeHandler.current(value);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
