import { Injectable } from '@nestjs/common';
import { Coin } from '../coin/coin.value';
import { CoinsService } from '../coin/coins.service';
import { ProductName } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { ChangeService } from './services/change.service';
import { Balance } from './value-objects/balance.value';

@Injectable()
export class VendingMachine {
  private balance = new Balance(0);

  constructor(
    private readonly coinsService: CoinsService,
    private readonly productService: ProductService,
    private readonly changeService: ChangeService,
  ) {}

  public buy(productName: ProductName, coins: string): string {
    this.topUpBalance(this.coinsService.getCoins(coins));

    const returnedChange = this.changeService.returnChange(
      this.balance,
      this.productService.getProductPrice(productName),
    );

    this.resetBalance();

    return returnedChange;
  }

  private topUpBalance(coins: Coin[]): void {
    let finalValue = 0;
    coins.forEach((coin) => {
      finalValue += coin.value;
    });

    this.balance = this.balance.add(finalValue);
  }

  private resetBalance(): void {
    this.balance = new Balance(0);
  }
}
