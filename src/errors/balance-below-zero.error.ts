export class BalanceCantBeBelowZero extends Error {
  constructor() {
    super(`The balance can't be below 0`); // Call the constructor of the base class `Error`
    this.name = `Balance Can't Be Below 0`;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, BalanceCantBeBelowZero.prototype);
  }
}
