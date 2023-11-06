import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  chapter: number;

  @ApiProperty({example: 1})
  @IsNotEmpty()
  section: number;

  @ApiProperty({example: 'Chapter1-Section1'})
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://example.com/testfile.mp4' })
  @IsOptional()
  videoLink?: string;
}
