import { Module } from '@nestjs/common';
import { UserQuizeScoreService } from './user-quize-score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuizeScore } from './entity/user-quize-score.entity';
import { UsersModule } from 'src/users/users.module';
import { QuizesModule } from 'src/quizes/quizes.module';
import { UserQuizeScoreController } from './user-quize-score.controller';
import { LessonsModule } from 'src/lessons/lessons.module';
import { Quize } from 'src/quizes/entities/quize.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserQuizeScore, Quize, Lesson]),
    UsersModule,
    QuizesModule,
    LessonsModule,
  ],
  controllers: [UserQuizeScoreController],
  providers: [UserQuizeScoreService],
  exports: [UserQuizeScoreService],
})
export class UserQuizeScoreModule {}
