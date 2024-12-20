import { useEffect, useState } from 'react';
import Avatar from '@/components/ui/atoms/Avator';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import { RootState } from '@/store/rootReducer';
import { fetchUserInfo, UserData } from '@/apis/user-info.api';

const MyPage = () => {
  const location = useLocation();
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (nickname) {
      setLoading(true);
      fetchUserInfo(nickname)
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
          setLoading(false);
        });
    }
  }, [nickname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MyPageContainer>
      <UserProfileSection>
        <AvatarContainer>
          <Avatar
            src='https://jmagazine.joins.com/_data2/photo/2021/04/838745483_D5lXOQuU_5.jpg'
            size='big'
            alt='User Avatar'
          />
          <UserName>{userData?.profile.nickname}님</UserName>
        </AvatarContainer>
        <Navigation>
          <NavItem>
            <StyledLink to='' isActive={location.pathname === '/mypage'}>
              홈
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink
              to='myposts'
              isActive={location.pathname === '/mypage/myposts'}
            >
              게시글
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink
              to='scrap'
              isActive={location.pathname === '/mypage/scrap'}
            >
              좋아요한 게시글
            </StyledLink>
          </NavItem>
        </Navigation>
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
  padding: 20px 0;
`;

const UserContentSection = styled.section`
  flex: 1;
  min-height: 100vh;
  padding: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
`;

const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 40px;
  margin-left: 20px;
`;

const NavItem = styled.li`
  margin: 10px 0;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.isActive ? 'black' : 'gray')};
  font-size: 16px;
  &:hover {
    color: lightgray;
  }
`;
