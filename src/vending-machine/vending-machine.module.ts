import { Module } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { VendingMachine } from './vending-machine.entity';
import { ChangeService } from './services/change.service';
import { BalanceService } from './services/balance.service';
import { ProductService } from '../product/product.service';
import { ProductsModule } from '../product/products.module';

@Module({
  controllers: [],
  providers: [
    VendingMachine,
    CoinsService,
    ProductService,
    ChangeService,
    BalanceService,
  ],
  imports: [ProductsModule],
  exports: [VendingMachine],
})
export class VendingMachineModule {}
