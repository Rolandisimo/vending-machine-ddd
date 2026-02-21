export const validCoins = [1, 2, 5, 10, 20, 50] as const;
export type ValidCoin = (typeof validCoins)[number];
