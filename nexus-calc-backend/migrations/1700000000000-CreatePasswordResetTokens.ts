import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePasswordResetTokens1700000000000
  implements MigrationInterface
{
  name = 'CreatePasswordResetTokens1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "password_reset_tokens" (
                "id" SERIAL NOT NULL,
                "token" character varying NOT NULL,
                "userId" integer NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_password_reset_tokens_token" UNIQUE ("token"),
                CONSTRAINT "PK_password_reset_tokens" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            ALTER TABLE "password_reset_tokens" 
            ADD CONSTRAINT "FK_password_reset_tokens_user" 
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "FK_password_reset_tokens_user"`,
    );
    await queryRunner.query(`DROP TABLE "password_reset_tokens"`);
  }
}
