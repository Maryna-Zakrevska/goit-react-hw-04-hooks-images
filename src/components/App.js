import React, { Component } from "react";
import { getImages } from "servises/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ToastContainer } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import {
  ModalImgStyled,
  AppDivStyled,
  CloseButtonStyled,
  NoResultsMessageStyled,
} from "./App.styled";
import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    perPage: 12,
    images: [],
    showModal: false,
    status: Status.IDLE,
    error: null,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevShowModal = prevState.showModal;
    const nextShowModal = this.state.showModal;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1, status: Status.PENDING });

      getImages(nextQuery, nextPage)
        .then(({ hits, totalHits }) =>
          this.setState({ images: hits, totalHits: totalHits, status: Status.RESOLVED }),
        )
        .catch((error) => this.setState({ error: error, status: Status.REJECTED }));
    }

    if (prevPage < nextPage) {
      getImages(prevQuery, nextPage)
        .then(({ hits }) =>
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: Status.RESOLVED,
          })),
        )
        .catch((error) => this.setState({ error: error, status: Status.REJECTED }));
    }

    if (prevShowModal !== nextShowModal && !Object.keys(nextShowModal).length) {
      window.removeEventListener("keydown", this.onEscCloseModal);
    }
  }

  searchQuerySubmit = (inputQuery) => {
    const prevQuery = this.state.searchQuery;
    if (prevQuery !== inputQuery) {
      this.setState({ searchQuery: inputQuery, page: 1 });
    }
  };

  loadMoreImages = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  openModal = (showModal) => {
    this.setState({ showModal });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, totalHits, page, perPage, showModal, searchQuery } = this.state;

    if (status === Status.IDLE) {
      return (
        <AppDivStyled>
          <Searchbar onSubmit={this.searchQuerySubmit} />
          <ToastContainer autoClose={2500} />
        </AppDivStyled>
      );
    }
    if (status === Status.PENDING) {
      const nextPage = page > 1;
      return (
        <AppDivStyled>
          <Searchbar />
          {nextPage && <ImageGallery images={images} />}
          <Loader />
          <ToastContainer autoClose={2500} />
        </AppDivStyled>
      );
    }

    if (status === Status.REJECTED) {
      return (
        <AppDivStyled>
          <Searchbar onSubmit={this.searchQuerySubmit} />
          <NoResultsMessageStyled>
            No results for <b>"{searchQuery}"</b>. Please type correct search query
          </NoResultsMessageStyled>
          <ToastContainer autoClose={2500} />
        </AppDivStyled>
      );
    }

    if (status === Status.RESOLVED) {
      const notEmptyImagesArray = images?.length > 0;
      const hasNextPage = totalHits > page * perPage;
      const needToOpenModal = showModal && Object.keys(showModal).length > 0;
      return (
        <AppDivStyled>
          <Searchbar onSubmit={this.searchQuerySubmit} />
          {!notEmptyImagesArray && (
            <NoResultsMessageStyled>
              No results for <b>"{searchQuery}"</b>. Please type correct search query
            </NoResultsMessageStyled>
          )}
          {notEmptyImagesArray && (
            <>
              <ImageGallery images={images} onOpenModal={this.openModal} />
              <Button hasNextPage={hasNextPage} onLoadMoreImages={this.loadMoreImages}>
                Load More
              </Button>
              {needToOpenModal && (
                <Modal onClose={this.toggleModal}>
                  <CloseButtonStyled type="button" onClick={this.toggleModal}>
                    <AiOutlineClose />
                  </CloseButtonStyled>
                  <ModalImgStyled src={showModal.largeImageURL} alt={showModal.alt} />
                </Modal>
              )}
              <ToastContainer autoClose={2500} />
            </>
          )}
        </AppDivStyled>
      );
    }
  }
}
