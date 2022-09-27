import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { ListImages, ImageItem,  NotificationGallery } from './ImageGallery.styled';
import { toast } from 'react-toastify'; 
 
export const ImageGallery = ({ status, error, images }) => {
  if (status === 'resolved') {
    return (
      <ListImages>
        {images.map(image => (
          <ImageItem key={image.id}>
            <ImageGalleryItem
              url={image.webformatURL}
              tags={image.tags}
              bigUrl={image.largeImageURL}
            />
          </ImageItem>
        ))}
      </ListImages>
    );
  }
  if (status === 'idle') {
    return < NotificationGallery>Please, enter query image.</ NotificationGallery>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return toast.error(error);
  }
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
