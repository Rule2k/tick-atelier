<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190201083933 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        // $this->addSql('DROP TABLE promotion_speciality');
        // $this->addSql('ALTER TABLE speciality ADD promotion_id INT NOT NULL');
        // $this->addSql('ALTER TABLE speciality ADD CONSTRAINT FK_F3D7A08E139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        // $this->addSql('CREATE INDEX IDX_F3D7A08E139DF194 ON speciality (promotion_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        // $this->addSql('CREATE TABLE promotion_speciality (promotion_id INT NOT NULL, speciality_id INT NOT NULL, INDEX IDX_B6798B2A3B5A08D7 (speciality_id), INDEX IDX_B6798B2A139DF194 (promotion_id), PRIMARY KEY(promotion_id, speciality_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        // $this->addSql('ALTER TABLE promotion_speciality ADD CONSTRAINT FK_B6798B2A139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE promotion_speciality ADD CONSTRAINT FK_B6798B2A3B5A08D7 FOREIGN KEY (speciality_id) REFERENCES speciality (id) ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE speciality DROP FOREIGN KEY FK_F3D7A08E139DF194');
        // $this->addSql('DROP INDEX IDX_F3D7A08E139DF194 ON speciality');
        // $this->addSql('ALTER TABLE speciality DROP promotion_id');
    }
}
