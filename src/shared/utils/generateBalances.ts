import { FIAT } from "./constants";

export const generateUserBalances = async () => {
  const balances: any = {};

  Object.keys(FIAT).forEach((currencyCode: string) => {
    balances[currencyCode] = Math.random() * 10000;
  });

  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: balances }), Math.random() * 1200)
  );
};
