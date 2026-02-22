export class InvalidCoinError extends Error {
  constructor(coinValue: number) {
    super(`The coin you provided - ${coinValue} - is not valid`); // Call the constructor of the base class `Error`
    this.name = `Invalid Coin`;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, InvalidCoinError.prototype);
  }
}
