import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddQuizeDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quizeId: number;
}
