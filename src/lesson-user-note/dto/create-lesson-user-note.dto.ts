import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonUserNoteDto {
  @ApiProperty({ example: 'Chapter1-Section1-User1-Note1' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 12930232 })
  @IsOptional()
  position?: number;
}

export class UpdateLessonUserNoteDto {
  @ApiProperty({ example: 'Chapter1-Section1-User1-Note1' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 12930232 })
  @IsNotEmpty()
  position: number;
}
