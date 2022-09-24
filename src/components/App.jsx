import { Component } from 'react';
import  Searchbar  from './Searchbar/Searchbar';
import  ImageGallery  from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
   searchImageName: '',
  };
 
  handleFormSubmit = (searchImageName) => {
    this.setState({ searchImageName });
   
 }
  render() {
    return (
      <main>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImageName = {this.state.searchImageName} ></ImageGallery>
      </main>
    );
  }
}

