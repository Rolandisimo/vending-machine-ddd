import { Injectable } from '@nestjs/common';
import { validCoins } from '../../coin/coin.model';
import { Coin } from '../../coin/coin.value';

@Injectable()
export class LoadingCoinsService {
  private readonly loadedCoins: Coin[] = [];

  public loadCoins(coins: string): void {
    const rawCoinValuesFromInput = this.extractCoinValuesFromRawInput(coins);

    rawCoinValuesFromInput.forEach((coin) => {
      if (!validCoins.includes(coin)) {
        return;
      }

      this.loadedCoins.push(new Coin(coin));
    });
  }

  public getLoadedCoins(): Coin[] {
    return this.loadedCoins;
  }

  private extractCoinValuesFromRawInput(coins: string): number[] {
    return coins.split(' ').map((s) => parseInt(s));
  }
}
