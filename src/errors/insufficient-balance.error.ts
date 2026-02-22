export class InsufficientBalanceError extends Error {
  constructor(balance: number, productPrice: number) {
    super(
      `The balance is insufficient to buy this product. Your balance is ${balance} but and product price is ${productPrice}`,
    ); // Call the constructor of the base class `Error`
    this.name = 'Insufficient Balance';
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, InsufficientBalanceError.prototype);
  }
}
