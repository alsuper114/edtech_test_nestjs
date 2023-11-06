import { Quize } from 'src/quizes/entities/quize.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserQuizeScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quizeId: number;

  @Column()
  userId: number;

  @Column()
  userScore: number;

  @ManyToOne(() => Quize, (quize) => quize.userQuizeScores)
  quize: Quize;

  @ManyToOne(() => User, (user) => user.userQuizeScores)
  user: User;
}
