import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Title from 'src/containers/NewTicket/AddTicketTitle';
import Description from 'src/containers/NewTicket/AddTicketDescription';
import GitHubLink from 'src/containers/NewTicket/AddTicketGitHubLink';
import Tags from 'src/containers/NewTicket/AddTicketCheckboxTag';
import Priority from 'src/containers/NewTicket/AddTicketPriority';

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
      submitTicketBdd();
    }

    if (gitHubLinkInput.trim()) {
      document.getElementById('new-ticket-main-form-link-input').classList.remove('error-input');
      document.getElementById('new-ticket-main-form-link-input').placeholder = 'Lien vers le répertoire Git';
    } else {
      document.getElementById('new-ticket-main-form-link-input').classList.add('error-input');
      document.getElementById('new-ticket-main-form-link-input').placeholder = 'Lien vide';
    }
    if (titleInput.trim()) {
      document.getElementById('new-ticket-main-form-title-input').classList.remove('error-input');
      document.getElementById('new-ticket-main-form-title-input').placeholder = 'Titre';
    } else {
      document.getElementById('new-ticket-main-form-title-input').classList.add('error-input');
      document.getElementById('new-ticket-main-form-title-input').placeholder = 'Titre vide';
    }
    if (descriptionInput.trim()) {
      document.getElementById('new-ticket-main-form-description-input').classList.remove('error-input');
      document.getElementById('new-ticket-main-form-description-input').placeholder = 'Description';
    } else {
      document.getElementById('new-ticket-main-form-description-input').classList.add('error-input');
      document.getElementById('new-ticket-main-form-description-input').placeholder = 'Description vide';
    }
    if (tags.length > 0) {
      document.getElementById('new-ticket-main-form-bottom-tagsandpriority-tags').classList.remove('error-input-tags');
    } else {
      document.getElementById('new-ticket-main-form-bottom-tagsandpriority-tags').classList.add('error-input-tags');
    }
  };

  return (
    <form
      id="new-ticket-main-form"
      onSubmit={handleSubmit}
    >
      <Title />
      <Description />
      <GitHubLink />
      <div id="new-ticket-main-form-bottom">
        <div id="new-ticket-main-form-bottom-tagsandpriority">
          <Tags />
          <Priority />
        </div>
        <div id="new-ticket-main-form-bottom-buttons">
          <Link to="/">
            <button type="button" id="new-ticket-main-form-bottom-buttons-cancel">Annuler</button>
          </Link>
          <button type="submit" id="new-ticket-main-form-bottom-buttons-submit">Valider</button>
        </div>
      </div>
    </form>
  );
};

FormTicket.propTypes = {
  submitTicket: PropTypes.func.isRequired,
  submitTicketBdd: PropTypes.func.isRequired,
  gitHubLinkInput: PropTypes.string,
  titleInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  priority: PropTypes.string,
  currentUser: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

FormTicket.defaultProps = {
  gitHubLinkInput: '',
  titleInput: '',
  descriptionInput: '',
  priority: '',
  tags: [],
};

export default FormTicket;
