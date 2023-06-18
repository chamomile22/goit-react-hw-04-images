import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  handleImageClick = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <Item>
        <ItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.handleImageClick}
        />
        {showModal && (
          <Modal
            largeImg={largeImageURL}
            onClose={this.handleModalClose}
            tags={tags}
          />
        )}
      </Item>
    );
  }
}
