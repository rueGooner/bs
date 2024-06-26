import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
