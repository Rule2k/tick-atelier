import { connect } from 'react-redux';

import TicketOneComment from 'src/routes/ShowOneTicket/Main/TicketComments/TicketOneComment/';
import { submitEditComment } from 'src/store/reducers/edit-comment-reducer';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  submitEditComment: (id, username, input) => {
    dispatch(submitEditComment(id, username, input));
  },
});

const TicketOneCommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketOneComment);

export default TicketOneCommentContainer;
