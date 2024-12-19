import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import UserList from '@/admin/UserList';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 800;
  text-align: left;
  margin: 0;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 40px;
`;

const AdminPage = () => {
  const [showUserList, setShowUserList] = useState(false);

  const toggleUserList = () => {
    setShowUserList((open) => !open);
  };

  return (
    <PageContainer>
      {/* 제목과 아이콘 */}
      <TitleContainer onClick={toggleUserList}>
        <Title>유저조회</Title>
        <IconWrapper>
          {showUserList ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </IconWrapper>
      </TitleContainer>

      {/* 유저 리스트 */}
      {showUserList && (
        <ListContainer>
          <UserList />
        </ListContainer>
      )}
    </PageContainer>
  );
};

export default AdminPage;
