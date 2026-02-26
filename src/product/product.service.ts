import { Injectable } from '@nestjs/common';
import { ProductName } from './product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public getProductPrice(productName: ProductName): number {
    return this.productRepository.findProduct(productName).getPrice();
  }
}
