export const percentageCalculator = (
  value: number,
  percentage: number
): number => {
  if (value === 0) {
    return 0;
  }

  return value * (percentage / 100);
};
