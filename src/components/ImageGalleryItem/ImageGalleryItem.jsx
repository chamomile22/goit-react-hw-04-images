import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Item>
      <ItemImage src={webformatURL} alt={tags} onClick={handleImageClick} />
      {showModal && (
        <Modal
          largeImg={largeImageURL}
          onClose={handleModalClose}
          tags={tags}
        />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
