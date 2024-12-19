import React from 'react';
import styled from 'styled-components';

const UserContentsPage = () => {
  return (
    <ContentsContainer>
      <ContentTitle>소개</ContentTitle>
      <ContentSection>메인 컨텐츠</ContentSection>
    </ContentsContainer>
  );
};

export default UserContentsPage;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.h1`
  font-size: 36px;
  padding: 10px;
`;

const ContentSection = styled.div`
  padding: 10px;
`;
