import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
import { FileEntity } from './entities/file.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
    lessonId: number,
  ): Promise<FileEntity> {
    const lesson = await this.lessonRepository.findOneBy({
      id: lessonId,
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson for ${lessonId} is not exist!`);
    }

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix', { infer: true })}/v1/${
        file.path
      }`,
      s3: (file as Express.MulterS3.File).location,
    };

    await this.lessonRepository.update(
      { id: lessonId },
      {
        videoLink:
          path[this.configService.getOrThrow('file.driver', { infer: true })],
      },
    );

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path[
          this.configService.getOrThrow('file.driver', { infer: true })
        ],
      }),
    );
  }
}
