import { isDateGreaterThanOneYear, weiToEth } from '../ethUtils';

describe('weiToEth', () => {
  it('should convert wei to ether correctly', () => {
    const wei = 1000000000000000000; // 1 ETH in wei
    const eth = weiToEth(wei);
    expect(eth).toBe(1);
  });

  it('should convert other wei values to ether correctly', () => {
    const wei = 500000000000000000; // 0.5 ETH in wei
    const eth = weiToEth(wei);
    expect(eth).toBe(0.5);
  });
});

describe('isDateGreaterThanOneYear', () => {
  it('should return true if timestamp is more than one year old', () => {
    const currentTimestamp = Date.now() / 1000; // Current timestamp in seconds
    const oneYearAgoTimestamp = currentTimestamp - 31536000; // One year ago
    const result = isDateGreaterThanOneYear(oneYearAgoTimestamp);
    expect(result).toBe(true);
  });

  it('should return false if timestamp is less than one year old', () => {
    const currentTimestamp = Date.now() / 1000; // Current timestamp in seconds
    const sixMonthsAgoTimestamp = currentTimestamp - 15768000; // Six months ago
    const result = isDateGreaterThanOneYear(sixMonthsAgoTimestamp);
    expect(result).toBe(false);
  });
});
