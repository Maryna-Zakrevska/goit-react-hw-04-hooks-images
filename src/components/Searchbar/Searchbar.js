import PropTypes from "prop-types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormButtonStyled,
  SearchFormButtonSpanStyled,
  SearchFormInputStyled,
  SearchFormButtonLabelStyled,
} from "./Searchbar.styled";

export default function Searchbar({ onSubmit, status }) {
  const [searchQuery, setSearchQuery] = useState("");

  const inputQueryChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const formQuery = searchQuery.trim();
    if (formQuery === "") {
      toast.error("Заполните поле поиска");
      return;
    }
    onSubmit(formQuery);
    setSearchQuery("");
  };

  return (
    <SearchbarStyled>
      <SearchFormStyled onSubmit={formSubmit}>
        <SearchFormButtonLabelStyled>
          <SearchFormInputStyled
            name="searchQuery"
            value={searchQuery}
            onChange={inputQueryChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchFormButtonLabelStyled>
        <SearchFormButtonStyled type="submit" disabled={status === "pending"}>
          <FaSearch />
          <SearchFormButtonSpanStyled>Search</SearchFormButtonSpanStyled>
        </SearchFormButtonStyled>
      </SearchFormStyled>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
