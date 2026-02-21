// import { Money } from 'src/money.model';

import { ValidCoin, validCoins } from './coin.model';

export class Coin {
  constructor(public value: ValidCoin) {
    if (!validCoins.includes(value)) {
      throw Error(`A coin needs to be one of ${validCoins.join(', ')}`);
    }

    this.value = value;
  }
}
