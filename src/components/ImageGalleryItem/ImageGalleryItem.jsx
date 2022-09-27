import PropTypes from 'prop-types';
import { Component } from 'react';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.toggleModal();
    }
  };

  render() {
    const { url, tags, bigUrl } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <Image src={url} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal
            bigUrl={bigUrl}
            alt={tags}
            onBackdrop={this.handleBackdropClick}
          />
        )}{' '}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string, //чому не виходить зазначити обов'язковими? (в консолі помилку дає)
  webformatURL: PropTypes.string, //чому не виходить зазначити обов'язковими? (в консолі помилку дає)
  tags: PropTypes.string.isRequired,
};
