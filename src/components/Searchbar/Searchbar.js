import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {SearchbarStyled, SearchFormStyled, SearchFormButtonStyled, SearchFormButtonSpanStyled, SearchFormInputStyled, SearchFormButtonLabelStyled} from "./Searchbar.styled";

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  state = {
    searchQuery: '',
  };
  inputQueryChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };
  formSubmit = e => {
    e.preventDefault();
    const formQuery = this.state.searchQuery.trim();
    if (formQuery === '') {
      toast.error('Заполните поле поиска');
      return;
    }
    this.props.onSubmit(formQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    const { searchQuery } = this.state;
    return (
        <SearchbarStyled >
          <SearchFormStyled onSubmit={this.formSubmit}>
            <SearchFormButtonLabelStyled>
              <SearchFormInputStyled
                name="searchQuery"
                value={searchQuery}
                onChange={this.inputQueryChange}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </SearchFormButtonLabelStyled>
            <SearchFormButtonStyled
              type="submit"
              disabled={this.props.status === 'pending'}
            >
              <FaSearch/>
              <SearchFormButtonSpanStyled>Search</SearchFormButtonSpanStyled>
            </SearchFormButtonStyled>
          </SearchFormStyled>
        </SearchbarStyled>
    );
  }
}