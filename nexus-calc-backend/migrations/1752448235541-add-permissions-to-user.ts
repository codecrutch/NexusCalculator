import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionsToUser1752448235541 implements MigrationInterface {
  name = 'AddPermissionsToUser1752448235541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "encrypted_password" character varying NOT NULL, "name" character varying NOT NULL, "discriminator" character varying NOT NULL, "reset_password_token" character varying, "reset_password_sent_at" TIMESTAMP, "remember_created_at" TIMESTAMP, "sign_in_count" integer NOT NULL DEFAULT '0', "current_sign_in_at" TIMESTAMP, "last_sign_in_at" TIMESTAMP, "current_sign_in_ip" character varying, "last_sign_in_ip" character varying, "confirmation_token" character varying, "confirmed_at" TIMESTAMP, "confirmation_sent_at" TIMESTAMP, "unconfirmed_email" character varying, "permissions" text NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1eb5b48be9c3a38cef9fb23f94" ON "users" ("name", "discriminator") `,
    );
    await queryRunner.query(
      `CREATE TABLE "characters" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "subpath" character varying, "name" character varying NOT NULL, "vita" integer NOT NULL, "mana" integer NOT NULL, "might" integer NOT NULL, "will" integer NOT NULL, "grace" integer NOT NULL, "alignment" character varying NOT NULL, "title" character varying, "clan" character varying, "clantitle" character varying, "imagelocation" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "caves" ("id" SERIAL NOT NULL, "cavename" character varying NOT NULL, "requirements" character varying, "coordinates" character varying, "boss" character varying, "drops" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_94898aade19a6b4a68ac23d2d5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "creatures" ("id" SERIAL NOT NULL, "creaturename" character varying NOT NULL, "vita" integer NOT NULL, "ac" integer NOT NULL, "imagelocation" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "caveId" integer, CONSTRAINT "PK_8cb042c5f12e3a089b0aad287f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "creatures" ADD CONSTRAINT "FK_3995886d2bc087ee00a8f1f82ac" FOREIGN KEY ("caveId") REFERENCES "caves"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creatures" DROP CONSTRAINT "FK_3995886d2bc087ee00a8f1f82ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_7c1bf02092d401b55ecc243ef1f"`,
    );
    await queryRunner.query(`DROP TABLE "creatures"`);
    await queryRunner.query(`DROP TABLE "caves"`);
    await queryRunner.query(`DROP TABLE "characters"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1eb5b48be9c3a38cef9fb23f94"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
