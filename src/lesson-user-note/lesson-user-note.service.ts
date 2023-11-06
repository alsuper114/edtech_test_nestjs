import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonUserNoteDto, UpdateLessonUserNoteDto } from './dto/create-lesson-user-note.dto';
import { LessonUserNote } from './entities/lesson-user-note.entity';
import { UsersService } from 'src/users/users.service';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class LessonUserNoteService {
    constructor(
        @InjectRepository(LessonUserNote)
        private lessonUserNoteRepository: Repository<LessonUserNote>,
        @Inject(UsersService)
        private userService: UsersService,
        @Inject(LessonsService)
        private lessonService: LessonsService
    ) { }

    public async addNote(userId: number, lessonId: number, payload: CreateLessonUserNoteDto): Promise<LessonUserNote> {
        const user = await this.userService.findOne({id: userId});

        if(!user) {
            throw new NotFoundException(`User for ${userId} doesn't exist!`);
        }

        const lesson = await this.lessonService.getOne(lessonId);

        if(!lesson) {
            throw new NotFoundException(`Lesson for ${lessonId} doesn't exist!`);
        }

        const luNote = this.lessonUserNoteRepository.create({
            ...lesson,
            ...user,
            lessonId,
            userId,
            note: payload.content,
            position: payload.position
        });

        return await this.lessonUserNoteRepository.save(luNote);
    }

    public async updateNote (userId: number, lessonId: number, payload: UpdateLessonUserNoteDto): Promise<LessonUserNote> {
        const user = await this.userService.findOne({id: userId});

        if(!user) {
            throw new NotFoundException(`User for ${userId} doesn't exist!`);
        }

        const lesson = await this.lessonService.getOne(lessonId);

        if(!lesson) {
            throw new NotFoundException(`Lesson for ${lessonId} doesn't exist!`);
        }

        if(!payload.position) {
            throw new Error(`Postion for that note is required!`);
        }

        const luNote = await this.lessonUserNoteRepository.findOneBy({
            userId,
            lessonId,
            position: payload.position
        });

        if(!luNote) {
            throw new NotFoundException(`Note does not exist!`);
        }

        return await this.lessonUserNoteRepository.save({
            ...luNote,
            note: payload.content
        });
    }

    public async getNotes(userId: number, lessonId: number): Promise<LessonUserNote[]> {
        const notes = await this.lessonUserNoteRepository.find({
            where: {
                lessonId,
                userId
            }
        });

        return notes
    }

}
