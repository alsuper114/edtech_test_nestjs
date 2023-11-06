import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Quize } from 'src/quizes/entities/quize.entity';
import { QuizesModule } from 'src/quizes/quizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Quize]),
    forwardRef(() => QuizesModule),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
