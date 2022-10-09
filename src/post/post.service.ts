import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Delete } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(data) {
    return await this.prisma.post.create({ data: data });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
