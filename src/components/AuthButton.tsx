// src/components/Header.tsx
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { logout } from '@/hooks/userSlice';
import { removeToken } from '@/apis/http.api';
import styled from 'styled-components';

function AuthButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleLogin = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleLogout = () => {
    // Redux 상태 초기화
    dispatch(logout());
    // 토큰 제거
    removeToken();
    // 로그아웃 후 메인 페이지 이동(필요하다면)
    navigate('/');
  };

  return isLoggedIn ? (
    <LogoutBox onClick={handleLogout}>
      <div className='group'>
        <div className='overlap-group'>
          <div className='text-wrapper'>로그아웃</div>
        </div>
      </div>
    </LogoutBox>
  ) : (
    <LoginBox onClick={handleLogin}>
      <div className='group'>
        <div className='overlap-group'>
          <div className='text-wrapper'>로그인</div>
        </div>
      </div>
    </LoginBox>
  );
}

export default AuthButton;

// Styled Components 동일
const ButtonBox = styled.div`
  height: 52px;
  width: 114px;

  .group {
    height: 100%;
    position: relative;
  }

  .overlap-group {
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .text-wrapper {
    color: #ffffff;
    font-family: 'Pretendard-ExtraBold', Helvetica;
    font-size: 15px;
    line-height: 12px;
    white-space: nowrap;
  }
`;

const LoginBox = styled(ButtonBox)`
  .overlap-group {
    background-color: #32c040;
  }
  .overlap-group:hover {
    background-color: #28a034;
  }
`;

const LogoutBox = styled(ButtonBox)`
  .overlap-group {
    background-color: #9a9a9a;
  }
  .overlap-group:hover {
    background-color: #7f7f7f;
  }
`;
