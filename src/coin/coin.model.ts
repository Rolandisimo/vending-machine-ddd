// algorithm implicitly dependent on the order of coins here
export const validCoins = [50, 20, 10, 5, 2, 1];
export type ValidCoin = (typeof validCoins)[number];
