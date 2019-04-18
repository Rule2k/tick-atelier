import { connect } from 'react-redux';

import SearchForm from 'src/components/Header/SearchForm';
import { handleSearchInputChange, handleSearchSubmit } from 'src/store/reducers/search-reducer';

const mapStateToProps = state => ({
  input: state.searchInput.searchInput,
});

const mapDispatchToProps = dispatch => ({
  handleSearchInputChange: input => (
    dispatch(handleSearchInputChange(input))
  ),
  handleSearchSubmit: () => (
    dispatch(handleSearchSubmit())
  ),
});

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default SearchFormContainer;
