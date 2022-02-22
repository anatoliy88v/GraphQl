import {MigrationInterface, QueryRunner} from "typeorm";

export class addCourseTeacherTopicTables1644397626555 implements MigrationInterface {
    name = 'addCourseTeacherTopicTables1644397626555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "avatar" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "teacherId" integer NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "courseId" integer`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_4665a054ff9af226fecb57f59b9" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_cc209f6f951f94af47acf75485b" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_660cced3eb3232d317a712dd001" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_660cced3eb3232d317a712dd001"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_cc209f6f951f94af47acf75485b"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_4665a054ff9af226fecb57f59b9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "courseId"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}
