import { Injectable } from '@nestjs/common';
import { validCoins } from '../../coin/coin.model';
import { Coin } from '../../coin/coin.value';

@Injectable()
export class CoinsService {
  public getCoins(coins: string): Coin[] {
    const loadedCoins: Coin[] = [];
    const rawCoinValuesFromInput = this.extractCoinValuesFromRawInput(coins);

    rawCoinValuesFromInput.forEach((coin) => {
      if (!validCoins.includes(coin)) {
        return;
      }

      loadedCoins.push(new Coin(coin));
    });

    return loadedCoins;
  }

  private extractCoinValuesFromRawInput(coins: string): number[] {
    return coins.split(' ').map((s) => parseInt(s));
  }
}
