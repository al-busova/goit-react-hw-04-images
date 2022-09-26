import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery }  from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { getImages } from 'services/api';

export default class App extends Component {
  state = {
    searchImageName: '',
    page: 1,
    status: 'idle',
    images: [],
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchImageName !== this.state.searchImageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        getImages(this.state.searchImageName, this.state.page)
          .then(images => {
            if (images.total === 0) {
              this.setState({ status: 'idle' });
              return alert('no images');
            }
            this.setState({
              status: 'resolved',
              images: [...prevState.images, ...images],
            });
          })
          .catch(error => this.setState({ error, status: 'rejected' }))
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
    return (
      <main>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          status={this.state.status}
          error={this.state.error}
        ></ImageGallery>
        {this.state.images.length !== 0 && (
          <LoadMoreBtn onloadMore={this.loadMoreImages} />
        )}
      </main>
    );
  }
}
