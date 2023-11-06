import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsModule } from 'src/lessons/lessons.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserQuizeScore } from 'src/user-quize-score/entity/user-quize-score.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lesson, UserQuizeScore]),
    UsersModule,
    LessonsModule,
    CacheModule.registerAsync({
      isGlobal: false,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AllConfigType>) =>
        ({
          store: await redisStore({
            socket: {
              host: configService.getOrThrow('redis.redisHost', {
                infer: true,
              }),
              port: configService.getOrThrow('redis.redisPort', {
                infer: true,
              }),
            },
          }),
        }) as any,
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
