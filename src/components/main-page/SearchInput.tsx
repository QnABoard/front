import { useState } from 'react';
import styled from 'styled-components';
import { MagnifyingGlassIcon as SearchIcon} from '@heroicons/react/24/outline';
const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearchText(inputText);
  }
  return (
    <SearchInputStyle>
      <input type='text' value={searchText} onChange={handleSearchChange} />
      <button><SearchIcon color='#727272' /></button>
    </SearchInputStyle>
  );
}

const SearchInputStyle = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 8px 20px;
  border: 1px solid #727272;
  border-radius: 30px;
  width: 70%;

  input {
    width: 95%;
    font-size: 1.2rem;
    font-weight: 500;
    border: 0;
    padding: 5px;
  }

  button {
    background-color: transparent;
    border: 0;
    margin-left: 10px;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
    }
  }


`;

export default SearchInput;