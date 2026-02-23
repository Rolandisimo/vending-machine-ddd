import { Module } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { VendingMachine } from './vending-machine.entity';
import { ChangeService } from './services/change.service';
import { BalanceService } from './services/balance.service';
import { ProductService } from './services/product.service';

@Module({
  controllers: [],
  providers: [
    VendingMachine,
    CoinsService,
    ProductService,
    ChangeService,
    BalanceService,
  ],
  exports: [VendingMachine],
})
export class VendingMachineModule {}
