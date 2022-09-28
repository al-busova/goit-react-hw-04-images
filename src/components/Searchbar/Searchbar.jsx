import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { HiSearch } from 'react-icons/hi';
import {
  HeaderSearch,
  FormSearch,
  FormSearchBtn,
  FormInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify'; 

export default class Searchbar extends Component {
  state = {
    searchImageName: '',
  };

  handleSearchNameChange = event => {
    this.setState({ searchImageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchImageName } = this.state;
    if (searchImageName.trim() === '') {
      return toast('Please, enter query.');
    }
    
    this.props.onSubmit(this.state.searchImageName);
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
