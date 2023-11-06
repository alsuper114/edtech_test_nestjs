import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddQuizeDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quizeId: number;
}
