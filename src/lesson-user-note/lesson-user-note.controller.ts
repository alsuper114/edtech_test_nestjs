import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import {
  CreateLessonUserNoteDto,
  UpdateLessonUserNoteDto,
} from './dto/create-lesson-user-note.dto';
import { LessonUserNote } from './entities/lesson-user-note.entity';
import { LessonUserNoteService } from './lesson-user-note.service';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Notes for users and lessons')
@Controller({ path: 'notes', version: '1' })
export class LessonUserNoteController {
  constructor(private readonly lessonUserNoteService: LessonUserNoteService) {}

  @Post('/:lessonId/:userId')
  @HttpCode(HttpStatus.OK)
  async addNote(
    @Param('lessonId') lessonId: number,
    @Param('userId') userId: number,
    @Body() note: CreateLessonUserNoteDto,
  ): Promise<LessonUserNote> {
    return await this.lessonUserNoteService.addNote(userId, lessonId, note);
  }

  @Put('/:lessonId/:userId')
  @HttpCode(HttpStatus.OK)
  async updateNote(
    @Param('lessonId') lessonId: number,
    @Param('userId') userId: number,
    @Body() note: UpdateLessonUserNoteDto,
  ): Promise<LessonUserNote> {
    return await this.lessonUserNoteService.updateNote(userId, lessonId, note);
  }

  @Get('/:lessonId/:userId')
  @HttpCode(HttpStatus.OK)
  async getNotes(
    @Param('lessonId') lessonId: number,
    @Param('userId') userId: number,
  ): Promise<LessonUserNote[]> {
    return await this.lessonUserNoteService.getNotes(userId, lessonId);
  }
}
