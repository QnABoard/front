import styled from 'styled-components';
import { useSearchParams } from 'react-router';
import { Pagination as IPagination } from '@/types/pagination.model';

interface Props {
  pagination?: IPagination;
}

const Pagination = ({pagination} : Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalCount = pagination?.totalCount;
  const page = pagination?.page;
  const pages: number = Math.ceil(totalCount / 20);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', page.toString());

    setSearchParams(newSearchParams);
  }
  return (
    <PaginationStyle>
      {
        pages > 0 && (
          <ol>
            {
              Array(pages).fill(0).map((_, index) => (
                <li  key={index}>
                  <button className={ page ? 'active' : ''} onClick={() => {handleClickPage(index+1)} }>{index + 1}</button>
                </li>
              ))
            }
          </ol>
        )
      }
    </PaginationStyle>
  )
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }

  button {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 6px;
    cursor: pointer;

    &.active {
      background-color: #deffe2;
    }
  }
`;

export default Pagination