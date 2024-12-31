import React from "react";
import "./style.css";
import { useStepContext } from "../../../contexts/contxPassos";

const PassosMenu = () => {
  const { step, setStep } = useStepContext();
  const getStepStyle = (currentStep) => {
    if (currentStep < step)
      return { backgroundColor: "#0dda29", color: "#ffffff" }; // Passos concluídos (verde)
    if (currentStep === step) return { backgroundColor: "#ffeb33" }; // Passo atual (amarelo)
    return { backgroundColor: "#ccc" }; // Passos futuros (cinza)
  };

  const handleSelectStep = (step2) => {
    if (step2 < step) return () => setStep(step2);
  };
  return (
    <div
      className="passos-menu-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        onClick={handleSelectStep(1)}
        style={getStepStyle(1)}
        className="passos-div"
      >
        1
      </div>
      <span className="span-line"></span>
      <div
        onClick={handleSelectStep(2)}
        style={getStepStyle(2)}
        className="passos-div"
      >
        2
      </div>
      <span className="span-line"></span>
      <div
        onClick={handleSelectStep(3)}
        style={getStepStyle(3)}
        className="passos-div"
      >
        3
      </div>
    </div>
  );
};
export default PassosMenu;
