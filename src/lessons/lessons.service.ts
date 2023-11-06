import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonRepo.create({
      chapter: createLessonDto.chapter,
      section: createLessonDto.section,
      title: createLessonDto.title,
      videoLink: createLessonDto.videoLink,
    });

    return await lesson.save();
  }

  async getAll(): Promise<Lesson[]> {
    return await this.lessonRepo.find({});
  }

  async getOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (lesson) {
      return lesson;
    } else {
      throw new NotFoundException(`Lesson for ${id} is not found.`);
    }
  }

  async updateOne(id: number, payload: UpdateLessonDto): Promise<Lesson> {
    let lesson = await this.lessonRepo.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Lesson for ${id} is not found.`);
    }
    lesson = Object.assign(lesson, { ...payload });
    return await this.lessonRepo.save(lesson);
  }

  async deleteOne(id: number): Promise<{ isDeleted: boolean }> {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException(`Lesson for ${id} does not exist`);
    }

    await this.lessonRepo.softDelete(lesson.id);

    return { isDeleted: true };
  }

  async getQuizesByLessonId(lessonId: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: ['quizes'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson for ${lessonId} doesn't exist`);
    }

    return lesson;
  }
}
