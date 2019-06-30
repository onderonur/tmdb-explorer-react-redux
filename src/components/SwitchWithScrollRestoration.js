import React from "react";
import { Switch, withRouter } from "react-router-dom";
import useScrollRestoration from "hooks/useScrollRestoration";

function SwitchWithScrollRestoration({ children, location, history }) {
  useScrollRestoration(location, history);

  return <Switch>{children}</Switch>;
}

export default withRouter(SwitchWithScrollRestoration);
