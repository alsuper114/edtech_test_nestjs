import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuizeScore } from './entity/user-quize-score.entity';
import { SetScoreDto } from './dto/set-score.dto';
import { UsersService } from 'src/users/users.service';
import { QuizesService } from 'src/quizes/quizes.service';
import { In, Repository } from 'typeorm';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class UserQuizeScoreService {
  constructor(
    @InjectRepository(UserQuizeScore)
    private readonly userQuizeScoreRepository: Repository<UserQuizeScore>,
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(QuizesService)
    private readonly quizeService: QuizesService,
    @Inject(LessonsService)
    private readonly lessonService: LessonsService,
  ) {}

  public async setScore(payload: SetScoreDto): Promise<UserQuizeScore> {
    const user = await this.userService.findOne({ id: payload.userId });

    if (!user) {
      throw new NotFoundException(`User for ${payload.userId} doesn't exist`);
    }

    const quiz = await this.quizeService.getQuizeById(payload.quizeId);

    if (!quiz) {
      throw new NotFoundException(`Quiz for ${payload.quizeId} doesn't exist`);
    }

    let score = 0;
    if (quiz.answer === payload.userAnswer) {
      score = quiz.score;
    }

    const obj = this.userQuizeScoreRepository.create({
      quize: quiz,
      user: user,
      userScore: score,
    });

    return await this.userQuizeScoreRepository.save(obj);
  }

  public async getScores(userId: number, lessonId: number): Promise<any[]> {
    const quizes = (await this.lessonService.getQuizesByLessonId(lessonId))
      .quizes;

    const quizeIdList = quizes.map((quiz) => {
      return quiz.id;
    });

    const scores = await this.userQuizeScoreRepository.find({
      where: {
        userId,
        quizeId: In(quizeIdList),
      },
    });

    return scores;
  }
}
