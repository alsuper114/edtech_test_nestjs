import { Lesson } from "src/lessons/entities/lesson.entity";
import { Quize } from "src/quizes/entities/quize.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LessonUserNote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lessonId: number;

    @Column()
    userId: number;

    @Column()
    note: string;

    @Column()
    position: number;

    @ManyToOne(() => Lesson, (lesson) => lesson.lessonUserNotes)
    lesson: Lesson

    @ManyToOne(() => User, (user) => user.lessonUserNotes)
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}