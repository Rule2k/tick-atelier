import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ input, handleSearchInputChange, handleSearchSubmit }) => {
  const inputHasChanged = (event) => {
    handleSearchInputChange(event.target.value);
    event.target.classList.remove('error-input');
    event.target.placeholder = 'Recherchez parmis des tickets existants';
  };

  const formHasBeenSent = (event) => {
    event.preventDefault();
    if (input.trim()) {
      handleSearchSubmit();
      event.target.querySelector('input').classList.remove('error-input');
      event.target.querySelector('input').placeholder = 'Recherchez parmis des tickets existants';
    }
    else {
      event.target.querySelector('input').classList.add('error-input');
      event.target.querySelector('input').placeholder = 'Votre recherche est vide';
    }
  };

  return (
    <form
      id="header-top-search-form"
      onSubmit={formHasBeenSent}
    >
      <input
        id="header-top-search-form-input"
        placeholder="Recherchez parmis des tickets existants"
        value={input}
        onChange={inputHasChanged}
      />
    </form>
  );
};

SearchForm.propTypes = {
  input: PropTypes.string.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
