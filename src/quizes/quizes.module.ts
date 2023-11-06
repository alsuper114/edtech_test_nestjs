import { Module, forwardRef } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quize } from './entities/quize.entity';
import { QuizesController } from './quizes.controller';
import { LessonsModule } from 'src/lessons/lessons.module';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quize, Lesson]), forwardRef(() => LessonsModule)],
  controllers: [QuizesController],
  providers: [QuizesService],
  exports: [QuizesService]
})
export class QuizesModule {}
