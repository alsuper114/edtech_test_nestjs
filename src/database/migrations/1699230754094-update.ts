import { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1699230754094 implements MigrationInterface {
  name = 'Update1699230754094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lesson_user_note" ("id" SERIAL NOT NULL, "lessonId" integer NOT NULL, "userId" integer NOT NULL, "note" character varying NOT NULL, "position" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_06da0cfc1d003e8287ebd2e4636" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_user_note" ADD CONSTRAINT "FK_b8a5e6d9755dcf9b20741b65ffa" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_user_note" ADD CONSTRAINT "FK_6cfdde50166eb2ad4f650e2d7f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_user_note" DROP CONSTRAINT "FK_6cfdde50166eb2ad4f650e2d7f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_user_note" DROP CONSTRAINT "FK_b8a5e6d9755dcf9b20741b65ffa"`,
    );
    await queryRunner.query(`DROP TABLE "lesson_user_note"`);
  }
}
