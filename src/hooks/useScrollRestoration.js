import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

function useScrollRestoration() {
  const location = useLocation();
  const history = useHistory();

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
