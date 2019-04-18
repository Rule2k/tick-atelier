import React from 'react';
import PropTypes from 'prop-types';

import { Breakpoint } from 'react-socks';

import EditButton from 'src/routes/ShowOneTicket/Main/TicketComments/TicketOneComment/EditButton';

export default class TicketOneComment extends React.Component {
  constructor(props) {
    super(props);
    const { promos } = this.props;
    this.state = {
      isEdited: false,
      input: promos,
    };
  }

  handleClick = () => {
    const { message } = this.props;
    this.setState({
      isEdited: true,
      input: message,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitEditComment } = this.props;
    const { id } = this.props;
    const { currentUser } = this.props;
    const { input } = this.state;
    this.setState({
      isEdited: false,
    });
    submitEditComment(id, currentUser.username, input);
  };

  handleChangeInput = (event) => {
    const { value } = event.target;
    this.setState({
      input: value,
    });
  };

  handleCancelClick = (event) => {
    event.preventDefault();
    this.setState({
      isEdited: false,
    });
  };

  render() {
    const { isEdited } = this.state;
    const { input } = this.state;
    const { id } = this.props;
    const { user } = this.props;
    const { date } = this.props;
    const { message } = this.props;
    const { currentUser } = this.props;
    return (
      <div>
        <Breakpoint medium down>
          <div className="ticket-mobile-comment" key={id}>
            <div className="ticket-mobile-comment-infos">Auteur <span>{user.firstname_owner} {user.lastname_owner} </span>le {date}</div>
            <div className="ticket-mobile-comment-content" style={{display: !isEdited ? 'block' : 'none' }}>
              {message}
            </div>
            <form className="ticket-mobile-comment-form" style={{ display: isEdited ? 'block' : 'none' }} onSubmit={this.handleSubmit}>
              <input
                className="ticket-mobile-comment-form-input"
                value={input}
                onChange={this.handleChangeInput}
              />
              <button className="ticket-mobile-comment-form-button" type="button" onClick={this.handleCancelClick}>Annuler</button>
              <button className="ticket-mobile-comment-form-button" type="submit">Envoyer</button>
            </form>
            {(currentUser.admin && !isEdited && <EditButton handleClick={this.handleClick} />) || (currentUser.username === user.username_owner && !isEdited && <EditButton handleClick={this.handleClick} />) }
          </div>
        </Breakpoint>

        <Breakpoint large up>
          <div className="ticket-comment" key={id}>
            <div className="ticket-comment-infos">Auteur <span>{user.firstname_owner} {user.lastname_owner} </span>le {date}</div>
            <div className="ticket-comment-content" style={{display: !isEdited ? 'block' : 'none' }}>
              {message}
            </div>
            <form className="ticket-comment-form" style={{ display: isEdited ? 'block' : 'none' }} onSubmit={this.handleSubmit}>
              <input
                className="ticket-comment-form-input"
                value={input}
                onChange={this.handleChangeInput}
              />
              <button className="ticket-comment-form-button" type="button" onClick={this.handleCancelClick}>Annuler</button>
              <button className="ticket-comment-form-button" type="submit">Envoyer</button>
            </form>
            {(currentUser.admin && !isEdited && <EditButton handleClick={this.handleClick} />) || (currentUser.username === user.username_owner && !isEdited && <EditButton handleClick={this.handleClick} />) }
          </div>
        </Breakpoint>
      </div>
    );
  }
}

TicketOneComment.propTypes = {
  promos: PropTypes.string,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  submitEditComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

TicketOneComment.defaultProps = {
  promos: '',
};
