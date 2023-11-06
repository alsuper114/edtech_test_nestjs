import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quize } from './entities/quize.entity';
import { Repository } from 'typeorm';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class QuizesService {
  constructor(
    @InjectRepository(Quize)
    private quizeRepository: Repository<Quize>,
    @Inject(LessonsService)
    private lessonService: LessonsService,
  ) {}

  public async createQuize(payload: CreateQuizeDto): Promise<Quize> {
    const lesson = await this.lessonService.getOne(payload.lessonId);

    if (!lesson) {
      throw new NotFoundException(
        `Lesson for ${payload.lessonId} doesn't exist!`,
      );
    }

    const quize = this.quizeRepository.create({
      answer: payload.answer,
      question: payload.question,
      score: payload.score,
      subQuesions: payload.subQuestion,
      lesson,
    });

    quize.lesson = lesson;
    return await this.quizeRepository.save(quize);
  }

  public async getQuizeById(id: number): Promise<Quize> {
    const quize = await this.quizeRepository.findOneBy({ id });
    if (!quize) {
      throw new NotFoundException(`Quize for ${id} doesn't exist!`);
    }
    return quize;
  }
}
