import { connect } from 'react-redux';

import Tags from 'src/routes/EditTicket/Main/Form/Tags';
import { checkedTag } from 'src/store/reducers/edit-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  tags: state.editTicket.tags,
});

const mapDispatchToProps = dispatch => ({
  checkedTags: (tag) => {
    dispatch(checkedTag(tag));
  },
});

const addTagsTicketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tags);

export default addTagsTicketContainer;
