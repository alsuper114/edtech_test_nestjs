import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { AddLessonDto } from './dto/add-lesson.dto';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsService } from 'src/lessons/lessons.service';
import { LessonUserNote } from 'src/lesson-user-note/entities/lesson-user-note.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
  ) { }

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FindOptionsWhere<User> = {};
    if (filterOptions?.roles?.length) {
      where.role = filterOptions.roles.map((role) => ({
        id: role.id,
      }));
    }

    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {

    return this.usersRepository.findOne({
      where: fields,
    });
  }

  async update(id: User['id'], payload: DeepPartial<User>): Promise<User> {

    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User for ${id} does not exist.`);
    }

    return this.usersRepository.save({
      ...user,
      ...payload,
    });
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
