import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VendingMachineModule } from './vending-machine/vending-machine.module';

@Module({
  imports: [VendingMachineModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
