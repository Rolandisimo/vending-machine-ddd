import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { ProductName } from './product/product.model';
import { InsufficientBalanceError } from './errors/insufficient-balance.error';
import { ProductNotFoundError } from './errors/product-not-found.error';
import { BuyProductDto } from './vending-machine/dto/buy-product.dto';

describe('AppController Unit Tests', () => {
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
    let dto: BuyProductDto;
    beforeEach(() => {
      dto = new BuyProductDto();
    });

    it('should buy Product A with an incorrect coin', () => {
      dto.productName = ProductName.A;
      dto.coins = '50 20 22 5 1 5 2 1 20';

      expect(appController.buy(dto)).toBe('5 2 2');
    });

    it('should buy Product A with a big surplus', () => {
      dto.productName = ProductName.A;
      dto.coins = '50 50 50 50 10';

      expect(appController.buy(dto)).toBe('50 50 10 5');
    });

    it('should not be able to buy a non existing product', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dto.productName = 'Random Product' as any;
      dto.coins = '50 50 50 50 10';

      expect(() => appController.buy(dto)).toThrow(ProductNotFoundError);
    });

    it('should not be able to buy Product A with insufficient balance', () => {
      dto.productName = ProductName.A;
      dto.coins = '50';

      expect(() => appController.buy(dto)).toThrow(InsufficientBalanceError);
    });

    it('should buy Product B', () => {
      dto.productName = ProductName.B;
      dto.coins = '1 2 5 1 1 2 50 50 50 50 10';

      expect(appController.buy(dto)).toBe('50 20 20 5 1');
    });

    it('should buy Product C with no change', () => {
      dto.productName = ProductName.C;
      dto.coins = '50 50 50 50 10 20 1 1 1';

      expect(appController.buy(dto)).toBe('');
    });

    it('should buy Product C with minimal change', () => {
      dto.productName = ProductName.C;
      dto.coins = '50 50 50 50 10 20 1 1 2 2';

      expect(appController.buy(dto)).toBe('2 1');
    });
  });
});
