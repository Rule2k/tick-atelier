<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Speciality;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Speciality|null find($id, $lockMode = null, $lockVersion = null)
 * @method Speciality|null findOneBy(array $criteria, array $orderBy = null)
 * @method Speciality[]    findAll()
 * @method Speciality[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpecialityRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Speciality::class);
    }

    // public function findSpeByUserAndPromoQueryBuilder($id)
    // {
    //     $qb = $this->createQueryBuilder('s')
    //         ->join('User.', 'userAlias')
    //         // ->join('Speciality.name', 'speNameAlias')
    //         // ->addSelect('speNameAlias') // rajoute l'objet tag dans le retour de la requête
    //         ->where('User.id = :myId')
    //         // ->setParameter('myPromotion', $promotion)
    //         ->setParameter('myId', $id)
    //         ->getQuery()
    //     ;

    //     return $qb->execute();
    // }

    // /**
    //  * @return Speciality[] Returns an array of Speciality objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Speciality
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
