import React from "react";
import { Switch } from "react-router-dom";
import useScrollRestoration from "hooks/useScrollRestoration";

function SwitchWithScrollRestoration({ children }) {
  useScrollRestoration();

  return <Switch>{children}</Switch>;
}

export default SwitchWithScrollRestoration;
