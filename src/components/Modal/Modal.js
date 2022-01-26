import PropTypes from "prop-types";
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { OverlayStyled, ModalStyled } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <OverlayStyled onClick={this.handleBackdropClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </OverlayStyled>,
      modalRoot,
    );
  }
}
