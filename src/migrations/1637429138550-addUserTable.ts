import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserTable1637429138550 implements MigrationInterface {
    name = 'addUserTable1637429138550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "salt" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "stripeId" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "state" character varying NOT NULL, "gender" boolean NOT NULL, "birthday" character varying NOT NULL, "age" integer NOT NULL, "favoriteFood" text array NOT NULL, "discount" double precision NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
