import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  body: string;
  userId: number;
}
