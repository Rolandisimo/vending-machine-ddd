import { Injectable } from '@nestjs/common';
import { ProductName } from '../../product/product.model';
import {
  ProductA,
  ProductB,
  ProductBase,
  ProductC,
} from '../../product/products';
import { ProductNotFoundError } from '../../errors/product-not-found.error';

@Injectable()
export class ProductService {
  private loadedProduct: ProductBase;

  public prepareProductForPurchase(productName: ProductName): void {
    const foundProduct = this.findProduct(productName);
    this.loadedProduct = foundProduct;
  }

  public getLoadedProduct(): ProductBase {
    return this.loadedProduct;
  }

  public getProductPrice(): number {
    return this.loadedProduct.getPrice();
  }

  // Assuming retrieval from DB
  private findProduct(productName: ProductName): ProductBase {
    const allProducts = [new ProductA(), new ProductB(), new ProductC()];
    const foundProduct = allProducts.find(
      (product) => product.getName() === productName,
    );

    if (!foundProduct) {
      throw new ProductNotFoundError(productName);
    }

    return foundProduct;
  }
}
