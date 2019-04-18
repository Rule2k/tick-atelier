import React from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';
import { Link } from 'react-router-dom';
import Title from 'src/containers/EditTicket/AddTicketTitle';
import Description from 'src/containers/EditTicket/AddTicketDescription';
import GitHubLink from 'src/containers/EditTicket/AddTicketGitHubLink';
import Tags from 'src/containers/EditTicket/AddTicketCheckboxTag';
import Priority from 'src/containers/EditTicket/AddTicketPriority';


import './form.scss';

const FormTicket = ({
 submitTicket, submitTicketBdd, gitHubLinkInput, titleInput, descriptionInput, tags, priority, currentUser,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if
    (gitHubLinkInput.trim()
    && titleInput.trim()
    && descriptionInput.trim()
    && priority
    && tags.length > 0) {
      submitTicket(currentUser);
      submitTicketBdd(currentUser);
    }

    if (gitHubLinkInput.trim()) {
      document.getElementById('edit-ticket-main-form-link-input').classList.remove('error-input');
      document.getElementById('edit-ticket-main-form-link-input').placeholder = 'Lien vers le répertoire Git';
    } else {
      document.getElementById('edit-ticket-main-form-link-input').classList.add('error-input');
      document.getElementById('edit-ticket-main-form-link-input').placeholder = 'Lien vide';
    }
    if (titleInput.trim()) {
      document.getElementById('edit-ticket-main-form-title-input').classList.remove('error-input');
      document.getElementById('edit-ticket-main-form-title-input').placeholder = 'Titre';
    } else {
      document.getElementById('edit-ticket-main-form-title-input').classList.add('error-input');
      document.getElementById('edit-ticket-main-form-title-input').placeholder = 'Titre vide';
    }
    if (descriptionInput.trim()) {
      document.getElementById('edit-ticket-main-form-description-input').classList.remove('error-input');
      document.getElementById('edit-ticket-main-form-description-input').placeholder = 'Description';
    } else {
      document.getElementById('edit-ticket-main-form-description-input').classList.add('error-input');
      document.getElementById('edit-ticket-main-form-description-input').placeholder = 'Description vide';
    }
    if (tags.length > 0) {
      document.getElementById('edit-ticket-main-form-bottom-tagsandpriority-tags').classList.remove('error-input-tags');
    } else {
      document.getElementById('edit-ticket-main-form-bottom-tagsandpriority-tags').classList.add('error-input-tags');
    }
  };

  return (
    <div>
      <Breakpoint medium down>
        <form
          id="edit-mobile-ticket-main-form"
          onSubmit={handleSubmit}
        >
          <Title />
          <Description />
          <GitHubLink />
          <div id="edit-mobile-ticket-main-form-bottom">
            <div id="edit-mobile-ticket-main-form-bottom-tagsandpriority">
              <Tags />
              <Priority />
            </div>
            <div id="edit-mobile-ticket-main-form-bottom-buttons">
              <Link to="/">
                <button type="button" id="edit-mobile-ticket-main-form-bottom-buttons-cancel">Annuler</button>
              </Link>
              <button type="submit" id="edit-mobile-ticket-main-form-bottom-buttons-submit">Valider</button>
            </div>
          </div>
        </form>
      </Breakpoint>

      <Breakpoint large up>
        <form
          id="edit-ticket-main-form"
          onSubmit={handleSubmit}
        >
          <Title />
          <Description />
          <GitHubLink />
          <div id="edit-ticket-main-form-bottom">
            <div id="edit-ticket-main-form-bottom-tagsandpriority">
              <Tags />
              <Priority />
            </div>
            <div id="edit-ticket-main-form-bottom-buttons">
              <Link to="/">
                <button type="button" id="edit-ticket-main-form-bottom-buttons-cancel">Annuler</button>
              </Link>
              <button type="submit" id="edit-ticket-main-form-bottom-buttons-submit">Valider</button>
            </div>
          </div>
        </form>
      </Breakpoint>
    </div>
  );
};

FormTicket.propTypes = {
  submitTicket: PropTypes.func.isRequired,
  submitTicketBdd: PropTypes.func.isRequired,
  gitHubLinkInput: PropTypes.string.isRequired,
  titleInput: PropTypes.string.isRequired,
  descriptionInput: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  priority: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default FormTicket;
