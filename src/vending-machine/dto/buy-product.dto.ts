import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductName } from '../../product/product.model';

export class BuyProductDto {
  @IsEnum(ProductName, {
    message: (args) =>
      `${args.value} is not a valid product. Choose from: ${Object.values(ProductName).join(', ')}`,
  })
  @IsNotEmpty()
  productName: ProductName;

  @IsString()
  coins: string;
}
