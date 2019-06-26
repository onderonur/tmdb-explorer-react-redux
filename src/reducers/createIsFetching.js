import produce from "immer";

const createIsFetching = types => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected types to be an array of three elements.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected types to be strings.");
  }

  // TODO: state false'tan başlayıp hemen true olup tekrar false'a dönünce flicker oluyor.
  // Nasıl çözülür bak
  return (state = false, action) => {
    const [requestType, successType, failureType] = types;

    return produce(state, draft => {
      switch (action.type) {
        case requestType:
          return true;
        case successType:
          return false;
        case failureType:
          return false;
        default:
          return;
      }
    });
  };
};

export default createIsFetching;
