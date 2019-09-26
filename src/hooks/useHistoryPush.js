import { useHistory } from "react-router-dom";
import { addStateToLocation } from "utils";

export function addKeepScrollState(to) {
  return addStateToLocation(to, { keepScroll: true });
}

function useHistoryPush() {
  const history = useHistory();

  function historyPush(to, { keepScrollState }) {
    history.push(keepScrollState ? addKeepScrollState(to) : to);
  }

  return historyPush;
}

export default useHistoryPush;
