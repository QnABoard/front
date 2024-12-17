import { useState } from 'react';
import styled from 'styled-components';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Avatar from './ui/atoms/Avator';
import defaultAvatar from '@/assets/DefaultAvatar.svg';
import { useNavigate } from 'react-router';
import { logout } from '@/hooks/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { removeToken } from '@/apis/http.api';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleLogin = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleMyPage = () => {
    navigate('/mypage');
  };

  const handleLogout = () => {
    // Redux 상태 초기화
    dispatch(logout());
    // 토큰 제거
    removeToken();
    // 로그아웃 후 메인 페이지 이동(필요하다면)
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  return (
    <DropdownContainer>
      {/* 햄버거 버튼 */}
      <Button onClick={toggleMenu}>
        {isOpen ? (
          <XMarkIcon className='icon' />
        ) : (
          <Bars3Icon className='icon' />
        )}
      </Button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <DropdownMenu>
          <ul>
            <li onClick={isLoggedIn ? () => {} : handleLogin}>
              {/* 아바타 표시 */}
              <AvatarContainer>
                <Avatar
                  src={
                    isLoggedIn
                      ? 'https://jmagazine.joins.com/_data2/photo/2021/04/838745483_D5lXOQuU_5.jpg'
                      : defaultAvatar
                  }
                  size='small'
                  disabled={!isLoggedIn}
                  alt='User Avatar'
                />
                {isLoggedIn ? nickname : '로그인'}
              </AvatarContainer>
            </li>
            {isLoggedIn ? (
              <>
                <li onClick={handleMyPage}>마이페이지</li>
                <li>문의하기</li>
                <li>서비스 소개</li>
                <li onClick={handleLogout}>로그아웃</li>
              </>
            ) : (
              <>
                <li>문의하기</li>
                <li>서비스 소개</li>
              </>
            )}
          </ul>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default MenuButton;

const DropdownContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  .icon {
    width: 30px;
    height: 30px;
    color: #333;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  z-index: 100;

  ul {
    list-style: none;
    padding: 10px 0;
    margin: 0;

    li {
      padding: 10px 15px;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      align-items: center;

      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;