import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCloudinaryUrlToUser1700000000001 implements MigrationInterface {
    name = 'AddCloudinaryUrlToUser1700000000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new profilePictureUrl column
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profilePictureUrl\` varchar(255) NULL`);
        
        // Note: We're not dropping the old columns yet to allow for rollback
        // In production, you might want to migrate existing data first
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the profilePictureUrl column
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profilePictureUrl\``);
    }
}
