import { useState} from 'react';
import PropTypes from 'prop-types';
import { HiSearch } from 'react-icons/hi';
import {
  HeaderSearch,
  FormSearch,
  FormSearchBtn,
  FormInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify'; 

export const Searchbar = ({ onSubmit }) => {
  const [searchImageName, setSearchImageName] = useState('');

 const handleSearchNameChange = event => {
    setSearchImageName(event.currentTarget.value.toLowerCase());
  };

 const handleSubmit = e => {
    e.preventDefault();
    if (searchImageName.trim() === '') {
      return toast('Please, enter query.');
    }
    onSubmit(searchImageName);
  }

    return (
      <HeaderSearch>
        <FormSearch onSubmit={handleSubmit}>
          <FormSearchBtn type="submit">
         <HiSearch/>
          </FormSearchBtn>
          <FormInput
            type="text"
            value={searchImageName}
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={handleSearchNameChange}
          />
        </FormSearch>
      </HeaderSearch>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
