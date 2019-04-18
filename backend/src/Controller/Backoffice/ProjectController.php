<?php

namespace App\Controller\Backoffice;

use App\Entity\Project;
use App\Form\ProjectType;
use App\Repository\UserRepository;
use App\Repository\ProjectRepository;
use App\Repository\PromotionRepository;
use App\Repository\SpecialityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice/project")
 */
class ProjectController extends AbstractController
{
    /**
     * @Route("/new", name="backoffice_project_new", methods={"POST"})
     */
    public function new(Request $request, UserRepository $userRepository, ProjectRepository $projectRepository, PromotionRepository $promotionRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/project/new

        http://92.243.19.15:8080/backoffice/project/new

        Body json envoi
        {
            "username": "freddmn08",
            "name": "Les animaux sont nos amis",
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

        // on récupère en base tous les users
        if(!array_key_exists('promotion_name', $data) || !array_key_exists('name', $data) ) {
            
            return new JsonResponse('Il manque des informations !');

            if(is_null($data['promotion_name']) || is_null($data['name']) ) {
                return new JsonResponse('Il manque des informations !');
            }
        }
        if ($admin != true) {
            return new JsonResponse('Vous ne pouvez pas créer de projet !');
        }
        $project = new Project();
        
        $promotion = $promotionRepository->findOneBy([
            'name' => $data['promotion_name']
            ]);

        $project->setName($data['name']);
        $project->setPromotion($promotion);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($project);
        $entityManager->flush();
        
        $allProjects = $projectRepository->findAll();
        
        $projectList = [];

        foreach($allProjects as $currentProject) {
            $projectList[]=[

               'name' => $currentProject->getName(),
                'id' => $currentProject->getId()
            ];
        }  
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'projectList' => $projectList,
            'response' => 'Projet créé !'
        ];
        return new JsonResponse($formatted);
    }

    /**
     * @Route("/{id}/edit", name="backoffice_project_edit", methods={"POST"})
     */
    public function edit(Request $request, PromotionRepository $promotionRepository, UserRepository $userRepository, SpecialityRepository $specialityRepository, ProjectRepository $projectRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/project/9/edit
        http://92.243.19.15:8080/backoffice/project/9/edit
        Body json envoi
        {
            "username": "freddmn08",
            "name": "Les animaux sont nos amis",
            "new_name": "Les animaux sont tous nos amis",
            "promotion_name": "Quantum",
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
            return new JsonResponse('Vous ne pouvez pas créer de projet !');
        }

        if(!array_key_exists('name', $data) ) {
            
            return new JsonResponse('Il manque des informations !');

            if(is_null($data['name']) ) {
                return new JsonResponse('Il manque des informations !');
            }
        }

        $project = $projectRepository->findOneBy([
            'name' => $data['name']
        ]);

        if(array_key_exists('new_promotion_name', $data)) {
                    $promotion = $promotionRepository->findOneBy([
                        'name' => $data['new_promotion_name']
                        ]);
        
                    $project->setPromotion($promotion);
        }
        
        $project->setName($data['new_name']);
        $project->setUpdatedAt(new \DateTime('now'));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($project);
        $entityManager->flush();

        $allProjects = $projectRepository->findAll();
        
        $projectList = [];

        foreach($allProjects as $currentProject) {
            $projectList[]=[

               'name' => $currentProject->getName(),
                'id' => $currentProject->getId()
            ];
        }  
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'projectList' => $projectList,
            'response' => 'Projet édité !'
        ];
        return new JsonResponse($formatted);
}
}
