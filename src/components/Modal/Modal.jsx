import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseEsc);
    document.documentElement.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseEsc);
    document.documentElement.style.overflow = 'auto';
  }

  handleCloseEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img src={largeImg} alt={tags} width="700" height="600" />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
