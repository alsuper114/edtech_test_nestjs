import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1699242674459 implements MigrationInterface {
    name = 'Update1699242674459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_quize_score" ("id" SERIAL NOT NULL, "quizeId" integer NOT NULL, "userId" integer NOT NULL, "userScore" integer NOT NULL, CONSTRAINT "PK_e07495cb7b6f02d973e7bc0d3d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quize" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "subQuesions" character varying NOT NULL, "answer" character varying NOT NULL, "score" integer NOT NULL, "lessonId" integer, CONSTRAINT "PK_eec15ab7d0829ecc321aa0a0726" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_quize_score" ADD CONSTRAINT "FK_2014a7d082ab9d18bc5ca9fd17c" FOREIGN KEY ("quizeId") REFERENCES "quize"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quize_score" ADD CONSTRAINT "FK_583a3935375f97782a3e782c027" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quize" ADD CONSTRAINT "FK_431bd00c567f1fc49411c4f68b1" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quize" DROP CONSTRAINT "FK_431bd00c567f1fc49411c4f68b1"`);
        await queryRunner.query(`ALTER TABLE "user_quize_score" DROP CONSTRAINT "FK_583a3935375f97782a3e782c027"`);
        await queryRunner.query(`ALTER TABLE "user_quize_score" DROP CONSTRAINT "FK_2014a7d082ab9d18bc5ca9fd17c"`);
        await queryRunner.query(`DROP TABLE "quize"`);
        await queryRunner.query(`DROP TABLE "user_quize_score"`);
    }

}
