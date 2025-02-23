export const formattedNumber = (number: number) => {
  // if (number >= 1000000) {
  //   return `${number / 1000000}m`;
  // } else if (number >= 1000) {
  //   return number / 1000 + "k";
  // } else {
  return number?.toLocaleString();
  // }
};
