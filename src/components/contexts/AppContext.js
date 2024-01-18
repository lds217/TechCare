import React, {createContext, useContext, useState} from "react";

const AppContext = createContext({
  patientId: "",
  meal: "",
  status: [],
  feeling: null,
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({children}) {
  const [patientId, setPatientId] = useState("");
  const [meal, setMeal] = useState("");
  const [status, setStatus] = useState([]);
  const [feeling, setFeeling] = useState(null);
  const resetAppContext = () => {
    setPatientId("");
    setMeal("");
    setStatus([]);
    setFeeling(null);
  }

  const contextValue = {
    patientId,
    meal,
    status,
    feeling,
    setPatientId,
    setMeal,
    setStatus,
    setFeeling,
    resetAppContext,
  };

  return (
      <AppContext.Provider
          value={contextValue}>{children}
      </AppContext.Provider>
  );
}
