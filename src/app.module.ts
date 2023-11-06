import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import fileConfig from './config/file.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SessionModule } from './session/session.module';
import { SeedModule } from './database/seeds/seed.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonUserNoteModule } from './lesson-user-note/lesson-user-note.module';
import { QuizesModule } from './quizes/quizes.module';
import { UserQuizeScoreModule } from './user-quize-score/user-quize-score.module';
import { ReportModule } from './report/report.module';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, fileConfig, redisConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    SeedModule,
    LessonsModule,
    LessonUserNoteModule,
    QuizesModule,
    UserQuizeScoreModule,
    ReportModule,
  ],
})
export class AppModule {}
