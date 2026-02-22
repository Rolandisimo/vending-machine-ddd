import { ProductName } from './product.model';

export abstract class ProductBase {
  private id: string;
  // Price needs to be a value object
  private price: number;

  // Name needs to be a value object
  private name: ProductName;

  constructor(name: ProductName, price: number) {
    this.id = Date.now().toString() + Math.random();
    this.setPrice(price);
    this.setName(name);
  }

  public getId(): string {
    return this.id;
  }

  public getPrice(): number {
    return this.price;
  }

  protected setPrice(price: number): void {
    this.price = price;
  }

  public getName(): ProductName {
    return this.name;
  }

  private setName(name: ProductName) {
    this.name = name;
  }
}

export class ProductA extends ProductBase {
  constructor() {
    super(ProductName.A, 95);
  }
}

export class ProductB extends ProductBase {
  constructor() {
    super(ProductName.B, 126);
  }
}

export class ProductC extends ProductBase {
  constructor() {
    super(ProductName.C, 233);
  }
}
