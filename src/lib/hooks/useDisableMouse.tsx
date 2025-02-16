import { useState } from "react";

export const useDiasbleMouse = () => {
  const [isMouseDisable, setIsMouseDisable] = useState(false);

  const disableMouse = () => {
    setIsMouseDisable(true);
    document.body.style.pointerEvents = "none";
  };

  const enableMouse = () => {
    setIsMouseDisable(false);
    document.body.style.pointerEvents = "auto";
  };

  return { isMouseDisable, disableMouse, enableMouse };
};
