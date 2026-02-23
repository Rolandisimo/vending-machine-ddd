import { Injectable } from '@nestjs/common';
import { ProductBase } from '../../product/products';
import { Coin } from '../../coin/coin.value';
import { validCoins } from '../../coin/coin.model';
import { InsufficientBalanceError } from '../../errors/insufficient-balance.error';
import { BalanceService } from './balance.service';

@Injectable()
export class ChangeService {
  constructor(private readonly balanceService: BalanceService) {}

  public returnChange(product: ProductBase, coins: Coin[]): string {
    // why is topup here? Feels awkward
    this.balanceService.topUp(coins);

    // domain rule - balance can't be lower than product price
    // might need a specification class
    // feels like Value Object behavior but exposing the balance directly feels wrong due to other
    // operations that balance service can do
    if (this.balanceService.isLessThan(product.getPrice())) {
      throw new InsufficientBalanceError(
        this.balanceService.getBalance(),
        product.getPrice(),
      );
    }

    return this.getChangeToGiveBackAfterPaying(product.getPrice());
  }

  private getChangeToGiveBackAfterPaying(productPrice: number): string {
    this.balanceService.subtract(productPrice);
    const coinsGivenBack: number[] = [];

    // Algorithm innefficient because it goes over all coins every time
    while (this.balanceService.isMoreThan(0)) {
      for (const validCoin of validCoins) {
        if (this.balanceService.isLessThan(validCoin)) {
          continue;
        }

        coinsGivenBack.push(validCoin);
        this.balanceService.subtract(validCoin);
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
