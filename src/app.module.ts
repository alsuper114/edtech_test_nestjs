import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/app.config';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { LessonModule } from './lesson/lesson.module';
import { NoteModule } from './note/note.module';
import { QuizeModule } from './quize/quize.module';
import { ScoreModule } from './score/score.module';
import { User } from './user/entity/user.entity';
import { Lesson } from './lesson/entity/lesson.entity';
import { Video } from './video/entity/video.entity';
import { Note } from './note/entity/note.entity';
import { Quize } from './quize/entity/quize.entity';
import { Score } from './score/entity/score.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
    TypeOrmModule.forFeature([
      User,
      Lesson,
      Video,
      Note,
      Quize,
      Score
    ]),
    UserModule,
    VideoModule,
    LessonModule,
    NoteModule,
    QuizeModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
