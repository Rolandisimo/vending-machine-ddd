import { Injectable } from '@nestjs/common';
import { ValidCoin, validCoins } from '../../coin/coin.model';
import { Coin } from '../../coin/coin.value';

@Injectable()
export class LoadingCoinsService {
  private loadedCoins: Coin[] = [];
  public loadCoins(coins: string) {
    const rawCoins: number[] = coins.split(' ').map((s) => parseInt(s));

    rawCoins.forEach((coin) => {
      // Expected that the type is unknown at this stage
      if (!validCoins.includes(coin as any)) {
        console.warn(
          `${coin} is not a valid coin. Valid coins are ${validCoins.join(' ')}`,
        );
        return;
      }

      this.loadedCoins.push(new Coin(coin as ValidCoin));
    });
  }

  public getLoadedCoins(): Coin[] {
    return this.loadedCoins;
  }
}
