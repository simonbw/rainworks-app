import React, { useContext, useState, useEffect } from "react";
import { showError } from "../utils/toastUtils";
import { Rainwork, fetchRainworks } from "../api/rainworksApi";

interface State {
  rainworks: ReadonlyArray<Rainwork>;
  galleryRainworks: ReadonlyArray<Rainwork>;
  activeRainworks: ReadonlyArray<Rainwork>;
  expiredRainworks: ReadonlyArray<Rainwork>;
  loading: boolean;
}

interface Value extends State {
  refreshAll: () => void;
  refreshRainwork: (rainworkId: string) => void;
}

const RainworksContext = React.createContext<Value>({
  rainworks: [],
  galleryRainworks: [],
  activeRainworks: [],
  expiredRainworks: [],
  loading: false,
  refreshAll: () => {},
  refreshRainwork: () => {}
});

export const RainworksConsumer = RainworksContext.Consumer;

export function useRainworksContext() {
  return useContext(RainworksContext);
}

interface Props {
  children?: React.ReactNode;
}

export function RainworksProvider({ children }: Props) {
  const [rainworks, setRainworks] = useState<Rainwork[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRainworks() {
    if (!loading) {
      setLoading(true);
      try {
        setRainworks(await fetchRainworks());
      } catch (e) {
        showError("Loading rainworks failed");
      }
      setLoading(false);
    }
  }

  // Load rainworks immediately
  useEffect(() => {
    loadRainworks();
  });

  return (
    <RainworksContext.Provider
      value={{
        loading,
        rainworks,
        galleryRainworks: rainworks.filter(
          rainwork => rainwork["image_url"] && rainwork["show_in_gallery"]
        ),
        activeRainworks: rainworks.filter(
          rainwork => rainwork["approval_status"] === "accepted"
        ),
        expiredRainworks: rainworks.filter(
          rainwork => rainwork["approval_status"] === "expired"
        ),
        refreshAll: loadRainworks,
        refreshRainwork: loadRainworks // TODO: Actually load only a single rainwork
      }}
    >
      {children || null}
    </RainworksContext.Provider>
  );
}
