import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

const Title = ({ submitTitle, title }) => {

  const handleChangeInput = (event) => {
    const { value } = event.target;
    submitTitle(value);
    event.target.classList.remove('error-input');
    event.target.placeholder = 'Titre';
  };


  return (
    <div id="new-ticket-main-form-title">
      <input
        id="new-ticket-main-form-title-input"
        placeholder="Titre"
        onChange={handleChangeInput}
        value={title}
      />
    </div>
  );
};

Title.propTypes = {
  submitTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Title;
