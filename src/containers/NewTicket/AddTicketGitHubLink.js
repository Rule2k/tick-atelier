import { connect } from 'react-redux';

import GitHubLink from 'src/routes/NewTicket/Main/Form/GitHubLink';
import { addGitHubLinkInput } from 'src/store/reducers/add-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  github: state.addTicket.gitHubLinkInput,
});

const mapDispatchToProps = dispatch => ({
  submitLink: (link) => {
    dispatch(addGitHubLinkInput(link));
  },
});

const addTicketLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GitHubLink);

export default addTicketLinkContainer;
