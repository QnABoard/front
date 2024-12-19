import Avatar from '@/components/ui/atoms/Avator';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserProfileSection>
        <AvatarContainer>
          <Avatar
            src='https://jmagazine.joins.com/_data2/photo/2021/04/838745483_D5lXOQuU_5.jpg'
            size='big'
            alt='User Avatar'
          />
          <UserName>땡땡땡님</UserName>
        </AvatarContainer>
      </UserProfileSection>
      <UserContentSection>
        <Outlet />
      </UserContentSection>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const UserProfileSection = styled.section`
  width: 300px;
  min-height: 100vh;
  position: relative;
`;

const UserContentSection = styled.section`
  width: 700px;
  min-height: 100vh;
  border-left: 1px solid black;
  padding: 10px;
`;

const AvatarContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const UserName = styled.div``;
