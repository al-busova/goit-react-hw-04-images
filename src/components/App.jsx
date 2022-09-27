import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { getImages } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    searchImageName: '',
    page: 1,
    status: 'idle',
    images: [],
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchImageName, page } = this.state;
    if (
      prevState.searchImageName !== searchImageName ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        getImages(searchImageName, page)
          .then(images => {
            if (images.total === 0) {
              this.setState({ status: 'idle' })
             
              return toast.error('Sorry, there are no images matching your search query. Please try again.')  ;
            }
            this.setState({
              status: 'resolved',
              images: [...prevState.images, ...images.hits],
            });
          })
          .catch(error =>
            this.setState({ error: error.message, status: 'rejected' })
          )
          .finally(() => this.setState({ loading: false }));
      }, 300);
    }
  }

  handleFormSubmit = searchImageName => {
    this.setState({ searchImageName, page: 1, images: [] });
  };
  loadMoreImages = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, error } = this.state;
    return (
      <main>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          status={status}
          error={error}
        ></ImageGallery>
        {images.length !== 0 && (
          <LoadMoreBtn onloadMore={this.loadMoreImages} />
        )}
        <ToastContainer autoClose={3000}/>
      </main>
    );
  }
}
