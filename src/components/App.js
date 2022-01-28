import React, { useState, useEffect, useRef } from "react";
import { getImages } from "servises/api";
import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
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

const perPage = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {firstRender.current = false; return;}
    const getImagesOnSearchSubmit = () => {
      setStatus(Status.PENDING);
      getImages(searchQuery, page)
        .then(({ hits, totalHits }) => {
          setImages(hits);
          setTotalHits(totalHits);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };
    getImagesOnSearchSubmit();
  }, [searchQuery, page]); 

  useEffect(() => {
    if (page === 1) return;
    const getImagesOnLoadMore = () => {
      setStatus(Status.PENDING);
      getImages(searchQuery, page)
        .then(({ hits }) => {
          setImages(images => [...images, ...hits]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };
    getImagesOnLoadMore();
  }, [page, searchQuery]);

  const searchQuerySubmit = (inputQuery) => {
    if (searchQuery !== inputQuery) {
      setSearchQuery(inputQuery);
      setPage(1);
      setError(null);
    }
  };

  const loadMoreImages = () => {
    setPage((page) => page + 1);
  };

  const openModal = (showModal) => {
    setShowModal(showModal);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const showGallery = images?.length > 0;
  const isError = error || (!showGallery&&status === Status.RESOLVED) || status === Status.REJECTED;
  const isLoading = status === Status.PENDING;
  const hasNextPage = totalHits > page * perPage;
  const needToOpenModal = showModal && Object.keys(showModal).length > 0;

  console.log('App ~ isLoading', images);

  return (
    <AppDivStyled>
      <Searchbar onSubmit={searchQuerySubmit} />
      {isLoading && <Loader />}
      {isError && (
        <NoResultsMessageStyled>
          No results for <b>"{searchQuery}"</b>. Please type correct search query
        </NoResultsMessageStyled>
      )}
      {showGallery && (
        <>
          <ImageGallery images={images} onOpenModal={openModal} />
          <Button hasNextPage={hasNextPage} onLoadMoreImages={loadMoreImages}>
            Load More
          </Button>
        </>
      )}
      {needToOpenModal && (
        <Modal onClose={toggleModal}>
          <CloseButtonStyled type="button" onClick={toggleModal}>
            <AiOutlineClose />
          </CloseButtonStyled>
          <ModalImgStyled src={showModal.largeImageURL} alt={showModal.alt} />
        </Modal>
      )}
      <ToastContainer autoClose={2500} />
    </AppDivStyled>
  );
}
