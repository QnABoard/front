import { useMainTags } from '@/hooks/useMainTags';
import { useSearchParams } from 'react-router';
import styled from 'styled-components';

const MainTagList = () => {
  const { maintags } = useMainTags();
  const [searchParams, setSearchParams] = useSearchParams();

  // const handleTags = (id: number | null) => {
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   if (id === null) {
  //     newSearchParams.delete('id');
  //   } else {
  //     newSearchParams.set('id', id.toString());
  //   }
  //   setSearchParams(newSearchParams);
  // };

  const handleCheckBox = (id: number, checked: boolean) => {

  }

  return (
    <MainTagListContainer>
      <ul>
      {
        maintags?.map((tag) => (
          <li key={tag.id}>
            <input className='check' id={tag.name} type='checkbox' onChange={(e) => handleCheckBox(tag.id as number, e.target.checked)} />
            <label htmlFor={tag.name}>{tag.name}</label>
          </li>
        ))
      }
      </ul>
    </MainTagListContainer>
  );
};

const MainTagListContainer = styled.div`
  width: 100%;
  height: max-content;

  ul {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;

      &:checked + label {
        background-color: rgba(49, 191, 63, 0.23);
      }
    }

    label {
      display: block;
      border-radius: 30px;
      font-size: 1rem;
      background-color: transparent;
      color: #32c040;
      border: 1px solid #32c040;
      padding: 8px 15px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.12s ease-in-out;

      &:hover {
        background-color: rgba(49, 191, 63, 0.23);
      }
    }
  
  }
  

`;

export default MainTagList;
