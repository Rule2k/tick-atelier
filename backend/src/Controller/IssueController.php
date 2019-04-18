<?php

namespace App\Controller;

use App\Entity\Issue;
use App\Form\IssueType;
use App\Entity\Priority;
use App\Repository\TagRepository;
use App\Controller\UserController;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\StatusRepository;
use App\Repository\ProjectRepository;
use App\Repository\PriorityRepository;
use App\Repository\SpecialityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/issue")
 */
class IssueController extends AbstractController
{
    /**
     * @Route("/new", name="issue_new", methods={"GET","POST"})
     */
    public function new(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, TagRepository $tagRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/issue/new

        Body json envoi 
        {
            "username": "Rule2k",
            "title": "le titre du ticket",
            "description": "le corps du ticket",
            "repo_url": "www.github.com",
            "priority": "faible",
            "tags":
            [
                "js",
                "php"
            ]
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentificaiton. Veuillez vous reconnecter !');
        }
        
        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false;

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();
        
        if ($admin === true) {
            return new JsonResponse('Vous ne pouvez pas écrire de ticket');
        }

        $active_group = UserController::findActiveGroup($user);
        
        $issue = new Issue();
        
        // on récupère l'objet priority dont le name est passé en param
        // afin de la passer ensuite à la méthode setPriority() qui attend en argument une instance de la classe Priority
        $priority = $priorityRepository->findOneBy([
            'name' => $data['priority']
        ]);

        $tags= $data['tags'];

        // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
        $status = $statusRepository->find(1);

        $issue->setTitle($data['title']);
        $issue->setDescription($data['description']);
        $issue->setRepoUrl($data['repo_url']);
        $issue->setPriority($priority);
        $issue->setOwner($user);
        $issue->setActiveGroup($active_group);
        $issue->setStatus($status);
        foreach($tags as $currentTag) {
            $tag = $tagRepository->findOneBy([
                'name' => $currentTag
            ]);

            $issue->addTag($tag); 
        };

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($issue);
        $entityManager->flush();

        $promotion = ''; 
        $priority = $priorityRepository;

        // si l'utilisateur est admin / prof
        if ($admin === true) {

            $issues = $issueRepository->findBy(
                [
                    'status' => 1,
                    'is_active' => 1
                ],
                [
                    'created_at' => 'DESC'
                ]
            );
            $formatted = UserController::serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);
            return new JsonResponse($formatted);

        } else {

            $active_group = UserController::findActiveGroup($user);
            $promotions = $user->getPromotion();

            if (!is_null($promotions)) {
                // on balaie l'ensemble des promo
                $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                return new JsonResponse($formatted);
            }
        }

    }

    /**
     * @Route("/{issue_id}/edit", name="issue_edit", methods={"POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     */
    public function edit(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, TagRepository $tagRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/issue/13/edit

        http://92.243.19.15:8080/issue/13/edit

        Body json envoi 
        {
            "username": "Rule2k",
            "title": "le nouveau titre du ticket",
            "description": "le nouveau corps du ticket",
            "repo_url": "www.github.com",
            "priority": "faible",
            "tags":
            [
                "js",
                "php"
            ]
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentificaiton. Veuillez vous reconnecter !');
        }
        
        // on récupère son id
        $userId = $user->getId();

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;

        $active_group = UserController::findActiveGroup($user);

        $issue = $issueRepository->find($request->get('issue_id'));

        $ownerIssueId = $issue->getOwner()->getId();
        
        $tags = $data['tags'];

        if($userId == $ownerIssueId || $admin === true) {

            // on récupère l'objet priority dont le name est passé en param
            // afin de la passer ensuite à la méthode setPriority() qui attend en argument une instance de la classe Priority
            $priority = $priorityRepository->findOneBy([
                'name' => $data['priority']
            ]);

            // on récupère l'owner dont l'id est envoyé par le front afin de passer cet objet à la méthode setOwner qui attend une instance de la classe User
            // $user = $userRepository->find($request->get('user_id'));

            // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
            $status = $statusRepository->find(1);

            $issue->setTitle($data['title']);
            $issue->setDescription($data['description']);
            $issue->setRepoUrl($data['repo_url']);
            $issue->setPriority($priority);
            
            // on récupère les tags associés à l'issue
            $currentTags = $issue->getTag();
            
            // on les efface
            foreach($currentTags as $currentTagRemove) {
                $tagRemove = $tagRepository->findOneBy([
                    'name' => $currentTagRemove->getName()
                ]);
    
                $issue->removeTag($tagRemove);
            };


            foreach($tags as $currentTag) {
                $tag = $tagRepository->findOneBy([
                    'name' => $currentTag
                ]);
    
                $issue->addTag($tag);
            };

            $issue->setOwner($user);
            $issue->setUpdatedAt(new \DateTime('now'));
            $issue->setActiveGroup($active_group);
            $issue->setStatus($status);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($issue);
            $entityManager->flush();

            $promotion = ''; 
            $priority = $priorityRepository;
    
            // si l'utilisateur est admin / prof
            if ($admin === true) {
    
                $issues = $issueRepository->findBy(
                    [
                        'status' => 1,
                        'is_active' => 1
                    ],
                    [
                        'created_at' => 'DESC'
                    ]
                );
                $formatted = UserController::serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);
                return new JsonResponse($formatted);
    
            } else {
    
                $active_group = UserController::findActiveGroup($user);
                $promotions = $user->getPromotion();
    
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                    return new JsonResponse($formatted);
                }
            }
        }
    return new JsonResponse('Vous ne pouvez pas édité ce ticket.');
}

    /**
     * @Route("/{issue_id}/close", name="issue_close", methods={"POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     */
    public function close(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, TagRepository $tagRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/issue/13/close

        Body json envoi avec admin
        {
            "username": "Bertrand74",
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentificaiton. Veuillez vous reconnecter !');
        }
        
        // on récupère son id
        $userId = $user->getId();
        
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false;

        $active_group = UserController::findActiveGroup($user);

        $issue = $issueRepository->findOneBy([
            'id' => $request->get('issue_id')
            ]);
        
        $ownerIssueId = $issue->getOwner()->getId();

            if($userId == $ownerIssueId || $admin === true) {

                // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
                $status = $statusRepository->find(2);

                $issue->setStatus($status);
        
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($issue);
                $entityManager->flush();
                
            $promotion = ''; 
            $priority = $priorityRepository;
    
            // si l'utilisateur est admin / prof
            if ($admin === true) {
    
                $issues = $issueRepository->findBy(
                    [
                        'status' => 1,
                        'is_active' => 1
                    ],
                    [
                        'priority' => 'DESC',
                        'created_at' => 'DESC'
                    ]
                );
                $formatted = UserController::serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);
                return new JsonResponse($formatted);
    
            } else {
    
                $active_group = UserController::findActiveGroup($user);
                $promotions = $user->getPromotion();
    
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                    return new JsonResponse($formatted);
                }
            }
        }
    return new JsonResponse('Vous ne pouvez pas cloturé ce ticket.');
    }

    /**
     * @Route("/{issue_id}/assign", name="issue_assign", methods={"POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     */
    public function assign(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, TagRepository $tagRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/issue/13/assign

        Body json envoi 
        {
            "username": "Rule2k"
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentificaiton. Veuillez vous reconnecter !');
        }
        
        // on récupère son id
        $userId = $user->getId();

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false ;

        // on récupère l'objet issue auquel un prof va s'assigner
        $issue = $issueRepository->find($request->get('issue_id'));
        
        // on récupère l'id du owner de l'issue
        $ownerIssueId = $issue->getOwner()->getId();

            if( $admin === true) {

                // on assigne l'issue au prof dont l'username est passé dans la requête
                $issue->setAssignedTo($user);

                $active_group = null;
        
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($issue);
                $entityManager->flush();
                
                $promotion = ''; 
                $priority = $priorityRepository;
        
                // si l'utilisateur est admin / prof
                if ($admin === true) {
        
                    $issues = $issueRepository->findBy(
                        [
                            'status' => 1,
                            'is_active' => 1
                        ],
                        [   
                            'priority' => 'DESC',
                            'created_at' => 'DESC'
                        ]
                    );
                    $formatted = UserController::serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);
                    return new JsonResponse($formatted);
        
                } else {
        
                    $active_group = UserController::findActiveGroup($user);
                    $promotions = $user->getPromotion();
        
                    if (!is_null($promotions)) {
                        // on balaie l'ensemble des promo
                        $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                        return new JsonResponse($formatted);
                    }
                }
            }
        return new JsonResponse('Vous ne pouvez pas assigner ce ticket.');
    }

    /**
     * @Route("/{issue_id}/unassign", name="issue_unassign", methods={"POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     */
    public function unassign(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, TagRepository $tagRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/issue/13/unassign

        http://92.243.19.15:8080/issue/13/unassign

        Body json envoi 
        {
            "username": "Rule2k",
            "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7"
        }
        */

        // on récupère en base les données de l'user dont l'username a été transmis dans la requête
        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentificaiton. Veuillez vous reconnecter !');
        }
        
        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id de son rôle
        $admin = $userRepository->find($userId)->getRole()->getId();

        // on passe admin à true ou false selon le rôle de l'user
        $admin = ($admin == 1) ? true : false ;

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();
       
        // on récupère l'objet issue auquel un prof a été assigné
        $issue = $issueRepository->find($request->get('issue_id'));
        
        // on récupère l'id du rôle du user dont le username est transmis dans la requête
        // $isAdmin = $userRepository->find($user->getId())->getRole()->getId();
        $isAdmin = $user->getRole()->getId();
        
        if($admin == true) {
            
            $loggedIn = true;
            
            // on désassigne le prof de l'issue
            $issue->setAssignedTo(null);
            $active_group = null;
        
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($issue);
            $entityManager->flush();
                
            $promotion = ''; 
            $priority = $priorityRepository;
    
            // si l'utilisateur est admin / prof
            if ($admin === true) {
    
                $issues = $issueRepository->findBy(
                    [
                        'status' => 1,
                        'is_active' => 1
                    ],
                    [   
                        'priority' => 'DESC',
                        'created_at' => 'DESC'
                    ]
                );
                $formatted = UserController::serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);
                return new JsonResponse($formatted);
    
            } else {
    
                $active_group = UserController::findActiveGroup($user);
                $promotions = $user->getPromotion();
    
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                    return new JsonResponse($formatted);
                }
            }
        }
    return new JsonResponse('Vous ne pouvez pas dé-sassigné ce ticket.');
    }
}
