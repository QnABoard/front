import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import MenuButton from './MenuButton';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo src={logo} alt='Logo' onClick={handleLogoClick} />
        <MenuButton />
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 980px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 클릭 가능한 스타일을 추가한 로고
const Logo = styled.img`
  cursor: pointer; // 커서를 클릭 가능한 손가락 모양으로 변경
`;
