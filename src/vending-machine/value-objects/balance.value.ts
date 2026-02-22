import { BalanceCantBeBelowZero } from '../../errors/balance-below-zero.error';

export class Balance {
  private readonly value: number;
  constructor(value: number) {
    if (value < 0) {
      throw new BalanceCantBeBelowZero();
    }
    this.value = value;
  }

  public add(value: number) {
    return new Balance(this.value + value);
  }

  public subtract(value: number) {
    return new Balance(this.value - value);
  }

  public getValue(): number {
    return this.value;
  }
}
