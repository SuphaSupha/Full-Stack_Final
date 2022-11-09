import { createContext, useState, useEffect } from "react";

export const NightDayContext = createContext();

const NightDayProvider = ({ children }) => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const nightMode = localStorage.getItem("mode");

    if (nightMode !== null) {
      setIsNight(nightMode === "false");
    }
  }, []);

  const toggleMode = () => {
    setIsNight((prevMode) => !prevMode);
    localStorage.setItem("mode", isNight);
  };
  return (
    <NightDayContext.Provider value={{ isNight, toggleMode }}>
      {children}
    </NightDayContext.Provider>
  );
};

export default NightDayProvider;
