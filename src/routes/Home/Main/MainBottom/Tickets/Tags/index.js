import React from 'react';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';


const Tags = ({ tags }) => (
  <div>
    <Breakpoint medium down>
      <div className="main-mobile-bottom-tickets-tags">
        {
          tags.map(tag => (
            <div key={tag}>{tag}</div>
          ))
        }
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div className="main-bottom-tickets-tags">
        {
          tags.map(tag => (
            <div key={tag}>{tag}</div>
          ))
        }
      </div>
    </Breakpoint>
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Tags;
