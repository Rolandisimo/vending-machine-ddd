export class ProductNotFoundError extends Error {
  constructor(productName: string) {
    super(`Product ${productName} is not available`); // Call the constructor of the base class `Error`
    this.name = `Product Not Found`;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}
