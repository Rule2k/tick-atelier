<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190128094348 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue ADD owner_id INT NOT NULL, ADD assigned_to_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233E7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233EF4BD7827 FOREIGN KEY (assigned_to_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_12AD233E7E3C61F9 ON issue (owner_id)');
        $this->addSql('CREATE INDEX IDX_12AD233EF4BD7827 ON issue (assigned_to_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue DROP FOREIGN KEY FK_12AD233E7E3C61F9');
        $this->addSql('ALTER TABLE issue DROP FOREIGN KEY FK_12AD233EF4BD7827');
        $this->addSql('DROP INDEX IDX_12AD233E7E3C61F9 ON issue');
        $this->addSql('DROP INDEX IDX_12AD233EF4BD7827 ON issue');
        $this->addSql('ALTER TABLE issue DROP owner_id, DROP assigned_to_id');
    }
}
