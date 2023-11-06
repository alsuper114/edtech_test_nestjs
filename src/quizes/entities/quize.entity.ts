import { Lesson } from 'src/lessons/entities/lesson.entity';
import { UserQuizeScore } from 'src/user-quize-score/entity/user-quize-score.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  subQuesions: string;

  @Column()
  answer: string;

  @Column()
  score: number;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @OneToMany(() => UserQuizeScore, (userQuizeScore) => userQuizeScore.quize)
  userQuizeScores: UserQuizeScore[];
}
