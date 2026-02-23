import { Injectable } from '@nestjs/common';
import { Coin } from '../../coin/coin.value';
import { Balance } from '../value-objects/balance.value';

@Injectable()
export class BalanceService {
  private balance: Balance = new Balance(0);

  public topUp(coins: Coin[]): void {
    coins.forEach((coin) => {
      this.balance = this.balance.add(coin.value);
    });
  }

  public subtract(amount: number): void {
    this.balance = this.balance.subtract(amount);
  }

  public getBalance(): number {
    return this.balance.getValue();
  }

  public isLessThan(value: number): boolean {
    return this.getBalance() < value;
  }

  public isMoreThan(value: number): boolean {
    return this.balance.getValue() > value;
  }
}
