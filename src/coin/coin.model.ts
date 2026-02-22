// algorithm implicitly dependent on the order of coins here
export const validCoins = [50, 20, 10, 5, 2, 1] as const;
// export const validCoinsRandom = [20, 50, 1, 10, 2, 5] as const;
export type ValidCoin = (typeof validCoins)[number];
