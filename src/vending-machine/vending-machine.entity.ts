import { Injectable } from '@nestjs/common';
import { ProductName } from '../product/product.model';
import { ChangeService } from './services/change.service';
import { CoinsService } from './services/coins.service';
import { ProductService } from './services/product.service';
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
    // Loading coins could be hidden as well into the loadingCoinsService?
    this.coinsService.loadCoins(coins);

    this.balanceService.topUp(this.coinsService.getLoadedCoins());

    // implicit relationship. Has to happen before change can be given
    // does this need to be enforced somehow differently?
    this.productService.prepareProductForPurchase(productName);

    return this.changeService.returnChange(
      this.productService.getProductPrice(),
    );
  }
}
