import { Controller, Post, Query } from '@nestjs/common';
import { ProductName } from './product/product.model';
import { VendingMachine } from './vending-machine/vending-machine.entity';

@Controller()
export class AppController {
  constructor(private readonly vendingMachine: VendingMachine) {}

  @Post('buy')
  buy(
    @Query('productName') productName: ProductName,
    @Query('coins') coins: string,
  ): string {
    return this.vendingMachine.buy(productName, coins);
  }
}
