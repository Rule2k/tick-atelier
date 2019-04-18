import { connect } from 'react-redux';

import GitHubLink from 'src/routes/EditTicket/Main/Form/GitHubLink';
import { addGitHubLinkInput } from 'src/store/reducers/edit-ticket-reducer';

const mapStateToProps = (state, ownProps) => ({
  github: state.editTicket.gitHubLinkInput,
});

const mapDispatchToProps = dispatch => ({
  submitLink: (GitHubLink) => {
    dispatch(addGitHubLinkInput(GitHubLink));
  },
});

const addTicketLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GitHubLink);

export default addTicketLinkContainer;
