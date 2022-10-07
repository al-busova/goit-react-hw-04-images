import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { NotificationGallery } from './ImageGallery/ImageGallery.styled';
import { LoadMoreBtn } from 'components/Button/Button';
import { getImages } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchImageName, setSearchImageName] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (searchImageName === '') {
      return;
    }
    setLoading(true);
      getImages(searchImageName, page)
        .then(images => {
          if (page === 1) {
            setTotal(images.total);
            if (images.total === 0) {
              return toast.error(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            }
            setImages([...images.hits]);
            return;
          }
          setImages(prev => [...prev, ...images.hits]);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
  }, [searchImageName, page]);

  const handleFormSubmit = searchImage => {
    if (searchImageName === searchImage) {
      return;
    } else {
      setSearchImageName(searchImage);
      setPage(1);
      setImages([]);
    }
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && toast.error(error)}
      {images.length > 0 ? (
        <>
          <ImageGallery images={images}></ImageGallery>
          {loading ? (
            <Loader />
          ) : (
            total !== images.length && (
              <LoadMoreBtn onloadMore={loadMoreImages} />
            )
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <NotificationGallery>
              Please, enter query image.
            </NotificationGallery>
          )}
        </>
      )}
      <ToastContainer autoClose={3000} />
    </main>
  );
};
