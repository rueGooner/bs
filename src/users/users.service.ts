import { Injectable } from '@nestjs/common';
import { CreateAdminDto, CreateClientDto } from './dto/create-user.dto';
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

  async createAdmin(newUser: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(
      newUser.password,
      parseInt(this.configService.get<string>('ROUNDS_OF_HASHING'), 10),
    );

    return this.prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword,
        roleId: 1,
      },
    });
  }

  async createClient(newUser: CreateClientDto) {
    const hashedPassword = await bcrypt.hash(
      newUser.password,
      parseInt(this.configService.get<string>('ROUNDS_OF_HASHING'), 10),
    );

    return this.prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword,
        roleId: 3,
      },
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
        parseInt(this.configService.get<string>('ROUNDS_OF_HASHING'), 10),
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
