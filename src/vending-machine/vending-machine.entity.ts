import { Injectable } from '@nestjs/common';
import { ProductName } from '../product/product.model';
import { ChangeService } from './services/change.service';
import { CoinsService } from './services/coins.service';
import { ProductService } from '../product/product.service';
import { BalanceService } from './services/balance.service';

@Injectable()
export class VendingMachine {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly productService: ProductService,
    private readonly changeService: ChangeService,
    private readonly balanceService: BalanceService,
  ) {}

  public buy(productName: ProductName, coins: string): string {
    this.balanceService.topUp(this.coinsService.getCoins(coins));

    return this.changeService.returnChange(
      this.productService.getProductPrice(productName),
    );
  }
}
