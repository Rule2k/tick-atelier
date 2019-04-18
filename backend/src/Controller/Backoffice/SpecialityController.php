<?php

namespace App\Controller\Backoffice;

use App\Entity\Speciality;
use App\Form\SpecialityType;
use App\Repository\UserRepository;
use App\Repository\PromotionRepository;
use App\Repository\SpecialityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice/speciality")
 */
class SpecialityController extends AbstractController
{
    /**
     * @Route("/", name="backoffice_speciality_index", methods={"POST"})
     */
    public function index(Request $request, SpecialityRepository $specialityRepository, UserRepository $userRepository): Response
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
        if($admin == false) {
            return new JsonResponse('You have no business here !');
        }
   
        $allSpecialities = $specialityRepository->findAll();
        $specializationList = [];
        foreach($allSpecialities as $currentSpeciality) {
            $specializationList[]=[

                'name' => $currentSpeciality->getName(),
                'id' => $currentSpeciality->getId()
            ];
        }
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'specializationList' =>  $specializationList,
            'response' => 'Voilà la liste des spécialités !'
        ];
        return new JsonResponse($formatted);
    }
    /**
     * @Route("/new", name="backoffice_speciality_new", methods={"POST"})
     */
    public function new(Request $request, UserRepository $userRepository, SpecialityRepository $specialityRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/speciality/new
        http://92.243.19.15:8080/backoffice/speciality/new
        Body json envoi
        {
            "username": "freddmn08",
            "name": "React Quantum",
            "promotion_name": "Quantum"
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

        if(!array_key_exists('promotion_name', $data) || !array_key_exists('name', $data) ) {
            
            return new JsonResponse('Il manque des informations !');
            if(is_null($data['promotion_name']) || is_null($data['name']) ) {
                return new JsonResponse('Il manque des informations !');
            }
        }

        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de spécialité !');
        }
        $speciality = new Speciality();
        
        $promotion = $promotionRepository->findOneBy([
            'name' => $data['promotion_name']
            ]);
        $speciality->setName($data['name']);
        $speciality->setPromotion($promotion);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($speciality);
        $entityManager->flush();
        
        $specialities = $specialityRepository->findAll();

        $allSpecialities = $specialityRepository->findAll();
        $specializationList = [];
        foreach($allSpecialities as $currentSpeciality) {
            $specializationList[]=[

                'name' => $currentSpeciality->getName(),
                'id' => $currentSpeciality->getId()
            ];
        }
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'specializationList' =>  $specializationList,
            'response' => 'Voilà la liste des spécialités !'
        ];
        return new JsonResponse($formatted);
    }
    /**
     * @Route("/{id}/edit", name="backoffice_speciality_edit", methods={"POST"})
     */
    public function edit(Request $request, PromotionRepository $promotionRepository, UserRepository $userRepository, SpecialityRepository $specialityRepository, Speciality $speciality): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/speciality/20/edit
        http://92.243.19.15:8080/backoffice/speciality/20/edit
        Body json envoi
        {
            "username": "freddmn08",
            "name": "React Quantum",
            "new_name": "React Lunar",
            "new_promotion_name": "Lunar"
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
            return new JsonResponse('Vous ne pouvez pas créer de spécialité !');
        }
        $speciality = $specialityRepository->findOneBy([
            'name' => $data['name']
        ]);
        // dd($speciality);
        if(array_key_exists('new_promotion_name', $data)) {
                    $promotion = $promotionRepository->findOneBy([
                        'name' => $data['new_promotion_name']
                        ]);
        
                    $speciality->setPromotion($promotion);
        }
        
        $speciality->setName($data['new_name']);
        $speciality->setUpdatedAt(new \DateTime('now'));
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($speciality);
        $entityManager->flush();

        $allSpecialities = $specialityRepository->findAll();
        $specializationList = [];
        foreach($allSpecialities as $currentSpeciality) {
            $specializationList[]=[

                'name' => $currentSpeciality->getName(),
                'id' => $currentSpeciality->getId()
            ];
        }
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'specializationList' =>  $specializationList,
            'response' => 'Spécialité éditée !'
        ];
        return new JsonResponse($formatted);
    }
    /**
     * @Route("/{id}/delete", name="backoffice_speciality_delete", methods={"POST"})
     */
    public function delete(Request $request, PromotionRepository $promotionRepository, UserRepository $userRepository, SpecialityRepository $specialityRepository, Speciality $speciality): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/speciality/20/delete
        http://92.243.19.15:8080/backoffice/speciality/20/delete
        Body json envoi
        {
            "username": "freddmn08",
            "name": "React Lunar"
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
            return new JsonResponse('Vous ne pouvez pas supprimer de spécialité !');
        }
        
        $speciality = $specialityRepository->findOneBy([
            'name' => $data['name']
        ]);
        
        $speciality->setIsActive(0);
        $speciality->setUpdatedAt(new \DateTime('now'));
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($speciality);
        $entityManager->flush();
        $specialities = $specialityRepository->findAll();
        $specialitiesName = [];
        foreach($specialities as $currentSpeciality) {
            $specialitiesName[] = $currentSpeciality->getName();
        }
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'specializationList' => $specialitiesName,
            'response' => 'Spécialité supprimée !'
        ];
        return new JsonResponse($formatted);
    }
}
