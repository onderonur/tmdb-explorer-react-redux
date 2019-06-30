import React from "react";
import { Switch, withRouter } from "react-router-dom";
import useScrollToTop from "hooks/useScrollToTop";

function SwitchWithScrollToTop({ children, location, history }) {
  useScrollToTop(location, history);
  return <Switch>{children}</Switch>;
}

export default withRouter(SwitchWithScrollToTop);
