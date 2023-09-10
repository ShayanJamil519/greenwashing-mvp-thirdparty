import React, { createContext, useContext, useState } from "react";

// Create the context
const StepsContext = createContext();

// Create a provider component
export function StepsProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [step, setStep] = useState("");

  const [processing, setProcessing] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [rows, setRows] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [description, setDescription] = useState();

  return (
    <StepsContext.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        step,
        setStep,
        processing,
        setProcessing,
        requestLoading,
        setRequestLoading,
        showAllReports,
        setShowAllReports,
        rows,
        setRows,
        currentCountry,
        setCurrentCountry,
        description,
        setDescription,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

// Custom hook to access the context
export function useStepsContext() {
  return useContext(StepsContext);
}
