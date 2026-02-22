import { Injectable } from '@nestjs/common';
import { ProductBase } from '../../product/products';
import { Coin } from '../../coin/coin.value';
import { validCoins } from '../../coin/coin.model';
import { InsufficientBalanceError } from '../../errors/insufficient-balance.error';
import { Balance } from '../value-objects/balance.value';

@Injectable()
export class ChangeService {
  private balance: Balance = new Balance(0);
  private loadBalance(loadedCoins: Coin[]): void {
    loadedCoins.forEach((coin) => {
      this.balance = this.balance.add(coin.value);
    });
  }

  public returnChange(loadedProduct: ProductBase, loadedCoins: Coin[]): string {
    this.loadBalance(loadedCoins);

    // domain rule - balance can't be lower than product price
    // might need a specification class
    if (this.balance.getValue() < loadedProduct.getPrice()) {
      throw new InsufficientBalanceError(
        this.balance.getValue(),
        loadedProduct.getPrice(),
      );
    }

    return this.getChangeToGiveBackAfterPaying(loadedProduct.getPrice());
  }

  private getChangeToGiveBackAfterPaying(loadedProductPrice: number) {
    let changeToGive = this.balance.getValue() - loadedProductPrice;
    const coinsGivenBack: number[] = [];

    // CALCULATE EXACT COINS TO GIVE - different responsibility for vending mahcine
    // Algorithm innefficient because it goes over all coins every time
    while (changeToGive > 0) {
      for (const validCoin of validCoins) {
        if (changeToGive < validCoin) {
          continue;
        }

        coinsGivenBack.push(validCoin);
        changeToGive -= validCoin;
        break;
      }
    }

    return this.getFormattedChange(coinsGivenBack);
  }

  private getFormattedChange(coins: number[]): string {
    let change = '';
    coins.forEach((coin) => {
      change += coin + ' ';
    });

    return change.trim();
  }
}
