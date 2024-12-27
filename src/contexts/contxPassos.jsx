import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [emailCX, setEmailCX] = useState('');

  const [isAccountCreated, setIsAccountCreated] = useState(false);


  
  return (
    <StepContext.Provider value={{ step, setStep, emailCX, setEmailCX ,setIsAccountCreated,isAccountCreated}}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepContext must be used within a StepProvider');
  }
  return context;
};
