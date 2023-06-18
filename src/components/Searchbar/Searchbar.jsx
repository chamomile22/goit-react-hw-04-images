import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleNameChange = event => {
    setInput(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (input.trim() === '') {
      return toast.error('Type any word to find images');
    }
    onSubmit(input.trim());
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchIcon width={'23px'} />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          value={input}
          onChange={handleNameChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
