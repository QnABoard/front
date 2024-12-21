import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import { RootState } from '@/store/rootReducer';
import {
  fetchUserInfo,
  updateUserIcon,
  updateUserNickname,
  UserData,
} from '@/apis/user-info.api';
import Button from '@/components/ui/atoms/Button';
import ImageUpload from '@/components/ImageUpload';
import { updateNickname } from '@/hooks/userSlice';

const MyPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );
  const userId = useSelector((state: RootState) => state.user.userInfo?.id);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialPreview, setInitialPreview] = useState<string>('');

  // 유저 데이터 불러오기
  useEffect(() => {
    if (nickname) {
      setLoading(true);
      fetchUserInfo(nickname)
        .then((data) => {
          setUserData(data);
          setNewNickname(data.profile.nickname);
          setInitialPreview(data.profile.icon || '');
          setLoading(false);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
          setLoading(false);
        });
    }
  }, [nickname]);

  const handleNicknameSave = async () => {
    if (!userId || !newNickname.trim()) return;
    setLoading(true);
    try {
      const response = await updateUserNickname(userId, newNickname.trim());
      if (response.success) {
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                profile: { ...prev.profile, nickname: newNickname.trim() },
              }
            : null
        );
        dispatch(updateNickname(newNickname.trim()));
        setIsEditingNickname(false);
      }
    } catch (err: any) {
      setError(err.message || '닉네임 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 프로필 이미지 업로드 API 호출
  const handleProfileIconUpload = async (file: File) => {
    if (!userId) return;
    try {
      setIsUploading(true);
      const response = await updateUserIcon(userId, file);
      if (response.success) {
        console.log('프로필 아이콘이 성공적으로 업데이트되었습니다.');
        setUserData((prev) =>
          prev
            ? { ...prev, profile: { ...prev.profile, icon: response.icon } }
            : null
        );
        setInitialPreview(response.icon || ''); // 아이콘 URL 업데이트
      }
    } catch (error: any) {
      console.error('프로필 아이콘 업데이트 실패:', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MyPageContainer>
      <UserProfileSection>
        <AvatarContainer>
          <ImageUpload
            initialPreview={initialPreview}
            onUpload={handleProfileIconUpload}
            isUploading={isUploading}
          />
          {isEditingNickname ? (
            <NicknameInput
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          ) : (
            <UserName>{userData?.profile.nickname}님</UserName>
          )}
          <Button
            variant='primary'
            customStyle='position: absolute; bottom: -5px; right: 40px;'
            onClick={
              isEditingNickname
                ? handleNicknameSave
                : () => setIsEditingNickname(true)
            }
          >
            {isEditingNickname ? '저장' : '수정하기'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
  position: relative;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
`;

const NicknameInput = styled.input`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const UploadingText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: gray;
`;
