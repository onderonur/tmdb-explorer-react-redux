import React from "react";
import { Link } from "react-router-dom";
import { addKeepScrollState } from "hooks/useScrollRestoration";

const RouterLink = React.forwardRef(({ keepScroll, to, ...rest }, ref) => {
  const toProp = keepScroll ? addKeepScrollState(to) : to;

  return <Link {...rest} ref={ref} to={toProp} />;
});

export default RouterLink;
