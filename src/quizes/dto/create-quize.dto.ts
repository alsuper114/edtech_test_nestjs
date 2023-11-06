import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuizeDto {
    @ApiProperty({ example: 'QUESTION' })
    @IsNotEmpty()
    question: string;

    @ApiProperty({ example: '["1. SubQuestion1", "2. SubQuestion2", "3. SubQuestion3"]' })
    @IsNotEmpty()
    subQuestion: string;

    @ApiProperty({ example: "1,3" })
    @IsNotEmpty()
    answer: string;

    @ApiProperty({example: 2})
    @IsNotEmpty()
    score: number;

    @ApiProperty({example: 1})
    @IsNotEmpty()
    lessonId: number;
}
