import { Component } from 'react';
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

export class Searchbar extends Component {
  state = {
    input: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleNameChange = event => {
    this.setState({ input: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { input } = this.state;
    if (input.trim() === '') {
      return toast.error('Type any word to find images');
    }

    this.props.onSubmit(input.trim());
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchIcon width={'23px'} />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            value={this.state.input}
            onChange={this.handleNameChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
