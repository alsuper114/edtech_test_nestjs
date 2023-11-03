import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    HH: number;

    @Column()
    MM: number;

    @Column()
    SS: number;

    @Column()
    content: string;
}