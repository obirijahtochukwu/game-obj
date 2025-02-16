import { Dispatch } from "react";

export const useInputNum = (onChange: Dispatch<number>) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return { handleInputChange };
};
