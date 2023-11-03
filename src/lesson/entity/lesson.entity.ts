import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chapter: number;

    @Column()
    section: number;

    @Column()
    title: string;
}