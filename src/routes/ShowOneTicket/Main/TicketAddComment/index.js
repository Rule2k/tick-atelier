import React from 'react';
import { Breakpoint } from 'react-socks';
import PropTypes from 'prop-types';

import './ticketaddcomment.scss';

const TicketAddComment = ({
  submitOneComment, changeInputComment, currentTicket, input,
}) => {
  const handleChangeInput = (event) => {
    const { value } = event.target;
    changeInputComment(value);
    event.target.classList.remove('error-input');
    event.target.placeholder = 'Tapez votre commentaire...';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      submitOneComment(currentTicket);
      event.target.querySelector('textarea').classList.remove('error-input');
      event.target.querySelector('textarea').placeholder = 'Tapez votre commentaire...';
    }
    else {
      event.target.querySelector('textarea').classList.add('error-input');
      event.target.querySelector('textarea').placeholder = 'Votre commentaire est vide';
    }
  };

  return (
    <div>
      <Breakpoint medium down>
        <div id="ticket-mobile-add-comment">
          <form
            id="ticket-mobile-add-comment-form"
            onSubmit={handleSubmit}
          >
            <textarea
              id="ticket-mobile-add-comment-textarea"
              type="textarea"
              placeholder="Tapez votre commentaire..."
              onChange={handleChangeInput}
              value={input}
            />
            <button type="submit" id="ticket-mobile-add-comment-submit">Submit</button>
          </form>
        </div>
      </Breakpoint>

      <Breakpoint large up>
        <div id="ticket-add-comment">
          <form
            id="ticket-add-comment-form"
            onSubmit={handleSubmit}
          >
            <textarea
              id="ticket-add-comment-textarea"
              type="textarea"
              placeholder="Tapez votre commentaire..."
              onChange={handleChangeInput}
              value={input}
            />
            <button type="submit" id="ticket-add-comment-submit">Submit</button>
          </form>
        </div>
      </Breakpoint>
    </div>
  );
};

TicketAddComment.propTypes = {
  submitOneComment: PropTypes.func.isRequired,
  changeInputComment: PropTypes.func.isRequired,
  currentTicket: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
};

export default TicketAddComment;
