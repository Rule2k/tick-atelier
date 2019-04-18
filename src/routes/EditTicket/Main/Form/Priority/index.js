import React from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';

import './priority.scss';

const Priority = ({ submitPriority, priority }) => {
  const handleSelectPriority = (event) => {
    const { value } = event.target;
    submitPriority(value);
    event.target.classList.remove('error-input');
  };
  return (
    <div>
      <Breakpoint medium down>
        <div id="edit-mobile-ticket-main-form-bottom-tagsandpriority-priority">
          <select
            id="edit-mobile-ticket-main-form-bottom-tagsandpriority-priority-select"
            onChange={handleSelectPriority}
            value={priority}
          >
            <option value="Priority" disabled>Priority</option>
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
      </Breakpoint>

      <Breakpoint large up>
        <div id="edit-ticket-main-form-bottom-tagsandpriority-priority">
          <select
            id="edit-ticket-main-form-bottom-tagsandpriority-priority-select"
            onChange={handleSelectPriority}
            value={priority}
          >
            <option value="Priority" disabled>Priority</option>
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
      </Breakpoint>
    </div>
  );
};

Priority.propTypes = {
  submitPriority: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
};

export default Priority;
