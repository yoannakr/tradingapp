export const calculateFee = (): number => {
  const min = 0;
  const max = 1;

  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};
