<?php

namespace App\Controller\Backoffice;

use App\Entity\Answer;
use App\Form\AnswerType;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\AnswerRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/backoffice/answer")
 */
class AnswerController extends AbstractController
{
    /**
     * @Route("/new", name="backoffice_answer_new", methods={"GET","POST"})
     */
    public function new(Request $request, AnswerRepository $answerRepository, IssueRepository $issueRepository, UserRepository $userRepository): Response
    {
        // URL d'essai localhost
        // http://localhost:8001/answer/new?body=le%20corps%20de%20la%20nouvelle%20reponse&user_id=3&issue_id=9

        // version prod
        // http://92.243.19.15:8080/answer/new?body=le%20corps%20de%20la%20nouvelle%20reponse&user_id=3&issue_id=9

        $answer = new Answer();
                
        // on récupère l'objet issue dont l'id est passé en param
        // afin de le passer ensuite à la méthode setIssue() qui attend en argument une instance de la classe Issue
        $issue = $issueRepository->find($request->get('issue_id'));

        // idem avec la classe User
        $user = $userRepository->find($request->get('user_id'));

        $answer->setBody($request->get('body'));
        $answer->setUser($user);
        $answer->setIssue($issue);      

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($answer);
        $entityManager->flush();

        if(null != $issue->getId()) {
            $responseText = 'Votre commentaire a bien été créé !';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        } else {
            $responseText = 'Votre commentaire n\'a pas été créé.';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        }
    }

    /**
     * @Route("/{id}/edit", name="backoffice_answer_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, AnswerRepository $answerRepository, IssueRepository $issueRepository, UserRepository $userRepository): Response
    {
        // URL d'essai localhost
        // http://localhost:8001/answer/16/edit?body=le%20corps%20edite%20de%20la%20nouvelle%20reponse&user_id=3

        $answer = $answerRepository->find($request->get('id'));

        $ownerAnswerId = $answer->getUser()->getId();

        if($request->get('user_id') == $ownerAnswerId || $request->get('admin') == 1) {

            $user = $userRepository->find($request->get('user_id'));

            $answer->setBody($request->get('body'));
            $answer->setUpdatedAt(new \DateTime('now'));

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($answer);
            $entityManager->flush();

            if(null != $issue->getId()) {
                $responseText = 'Votre commentaire a bien été édité !';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            } else {
                $responseText = 'Votre commentaire n\'a pas été édité.';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            }
            } else {
                $responseText = 'Vous ne pouvez pas édité ce commentaire.';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            }
    }

    /**
     * @Route("/{id}/delete", name="backoffice_answer_delete", methods={"GET","POST"})
     */
    public function delete(Request $request, AnswerRepository $answerRepository): Response
    {
        // URL d'essai localhost
        // http://localhost:8001/answer/16/delete?user_id=3

        $answer = $answerRepository->find($request->get('id'));

        $ownerAnswerId = $answer->getUser()->getId();

        if($request->get('user_id') == $ownerAnswerId || $request->get('admin') == 1) {

            // $user = $userRepository->find($request->get('user_id'));

            $answer->setIsActive(0);
            $answer->setUpdatedAt(new \DateTime('now'));

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($answer);
            $entityManager->flush();

            if(null != $issue->getId()) {
                $responseText = 'Votre commentaire a bien été effacé !';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            } else {
                $responseText = 'Votre commentaire n\'a pas été effacé.';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            }
            } else {
                $responseText = 'Vous ne pouvez pas effacé ce commentaire.';
                $response = $this->response($request, $responseText);
                return new JsonResponse($response);
            }
    }
    public function response($request, $responseText) {
        return( 
            $response[] = [
                 'user_id' => $request->get('user_id'),
                 'isLoggedIn' => $request->get('loggedIn'),
                 'admin' => $request->get('admin'),
                 'response' => $responseText
            ]
        );                            
    }
}
