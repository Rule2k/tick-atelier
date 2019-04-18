import React from 'react';
import PropTypes from 'prop-types';
import './description.scss';

const Description = ({ submitDescription, desc }) => {
  const handleChangeInput = (event) => {
    const { value } = event.target;
    submitDescription(value);
    event.target.classList.remove('error-input');
    event.target.placeholder = 'Description';
  };

  return (
    <div id="edit-ticket-main-form-description">
      <textarea
        id="edit-ticket-main-form-description-input"
        placeholder="Description"
        onChange={handleChangeInput}
        value={desc}
      />
    </div>
  );
};

Description.propTypes = {
  submitDescription: PropTypes.func.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Description;
