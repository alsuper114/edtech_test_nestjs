import {
  Body,
  Controller,
  Delete,
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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Lessons')
@Controller({ path: 'lessons', version: '1' })
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  async getAll(): Promise<Lesson[]> {
    return await this.lessonService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<Lesson> {
    const lesson = await this.lessonService.getOne(id);
    return lesson;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateLesson(
    @Param('id') id: number,
    @Body() payload: UpdateLessonDto,
  ): Promise<Lesson> {
    return await this.lessonService.updateOne(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async DeletePublicAccessBlockCommand(
    @Param('id') id: number,
  ): Promise<{ isDeleted: boolean }> {
    return await this.lessonService.deleteOne(id);
  }

  @Get('/:lessonId/quizes')
  @HttpCode(HttpStatus.OK)
  async getQuizesByLessonId(
    @Param('lessonId') lessonId: number,
  ): Promise<Lesson> {
    return this.lessonService.getQuizesByLessonId(lessonId);
  }
}
