// import PropTypes from 'prop-types';
import { Component } from 'react';
// import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ListImages,ImageItem } from './ImageGallery.styled';
import {ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { LoadMoreBtn } from 'components/Button/Button';

const KEY_API_PIXABAY = '29314953-9960e0c1117cd8f48e1da89de';

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: null
  };
  page = 1;
  // componentDidMount() {
  //   if (this.state.images) {
  //     // this.setState({ contacts: parsedContacts });
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImageName !== this.props.searchImageName) {
      this.setState({ loading: true, images:null });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchImageName}&page=${this.page}&key=${KEY_API_PIXABAY}&image_type=photo&orientation=horizontal&per_page=12`
      )
       .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`No image ${this.props.searchImageName}`)
          );
        })
        .then(images => {
          if (images.total === 0) {
            return alert('no images');
}
          this.setState({ images: images.hits });
        }).catch(error => this.setState({ error }))
        .finally(()=> this.setState({loading:false}));
    }
  }
  loadMoreImages = (e) => {
    this.page += 1;
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchImageName}&page=${this.page}&key=${KEY_API_PIXABAY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`No image ${this.props.searchImageName}`)
          );
        })
        .then(images => this.setState({ images: images.hits }))
        .finally(()=> this.setState({loading:false}));
  }
  render() {
    const imagesCollection = this.state.images;
    return (
      <>
        {(this.state.error) && <p>{this.state.error.message}</p> }
        {this.state.loading && <p>Loading...</p>}
        {!this.props.searchImageName && <p>Enter name image.</p>}
        {this.state.images && (
          <ListImages>
           {imagesCollection.map(image => (
        <ImageItem key={image.id}>
          <ImageGalleryItem
            url = {image.webformatURL}
          />
        </ImageItem>
      ))}</ListImages>
        )}
        <LoadMoreBtn onloadMore={this.loadMoreImages} />
      </>
    );
  }
}

// ImageGallery.propTypes = {

// };
