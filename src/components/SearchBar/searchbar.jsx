import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput
} from './searchbar.styled.js'
import {MdOutlineImageSearch} from 'react-icons/md'

export function Searchbar ({onSubmit}) { 
  const [search, setSearch] = useState ('')

 const handleSubmit = e => { 
    e.preventDefault()
    if (search.trim() === '') { 
      toast.error('Type your request')
      return
    }
    onSubmit(search)
    setSearch ('')
  }

  const handleChangeValue = e => {
    setSearch (e.currentTarget.value.toLowerCase())
  }
  
    return (
      <>
        <SearchbarHeader>
          <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type="submit">
              <>
                <MdOutlineImageSearch size='30px' color='black' />
              </>
            </SearchFormButton>

            <SearchFormInput
              name="search"
              value={search}
              onChange={handleChangeValue}
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </SearchbarHeader>
      </>
    );
  }




Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};