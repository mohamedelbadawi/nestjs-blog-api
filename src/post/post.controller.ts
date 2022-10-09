import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createPostDto: CreatePostDto) {
    const data = {
      userId: user.id,
      title: createPostDto.title,
      body: createPostDto.body,
      categoryId: createPostDto.categoryId,
    };
    return this.postService.create(data);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
