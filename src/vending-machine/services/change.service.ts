import { Injectable } from '@nestjs/common';
import { validCoins } from '../../coin/coin.model';
import { InsufficientBalanceError } from '../../errors/insufficient-balance.error';
import { BalanceService } from './balance.service';
import { ProductService } from './product.service';

@Injectable()
export class ChangeService {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly productService: ProductService,
  ) {}

  public returnChange(): string {
    const productPrice = this.productService.getProductPrice();

    this.balanceMustBeEqualOrHigherThanProductPrice(productPrice);

    return this.calculateChange(productPrice);
  }

  private balanceMustBeEqualOrHigherThanProductPrice(productPrice: number) {
    if (this.balanceService.isLessThan(productPrice)) {
      throw new InsufficientBalanceError(
        this.balanceService.getBalance(),
        productPrice,
      );
    }
  }

  private calculateChange(productPrice: number): string {
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
