
import { connect } from 'react-redux';

import ShowOneTicket from 'src/routes/ShowOneTicket';

export const getOneTicketFromSlug = (slug, tickets) => {
  const result = tickets.find(ticket => ticket.issue_id == slug);
  return result;
};

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  return ({
    ticket: getOneTicketFromSlug(slug, state.tickets.tickets),
  });
};

const mapDispatchToProps = {};

const ShowOneTicketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowOneTicket);

export default ShowOneTicketContainer;
