import { Injectable } from '@nestjs/common';
import { validCoins } from '../../coin/coin.model';
import { InsufficientBalanceError } from '../../errors/insufficient-balance.error';
import { Balance } from '../value-objects/balance.value';

@Injectable()
export class ChangeService {
  public returnChange(balance: Balance, productPrice: number): string {
    this.balanceMustBeEqualOrHigherThanProductPrice(balance, productPrice);

    return this.calculateChange(balance, productPrice);
  }

  private balanceMustBeEqualOrHigherThanProductPrice(
    balance: Balance,
    productPrice: number,
  ) {
    if (balance.isLessThan(productPrice)) {
      throw new InsufficientBalanceError(balance.getValue(), productPrice);
    }
  }

  private calculateChange(balance: Balance, productPrice: number): string {
    let changingBalance = balance.subtract(productPrice);
    const coinsGivenBack: number[] = [];

    // Algorithm innefficient because it goes over all coins every time
    while (changingBalance.isMoreThan(0)) {
      for (const validCoin of validCoins) {
        if (changingBalance.isLessThan(validCoin)) {
          continue;
        }

        coinsGivenBack.push(validCoin);
        changingBalance = changingBalance.subtract(validCoin);
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
