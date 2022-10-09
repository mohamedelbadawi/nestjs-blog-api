import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
