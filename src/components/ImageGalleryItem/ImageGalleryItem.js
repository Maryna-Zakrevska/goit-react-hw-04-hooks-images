import React from "react";
import PropTypes from "prop-types";
import { ImageGalleryItemStyled,ImageGalleryItemImageStyled } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({
  image: {
    webformatURL,
    largeImageURL,
    tags,
    webformatWidth,
    webformatHeight,
    imageHeight,
    imageWidth,
  },
  onOpenModal,
}) => {
  const alt = tags && Object.values(tags).join(", ");
  return (
    <ImageGalleryItemStyled>
      <ImageGalleryItemImageStyled
        src={webformatURL}
        alt={alt}
        onClick={() => onOpenModal({ largeImageURL, alt, imageWidth, imageHeight })}
        width={webformatWidth}
        height={webformatHeight}
      />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
