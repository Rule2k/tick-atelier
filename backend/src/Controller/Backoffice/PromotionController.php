<?php

namespace App\Controller\Backoffice;

use App\Entity\Promotion;
use App\Repository\UserRepository;
use App\Repository\PromotionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice/promotion")
 */
class PromotionController extends AbstractController
{
    /**
     * @Route("/", name="backoffice_promotion", methods={"POST"})
     */
    public function index(Request $request, UserRepository $userRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/speciality/

        http://92.243.19.15:8080/backoffice/speciality/

        Body json envoi
        {
            "username": "freddmn08"
        }
        */
        
        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);
        
        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();


        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;
        // on récupère en base tous les users

        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de promotion !');
        }
        $promotionList = [];
        $allPromotion = $promotionRepository->findAll();

        foreach($allPromotion as $currentPromotion) {
            // $promotionList[] = $currentPromotion->getName();
            $promotionList[] = [
                'name' => $currentPromotion->getName(),
                'id' => $currentPromotion->getId()
            ];
        }

        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'promotionList' => $promotionList,
            'response' => 'Voilà la liste des promotions !'
        ];

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/new", name="backoffice_promotion_new", methods={"POST"})
     */
    public function new(Request $request, UserRepository $userRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/promotion/new

        http://92.243.19.15:8080/backoffice/promotion/new

        Body json envoi 
        {
            "username": "freddmn08",
            "name" : "Nom de la promo"
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);
        
        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;
        // on récupère en base tous les users

        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de promotion !');
        }

        if( !array_key_exists('name', $data) ) {
            
        return new JsonResponse('Il manque des informations !');

        if(is_null($data['name']) ) {
            return new JsonResponse('Il manque des informations !');
        }
        }

        $promotion = new Promotion();

        $promotion->setName($data['name']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($promotion);
        $entityManager->flush();

        $promotionList = [];
        $allPromotion = $promotionRepository->findAll();

        foreach($allPromotion as $currentPromotion) {
            // $promotionList[] = $currentPromotion->getName();
            $promotionList[] = [
                'name' => $currentPromotion->getName(),
                'id' => $currentPromotion->getId()
            ];
        }

        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'promotionList' => $promotionList,
            'response' => 'promotion créée'
        ];

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/{id}/edit", name="backoffice_promotion_edit", methods={"POST"})
     */
    public function edit(Request $request, UserRepository $userRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/promotion/22/edit

        http://92.243.19.15:8080/backoffice/promotion/22/edit

        Body json envoi 
        {
            "username": "freddmn08",
            "name" : "Nom édité de la promo"
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);
        
        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;
        // on récupère en base tous les users

        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de promotion !');
        }

        $promotion = $promotionRepository->findOneBy([
            'id' => $request->get('id')
        ]);

        $promotion->setName($data['name']);
        // dd($data['name']);
        $promotion->setUpdatedAt(new \DateTime('now'));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($promotion);
        $entityManager->flush();
        $promotionList = [];
        $allPromotion = $promotionRepository->findAll();

        foreach($allPromotion as $currentPromotion) {
            // $promotionList[] = $currentPromotion->getName();
            $promotionList[] = [
                'name' => $currentPromotion->getName(),
                'id' => $currentPromotion->getId()
            ];
        }

        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'promotionList' => $promotionList,
            'response' => 'promotion éditée'
        ];;

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/{id}/delete", name="backoffice_promotion_delete", methods={"POST"})
     */
    public function delete(Request $request, UserRepository $userRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/promotion/22/delete

        http://92.243.19.15:8080/backoffice/promotion/22/delete

        Body json envoi 
        {
            "username": "freddmn08"
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);
        
        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;
        // on récupère en base tous les users

        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de promotion !');
        }

        $promotion = $promotionRepository->findOneBy([
            'id' => $request->get('id')
        ]);

        $promotion->setIsActive(0);
        $promotion->setUpdatedAt(new \DateTime('now'));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($promotion);
        $entityManager->flush();

        $promotions = $promotionRepository->findAll();
        $promotionsName = [];

        foreach($promotions as $currentPromotion) {
            $promotionsName[] = $currentPromotion->getName();
        }

        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'promotionsArray' => $promotionsName,
            'response' => 'Promotion supprimée !'
        ];

        return new JsonResponse($formatted);
    }
}
