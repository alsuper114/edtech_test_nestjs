import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    answer: number;

    @Column()
    score: number;
}