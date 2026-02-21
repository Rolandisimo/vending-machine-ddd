import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { ProductName } from './product/product.model';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [VendingMachineModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should buy Product A', () => {
      expect(appController.buy(ProductName.A, '50 20 22 5 1 5 2 2 20')).toBe(
        '5 2 2',
      );
    });
  });
});
