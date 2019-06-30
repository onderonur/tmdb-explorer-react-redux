import { useEffect } from "react";
import { addStateToLocation } from "utils";

export function addKeepScrollState(to) {
  return addStateToLocation(to, { keepScroll: true });
}

function useScrollRestoration(location, history) {
  useEffect(() => {
    if (
      history.action !== "POP" &&
      (!location.state || !location.state.keepScroll)
    ) {
      window.scrollTo(0, 0);
    }
  }, [location, history.action]);
}

export default useScrollRestoration;
