import { Module } from '@nestjs/common';
import { LoadingCoinsService } from './services/loading-coins.service';
import { LoadingProductService } from './services/loading-product.service';
import { VendingMachine } from './vending-machine.entity';
import { ChangeService } from './services/change.service';

@Module({
  controllers: [],
  providers: [
    VendingMachine,
    LoadingCoinsService,
    LoadingProductService,
    ChangeService,
  ],
  exports: [VendingMachine],
})
export class VendingMachineModule {}
