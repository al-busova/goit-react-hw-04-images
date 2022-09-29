import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { NotificationGallery } from './ImageGallery/ImageGallery.styled';
import { LoadMoreBtn } from 'components/Button/Button';
import { getImages } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';

export default class App extends Component {
  state = {
    searchImageName: '',
    page: 1,
    loading: false,
    images: [],
    error: null,
    total: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchImageName, page} = this.state;

    if (
      prevState.searchImageName !== searchImageName ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        getImages(searchImageName, page)
          .then(images => {
          this.setState({ total: images.total});
            if (images.total === 0) {
              return toast.error(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            }
            
            if (page === prevState.page) {
              this.setState({
                images: [...images.hits],
              });
            } else {
              this.setState({
                images: [...prevState.images, ...images.hits],
              });
           
            }
          })
          .catch(error => this.setState({ error: error.message }))
          .finally(() => this.setState({ loading: false }));
      }, 500);
    }
  }

  handleFormSubmit = searchImageName => {
     console.log('len', this.state.images.length )
    this.setState(prevState => {
      if (prevState.searchImageName === searchImageName) {
        return;
      } else {
        return this.setState({ searchImageName, page: 1});
      }
    });
  };

  loadMoreImages = e => {
    this.setState(prevState => ({ page: prevState.page + 1, loading: true }));
  };

  render() {
    const { images, loading, error, total } = this.state;
      console.log('len', this.state.images.length )
    return (
      <main>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error(error)}
        {images.length > 0 ? (
          <>
            <ImageGallery images={images}></ImageGallery>
            {loading ? (
              <Loader />
            ) : (total !== images.length  &&
              <LoadMoreBtn onloadMore={this.loadMoreImages} />
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
  }
}
