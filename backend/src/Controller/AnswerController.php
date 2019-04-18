<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Form\AnswerType;
use App\Controller\UserController;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\AnswerRepository;
use App\Repository\PriorityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/answer")
 */
class AnswerController extends AbstractController
{

    /**
     * @Route("/new", name="answer_new", methods={"POST"})
     */
    public function new(Request $request, AnswerRepository $answerRepository, IssueRepository $issueRepository, UserRepository $userRepository, PriorityRepository $priorityRepository): Response
    {
        /*
        Test avec Postman
        POST
        http://localhost:8001/answer/new

        Body json envoi 
        {
            "username": "Rule2k",
            "body": "Ca avance enfin. C'est cool !",
            "issue_id": 5
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
        $admin = ($admin ==1) ? true : false ;

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        if(!array_key_exists('issue_id', $data) || !array_key_exists('body', $data) ) {
            
            return new JsonResponse('Il manque des informations !');

            if(is_null($data['issue_id']) || is_null($data['body']) ) {
                return new JsonResponse('Il manque des informations !');
            }
        }        

        $active_group = UserController::findActiveGroup($user);
        
        $answer = new Answer();
                
        // on récupère l'objet issue dont l'id est passé en param
        // afin de le passer ensuite à la méthode setIssue() qui attend en argument une instance de la classe Issue
        $issue = $issueRepository->find($data['issue_id']);

        // idem avec la classe User

        $answer->setBody($data['body']);
        $answer->setUser($user);
        $answer->setIssue($issue);  

        $issueId = $data['issue_id'];

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($answer);
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
                return new JsonResponse('Pas pu créé de commentaire');
    }

    /**
     * @Route("/{id}/edit", name="answer_edit", methods={"POST"})
     */
    public function edit(Request $request, AnswerRepository $answerRepository, IssueRepository $issueRepository, UserRepository $userRepository, PriorityRepository $priorityRepository): Response
    {
        /*
        Test avec Postman
        http://localhost:8001/answer/15/edit

        Body json envoi 
        {
            "username": "Rule2k",
            "body": "le corps de la réponse"
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

        $active_group = UserController::findActiveGroup($user);

        $answer = $answerRepository->find($request->get('id'));

        $ownerAnswerId = $answer->getUser()->getId();

        if( $userId == $ownerAnswerId || $admin === true) {

            $answer->setBody($data['body']);
            $answer->setUpdatedAt(new \DateTime('now'));

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($answer);
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
                    return new JsonResponse('Pas pu édité de commentaire');
    }

    /**
     * @Route("/{id}/delete", name="answer_delete", methods={"GET","POST"})
     */
    public function delete(Request $request, AnswerRepository $answerRepository, IssueRepository $issueRepository, UserRepository $userRepository, PriorityRepository $priorityRepository): Response
    {
        // URL d'essai localhost
        // http://localhost:8001/answer/16/delete?username=freddmn08

        $user = $userRepository->findOneBy([
            'username' => $request->get('username')
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
        $admin = ($admin == 1) ? true : false ;

        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $active_group = UserController::findActiveGroup($user);
        
        $answer = $answerRepository->find($request->get('id'));

        $ownerAnswerId = $answer->getUser()->getId();

        if($userId == $ownerAnswerId || $admin === true) {

            $answer->setIsActive(0);
            $answer->setUpdatedAt(new \DateTime('now'));

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($answer);
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
    
            } else {
    
                $active_group = UserController::findActiveGroup($user);
                $promotions = $user->getPromotion();
    
                if (!is_null($promotions)) {
                    // on balaie l'ensemble des promo
                    $formatted = UserController::serializingStudentIssues($issueRepository, $user, $userId, $admin, $firstname, $lastname, $priority, $token);
                }
            }
        }
                else {
                    $responseText = 'Vous ne pouvez pas effacé ce commentaire.';
                    $response = $this->response($admin, $responseText, $user, $userId, $firstname, $lastname, $active_group, $answersFiltered, $token);
                    return new JsonResponse($response);
                }
            }

    public function response($admin, $responseText, $user, $userId, $firstname, $lastname, $active_group, $answersFiltered, $token) {
        return( 
            $response[] = [
                'loggedIn' => true,
                'token' => $token,
                'username' => $user->getUsername(),
                'user_id' => $userId,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'admin' => $admin,
                'active_group' => $active_group,    
                'response' => $responseText,
                'answers' => $answersFiltered
            ]
        );                            
    }
}
