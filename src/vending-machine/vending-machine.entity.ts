import { Injectable } from '@nestjs/common';
import { ProductName } from '../product/product.model';
import { ChangeService } from './services/change.service';
import { LoadingCoinsService } from './services/loading-coins.service';
import { LoadingProductService } from './services/loading-product.service';

@Injectable()
export class VendingMachine {
  constructor(
    private readonly loadCoinsService: LoadingCoinsService,
    private readonly loadProductService: LoadingProductService,
    private readonly changeService: ChangeService,
  ) {}

  public buy(productName: ProductName, coins: string): string {
    this.loadCoinsService.loadCoins(coins);
    const loadedCoins = this.loadCoinsService.getLoadedCoins();

    this.loadProductService.loadProduct(productName);
    const loadedProduct = this.loadProductService.getLoadedProduct();

    return this.changeService.returnChange(loadedProduct, loadedCoins);
  }
}
