import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext
} from "react";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
import placeholderPng from "assets/placeholder.png";
import { createUrl } from "utils";

const ConfigurationContext = React.createContext();

export function useConfiguration() {
  const value = useContext(ConfigurationContext);
  return value;
}

function ConfigurationProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [configuration, setConfiguration] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConfiguration() {
      try {
        const { data } = await axios.get(createUrl("/configuration"));
        setLoading(false);
        setConfiguration(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }

    fetchConfiguration();
  }, []);

  const getImageUrl = useCallback(
    (path, { original } = {}) => {
      if (!path || !configuration) {
        return placeholderPng;
      }

      const { images } = configuration;
      const { secure_base_url } = images;

      return `${secure_base_url}/${original ? "original" : "w500"}${path}`;
    },
    [configuration]
  );

  const value = useMemo(
    () => ({ loading, configuration, error, getImageUrl }),
    [loading, configuration, error, getImageUrl]
  );

  if (error) {
    return null;
  }

  return (
    <LoadingIndicator loading={loading}>
      <ConfigurationContext.Provider value={value}>
        {children}
      </ConfigurationContext.Provider>
    </LoadingIndicator>
  );
}

export default ConfigurationProvider;
