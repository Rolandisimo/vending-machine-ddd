export abstract class Money {
  constructor(public value: number) {
    if (value < 0) {
      throw new Error('A money value object can not be negative');
    }

    this.value = value;
  }
}
