import { Body, Controller, Post } from '@nestjs/common';
import { BuyProductDto } from './vending-machine/dto/buy-product.dto';
import { VendingMachine } from './vending-machine/vending-machine.entity';

@Controller()
export class AppController {
  constructor(private readonly vendingMachine: VendingMachine) {}

  @Post('buy')
  buy(@Body() buyProductDto: BuyProductDto): string {
    return this.vendingMachine.buy(
      buyProductDto.productName,
      buyProductDto.coins,
    );
  }
}
