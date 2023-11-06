import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetScoreDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quizeId: number;

  @ApiProperty({ example: '1,3' })
  @IsNotEmpty()
  userAnswer: string;
}
