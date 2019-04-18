import React from 'react';
import PropTypes from 'prop-types';

import './githublink.scss';

const GitHubLink = ({ submitLink, github }) => {
  const handleChangeInput = (event) => {
    const { value } = event.target;
    submitLink(value);
    event.target.classList.remove('error-input');
    event.target.placeholder = 'Lien vers le répertoire Git';
  };

  return (
    <div id="new-ticket-main-form-link">
      <input
        id="new-ticket-main-form-link-input"
        placeholder="Lien vers le répertoire Git"
        onChange={handleChangeInput}
        value={github}
      />
    </div>
  );
};

GitHubLink.propTypes = {
  submitLink: PropTypes.func.isRequired,
  github: PropTypes.string.isRequired,
};

export default GitHubLink;
