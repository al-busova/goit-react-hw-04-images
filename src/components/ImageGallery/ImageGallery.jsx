import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import {
  ListImages,
  ImageItem,
} from './ImageGallery.styled';

export const ImageGallery = ({ images}) => {
  return (
    <>
      {images && <ListImages>
        {images.map(image => (
          <ImageItem key={image.id}>
            <ImageGalleryItem
              url={image.webformatURL}
              tags={image.tags}
              bigUrl={image.largeImageURL}
            />
          </ImageItem>
        ))}
      </ListImages>}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
