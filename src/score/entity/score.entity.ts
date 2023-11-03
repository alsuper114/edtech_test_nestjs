import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;
}