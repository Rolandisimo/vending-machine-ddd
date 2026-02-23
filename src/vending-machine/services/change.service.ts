import { Injectable } from '@nestjs/common';
import { ProductBase } from '../../product/products';
import { Coin } from '../../coin/coin.value';
import { validCoins } from '../../coin/coin.model';
import { InsufficientBalanceError } from '../../errors/insufficient-balance.error';
import { BalanceService } from './balance.service';
import { LoadingCoinsService } from './loading-coins.service';
import { LoadingProductService } from './loading-product.service';

@Injectable()
export class ChangeService {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly loadCoinsService: LoadingCoinsService,
    private readonly loadProductService: LoadingProductService,
  ) {}

  public returnChange(): string {
    /**
     * Loading coins, Loading Product, Topping up balance - all happen inside
     * return change method
     *
     * 1) In a way, if the buyer loads coins, the machine needs to count the balance,
     * so that has to be an action that precedes loading product
     * (assuming first action must be topping up the balance)
     *
     * 2) Then the buyer chooses the product which then needs to load it (find it and prepare for purchase)
     *
     * 3) Only then does the change returning algorithm needs to execute
     */
    const coins: Coin[] = this.loadCoinsService.getLoadedCoins();
    const product: ProductBase = this.loadProductService.getLoadedProduct();
    this.balanceService.topUp(coins);

    this.balanceMustBeEqualOrHigherThanProductPrice(product.getPrice());

    return this.calculateChange(product.getPrice());
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
