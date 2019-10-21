import { useHistory } from "react-router-dom";

function splitPathnameAndQueryString(path) {
  const [pathname, search] = path.split("?");
  return {
    pathname,
    search: search ? `?${search}` : ""
  };
}

function addStateToLocation(to, addedState) {
  let toObject;

  if (typeof to === "string") {
    const { pathname, search } = splitPathnameAndQueryString(to);
    toObject = {
      pathname,
      search
    };
  } else {
    toObject = to;
  }

  return {
    ...toObject,
    state: {
      ...toObject.state,
      ...addedState
    }
  };
}

export function addKeepScrollState(to) {
  return addStateToLocation(to, { keepScroll: true });
}

function useHistoryPush() {
  const history = useHistory();

  function historyPush(to, { keepScrollState } = {}) {
    history.push(keepScrollState ? addKeepScrollState(to) : to);
  }

  return historyPush;
}

export default useHistoryPush;
