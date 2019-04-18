
import { connect } from 'react-redux';

import TicketAddComment from 'src/routes/ShowOneTicket/Main/TicketAddComment';

import { addCommentInputChange, submitComment } from 'src/store/reducers/add-comment-reducer';


const mapStateToProps = state => ({
  input: state.comments.commentInput,
});

const mapDispatchToProps = dispatch => ({
  submitOneComment: (oneTicket) => {
    dispatch(submitComment(oneTicket));
  },
  changeInputComment: (text) => {
    dispatch(addCommentInputChange(text));
  },
});

const TicketAddCommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketAddComment);

export default TicketAddCommentContainer;
