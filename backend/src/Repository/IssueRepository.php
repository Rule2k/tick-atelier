<?php

namespace App\Repository;

use App\Entity\Issue;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Issue|null find($id, $lockMode = null, $lockVersion = null)
 * @method Issue|null findOneBy(array $criteria, array $orderBy = null)
 * @method Issue[]    findAll()
 * @method Issue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IssueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Issue::class);
    }

    public function findBySearch($search)
    {
        $query = $this->createQueryBuilder('i')
                ->where('i.title LIKE :search')
                ->andWhere('i.status = 1')
                ->andWhere('i.is_active = 1')
                ->orWhere('i.description LIKE :search')
                ->andWhere('i.status = 1')
                ->andWhere('i.is_active = 1')
                ->setParameter('search', '%'.$search.'%')
                ->orderBy('i.created_at', 'DESC')
                ->getQuery();

        return ($query->execute());

    }

    public function findBySearchStudent($search, $active_group)
    {

        $queryStudent = $this->createQueryBuilder('i')
                ->where('i.title LIKE :search')
                ->andWhere('i.status = 1')
                ->andWhere('i.is_active = 1')
                ->andWhere('i.active_group LIKE :active_group')
                ->orWhere('i.description LIKE :search')
                ->andWhere('i.status = 1')
                ->andWhere('i.is_active = 1')
                ->andWhere('i.active_group LIKE :active_group')
                ->setParameter('search', '%'.$search.'%')
                ->setParameter('active_group', '%'.$active_group.'%')
                ->orderBy('i.created_at', 'DESC')
                ->getQuery();
        

        return ($queryStudent->execute());

    }

    // /**
    //  * @return Issue[] Returns an array of Issue objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Issue
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
