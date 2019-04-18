<?php

namespace App\Controller\Backoffice;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\ProjectRepository;
use App\Repository\PromotionRepository;
use App\Repository\SpecialityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Controller\UserController as AppUserController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/backoffice/users")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="backoffice_user_index", methods={"POST"})
     */
    public function index(Request $request, PromotionRepository $promotionRepository, UserRepository $userRepository, SpecialityRepository $specialityRepository, ProjectRepository $projectRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/users/

        http://92.243.19.15:8080/backoffice/users/

        Body json envoi avec admin
        {
            "username": "Rule2k",
            "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7"
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

        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;
        // on récupère en base tous les users

        if($admin === false) {
            return new JsonResponse('You have no business here !');
        }
        
        $users = $userRepository->findBy(
            [],
        [
            'username' => 'ASC'
        ]);

        // on déclare le tableau à serializer
        $formatted = [];

        // $userId = $user->getId();

        // Récupération de la promotion active
        $promotion = '';

        // on boucle sur tous les utilisateurs
        foreach ($users as $currentUser) {
            
            // si l'utilisateur courant est admin / prof
            if ($currentUser->getRole()->getId() == 1) {

                $adminInfo = true;
                $promotion = false;
                
                $usersArray[] = [
                    'user_id' => $currentUser->getId(),
                    'username' => $currentUser->getUsername(),
                    'firstname' => $currentUser->getFirstName(),
                    'lastname' => $currentUser->getLastName(),
                    'email' => $currentUser->getEmail(),
                    'admin' => $adminInfo
                 ];

            } else {
                // si l'utilisateur est étudiant
                $adminInfo = false;
    
                // on récupère la liste des promos de l'étudiant
                $promotions = $currentUser->getPromotion();
                
                $promotionList = [];
                $allPromotion = $promotionRepository->findAll();

                foreach($allPromotion as $currentPromotion) {
                    // $promotionList[] = $currentPromotion->getName();
                    $promotionList[] = [
                        'name' => $currentPromotion->getName(),
                        'id' => $currentPromotion->getId()
                    ];
                }

                // on récupère la liste des spé de l'étudiant
                $specialities = $currentUser->getSpeciality();

                $countSpecialities = $specialities->count();
    
                $projects = $currentUser->getProject();

                $project = '';
                $speciality = '';
                $promotionName = '';

                foreach ($promotions as $currentPromotion) {
                    // $promotion prend pour valeurs le nom de la promo active
                    $promotionId = $currentPromotion->getId();
                    $promotionName = $currentPromotion->getName();
                    
                    $active_group = $promotionName;
                }

                $currentPromotionId = $promotionRepository->findOneBy([
                    'name' => $promotionName
                ]);

                $allSpecialities = $specialityRepository->findAll();

                $specializationList = [];
                foreach($allSpecialities as $currentSpeciality) {
                    $specializationList[] = [
                    'name' => $currentSpeciality->getName(),
                    'id' => $currentSpeciality->getId()
                    ];
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
                            $speciality = $currentSpecialityName;
                            $active_group = $speciality;
                        }
                    }
                    } else {
                        // si l'user a une unique spé, on en récupère le nom
                        $speciality = $specialities[0]->getName();
                        $active_group = $speciality;
                    }
                }
                
                if (!is_null($projects)) {
                    foreach ($projects as $currentProject) {
                        if ($currentProject->getIsActive() == 1) {
                            // $project prend pour valeurs le nom du projet courant
                            $project = $currentProject->getName();

                            $active_group = $project;

                        }
                    }
                }

                $allProjects = $projectRepository->findBy([
                    'is_active' => 1
                ]);
                $projectList = [];

                foreach($allProjects as $currentProject) {
                    $projectList[]=[
                        'name' => $currentProject->getName(),
                        'id' => $currentProject->getId()
                    ];
                }                
                
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo

                    $usersArray[] = [
                        'user_id' => $currentUser->getId(),
                        'username' => $currentUser->getUsername(),
                        'firstname' => $currentUser->getFirstName(),
                        'lastname' => $currentUser->getLastName(),
                        'email' => $currentUser->getEmail(),
                        'admin' => $adminInfo, 
                        'active_group' => $active_group,
                        'promotion' => $promotionName,
                        'promotionList' => $promotionList,
                        'specializationList' => $specializationList,
                        'projectList' => $projectList,
                        'specialization' => $speciality,
                        'project' => $project
                     ];
                }
            }
        }

        $formatted = [
            'loggedIn' => true,
            'token' => $token,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'usersArray' => $usersArray,
        ];

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/new", name="backoffice_user_new", methods={"POST"})
     */
    public function new(Request $request, UserRepository $userRepository, RoleRepository $roleRepository, PromotionRepository $promotionRepository, SpecialityRepository $specialityRepository, ProjectRepository $projectRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/users/new

        http://92.243.19.15:8080/backoffice/users/new

        Body envoi json
        {
            "username": "freddmn08",
            "new_username": "new user",
            "firstname": "David",
            "lastname": "Bowie",
            "email": "david@oclock.io",
            "admin": "true",
            "promotion": "Lunar",
            "specialization": "Symfony",
            "project": 
        }
        */

        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $userRepository->findOneBy([
            'username' => $data['username']
        ]);

        // dd($user);

        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $admin = $userRepository->find($userId)->getRole()->getId();

        $admin = ($admin == 1) ? true : false;

        // si l'utilisateur n'est pas admin, on génère un message d'erreur
        if($admin === false) {
            return new JsonResponse('You have no business here!');
        }

        // si la clé new_username n'est pas transmise par le front, on génère un message d'erreur
        if(!array_key_exists('new_username', $data)) {
            
            // si la clé new_username est transmise et associée à null, on génère un message d'erreur
            if(is_null($data['new_username'])) {
                return new JsonResponse('Il manque le username du nouveau user.');
            }
            return new JsonResponse('Il manque le username du nouveau user.');      
        }

        // si la clé admin n'est pas transmise par le front, on génère un message d'erreur
        if(!array_key_exists('admin', $data)) {
            
            // si la clé new_username n'est pas transmise par le front, on génère un message d'erreur
            if(is_null($data['admin'])) {
                return new JsonResponse('Il manque le role du nouveau user.');
            }
            return new JsonResponse('Il manque le role du nouveau user.');
        }

        $users = $userRepository->findBy(
            [],
        [
            'username' => 'ASC'
        ]);

        // on déclare le tableau à serializer
        $formatted = [];

        // Récupération de la promotion active
        $promotion = '';   

        $newUser = new User();

        $newUser->setUsername($data['new_username']);

        if($data['admin'] === true) {
            $role = $roleRepository->find(1);
        } else {
            $role = $roleRepository->find(2);        
        }

        $newUser->setRole($role);
        
        // si la clé email est transmise par le front
        if(array_key_exists('email', $data)) {
            // si la clé email n'est pas null, on la sette
            if(!is_null($data['email'])) {
                $email = $data['email'];
                $newUser->setEmail($email);
            }
        }

        // si la clé firstname est transmise par le front
        if(array_key_exists('firstname', $data)) {
            
            // si la clé firstname n'est pas null, on la sette
            if(!is_null($data['firstname'])) {
                $firstname = $data['firstname'];
                $newUser->setFirstname($firstname);
            }
        }

        // si la clé lastname est transmise par le front
        if(array_key_exists('lastname', $data)) {
            
            // si la clé lastname n'est pas null, on la sette
            if(!is_null($data['lastname'])) {
                $lastname = $data['lastname'];
                $newUser->setLastname($lastname);
            }
        }

        // si la clé promotion est transmise par le front
        if(array_key_exists('promotion', $data)) {
            
            // si la clé promotion n'est pas null
            if(!is_null($data['promotion'])) {
                // on récupère l'objet promotion courante du user
                // QUID si l'user a plusieurs promo ???
                $promotion = $promotionRepository->findOneBy([
                    'name' => $data['promotion']
                ]);

                // si cette promo n'est pas null, on la sette dans l'user
                if(!is_null($promotion)) {
                    $newUser->addPromotion($promotion);
                } else {
                    return new JsonResponse('Cette promotion n\'existe pas !');
                }
            }
        }
        
        if(array_key_exists('specialization', $data)) {
            
            // si la clé firstname n'est pas transmise par le front, on génère un message d'erreur
            if(!is_null($data['specialization'])) {
                $specialization = $specialityRepository->findOneBy([
                    'name' => $data['specialization']
                    ]);
                if(!is_null ($specialization)) {
                    $newUser->addSpeciality($specialization);
                } else {
                    return new JsonResponse('Cette spécialité n\'existe pas !');
                }
            }
        }

        if(array_key_exists('project', $data)) {
            
            // si la clé firstname n'est pas transmise par le front, on génère un message d'erreur
            if(!is_null($data['project'])) {
                $project = $projectRepository->findOneBy([
                    'name' => $data['project']
                    ]);
                if(!is_null ($project)) {
                    $newUser->addProject($project);
                } else {
                    return new JsonResponse('Ce projet n\'existe pas !');
                }
            }
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($newUser);
        $entityManager->flush();        

        $users = $userRepository->findBy(
            [],
        [
            'username' => 'ASC'
        ]);

        // on déclare le tableau à serializer
        $formatted = [];

        // $userId = $user->getId();

        // Récupération de la promotion active
        $promotion = '';

        // on boucle sur tous les utilisateurs
        foreach ($users as $currentUser) {
            
            // si l'utilisateur courant est admin / prof
            if ($currentUser->getRole()->getId() == 1) {

                $adminInfo = true;
                $promotion = false;
                
                $usersArray[] = [
                    'user_id' => $currentUser->getId(),
                    'username' => $currentUser->getUsername(),
                    'firstname' => $currentUser->getFirstName(),
                    'lastname' => $currentUser->getLastName(),
                    'email' => $currentUser->getEmail(),
                    'admin' => $adminInfo
                 ];

            } else {
                // si l'utilisateur est étudiant
                $adminInfo = false;
    
                // on récupère la liste des promos de l'étudiant
                $promotions = $currentUser->getPromotion();
                
                $promotionList = [];
                $allPromotion = $promotionRepository->findAll();

                foreach($allPromotion as $currentPromotion) {
                    $promotionList[]=[
                        'name' => $currentPromotion->getName(),
                        'id' => $currentPromotion->getId()
                    ];
                }

                // on récupère la liste des spé de l'étudiant
                $specialities = $currentUser->getSpeciality();

                $countSpecialities = $specialities->count();
    
                $projects = $currentUser->getProject();


                $project = '';
                $speciality = '';
                $promotionName='';

                foreach ($promotions as $currentPromotion) {
                    // $promotion prend pour valeurs le nom de la promo active
                    $promotionId = $currentPromotion->getId();
                    $promotionName = $currentPromotion->getName();

                    
                    $active_group = $promotionName;
                }

                $currentPromotionId = $promotionRepository->findOneBy([
                    'name' => $promotionName
                ]);

                $allSpecialities = $specialityRepository->findAll();
                
                $specializationList = [];
                foreach($allSpecialities as $currentSpeciality) {
                    $specializationList[]=[
                       'name' => $currentSpeciality->getName(),
                       'id' => $currentSpeciality->getId()
                    ];
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
                            $speciality = $currentSpecialityName;
                            $active_group = $speciality;
                        }
                    }
                    } else {
                        // si l'user a une unique spé, on en récupère le nom
                        $speciality = $specialities[0]->getName();
                        $active_group = $speciality;
                    }
                }
                
                if (!is_null($projects)) {
                    foreach ($projects as $currentProject) {
                        if ($currentProject->getIsActive() == 1) {
                            // $project prend pour valeurs le nom du projet courant
                            $project = $currentProject->getName();

                            $active_group = $project;

                        }
                    }
                }

                $allProjects = $projectRepository->findBy([
                    'is_active' => 1
                ]);
                $projectList = [];

                foreach($allProjects as $currentProject) {
                    $projectList[]=[
                        'name' => $currentProject->getName(),
                        'id' => $currentProject->getId()

                    ];
                }                
                
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo

                    $usersArray[] = [
                        'user_id' => $currentUser->getId(),
                        'username' => $currentUser->getUsername(),
                        'firstname' => $currentUser->getFirstName(),
                        'lastname' => $currentUser->getLastName(),
                        'email' => $currentUser->getEmail(),
                        'admin' => $adminInfo, 
                        'active_group' => $active_group,
                        'promotion' => $promotionName,
                        'promotionList' => $promotionList,
                        'specializationList' => $specializationList,
                        'projectList' => $projectList,
                        'specialization' => $speciality,
                        'project' => $project
                     ];
                }
            }
        }
        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'usersArray' => $usersArray,
        ];

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/{id}/edit", name="backoffice_user_edit", methods={"POST"})
     */
    public function edit(Request $request, UserRepository $userRepository, RoleRepository $roleRepository, PromotionRepository $promotionRepository, SpecialityRepository $specialityRepository, ProjectRepository $projectRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/backoffice/users/9/edit

        http://92.243.19.15:8080/backoffice/users/9/edit

        Body envoi json
        {
            "username": "Rule2k",
            "token": "d5750cb35ee04e6d528d1a36cf88c91c04c38ac7",

            "new_username": "al3x-ds",
            "firstname": "Alexandre",
            "lastname": "Dessusah",
            "email": "alex@oclock.io",
            "admin": "false",
            "promotion": "Lunar",
            "specialization": "Lunar Symfony"
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

        // si l'utilisateur n'est pas admin, on génère un message d'erreur
        if($admin == false) {
            return new JsonResponse('You have no business here!');
        }

        // si la clé new_username n'est pas transmise par le front, on génère un message d'erreur
        if(!array_key_exists('new_username', $data)) {
            
            // si la clé new_username est transmise et associée à null, on génère un message d'erreur
            if(is_null($data['new_username'])) {
                return new JsonResponse('Il manque le username du user.');
            }
            return new JsonResponse('Il manque le username du user.');      
        }

        // si la clé admin n'est pas transmise par le front, on génère un message d'erreur
        if(!array_key_exists('admin', $data)) {
        
            // si la clé new_username n'est pas transmise par le front, on génère un message d'erreur
            if(is_null($data['admin'])) {
                return new JsonResponse('Il manque le role du user.');
            }
            return new JsonResponse('Il manque le role du user.');
        }

        $newUser = $userRepository->findOneBy([
            'username' => $data['new_username']
        ]);

        // on déclare le tableau à serializer
        $formatted = [];

        // Récupération de la promotion active
        $promotion = '';
        
        $newUser->setUsername($data['new_username']);

        if($data['admin'] === true) {
            $role = $roleRepository->find(1);
        } else {
            $role = $roleRepository->find(2);
        }

        $newUser->setRole($role);
        $newUser->setUpdatedAt(new \DateTime('now'));
        
        // si la clé email est transmise par le front
        if(array_key_exists('email', $data)) {
            $email = $data['email'];
            $newUser->setEmail($email);
        }

        // si la clé firstname est transmise par le front                        
        if(array_key_exists('firstname', $data)) {    
                $newFirstname = $data['firstname'];
                $newUser->setFirstname($newFirstname);

        }

        // si la clé lastname est transmise par le front
        if(array_key_exists('lastname', $data)) {
                $newLastname = $data['lastname'];
                $newUser->setLastname($newLastname);
            }
    

        // si la clé promotion est transmise par le front
        if(array_key_exists('promotion', $data)) {
            
            // si la clé promotion n'est pas null
            if(!is_null($data['promotion'])) {
                // on récupère l'objet promotion courante du user
                // QUID si l'user a plusieurs promo ???
                $promotion = $promotionRepository->findOneBy([
                    'name' => $data['promotion']
                ]);

                // si cette promo n'est pas null, on la sette dans l'user
                if(!is_null($promotion)) {
                    $newUser->addPromotion($promotion);
                } else {
                    return new JsonResponse('Cette promotion n\'existe pas !');
                }
            }
        }

        // si la clé promotion est transmise par le front
        if(array_key_exists('promotion', $data)) {
    
            // si la clé promotion n'est pas null
            if(!is_null($data['promotion'])) {

                if(!is_null($promotion)) {
                    $promoId = $promotion->getId();
                    $possibleSpecializations = $specialityRepository->findBy([
                        'promotion' => $promoId
                    ]);
                $possibleSpecializationsArray = [];

                if(!is_null($possibleSpecializations)){
                    foreach($possibleSpecializations as $possibleSpeciality) {
                        $possibleSpecializationsArray[] = $possibleSpeciality->getName();
                    }
                }
                } else {
                    return new JsonResponse('Cette spécialité n\'existe pas !');
                }
            }
        }

        if(array_key_exists('specialization', $data)) {
            
            // si la clé firstname n'est pas transmise par le front, on génère un message d'erreur
            if(!is_null($data['specialization'])) {
                $specialization = $specialityRepository->findOneBy([
                    'name' => $data['specialization']
                    ]);
                if(!is_null ($specialization)) {
                    foreach($possibleSpecializationsArray as $currentSpeciality){
                        if($currentSpeciality == $specialization->getName()){  
                            $newUser->addSpeciality($specialization);
                        }                       
                    }
                } else {
                    return new JsonResponse('Cette spécialité n\'existe pas !');
                }
            }
        }

        // si la clé promotion est transmise par le front
        if(array_key_exists('promotion', $data)) {
    
            // si la clé promotion n'est pas null
            if(!is_null($data['promotion'])) {

                if(!is_null($promotion)) {
                    $possibleProjects = $projectRepository->findBy([
                        'promotion' => $promoId
                    ]);
                $possibleProjectsArray = [];

                if(!is_null($possibleProjects)){
                    foreach($possibleSpecializations as $possibleProject) {
                        $possibleProjectsArray[] = $possibleProject->getName();
                    }
                }
                } else {
                    return new JsonResponse('Ce projet n\'existe pas !');
                }
            }
        }

        // si la clé project est transmise par le front
        if(array_key_exists('project', $data)) {
            
            // si la clé project n'est pas null
            if(!is_null($data['project'])) {

                // on récupère l'object project courant
                $project = $projectRepository->findOneBy([
                    'name' => $data['project']
                    ]);
                if(!is_null ($project)) {
                    foreach($possibleProjectsArray as $currentProject){
                        if($currentProject == $project->getName()){  
                            $newUser->addProject($project);
                        }                       
                    }
                } else {
                    return new JsonResponse('Ce projet n\'existe pas !');
                }
            }
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($newUser);
        $entityManager->flush();        

        $users = $userRepository->findBy(
            [],
        [
            'username' => 'ASC'
        ]);

        // on déclare le tableau à serializer
        $formatted = [];

        // $userId = $user->getId();

        // Récupération de la promotion active
        $promotion = '';

        // on boucle sur tous les utilisateurs
        foreach ($users as $currentUser) {
            
            // si l'utilisateur courant est admin / prof
            if ($currentUser->getRole()->getId() == 1) {

                $adminInfo = true;
                $promotion = false;
                
                $usersArray[] = [
                    'user_id' => $currentUser->getId(),
                    'username' => $currentUser->getUsername(),
                    'firstname' => $currentUser->getFirstName(),
                    'lastname' => $currentUser->getLastName(),
                    'email' => $currentUser->getEmail(),
                    'admin' => $adminInfo
                 ];

            } else {
                // si l'utilisateur est étudiant
                $adminInfo = false;
    
                // on récupère la liste des promos de l'étudiant
                $promotions = $currentUser->getPromotion();
                
                $promotionList = [];
                $allPromotion = $promotionRepository->findAll();

                foreach($allPromotion as $currentPromotion) {
                    $promotionList[]=[
                    'name' => $currentPromotion->getName(),
                    'id' => $currentPromotion->getId()
                    ];
                }

                // on récupère la liste des spé de l'étudiant
                $specialities = $currentUser->getSpeciality();

                $countSpecialities = $specialities->count();
    
                $projects = $currentUser->getProject();


                $project = '';
                $speciality = '';
                $promotionName='';

                foreach ($promotions as $currentPromotion) {
                    // $promotion prend pour valeurs le nom de la promo active
                    $promotionId = $currentPromotion->getId();
                    $promotionName = $currentPromotion->getName();

                    
                    $active_group = $promotionName;
                }

                $currentPromotionId = $promotionRepository->findOneBy([
                    'name' => $promotionName
                ]);

                $allSpecialities = $specialityRepository->findAll();
                
                $specializationList = [];
                foreach($allSpecialities as $currentSpeciality) {
                    $specializationList[]=[

                        'name' => $currentSpeciality->getName(),
                        'id' => $currentSpeciality->getId()
                    ];
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
                            $speciality = $currentSpecialityName;
                            $active_group = $speciality;
                        }
                    }
                    } else {
                        // si l'user a une unique spé, on en récupère le nom
                        $speciality = $specialities[0]->getName();
                        $active_group = $speciality;
                    }
                }
                
                if (!is_null($projects)) {
                    foreach ($projects as $currentProject) {
                        if ($currentProject->getIsActive() == 1) {
                            // $project prend pour valeurs le nom du projet courant
                            $project = $currentProject->getName();

                            $active_group = $project;

                        }
                    }
                }

                $allProjects = $projectRepository->findBy([
                    'is_active' => 1
                ]);
                $projectList = [];

                foreach($allProjects as $currentProject) {
                    $projectList[]=[

                       'name' => $currentProject->getName(),
                        'id' => $currentProject->getId()
                    ];
                }                
                
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo

                    $usersArray[] = [
                        'user_id' => $currentUser->getId(),
                        'username' => $currentUser->getUsername(),
                        'firstname' => $currentUser->getFirstName(),
                        'lastname' => $currentUser->getLastName(),
                        'email' => $currentUser->getEmail(),
                        'admin' => $adminInfo, 
                        'active_group' => $active_group,
                        'promotion' => $promotionName,
                        'promotionList' => $promotionList,
                        'specializationList' => $specializationList,
                        'projectList' => $projectList,
                        'specialization' => $speciality,
                        'project' => $project
                     ];
                }
            }
        }

        $formatted = [
            'loggedIn' => true,
            'username' => $user->getUsername(),
            'user_id' => $userId,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'admin' => $admin,
            'usersArray' => $usersArray,
        ];

        return new JsonResponse($formatted);
    }
}
