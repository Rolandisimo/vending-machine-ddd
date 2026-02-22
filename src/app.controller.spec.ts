import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { ProductName } from './product/product.model';
import { InsufficientBalanceError } from './errors/insufficient-balance.error';
import { ProductNotFoundError } from './errors/product-not-found.error';

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
    it('should buy Product A with an incorrect coin', () => {
      expect(appController.buy(ProductName.A, '50 20 22 5 1 5 2 1 20')).toBe(
        '5 2 2',
      );
    });

    it('should buy Product A with a big surplus', () => {
      expect(appController.buy(ProductName.A, '50 50 50 50 10')).toBe(
        '50 50 10 5',
      );
    });

    it('should not be able to buy a non existing product', () => {
      expect(() =>
        appController.buy('Random Product' as any, '50 50 50 50 10'),
      ).toThrow(ProductNotFoundError);
    });

    it('should not be able to buy Product A with insufficient balance', () => {
      expect(() => appController.buy(ProductName.A, '50')).toThrow(
        InsufficientBalanceError,
      );
    });

    it('should buy Product B', () => {
      // 222 loaded - price 126 = 96
      expect(
        appController.buy(ProductName.B, '1 2 5 1 1 2 50 50 50 50 10'),
      ).toBe('50 20 20 5 1');
    });

    it('should buy Product C with no change', () => {
      expect(appController.buy(ProductName.C, '50 50 50 50 10 20 1 1 1')).toBe(
        '',
      );
    });

    it('should buy Product C with minimal change', () => {
      expect(
        appController.buy(ProductName.C, '50 50 50 50 10 20 1 1 2 2'),
      ).toBe('2 1');
    });
  });
});
