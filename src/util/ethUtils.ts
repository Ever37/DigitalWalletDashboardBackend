/**
 * Convert wei (smallest unit of Ether) to Ether (ETH).
 *
 * @param {string} wei - Amount in wei to be converted.
 * @returns {number} - Equivalent amount in Ether.
 */
export const weiToEth = (wei: number): number => {
  const amountEth = wei / 1000000000000000000;
  return amountEth;
};

/**
 * Check if a given timestamp is more than one year old.
 *
 * @param {number} timestamp - The timestamp to be checked.
 * @returns {boolean} - `true` if the timestamp is more than one year old, otherwise `false`.
 */
export const isDateGreaterThanOneYear = (timestamp: number): boolean => {
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const dateToCheck = new Date(timestamp * 1000);
  const differenceInDays = Math.floor(
    (currentDate.getTime() - dateToCheck.getTime()) / (1000 * 60 * 60 * 24),
  );
  return differenceInDays >= 365;
};
