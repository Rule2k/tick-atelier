import React from 'react';
import PropTypes from 'prop-types';

import './priority.scss';

const Priority = ({ submitPriority, priority }) => {
  const handleSelectPriority = (event) => {
    const { value } = event.target;
    submitPriority(value);
    event.target.classList.remove('error-input');
  };

  return (
    <div id="new-ticket-main-form-bottom-tagsandpriority-priority">
      <select
        id="new-ticket-main-form-bottom-tagsandpriority-priority-select"
        onChange={handleSelectPriority}
        value={priority}
      >
        <option value="Priority" disabled>Priority</option>
        <option value="Faible">Faible</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Haute">Haute</option>
      </select>
    </div>
  );
};

Priority.propTypes = {
  submitPriority: PropTypes.func.isRequired,
  priority: PropTypes.string,
};

Priority.defaultProps = {
  priority: 'Faible',
};

export default Priority;
