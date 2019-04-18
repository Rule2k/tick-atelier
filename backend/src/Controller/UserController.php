<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Issue;
use App\Form\UserType;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\ProjectRepository;
use App\Repository\PriorityRepository;
use App\Repository\SpecialityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/users")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/login", name="user_login", methods={"GET", "POST"})
     */
    public function login(Request $request, UserRepository $userRepository, RoleRepository $roleRepository, SpecialityRepository $specialityRepository, IssueRepository $issueRepository, PriorityRepository $priorityRepository, ProjectRepository $projectRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/users/login

        http://92.243.19.15:8080/users/login

        Body envoi json
        {
            "username": "Rule2k",
            "token": "9b25032f9a3094090fee4fb88614cc9bce9f7f41"
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $user->setToken($data['token']);
        $user->setUpdatedAt(new \DateTime('now'));

        $token =$data['token'];

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();
        
        if(is_null($user)){
            $user = $userRepository->findOneBy([
                'username' =>$request->get('username')
            ]);
        }
        
        if (is_null($user)) {
            $formatted['loggedIn'] = false;
            $formatted['response'] = 'Vous ne faites pas parti de l\'école O\'clock';
        } else {
            // appeler la méthode récupérant les données de l'user à retourner
            $firstname = $user->getFirstname();
            $lastname = $user->getLastname();
            $userId = $user->getId();
            $admin = $userRepository->find($userId)->getRole()->getId();
            $admin = ($admin == 1) ? true : false ;

            // Récupération de la promotion active
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
                $formatted = $this->serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority, $token);

            } else {

                $promotions = $user->getPromotion();

                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    $formatted = $this->serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                }
            }
        }
        return new JsonResponse($formatted);
    }

    /**
     * Récupération des tickets d'un utilisateur donné
     * @Route("/my-tickets", name="user_show_my_tickets", methods={"POST"})
     */
    public function showUserIssues(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, Request $request): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/users/my-tickets

        http://92.243.19.15:8080/users/my-tickets

        Body json envoi
        {
            "username": "Rule2k",
            "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7"
        }
        */

        // on récupère l'utilisateur courant à partir de son username passé dans la requête
        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        // méthode de debugg. A modifier si possible
        if(is_null($user)){
            $user = $userRepository->findOneBy([
                'username' =>$request->get('username')
            ]);
        }

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentification. Veuillez vous reconnecter !');
        }
        
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false ;

        $priority = $priorityRepository;
        
        // si l'utilisateur est étudiant et connecté
        if ($admin !== true) {

            $active_group = $this->findActiveGroup($user);
            
            // on récupère les issues créées par l'étudiant
            // on les trie par ordre antichronologique
            $issues = $issueRepository->findBy(
                [
                    'owner' => $userId,
                ],
                [
                    'created_at' => 'DESC'                
                ]
            );

            $issuesToSerialize = $this->serializingIssues($issues, $priority);

            $formatted = [];

            $formatted[] = [
                'admin' => $admin,
                'token' => $token,
                'loggedIn' => true,
                'username' => $user->getUsername(),
                'firstname' => $firstname,
                'lastname' => $lastname,
                'active_group' => $active_group,
                'issues' => $issuesToSerialize,
                'user_id' => $userId
            ];


        } else {
           return new JsonResponse ('Vous ne devriez pas accéder à cette page !');
        }
        return new JsonResponse($formatted[] = [
            'admin' => $admin,
            'token' => $token,
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'firstname' => $firstname,
            'lastname' => $lastname,
            'active_group' => $active_group,
            'issues' => $issuesToSerialize,
            'user_id' => $userId
        ]);
    }

    /**
     * Récupération des tickets d'un admin donné
     * @Route("/my-tickets/admin", name="admin_show_my_tickets", methods={"GET","POST"})
     */
    public function showAdminIssues(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, Request $request): Response
    {
        // URL de test localhost
        
        // http://localhost:8001/users/my-tickets/admin

        // http://92.243.19.15:8080/users/my-tickets/admin

        /* Body json envoi
        {
             "username": "Rule2k",
             "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7"
        }
        */

        // on récupère l'utilisateur courant à partir de son username passé dans la requête
        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentification. Veuillez vous reconnecter !');
        }

        // méthode de debugg. A modifier si possible
        if(is_null($user)){
            $user = $userRepository->findOneBy([
                'username' =>$request->get('username')
            ]);
        }
        
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false ;

        if($admin === true) {

            $issues = $issueRepository->findBy(
                [
                    'assigned_to' => $userId,
                    'status' => 1,
                    'is_active' => 1
                ],
                [
                    'created_at' => 'DESC'             
                ]
            );
            $priority = $priorityRepository;
            $issuesToSerialize = $this->serializingIssues($issues, $priority);
    
            

        } else {
            $formatted = 'Vous n\'êtes pas admin. Vous ne devriez pas voir cette page !';            
        }
        
        return new JsonResponse($formatted[] = [
            'admin' => $admin,
            'token' => $token,
            'username' => $user->getUsername(),
            'firstname' => $firstname,
            'lastname' => $lastname,
            'loggedIn' => true,                
            'issues' => $issuesToSerialize,
            'active_group' => null,
            'user_id' => $userId
        ]);
    }


    /**
     * @Route("/search", name="user_search", methods={"POST"})
     */
    public function search(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, Request $request, EntityManagerInterface $em): Response
    {

        /*
        URL de test localhost
        
        http://localhost:8001/users/search

        http://92.243.19.15:8080/users/search
        
        Json
        {
            "username": "Rule2k",
            "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7",
            "search": "github"
        }
        *   username
            token
        *   search
        *
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);
        
        $token = $data['token'];
        $tokenDB = $user->getToken();
        if($token !== $tokenDB) {
            return new JsonResponse('Problème d\' authentification. Veuillez vous reconnecter !');
        }
        // méthode de debugg. A modifier si possible
        // if(is_null($user)){
        //     $user = $userRepository->findOneBy([
        //         'username' =>$request->get('username')
        //     ]);
        // }

        if(!array_key_exists('search', $data) ) {
            $search = '';
        } else {
            $search = $data['search'];
        }

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();
        $admin = ($admin == 1) ? true : false ;

        $priority = $priorityRepository;
        
        $promotion = ''; 
        $priority = $priorityRepository;

        // si l'utilisateur est admin / prof
        if ($admin === true) {

            // $issues = $issueRepository->findBy(
            //     [
            //         'status' => 1,
            //         'is_active' => 1
            //     ],
            //     [
            //         'created_at' => 'DESC'
            //     ]
            // );
            $issues = $issueRepository->findBySearch($search);

            $formatted = $this->serializingAdminIssues($issues, $userId, $user, $admin,  $firstname, $lastname, $priority);

        } else {

            // $promotions = $user->getPromotion();

            // if (!is_null($promotions)) {
            //     // on balaie l'ensemble des promo
            //     $formatted = $this->serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority);
            // }

                $active_group = $this->findActiveGroup($user);
                
                // on récupère les issues créées par l'étudiant
                // on les trie par ordre antichronologique
                // $issues = $issueRepository->findBy(
                //     [
                //         'owner' => $userId,
                //     ],
                //     [
                //         'created_at' => 'DESC'                
                //     ]
                // );

                $issues= $issueRepository->findBySearchStudent($search, $active_group);

    
                $issuesToSerialize = $this->serializingIssues($issues, $priority);
    
                $formatted = [];
    

            return new JsonResponse($formatted[] = [
                'admin' => $admin,
                'token' => $token,
                'loggedIn' => true,
                'username' => $user->getUsername(),
                'firstname' => $firstname,
                'lastname' => $lastname,
                'active_group' => $active_group,
                'issues' => $issuesToSerialize,
                'user_id' => $userId
            ]);
    
        }
    
    return new JsonResponse($formatted);
    }
    
    /**
     * @Route("/all-tickets", name="user_all_issues", methods={"POST"})
     */
    public function allIssues(SpecialityRepository $specialityRepository, UserRepository $userRepository, IssueRepository $issueRepository, ProjectRepository $projectRepository, PriorityRepository $priorityRepository, Request $request): Response
    {
        // URL de test localhost
        // prof
        // http://localhost:8001/users/freddmn08
        
        // etudiant
        // http://localhost:8001/users/Rule2k

        /* Json
        {
            "username": "T0din"
        }
         */

        // on récupère l'utilisateur courant à partir de son username passé dans la requête
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

        // méthode de debugg. A modifier si possible
        if(is_null($user)){
            $user = $userRepository->findOneBy([
                'username' =>$request->get('username')
            ]);
        }
        
        // on récupère son id
        $userId = $user->getId();

        // on récupère l'id du role de l'utilisateur
        $admin = $userRepository->find($userId)->getRole()->getId();

        // on passe true ou false à $admin
        $admin = ($admin == 1) ? true : false ;

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

            // appeler la méthode récupérant les données de l'user à retourner

            // Récupération de la promotion active
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
                        'created_at' => 'DESC',
                        'priority' => 'DESC'                   
                    ]
                );
                $formatted = $this->serializingAdminIssues($issues, $userId, $user, $admin, $firstname, $lastname, $priority, $token );

            } else {
                // si l'utilisateur est étudiant

                // on récupère la liste des promos de l'étudiant
                $promotions = $user->getPromotion();

                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    
                    $formatted = $this->serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                }
            }
        
        return new JsonResponse($formatted);
    }

    /**
     * méthode renvoyant les issues d'un utilisateur donné
     */
    public function serializingAdminIssues($issues, $userId, $user, $admin, $firstname, $lastname, $priority, $token) {
        $issuesToSerialize = UserController::serializingIssues($issues, $priority);

            return ($formatted[] = [
                'loggedIn' => true,
                'token' => $token,
                'username' => $user->getUsername(),
                'user_id' => $userId,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'admin' => $admin,
                'issues' => $issuesToSerialize,
                'active_group' => null,
             ]);
    }

    /**
     * méthode renvoyant le groupe actif d'un utilisateur donné
     */
    public function serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token) {
        // on définit une variable $project à vide
        $active_group = UserController::findActiveGroup($user);
        $formatted = [];
        $issues = $issueRepository->findBy(
            [
                'active_group' => $active_group,
                'status' => 1
            ],
            [
                'created_at' => 'DESC'                    
            ] 
        );

        $issuesToSerialize = UserController::serializingIssues($issues, $priority);

    return ($formatted[] = [
        'loggedIn' => true,
        'token' => $token,
        'username' => $user->getUsername(),
        'user_id' => $userId,
        'firstname' => $firstname,
        'lastname' => $lastname,
        'admin' => $admin,
        'active_group' => $active_group,
        'issues' => $issuesToSerialize,
     ]);
}

    /**
     * méthode formatant les issues d'un utilisateur donné
     */
    public function serializingIssues($issues, $priority) {

        $issuesToSerialize = [];
            
        foreach ($issues as $currentIndex => $currentIssue) {

            $answers = $currentIssue->getAnswers();
            $tags = $currentIssue->getTag();
            $answersFiltered = [];
            $tagsFiltered = [];
            
            foreach($answers as $currentIndexAnswer => $currentAnswer) {
                $answersFiltered[$currentIndexAnswer]['answer_id'] = $currentAnswer->getId();
                $answersFiltered[$currentIndexAnswer]['issue_id'] = $currentAnswer->getIssue()->getId();
                $answersFiltered[$currentIndexAnswer]['username_owner'] = $currentAnswer->getUser()->getUsername();
                $answersFiltered[$currentIndexAnswer]['firstname_owner'] = $currentAnswer->getUser()->getFirstname();
                $answersFiltered[$currentIndexAnswer]['lastname_owner'] = $currentAnswer->getUser()->getLastname();
                $answersFiltered[$currentIndexAnswer]['body'] = $currentAnswer->getBody();
                $answersFiltered[$currentIndexAnswer]['created_at'] = $currentAnswer->getCreatedAt()->format('Y-m-d H:i:s');

            };

            foreach($tags as $currentIndexTag => $currentTag) {
                $tagsFiltered[$currentIndexTag]= $currentTag->getName();
            };

            $answersLength = count($answersFiltered);
                                                    
            $issuesToSerialize[$currentIndex]['issue_id'] = $currentIssue->getId();
            $issuesToSerialize[$currentIndex]['title'] = $currentIssue->getTitle();
            $issuesToSerialize[$currentIndex]['owner'] = $currentIssue->getOwner()->getUsername();
            $issuesToSerialize[$currentIndex]['firstname_owner'] = $currentIssue->getOwner()->getFirstname();
            $issuesToSerialize[$currentIndex]['lastname_owner'] = $currentIssue->getOwner()->getLastname();
            $issuesToSerialize[$currentIndex]['description'] = $currentIssue->getDescription();
            $issuesToSerialize[$currentIndex]['repo_url'] = $currentIssue->getRepoUrl();
            $issuesToSerialize[$currentIndex]['created_at'] = $currentIssue->getCreatedAt()->format('Y-m-d H:i:s');
            $issuesToSerialize[$currentIndex]['answers'] = $answersFiltered;
            $currentPriority = $currentIssue->getPriority();
            $currentPriorityName = $priority->find($currentPriority->getId())->getName();
            $issuesToSerialize[$currentIndex]['priority'] = $currentPriorityName;
            $issuesToSerialize[$currentIndex]['tags'] =  $tagsFiltered;
            $issuesToSerialize[$currentIndex]['status'] = $currentIssue->getStatus()->getName();
            if (!is_null($currentIssue->getAssignedTo())) {
                $issuesToSerialize[$currentIndex]['assignement'] = $currentIssue->getAssignedTo()->getUsername();
            } else {
                $issuesToSerialize[$currentIndex]['assignement'] = null;
            }
            
            $issuesToSerialize[$currentIndex]['number_of_comments'] = $answersLength;
        }
        return $issuesToSerialize;
    }

    public function findActiveGroup($user) {

        // on récupère la liste des promos de l'étudiant
        $promotions = $user->getPromotion();
        $userId = $user->getId();
        // on récupère la liste des spé de l'étudiant
        $specialities = $user->getSpeciality();
        $projects = $user->getProject();

        // $projects = $projectRepository->findBy([
        //     'user_id' => $userId
        // ]);
        
        // on définit une variable active_group à vide
        $active_group = '';
        // on définit une variable $project à vide 
        $project = '';
        foreach ($promotions as $currentPromotion) {
            // $promotion prend pour valeurs le nom de la promo active
            $promotionId = $currentPromotion->getId();
            $promotionName = $currentPromotion->getName();
            $active_group = $promotionName;
        }
        if (!is_null($specialities[0])) {
            // si l'user a plusieurs spécialités, on récupère sa spé courante
            $countSpecialities = $specialities->count();
            
            if ($countSpecialities > 1) {
                foreach ($specialities as $currentSpeciality) {
                    $currentSpecialityName = $currentSpeciality->getName();
                    $currentSpecialityPromotionId = $currentSpeciality->getPromotion()->getId();
                    
                    // on compare la promo associée à cette spé à la promotion courante
                    if ($currentSpecialityPromotionId === $promotionId) {
                    $specialities = $currentSpecialityName;
                    $active_group = $specialities;
                }
            }
            } else {
                // si l'user a une unique spé, on en récupère le nom
                $specialities = $specialities[0]->getName();
                $active_group = $specialities;
            }
        }
        
        if (!is_null($projects)) {
            foreach ($projects as $currentProject) {
                if ($currentProject->getIsActive() == 1) {
                    // $project prend pour valeurs le nom de la spé active
                    $project = $currentProject->getName();
                    $active_group = $project;
                }
            }
        }
        return $active_group;
    }
}
