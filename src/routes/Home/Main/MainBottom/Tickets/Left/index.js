import React from 'react';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Left = ({ priority, status }) => {
  const priorityClass = classNames('main-bottom-tickets-left-priority',
    {
      'main-bottom-tickets-left-priority-high': priority === 'Haute',
      'main-bottom-tickets-left-priority-medium': priority === 'Moyenne',
      'main-bottom-tickets-left-priority-low': priority === 'Faible',
    });
  return (
    <div>
      <Breakpoint medium down />

      <Breakpoint large up>
        <div className="main-bottom-tickets-left">
          <div className={priorityClass}>
            Priorité {priority}
          </div>
          <div className="main-bottom-tickets-left-status">
            {status}
          </div>
        </div>
      </Breakpoint>
    </div>
  );
};

Left.propTypes = {
  priority: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Left;
