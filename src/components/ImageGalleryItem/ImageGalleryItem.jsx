import PropTypes from 'prop-types';
import { useState, useEffect} from 'react';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ url, tags, bigUrl }) => {
  const [showModal, setShowModal] = useState(false);
 
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setShowModal(false);
    }
  };

 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };
  
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => {
 window.removeEventListener('keydown', handleKeyDown);
  }
}, []);
  
    return (
      <>
        <Image src={url} alt={tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            bigUrl={bigUrl}
            alt={tags}
            onBackdrop={handleBackdropClick}
          />
        )}
      </>
    );
}

ImageGalleryItem.propTypes = {
  bigUrl : PropTypes.string.isRequired, 
  url: PropTypes.string.isRequired, 
  tags: PropTypes.string.isRequired,
};
