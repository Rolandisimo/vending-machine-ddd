import { v4 as uuidv4 } from 'uuid';
import { ProductName } from './product.model';

export abstract class ProductBase {
  private id: string;
  // where to put the policy that product price can't be negative?
  protected abstract price: number;
  protected abstract name: ProductName;
  constructor() {
    this.id = uuidv4();
  }

  public getId(): string {
    return this.id;
  }

  public getPrice(): number {
    return this.price;
  }

  public getName(): ProductName {
    return this.name;
  }
}

export class ProductA extends ProductBase {
  public name: typeof ProductName.A = ProductName.A;
  // should be PriceValueObject?
  protected price: number = 95;
}

export class ProductB extends ProductBase {
  public name: typeof ProductName.B = ProductName.B;
  // should be PriceValueObject?
  protected price: number = 126;
}

export class ProductC extends ProductBase {
  public name: typeof ProductName.C = ProductName.C;
  // should be PriceValueObject?
  protected price: number = 233;
}
