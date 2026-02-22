import { Injectable } from '@nestjs/common';
import { ProductName } from '../../product/product.model';
import {
  ProductA,
  ProductB,
  ProductBase,
  ProductC,
} from '../../product/products';

@Injectable()
export class LoadingProductService {
  private loadedProduct: ProductBase | null; // NEEDS TO BE the interface
  public loadProduct(productName: ProductName) {
    const foundProduct = this.findProduct(productName);
    this.loadedProduct = foundProduct;
  }
  public getLoadedProduct(): ProductBase | null {
    return this.loadedProduct;
  }

  // Assuming retrieval from DB
  private findProduct(productName: ProductName): ProductBase | null {
    const allProducts = [new ProductA(), new ProductB(), new ProductC()];
    const foundProduct = allProducts.find(
      (product) => product.getName() === productName,
    );

    if (!foundProduct) {
      console.warn(`Product ${productName} is not available`);
      return null;
    }

    return foundProduct;
  }
}
