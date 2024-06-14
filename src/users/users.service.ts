import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(newUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      newUser.password,
      this.configService.get<number>('ROUNDS_OF_HASHING'),
    );

    newUser.password = hashedPassword;

    return this.prisma.user.create({
      data: newUser,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userToUpdate: UpdateUserDto) {
    if (userToUpdate.password) {
      userToUpdate.password = await bcrypt.hash(
        userToUpdate.password,
        this.configService.get<number>('ROUNDS_OF_HASHING'),
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: userToUpdate,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
