export enum ProductName {
  A = 'A',
  B = 'B',
  C = 'C',
}

export interface ProductType {
  getId: () => string;
  getPrice: () => number;
  getName: () => ProductName;
}
