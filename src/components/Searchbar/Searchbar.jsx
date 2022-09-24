import { React, Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import {
  HeaderSearch,
  FormSearch,
  FormSearchBtn,
  FormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {

  state = {
    searchImageName: '',
  };

  handleSearchNameChange = event => {
    this.setState({ searchImageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImageName.trim() === '') {
      return alert('Enter name image.')
    }
    this.props.onSubmit(this.state.searchImageName);
    this.setState({ searchImageName: '' });
  }

  render() {
    return (
      <HeaderSearch>
        <FormSearch onSubmit={this.handleSubmit}>
          <FormSearchBtn type="submit">
         <HiSearch/>
          </FormSearchBtn>
          <FormInput
            type="text"
            value={this.state.searchImageName}
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleSearchNameChange}
          />
        </FormSearch>
      </HeaderSearch>
    );
  }
}
