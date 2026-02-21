import { Module } from '@nestjs/common';
import { LoadingCoinsService } from './services/loading-coins.service';
import { LoadingProductService } from './services/loading-product.service';
import { VendingMachine } from './vending-machine.entity';

@Module({
  controllers: [],
  providers: [VendingMachine, LoadingCoinsService, LoadingProductService],
  exports: [VendingMachine],
})
export class VendingMachineModule {}
