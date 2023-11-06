import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { LessonUserNoteController } from './lesson-user-note.controller';
import { LessonUserNoteService } from './lesson-user-note.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { UsersService } from 'src/users/users.service';
import { LessonUserNote } from './entities/lesson-user-note.entity';
import { LessonsModule } from 'src/lessons/lessons.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, User, LessonUserNote]), LessonsModule, UsersModule],
    controllers: [LessonUserNoteController],
    providers: [LessonUserNoteService],
    exports: [LessonUserNoteService]
})
export class LessonUserNoteModule {}
