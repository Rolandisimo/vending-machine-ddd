import { Injectable } from '@nestjs/common';
import { ProductA, ProductB, ProductBase, ProductC } from './products';
import { ProductName } from './product.model';
import { ProductNotFoundError } from '../errors/product-not-found.error';

@Injectable()
export class ProductRepository {
  // Assuming retrieval from DB
  public findProduct(productName: ProductName): ProductBase {
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
