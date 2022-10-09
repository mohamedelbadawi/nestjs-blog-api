import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon.hash(createUserDto.password);
    const data = {
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    };
    const user = await this.prisma.user.create({ data: data });
    delete user.password;
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
