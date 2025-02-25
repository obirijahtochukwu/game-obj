export const formattedNumber = (number: number) => {
  // if (number >= 1000000) {
  //   return `${number / 1000000}m`;
  // } else if (number >= 1000) {
  //   return number / 1000 + "k";
  // } else {
  return formatToTwoDecimalPlaces(number)?.toLocaleString();
  // }
};

function formatToTwoDecimalPlaces(number: number) {
  if (typeof number !== "number") {
    return "Invalid input: Please provide a number.";
  }

  const numStr = number.toString();
  const decimalIndex = numStr.indexOf(".");

  if (decimalIndex === -1) {
    return number; // Return the integer as is
  }

  const numDecimals = numStr.length - decimalIndex - 1;

  if (numDecimals <= 2) {
    return parseFloat(number.toFixed(2)); // Return float with 2 decimals
  } else {
    return parseFloat(number.toFixed(2)); // Truncate/round to two decimals and return float
  }
}
