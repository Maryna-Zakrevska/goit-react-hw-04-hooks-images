import { PropTypes } from "prop-types";
import React from "react";
import {LoadMoreButtonStyled} from './Button.styled';

export const Button = ({ type = "button", onLoadMoreImages, hasNextPage, ...props }) => {
  if (hasNextPage) {
    return <LoadMoreButtonStyled type={type} onClick={onLoadMoreImages} {...props} />;
  }
  return null;
};

Button.propTypes = {
  type: PropTypes.string,
  hasNextPage: PropTypes.bool,
  onLoadMoreImages: PropTypes.func.isRequired,
};
