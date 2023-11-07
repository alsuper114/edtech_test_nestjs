import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { LessonsService } from 'src/lessons/lessons.service';
import { Quize } from 'src/quizes/entities/quize.entity';
import { UserQuizeScore } from 'src/user-quize-score/entity/user-quize-score.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @Inject(LessonsService)
    private readonly lessonService: LessonsService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserQuizeScore)
    private readonly userQuizeScoreRepo: Repository<UserQuizeScore>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  public async getReport(userId: number): Promise<any> {
    const redisResult = await this.cacheManager.get(
      `GET: /api/v1/report/${userId}`,
    );

    if (redisResult) {
      return redisResult;
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: ['lessonUserNotes'],
    });

    if (!user) {
      throw new NotFoundException(`User for ${userId} doesn't exist.`);
    }

    const lessons = {};

    user.lessonUserNotes.forEach((luNote) => {
      lessons[luNote.lessonId] = {
        note: [],
      };
    });

    await Promise.all(
      Object.keys(lessons).map(async (lessonId) => {
        let quizes = (
          await this.lessonService.getQuizesByLessonId(Number(lessonId))
        ).quizes;
        quizes = await Promise.all(
          quizes.map(async (quiz: Quize) => {
            let score = 0;
            const userScore = await this.userQuizeScoreRepo.findOne({
              where: {
                userId,
                quizeId: quiz.id,
              },
            });
            if (userScore) {
              score = userScore.userScore;
            }
            return Object.assign(quiz, { userScore: score });
          }),
        );

        lessons[lessonId]['quizes'] = quizes;
      }),
    );

    user.lessonUserNotes.forEach((luNote) => {
      lessons[luNote.lessonId].note.push({
        content: luNote.note,
        position: luNote.position,
      });
    });

    await this.cacheManager.set(
      `GET: /api/v1/report/${userId}`,
      lessons,
      10000,
    );
    return lessons;
  }
}
