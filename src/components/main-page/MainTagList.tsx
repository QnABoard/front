import { useMainTags } from '@/hooks/useMainTags';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';


const MainTagList = () => {
  const { maintags } = useMainTags();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTags = (id:number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if(id === null) {
      newSearchParams.delete('id',);
    } else {
      newSearchParams.set('id', id.toString());
    }
    setSearchParams(newSearchParams);
  }

  return (
    <MainTagListContainer>
      {
        maintags.map((tag)=>(<TagButton className={tag.isActive? 'active' : ''} key={tag.id} onClick={()=>handleTags(tag.id)}>{tag.name}</TagButton>))
      }
    </MainTagListContainer>
  );
}

const MainTagListContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`;

const TagButton = styled.button`
  border-radius: 30px;
  font-size: 1.1rem;
  background-color: transparent;
  color: #32C040;
  border: 1px solid #32C040;
  padding: 8px 20px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.12s ease-in-out;

  &:hover {
    background-color: rgba(49, 191, 63, 0.23);
  }

  &.active {
    background-color: rgba(49, 191, 63, 0.23);
  }

`;

export default MainTagList;