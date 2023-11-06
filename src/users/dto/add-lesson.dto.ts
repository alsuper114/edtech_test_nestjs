import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddLessonDto {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  lessons: number[];
}
