import React from "react";
import { Link } from "react-router-dom";

const RouterLink = React.forwardRef(({ keepScroll, to, ...rest }, ref) => {
  const toProp = keepScroll
    ? typeof to === "string"
      ? // TODO: Bi bu "to"nun formatına bak
        {
          pathname: to.split("?")[0],
          search: to.split("?")[1],
          state: { keepScroll }
        }
      : { ...to, state: { ...to.state, keepScroll } }
    : to;

  return <Link {...rest} ref={ref} to={toProp} />;
});

export default RouterLink;
