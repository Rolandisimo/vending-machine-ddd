import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientBalanceError extends HttpException {
  constructor(balance: number, productPrice: number) {
    super(
      `The balance is insufficient to buy this product. Your balance is ${balance} but and product price is ${productPrice}`,
      HttpStatus.BAD_REQUEST,
    ); // Call the constructor of the base class `Error`
    this.name = 'Insufficient Balance';
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, InsufficientBalanceError.prototype);
  }
}
