import {MigrationInterface, QueryRunner} from "typeorm";

export class removeTeacherIdFromCourse1645519286941 implements MigrationInterface {
    name = 'removeTeacherIdFromCourse1645519286941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "teacherId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "teacherId" integer NOT NULL`);
    }

}
