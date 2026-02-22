import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundError extends HttpException {
  constructor(productName: string) {
    super(`Product ${productName} is not available`, HttpStatus.NOT_FOUND); // Call the constructor of the base class `Error`
    this.name = `Product Not Found`;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}
