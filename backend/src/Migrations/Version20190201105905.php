<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190201105905 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        // $this->addSql('ALTER TABLE speciality ADD CONSTRAINT FK_F3D7A08E139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        // $this->addSql('CREATE INDEX IDX_F3D7A08E139DF194 ON speciality (promotion_id)');
        $this->addSql('ALTER TABLE issue ADD active_group VARCHAR(100) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue DROP active_group');
        // $this->addSql('ALTER TABLE speciality DROP FOREIGN KEY FK_F3D7A08E139DF194');
        // $this->addSql('DROP INDEX IDX_F3D7A08E139DF194 ON speciality');
    }
}
