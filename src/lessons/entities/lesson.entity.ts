import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { EntityHelper } from 'src/utils/entity-helper';
  import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { LessonUserNote } from 'src/lesson-user-note/entities/lesson-user-note.entity';
import { Quize } from 'src/quizes/entities/quize.entity';
  
  @Entity()
  export class Lesson extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false})
    chapter: number;
  
    @Column({ nullable: false })
    section: number;
  
    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    videoLink: string;

    @OneToMany(() => LessonUserNote, lessonUserNote => lessonUserNote.lesson)
    lessonUserNotes: LessonUserNote[];

    @OneToMany(() => Quize, quize => quize.lesson)
    quizes: Quize[]
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  