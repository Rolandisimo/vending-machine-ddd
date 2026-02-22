import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCoinError extends HttpException {
  constructor(coinValue: number) {
    super(
      `The coin you provided - ${coinValue} - is not valid`,
      HttpStatus.BAD_REQUEST,
    ); // Call the constructor of the base class `Error`
    this.name = `Invalid Coin`;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, InvalidCoinError.prototype);
  }
}
