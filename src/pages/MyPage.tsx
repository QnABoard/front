import styled from 'styled-components';

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserInfoWrapper>개인 정보 및 네비게이션</UserInfoWrapper>
      <UserContentsWrapper>컨텐츠</UserContentsWrapper>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const UserInfoWrapper = styled.div`
  width: 300px;
  min-height: 100vh;
`;

const UserContentsWrapper = styled.div`
  width: 700px;
  min-height: 100vh;
  border-left: 1px solid black;
`;
