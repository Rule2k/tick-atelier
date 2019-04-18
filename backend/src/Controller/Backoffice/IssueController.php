<?php

namespace App\Controller\Backoffice;

use App\Entity\Issue;
use App\Form\IssueType;
use App\Entity\Priority;
use App\Repository\UserRepository;
use App\Repository\IssueRepository;
use App\Repository\StatusRepository;
use App\Repository\PriorityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/backoffice/issue")
 */
class IssueController extends AbstractController
{
    /**
     * @Route("/new", name="backoffice_issue_new", methods={"GET","POST"})
     */
    public function new(Request $request, PriorityRepository $priorityRepository, StatusRepository $statusRepository, UserRepository $userRepository): Response
    {
        // URL de test localhost
        // http://localhost:8001/issue/new?title=titre&description=ma%20description&repo_url=www.github.com&priority=faible&user_id=3&active_group=Tick'Ateliers

        // http://localhost:8001/issue/new?title=titre&description=ma%20description&repo_url=www.github.com&priority=faible&user_id=3&active_group=Tick'Ateliers

        // URL de test prod
        // http://92.243.19.15:8080/issue/new?title=titre&description=ma%20description&repo_url=www.github.com&priority=faible&user_id=3&active_group=Tick'Ateliers

        $issue = new Issue();
        
        // on récupère l'objet priority dont le name est passé en param
        // afin de la passer ensuite à la méthode setPriority() qui attend en argument une instance de la classe Priority
        $priority = $priorityRepository->findOneBy([
            'name' => $request->get('priority')
        ]);

        // on récupère l'owner dont l'id est envoyé par le front afin de passer cet objet à la méthode setOwner qui attend une instance de la classe User
        $user = $userRepository->find($request->get('user_id'));

        // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
        $status = $statusRepository->find(1);

        $issue->setTitle($request->get('title'));
        $issue->setDescription($request->get('description'));
        $issue->setRepoUrl($request->get('repo_url'));
        $issue->setPriority($priority);
        $issue->setOwner($user);
        $issue->setActiveGroup($request->get('active_group'));
        $issue->setStatus($status);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($issue);
        $entityManager->flush();

        if(null != $issue->getId()) {
            $responseText = 'Votre ticket a bien été créé !';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        } else {
            $responseText = 'Votre ticket n\'a pas été créé .';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        }
    }

    /**
     * @Route("/{id}/edit", name="backoffice_issue_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Issue $issue, UserRepository $userRepository, PriorityRepository $priorityRepository, StatusRepository $statusRepository, IssueRepository $issueRepository): Response
    {
        // @TODO :
        // le param d'url issue_id donne l'erreur "Unable to guess how to get a Doctrine instance from the request information for parameter "issue"."
        // * ParamConverter("issue", options={"id" = "issue_id"})

        // URL test version localhost
        // http://localhost:8001/issue/9/edit?title=mon%20titre%20edite&description=ma%20description&repo_url=www.github.com&priority=moyenne&user_id=4&active_group=Tick'Ateliers

        // dd($request);

        $issue = $issueRepository->find($request->get('id'));

        $ownerIssueId = $issue->getOwner()->getId();

        if($request->get('user_id') == $ownerIssueId || $request->get('admin') == 1) {

        // on récupère l'objet priority dont le name est passé en param
        // afin de la passer ensuite à la méthode setPriority() qui attend en argument une instance de la classe Priority
        $priority = $priorityRepository->findOneBy([
            'name' => $request->get('priority')
        ]);

        // on récupère l'owner dont l'id est envoyé par le front afin de passer cet objet à la méthode setOwner qui attend une instance de la classe User
        $user = $userRepository->find($request->get('user_id'));

        // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
        $status = $statusRepository->find(1);

        $issue->setTitle($request->get('title'));
        $issue->setDescription($request->get('description'));
        $issue->setRepoUrl($request->get('repo_url'));
        $issue->setPriority($priority);
        $issue->setOwner($user);
        $issue->setActiveGroup($request->get('active_group'));
        $issue->setStatus($status);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($issue);
        $entityManager->flush();

        if(null != $issue->getId()) {
            $responseText = 'Votre ticket a bien été édité !';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        } else {
            $responseText = 'Votre ticket n\'a pas été édité.';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        }
        } else {
            $responseText = 'Vous ne pouvez pas édité ce ticket.';
            $response = $this->response($request, $responseText);
            return new JsonResponse($response);
        }
    }

    /**
     * @Route("/{issue_id}/close", name="backoffice_issue_close", methods={"GET","POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     */
    public function close(Request $request, Issue $issue, StatusRepository $statusRepository, IssueRepository $issueRepository, UserRepository $userRepository): Response
    {
        // URL de test localhost
        // http://localhost:8001/issue/9/close?user_id=4

        $issue = $issueRepository->findOneBy([
            'id' => $request->get('issue_id')
            ]);
        
        $ownerIssueId = $issue->getOwner()->getId();

            if($request->get('user_id') == $ownerIssueId || $request->get('admin') == 1) {

                // on récupère le statut d'id 1 afin de passer cet objet à la méthode setStatus qui attend une instance de la classe Status
                $status = $statusRepository->find(2);

                $issue->setStatus($status);
        
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($issue);
                $entityManager->flush();
                
                if(null != $issue->getId()) {
                    $responseText = 'Votre ticket a bien été cloturé !';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                } else {
                    $responseText = 'Votre ticket n\'a pas été cloturé.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
                } else {
                    $responseText = 'Vous ne pouvez pas cloturer ce ticket.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
    }

    /**
     * @Route("/{issue_id}/assign/{user_id}", name="backoffice_issue_assign", methods={"GET","POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     * @ParamConverter("user", options={"id" = "user_id"})
     */
    public function assign(Request $request, Issue $issue, StatusRepository $statusRepository, IssueRepository $issueRepository, UserRepository $userRepository): Response
    {
        // URL de test localhost
        // http://localhost:8001/issue/9/assign/1?admin=1

        // on récupère l'objet issue auquel un prof va s'assigner
        $issue = $issueRepository->find($request->get('issue_id'));
        
        // on récupère l'id du owner de l'issue
        $ownerIssueId = $issue->getOwner()->getId();

        // 
        $isAdmin = $userRepository->find($request->get('user_id'))->getRole()->getId();

            if($request->get('admin') == 1 && $isAdmin == 1) {

                // on récupère l'objet user associé au prof s'assignant au ticket
                $userAssigned = $userRepository->find($request->get('user_id'));

                $issue->setAssignedTo($userAssigned);
        
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($issue);
                $entityManager->flush();
                
                if(null != $issue->getId()) {
                    $responseText = 'Ce ticket a bien été assigné !';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                } else {
                    $responseText = 'Ce ticket n\'a pu être assigné.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
                } else {
                    $responseText = 'Vous ne pouvez pas assigner de ticket.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
    }

    /**
     * @Route("/{issue_id}/unassign/{user_id}", name="backoffice_issue_unassign", methods={"GET","POST"})
     * @ParamConverter("issue", options={"id" = "issue_id"})
     * @ParamConverter("user", options={"id" = "user_id"})
     */
    public function unassign(Request $request, Issue $issue, StatusRepository $statusRepository, IssueRepository $issueRepository, UserRepository $userRepository): Response
    {
        // URL de test localhost
        // http://localhost:8001/issue/9/assign?user_id=1&admin=1

        // on récupère l'objet issue auquel un prof va s'assigner
        $issue = $issueRepository->find($request->get('issue_id'));
        
        // on récupère l'id du owner de l'issue
        $ownerIssueId = $issue->getOwner()->getId();

        //         
        $isAdmin = $userRepository->find($request->get('user_id'))->getRole()->getId();

            if($request->get('admin') == 1 && $isAdmin == 1) {

                // on récupère l'objet user associé au prof s'assignant au ticket
                $issue->setAssignedTo(null);
        
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($issue);
                $entityManager->flush();
                
                if(null != $issue->getId()) {
                    $responseText = 'Ce ticket n\'est plus assigné !';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                } else {
                    $responseText = 'Ce ticket n\'a pu être dé-assigné.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
                } else {
                    $responseText = 'Vous ne pouvez pas dé-assigner de ticket.';
                    $response = $this->response($request, $responseText);
                    return new JsonResponse($response);
                }
    }
    /**
     * @Route("/{id}", name="backoffice_issue_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Issue $issue): Response
    {
        if ($this->isCsrfTokenValid('delete'.$issue->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($issue);
            $entityManager->flush();
        }

        return $this->redirectToRoute('issue_index');
    }

    /**
     * Méthode retournant le tableau response à serializer
     *
     * @param $request
     * @param $responseText
     * @return array
     */
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
