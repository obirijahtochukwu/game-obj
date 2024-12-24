export const generateRandomNumber = () => {
  const min = 1;
  const max = 30;
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
};
