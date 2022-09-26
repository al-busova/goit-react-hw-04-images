// import PropTypes from 'prop-types';
import { ListImages, ImageItem } from './ImageGallery.styled';
import  ImageGalleryItem  from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';


export const ImageGallery =({status, error, images}) => {
 

  if (status === 'resolved') {
      return (
          <ListImages>
            {images.map(image => (
              <ImageItem key={image.id}>
                <ImageGalleryItem url={image.webformatURL} tags={image.tags} bigUrl ={image.largeImageURL} />
                
              </ImageItem>
            ))}
          </ListImages>
      );
    }
    if (status === 'idle') {
      return <p>Enter name image.</p>;
    }

    if (status === 'pending') {
      return <Loader/>;
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
    
}




// ImageGallery.propTypes = {

// };
