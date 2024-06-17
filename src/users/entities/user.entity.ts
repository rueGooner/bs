import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyAddress: string;

  @ApiProperty()
  phoneNumber: string;

  @Exclude()
  password: string;
}
