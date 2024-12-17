import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import MenuButton from './MenuButton';

const Header = () => (
  <HeaderContainer>
    <HeaderWrapper>
      <img src={logo} alt='Logo' />
    </HeaderWrapper>
    <MenuButton />
  </HeaderContainer>
);

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
