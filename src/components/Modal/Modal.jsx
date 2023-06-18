import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onClose, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseEsc);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleCloseEsc);
      document.documentElement.style.overflow = 'unset';
    };
  });

  const handleCloseEsc = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalDiv>
        <img src={largeImg} alt={tags} width="700" height="600" />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
